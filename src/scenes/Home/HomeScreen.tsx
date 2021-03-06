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
  requireNativeComponent,
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import "react-native-gesture-handler";
import { Movie } from "../../types/Movie";
import colors from "../../assets/colors";
import dataController from "../../assets/data/dataController";
import { Flags } from "../../types/Flags";
import { GenreList } from "../../types/GenreList";
import { BottomBar, ImageView } from "../../firebase/components";
import { TopBar } from "../../firebase/components/molecules/TopBar";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from "react-native-gesture-handler";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { add, call, cond, eq, Extrapolate, set } from "react-native-reanimated";

interface HomeScreenProps {
  navigation: NavigationStackProp<{}>;
}

const HomeScreen = (props: HomeScreenProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesLoaded, setMoviesLoaded] = useState<Boolean>(false);
  const [listPos, setListPos] = useState<number>(0);
  const [movieGenre, setGenre] = useState<string>("All");
  const [modalVisible, setModalVisible] = useState(false);
  const [currMovieId, setMovieId] = useState<number>();
  const flatlistRef = createRef<FlatList<Movie>>();
  const dataCont = new dataController({});

  useEffect(() => {
    setModalVisible(false);
    const init = async () => {
      const movies: Movie[] | undefined = await dataCont.getData2();
      if (movies != undefined && movies.length > 0) {
        setMovies(movies);
        setMoviesLoaded(true);
        setMovieId(movies[0].id);
      } else {
        alert("An unexpected error happend: 0001");
      }
    };

    init();
  }, []);

  const moveToNextItem = (flag: Flags) => {
    currMovieId ? dataCont.addMovieToList(flag, currMovieId) : null;
    if (flatlistRef !== null && flatlistRef.current !== null) {
      if (typeof flatlistRef.current.scrollToIndex === "function") {
        setListPos(listPos + 1);
        let pos = listPos + 1;
        flatlistRef.current.scrollToIndex({
          animated: false,
          index: pos,
        });
        setMovieId(movies[pos].id);
      }
    }
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
            fontSize: deviceWidth / 15,
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
      dataCont.getData2().then((res) => {
        res
          ? (setMovies(res), setMovieId(res[0].id), setMoviesLoaded(true))
          : alert("no movies found");
      });
      return;
    }

    setMoviesLoaded(false);
    dataCont.getData2().then((res) => {
      try {
        if (res != undefined) {
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
          setMovieId(fmovies[0].id);
          setMoviesLoaded(true);
        }
      } catch (error) {
        console.error(error.message);
      }
    });
  };

  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const translationX = new Animated.Value(0);

  const likeLabelOpacity = translationX.interpolate({
    inputRange: [0, deviceWidth / 4],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const dislikeLabelOpacity = translationX.interpolate({
    inputRange: [-deviceWidth / 4, 0],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
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

  const onHandlerStateChange = (nativeEvent: PanGestureHandlerGestureEvent) => {
    if (nativeEvent.nativeEvent.state === State.END) {
      if (
        nativeEvent.nativeEvent.absoluteX >= 0 &&
        nativeEvent.nativeEvent.absoluteX <= deviceWidth * 0.08 &&
        nativeEvent.nativeEvent.absoluteY >= deviceHeight * 0.25 &&
        nativeEvent.nativeEvent.absoluteY <= deviceHeight
      ) {
        moveToNextItem("DISLIKE");
      } else if (
        nativeEvent.nativeEvent.absoluteX >= deviceWidth - deviceWidth * 0.08 &&
        nativeEvent.nativeEvent.absoluteX <= deviceWidth &&
        nativeEvent.nativeEvent.absoluteY >= deviceHeight * 0.25 &&
        nativeEvent.nativeEvent.absoluteY <= deviceHeight
      ) {
        moveToNextItem("LIKE");
      }
    }
  };

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: colors.dark,
        justifyContent: "center",
      }}
    >
      <StatusBar backgroundColor={colors.dark} animated={false} />
      {moviesLoaded ? (
        <View style={{ justifyContent: "space-around" }}>
          {/* top bar */}
          <TopBar
            handlePress={() => setModalVisible(!modalVisible)}
            handleUserButtonPress={() =>
              props.navigation.navigate("UserProfile")
            }
            genre={movieGenre}
          />

          {/* movies flatlist */}
          <FlatList<Movie>
            data={movies}
            renderItem={({ item }) => (
              <PanGestureHandler
                onGestureEvent={onPanGestureEvent}
                onHandlerStateChange={onHandlerStateChange}
                activeOffsetX={[-25, 25]}
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
                  {/* like and dislike labels when swiping */}
                  <Animated.View
                    style={{
                      position: "absolute",
                      left: 50,
                      top: 50,
                      zIndex: 9999,
                      alignItems: "center",
                      opacity: likeLabelOpacity,
                    }}
                  >
                    <FontAwesome5
                      name="heart"
                      size={50}
                      color={colors.lightgreen}
                      solid={true}
                    />
                    <Text
                      style={{
                        color: colors.lightgreen,
                        fontSize: 25,
                        fontWeight: "bold",
                      }}
                    >
                      LIKE
                    </Text>
                  </Animated.View>
                  <Animated.View
                    style={{
                      position: "absolute",
                      right: 50,
                      top: 50,
                      zIndex: 9999,
                      alignItems: "center",
                      opacity: dislikeLabelOpacity,
                    }}
                  >
                    <FontAwesome5
                      name="times"
                      size={50}
                      color={colors.red}
                      solid={true}
                    />
                    <Text
                      style={{
                        color: colors.red,
                        fontSize: 25,
                        fontWeight: "bold",
                      }}
                    >
                      DISLIKE
                    </Text>
                  </Animated.View>
                  {/* image card */}
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
