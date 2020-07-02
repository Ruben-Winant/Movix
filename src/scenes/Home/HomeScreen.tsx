import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import "react-native-gesture-handler";

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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="This does nothing"
          onPress={() => this.props.navigation.navigate("Details")}
        />
      </View>
    );
  }
}
