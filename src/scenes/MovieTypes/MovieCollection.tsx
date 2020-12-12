import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import SmallPosterCard from "../../components/atoms/SmallPosterCard";
import { NavigationStackProp } from "react-navigation-stack";
import colors from "../../assets/colors";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import dataController from "../../assets/data/dataController";
import { Movie } from "../../types/Movie";

interface MovieCollectionProps {
  navigation: NavigationStackProp<{}>;
}

const MovieCollection = (props: MovieCollectionProps) => {
  const [title, setTitle] = useState<String>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [dataLoaded, setLoaded] = useState<boolean>(false);
  const deviceWidth = Dimensions.get("window").width;

  useEffect(() => {
    getApiData();
  }, []);

  const getApiData = () => {
    let type: string = props.navigation.getParam("type");
    if (type != "" && type != null) {
      type === "seen" ? setTitle("seen") : null;
      type === "liked" ? setTitle("liked") : null;
      type === "disliked" ? setTitle("disliked") : null;
    }

    let dataCont = new dataController({});
    let excluded: number[] = props.navigation.getParam("excluded");
    dataCont.getSpecificData(excluded).then((res) => {
      if (res) {
        setMovies(res);
        setLoaded(true);
      } else {
        setLoaded(false);
      }
    });
  };

  const styles = StyleSheet.create({
    outer: { backgroundColor: colors.dark, display: "flex", flex: 1 },
    inner: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      paddingLeft: (deviceWidth * 0.1) / 2,
      paddingRight: (deviceWidth * 0.1) / 2,
    },
    text: {
      color: colors.white,
      fontSize: 27,
      marginLeft: 19,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
      marginBottom: 20,
      paddingLeft: (deviceWidth * 0.1) / 2,
      paddingRight: (deviceWidth * 0.1) / 2,
    },
    list: { maxHeight: "90%" },
  });

  return dataLoaded ? (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
            <FontAwesome5Icon
              name="chevron-left"
              size={24}
              color={colors.white}
            />
          </TouchableWithoutFeedback>
          <Text style={styles.text}>{title}</Text>
        </View>

        <FlatList
          contentContainerStyle={{ justifyContent: "center" }}
          style={styles.list}
          data={movies}
          renderItem={(item) => (
            <SmallPosterCard
              onClickPoster={() =>
                props.navigation.navigate("MovieDetailScreen", {
                  movie: item.item,
                  mark: props.navigation.getParam("type"),
                })
              }
              posterPath={item.item.posterpath}
            />
          )}
          removeClippedSubviews
          numColumns={3}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  ) : (
    <View
      style={{
        backgroundColor: colors.dark,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={100} color={colors.blue} />
      <Text
        style={{
          color: colors.white,
          fontSize: 24,
          width: "60%",
          textAlign: "center",
        }}
      >
        Loading the movies you've {title}
      </Text>
    </View>
  );
};

export default MovieCollection;
