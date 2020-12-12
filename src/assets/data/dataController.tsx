import React, { Component } from "react";
import "react-native-gesture-handler";
import { Movie } from "../../types/Movie";
import { Genre } from "../../types/Genre";
import { firebase } from "./../../../src/firebase/firebaseConfig";
import { Alert } from "react-native";

export default class dataController extends Component {
  constructor(props: any) {
    super(props);

    this.getData = this.getData.bind(this);
    this.getAllMovies = this.getAllMovies.bind(this);
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

  getData = async () => {
    //returns all movies as an array of movies
    let movies: Movie[] = [];
    try {
      let db = firebase.database();
      await (await db.ref().once("value")).forEach((child) => {
        let movJson = JSON.stringify(child.exportVal());
        let movObj = JSON.parse(movJson);
        movies.push(movObj);
      });
    } catch (e) {
      console.log(e);
    }
    return movies;
  };

  getData2 = async (filterIds: number[]) => {
    //returns all movies as an array of movies
    let movies: Movie[] = [];
    try {
      let db = firebase.database();
      await (await db.ref().once("value")).forEach((child) => {
        let movJson = JSON.stringify(child.exportVal());
        let movObj = JSON.parse(movJson);
        movies.push(movObj);
      });
    } catch (e) {
      console.log(e);
    }
    //exclude all seen, liked and disliked movies
    filterIds.length > 0
      ? (movies = movies.filter((x) => !filterIds.includes(x.id)))
      : null;
    return movies;
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

  //#region get movie(s)

  //returns all movies
  getAllMovies = async () => {
    //limit result to max x movies
    let movies: Movie[] = [];
    this.getData().then((res) => (movies = res));
    return movies;
  };

  //return a single movie
  //! this may become broken => probably something to do with return inside loop
  getMovieById(id: number) {
    let resultMovie: Movie = Object.create(null);

    for (let index = 1; index < 6; index++) {
      this.getData().then((result: Movie[] | undefined) => {
        if (typeof result != "undefined") {
          result.forEach((movie: Movie) => {
            if (movie.id == id) {
              resultMovie = movie;
              return;
            }
          });
        }
      });
    }

    return resultMovie;
  }

  //returns all movies by multiple ids
  getMultipleMoviesByIds(ids: number[]) {
    let resultMovies: Movie[] = [];

    for (let index = 1; index < 6; index++) {
      this.getData().then((result: Movie[] | undefined) => {
        if (typeof result != "undefined") {
          result.forEach((movie: Movie) => {
            if (ids.includes(movie.id)) {
              resultMovies.push(movie);
            }
          });
        }
      });
    }

    return resultMovies;
  }

  //return all movies with the given genres
  //! this may become broken => probably something to do with return inside loop
  getMoviesByGenres(genres: string[]) {
    //loop over genres, for each genre in parameter add +- 5 movies to result
    let resultMovies: Movie[] = [];

    for (let index = 1; index < 6; index++) {
      this.getData().then((result: Movie[] | undefined) => {
        if (typeof result != "undefined") {
          result.forEach((movie: Movie) => {
            movie.genres.forEach((genre: Genre) => {
              if (genres.includes(genre.name)) {
                resultMovies.push(movie);
                return;
              }
            });
          });
        }
      });
    }

    return resultMovies;
  }

  //#endregion
}
