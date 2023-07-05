import { check_string, get_users_data, get_movies_data } from "./helper.js";

export const findMoviesByDirector = async (directorName) => {
  directorName = check_string(directorName, "directorName");

  const movies_data = await get_movies_data();

  const res = [];
  for (let i = 0; i < movies_data.length; i++) {
    if (movies_data[i].director === directorName) {
      res.push(movies_data[i]);
    }
  }
  if (!res)
    throw ` no movies directed by this ${directorName} are found in movies.json!`;
  return res;
};

export const findMoviesByCastMember = async (castMemberName) => {
  castMemberName = check_string(castMemberName, "castMemberName");

  const movies_data = await get_movies_data();

  const res = [];
  for (let i = 0; i < movies_data.length; i++) {
    if (movies_data[i].cast.includes(castMemberName)) {
      res.push(movies_data[i]);
    }
  }
  if (!res)
    throw `No movies starring this ${castMemberName} were found in movies.json!`;
  return res;
};

export const getOverallRating = async (title) => {
  title = check_string(title, "title");

  const movies_data = await get_movies_data();

  let sum = 0,
    amount = 0;
  let found = false;
  for (let i = 0; i < movies_data.length; i++) {
    if (movies_data[i].title === title) {
      found = true;
      const reviews = movies_data[i].reviews;
      for (let j = 0; j < reviews.length; j++) {
        sum += reviews[j].rating;
        amount++;
      }
    }
  }

  if (!found) throw `${title} cannot be found in movies.json!`;

  return Math.floor((sum / amount) * 10) / 10;
};

export const getMovieById = async (id) => {
  id = check_string(id, "id");

  const movies_data = await get_movies_data();

  for (let i = 0; i < movies_data.length; i++) {
    if (movies_data[i].id === id) {
      return movies_data[i];
    }
  }
  throw `this movie which id is ${id} is not found in movies.json!`;
};

