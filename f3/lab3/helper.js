import axios from "axios";
import _ from "lodash";
export const get_users_data = (() => {
  let users_data;

  const fetch_users_data = async () => {
    if (!users_data) {
      const original_users_data = await axios.get(
        "https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json"
      );
      users_data = original_users_data.data;
    }
    return users_data;
  };
  return fetch_users_data;
})();

export const get_movies_data = (() => {
  let movies_data;

  const fetch_movies_data = async () => {
    if (!movies_data) {
      const original_movies_data = await axios.get(
        "https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json"
      );
      movies_data = original_movies_data.data;
    }
    return movies_data;
  };
  return fetch_movies_data;
})();

export const check_string = (pram, pram_name) => {
  if (!pram) throw `${pram_name} must be exist!`;
  if (typeof pram !== "string")
    throw `the type of ${pram_name} must be string!`;
  pram = pram.trim();
  if (pram.length === 0)
    throw `${pram_name} cannot consist of spaces entirely!`;
  return pram;
};

export async function test(
  func,
  func_name,
  { is_error = true, expected_res } = {},
  ...args
) {
  try {
    // const [a,...e]=args;
    const res = await func(...args);
    if (expected_res) {
      if (_.isEqual(res, expected_res)) {
        console.log(`${func_name} passed successfully!\n`);
      } else {
        console.log(`${func_name} cannot pass successfully! The reason is:`);
        console.log(`\tThe actual result is:${JSON.stringify(res)}`);
        console.log(`\tThe expected result is:${JSON.stringify(expected_res)}`);
        console.log(`\tthe args are ${JSON.stringify(args)}\n`);
      }
    }
  } catch (error) {
    if (is_error) {
      console.error(`${func_name} failed successfully with error: ${error}`);
      console.log(`\tthe args are ${JSON.stringify(args)}\n`);
    } else {
      console.log(
        `${func_name} did not pass as expected, and the error is ${error}`
      );
      console.log(`\tthe args are ${JSON.stringify(args)}\n`);
    }
  }
}

export function generateTestNameAndNumber() {
  let testCounters = {};

  return function (testName) {
    if (!testCounters[testName]) {
      testCounters[testName] = 1;
    }
    const testCounter = testCounters[testName];
    testCounters[testName]++;
    return `${testName}${testCounter}`;
  };
}
