import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { TouchableHighlight, StyleSheet, View, Text } from "react-native";
import { Flags } from "../../../types/Flags";
import colors from "../../../assets/colors";

interface BAbProps {
  iconname: string;
  iconcolor: string;
  solid: boolean;
  size: number;
  flag: Flags;
  handlePress: Function;
}

const BottomActionButton = (props: BAbProps) => {
  const _onButtonPressed = () => {
    props.handlePress(props.flag);
  };

  const stylesheets = StyleSheet.create({
    actionbtnouter: {
      justifyContent: "center",
      borderRadius: 45,
      width: props.size * 1.65,
      height: props.size * 1.65,
      backgroundColor: colors.dark,
      elevation: 5,
    },
    actionbtninner: {
      alignSelf: "center",
    },
  });

  return (
    <TouchableHighlight
      style={stylesheets.actionbtnouter}
      onPress={() => {
        _onButtonPressed();
      }}
      underlayColor={colors.darker}
    >
      <View>
        <FontAwesome5
          name={props.iconname}
          size={props.size}
          color={props.iconcolor}
          style={stylesheets.actionbtninner}
          solid={props.solid}
        />
      </View>
    </TouchableHighlight>
  );
};

export default BottomActionButton;
