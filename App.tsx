import React, { Component } from "react";
import {
  HomeScreen,
  LoginScreen,
  RegistrationScreen,
  UserProfile,
} from "./src/scenes";
import "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { firebase } from "./src/firebase/firebaseConfig";
import colors from "./src/assets/colors";
import MovieCollection from "./src/scenes/MovieTypes/MovieCollection";

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

  componentDidMount() {
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
            console.log(error.message);
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
          <StatusBar hidden={true} translucent={true} />
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
    UserProfile: {
      screen: UserProfile,
      params: { user: firebase.auth().currentUser },
      navigationOptions: { animationEnabled: false },
    },
    MovieCollection: {
      screen: MovieCollection,
      params: { type: null, excluded: [] },
      navigationOptions: { animationEnabled: false },
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
