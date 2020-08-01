import React, { Component } from "react";
import "react-native-gesture-handler";
import { Movie } from "../../types/Movie";
import { ImageView } from "../../components/index";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import dataController from "../../assets/data/dataController";

interface ISstate {
  movies: Movie[];
  moviesLoaded: boolean;
}

export default class ImageSlide extends Component<{}, ISstate> {
  constructor(props: any) {
    super(props);
    this.state = {
      movies: [],
      moviesLoaded: false,
    };
  }

  componentDidMount() {
    let dataCont = new dataController({});

    dataCont.getData(1).then((res) =>
      this.setState({
        movies: res,
        moviesLoaded: true,
      })
    );
  }

  render() {
    return this.state.moviesLoaded &&
      this.state.movies !== null &&
      typeof this.state.movies !== "undefined" &&
      this.state.movies.length > 0 ? (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.movies}
          renderItem={({ item }) => <ImageView movie={item} />}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    ) : (
      <View>
        <Text>fucked</Text>
      </View>
    );
  }
}
