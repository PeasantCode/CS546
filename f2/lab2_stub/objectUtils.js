/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
import { compareEqual } from "./helpers.js";
export let areObjectsEqual = (...args) => {
  if (!args) throw "input should not be empty!";
  args.forEach((obj, i) => {
    if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
      throw new Error(`the type of ${i} should be an object!`);
    }
  });

  if (args.length < 2)
    throw "there at least should have two objects passed in to the function!";

  for (let i = 0; i < args.length - 1; i++) {
    if (!compareEqual(args[i], args[i + 1])) return false;
  }
  return true;
};

export let calculateObject = (object, funcs) => {
  if (!object) throw "object should be exist!";
  if (!funcs) throw "functions should exist!";
  if (typeof object !== "object") throw "the type of object should be object!";

  if (object.length < 1) throw "object should not be empty!";
  if (funcs.length < 1) throw "funcs should not be empty!";
  if (!Array.isArray(funcs)) throw "the type of funcs should be an array!";

  const obj_value = Object.values(object);
  obj_value.some((item) => {
    if (typeof item !== "number")
      throw "the type of every item in object should be number!";
  });
  funcs.some((func) => {
    if (typeof func !== "function")
      throw "the type of every item in funcs should be function!";
  });
  let res = {};
  for (let key in object) {
    let value = object[key];
    for (let func of funcs) {
      value = func(value);
    }
    res[key] = Number(value.toFixed(2));
  }
  return res;
};

export let combineObjects = (...args) => {
  if (args.length < 2) "the length of input is at least two!";
  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] !== "object")
      throw "the type of all elements in args should be object!";
    if (Array.isArray(args[i]))
      throw "the type of all elements in args should be object!";

    const key = Object.keys(args[i]);
    if (key.length < 1)
      throw "each object in args at least should have one key!";
  }

  let res = {};
  for (let arg of args) {
    for (let key in arg) {
      if (res[key] === undefined) {
        res[key] = arg[key];
      }
    }
  }
  for (let key in res) {
    if (args.filter((arg) => key in arg).length < 2) {
      delete res[key];
    }
  }
  return res;
};
