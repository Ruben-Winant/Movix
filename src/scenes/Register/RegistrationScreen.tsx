import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import styles from "./styles";
import { firebase } from "../../firebase/firebaseConfig";
import colors from "../../assets/colors";
import { UserProfile } from "..";

interface LoginScreenProps {
  navigation: NavigationStackProp<{}>;
}
interface LoginScreenState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default class RegistrationScreen extends Component<
  LoginScreenProps,
  LoginScreenState
> {
  setFullName(fullname: string) {
    this.setState({
      fullName: fullname,
    });
  }
  setEmail(email: string) {
    this.setState({
      email: email,
    });
  }
  setPassword(pwd: string) {
    this.setState({
      password: pwd,
    });
  }
  setConfirmPassword(conpwd: string) {
    this.setState({
      confirmPassword: conpwd,
    });
  }

  onFooterLinkPress = () => {
    this.props.navigation.navigate("Login");
  };

  onWhyLinkPress = () => {
    Alert.alert(
      "privacy info",
      "Your account will be used to save the movies you love! And yeah that's it. We do not share any of your information to third parties of any kind."
    );
  };

  onRegisterPress = () => {
    if (
      this.state.email == null ||
      this.state.password == null ||
      this.state.fullName == null ||
      this.state.confirmPassword == null
    ) {
      Alert.alert("Whoops", "there seems to be some missing info");
      return;
    }
    if (this.state.password !== this.state.confirmPassword) {
      Alert.alert("Whoops", "Passwords don't match.");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((response: any) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email: this.state.email,
          fullName: this.state.fullName,
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            let user = firebase.auth().currentUser;
            user
              ? user
                  .updateProfile({
                    displayName: this.state.fullName,
                  })
                  .catch((error) => console.error(error.message))
              : null;
            this.props.navigation.navigate("Home", { user: data });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, width: "100%" }}>
          <Image
            style={styles.logo}
            source={require("../../../src/assets/images/RwLogo.png")}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={colors.grey}
            onChangeText={(text) => this.setFullName(text)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor={colors.grey}
            onChangeText={(text) => this.setEmail(text)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={colors.grey}
            secureTextEntry
            placeholder="Password"
            onChangeText={(text) => this.setPassword(text)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={colors.grey}
            secureTextEntry
            placeholder="Confirm Password"
            onChangeText={(text) => this.setConfirmPassword(text)}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onRegisterPress()}
          >
            <Text style={styles.buttonTitle}>Create account</Text>
          </TouchableOpacity>
          <View style={styles.footerView}>
            <Text style={styles.footerText}>
              Already got an account?{" "}
              <Text onPress={this.onFooterLinkPress} style={styles.footerLink}>
                Log in
              </Text>
            </Text>
            <Text style={styles.footerText}>
              <Text onPress={this.onWhyLinkPress} style={styles.footerLink}>
                Privacy
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
