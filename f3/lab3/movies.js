import { check_string, get_users_data, get_movies_data } from "./helper.js";

const findMoviesByDirector = async (directorName) => {
  directorName = check_string(directorName, "directorName");

  const movies_data = await get_movies_data();

  const res = [];
  for (let i = 0; i < movies_data.length; i++) {
    if (movies_data[i].director === directorName) {
      res.push(movies_data[i]);
    }
  }
  if (!res)
    throw " no movies directed by this director are found in movies.json!";
  return res;
};

const findMoviesByCastMember = async (castMemberName) => {
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

const getOverallRating = async (title) => {
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

  let overall_rating = Math.floor((sum / amount) * 10);

  return overall_rating / 10;
};

const getMovieById = async (id) => {
  id = check_string(id, "id");

  const movies_data = await get_movies_data();

  let found = false;
  for (let i = 0; i < movies_data.length; i++) {
    if (movies_data[i].id === id) {
      found = true;
      return movies_data[i];
    }
  }
  if (!found) throw "this movies is not found in movies.json!";
};

// console.log(await getMovieById("38fd6885-0271-4650-8afd-6d09f3a890a2"));
console.log(await getMovieById("7989fa5e-5617-43f7-a931-46036f9dbcff"));
