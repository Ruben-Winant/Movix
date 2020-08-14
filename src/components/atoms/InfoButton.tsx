import React, { Component } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { View, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface IbProps {
  handleClick: Function;
}
interface IbState {}

export default class InfoButton extends Component<IbProps, IbState> {
  render() {
    return (
      <TouchableWithoutFeedback
        style={stylesheets.infoButtonOutter}
        onPress={() => this.props.handleClick()}
      >
        <View>
          <FontAwesome5
            name="info-circle"
            size={30}
            color="white"
            style={stylesheets.infoButtonInner}
            solid={true}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const stylesheets = StyleSheet.create({
  infoButtonOutter: {
    justifyContent: "center",
    padding: "auto",
    width: 40,
    height: 40,
  },
  infoButtonInner: { alignSelf: "center" },
});

//USAGE
//<InfoButton infobtnfunc={() => this.onInfoButtonPress(movies[0])} />
