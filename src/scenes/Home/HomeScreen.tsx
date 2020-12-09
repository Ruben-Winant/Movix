import React, { createRef, useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  StatusBar,
  Text,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
  Animated,
  Dimensions,
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
import { firebase } from "../../firebase/firebaseConfig";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { concat, Extrapolate, interpolate } from "react-native-reanimated";

interface HomeScreenProps {
  navigation: NavigationStackProp<{}>;
}

const HomeScreen = (props: HomeScreenProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesLoaded, setMoviesLoaded] = useState<Boolean>(false);
  const [listPos, setListPos] = useState<number>(0);
  const [movieGenre, setGenre] = useState<string>("All");
  const [modalVisible, setModalVisible] = useState(false);
  const [excludedMovies, setExcludedMovies] = useState<number[]>([]);
  const [currMovieId, setMovieId] = useState<number>();
  const flatlistRef = createRef<FlatList<Movie>>();
  const dataCont = new dataController({});

  useEffect(() => {
    let excluded: number[] = [];
    setModalVisible(false);

    const retrieveData = async () => {
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
        setExcludedMovies(excluded);
      }
    };

    retrieveData().then(() =>
      dataCont.getData2(excluded).then((res) => {
        res
          ? (setMovies(res), setMoviesLoaded(true), setMovieId(res[0].id))
          : alert("no movies found");
      })
    );
  }, []);

  const moveToNextItem = (flag: Flags) => {
    currMovieId ? dataCont.addMovieToList(flag, currMovieId) : null;

    if (flatlistRef !== null && flatlistRef.current !== null) {
      if (typeof flatlistRef.current.scrollToIndex === "function") {
        setListPos(listPos + 1);
        flatlistRef.current.scrollToIndex({ animated: false, index: listPos });
      }
    }

    setMovieId(movies[listPos].id);
  };

  const MakeGenreButtonList = () => {
    let genreButtons: any[] = [];
    GenreList.forEach((genre) => {
      let color = movieGenre === genre ? colors.blue : colors.white;
      genreButtons.push(
        <Text
          key={genre}
          onPress={() => {
            setModalVisible(!modalVisible);
            setGenre(genre);
            FilterMovies(genre);
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

  const FilterMovies = (genre: string) => {
    if (genre === "All") {
      setMoviesLoaded(false);
      dataCont.getData2(excludedMovies).then((res) => {
        res
          ? (setMovies(res), setMoviesLoaded(true))
          : alert("no movies found");
      });
      return;
    }

    setMoviesLoaded(false);
    dataCont.getData2(excludedMovies).then((res) => {
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
        setMoviesLoaded(false);
        setMovies(fmovies);
        setMoviesLoaded(true);
      } catch (error) {
        console.error(error.message);
      }
    });
  };

  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const translationX = new Animated.Value(0);

  const rot = translationX.interpolate({
    inputRange: [-deviceWidth / 2, deviceWidth / 2],
    outputRange: ["13deg", "-13deg"],
    extrapolate: Extrapolate.CLAMP,
  });

  const onPanGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translationX,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (
    nativeEvent: PanGestureHandlerGestureEvent
  ) => {};

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: colors.dark,
        justifyContent: "center",
      }}
    >
      <StatusBar backgroundColor={colors.dark} animated={true} />
      {moviesLoaded && currMovieId ? (
        <View style={{ justifyContent: "space-around" }}>
          {/* top bar */}
          <TopBar
            handlePress={() => setModalVisible(!modalVisible)}
            handleUserButtonPress={() =>
              props.navigation.navigate("UserProfile")
            }
            genre={movieGenre}
          />

          {/* movies cards */}
          <FlatList<Movie>
            data={movies}
            renderItem={({ item }) => (
              <PanGestureHandler
                onGestureEvent={onPanGestureEvent}
                onHandlerStateChange={onHandlerStateChange}
                activeOffsetX={[-50, 50]}
                maxPointers={1}
              >
                <Animated.View
                  style={[
                    {},
                    {
                      transform: [
                        {
                          translateX: Animated.add(
                            translationX,
                            new Animated.Value(0)
                          ),
                        },
                        {
                          rotate: rot,
                        },
                      ],
                    },
                  ]}
                >
                  <ImageView movie={item} />
                </Animated.View>
              </PanGestureHandler>
            )}
            horizontal
            pagingEnabled
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            ref={flatlistRef}
            keyExtractor={(item) => item.id.toString()}
          />

          {/* bottom bar with action buttons */}
          <BottomBar handlePress={moveToNextItem} />

          {/* modal for choosing genre filter */}
          <Modal animationType="none" visible={modalVisible}>
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
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{ padding: 5 }}
                >
                  <FontAwesome5Icon
                    name="chevron-left"
                    size={34}
                    color={colors.white}
                  />
                </TouchableWithoutFeedback>
              </View>

              {MakeGenreButtonList()}
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
};

export default HomeScreen;
