import React, { Component } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { View, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface TAbProps {
  iconname: string;
  actionbtnfunc: Function;
}
interface TAbState {}

export default class TopActionButton extends Component<TAbProps, TAbState> {
  render() {
    return (
      <TouchableWithoutFeedback
        style={this.stylesheets.actionbtnouter}
        onPress={() => this.props.actionbtnfunc()}
      >
        <View>
          <FontAwesome5
            name={this.props.iconname}
            size={28}
            color="white"
            style={this.stylesheets.actionbtninner}
            solid={true}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  stylesheets = StyleSheet.create({
    actionbtnouter: {
      justifyContent: "center",
      borderRadius: 45,
      padding: "auto",
      width: 40,
      height: 40,
    },
    actionbtninner: {
      alignSelf: "center",
    },
  });
}
