import axios from "axios";
const original_users_data = await axios.get(
  "https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json"
);
const users_data = original_users_data.data;

const original_movies_data = await axios.get(
  "https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json"
);
const movies_data = original_movies_data.data;

const getUserById = (id) => {
  if (!id) throw "id cannot be exist!";
  if (typeof id !== "string") throw "the type of id must be string!";
  id = id.trim();
  if (id.length === 0) throw "id cannot be empty!";
  if (
    users_data.every((item) => {
      item[id] !== id;
    })
  )
    throw "user not found in users list!";
  for (let i = 0; i < users_data.length; i++) {
    if (users_data[i].id === id) return users_data[i];
  }
};

const sameGenre = (genre) => {
  if (!genre) throw "genre cannot be empty!";
  if (typeof genre !== "string") throw " the type of genre must be string!";
  const lower_case_genre = genre.trim().toLowerCase();
  if (lower_case_genre.length === 0) throw "genre cannot be consist by space!";
  const full_name_list = [];
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

const moviesReviewed = (id) => {
  if (!id) throw "id cannot be exist!";
  if (typeof id !== "string") throw "the type of id must be string!";
  id = id.trim();
  if (id.length === 0) throw "id cannot be empty!";
  if (
    users_data.every((item) => {
      item[id] !== id;
    })
  )
    throw "user not found in users list!";
  const res = [];

  let user_name = " ";
  let found = false;
  for (let i = 0; i < users_data.length; i++) {
    if (users_data[i].id === id) {
      user_name = users_data[i].username;
      found = true;
      break;
    }
  }
  if (!found) throw "user is not found in the array of users!";

  for (let i = 0; i < movies_data.length; i++) {
    const movies_reviews = movies_data[i].reviews;
    for (let j = 0; j < movies_reviews.length; j++) {
      if (movies_reviews[j].username === user_name) {
        const format = {};
        const movies_name = movies_data[i].title;
        format[movies_name] = movies_reviews[j];
        res.push(format);
      }
    }
  }
  return res;
};

const referMovies = (id) => {
  if (!id) throw "id cannot be exist!";
  if (typeof id !== "string") throw "the type of id must be string!";
  id = id.trim();
  if (id.length === 0) throw "id cannot be empty!";
  if (
    users_data.every((item) => {
      item.id !== id;
    })
  )
    throw "user not found in users list!";
  let favorite_genre = " ";
  let user_name = " ";
  const res = [];
  users_data.forEach((element) => {
    if (element.id === id) {
      favorite_genre = element.favorite_genre;
      user_name = element.username;
    }
  });

    movies_data.forEach((item) => {
      const genre = item.genre.split("|");
      if (genre.includes(favorite_genre)) {
      //   const reviews = reviews;
        const userReviewed = item.reviews.some((items) => {
          items.username === user_name;
        });
        if (!userReviewed) res.push(item.title);
      }
    });

  return res;
};
console.log(referMovies("5060fc9e-10c7-4f38-9f3d-47b7f477568b"));
