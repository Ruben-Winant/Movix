import React, { Component } from "react";
import { HomeScreen, LoginScreen, RegistrationScreen } from "./src/scenes";
import "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { firebase } from "./src/firebase/firebaseConfig";
import { Movie } from "./src/types/Movie";
import colors from "./src/assets/colors";
import AsyncStorage from "@react-native-community/async-storage";
const movieDataFile: Movie[] = require("./src/assets/data/movies.json");

interface AppProps {}
interface AppState {
  loading: boolean;
  user: any;
}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      loading: false,
      user: null,
    };
  }

  setLoading(bool: boolean) {
    this.setState({
      loading: bool,
    });
  }

  setUser(user: any) {
    this.setState({
      user: user,
    });
  }

  storeData = async () => {
    try {
      const jsonValue = JSON.stringify(movieDataFile.slice(0, 1000));
      const jsonValue2 = JSON.stringify(movieDataFile.slice(1001, 2000));
      const jsonValue3 = JSON.stringify(movieDataFile.slice(2001, 3000));
      const jsonValue4 = JSON.stringify(movieDataFile.slice(3001, 4000));
      const jsonValue5 = JSON.stringify(movieDataFile.slice(4001, 5000));
      await AsyncStorage.setItem("@movieData", jsonValue);
      await AsyncStorage.setItem("@movieData2", jsonValue2);
      await AsyncStorage.setItem("@movieData3", jsonValue3);
      await AsyncStorage.setItem("@movieData4", jsonValue4);
      await AsyncStorage.setItem("@movieData5", jsonValue5);
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    //set data in asyncstorage
    this.storeData();

    //firebase
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document: any) => {
            const userData = document.data();
            this.setLoading(false);
            this.setUser(userData);
          })
          .catch((error: any) => {
            this.setLoading(false);
          });
      } else {
        this.setLoading(false);
      }
    });
  }

  render() {
    if (this.state.loading) {
      return <View></View>;
    } else {
      return (
        <AppContainer>
          <StatusBar backgroundColor={colors.darkblue} />
        </AppContainer>
      );
    }
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegistrationScreen,
    },
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: () => ({
      headerShown: false,
    }),
  }
);

const AppContainer = createAppContainer(AppNavigator);
