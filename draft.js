const checkDate = (date) => {
  if (!date) throw "";
  if (typeof date !== "string") throw "";

  const [month, day, year, ...rest] = date.split("/");
  if (rest.length > 0) throw "";
  if (!month | !day | !year) throw "";

  if (month.length > 2 || month.length == 0) throw "";
  if (day.length > 2 || month.length == 0) throw "";
  if (year.length != 4) throw "";

  if (isNaN(month) || isNaN(day) || isNaN(year)) throw "";
  [month, day, year] = [+month, +day, +year]; //?

  if (month % 1 !== 0 || day % 1 !== 0 || year % 1 !== 0) throw "";
  if (month < 1 || month > 12) throw "";
  if (day < 1 || day > 31) throw "";
  if (year < 1900 || year > new Date().getFullYear + 1) throw "";

  if (month === 2 && isLeapYear) {
    if (day > 29) throw "";
  }
  if (month === 2 && !isLeapYear) {
    if (day > 28) throw "";
  }
};

const checkDate2 = (date) => {
  const myDate = new Date(date);
};

const isLeapYear = (year) => {
  // input check
  // ...
  return;
};

let a = 11 / 3;
console.log(a.toFixed(1));


console.log(+ "a");