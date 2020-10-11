import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Linking,
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import colors from "../../assets/colors";
import { TextInput } from "react-native-gesture-handler";
import firebase from "firebase";
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg";

interface UserProfileProps {
  navigation: NavigationStackProp<{}>;
}
interface UserProfileState {
  user: firebase.User;
  username: string;
  newPasswd: string;
  profileViewCollapse: boolean;
}

export default class LoginScreen extends Component<
  UserProfileProps,
  UserProfileState
> {
  constructor(props: UserProfileProps) {
    super(props);
    this.state = {
      user: firebase.auth().currentUser,
      username: firebase.auth().currentUser?.displayName,
      newPasswd: "",
      profileViewCollapse: true,
    };
  }

  private deviceWidth = Dimensions.get("window").width;

  setUsername = (text: string) => {
    this.setState({
      username: text,
    });
  };

  setCurrentPassword = (text: string) => {
    this.setState({
      currPasswd: text,
    });
  };

  setNewPasswd = (text: string) => {
    this.setState({
      newPasswd: text,
    });
  };

  setNewPasswdConfirm = (text: string) => {
    this.setState({
      newPasswdConfirm: text,
    });
    this.state.newPasswd == this.state.newPasswdConfirm
      ? this.setState({ passwdMatch: true })
      : null;
  };

  OnSubmitProfileChanges = () => {
    this.state.user
      .updateProfile({
        displayName: this.state.username,
      })
      .then(() => Alert.alert("Succes!", "Profile succesfully updated"))
      .catch((error) => {
        Alert.alert("Failed", "Error, " + error.message);
        console.error(error.message);
      });

    /*this.state.newPasswd
      ? firebase.auth().currentUser?.updatePassword(this.state.newPasswd)
      : null;*/
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: colors.dark,
          flex: 1,
          paddingLeft: (this.deviceWidth * 0.1) / 2,
          paddingRight: (this.deviceWidth * 0.1) / 2,
        }}
      >
        {this.state.user ? (
          <View style={{ flex: 1, padding: 20 }}>
            {/* Return button */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.goBack()}
              >
                <FontAwesome5Icon
                  name="chevron-left"
                  size={24}
                  color={colors.white}
                />
              </TouchableWithoutFeedback>
              <Text
                style={{
                  fontSize: 24,
                  color: colors.white,
                }}
              >
                {this.state.username ? this.state.username : null}
              </Text>
            </View>

            {/* User profile settings */}
            <View style={{ marginTop: 20 }}>
              <TouchableWithoutFeedback
                onPress={() =>
                  this.setState({
                    profileViewCollapse: !this.state.profileViewCollapse,
                  })
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome5Icon
                    name="user"
                    size={24}
                    color={colors.white}
                  />
                  <Text
                    style={{
                      fontSize: 24,
                      color: colors.white,
                      marginLeft: 14,
                    }}
                  >
                    User profile
                  </Text>
                  {this.state.profileViewCollapse ? (
                    <FontAwesome5Icon
                      style={{
                        alignSelf: "flex-end",
                        position: "absolute",
                        right: 0,
                      }}
                      name="chevron-right"
                      size={24}
                      color={colors.white}
                    />
                  ) : (
                    <FontAwesome5Icon
                      style={{
                        alignSelf: "flex-end",
                        position: "absolute",
                        right: 0,
                      }}
                      name="chevron-down"
                      size={24}
                      color={colors.white}
                    />
                  )}
                </View>
              </TouchableWithoutFeedback>
              <View
                style={{
                  display: this.state.profileViewCollapse ? "flex" : "none",
                }}
              >
                <View>
                  <Text style={this.styles.label}>Username</Text>
                  <TextInput
                    style={this.styles.input}
                    defaultValue={this.state.user.displayName}
                    onChangeText={(text) => this.setUsername(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                  />
                </View>
                <View>
                  <Text style={this.styles.label}>Email</Text>
                  <View>
                    <TextInput
                      style={this.styles.input}
                      underlineColorAndroid="transparent"
                      autoCapitalize="none"
                      editable={false}
                      defaultValue={this.state.user.email}
                    />
                    <FontAwesome5Icon
                      style={{
                        position: "absolute",
                        right: 10,
                        top: 10,
                      }}
                      name="lock"
                      size={24}
                      color={colors.grey}
                    />
                  </View>
                </View>
                {/* <View>
                  <Text style={this.styles.label}>New password</Text>
                  <TextInput
                    style={this.styles.input}
                    onChangeText={(text) => this.setNewPasswd(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    secureTextEntry
                  />
                </View> */}
                <TouchableOpacity
                  style={this.styles.button}
                  onPress={() => this.OnSubmitProfileChanges()}
                >
                  <Text style={this.styles.buttonTitle}>Update profile</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Movie stats */}
            {/* Liked movies */}
            {/* Seen movies */}
            {/* Disliked movies */}
            {/* App info (tmdb) */}
            <View
              style={{
                marginTop: 20,
                alignSelf: "center",
                width: 190,
              }}
            >
              <Text style={this.styles.label2}>Movie data provided by:</Text>
              <TouchableWithoutFeedback
                onPress={() => Linking.openURL("https://www.themoviedb.org")}
              >
                <Svg>
                  <Defs>
                    <LinearGradient
                      id="prefix__a"
                      y1={66.7}
                      x2={185.04}
                      y2={66.7}
                      gradientUnits="userSpaceOnUse"
                    >
                      <Stop offset={0} stopColor="#90cea1" />
                      <Stop offset={0.56} stopColor="#3cbec9" />
                      <Stop offset={1} stopColor="#00b3e5" />
                    </LinearGradient>
                  </Defs>
                  <G data-name="Layer 2">
                    <Path
                      d="M51.06 66.7A17.67 17.67 0 0168.73 49h-.1A17.67 17.67 0 0186.3 66.7a17.67 17.67 0 01-17.67 17.67h.1A17.67 17.67 0 0151.06 66.7zm82.67-31.33h32.9A17.67 17.67 0 00184.3 17.7 17.67 17.67 0 00166.63 0h-32.9a17.67 17.67 0 00-17.67 17.7 17.67 17.67 0 0017.67 17.67zm-113 98h63.9a17.67 17.67 0 0017.67-17.67A17.67 17.67 0 0084.63 98h-63.9a17.67 17.67 0 00-17.67 17.7 17.67 17.67 0 0017.67 17.67zm83.92-49h6.25L125.5 49h-8.35l-8.9 23.2h-.1L99.4 49h-8.9zm32.45 0h7.8V49h-7.8zm22.2 0h24.95V77.2H167.1V70h15.35v-7.2H167.1v-6.6h16.25V49h-24zM10.1 35.4h7.8V6.9H28V0H0v6.9h10.1zm28.9 0h7.8V20.1h15.1v15.3h7.8V0h-7.8v13.2H46.75V0H39zm41.25 0h25v-7.2H88V21h15.35v-7.2H88V7.2h16.25V0h-24zm-79 49H9V57.25h.1l9 27.15H24l9.3-27.15h.1V84.4h7.8V49H29.45l-8.2 23.1h-.1L13 49H1.2zm112.09 49H126a24.59 24.59 0 007.56-1.15 19.52 19.52 0 006.35-3.37 16.37 16.37 0 004.37-5.5 16.91 16.91 0 001.72-7.58 18.5 18.5 0 00-1.68-8.25 15.1 15.1 0 00-4.52-5.53 18.55 18.55 0 00-6.73-3.02 33.54 33.54 0 00-8.07-1h-11.71zm7.81-28.2h4.6a17.43 17.43 0 014.67.62 11.68 11.68 0 013.88 1.88 9 9 0 012.62 3.18 9.87 9.87 0 011 4.52 11.92 11.92 0 01-1 5.08 8.69 8.69 0 01-2.67 3.34 10.87 10.87 0 01-4 1.83 21.57 21.57 0 01-5 .55h-4.15zm36.14 28.2h14.5a23.11 23.11 0 004.73-.5 13.38 13.38 0 004.27-1.65 9.42 9.42 0 003.1-3 8.52 8.52 0 001.2-4.68 9.16 9.16 0 00-.55-3.2 7.79 7.79 0 00-1.57-2.62 8.38 8.38 0 00-2.45-1.85 10 10 0 00-3.18-1v-.1a9.28 9.28 0 004.43-2.82 7.42 7.42 0 001.67-5 8.34 8.34 0 00-1.15-4.65 7.88 7.88 0 00-3-2.73 12.9 12.9 0 00-4.17-1.3 34.42 34.42 0 00-4.63-.32h-13.2zm7.8-28.8h5.3a10.79 10.79 0 011.85.17 5.77 5.77 0 011.7.58 3.33 3.33 0 011.23 1.13 3.22 3.22 0 01.47 1.82 3.63 3.63 0 01-.42 1.8 3.34 3.34 0 01-1.13 1.2 4.78 4.78 0 01-1.57.65 8.16 8.16 0 01-1.78.2H165zm0 14.15h5.9a15.12 15.12 0 012.05.15 7.83 7.83 0 012 .55 4 4 0 011.58 1.17 3.13 3.13 0 01.62 2 3.71 3.71 0 01-.47 1.95 4 4 0 01-1.23 1.3 4.78 4.78 0 01-1.67.7 8.91 8.91 0 01-1.83.2h-7z"
                      fill="url(#prefix__a)"
                      data-name="Layer 1"
                    />
                  </G>
                </Svg>
              </TouchableWithoutFeedback>
            </View>
          </View>
        ) : (
          <Text></Text>
        )}
      </View>
    );
  }

  styles = StyleSheet.create({
    input: {
      height: 48,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      overflow: "hidden",
      backgroundColor: colors.lightdark,
      color: colors.white,
      paddingLeft: 15,
    },
    label: {
      color: colors.white,
      fontSize: 16,
      width: "100%",
      borderBottomColor: colors.white,
      borderBottomWidth: 1,
      marginTop: 15,
    },
    label2: {
      color: colors.white,
      fontSize: 16,
      width: "100%",
      marginTop: 15,
      marginBottom: 15,
    },
    error: {
      fontSize: 14,
      color: colors.red,
    },
    button: {
      backgroundColor: colors.lightgreen,
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonTitle: {
      color: colors.white,
      fontSize: 18,
      fontWeight: "bold",
    },
  });
}
