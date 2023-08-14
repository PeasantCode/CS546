import { ObjectId } from "mongodb";

export const check_string = (pram, pram_name) => {
  if (!pram) throw `${pram_name} must be exist!`;
  if (typeof pram !== "string")
    throw `the type of ${pram_name} must be string!`;
  pram = pram.trim();
  if (pram.length === 0)
    throw `${pram_name} cannot consist of spaces entirely!`;
  return pram;
};

export const check_Id = (pram, pram_name) => {
  pram = check_string(pram, pram_name);
  if (!ObjectId.isValid(pram)) throw `${pram_name} is not a valid ObjectId!`;
  return pram;
};

export const checkStrArray = (array, arrayName) => {
  if (!array) throw `${arrayName} must exist!`;
  if (!Array.isArray) throw `${arrayName} type must be array!`;
  if (array.length === 0) throw `${arrayName} should not be empty!`;
  if (array.some((element) => typeof element !== "string"))
    throw `${arrayName} should have only string elements!`;

  array = array.map((element) => (element = element.trim()));

  if (array.some((element) => element.length === 0))
    throw `${arrayName} should not include empty strings!`;

  return array;
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

export const checkDate = (date, dataName) => {
  date = check_string(date, "date");
  const newDate = new Date(date);
  const month = newDate.getMonth();
  if (!month) throw `${dataName} is not valid!`;
  const month2 = date.split("/")[0];
  if (+month2 !== month + 1) throw `${dataName} is not valid!`;
  return date;
};
