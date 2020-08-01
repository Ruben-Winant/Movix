import React, { Component } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { TouchableHighlight, View, StyleSheet, Text } from "react-native";
import { Movie } from "../../types/Movie";

interface BAbProps {
  iconname: string;
  iconcolor: string;
  solid: boolean;
  flag: flags;
}
interface BAbState {}

type flags = "DISLIKE" | "SEEN" | "LIKE";

export default class BottomActionButton extends Component<BAbProps, BAbState> {
  stylesheets = StyleSheet.create({
    actionbtnouter: {
      justifyContent: "center",
      borderColor: this.props.iconcolor,
      borderWidth: 6,
      borderRadius: 45,
      padding: "auto",
      width: 65,
      height: 65,
    },
    actionbtninner: {
      alignSelf: "center",
    },
  });

  getActionFunction(flag: flags, movie: Movie) {
    switch (flag) {
      case "DISLIKE":
        const onPressDislike = (movie: Movie) => {
          alert("disliked " + movie.title);
        };
        return onPressDislike(movie);

      case "SEEN":
        const onPressSeen = (movie: Movie) => {
          alert("seen " + movie.title);
        };
        return onPressSeen(movie);

      case "LIKE":
        const onPressLike = (movie: Movie) => {
          alert("liked " + movie.title);
        };
        return onPressLike(movie);

      default:
        const onPressError = () => {
          alert("Error: no movie selected");
        };
        return onPressError;
    }
  }

  render() {
    return (
      <TouchableHighlight
        style={this.stylesheets.actionbtnouter}
        onPress={() => this.getActionFunction(this.props.flag)}
        underlayColor={this.props.iconcolor}
      >
        <View>
          <FontAwesome5
            name={this.props.iconname}
            size={36}
            color={this.props.iconcolor}
            style={this.stylesheets.actionbtninner}
            solid={this.props.solid}
          />
        </View>
      </TouchableHighlight>
    );
  }
}
