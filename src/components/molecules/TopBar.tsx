import React from "react";
import { View, Text } from "react-native";
import { Movie } from "../../types/Movie";
import TopActionButton from "../atoms/TopActionButton";
import { firebase } from "./../../../src/firebase/firebaseConfig";
import colors from "../../assets/colors";

interface topBarProps {
  handlePress: Function;
  movie: Movie;
}

export const TopBar = ({ handlePress, movie }: topBarProps) => {
  alert(firebase.auth().currentUser?.displayName?.toString());
  //! CANT GET USERNAME!!!

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{ color: colors.white }}>{}</Text>
      <TopActionButton actionbtnfunc={handlePress} iconname="user" />
    </View>
  );
};
