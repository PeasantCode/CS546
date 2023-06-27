export const questionOne = (arr) => {
  let sum = 0;
  let result = {};
  for (let x of arr) {
    sum += x * x * x;
  }
  if (sum <= 1) {
    result[sum] = false;
    return result;
  }
  for (let i = 2; i <= Math.sqrt(sum); i++) {
    if (sum % i === 0) {
      result[sum] = false;
      return result;
    }
  }
  result[sum] = true;
  return result;
};

export const questionTwo = (numArray) => {
  for (let i = 0; i < numArray.length - 1; i++) {
    if (numArray[i] > numArray[i + 1]) {
      return [false, i, i + 1];
    }
  }
  return [true]; //return result
};

export const questionThree = (obj1, obj2) => {
  let res = {}
  let key_obj1 = Object.keys(obj1);
  let key_obj2 = Object.keys(obj2);
  for (let check of key_obj1){
    if(Object.keys(obj2).includes(check)){
      res[check] = true
      continue;
    }
      res[check] = false
  }
  for (let check of key_obj2){
    if(Object.keys(obj1).includes(check)){
      res[check] = true
      continue;
    }
      res[check] = false
  }
  return res; //return result
};

export const questionFour = (string) => {
  let res = []
  let rows = string.split('\n')
  for (let eachRow of rows){
      res.push(eachRow.split(','))
  }
  return res; //return result
};

export const studentInfo = {
  firstName: "YOUR FIRST NAME",
  lastName: "YOUR LAST NAME",
  studentId: "YOUR STUDENT ID",
};
