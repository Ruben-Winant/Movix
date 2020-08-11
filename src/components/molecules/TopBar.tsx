import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Movie } from "../../types/Movie";
import TopActionButton from "../atoms/TopActionButton";
import { firebase } from "./../../../src/firebase/firebaseConfig";
import colors from "../../assets/colors";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

interface topBarProps {
  handlePress: Function;
  movie: Movie;
}

export const TopBar = ({ handlePress, movie }: topBarProps) => {
  const styles = StyleSheet.create({
    filterbutton: {
      justifyContent: "center",
      borderRadius: 45,
      padding: "auto",
    },
    filterbuttoncontainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      width: 90,
      backgroundColor: colors.lightdark,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 4,
      paddingBottom: 4,
      borderRadius: 45,
      elevation: 36,
    },
  });

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 40,
        marginRight: 40,
        marginTop: 8,
      }}
    >
      <TouchableWithoutFeedback>
        <View style={styles.filterbuttoncontainer}>
          <Text style={{ color: colors.white, fontSize: 17 }}>Filter</Text>
          <FontAwesome5Icon
            name="filter"
            size={16}
            color="white"
            solid={true}
            style={styles.filterbutton}
          />
        </View>
      </TouchableWithoutFeedback>
      <Text
        style={{
          color: colors.white,
          fontSize: 17,
          overflow: "scroll",
          width: 180,
        }}
      >
        genre comes here
      </Text>
      <TopActionButton actionbtnfunc={handlePress} iconname="user" />
    </View>
  );
};
