import React, { Component } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { TouchableHighlight, View, StyleSheet } from "react-native";
import { Flags } from "../../types/Flags";
import { Movie } from "../../types/Movie";

interface BAbProps {
  iconname: string;
  iconcolor: string;
  solid: boolean;
  flag: Flags;
  handlePress: Function;
  movie: Movie;
}
interface BAbState {}

export default class BottomActionButton extends Component<BAbProps, BAbState> {
  constructor(props: BAbProps) {
    super(props);
    this.state = {
      curPos: 0,
    };
  }

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
}
