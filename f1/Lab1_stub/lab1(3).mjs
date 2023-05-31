export const questionOne = (arr) => {
  let res = {};
  let sum = 0;
  for (let each of arr) {
    sum += each ** 3;
  }
  if (sum < 2) {
    res[sum] = false;
    return res;
  }
  for (let i = 2; i <= Math.sqrt(sum); i++) {
    if (sum % i === 0) {
      res[sum] = false;
      return res;
    }
  }
  res[sum] = true;
  return res;
};

export const questionTwo = (numArray) => {
  for (let i = 0; i < numArray.length - 1; i++) {
    if (numArray[i + 1] < numArray[i]) return [false, i, i + 1];
  }
  return [true];
};

export const questionThree = (obj1, obj2) => {
  let res = {};
  for (let each_key1 in obj1) {
    res[each_key1] = false;
  }
  for (let each_key2 in obj2) {
    if (each_key2 in obj1) {
      res[each_key2] = true;
    } else {
      res[each_key2] = false;
    }
  }
  return res;
};

export const questionFour = (string) => {
  let mid = string.split("\n");
  let res = mid.map(e => e.split(','))
  return res;

  // for (let each_rows of string.split("\n")) {
  //   res.push(each_rows.split(","));
  // }
  // return res;
};
