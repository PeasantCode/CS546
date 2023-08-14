const checkString = (pram, pramName) => {
  if (!pram) throw `${pramName}`;
  if (typeof pram !== "string") throw `${pramName}`;
  pram = pram.trim();
  if (pram === "") throw `${pramName}`;
  return pram;
};

const checkStrArr = (pram, pramName) => {
  if (!pram) throw `${pramName}`;
  if (!Array.isArray(pram)) throw `${pramName}`;
  if (pram.length === 0) throw `${pramName}`;
  if (pram.some((element) => typeof element !== "string")) throw `${pramName}`;
  for (let i = 0; i < pram.length; i++) {
    pram[i] = pram[i].trim();
    if (pram[i] === "") throw `${pram[i]}`;
  }
  return pram;
};

const isStrArrEqual = (arr1, arr2) => {
  arr1 = checkStrArr(arr1, "arr1");
  arr2 = checkStrArr(arr2, "arr2");
  for (let each1 of arr1) {
    if (!arr2.includes(each1)) return false;
  }
  return true;
};

const checkDate = (date, dateName) => {
  date = checkString(date, dateName);
  const m = new Date(date).getMonth() + 1;
  const month = date.split("/")[0];
  if (m !== +month) throw `${dateName}`;
  return date;
};

export { checkString, checkStrArr, isStrArrEqual, checkDate };
