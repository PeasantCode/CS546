/* Todo: Implment any helper functions below 
    and then export them for use in your other files.
*/

import _ from "lodash";
export const check_sortBy = (array, sortBy, sortByName) => {
  if (!Array.isArray(sortBy)) {
    throw `${sortByName} is not an array!`;
  }
  if (sortBy.length === 0) {
    throw `${sortByName} is empty!`;
  }
  if (sortBy.length !== 2) {
    throw `${sortByName} has more than two elements!`;
  }

  const sortByField = sortBy[0];
  const order = sortBy[1];

  if (typeof sortByField !== "string") {
    throw `the values of sortByField in ${sortByName} are not string!`;
  }
  if (typeof order !== "string") {
    throw `the values of order in ${sortByName} order are not string!`;
  }

  if (sortByField.trim() === "")
    throw `the values of sortByField in ${sortByName} are empty`;
  if (order.trim() === "")
    throw `the values of order in ${sortByName} are empty`;

  if (!Object.keys(array[0]).includes(sortByField)) {
    throw `the value of sortByField in ${sortByName} is not a key in each object of the array!`;
  }

  if (!["asc", "desc"].includes(order)) {
    throw `order in ${sortByName} should be 'asc' or 'desc'! `;
  }
};

export const matrixMultiplyCompatible = (A, B) => {
  checkMatrixValidity(A);
  checkMatrixValidity(B);
  if (A[0].length !== B.length)
    throw `the number of columns of ${A} is different from the number of rows of ${B}, so the two matrix cannot multiply!`;
};

export const checkMatrixValidity = (matrix) => {
  const len = matrix[0].length;
  if (matrix.some((item) => item.length !== len)) {
    throw "Each inner array should have the same length!";
  }
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i].some((item) => typeof item !== "number"))
      throw "the inner arrays must only have numbers as elements!";
  }
};

export const multiply = (A, B) => {
  const rows = A.length;
  const columns = B[0].length;
  const res = Array(rows)
    .fill()
    .map(() => Array(columns).fill(0));

  for (let row = 0; row < A.length; row++) {
    for (let column = 0; column < B[0].length; column++) {
      for (let i = 0; i < B.length; i++) {
        res[row][column] += A[row][i] * B[i][column];
      }
    }
  }
  return res;
};

export function areObjsEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1).sort();
  const keys2 = Object.keys(obj2).sort();

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key)) return false;

    if (typeof obj1[key] !== typeof obj2[key]) return false;

    if (
      (Array.isArray(obj1[key]) && !Array.isArray(obj2[key])) ||
      (!Array.isArray(obj1[key]) && Array.isArray(obj2[key]))
    ) {
      return false;
    }
    if (
      typeof obj1[key] === "object" &&
      obj1[key] !== null &&
      typeof obj2[key] === "object" &&
      obj2[key] !== null
    ) {
      if (!areObjsEqual(obj1[key], obj2[key])) return false;
    } else if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

export function test(
  func,
  func_name,
  { is_error = true , expected_res } = {},
  ...args
) {
  try {
    // const [a,...e]=args;
    const res = func(...args);
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


