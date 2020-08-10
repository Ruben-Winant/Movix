import React, { Component } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { TouchableHighlight, StyleSheet, View } from "react-native";
import { Flags } from "../../types/Flags";
import { Movie } from "../../types/Movie";
import colors from "../../assets/colors";

interface BAbProps {
  iconname: string;
  iconcolor: string;
  solid: boolean;
  size: number;
  flag: Flags;
  handlePress: Function;
  movie: Movie;
}

export default class BottomActionButton extends Component<BAbProps, {}> {
  _onButtonPressed = () => {
    this.props.handlePress(this.props.flag, this.props.movie);
  };

  render() {
    return (
      <TouchableHighlight
        style={this.stylesheets.actionbtnouter}
        onPress={() => {
          this._onButtonPressed();
        }}
        underlayColor={colors.darker}
      >
        <View>
          <FontAwesome5
            name={this.props.iconname}
            size={this.props.size}
            color={this.props.iconcolor}
            style={this.stylesheets.actionbtninner}
            solid={this.props.solid}
          />
        </View>
      </TouchableHighlight>
    );
  }

  stylesheets = StyleSheet.create({
    actionbtnouter: {
      justifyContent: "center",
      borderRadius: 45,
      padding: "auto",
      width: this.props.size * 1.65,
      height: this.props.size * 1.65,
      backgroundColor: colors.lightdark,
      elevation: 5,
    },
    actionbtninner: {
      alignSelf: "center",
    },
  });
}
