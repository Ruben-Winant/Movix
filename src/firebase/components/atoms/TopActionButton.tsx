import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { View, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface TAbProps {
  iconname: string;
  actionbtnfunc: Function;
}

const TopActionButton = (props: TAbProps) => {
  const stylesheets = StyleSheet.create({
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

  return (
    <TouchableWithoutFeedback
      style={stylesheets.actionbtnouter}
      onPress={() => props.actionbtnfunc()}
    >
      <View>
        <FontAwesome5
          name={props.iconname}
          size={24}
          color="white"
          style={stylesheets.actionbtninner}
          solid={true}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TopActionButton;
