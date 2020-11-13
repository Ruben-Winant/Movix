import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../../assets/colors";
import SettingMovieTypeButton from "../atoms/SettingMovieTypeButton";
import { firebase } from "../../firebase/firebaseConfig";
import { NavigationStackProp } from "react-navigation-stack";

interface iprops {
  navigation: NavigationStackProp<{}>;
}

const SettingsMovieTypeCountButtonRow = (props: iprops) => {
  const stylesheets = StyleSheet.create({
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: 15,
      marginBottom: 15,
    },
  });

  const [seen, setSeen] = useState<number[]>([]);
  const [liked, setLiked] = useState<number[]>([]);
  const [disliked, setDisliked] = useState<number[]>([]);
  const [dataLoaded, setDataLoaded] = useState<Boolean>(false);

  const getAmounts = async () => {
    //get active users documents
    const usersRef = await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser?.uid);

    //get the id's of all marked movies
    const doc = await usersRef.get();
    if (doc.exists) {
      setSeen(doc.get("seenMovies"));
      setLiked(doc.get("likedMovies"));
      setDisliked(doc.get("dislikedMovies"));
      setDataLoaded(true);
    } else {
      console.log("no marked movies found");
      setDataLoaded(false);
    }
  };

  useEffect(() => {
    getAmounts();
  }, []);

  return dataLoaded ? (
    <View style={stylesheets.row}>
      <SettingMovieTypeButton
        color={colors.red}
        iconname="times"
        onClickFunction={() =>
          props.navigation.navigate("MovieCollection", {
            type: "disliked",
            excluded: disliked,
          })
        }
        displayText={disliked.length.toString()}
      />
      <SettingMovieTypeButton
        color={colors.lightblue}
        iconname="eye"
        onClickFunction={() =>
          props.navigation.navigate("MovieCollection", {
            type: "seen",
            excluded: seen,
          })
        }
        displayText={seen.length.toString()}
      />
      <SettingMovieTypeButton
        color={colors.lightgreen}
        iconname="heart"
        onClickFunction={() =>
          props.navigation.navigate("MovieCollection", {
            type: "liked",
            excluded: liked,
          })
        }
        displayText={liked.length.toString()}
      />
    </View>
  ) : (
    <View></View>
  );
};

export default SettingsMovieTypeCountButtonRow;
