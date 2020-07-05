import React, { Component } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { View, StyleSheet, Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import colors from "../../assets/colors";

interface RbProps {
  refreshbtnfunc: Function;
  amtMovs: number;
}
interface RbState {}

export default class RefreshButton extends Component<RbProps, RbState> {
  render() {
    return (
      <TouchableWithoutFeedback
        style={stylesheets.RefreshButtonOutter}
        onPress={() => this.props.refreshbtnfunc()}
      >
        <View style={stylesheets.RefreshButtonContent}>
          <FontAwesome5
            name="redo"
            size={24}
            color="white"
            style={stylesheets.RefreshButtonIcon}
            solid={true}
          />
          <Text style={stylesheets.RefreshButtonText}>
            {this.props.amtMovs}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const stylesheets = StyleSheet.create({
  RefreshButtonOutter: {
    width: "auto",
    height: "auto",
    borderRadius: 25,
    backgroundColor: colors.lightgreen,
  },
  RefreshButtonContent: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 4,
    marginTop: 4,
  },
  RefreshButtonIcon: {
    marginRight: 12,
    alignSelf: "center",
  },
  RefreshButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 2,
  },
});

//USAGE
{
  /* <RefreshButton
          refreshbtnfunc={() => this.onRefreshButtonPress()}
          amtMovs={100}
        /> */
}
