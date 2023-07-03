import { check_string, get_movies_data, get_users_data } from "./helper.js";
// const get_users_data = (() => {
//   let users_data;

//   const fetch_users_data = async () => {
//     if (!users_data) {
//       const original_users_data = await axios.get(
//         "https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json"
//       );
//       users_data = original_users_data.data;
//     }
//     return users_data;
//   };
//   return fetch_users_data;
// })();

// const get_movies_data = (() => {
//   let movies_data;

//   const fetch_movies_data = async () => {
//     if (!movies_data) {
//       const original_movies_data = await axios.get(
//         "https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json"
//       );
//       movies_data = original_movies_data.data;
//     }
//     return movies_data;
//   };
//   return fetch_movies_data;
// })();

const getUserById = async (id) => {
  // if (!id) throw "id must be exist!";
  // if (typeof id !== "string") throw "the type of id must be string!";
  // id = id.trim();
  // if (id.length === 0) throw "id cannot be empty!";
  check_string(id, "id");
  const users_data = await get_users_data();

  let found = false;
  for (let i = 0; i < users_data.length; i++) {
    if (users_data[i].id === id) {
      found = true;
      return users_data[i];
    }
  }
  if (!found) throw "user not found in users list!";
};

const sameGenre = async (genre) => {
  // if (!genre) throw "genre cannot be empty!";
  // if (typeof genre !== "string") throw " the type of genre must be string!";
  // genre = genre.trim();
  // if (genre.length === 0) throw "genre cannot consist of spaces entirely!";

  genre = check_string(genre, "genre");

  const full_name_list = [];

  const users_data = await get_users_data();

  for (let i = 0; i < users_data.length; i++) {
    if (users_data[i].favorite_genre === genre) {
      const full_name = `${users_data[i].first_name} ${users_data[i].last_name}`;
      full_name_list.push(full_name);
    }
  }
  if (full_name_list.length < 2)
    throw " at least should have two people who have same favorite genre!";
  full_name_list.sort((a, b) => {
    const a_last_name = a.split(" ")[1];
    const b_last_name = b.split(" ")[1];
    return a_last_name.localeCompare(b_last_name);
  });
  return full_name_list;
};

const moviesReviewed = async (id) => {
  // if (!id) throw "id must be exist!";
  // if (typeof id !== "string") throw "the type of id must be string!";
  // id = id.trim();
  // if (id.length === 0) throw "id cannot be empty!";
  id = check_string(id, "id");
  const users_data = await get_users_data();

  let user_name = "";
  for (let i = 0; i < users_data.length; i++) {
    if (users_data[i].id === id) user_name = users_data[i].username;
  }
  if (!user_name) throw "user is not found in the array of users!";

  const res = [];

  const movies_data = await get_movies_data();

  for (let i = 0; i < movies_data.length; i++) {
    const movies_reviews = movies_data[i].reviews;

    for (let j = 0; j < movies_reviews.length; j++) {
      if (movies_reviews[j].username === user_name) {
        const movie_and_reviews = {};
        const movies_name = movies_data[i].title;
        movie_and_reviews[movies_name] = movies_reviews[j];
        res.push(movie_and_reviews);
      }
    }
  }
  return res;
};

const referMovies = async (id) => {
  // if (!id) throw "id must be exist!";
  // if (typeof id !== "string") throw "the type of id must be string!";
  // id = id.trim();
  // if (id.length === 0) throw "id cannot be empty!";
  id = check_string(id, "id");
  const users_data = await get_users_data();

  let found = false;
  for (let i = 0; i < users_data.length; i++) {
    if (users_data[i].id === id) {
      found = true;
    }
  }
  if (!found) throw "this user is not found in users list!";

  let favorite_genre = "",
    user_name = "";
  for (let i = 0; i < users_data.length; i++) {
    if (users_data[i].id === id) {
      favorite_genre = users_data[i].favorite_genre;
      user_name = users_data[i].username;
    }
  }

  const res = [];

  const movies_data = await get_movies_data();

  for (let i = 0; i < movies_data.length; i++) {
    const genre = movies_data[i].genre.split("|");
    if (genre.includes(favorite_genre)) {
      const userReviewed = movies_data[i].reviews.some((review) => {
        review.username === user_name;
      });
      if (!userReviewed) res.push(movies_data[i].title);
    }
  }

  return res;
};
// console.log(await getUserById("48fded55-37cd-4e6b-8f19-e78b481a14a4"));
console.log(await sameGenre("Action"));
// console.log(await moviesReviewed("64035fad-a5b7-48c9-9317-3e31e22fe26c"));
// console.log(await referMovies("5060fc9e-10c7-4f38-9f3d-47b7f477568b"));
// console.log(await getUserById(" "));
// console.log(await getUserById(123));
