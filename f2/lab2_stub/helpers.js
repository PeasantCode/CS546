/* Todo: Implment any helper functions below 
    and then export them for use in your other files.
*/

function check_sortBy(array, sortBy, sortByName) {
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
}
export { check_sortBy };

export const OnlyNumber = (A) => {
  for (let i = 0; i < A.length; i++) {
    if (A[i].some((item) => typeof item !== "number"))
      throw "the inner arrays must only have numbers as elements!";
  }
};

export const MultiplyOrNot = (A, B) => {
  if (A[0].length !== B.length) throw `the number of columns of ${A} is different from the number of rows of ${B}, so the two matrix cannot multiply!`;
};

export const CheckMatrixValidity = (matrix) => {
  const len = matrix[0].length;
  if (matrix.some((item) => item.length !== len)) {
    throw ("Each inner array should have the same length!");
  }
};

export const Multiply = (A, B) => {
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


export function compareEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key)) return false;
    if (typeof obj1[key] === "object" && obj1[key] !== null) {
      if (!compareEqual(obj1[key], obj2[key])) return false;
    } else if (obj1[key] !== obj2[key])
    return false;
  }
  return true;
}
