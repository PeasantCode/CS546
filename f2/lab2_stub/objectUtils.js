/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
import { areObjsEqual } from "./helpers.js";
export let areObjectsEqual = (...args) => {
  if (!args) throw "input should not be empty!";

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (typeof arg !== "object" || arg === null || Array.isArray(arg)) {
      throw `the type of ${arg} should be an object!`;
    }
  }

  if (args.length < 2)
    throw "there at least should have two objects passed in to the function!";

  for (let i = 0; i < args.length - 1; i++) {
    if (!areObjsEqual(args[i], args[i + 1])) return false;
  }
  return true;
};

export let calculateObject = (object, funcs) => {
  if (!object) throw "object should be exist!";
  if (Array.isArray(object) || typeof object !== "object")
    throw "the type of object should be an object!";
  if (!funcs) throw "functions should exist!";

  if (object.length === 0) throw "object should not be empty!";
  if (funcs.length === 0) throw "funcs should not be empty!";
  if (!Array.isArray(funcs)) throw "the type of funcs should be an array!";

  const obj_value = Object.values(object);
  for (let i = 0; i < obj_value.length; i++) {
    if (typeof obj_value[i] !== "number")
      throw `the type of ${obj_value[i]} in object should be number!`;
  }
  for (let i = 0; i < funcs.length; i++) {
    if (typeof funcs[i] !== "function")
      throw `the type of ${funcs[i]} in funcs should be function!`;
  }
  let res = {};
  for (let key in object) {
    let value = object[key];
    for (let func of funcs) {
      value = func(value);
    }
    res[key] = +value.toFixed(2);
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

  const res = {};
  for (const arg of args) {
    for (const key in arg) {
      if (res[key] === undefined) {
        res[key] = arg[key];
      }
    }
  }
  for (const key in res) {
    if (args.filter((arg) => key in arg).length < 2) {
      delete res[key];
    }
  }
  return res;
};
