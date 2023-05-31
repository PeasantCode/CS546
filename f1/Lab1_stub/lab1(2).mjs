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
  for (let i = 2; i < Math.sqrt(sum); i++) {
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
    if (numArray[i + 1] < numArray[i]) {
      return [false, i, i + 1];
    }
  }
  return [true];
};

export const questionThree = (obj1, obj2) => {
  let res = [];
  for (let each_key_obj1 in obj1) {
    res[each_key_obj1] = false;
  }
  for (let each_key_obj2 in obj2) {
    {
      res[each_key_obj2] = each_key_obj2 in obj1;
    }
  }
  return res; //return result
};

export const questionFour = (string) => {
  let rows = string.split('\n');
  return rows.map(row => row.split(','))
// split return arr(带[])

};

export const studentInfo = {
  firstName: "YOUR FIRST NAME",
  lastName: "YOUR LAST NAME",
  studentId: "YOUR STUDENT ID",
};
