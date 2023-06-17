/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
//只有类名全大写
import {
  check_sortBy,
  matrixMultiplyCompatible,
  checkMatrixValidity,
  multiply,
} from "./helpers.js";

export let sortAndFilter = (
  array,
  sortBy1,
  sortBy2,
  filterBy,
  filterByTerm
) => {
  if (!array) throw "array does not exist!";

  if (!sortBy1) throw "sortBy1 does not exist!";

  if (!sortBy2) throw "sortBy2 does not exist!";

  if (!filterBy) throw "filterBy does not exist!";

  if (!filterByTerm) throw "filterByTerm does not exist!";

  if (!Array.isArray(array)) throw "array is not an array!";

  if (array.length === 0) throw "array is empty!";

  if (!array.every((e) => typeof e === "object" && !Array.isArray(e)))
    throw "some elements in array is not object!";

  if (array.length < 2)
    throw "objects in array parameter should more than or equal two! ";

  if (!array.every((obj) => Object.keys(obj).length > 0))
    throw "some objects in array parameter are empty!";

  const keys1 = Object.keys(array[0]).sort();
  for (let i = 1; i < array.length; i++) {
    const keys2 = Object.keys(array[i]).sort();
    if (keys1.length !== keys2.length)
      throw "Two objects in array parameter do not share two the same keys!";

    for (let j = 0; j < keys1.length; j++) {
      if (keys1[j] !== keys2[j])
        throw `${keys1[j]} and ${keys2[j]} does not share two same keys!`;
    }
  }

  for (let i = 0; i < array.length; i++) {
    for (const each_value of Object.values(array[i])) {
      if (typeof each_value !== "string")
        throw "the value of objects in array parameter must be string!";

      if (each_value.trim() === "")
        throw "the value of objects in array parameter cannot be empty spaces!";
    }
  }

  check_sortBy(array, sortBy1, "sortBy1");
  check_sortBy(array, sortBy2, "sortBy2");

  if (typeof filterBy !== "string") throw "filterBy should be string!";
  if (filterBy.trim() === "") throw "filterBy should not be empty!";
  if (!Object.keys(array[0]).includes(filterBy))
    throw "the filterBy key is not a key in each object of the array!";

  if (typeof filterByTerm !== "string") throw "filterByTerm should be string!";
  if (filterByTerm.trim() === "") throw "filterByTerm is empty!";

  if (!array.some((item) => item[filterBy] === filterByTerm))
    throw "there is at least one object that has that value and is a string!";

  const resOfFilter = array.filter((array) => array[filterBy] === filterByTerm);

  const sortComparator = (a, b, prop, direction) => {
    const valueA = a[prop];
    const valueB = b[prop];

    // if (valueA > valueB) return direction === "asc" ? 1 : -1;
    // if (valueA < valueB) return direction === "asc" ? -1 : 1;
    // return 0;
    return direction === "asc"
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  };

  const [sortByField1, order1] = sortBy1;
  const [sortByField2, order2] = sortBy2;
  
  resOfFilter.sort(
    (a, b) =>
      sortComparator(a, b, sortByField1, order1) ||
      sortComparator(a, b, sortByField2, order2)
  );

  return resOfFilter;
};

  export let merge = (...args) => {
  if (args.length < 1) throw "at least one array is supplied as input!";
  if (!args.every((item) => Array.isArray(item)))
    throw "every input should be an array!";
  if (args.some((each) => each.length === 0))
    throw "every array should not be empty!";

  const flattenArray = args.flat(Infinity);

  flattenArray.every((item) => {
    if (typeof item !== "string" && typeof item !== "number")
      throw `${item} is not string or number! All elements should be string or number!`;
  });

  flattenArray.sort(function (a, b) {
    if (typeof a === "number" && typeof b === "number") return a - b;
    if (typeof a === "number") return -1;
    if (typeof b === "number") return 1;
    if (typeof a === "string" && typeof b === "string") {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    }
  });
  return flattenArray;
};

export let matrixMultiply = (...args) => {
  if (args.length < 2) throw "it must at least have two inputs!";

  if (!args.every((every) => Array.isArray(every)))
    throw "every input should be an array!";

  if (args.some((item) => item.length === 0))
    throw "every array should not be empty!";

  for (let i = 0; i < args.length - 1; i++) {
    matrixMultiplyCompatible(args[i], args[i + 1]);
  }

  for (let i = 0; i < args.length; i++) {
    checkMatrixValidity(args[i]);
  }

  let result = args[0];
  for (let i = 1; i < args.length; i++) {
    result = multiply(result, args[i]);
  }
  return result;
};
