import React, { Component } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { TouchableHighlight, View, StyleSheet } from "react-native";

interface TAbProps {
  iconname: string;
  actionbtnfunc: Function;
}
interface TAbState {}

export default class TopActionButton extends Component<TAbProps, TAbState> {
  stylesheets = StyleSheet.create({
    actionbtnouter: {
      justifyContent: "center",
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
        onPress={() => this.props.actionbtnfunc()}
        underlayColor="#F0F0F0"
      >
        <View>
          <FontAwesome5
            name={this.props.iconname}
            size={34}
            color="white"
            style={this.stylesheets.actionbtninner}
            solid={true}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

{
  /* <TopActionButton
            iconname="user"
            actionbtnfunc={() => this.onTopActionButtonPressAccount()}
          /> */
}
