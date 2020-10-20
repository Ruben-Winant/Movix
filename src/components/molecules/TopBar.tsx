import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import TopActionButton from "../atoms/TopActionButton";
import colors from "../../assets/colors";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

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
    filterbuttoncontainer: {
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 4,
      paddingBottom: 4,
      borderRadius: 4,
      backgroundColor: colors.dark,
    },
  });

  //#region movie details funcitons
  const deviceWidth = Dimensions.get("window").width;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: (deviceWidth * 0.1) / 2,
        marginRight: (deviceWidth * 0.1) / 2,
        height: 40,
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
            size={12}
            color="white"
            solid={true}
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
