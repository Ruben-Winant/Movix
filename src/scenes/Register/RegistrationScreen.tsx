import "react-native-gesture-handler";
import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import styles from "./styles";
import { firebase } from "../../firebase/firebaseConfig";
import colors from "../../assets/colors";
import MovixLogo from "../../assets/fonts/images/MovixLogo";

interface LoginScreenProps {
  navigation: NavigationStackProp<{}>;
}

const RegistrationScreen = (props: LoginScreenProps) => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const onFullNameChange = (fullname: string) => {
    setFullName(fullname);
  };
  const onEmailChange = (email: string) => {
    setEmail(email);
  };
  const onPasswordChange = (pwd: string) => {
    setPassword(pwd);
  };
  const onConfirmPasswordChange = (conpwd: string) => {
    setConfirmPassword(conpwd);
  };

  const onFooterLinkPress = () => {
    props.navigation.navigate("Login");
  };

  const onWhyLinkPress = () => {
    Alert.alert(
      "privacy info",
      "Your account will be used to save the movies you love! And yeah that's it. We do not share any of your information to third parties of any kind."
    );
  };

  const onRegisterPress = () => {
    if (
      email == null ||
      password == null ||
      fullName == null ||
      confirmPassword == null
    ) {
      Alert.alert("Whoops", "there seems to be some missing info");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Whoops", "Passwords don't match.");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response: any) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email: email,
          fullName: fullName,
          likedMovies: [],
          seenMovies: [],
          dislikedMovies: [],
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
                    displayName: fullName,
                  })
                  .catch((error) => console.error(error.message))
              : null;
            props.navigation.navigate("Home", { user: data });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, width: "100%" }}>
        <MovixLogo height={350} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={colors.white}
          onChangeText={(text) => onFullNameChange(text)}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
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
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.white}
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => onConfirmPasswordChange(text)}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
          <Text style={styles.footerText}>
            <Text onPress={onWhyLinkPress} style={styles.footerLink}>
              Privacy
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RegistrationScreen;
