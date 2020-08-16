import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import { Movie } from "../../types/Movie";
import TopActionButton from "../atoms/TopActionButton";
import { firebase } from "./../../../src/firebase/firebaseConfig";
import colors from "../../assets/colors";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { Genre } from "../../types/Genre";

interface topBarProps {
  handlePress: Function;
  handleUserButtonPress: Function;
  genre: string;
}

export const TopBar = ({
  handlePress,
  genre,
  handleUserButtonPress,
}: topBarProps) => {
  const styles = StyleSheet.create({
    filterbutton: {
      justifyContent: "center",
      padding: "auto",
    },
    filterbuttoncontainer: {
      backgroundColor: colors.lightdark,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 4,
      paddingBottom: 4,
      elevation: 5,
      borderRadius: 45,
    },
  });

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 20,
      }}
    >
      {/* genre's section */}
      <TouchableHighlight
        onPress={() => handlePress()}
        underlayColor={colors.darker}
        style={styles.filterbuttoncontainer}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Text style={{ color: colors.white, fontSize: 17 }}>
            {genre ? genre : "genre"}{" "}
          </Text>
          <FontAwesome5Icon
            name="filter"
            size={14}
            color="white"
            solid={true}
            style={styles.filterbutton}
          />
        </View>
      </TouchableHighlight>

      {/* User menu button */}
      <TopActionButton
        actionbtnfunc={() => handleUserButtonPress()}
        iconname="user"
      />
    </View>
  );
};
