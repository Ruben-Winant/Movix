import React, { Component, createRef } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Text,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import "react-native-gesture-handler";
import { Movie } from "../../types/Movie";
import colors from "../../assets/colors";
import dataController from "../../assets/data/dataController";
import { Flags } from "../../types/Flags";
import { GenreList } from "../../types/GenreList";
import { BottomBar, ImageView } from "../../components";
import { TopBar } from "../../components/molecules/TopBar";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

interface HomeScreenProps {
  navigation: NavigationStackProp<{}>;
}

interface HomeScreenState {
  movies: Movie[];
  moviesLoaded: boolean;
  listPos: number;
  currentFlatlistItem: Movie;
  genre: string;
  genreModalVisible: boolean;
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
      genre: "All",
      modalVisible: false,
    };
  }

  private dataCont = new dataController({});

  //when component loads in fetch the data
  componentDidMount() {
    this.dataCont.getData().then((res) => {
      res
        ? this.setState({
            movies: res,
            moviesLoaded: true,
          })
        : alert("no movies found");
    });
    this.setState({
      genreModalVisible: false,
    });
  }

  //#region flatlist
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
    let onPressedSeen = () => {};

    let onPressedDisliked = () => {};

    let onPressedLiked = () => {};

    flag === "DISLIKE"
      ? (onPressedDisliked(), next())
      : flag === "SEEN"
      ? (onPressedSeen(), next())
      : flag === "LIKE"
      ? (onPressedLiked(), next())
      : console.log("Something went wrong");
  };

  //#endregion

  //#region genre menu modal
  FilterMovies = (genre: string) => {
    if (genre === "All") {
      this.setState({ moviesLoaded: false });
      this.dataCont.getData().then((res) => {
        res
          ? this.setState({
              movies: res,
              moviesLoaded: true,
            })
          : alert("no movies found");
      });
      return;
    }

    this.setState({ moviesLoaded: false });
    this.dataCont.getData().then((res) => {
      try {
        let fmovies: Movie[] = res.filter((movie) => {
          let genreObj;
          movie.genres != null || typeof movie.genres !== "undefined"
            ? (genreObj = Object.values(movie.genres))
            : null;
          let genreNames: string[] = [];

          genreObj != null || typeof genreObj !== "undefined"
            ? genreObj?.forEach((genre) => {
                genreNames.push(genre.name);
              })
            : null;

          let data = genreNames.some((item) => item === genre);
          return data;
        });
        this.setState({ moviesLoaded: false });
        this.setState({
          movies: fmovies,
          moviesLoaded: true,
        });
      } catch (error) {
        console.error(error.message);
      }
    });
  };

  MakeGenreButtonList = () => {
    let genreButtons: any[] = [];
    GenreList.forEach((genre) => {
      let color = genre === this.state.genre ? colors.blue : colors.white;
      genreButtons.push(
        <Text
          key={genre}
          onPress={() => {
            this.setState({ genreModalVisible: !this.state.genreModalVisible });
            this.setState({ genre: genre });
            this.FilterMovies(genre);
          }}
          style={{
            textAlign: "center",
            color: color,
            fontSize: 28,
            width: 180,
            marginBottom: 15,
            marginTop: 15,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {genre}
        </Text>
      );
    });
    let result = (
      <ScrollView
        persistentScrollbar={true}
        style={{ marginTop: 30, marginBottom: 30 }}
        indicatorStyle="white"
      >
        {genreButtons}
      </ScrollView>
    );
    return result;
  };
  //#endregion

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.dark }}>
        <StatusBar backgroundColor={colors.dark} animated={true} />
        {this.state.moviesLoaded ? (
          <View style={{ flex: 1 }}>
            {/* top bar */}
            <View style={{ flex: 1 }}>
              <TopBar
                movie={this.state.currentFlatlistItem}
                handlePress={() =>
                  this.setState({
                    genreModalVisible: !this.state.genreModalVisible,
                  })
                }
                genre={this.state.genre}
              />
            </View>
            {/* movies list */}
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
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
            {/* bottom bar */}
            <View style={{ flex: 1, marginBottom: 18, marginTop: 18 }}>
              <BottomBar
                movie={this.state.currentFlatlistItem}
                handlePress={this.moveToNextItem}
              />
            </View>
            {/* modal for choosing genre filter */}
            <Modal animationType="fade" visible={this.state.genreModalVisible}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-around",
                  backgroundColor: colors.dark,
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    marginLeft: 25,
                    marginTop: 25,
                    zIndex: 99,
                    padding: 10,
                  }}
                >
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.setState({
                        genreModalVisible: !this.state.genreModalVisible,
                      })
                    }
                    style={{ padding: 5 }}
                  >
                    <FontAwesome5Icon
                      name="chevron-left"
                      size={34}
                      color={colors.white}
                    />
                  </TouchableWithoutFeedback>
                </View>

                {this.MakeGenreButtonList()}
              </View>
            </Modal>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size={100} />
            <Text
              style={{
                color: colors.white,
                fontSize: 24,
                width: "60%",
                textAlign: "center",
              }}
            >
              Loading your next favorite movies
            </Text>
          </View>
        )}
      </View>
    );
  }

  private deviceWidth = Dimensions.get("window").width;
  private styles = StyleSheet.create({
    movieInfoModalOuter: {
      flex: 1,
      flexDirection: "column",
      width: this.deviceWidth * 0.9,
      height: Dimensions.get("window").height * 0.7,
      marginLeft: (this.deviceWidth * 0.1) / 2,
      marginRight: (this.deviceWidth * 0.1) / 2,
      zIndex: 99,
      backgroundColor: colors.white,
      maxHeight: Dimensions.get("window").height * 0.7,
      borderRadius: 15,
    },
  });
}
