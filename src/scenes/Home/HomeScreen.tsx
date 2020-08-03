import React, { Component, createRef } from "react";
import { View, Image, FlatList, ViewToken } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import "react-native-gesture-handler";
import { Movie } from "../../types/Movie";
import { BottomBar, ImageView } from "../../components/index";
import colors from "../../assets/colors";
import dataController from "../../assets/data/dataController";

interface HomeScreenProps {
  navigation: NavigationStackProp<{}>;
}

interface HomeScreenState {
  movies: Movie[];
  moviesLoaded: boolean;
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

  flatlistRef = createRef<FlatList<Movie>>();

  _scrollToIndex = () => {
    this.flatlistRef.current?.scrollToIndex({ animated: true, index: 1 });
  };

  _onViewableItemsChanged = ({ viewableItems, changed }: any) => {
    //.key = movie id
    //.index = place in list
    //.item = movie item (implementation:) let movitem = viewableItems[0].item as Movie;
  };

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
            <BottomBar flref={this.flatlistRef} />
          </View>
        </View>
      </View>
    );
  }
}
