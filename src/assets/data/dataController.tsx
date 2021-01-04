import React, { Component } from "react";
import "react-native-gesture-handler";
import { Movie } from "../../types/Movie";
import { Genre } from "../../types/Genre";
import { firebase } from "./../../../src/firebase/firebaseConfig";
import { Alert } from "react-native";

export default class dataController extends Component {
  constructor(props: any) {
    super(props);
  }

  usersRef = firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser?.uid);

  addMovieToList = (flag: string, movieId: number) => {
    switch (flag) {
      case "DISLIKE":
        try {
          this.usersRef.update({
            dislikedMovies: firebase.firestore.FieldValue.arrayUnion(movieId),
          });
        } catch (error) {
          console.log(error);
        }
        break;
      case "disliked":
        try {
          this.usersRef.update({
            dislikedMovies: firebase.firestore.FieldValue.arrayUnion(movieId),
          });
        } catch (error) {
          console.log(error);
        }
        break;
      case "LIKE":
        try {
          this.usersRef.update({
            likedMovies: firebase.firestore.FieldValue.arrayUnion(movieId),
          });
        } catch (error) {
          console.log(error);
        }
        break;
      case "liked":
        try {
          this.usersRef.update({
            likedMovies: firebase.firestore.FieldValue.arrayUnion(movieId),
          });
        } catch (error) {
          console.log(error);
        }
        break;
      case "SEEN":
        try {
          this.usersRef.update({
            seenMovies: firebase.firestore.FieldValue.arrayUnion(movieId),
          });
        } catch (error) {
          console.log(error);
        }
        break;
      case "seen":
        try {
          this.usersRef.update({
            seenMovies: firebase.firestore.FieldValue.arrayUnion(movieId),
          });
        } catch (error) {
          console.log(error);
        }
        break;

      default:
        break;
    }
  };

  removeMovieFromList = (flag: string, movieId: number) => {
    switch (flag) {
      case "disliked":
        try {
          this.usersRef.update({
            dislikedMovies: firebase.firestore.FieldValue.arrayRemove(movieId),
          });
        } catch (error) {
          console.log(error);
        }
        break;
      case "liked":
        try {
          this.usersRef.update({
            likedMovies: firebase.firestore.FieldValue.arrayRemove(movieId),
          });
        } catch (error) {
          console.log(error);
        }
        break;
      case "seen":
        try {
          this.usersRef.update({
            seenMovies: firebase.firestore.FieldValue.arrayRemove(movieId),
          });
        } catch (error) {
          console.log(error);
        }
        break;
      default:
        break;
    }
  };

  resetAllData = () => {
    try {
      this.usersRef.set(
        {
          likedMovies: [],
          dislikedMovies: [],
          seenMovies: [],
        },
        { merge: false }
      );
      Alert.alert(
        "success",
        "please restart the application in order to view the changes."
      );
    } catch (error) {
      alert(error);
    }
  };

  getData2 = async () => {
    let excluded: number[] = [];
    let movies: Movie[] = [];
    try {
      const doc = await this.usersRef.get();
      if (doc.exists) {
        excluded = doc.get("seenMovies");
        excluded = excluded.concat(doc.get("likedMovies"));
        excluded = excluded.concat(doc.get("dislikedMovies"));
      }

      let db = firebase.database();
      await (await db.ref().once("value")).forEach((child) => {
        let movJson = JSON.stringify(child.exportVal());
        let movObj = JSON.parse(movJson);
        movies.push(movObj);
      });

      return movies.filter((x) => !excluded.includes(x.id));
    } catch (e) {
      console.log(e);
    }
  };

  getSpecificData = async (filterIds: number[]) => {
    //returns all movies as an array of movies
    let movies: Movie[] = [];
    try {
      let db = firebase.database();
      await (await db.ref().once("value")).forEach((child) => {
        let movJson = JSON.stringify(child.exportVal());
        let movObj = JSON.parse(movJson);
        filterIds.includes(movObj.id) ? movies.push(movObj) : null;
      });
    } catch (e) {
      console.log(e);
    }
    return movies.reverse();
  };
}
