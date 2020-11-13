import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { View, StyleSheet, Text } from "react-native";
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import colors from "../../assets/colors";

interface SmtbProps {
  iconname: string;
  onClickFunction: Function;
  displayText: string;
  color: colors;
}

const SettingMovieTypeButton = (props: SmtbProps) => {
  const stylesheets = StyleSheet.create({
    outerButton: {
      height: 99,
      width: 75,
      backgroundColor: "#3E3E3E",
      borderRadius: 7,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    innerButton: {
      alignItems: "center",
    },
    icon: {},
    text: { color: colors.white, fontSize: 25 },
  });

  return (
    <TouchableHighlight
      style={stylesheets.outerButton}
      onPress={() => props.onClickFunction()}
    >
      <View style={stylesheets.innerButton}>
        <FontAwesome5
          name={props.iconname}
          size={45}
          color={props.color}
          style={stylesheets.icon}
          solid={true}
        />
        <Text style={stylesheets.text}>{props.displayText}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default SettingMovieTypeButton;
