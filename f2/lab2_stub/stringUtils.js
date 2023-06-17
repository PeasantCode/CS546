/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
import _ from "lodash";
export let palindromes = (string) => {
  if (!string) throw "the input should not be empty!";
  if (!Array.isArray(string)) throw "the input is not an array!";
  for (let i = 0; i < string.length; i++) {
    const element = string[i].replace(/[\s]/g, "");
    if (typeof element !== "string")
      throw "Array contains non-string elements!";

    if (element.match(/[a-z0-9]/gi) === null)
      throw "Array contains only non-alphanumeric characters!";
  }

  //   if (string.some((str) => typeof str !== "string")) throw "12-13";

  //   string = string.map((str) => str.replace(/ /g, ""));
  //   if (string.some((str) => str.match(/[^a-zA-Z0-9]/gi).length > 0))
  //     throw "15-16";

  const res = {};
  for (let i = 0; i < string.length; i++) {
    const lowerStr = string[i].toLowerCase().replace(/[^a-z0-9]/g, "");
    const reversedStr = lowerStr.split("").reverse().join("");
    res[lowerStr] = lowerStr === reversedStr;
  }
  return res;
};

export let censorWords = (string, badWordsList) => {
  if (!string) throw "string does not exist!";
  if (typeof string !== "string") throw "the type of string should be string!";

  if (!badWordsList) throw "badWordsList does not exist!";
  if (!Array.isArray(badWordsList)) throw "badWordList should be an array!";
  if (badWordsList.length === 0) throw "the badWordList should not be empty!";
  if (badWordsList.every((word) => typeof word !== "string"))
    throw "every element in the bad words list should be string type!";
  if (
    !badWordsList.every((word) =>
      string.toLowerCase().includes(word.toLowerCase())
    )
  )
    throw "each element in the bad words list must exist in the input string!";

  const specialChars = ["!", "@", "$", "#"];
  let charIndex = 0;
  badWordsList.forEach((word) => {
    const regex = new RegExp(word, "gi");
    string = string.replace(regex, (match) => {
      let censored = "";
      for (let i = 0; i < match.length; i++) {
        censored += specialChars[charIndex];
        charIndex = (charIndex + 1) % specialChars.length;
      }
      return censored;
    });
  });
  return string;
};

export let distance = (string, word1, word2) => {
  if (typeof string !== "string") throw "the type of string should be string!";
  if (typeof word1 !== "string") throw "the type of word1 should be string!";
  if (typeof word2 !== "string") throw "the type of word2 should be string!";
  string = string.trim();
  word1 = word1.trim();
  word2 = word2.trim();
  if (!string || !word1 || !word2) throw "input should not be empty strings!";

  if (
    /^[.,\/#!$%\^&\*;:{}=\-_`~()]+$/.test(string) ||
    /^[.,\/#!$%\^&\*;:{}=\-_`~()]+$/.test(word1) ||
    /^[.,\/#!$%\^&\*;:{}=\-_`~()]+$/.test(word2)
  )
    throw "Inputs can't be strings made of only punctuation symbols or spaces";

  if (string.split(" ").length < 2)
    throw "the string is ar least two words long!";
  if (word1 === word2) throw "word1 and word2 cannot be same!";

  const lower_word1 = word1.toLowerCase();
  const lower_word2 = word2.toLowerCase();
  const words = string.toLowerCase().split(" ");

  let w1 = _.lastIndexOf(words, lower_word1);
  let w2 = _.lastIndexOf(words, lower_word2);
  if (w1 === -1) throw "word1 must exist in the string!";
  if (w2 === -1) throw "word2 must exist in the string!";
  if (w1 > w2) throw "word1 must appear before word2!";

  return w2 - w1;
};
