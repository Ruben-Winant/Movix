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
import colors from "../../assets/colors";
import { firebase } from "../../firebase/firebaseConfig";

interface LoginScreenProps {
  navigation: NavigationStackProp<{}>;
}
interface LoginScreenState {
  email: string;
  password: string;
}

export default class LoginScreen extends Component<
  LoginScreenProps,
  LoginScreenState
> {
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

  onLoginPress = () => {
    if (this.state.email == null || this.state.password == null) {
      Alert.alert("Whoops", "Email or password was left open");
      return;
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((response: any) => {
          const uid = response.user.uid;
          const usersRef = firebase.firestore().collection("users");
          usersRef
            .doc(uid)
            .get()
            .then((firestoreDocument) => {
              if (!firestoreDocument.exists) {
                alert("User does not exist anymore.");
                return;
              }
              const user = firestoreDocument.data();
              this.props.navigation.navigate("Home", { user });
            })
            .catch((error) => {
              alert(error);
            });
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  onFooterLinkPress = () => {
    this.props.navigation.navigate("Register");
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onLoginPress()}
          >
            <Text style={styles.buttonTitle}>Log in</Text>
          </TouchableOpacity>
          <View style={styles.footerView}>
            <Text style={styles.footerText}>
              Don't have an account?{" "}
              <Text onPress={this.onFooterLinkPress} style={styles.footerLink}>
                Sign up
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
