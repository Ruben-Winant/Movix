import React, { Component, createRef } from "react";
import { View, FlatList } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import "react-native-gesture-handler";
import { Movie } from "../../types/Movie";
import { BottomBar, ImageView } from "../../components/index";
import colors from "../../assets/colors";
import dataController from "../../assets/data/dataController";
import { Flags } from "../../components/atoms/Flags";

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
    dataCont.getData(1).then((res) =>
      this.setState({
        movies: res,
        moviesLoaded: true,
      })
    );
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
  moveToNextItem = () => {
    this.setState({
      listPos: this.state.listPos + 1,
    });

    this.flatlistRef.current?.scrollToIndex({
      animated: true,
      index: this.state.listPos,
    });
  };

  getActionFunction(flag: Flags, movie: Movie) {
    switch (flag) {
      case "DISLIKE":
        const onPressDislike = () => {
          alert("disliked " + movie.title);
          this.moveToNextItem(); //!HIER LOOPT HET NU WEER MIS
        };
        return onPressDislike();

      case "SEEN":
        const onPressSeen = (movie: Movie) => {
          alert("seen " + movie.title);
        };
        return onPressSeen(movie);

      case "LIKE":
        const onPressLike = (movie: Movie) => {
          alert("liked " + movie.title);
        };
        return onPressLike(movie);

      default:
        const onPressError = () => {
          alert("Error: no movie selected");
        };
        return onPressError;
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.darkblue }}>
        <View style={{ flex: 1 }}>
          <View>
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
              handlePress={this.getActionFunction}
            />
          </View>
        </View>
      </View>
    );
  }
}
