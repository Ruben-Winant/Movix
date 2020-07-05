import React, { Component } from "react";
import { View, Image } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import "react-native-gesture-handler";
import { Movie } from "../../types/Movie";
import { BottomBar } from "../../components/index";
import colors from "../../assets/colors";
import ImageSlide from "../../components/molecules/ImageSlide";

interface HomeScreenProps {
  navigation: NavigationStackProp<{}>;
}

interface HomeScreenState {}

export default class HomeScreen extends Component<
  HomeScreenProps,
  HomeScreenState
> {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.darkblue }}>
        {
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <ImageSlide />
            </View>
            <View style={{ flex: 1 }}>
              <BottomBar />
            </View>
          </View>
        }
      </View>
    );
  }
}
