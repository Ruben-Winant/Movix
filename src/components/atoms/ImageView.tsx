import React, { Component } from "react";
import { View, StyleSheet, Image, Dimensions, Text } from "react-native";
import colors from "../../assets/colors";
import { Movie } from "../../types/Movie";
import { InfoButton } from "..";
import { StatusBar } from "expo-status-bar";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface IVprops {
  movie: Movie;
}
interface IVstate {}

export default class ImageView extends Component<IVprops, IVstate> {
  render() {
    return (
      <View style={styles.imageOuter}>
        <StatusBar
          translucent={false}
          hidden={false}
          backgroundColor={colors.darkblue}
        />
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

const styles = StyleSheet.create({
  imageOuter: {
    flex: 1,
    flexDirection: "column",
  },
  imageInner: {
    alignSelf: "center",
    borderRadius: 15,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.77,
    backgroundColor: "transparent",
  },
  movieInfoTitle: {
    color: colors.white,
    fontSize: 40,
    fontWeight: "bold",
  },
  movieInfoSub: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "bold",
  },
  movieInfo: {
    backgroundColor: "rgba(56,56,56,0)",
    position: "absolute",
    alignSelf: "flex-end",
    paddingRight: 20,
    paddingTop: 20,
  },
});
