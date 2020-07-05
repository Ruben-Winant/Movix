import React, { Component } from "react";
import "react-native-gesture-handler";
import { Movie } from "../../types/Movie";
import { ImageView } from "../../components/index";
import { View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

interface ISprops {}
interface ISstate {
  movieCards: any[];
  moviesLoaded: boolean;
}

export default class ImageSlide extends Component<ISprops, ISstate> {
  constructor(props: ISprops) {
    super(props);
    this.state = {
      movieCards: [],
      moviesLoaded: false,
    };
  }

  getData = async () => {
    var movies: Movie[] = [];
    try {
      const jsonValue = await AsyncStorage.getItem("@movieData");
      jsonValue != null ? (movies = JSON.parse(jsonValue)) : null;
      return movies;
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    const movieCards: any[] = [];
    this.getData()
      .then((result: Movie[] | undefined) => {
        if (typeof result != "undefined") {
          result
            .slice(0, 25)
            .sort(() => Math.random() - 0.5)
            .map((movie: Movie) =>
              movieCards.push(<ImageView key={movie.id} movie={movie} />)
            );
        }
      })
      .then(() => {
        setTimeout(() => {
          this.setState({
            movieCards: movieCards,
            moviesLoaded: true,
          });
        }, 0);
      });
  }

  render() {
    return this.state.moviesLoaded ? (
      <View>{this.state.movieCards}</View>
    ) : (
      <View></View>
    );
  }
}
