import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../assets/colors";
import BottomActionButton from "../atoms/BottomActionButton";
import { Movie } from "../../types/Movie";

interface BBprops {
  handlePress: Function;
  movie: Movie;
}
interface BBstate {}

export default class BottomBar extends Component<BBprops, BBstate> {
  constructor(props: BBprops) {
    super(props);
  }

  render() {
    return (
      <View style={styles.bottombar}>
        <View>
          <BottomActionButton
            iconname="times"
            iconcolor="#BF3B3B"
            solid={true}
            flag="DISLIKE"
            handlePress={this.props.handlePress}
            movie={this.props.movie}
          />
        </View>

        <View>
          <View style={styles.doubleView}>
            <BottomActionButton
              iconname="eye"
              iconcolor="#468EDC"
              solid={false}
              flag="SEEN"
              handlePress={this.props.handlePress}
              movie={this.props.movie}
            />
          </View>

          <View style={styles.doubleView}>
            <BottomActionButton
              iconname="info"
              iconcolor="#DDDDDD"
              solid={true}
              flag="INFO"
              handlePress={this.props.handlePress}
              movie={this.props.movie}
            />
          </View>
        </View>

        <View>
          <BottomActionButton
            iconname="heart"
            iconcolor="#49CF97"
            solid={true}
            flag="LIKE"
            handlePress={this.props.handlePress}
            movie={this.props.movie}
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
