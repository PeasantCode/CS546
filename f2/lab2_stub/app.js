/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
import { sortAndFilter, merge, matrixMultiply } from "./arrayUtils.js";
import { palindromes, censorWords, distance } from "./stringUtils.js";
import {
  areObjectsEqual,
  calculateObject,
  combineObjects,
} from "./objectUtils.js";
import { test, generateTestNameAndNumber } from "./helpers.js";

const generateTestName = generateTestNameAndNumber();

let people = [
  { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
  { name: "Matt", age: "21", location: "New York", role: "Student" },
  { name: "Matt", age: "25", location: "New Jersey", role: "Student" },
  { name: "Greg", age: "22", location: "New York", role: "Student" },
  { name: "Mike", age: "21", location: "Chicago", role: "Teacher" },
];

let expected_res;
test(
  sortAndFilter,
  generateTestName("sortAndFilter"),
  false,
  (expected_res = [
    { name: "Greg", age: "22", location: "New York", role: "Student" },
    { name: "Matt", age: "25", location: "New Jersey", role: "Student" },
    { name: "Matt", age: "21", location: "New York", role: "Student" },
    { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
  ]),
  people,
  ["name", "asc"],
  ["location", "asc"],
  "role",
  "Student"
);

test(
  sortAndFilter,
  generateTestName("sortAndFilter"),
  false,
  (expected_res = [
    { name: "Greg", age: "22", location: "New York", role: "Student" },
    { name: "Matt", age: "21", location: "New York", role: "Student" },
    { name: "Matt", age: "25", location: "New Jersey", role: "Student" },
    { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
  ]),
  people,
  ["name", "asc"],
  ["location", "desc"],
  "role",
  "Student"
);
test(
  sortAndFilter,
  generateTestName("sortAndFilter"),
  false,
  (expected_res = [
    { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
    { name: "Greg", age: "22", location: "New York", role: "Student" },
  ]),
  people,
  ["location", "asc"],
  ["name", "asc"],
  "age",
  "22"
);
test(
  sortAndFilter,
  generateTestName("sortAndFilter"),
  true,
  (expected_res = null),
  people,
  ["location", "none"],
  ["name", "asc"],
  "age",
  "22"
);
test(
  sortAndFilter,
  generateTestName("sortAndFilter"),
  true,
  (expected_res = null),
  people,
  ["location", "asc"],
  ["name", "asc"],
  "phone",
  "22"
);
test(
  sortAndFilter,
  generateTestName("sortAndFilter"),
  true,
  (expected_res = null),
  ["location", "asc"],
  ["name", "asc"],
  "age",
  "22"
);
test(
  sortAndFilter,
  generateTestName("sortAndFilter"),
  true,
  (expected_res = null),
  people,
  ["ssn", "asc"],
  ["name", "asc"],
  "age",
  "22"
);
test(
  sortAndFilter,
  generateTestName("sortAndFilter"),
  true,
  (expected_res = null),
  ["string", {}],
  ["location", "asc"],
  ["name", "asc"],
  "age",
  "22"
);
test(
  sortAndFilter,
  generateTestName("sortAndFilter"),
  true,
  (expected_res = null),
  people,
  ["location", "asc"],
  ["name", "asc"],
  "age",
  22
);
test(
  sortAndFilter,
  generateTestName("sortAndFilter"),
  true,
  (expected_res = null),
  [
    { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
    { name: "Greg", age: 22, location: "New York", role: "Student" },
  ],
  "location",
  "age",
  "22"
);

test(
  merge,
  generateTestName("merge"),
  false,
  (expected_res = [0, 1, 1, 2, 2, 3, 3, 4, 6, 8, 10, 15, 25, 29]),
  [3, 0, 1, 2, 4],
  [1, 2, 8, 15],
  [6, 3, 10, 25, 29]
);
test(
  merge,
  generateTestName("merge"),
  false,
  (expected_res = [
    0,
    2,
    3,
    3,
    6,
    8,
    15,
    25,
    29,
    "Aiden",
    "CS-546",
    "Computer Science",
    "Lab2",
    "Patrick",
  ]),
  [3, 0, "Lab2", 2, "Aiden"],
  ["CS-546", "Computer Science", 8, 15],
  [6, 3, "Patrick", 25, 29]
);
test(
  merge,
  generateTestName("merge"),
  false,
  (expected_res = [
    0,
    2,
    3,
    3,
    6,
    8,
    15,
    25,
    29,
    "!Patrick",
    "Aiden",
    "CS-546",
    "Computer Science",
    "Lab2",
  ]),
  [3, 0, "Lab2", 2, "Aiden"],
  ["CS-546", "Computer Science", 8, 15],
  [6, 3, "!Patrick", 25, 29]
);
test(
  merge,
  generateTestName("merge"),
  false,
  (expected_res = [
    0,
    2,
    3,
    3,
    6,
    8,
    15,
    25,
    29,
    "!Patrick",
    "Aiden",
    "CS-546",
    "Computer Science",
    "Lab2",
  ]),
  ["bar", 0, 1, [[[5, "foo"]]]],
  [7, "buzz", ["fizz", 8]]
);

test(
  matrixMultiply,
  generateTestName("matrixMultiply"),
  false,
  (expected_res = [[48], [66], [84]]),
  [
    [2, 3],
    [3, 4],
    [4, 5],
  ],
  [
    [1, 1, 1],
    [2, 2, 2],
  ],
  [[3], [2], [1]]
);
test(
  matrixMultiply,
  generateTestName("matrixMultiply"),
  false,
  (expected_res = [[32]]),
  [[3, 5]],
  [[4], [4]]
);
test(
  matrixMultiply,
  generateTestName("matrixMultiply"),
  true,
  (expected_res = null),
  []
);
test(
  matrixMultiply,
  generateTestName("matrixMultiply"),
  true,
  (expected_res = null),
  [
    [1, 2],
    [3, 3],
  ]
);
test(
  matrixMultiply,
  generateTestName("matrixMultiply"),
  true,
  (expected_res = null),
  [[1, 2]],
  [["foobar"], [6]]
);

test(
  palindromes,
  generateTestName("palindromes"),
  false,
  (expected_res = {
    madam: true,
    loot: false,
    wasitacatisaw: true,
    poordanisinadroop: true,
    anna: true,
    nope: false,
  }),
  [
    "Madam",
    "Loot",
    "Was it a cat I saw?",
    "Poor Dan is in a droop",
    "Anna",
    "Nope",
  ]
);
test(palindromes, generateTestName("palindromes"), true, (expected_res = null));
test(
  palindromes,
  generateTestName("palindromes"),
  true,
  (expected_res = null),
  "hi"
);
test(
  palindromes,
  generateTestName("palindromes"),
  true,
  (expected_res = null),
  "  "
);
test(
  palindromes,
  generateTestName("palindromes"),
  true,
  (expected_res = null),
  1
);

let badWords = ["bread", "chocolate", "pop"];
test(
  censorWords,
  generateTestName("censorWords"),
  false,
  (expected_res =
    "I like !@$#! that has @$#!@$#!@ chips in it but I do not like lolli$#!s"),
  "I like bread that has chocolate chips in it but I do not like lollipops",
  badWords
);
test(
  censorWords,
  generateTestName("censorWords"),
  true,
  (expected_res = null),
  "    ",
  badWords
);
test(
  censorWords,
  generateTestName("censorWords"),
  true,
  (expected_res = null),
  "I like bread that has chocolate chips in it",
  [2, "wow"],
  badWords
);

test(distance, generateTestName("distance"), true, (expected_res = null));
test(
  distance,
  generateTestName("distance"),
  true,
  (expected_res = null),
  [],
  true
);
test(
  distance,
  generateTestName("distance"),
  true,
  (expected_res = null),
  "",
  "",
  ""
);
test(
  distance,
  generateTestName("distance"),
  true,
  (expected_res = null),
  "Hello World!",
  "   !?!",
  "    ...  "
);
test(
  distance,
  generateTestName("distance"),
  true,
  (expected_res = null),
  "Patrick",
  "Patrick",
  "Patrick"
);
test(
  distance,
  generateTestName("distance"),
  true,
  (expected_res = null),
  123,
  "CS",
  "Patrick"
);
test(
  distance,
  generateTestName("distance"),
  true,
  (expected_res = null),
  "Hello there",
  "hello",
  ""
);
test(
  distance,
  generateTestName("distance"),
  true,
  (expected_res = null),
  "Give me music suggestions",
  "rock",
  "pop"
);
test(
  distance,
  generateTestName("distance"),
  true,
  (expected_res = null),
  "Bob met Adam on wednesday",
  "Adam",
  "Bob"
);
test(
  distance,
  generateTestName("distance"),
  true,
  (expected_res = null),
  "I was going to buy preworkout powder yesterday",
  "going to",
  "workout powder"
);

test(
  distance,
  generateTestName("distance"),
  false,
  (expected_res = 5),
  "The brown fox jumped over the lazy dog",
  "fox",
  "dog"
);
test(
  distance,
  generateTestName("distance"),
  false,
  (expected_res = 2),
  "I was going to buy workout powder yesterday",
  "going to",
  "workout powder"
);
test(
  distance,
  generateTestName("distance"),
  false,
  (expected_res = 3),
  "sphinx of black quartz, judge my vow",
  "QUARTZ",
  "vOW"
);
test(
  distance,
  generateTestName("distance"),
  false,
  (expected_res = 2),
  "I really hope it will snow soon because I like snow",
  "I",
  "snow"
);
test(
  distance,
  generateTestName("distance"),
  false,
  (expected_res = 4),
  "I like sweet and salty but I like sweet more",
  "salty",
  "sweet"
);

const first = { a: 2, b: 3 };
const second = { a: 2, b: 4 };
const third = { a: 2, b: 3 };
const forth = {
  a: { sA: "Hello", sB: "There", sC: "Class" },
  b: 7,
  c: true,
  d: "Test",
};
const fifth = {
  c: true,
  b: 7,
  d: "Test",
  a: { sB: "There", sC: "Class", sA: "Hello" },
};
const sixth = {
  name: { firstName: "Patrick", lastName: "Hill" },
  age: 47,
  dob: "9/25/1975",
  hobbies: ["Playing music", "Movies", "Spending time with family"],
};
const seventh = {
  age: 47,
  name: { firstName: "Patrick", lastName: "Hill" },
  hobbies: ["Playing music", "Movies", "Spending time with family"],
  dob: "9/25/1975",
};
const eighth = { b: 3, a: 2 };
test(
  areObjectsEqual,
  generateTestName("areObjectsEqual"),
  false,
  (expected_res = false),
  first,
  second,
  third
);
test(
  areObjectsEqual,
  generateTestName("areObjectsEqual"),
  false,
  (expected_res = true),
  forth,
  fifth
);
test(
  areObjectsEqual,
  generateTestName("areObjectsEqual"),
  false,
  (expected_res = false),
  forth,
  third,
  sixth
);
test(
  areObjectsEqual,
  generateTestName("areObjectsEqual"),
  false,
  (expected_res = true),
  sixth,
  seventh
);
test(
  areObjectsEqual,
  generateTestName("areObjectsEqual"),
  false,
  (expected_res = true),
  first,
  eighth,
  third
);
test(
  areObjectsEqual,
  generateTestName("areObjectsEqual"),
  false,
  (expected_res = true),
  {},
  {},
  {},
  {},
  {}
);
test(
  areObjectsEqual,
  generateTestName("areObjectsEqual"),
  true,
  (expected_res = null),
  [1, 2, 3],
  [1, 2, 3]
);
test(
  areObjectsEqual,
  generateTestName("areObjectsEqual"),
  true,
  (expected_res = null),
  "foo",
  "bar"
);

test(
  calculateObject,
  generateTestName("calculateObject"),false,expected_res = {
    a: 2.45,
    b: 3.74,
    c: 3.16
  },
  { a: 3, b: 7, c: 5 },
  [(n) => n * 2, (n) => Math.sqrt(n)]
);
test(
  calculateObject,
  generateTestName("calculateObject"),true, (expected_res = null),
  { a: "Hello", b: 7, c: false },
  [(n) => n * n]
);
test(
  calculateObject,
  generateTestName("calculateObject"),true, (expected_res = null),
  { a: 1, b: 2, c: 3 },
  [false]
);

test(
  combineObjects,
  generateTestName("combineObjects"),false,expected_res = {
    a: 3,
    d: 4
  },
  { a: 3, b: 7, c: 5 },
  { d: 4, e: 9 },
  { a: 8, d: 2 }
);
test(
  combineObjects,
  generateTestName("combineObjects"),false,expected_res = {
    a: 'waffle',
    d: 4,
    e: 9
  },
  { b: 7, c: 5 },
  { d: 4, e: 9, a: "waffle" },
  { a: 8, d: 2 },
  { d: 3, e: "hello" }
);
test(
  combineObjects,
  generateTestName("combineObjects"),false,expected_res = { },
  { apple: "orange", orange: "pear" },
  { pear: "blueberry", fruit: 4 },
  { cool: false, intelligence: -2 }
);
test(
  combineObjects,
  generateTestName("combineObjects"),true, (expected_res = null),
  { wow: "crazy", super: "duper" },
  false
);
