import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import firebase from "firebase";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import colors from "../../assets/colors";
import { TextInput } from "react-native-gesture-handler";

interface UserProfileProps {
  navigation: NavigationStackProp<{}>;
}
interface UserProfileState {
  user: firebase.User;
  username: string;
  currPasswd: string;
  newPasswd: string;
  newPasswdConfirm: string;
  passwdMatch: boolean;
  profileViewCollapse: boolean;
}

export default class LoginScreen extends Component<
  UserProfileProps,
  UserProfileState
> {
  constructor(props: UserProfileProps) {
    super(props);
    this.state = {
      user: firebase.auth().currentUser ? firebase.auth().currentUser : null,
      username: "",
      currPasswd: "",
      newPasswd: "",
      newPasswdConfirm: "",
      passwdMatch: false,
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
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.goBack()}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5Icon
                  name="chevron-left"
                  size={24}
                  color={colors.white}
                />
                <Text
                  style={{ fontSize: 26, color: colors.white, marginLeft: 14 }}
                >
                  Return
                </Text>
              </View>
            </TouchableWithoutFeedback>
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
                    value={this.state.user.displayName}
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
                <View>
                  <Text style={this.styles.label}>Current password</Text>
                  <TextInput
                    style={this.styles.input}
                    onChangeText={(text) => this.setCurrentPassword(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    secureTextEntry
                  />
                </View>
                <View>
                  <Text style={this.styles.label}>New password</Text>
                  <TextInput
                    style={this.styles.input}
                    onChangeText={(text) => this.setNewPasswd(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    secureTextEntry
                  />
                </View>
                <View>
                  <Text style={this.styles.label}>Confirm new password</Text>
                  <TextInput
                    style={this.styles.input}
                    onChangeText={(text) => this.setNewPasswdConfirm(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    secureTextEntry
                    passwordRules="required: upper; required: lower; required: digit; minlength: 8"
                  />
                  {this.state.passwdMatch ? (
                    <Text style={this.styles.error}>Passwords don't match</Text>
                  ) : null}
                </View>
                <TouchableOpacity
                  style={this.styles.button}
                  onPress={() => this.onUpdateProfilePress()}
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
            <View>
              <Text>{/* //? we left of here */}</Text>
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
