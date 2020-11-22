import React, { Component, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  ScrollView,
  Linking,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../../assets/colors";
import { Movie } from "../../types/Movie";
import InfoButton from "./InfoButton";
import { Genre } from "../../types/Genre";
import { MovieVideo, MovieResult } from "../../types/MovieVideo";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Svg, { LinearGradient, Stop, G, Path, Defs } from "react-native-svg";

interface IVprops {
  movie: Movie;
}

const ImageView = (props: IVprops) => {
  const [showMovieInfo, setShowMovieInfo] = useState<boolean>(false);
  const [videos, setVideos] = useState<MovieVideo[]>([]);
  const deviceWidth = Dimensions.get("window").width;

  const styles = StyleSheet.create({
    imageOuter: {
      width: deviceWidth * 0.9,
      height: Dimensions.get("window").height * 0.7,
      margin: (deviceWidth * 0.1) / 2,
      zIndex: 1000,
    },
    imageInner: {
      borderRadius: 9,
      backgroundColor: "transparent",
      width: deviceWidth * 0.9,
      height: Dimensions.get("window").height * 0.7,
    },
    movieInfo: {
      position: "absolute",
      alignSelf: "flex-end",
      paddingRight: 10,
      paddingTop: 10,
    },
    movieInfoDetailsBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    movieInfoDetailsText: {
      fontSize: 18,
      color: colors.white,
      marginTop: 5,
      marginBottom: 5,
    },
  });

  useEffect(() => {
    try {
      fetch(
        "https://api.themoviedb.org/3/movie/" +
          props.movie.id +
          "/videos?api_key=396734bc8915c8d1569cb4ff49b59c56"
      )
        .then((response) => response.json())
        .then((data) => {
          let res: MovieResult = data;
          setVideos(res.results);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const movieImg = (blur: number, abs: boolean) => {
    let result = (
      <Image
        style={{
          ...styles.imageInner,
          position: abs ? "absolute" : "relative",
        }}
        source={{ uri: props.movie.posterpath }}
        blurRadius={blur}
      />
    );
    return result;
  };

  const CalcRuntime = (runtime: number) => {
    let hours = Math.floor(runtime / 60) + "h";
    let minutes = (runtime % 60) + "m";
    let result = hours + " " + minutes;
    return result;
  };

  const GetDate = (date: string) => {
    let maanden = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let dateObj = new Date(date);
    let result =
      dateObj.getDate() +
      " " +
      maanden[dateObj.getMonth()] +
      " " +
      dateObj.getFullYear();
    return result;
  };

  const GetGenres = (genres: Genre[]) => {
    let result: String = "";
    let genreNames = Object.values(genres);
    genreNames.forEach((genre) => (result += genre.name + ", "));
    return result;
  };

  const GetMovieTrailer = () => {
    let trailers: MovieVideo[] = [];

    videos.forEach((vid) =>
      vid.type === "Trailer" ? trailers.push(vid) : null
    );

    let result = trailers[0] ? (
      <FontAwesome5Icon
        onPress={() =>
          Linking.openURL("https://www.youtube.com/watch?v=" + trailers[0].key)
        }
        name="youtube"
        size={48}
        color={colors.red}
        style={{ width: 70 }}
      />
    ) : null;
    return result;
  };

  const GetTmdbLink = (link: string) => {
    return (
      <TouchableWithoutFeedback onPress={() => Linking.openURL(link)}>
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

  return (
    <View style={styles.imageOuter}>
      {showMovieInfo ? (
        <View
          style={{
            borderRadius: 15,
            width: "100%",
            height: "98%",
          }}
        >
          {/* blurred image background */}
          {movieImg(4, true)}
          {/* black overlay */}
          <View
            style={{
              ...styles.imageInner,
              position: "absolute",
              zIndex: 95,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
          ></View>
          {/* Movie details */}
          <View
            style={{
              zIndex: 100,
              height: "100%",
              padding: 37,
              flexDirection: "column",
            }}
          >
            {/* Movie title */}
            <Text
              style={{
                fontSize: 30,
                color: colors.white,
                textAlign: "left",
                marginBottom: 5,
              }}
            >
              {props.movie.title}
            </Text>

            {/* Movie details */}
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.movieInfoDetailsBlock}>
                <Text style={styles.movieInfoDetailsText}>Released:</Text>
                <Text style={styles.movieInfoDetailsText}>
                  {GetDate(props.movie.release_date)}
                </Text>
              </View>
              <View style={styles.movieInfoDetailsBlock}>
                <Text style={styles.movieInfoDetailsText}>Runtime:</Text>
                <Text style={styles.movieInfoDetailsText}>
                  {CalcRuntime(Number.parseInt(props.movie.runtime))}
                </Text>
              </View>
              <View style={styles.movieInfoDetailsBlock}>
                <Text style={styles.movieInfoDetailsText}>Avg. rating:</Text>
                <Text style={styles.movieInfoDetailsText}>
                  {props.movie.vote_average * 10 + "%"}
                </Text>
              </View>
              <View>
                <Text style={styles.movieInfoDetailsText}>Summary:</Text>
                <Text style={styles.movieInfoDetailsText}>
                  {props.movie.overview}
                </Text>
              </View>
              <View>
                <Text style={styles.movieInfoDetailsText}>Genre(s):</Text>
                <Text style={styles.movieInfoDetailsText}>
                  {GetGenres(props.movie.genres)}
                </Text>
              </View>
              <View>
                <Text style={styles.movieInfoDetailsText}>
                  Trailer & extra's:
                </Text>
                <View
                  style={{
                    margin: 4,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {GetMovieTrailer()}
                  {GetTmdbLink(props.movie.tmdblink)}
                </View>
              </View>
            </ScrollView>
          </View>
          {/* Infobutton toggle */}
          <View style={{ ...styles.movieInfo, zIndex: 99 }}>
            <InfoButton
              handleClick={() => {
                setShowMovieInfo(!showMovieInfo);
              }}
            />
          </View>
        </View>
      ) : (
        <View>
          {movieImg(0, false)}
          <View style={styles.movieInfo}>
            <InfoButton
              handleClick={() => {
                setShowMovieInfo(!showMovieInfo);
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default ImageView;
