import React, { Component, createRef } from "react";
import { View, FlatList } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import "react-native-gesture-handler";
import { Movie } from "../../types/Movie";
import colors from "../../assets/colors";
import dataController from "../../assets/data/dataController";
import { Flags } from "../../types/Flags";
import { BottomBar, ImageView } from "../../components";

interface HomeScreenProps {
  navigation: NavigationStackProp<{}>;
}

interface HomeScreenState {
  movies: Movie[];
  moviesLoaded: boolean;
  listPos: number;
  currentFlatlistItem: Movie;
}

export default class HomeScreen extends Component<
  HomeScreenProps,
  HomeScreenState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      movies: [],
      moviesLoaded: false,
      listPos: 0,
      currentFlatlistItem: null,
    };
  }

  //when component loads in fetch the data
  componentDidMount() {
    let dataCont = new dataController({});
    dataCont.getData().then((res) => {
      res
        ? this.setState({
            movies: res,
            moviesLoaded: true,
          })
        : alert("no movies found");
    });
  }

  //change the state of the current item on list change
  _onViewableItemsChanged = ({ viewableItems }: any) => {
    //.key = movie id
    //.index = place in list
    //.item = movie item
    let currItem = viewableItems[0].item as Movie;
    this.setState({ currentFlatlistItem: currItem });
  };

  //create ref to flatlist
  flatlistRef = createRef<FlatList<Movie>>();

  //functions happens when one of the bottom functions is pressed
  moveToNextItem = (flag: Flags, movie: Movie) => {
    //forward to next card
    let next = () => {
      this.setState({
        listPos: this.state.listPos + 1,
      });

      this.flatlistRef.current?.scrollToIndex({
        animated: true,
        index: this.state.listPos,
      });
    };

    //mark movie as flag
    let onPressedSeen = () => {
      alert("seen " + movie.title);
    };

    let onPressedDisliked = () => {
      alert("dislike " + movie.title);
    };

    let onPressedLiked = () => {
      alert("liked " + movie.title);
    };

    //navigate to info page
    let onPressedInfo = () => {
      alert("gathering info about " + movie.title);
    };

    flag === "DISLIKE"
      ? (onPressedDisliked(), next())
      : flag === "SEEN"
      ? (onPressedSeen(), next())
      : flag === "LIKE"
      ? (onPressedLiked(), next())
      : flag === "INFO"
      ? onPressedInfo()
      : console.log("Something went wrong");
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.darkblue }}>
        <View style={{ flex: 1 }}>
          <View>
            {/* indicator */}
            <FlatList<Movie>
              onViewableItemsChanged={this._onViewableItemsChanged}
              data={this.state.movies}
              renderItem={({ item }) => <ImageView movie={item} />}
              horizontal
              pagingEnabled
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              ref={this.flatlistRef}
              scrollEventThrottle={16}
            />
          </View>
          <View style={{ flex: 1 }}>
            <BottomBar
              movie={this.state.currentFlatlistItem}
              handlePress={this.moveToNextItem}
            />
          </View>
        </View>
      </View>
    );
  }
}
