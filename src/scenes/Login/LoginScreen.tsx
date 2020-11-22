import "react-native-gesture-handler";
import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import styles from "./styles";
import colors from "../../assets/colors";
import { firebase } from "../../firebase/firebaseConfig";
import MovixLogo from "../../assets/fonts/images/MovixLogo";

interface LoginScreenProps {
  navigation: NavigationStackProp<{}>;
}

const LoginScreen = (props: LoginScreenProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onEmailChange = (email: string) => {
    setEmail(email);
  };
  const onPasswordChange = (pwd: string) => {
    setPassword(pwd);
  };

  const onLoginPress = () => {
    if (email == null || password == null) {
      Alert.alert("Whoops", "Email or password was left open");
      return;
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
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
              props.navigation.navigate("Home", { user: user });
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

  const onFooterLinkPress = () => {
    props.navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, width: "100%" }}>
        <MovixLogo height={350} />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor={colors.white}
          onChangeText={(text) => onEmailChange(text)}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.white}
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => onPasswordChange(text)}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
