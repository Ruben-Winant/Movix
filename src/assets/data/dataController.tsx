import React, { Component } from "react";
import "react-native-gesture-handler";
import { Movie } from "../../types/Movie";
import AsyncStorage from "@react-native-community/async-storage";
import { Genre } from "../../types/Genre";
import { firebase } from "./../../../src/firebase/firebaseConfig";

export default class dataController extends Component {
  constructor(props: any) {
    super(props);

    this.getData = this.getData.bind(this);
    this.getAllMovies = this.getAllMovies.bind(this);
  }

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

  //#region marking movies

  markMovieWithFlag(flag: string, id: number) {
    switch (flag) {
      case "DISLIKE":
        //search the movie by its id in the json file
        //then change its flag to parameter flag
        //save changes and add movie id to firebase in the right table
        //repeat for all below
        break;

      case "SEEN":
        break;

      case "LIKE":
        break;

      default:
        break;
    }
  }

  //#endregion

  //#region remove movies from list

  //FLOW =>
  //search movie with id inside json file
  //change flage to NONE
  //remove item from firebase

  removeMovieFromDisliked(id: number) {}

  removeMovieFromLiked(id: number) {}

  removeMovieFromSeen(id: number) {}

  //#endregion
}
