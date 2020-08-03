import React, { Component, RefObject } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import colors from "../../assets/colors";
import BottomActionButton from "../atoms/BottomActionButton";
import { Movie } from "../../types/Movie";

interface BBprops {
  flref: RefObject<FlatList<Movie>>;
}
interface BBstate {}

export default class BottomBar extends Component<BBprops, BBstate> {
  render() {
    return (
      <View style={styles.bottombar}>
        <View>
          <BottomActionButton
            iconname="times"
            iconcolor="#BF3B3B"
            solid={true}
            flag="DISLIKE"
            flref={this.props.flref}
          />
        </View>

        <View>
          <View style={styles.doubleView}>
            <BottomActionButton
              iconname="eye"
              iconcolor="#468EDC"
              solid={false}
              flag="SEEN"
              flref={this.props.flref}
            />
          </View>

          <View style={styles.doubleView}>
            <BottomActionButton
              iconname="info"
              iconcolor="#DDDDDD"
              solid={true}
              flag="INFO"
              flref={this.props.flref}
            />
          </View>
        </View>

        <View>
          <BottomActionButton
            iconname="heart"
            iconcolor="#49CF97"
            solid={true}
            flag="LIKE"
            flref={this.props.flref}
          />
        </View>
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
  doubleView: {
    flex: 1,
    justifyContent: "center",
  },
});
