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

function sortAndFilter_test() {
  test(
    sortAndFilter,
    generateTestName("sortAndFilter"),
    {
      is_error: false,
      expected_res: [
        { name: "Greg", age: "22", location: "New York", role: "Student" },
        { name: "Matt", age: "25", location: "New Jersey", role: "Student" },
        { name: "Matt", age: "21", location: "New York", role: "Student" },
        { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
      ],
    },
    people,
    ["name", "asc"],
    ["location", "asc"],
    "role",
    "Student"
  );

  test(
    sortAndFilter,
    generateTestName("sortAndFilter"),
    {
      is_error: false,
      expected_res: [
        { name: "Greg", age: "22", location: "New York", role: "Student" },
        { name: "Matt", age: "21", location: "New York", role: "Student" },
        { name: "Matt", age: "25", location: "New Jersey", role: "Student" },
        { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
      ],
    },
    people,
    ["name", "asc"],
    ["location", "desc"],
    "role",
    "Student"
  );
  test(
    sortAndFilter,
    generateTestName("sortAndFilter"),
    {
      is_error: false,
      expected_res: [
        { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
        { name: "Greg", age: "22", location: "New York", role: "Student" },
      ],
    },
    people,
    ["location", "asc"],
    ["name", "asc"],
    "age",
    "22"
  );
  test(
    sortAndFilter,
    generateTestName("sortAndFilter"),
    {},
    people,
    ["location", "none"],
    ["name", "asc"],
    "age",
    "22"
  );
  test(
    sortAndFilter,
    generateTestName("sortAndFilter"),
    {},
    people,
    ["location", "asc"],
    ["name", "asc"],
    "phone",
    "22"
  );
  test(
    sortAndFilter,
    generateTestName("sortAndFilter"),
    {},
    ["location", "asc"],
    ["name", "asc"],
    "age",
    "22"
  );
  test(
    sortAndFilter,
    generateTestName("sortAndFilter"),
    {},
    people,
    ["ssn", "asc"],
    ["name", "asc"],
    "age",
    "22"
  );
  test(
    sortAndFilter,
    generateTestName("sortAndFilter"),
    {},
    ["string", {}],
    ["location", "asc"],
    ["name", "asc"],
    "age",
    "22"
  );
  test(
    sortAndFilter,
    generateTestName("sortAndFilter"),
    {},
    people,
    ["location", "asc"],
    ["name", "asc"],
    "age",
    22
  );
  test(
    sortAndFilter,
    generateTestName("sortAndFilter"),
    {},
    [
      { name: "Ryan", age: "22", location: "Hoboken", role: "Student" },
      { name: "Greg", age: 22, location: "New York", role: "Student" },
    ],
    "location",
    "age",
    "22"
  );
}

function merge_test() {
  test(
    merge,
    generateTestName("merge"),
    {
      is_error: false,
      expected_res: [0, 1, 1, 2, 2, 3, 3, 4, 6, 8, 10, 15, 25, 29],
    },
    [3, 0, 1, 2, 4],
    [1, 2, 8, 15],
    [6, 3, 10, 25, 29]
  );
  test(
    merge,
    generateTestName("merge"),
    {
      is_error: false,
      expected_res: [
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
      ],
    },
    [3, 0, "Lab2", 2, "Aiden"],
    ["CS-546", "Computer Science", 8, 15],
    [6, 3, "Patrick", 25, 29]
  );
  test(
    merge,
    generateTestName("merge"),
    {
      is_error: false,
      expected_res: [
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
      ],
    },
    [3, 0, "Lab2", 2, "Aiden"],
    ["CS-546", "Computer Science", 8, 15],
    [6, 3, "!Patrick", 25, 29]
  );
  test(
    merge,
    generateTestName("merge"),
    {
      is_error: false,
      expected_res: [0, 1, 5, 7, 8, "bar", "buzz", "fizz", "foo"],
    },
    ["bar", 0, 1, [[[5, "foo"]]]],
    [7, "buzz", ["fizz", 8]]
  );
}

function matrixMultiply_test() {
  test(
    matrixMultiply,
    generateTestName("matrixMultiply"),
    {
      is_error: false,
      expected_res: [[48], [66], [84]],
    },
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
    {
      is_error: false,
      expected_res: [[32]],
    },
    [[3, 5]],
    [[4], [4]]
  );
  test(matrixMultiply, generateTestName("matrixMultiply"), {}, []);
  test(matrixMultiply, generateTestName("matrixMultiply"), {}, [
    [1, 2],
    [3, 3],
  ]);
  test(
    matrixMultiply,
    generateTestName("matrixMultiply"),
    {},
    [[1, 2]],
    [["foobar"], [6]]
  );
}

function palindromes_test() {
  test(
    palindromes,
    generateTestName("palindromes"),
    {
      is_error: false,
      expected_res: {
        madam: true,
        loot: false,
        wasitacatisaw: true,
        poordanisinadroop: true,
        anna: true,
        nope: false,
      },
    },
    [
      "Madam",
      "Loot",
      "Was it a cat I saw?",
      "Poor Dan is in a droop",
      "Anna",
      "Nope",
    ]
  );
  test(palindromes, generateTestName("palindromes"), {});
  test(palindromes, generateTestName("palindromes"), {}, "hi");
  test(palindromes, generateTestName("palindromes"), {}, "  ");
  test(palindromes, generateTestName("palindromes"), {}, 1);
}

function censorWords_test() {
  let badWords = ["bread", "chocolate", "pop"];
  test(
    censorWords,
    generateTestName("censorWords"),
    {
      is_error: false,
      expected_res:
        "I like !@$#! that has @$#!@$#!@ chips in it but I do not like lolli$#!s",
    },
    "I like bread that has chocolate chips in it but I do not like lollipops",
    badWords
  );
  test(censorWords, generateTestName("censorWords"), {}, "    ", badWords);
  test(
    censorWords,
    generateTestName("censorWords"),
    {},
    "I like bread that has chocolate chips in it",
    ["2", "wow"],
    badWords
  );
}

function distance_test() {
  test(distance, generateTestName("distance"), {});
  test(distance, generateTestName("distance"), {}, [], true);
  test(distance, generateTestName("distance"), {}, "", "", "");
  test(
    distance,
    generateTestName("distance"),
    {},
    "Hello World!",
    "   !?!",
    "    ...  "
  );
  test(
    distance,
    generateTestName("distance"),
    {},
    "Patrick",
    "Patrick",
    "Patrick"
  );
  test(distance, generateTestName("distance"), {}, 123, "CS", "Patrick");
  test(distance, generateTestName("distance"), {}, "Hello there", "hello", "");
  test(
    distance,
    generateTestName("distance"),
    {},
    "Give me music suggestions",
    "rock",
    "pop"
  );
  test(
    distance,
    generateTestName("distance"),
    {},
    "Bob met Adam on wednesday",
    "Adam",
    "Bob"
  );
  test(
    distance,
    generateTestName("distance"),
    {},
    "I was going to buy preworkout powder yesterday",
    "going to",
    "workout powder"
  );

  test(
    distance,
    generateTestName("distance"),
    {
      is_error: false,
      expected_res: 5,
    },
    "The brown fox jumped over the lazy dog",
    "fox",
    "dog"
  );
  test(
    distance,
    generateTestName("distance"),
    {is_error: false,expected_res:2},
    "I was going to buy workout powder yesterday",
    "going to",
    "workout powder"
  );
  test(
    distance,
    generateTestName("distance"),
    {
      is_error: false,
      expected_res: 3,
    },
    "sphinx of black quartz, judge my vow",
    "QUARTZ",
    "vOW"
  );
  test(
    distance,
    generateTestName("distance"),
    {
      is_error: false,
      expected_res: 2,
    },
    "I really hope it will snow soon because I like snow",
    "I",
    "snow"
  );
  test(
    distance,
    generateTestName("distance"),
    {
      is_error: false,
      expected_res: 4,
    },
    "I like sweet and salty but I like sweet more",
    "salty",
    "sweet"
  );
}

function areObjectsEqual_test() {
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
    {
      is_error: false,
      expected_res: false,
    },
    first,
    second,
    third
  );
  test(
    areObjectsEqual,
    generateTestName("areObjectsEqual"),
    {
      is_error: false,
      expected_res: true,
    },
    forth,
    fifth
  );
  test(
    areObjectsEqual,
    generateTestName("areObjectsEqual"),
    {
      is_error: false,
      expected_res: false,
    },
    forth,
    third,
    sixth
  );
  test(
    areObjectsEqual,
    generateTestName("areObjectsEqual"),
    {
      is_error: false,
      expected_res: true,
    },
    sixth,
    seventh
  );
  test(
    areObjectsEqual,
    generateTestName("areObjectsEqual"),
    {
      is_error: false,
      expected_res: true,
    },
    first,
    eighth,
    third
  );
  test(
    areObjectsEqual,
    generateTestName("areObjectsEqual"),
    {
      is_error: false,
      expected_res: true,
    },
    {},
    {},
    {},
    {},
    {}
  );
  test(
    areObjectsEqual,
    generateTestName("areObjectsEqual"),
    {},
    [1, 2, 3],
    [1, 2, 3]
  );
  test(areObjectsEqual, generateTestName("areObjectsEqual"), {}, "foo", "bar");
}

function calculateObject_test() {
  test(
    calculateObject,
    generateTestName("calculateObject"),
    {
      is_error: false,
      expected_res: {
        a: 2.45,
        b: 3.74,
        c: 3.16,
      },
    },
    { a: 3, b: 7, c: 5 },
    [(n) => n * 2, (n) => Math.sqrt(n)]
  );
  test(
    calculateObject,
    generateTestName("calculateObject"),
    {},
    { a: "Hello", b: 7, c: false },
    [(n) => n * n]
  );
  test(
    calculateObject,
    generateTestName("calculateObject"),
    {},
    { a: 1, b: 2, c: 3 },
    [false]
  );
}

function combineObjects_test() {
  test(
    combineObjects,
    generateTestName("combineObjects"),
    {
      is_error: false,
      expected_res: {
        a: 3,
        d: 4,
      },
    },
    { a: 3, b: 7, c: 5 },
    { d: 4, e: 9 },
    { a: 8, d: 2 }
  );
  test(
    combineObjects,
    generateTestName("combineObjects"),
    {
      is_error: false,
      expected_res: {
        a: "waffle",
        d: 4,
        e: 9,
      },
    },
    { b: 7, c: 5 },
    { d: 4, e: 9, a: "waffle" },
    { a: 8, d: 2 },
    { d: 3, e: "hello" }
  );
  test(
    combineObjects,
    generateTestName("combineObjects"),
    {
      is_error: false,
      expected_res: {},
    },
    { apple: "orange", orange: "pear" },
    { pear: "blueberry", fruit: 4 },
    { cool: false, intelligence: -2 }
  );
  test(
    combineObjects,
    generateTestName("combineObjects"),
    {},
    { wow: "crazy", super: "duper" },
    false
  );
}

sortAndFilter_test();
merge_test();
matrixMultiply_test();
palindromes_test();
censorWords_test();
distance_test();
areObjectsEqual_test();
calculateObject_test();
combineObjects_test();
