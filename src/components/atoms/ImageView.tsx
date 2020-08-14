import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  Text,
  ScrollView,
} from "react-native";
import colors from "../../assets/colors";
import { Movie } from "../../types/Movie";
import InfoButton from "./InfoButton";

interface IVprops {
  movie: Movie;
}

interface IVstate {
  showMovieInfo: boolean;
}

export default class ImageView extends Component<IVprops, IVstate> {
  constructor(props: IVprops) {
    super(props);
    this.state = {
      showMovieInfo: false,
    };
  }

  deviceWidth = Dimensions.get("window").width;

  movieImg = (blur: number, src: string) => {
    return;
  };

  CalcRuntime = (runtime: number) => {
    let hours = Math.floor(runtime / 60) + "h";
    let minutes = (runtime % 60) + "m";
    let result = hours + " " + minutes;
    return result;
  };

  GetDate = (date: string) => {
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

  render() {
    return (
      <View style={this.styles.imageOuter}>
        {this.state.showMovieInfo ? (
          <View style={{ borderRadius: 15 }}>
            {/* blurred image background */}
            <Image
              style={{
                ...this.styles.imageInner,
                position: "absolute",
              }}
              source={{ uri: this.props.movie.posterpath }}
              blurRadius={4}
            />
            {/* black overlay */}
            <View
              style={{
                ...this.styles.imageInner,
                position: "absolute",
                zIndex: 95,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            ></View>
            {/* Movie details */}
            <View
              style={{
                zIndex: 100,
                height: "100%",
                padding: 40,
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
                {this.props.movie.title}
              </Text>

              {/* Movie details */}
              <ScrollView indicatorStyle="white">
                <View style={this.styles.movieInfoDetailsBlock}>
                  <Text style={this.styles.movieInfoDetailsText}>
                    Released:
                  </Text>
                  <Text style={this.styles.movieInfoDetailsText}>
                    {this.GetDate(this.props.movie.release_date)}
                  </Text>
                </View>
                <View style={this.styles.movieInfoDetailsBlock}>
                  <Text style={this.styles.movieInfoDetailsText}>Runtime:</Text>
                  <Text style={this.styles.movieInfoDetailsText}>
                    {this.CalcRuntime(
                      Number.parseInt(this.props.movie.runtime)
                    )}
                  </Text>
                </View>
              </ScrollView>
            </View>

            {/* Infobutton toggle */}
            <View style={{ ...this.styles.movieInfo, zIndex: 99 }}>
              <InfoButton
                handleClick={() => {
                  this.setState({
                    showMovieInfo: !this.state.showMovieInfo,
                  });
                }}
              />
            </View>
          </View>
        ) : (
          <View>
            <Image
              style={this.styles.imageInner}
              source={{ uri: this.props.movie.posterpath }}
            />
            <View style={this.styles.movieInfo}>
              <InfoButton
                handleClick={() => {
                  this.setState({
                    showMovieInfo: !this.state.showMovieInfo,
                  });
                }}
              />
            </View>
          </View>
        )}
      </View>
    );
  }

  styles = StyleSheet.create({
    imageOuter: {
      flex: 1,
      flexDirection: "column",
      width: this.deviceWidth * 0.9,
      height: Dimensions.get("window").height * 0.7,
      marginLeft: (this.deviceWidth * 0.1) / 2,
      marginRight: (this.deviceWidth * 0.1) / 2,
    },
    imageInner: {
      borderRadius: 15,
      backgroundColor: "transparent",
      width: "100%",
      height: "100%",
    },
    movieInfo: {
      backgroundColor: "rgba(56,56,56,0)",
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
      margin: 5,
    },
  });
}
