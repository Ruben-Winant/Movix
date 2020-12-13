import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../../assets/colors";
import BottomActionButton from "../atoms/BottomActionButton";

interface BBprops {
  handlePress: Function;
}

const BottomBar = (props: BBprops) => {
  const styles = StyleSheet.create({
    bottombar: {
      marginBottom: 30,
      flexDirection: "row",
      justifyContent: "space-around",
      marginLeft: 43,
      marginRight: 43,
      alignItems: "center",
      height: 75,
    },
  });

  return (
    <View style={styles.bottombar}>
      <BottomActionButton
        iconname="times"
        iconcolor={colors.red}
        solid={true}
        flag="DISLIKE"
        handlePress={props.handlePress}
        size={40}
      />

      <BottomActionButton
        iconname="eye"
        iconcolor={colors.blue}
        solid={false}
        flag="SEEN"
        handlePress={props.handlePress}
        size={28}
      />

      <BottomActionButton
        iconname="heart"
        iconcolor={colors.lightgreen}
        solid={true}
        flag="LIKE"
        handlePress={props.handlePress}
        size={40}
      />
    </View>
  );
};

export default BottomBar;
