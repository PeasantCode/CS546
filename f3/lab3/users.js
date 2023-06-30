import axios from "axios";

const getData = (() => {
  let users_data, movies_data;

  const fetchData = async () => {
    if (!users_data) {
      const original_users_data = await axios.get(
        "https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json"
      );

      users_data = original_users_data.data;
    }
    if (!movies_data) {
      const original_movies_data = await axios.get(
        "https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json"
      );

      movies_data = original_movies_data.data;
    }
    return { users_data, movies_data };
  };
  return fetchData;
})();

const getUserById = async (id) => {
  if (!id) throw "id cannot be exist!";
  if (typeof id !== "string") throw "the type of id must be string!";
  id = id.trim();
  if (id.length === 0) throw "id cannot be empty!";
  const users_data = await getData().users_data;
  if (
    users_data.every((item) => {
      item[id] !== id;
    })
  )
    throw "user not found in users list!";
  else return item;
};

const sameGenre = async (genre) => {
  if (!genre) throw "genre cannot be empty!";
  if (typeof genre !== "string") throw " the type of genre must be string!";
  const lower_case_genre = genre.trim().toLowerCase();
  if (lower_case_genre.length === 0)
    throw "genre cannot consist of spaces entirely!";
  const full_name_list = [];
  const users_data = await getData().users_data;
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
  if (!id) throw "id must be exist!";
  if (typeof id !== "string") throw "the type of id must be string!";
  id = id.trim();
  if (id.length === 0) throw "id cannot be empty!";
  const users_data = await getData().users_data;
  if (
    users_data.every((item) => {
      item[id] !== id;
    })
  )
    throw "user not found in users list!";

  let user_name;

  for (let i = 0; i < users_data.length; i++) {
    if (users_data[i].id === id) {
      user_name = users_data[i].username;
    }
  }
  if (!user_name) throw "user is not found in the array of users!";

  const res = [];
  const movies_data = await getData().movies_data;
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
  if (!id) throw "id must be exist!";
  if (typeof id !== "string") throw "the type of id must be string!";
  id = id.trim();
  if (id.length === 0) throw "id cannot be empty!";
  const users_data = await getData().users_data;
  if (
    users_data.every((item) => {
      item.id !== id;
    })
  )
    throw "user not found in users list!";

  let favorite_genre = "",
    user_name = "";
  for (let i = 0; i < users_data.length; i++) {
    if (users_data[i].id === id) {
      favorite_genre = users_data[i].favorite_genre;
      user_name = users_data[i].username;
    }
  }

  const res = [];
  const movies_data = await getData().movies_data;
  for (let i = 0; i < movies_data.length; i++) {
    const genre = movies_data[i].genre.split("|");
    if (genre.includes(favorite_genre)) {
      const userReviewed = movies_data[i].reviews.some((review) => {
        review.username === user_name;
      });
      if (!userReviewed) res.push(movies.title);
    }
  }

  return res;
};
console.log(moviesReviewed("64035fad-a5b7-48c9-9317-3e31e22fe26c"));
