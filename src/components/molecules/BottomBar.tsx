import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../assets/colors";
import BottomActionButton from "../atoms/BottomActionButton";
import { Movie } from "../../types/Movie";

interface BBprops {
  handlePress: Function;
  movie: Movie;
}

//! BUTTONS ARE NOT IN SYNC!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export default class BottomBar extends Component<BBprops, {}> {
  render() {
    return (
      <View style={styles.bottombar}>
        <BottomActionButton
          iconname="times"
          iconcolor={colors.red}
          solid={true}
          flag="DISLIKE"
          handlePress={this.props.handlePress}
          movie={this.props.movie}
          size={40}
        />

        <BottomActionButton
          iconname="eye"
          iconcolor={colors.blue}
          solid={false}
          flag="SEEN"
          handlePress={this.props.handlePress}
          movie={this.props.movie}
          size={28}
        />

        <BottomActionButton
          iconname="heart"
          iconcolor={colors.lightgreen}
          solid={true}
          flag="LIKE"
          handlePress={this.props.handlePress}
          movie={this.props.movie}
          size={40}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottombar: {
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: 43,
    marginRight: 43,
    alignItems: "center",
    height: 75,
  },
});
