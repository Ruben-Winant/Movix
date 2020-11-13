import React, { Component, createRef } from "react";
import {
  View,
  ActivityIndicator,
  StatusBar,
  Text,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
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
import { FlatList } from "react-native-gesture-handler";
import { firebase } from "../../firebase/firebaseConfig";

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
  excludedMovies: number[];
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
  async componentDidMount() {
    let excluded: number[] = [];

    //get active users documents
    const usersRef = await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser?.uid);

    //get the id's of all marked movies
    const doc = await usersRef.get();
    if (doc.exists) {
      excluded = doc.get("seenMovies");
      excluded = excluded.concat(doc.get("likedMovies"));
      excluded = excluded.concat(doc.get("dislikedMovies"));
      this.setState({ excludedMovies: excluded });
    } else {
      console.log("no marked movies found");
    }

    this.dataCont.getData2(this.state.excludedMovies).then((res) => {
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
  _onViewableItemsChanged = async ({ viewableItems }: any) => {
    //.key = movie id
    //.index = place in list
    //.item = movie item
    let currItem = viewableItems[0].item as Movie;
    this.setState({ currentFlatlistItem: currItem });
  };

  //create ref to flatlist
  flatlistRef = createRef<FlatList<Movie>>();

  //functions happens when one of the bottom functions is pressed
  moveToNextItem = async (flag: Flags, movie: Movie) => {
    //forward to next card
    let next = () => {
      this.setState({
        listPos: this.state.listPos + 1,
      });

      this.flatlistRef.current?.scrollToIndex({
        animated: false,
        index: this.state.listPos,
      });
    };

    //get user docs
    const usersRef = await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser?.uid);

    //mark movie as flag
    let onPressedSeen = async () => {
      try {
        usersRef.update({
          seenMovies: await firebase.firestore.FieldValue.arrayUnion(movie.id),
        });
      } catch (error) {
        console.log(error);
      }
    };

    let onPressedDisliked = async () => {
      try {
        usersRef.update({
          dislikedMovies: await firebase.firestore.FieldValue.arrayUnion(
            movie.id
          ),
        });
      } catch (error) {
        console.log(error);
      }
    };

    let onPressedLiked = async () => {
      try {
        usersRef.update({
          likedMovies: await firebase.firestore.FieldValue.arrayUnion(movie.id),
        });
      } catch (error) {
        console.log(error);
      }
    };

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
      this.dataCont.getData2(this.state.excludedMovies).then((res) => {
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
    this.dataCont.getData2(this.state.excludedMovies).then((res) => {
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
      <View
        style={{
          height: "100%",
          backgroundColor: colors.dark,
          justifyContent: "center",
        }}
      >
        <StatusBar backgroundColor={colors.dark} animated={true} />
        {this.state.moviesLoaded ? (
          <View style={{ justifyContent: "space-around" }}>
            {/* top bar */}
            <TopBar
              handlePress={() =>
                this.setState({
                  genreModalVisible: !this.state.genreModalVisible,
                })
              }
              handleUserButtonPress={() =>
                this.props.navigation.navigate("UserProfile")
              }
              genre={this.state.genre}
            />

            {/* movies cards */}
            <FlatList<Movie>
              onViewableItemsChanged={this._onViewableItemsChanged}
              data={this.state.movies}
              renderItem={({ item }) => <ImageView movie={item} />}
              removeClippedSubviews
              horizontal
              pagingEnabled
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              ref={this.flatlistRef}
              keyExtractor={(item) => item.id.toString()}
            />

            {/* bottom bar with action buttons */}
            <BottomBar
              movie={this.state.currentFlatlistItem}
              handlePress={this.moveToNextItem}
            />
            {/* modal for choosing genre filter */}
            <Modal animationType="none" visible={this.state.genreModalVisible}>
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
}
