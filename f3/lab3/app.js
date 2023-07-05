import { test, generateTestNameAndNumber } from "./helper.js";
import {
  getUserById,
  moviesReviewed,
  referMovies,
  sameGenre,
} from "./users.js";
import {
  findMoviesByDirector,
  findMoviesByCastMember,
  getOverallRating,
  getMovieById,
} from "./movies.js";

const generateTestName = generateTestNameAndNumber();

await test(
  getUserById,
  "getUserById",
  {
    is_error: false,
    expected_res: {
      id: "48fded55-37cd-4e6b-8f19-e78b481a14a4",
      username: "abrett0",
      password: "YQ8Jpot33Mf",
      first_name: "Abigail",
      last_name: "Brett",
      email: "abrett0@gizmodo.com",
      favorite_genre: "Fantasy",
    },
  },
  "48fded55-37cd-4e6b-8f19-e78b481a14a4"
);
await test(getUserById, "getUserById", {}, -1);
await test(getUserById, "getUserById", {}, 1001);
await test(getUserById, "getUserById", {});
await test(
  getUserById,
  "getUserById",
  {},
  "7989fa5e-5617-43f7-a931-46036f9dbcff"
);

await test(
  sameGenre,
  "sameGenre",
  {
    is_error: false,
    expected_res: [
      "Shay Claydon",
      "Merridie Confort",
      "Bent Crowest",
      "Shurlocke Cull",
      "Lonny Dechelle",
      "Olia Shefton",
    ],
  },
  "Action"
);
await test(sameGenre, "sameGenre", {});
await test(sameGenre, "sameGenre", {}, "IMAX");
await test(sameGenre, "sameGenre", {}, 123);
await test(sameGenre, "sameGenre", {}, ["Action"]);
await test(sameGenre, "sameGenre", {}, true);

await test(
  moviesReviewed,
  "moviesReviewed",
  {
    is_error: false,
    expected_res: [
      {
        "Charlie's Angels": {
          username: "cfinkle5",
          rating: 4,
          review: "Solid, good movie.",
        },
      },
      {
        "Class of 1999 II: The Substitute": {
          username: "cfinkle5",
          rating: 4,
          review: "Solid, good movie.",
        },
      },
      {
        "Terminator 3: Rise of the Machines": {
          username: "cfinkle5",
          rating: 2,
          review: "It was meh, plot was very bad.",
        },
      },
    ],
  },
  "64035fad-a5b7-48c9-9317-3e31e22fe26c"
);
await test(moviesReviewed, "moviesReviewed", {}, -1);
await test(moviesReviewed, "moviesReviewed", {}, 1001);
await test(moviesReviewed, "moviesReviewed", {});
await test(
  moviesReviewed,
  "moviesReviewed",
  {},
  "7989fa5e-5617-43f7-a931-46036f9dbcff"
);

await test(
  referMovies,
  "referMovies",
  {
    is_error: false,
    expected_res: [
      "Fly Me to the Moon",
      "Gravity",
      "Spiderwick Chronicles, The",
      "How to Train Your Dragon",
      "Wings of Courage",
      "Happy Feet Two",
    ],
  },
  "5060fc9e-10c7-4f38-9f3d-47b7f477568b"
);
await test(referMovies, "referMovies", {}, -1);
await test(referMovies, "referMovies", {}, "   ");
await test(referMovies, "referMovies", {});
await test(
  referMovies,
  "referMovies",
  {},
  "7989fa5e-5617-43f7-a931-46036f9dbcff"
);

await test(
  findMoviesByDirector,
  "findMoviesByDirector",
  {
    is_error: false,
    expected_res: [
      {
        id: "040d7398-136c-45f0-89b8-9b73c67c617e",
        title: "Company",
        genre: "Drama|Musical",
        director: "Fernando Dollimore",
        release_date: "10/27/2020",
        runtime: "1h 14mins",
        mpa_rating: "PG-13",
        cast: ["Huberto Snoddon", "Horacio Scoggins"],
        streaming_service: {
          company: "Netflix",
          link: "https://Netflix.com/Company",
        },
        reviews: [
          {
            username: "jsorrelaw",
            rating: 2,
            review: "It was meh, plot was very bad.",
          },
          { username: "sgiacobo1n", rating: 3, review: "A very ok movie." },
          { username: "egrigolieb", rating: 3, review: "A very ok movie." },
          { username: "lmcinnesmk", rating: 4, review: "Solid, good movie." },
        ],
      },
      {
        id: "e8b006a5-8a81-4718-ae52-11b2bd02f741",
        title: "Flashbacks of a Fool",
        genre: "Drama",
        director: "Fernando Dollimore",
        release_date: "07/15/2010",
        runtime: "2h 58mins",
        mpa_rating: "PG",
        cast: [
          "Iver Hubbucks",
          "Tandi Arminger",
          "Willette Furze",
          "Feliks Edowes",
          "Neddie Ashleigh",
        ],
        streaming_service: {
          company: "Paramount+",
          link: "https://Paramount+.com/Flashbacks of a Fool",
        },
        reviews: [
          {
            username: "tjoice3z",
            rating: 2,
            review: "It was meh, plot was very bad.",
          },
          {
            username: "lhumpherstonjo",
            rating: 2,
            review: "It was meh, plot was very bad.",
          },
          { username: "sgiacobo1n", rating: 1, review: "HORRIBLE MOVIE!!!" },
          { username: "kcoumbe9m", rating: 3, review: "A very ok movie." },
        ],
      },
      {
        id: "f77972aa-9fdf-4465-9948-ba4acfea4d16",
        title: "Last Time, The",
        genre: "Comedy|Drama|Romance",
        director: "Fernando Dollimore",
        release_date: "05/24/2013",
        runtime: "3h 32mins",
        mpa_rating: "R",
        cast: ["Isaiah Gabbett", "Merrili Maud", "Raynard Tuxsell"],
        streaming_service: {
          company: "Peacock",
          link: "https://Peacock.com/Last Time, The",
        },
        reviews: [
          {
            username: "lbickelll",
            rating: 2,
            review: "It was meh, plot was very bad.",
          },
          {
            username: "abuttersm2",
            rating: 5,
            review: "OMG I loved it. AMAZING 10/10!!!!",
          },
        ],
      },
      {
        id: "bcafe739-d928-4440-b3a9-4cc554a1cb2a",
        title: "Rambo III",
        genre: "Action|Adventure|Thriller|War",
        director: "Fernando Dollimore",
        release_date: "02/11/2020",
        runtime: "1h 16mins",
        mpa_rating: "R",
        cast: ["Meier Craine", "Lorrie Yanin", "Nertie Kadar", "Pattie Caffin"],
        streaming_service: {
          company: "HBO Max",
          link: "https://HBO Max.com/Rambo III",
        },
        reviews: [
          {
            username: "jjackettcr",
            rating: 5,
            review: "OMG I loved it. AMAZING 10/10!!!!",
          },
          {
            username: "bboziermu",
            rating: 2,
            review: "It was meh, plot was very bad.",
          },
          {
            username: "apergensrj",
            rating: 2,
            review: "It was meh, plot was very bad.",
          },
          { username: "cempsbj", rating: 4, review: "Solid, good movie." },
        ],
      },
    ],
  },
  "Fernando Dollimore"
);
