import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../../assets/colors";
import BottomActionButton from "../atoms/BottomActionButton";

interface BBprops {}
interface BBstate {}

export default class BottomBar extends Component<BBprops, BBstate> {
  render() {
    return (
      <View style={styles.bottombar}>
        <BottomActionButton
          iconname="times"
          iconcolor="#BF3B3B"
          solid={true}
          flag="DISLIKE"
        />
        <BottomActionButton
          iconname="eye"
          iconcolor="#468EDC"
          solid={false}
          flag="SEEN"
        />
        <BottomActionButton
          iconname="heart"
          iconcolor="#49CF97"
          solid={true}
          flag="LIKE"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottombar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: 50,
    marginRight: 50,
    alignItems: "center",
  },
});
