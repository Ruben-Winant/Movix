import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../assets/colors";
import BottomActionButton from "../atoms/BottomActionButton";
import { Movie } from "../../types/Movie";

interface BBprops {
  handlePress: Function;
  movie: Movie;
}

export default class BottomBar extends Component<BBprops, {}> {
  render() {
    return (
      <View style={styles.bottombar}>
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
          iconname="times"
          iconcolor={colors.red}
          solid={true}
          flag="DISLIKE"
          handlePress={this.props.handlePress}
          movie={this.props.movie}
          size={40}
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

        <BottomActionButton
          iconname="info"
          iconcolor={colors.blue}
          solid={true}
          flag="INFO"
          handlePress={this.props.handlePress}
          movie={this.props.movie}
          size={28}
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
