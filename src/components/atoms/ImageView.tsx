import React, { Component } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import colors from "../../assets/colors";
import { Movie } from "../../types/Movie";
import InfoButton from "./InfoButton";

interface IVprops {
  movie: Movie;
}

export default class ImageView extends Component<IVprops, {}> {
  render() {
    return (
      <View style={styles.imageOuter}>
        <Image
          style={styles.imageInner}
          source={{ uri: this.props.movie.posterpath }}
        />
        <View style={styles.movieInfo}>
          <InfoButton />
        </View>
      </View>
    );
  }
}

const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  imageOuter: {
    flex: 1,
    flexDirection: "column",
    width: deviceWidth * 0.8,
    height: Dimensions.get("window").height * 0.7,
    marginLeft: (deviceWidth * 0.2) / 2,
    marginRight: (deviceWidth * 0.2) / 2,
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
    paddingRight: 20,
    paddingTop: 20,
  },
});
