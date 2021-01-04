import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
  Image,
  Linking,
  StatusBar,
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import colors from "../../assets/colors";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { Movie } from "../../types/Movie";
import { LinearGradient as Ln } from "expo-linear-gradient";
import { Genre } from "../../types/Genre";
import { MovieResult, MovieVideo } from "../../types/MovieVideo";
import Svg, { Defs, G, Path, Stop, LinearGradient } from "react-native-svg";
import { BottomActionButton } from "../../firebase/components";
import dataController from "../../assets/data/dataController";

interface MovieDetailProps {
  navigation: NavigationStackProp<{}>;
}

const MovieDetailScreen = (props: MovieDetailProps) => {
  const [movie, setMovie] = useState<Movie>(props.navigation.getParam("movie"));
  const [dataLoaded, setLoaded] = useState<Boolean>(false);
  const [videos, setVideos] = useState<MovieVideo[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [currentMark, setCurrentMark] = useState<string>(
    props.navigation.getParam("mark")
  );
  const dataCont = new dataController({});

  useEffect(() => {
    try {
      setMovie(props.navigation.getParam("movie"));
      fetch(
        "https://api.themoviedb.org/3/movie/" +
          movie.id +
          "/videos?api_key=396734bc8915c8d1569cb4ff49b59c56"
      )
        .then((response) => response.json())
        .then((data) => {
          let res: MovieResult = data;
          setVideos(res.results);
          setLoaded(true);
        });
    } catch (error) {
      setLoaded(false);
    }
  }, []);

  const deviceWidth = Dimensions.get("window").width;

  const genreList = (genres: Genre[]) => {
    let result: any[] = [];

    Object.values(genres).forEach((genre) => {
      if (genre.id != null && typeof genre.id != "undefined") {
        result.push(
          <View style={styles.genreBox}>
            <Text style={styles.genreText}>{genre.name}</Text>
          </View>
        );
      }
    });
    return (
      <View style={styles.genresOuter}>
        <View style={styles.genresInner}>{result}</View>
      </View>
    );
  };

  const GetMovieTrailer = () => {
    let trailers: MovieVideo[] = [];

    videos.forEach((vid) =>
      vid.type === "Trailer" ? trailers.push(vid) : null
    );

    let result = trailers[0] ? (
      <TouchableWithoutFeedback
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          width: 110,
          marginTop: 15,
          marginBottom: 5,
        }}
        onPress={() =>
          Linking.openURL("https://www.youtube.com/watch?v=" + trailers[0].key)
        }
      >
        <FontAwesome5Icon
          name="youtube"
          size={38}
          color={colors.red}
          style={{ padding: 4 }}
        />
        <Text style={{ color: colors.white, fontSize: 18 }}>Trailer</Text>
      </TouchableWithoutFeedback>
    ) : null;
    return result;
  };

  const GetTmdbLink = (link: string) => {
    return (
      <TouchableWithoutFeedback
        style={{ alignItems: "center", marginTop: 15, marginBottom: 15 }}
        onPress={() => Linking.openURL(link)}
      >
        <Text style={styles.smallText}>Data provide by:</Text>
        <Svg style={{ width: 180, height: 50 }} viewBox="0 0 273.42 35.52">
          <Defs>
            <LinearGradient
              id="prefix__a"
              y1={17.76}
              x2={273.42}
              y2={17.76}
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset={0} stopColor="#90cea1" />
              <Stop offset={0.56} stopColor="#3cbec9" />
              <Stop offset={1} stopColor="#00b3e5" />
            </LinearGradient>
          </Defs>
          <G data-name="Layer 2">
            <Path
              d="M191.85 35.37h63.9a17.67 17.67 0 0017.67-17.67A17.67 17.67 0 00255.75 0h-63.9a17.67 17.67 0 00-17.67 17.7 17.67 17.67 0 0017.67 17.67zm-181.75.05h7.8V6.92H28V0H0v6.9h10.1zm28.1 0H46V8.25h.1l8.95 27.15h6L70.3 8.25h.1V35.4h7.8V0H66.45l-8.2 23.1h-.1L50 0H38.2zM89.14.12h11.7a33.56 33.56 0 018.08 1 18.52 18.52 0 016.67 3.08 15.09 15.09 0 014.53 5.52 18.5 18.5 0 011.67 8.25 16.91 16.91 0 01-1.62 7.58 16.3 16.3 0 01-4.38 5.5 19.24 19.24 0 01-6.35 3.37 24.53 24.53 0 01-7.55 1.15H89.14zm7.8 28.2h4a21.66 21.66 0 005-.55A10.58 10.58 0 00110 26a8.73 8.73 0 002.68-3.35 11.9 11.9 0 001-5.08 9.87 9.87 0 00-1-4.52 9.17 9.17 0 00-2.63-3.18A11.61 11.61 0 00106.22 8a17.06 17.06 0 00-4.68-.63h-4.6zM133.09.12h13.2a32.87 32.87 0 014.63.33 12.66 12.66 0 014.17 1.3 7.94 7.94 0 013 2.72 8.34 8.34 0 011.15 4.65 7.48 7.48 0 01-1.67 5 9.13 9.13 0 01-4.43 2.82V17a10.28 10.28 0 013.18 1 8.51 8.51 0 012.45 1.85 7.79 7.79 0 011.57 2.62 9.16 9.16 0 01.55 3.2 8.52 8.52 0 01-1.2 4.68 9.32 9.32 0 01-3.1 3 13.38 13.38 0 01-4.27 1.65 22.5 22.5 0 01-4.73.5h-14.5zm7.8 14.15h5.65a7.65 7.65 0 001.78-.2 4.78 4.78 0 001.57-.65 3.43 3.43 0 001.13-1.2 3.63 3.63 0 00.42-1.8A3.3 3.3 0 00151 8.6a3.42 3.42 0 00-1.23-1.13A6.07 6.07 0 00148 6.9a9.9 9.9 0 00-1.85-.18h-5.3zm0 14.65h7a8.27 8.27 0 001.83-.2 4.67 4.67 0 001.67-.7 3.93 3.93 0 001.23-1.3 3.8 3.8 0 00.47-1.95 3.16 3.16 0 00-.62-2 4 4 0 00-1.58-1.18 8.23 8.23 0 00-2-.55 15.12 15.12 0 00-2.05-.15h-5.9z"
              fill="url(#prefix__a)"
              data-name="Layer 1"
            />
          </G>
        </Svg>
      </TouchableWithoutFeedback>
    );
  };

  const createMarkLabel = () => {
    let color: colors = colors.dark;
    switch (currentMark) {
      case "seen":
        color = colors.blue;
        break;

      case "liked":
        color = colors.lightgreen;
        break;

      case "disliked":
        color = colors.red;
        break;

      default:
        break;
    }

    return (
      <View
        style={{
          alignItems: "center",
          display: "flex",
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        <Text style={styles.smallText}>
          {"Currently marked as "}
          <Text style={{ color: color }}>{currentMark}</Text>
        </Text>
        <TouchableWithoutFeedback onPress={() => setModal(true)}>
          <Text
            style={{
              color: colors.grey,
              fontSize: 18,
            }}
          >
            Change
          </Text>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const changeMark = (oldMark: string, newMark: string, id: number) => {
    try {
      dataCont.addMovieToList(newMark, id);
      dataCont.removeMovieFromList(oldMark, id);
      setCurrentMark(newMark);
      setModal(!modal);
    } catch (error) {
      alert(error);
    }
  };

  const styles = StyleSheet.create({
    outer: {
      display: "flex",
      flex: 1,
      justifyContent: "space-between",
    },
    inner: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: "60%",
      maxHeight: "60%",
      bottom: 0,
    },
    text: {
      color: colors.white,
      fontSize: 40,
      margin: 19,
      fontWeight: "300",
      textAlign: "center",
    },
    smallText: {
      fontSize: 18,
      color: colors.white,
      textAlign: "center",
      width: "80%",
    },
    header: {
      marginTop: "15%",
      marginBottom: 20,
      paddingLeft: deviceWidth * 0.1,
      paddingRight: (deviceWidth * 0.1) / 2,
    },
    image: {
      width: deviceWidth,
      height: 650,
      position: "absolute",
      top: -40,
      zIndex: -1,
    },
    titleCard: {
      display: "flex",
      justifyContent: "flex-start",
    },
    genresOuter: {
      alignItems: "center",
      display: "flex",
    },
    genresInner: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      width: "80%",
      marginTop: 3,
      marginBottom: 3,
    },
    genreBox: {
      borderRadius: 5,
      borderColor: colors.white,
      borderWidth: 1.5,
      marginTop: 1,
      marginBottom: 1,
    },
    genreText: {
      color: colors.white,
      textAlign: "center",
      paddingLeft: 3,
      paddingRight: 3,
    },
  });

  return dataLoaded ? (
    <View style={styles.outer}>
      <StatusBar />
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
          <FontAwesome5Icon
            name="chevron-left"
            size={24}
            color={colors.white}
          />
        </TouchableWithoutFeedback>
      </View>
      <Image source={{ uri: movie.posterpath }} style={styles.image} />

      <Ln
        style={styles.inner}
        colors={[
          "transparent",
          "rgba(0,0,0,1)",
          "rgba(0,0,0,1)",
          "rgba(0,0,0,1)",
          "rgba(0,0,0,1)",
          "rgba(0,0,0,1)",
        ]}
      >
        {/* title */}
        <View style={styles.titleCard}>
          <Text style={styles.text}>{movie.title}</Text>
        </View>
        <ScrollView>
          {/* genres */}
          {genreList(movie.genres)}

          {/* trailer, runtime, rating */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "12%",
              marginRight: "12%",
              justifyContent: "space-between",
            }}
          >
            {GetMovieTrailer()}
            <View>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 16,
                  textAlign: "right",
                }}
              >
                runtime: {movie.runtime} min
              </Text>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 16,
                  textAlign: "right",
                }}
              >
                rating: {movie.vote_average * 10}%
              </Text>
            </View>
          </View>

          {/* summary */}
          <View style={styles.genresOuter}>
            <Text
              style={{ color: colors.white, fontSize: 21, fontWeight: "bold" }}
            >
              Summary:
            </Text>
            <Text
              style={{
                color: colors.white,
                fontSize: 18,
                marginLeft: "12%",
                marginRight: "12%",
                textAlign: "justify",
              }}
            >
              {movie.overview}
            </Text>
          </View>

          {/* Mark management */}
          {createMarkLabel()}
          {/* providers */}
          <View>{GetTmdbLink(movie.tmdblink)}</View>
        </ScrollView>
      </Ln>

      {modal ? (
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.85)",
            position: "absolute",
            width: deviceWidth,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.smallText}>Change your mark for:</Text>
          <Text style={styles.text}>{movie.title}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              margin: 35,
              justifyContent: "space-around",
              width: "80%",
            }}
          >
            <BottomActionButton
              iconname="times"
              iconcolor={colors.red}
              solid={true}
              flag="DISLIKE"
              handlePress={() =>
                changeMark(
                  props.navigation.getParam("mark"),
                  "disliked",
                  movie.id
                )
              }
              size={40}
            />

            <BottomActionButton
              iconname="eye"
              iconcolor={colors.blue}
              solid={true}
              flag="SEEN"
              handlePress={() =>
                changeMark(props.navigation.getParam("mark"), "seen", movie.id)
              }
              size={40}
            />
            <BottomActionButton
              iconname="heart"
              iconcolor={colors.lightgreen}
              solid={true}
              flag="LIKE"
              handlePress={() =>
                changeMark(props.navigation.getParam("mark"), "liked", movie.id)
              }
              size={40}
            />
          </View>
          <TouchableWithoutFeedback onPress={() => setModal(!modal)}>
            <Text
              style={{
                fontSize: 21,
                color: colors.white,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Return
            </Text>
          </TouchableWithoutFeedback>
        </View>
      ) : null}
    </View>
  ) : (
    <View
      style={{
        backgroundColor: colors.dark,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={100} color={colors.blue} />
    </View>
  );
};

export default MovieDetailScreen;
