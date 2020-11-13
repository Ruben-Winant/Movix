import React from "react";
import { StyleSheet, Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface SmallPosterCardProps {
  onClickPoster: Function;
  posterPath: string;
}

const SmallPosterCard = (props: SmallPosterCardProps) => {
  const styles = StyleSheet.create({
    posterImage: {
      borderRadius: 5,
      width: 95,
      height: 145,
      margin: 11,
    },
  });

  return (
    <TouchableWithoutFeedback onPress={() => props.onClickPoster()}>
      <Image style={styles.posterImage} source={{ uri: props.posterPath }} />
    </TouchableWithoutFeedback>
  );
};

export default SmallPosterCard;
