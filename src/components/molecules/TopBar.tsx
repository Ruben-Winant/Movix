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
  movie: Movie;
  genre: string;
}

export const TopBar = ({ handlePress, movie, genre }: topBarProps) => {
  const styles = StyleSheet.create({
    filterbutton: {
      justifyContent: "center",
      padding: "auto",
    },
    filterbuttoncontainer: {
      width: 90,
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
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: 20,
      }}
    >
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
          <Text style={{ color: colors.white, fontSize: 17 }}>Genre </Text>
          <FontAwesome5Icon
            name="filter"
            size={14}
            color="white"
            solid={true}
            style={styles.filterbutton}
          />
        </View>
      </TouchableHighlight>
      <Text
        style={{
          color: colors.white,
          fontSize: 17,
          width: 180,
          marginLeft: "8%",
        }}
      >
        {genre}
      </Text>

      <TopActionButton
        actionbtnfunc={() => alert("user's profile")}
        iconname="user"
      />
    </View>
  );
};
