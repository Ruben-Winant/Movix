import React, { Component } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { TouchableHighlight, View, StyleSheet } from "react-native";

interface AbProps {
  iconname: string;
  iconcolor: string;
  solid: boolean;
  btnfunc: Function;
}
interface AbState {}

export default class ActionButton extends Component<AbProps, AbState> {
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

  render() {
    return (
      <TouchableHighlight
        style={this.stylesheets.actionbtnouter}
        onPress={() => this.props.btnfunc()}
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

{
  /* <ActionButton
            iconname="eye"
            iconcolor="#468EDC"
            solid={false}
            btnfunc={() => this.onActionButtonPressSeen(movies[0].id)}
          />
          <ActionButton
            iconname="times"
            iconcolor="#BF3B3B"
            solid={true}
            btnfunc={() => this.onActionButtonPressNotInterested(movies[0].id)}
          />
          <ActionButton
            iconname="heart"
            iconcolor="#49CF97"
            solid={true}
            btnfunc={() => this.onActionButtonPressInterested(movies[0].id)}
          /> */
}
