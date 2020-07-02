import React, { Component } from "react";
import { Text, View, Button, Image } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import "react-native-gesture-handler";
import { Movie } from "../../types/Movie";
import ActionButton from "../../components/atoms/ActionButton";

const movies: Movie[] = require("../../assets/data/movies.json");

interface HomeScreenProps {
  navigation: NavigationStackProp<{}>;
}

interface HomeScreenState {}

export default class HomeScreen extends Component<
  HomeScreenProps,
  HomeScreenState
> {
  //functions for controlling the seen, like and dislike buttons
  onActionButtonPressSeen(movid: number) {
    alert("seen movie " + movid);
  }

  onActionButtonPressInterested(movid: number) {
    alert("interested in movie " + movid);
  }

  onActionButtonPressNotInterested(movid: number) {
    alert("not interested in movie " + movid);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={{ uri: movies[0].posterpath }}
          style={{ width: 300, height: 400 }}
        />
        <Text>{movies[0].title}</Text>
        <View></View>
      </View>
    );
  }
}
