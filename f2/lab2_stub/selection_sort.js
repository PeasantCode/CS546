// // // function selection_sort(array) {
// // //   for (let i = 0; i < array.length - 1; i++) {
// // //     let minIndex = i;
// // //     for (let j = i + 1; j < array.length; j++) {
// // //       if (array[j] < array[minIndex]) {
// // //         minIndex = j;
// // //       }
// // //     }
// // //     let temp = array[minIndex];
// // //     array[minIndex] = array[i];
// // //     array[i] = temp;
// // //     // [array[i],array[minIndex]] = [array[minIndex],array[i]]
// // //   }
// // //   return array;
// // // }

// // // console.log(!!0);
// // // console.log(!!1);

// // // console.log(0 || 0);
// // // console.log(0 || 1);
// // // console.log(1 || 0);
// // // console.log(1 || 1);

// // // console.log("");

// // // console.log(0 && 0);
// // // console.log(0 && 1);
// // // console.log(1 && 0);
// // // console.log(1 && 1);

// // // // function sortBy1(field1, field2){
// // // //   if(field1>field2)return 1;
// // // //   if(field1<field1)return -1;
// // // //   return 0;
// // // // }
// // // // function sortBy2(field1, field2){
// // // //   if(field1>field2)return 1;
// // // //   if(field1<field1)return -1;
// // // //   return 0;
// // // // }
// // // // function arrSort(arr,a,)

// // // // arr.sort((a,b)=>sortBy1(a,b)||sortBy2(a,b))

// // // // const arr = [5, 4, 1, 3, 2];
// // // // arr.sort((a, b) => {
// // // //   let res;
// // // //   if (a > b) res = -1;
// // // //   if (a < b) res =  1;
// // // //   res = 0 || sortBy2(a,b)
// // // //   return res;
// // // // });
// // // // console.log(arr);

// // // let a = 21;
// // // let b = `this is ${a}!`
// // // console.log(b);

// // // function checkNumber(num, whatNumber){
// // //   if(num>0)throw `${whatNumber} is > 0`;
// // //   if(num<0)throw `${whatNumber} is < 0`;
// // //   if(num===0)throw `${whatNumber} is = 0`
// // // }
// // // const age =10;
// // // const tax = 1000;
// // // const people = 100;

// // // // array = ['abc', '13','123','dfdfs'];

// // // const c = 'abc';
// // // const d= '16';
// // // console.log(isNaN(d));

// // // var data = [
// // //   {name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student'},
// // //   {name: 'Matt', age: '21', location: 'New York', role: 'Student'},
// // //   {name: 'Matt', age: '25', location: 'New Jersey', role: 'Student'},
// // //   {name: 'Greg', age: '22', location: 'New York', role: 'Student'},
// // //   {name: 'Mike', age: '21', location: 'Chicago', role: 'Teacher'}
// // // ];

// // // data.sort(function(a, b) {
// // //   if (a.name < b.name) {
// // //     return -1; // a应该在b之前
// // //   } else if (a.name > b.name) {
// // //     return 1; // a应该在b之后
// // //   } else {
// // //     // 如果name相同，则按照location进行排序
// // //     if (a.location < b.location) {
// // //       return -1; // a应该在b之前
// // //     } else if (a.location > b.location) {
// // //       return 1; // a应该在b之后
// // //     } else {
// // //       return 0; // 保持原始顺序
// // //     }
// // //   }
// // // });

// // // console.log(data);

// // // const f = [[[[[1]]]],2]
// // // const g = f.flat(Infinity)
// // // console.log(g);

// // // let arr = ['bcd','abc','def',2,3,6,4,1]
// // // arr.sort()

// // // console.log(arr);

// // // console.log('start');

// // // a = [[[2,3],[3,4],[4,5]],[[1,1,1],[2,2,2]]]
// // // for(let i = 0;i < a.length;i++){
// // //   if(i%2 === 0) console.log(a[i][i].length);
// // //   }

// // //   const rows = 3;
// // //   const columns = 3;

// // //   const emptyArray = Array(rows).fill().map(() => Array(columns));
// // //   emptyArray[0][0] = 5;
// // //   console.log(emptyArray);

// // // console.log(' b c  '.match(/[^a-z0-9]/g));
// // // const str= "I like bread that has chocolate chips in it but I do not like lollipops"
// // // const charArr = str.split("");
// // // console.log(object);
// // // console.log(str.indexOf("pop"));

// // [
// //   [1, 2, 3],
// //   [4, 5, 6],
// //   [7, 8, 9],
// //   [10, 11, 12],
// // ];
// // const symbols = ["!", "@", "#", "$", "%", "^"];
// // const logSymbol = (num, symbols) => {
// //   // for (let i = 0; i < num; i++) {
// //   //   console.log(symbols[i % symbols.length]);
// //   let i = 0;
// //   while (i < num) {
// //     console.log(symbols[i % symbols.length]);
// //     i++;
// //   }
// // };
// // logSymbol(9, symbols);

// // let badWords = ["bread", "chocolate", "pop"];
// // badWords.forEach((word) => {
// //   const regex = new RegExp(word, "gi");
// //   console.log(regex);
// // });

// // let str = "Hello, World!";
// // let newStr = str.replace(/o/g, (match) => {
// //   console.log("Matched substring: " + match);
// //   return "@";
// // });
// // console.log(newStr);

// // // const fi = [1,2,3,4]
// // // if(typeof first !== 'object'){
// // //   console.log(0);
// // // }
// // // else console.log(1);

// // // const f = {a: 2, b: 3};
// // // f.forEach((obj,i) => {
// // //   console.log(obj);
// // // })

// // // let bbb = { a: 3, b: 7, c: 5 }
// // // let aaa = [1,2,3,4,5]
// // // let ddd = {}
// // // const ccc = function (a,b){
// // //   const d = a + b
// // //   return d;
// // // }
// // // console.log(typeof bbb);
// // // console.log(typeof aaa);
// // // console.log(typeof ccc);
// // // console.log(!bbb);
// // // console.log(!ddd);

// // let res = {};

// // let arg = [1, 2, 3, 4];
// // const a = arg.indexOf(5);
// // console.log(a);

// // const arr = [1, 2, 3];
// // // const [c, d, e] = arr;
// // console.log(...arr);

// // function f() {}
// // console.log(f.name);

// // console.log("CS-546" > "Computer Science");

// // const strr = " iii like an apple iii";
// // console.log(strr.lastIndexOf('iii'));

// // function distance(s, word1, word2) {
// //   // 检查所有输入是否存在，并且是字符串类型
// //   if (!s || typeof s !== 'string' || !word1 || typeof word1 !== 'string' || !word2 || typeof word2 !== 'string') {
// //       throw new Error('Inputs must be non-empty strings');
// //   }

// //   // 检查字符串和单词是否不只是空格或标点符号
// //   if (/^\s*$/.test(s) || /^\s*$/.test(word1) || /^\s*$/.test(word2) || /^[\s\p{P}]*$/u.test(s) || /^[\s\p{P}]*$/u.test(word1) || /^[\s\p{P}]*$/u.test(word2)) {
// //       throw new Error('Strings cannot be made of just whitespace or punctuation');
// //   }

// //   // 检查字符串是否至少有两个单词
// //   if (s.trim().split(/\s+/).length < 2) {
// //       throw new Error('The string must contain at least two words');
// //   }

// //   // 检查两个单词是否不同
// //   if (word1.toLowerCase() === word2.toLowerCase()) {
// //       throw new Error('The two words must be different');
// //   }

// //   // 检查字符串中是否包含两个单词，且word1在word2前面
// //   const index1 = s.toLowerCase().indexOf(word1.toLowerCase());
// //   const index2 = s.toLowerCase().indexOf(word2.toLowerCase(), index1 + word1.length);

// //   if (index1 === -1 || index2 === -1 || index1 >= index2) {
// //       throw new Error('Both words must exist in the string and word1 must appear before word2');
// //   }

// //   // 计算从word1的起始位置到word2的结束位置之间的单词数
// //   const distance = s.slice(index1, index2 + word2.length).trim().split(/\s+/).length;
// //   // word1和word2可能包含多个单词，需要减去这些单词数
// //   const subtract = word1.split(/\s+/).length + word2.split(/\s+/).length - 1;

// //   return distance - subtract;
// // }

// // console.log(distance("The brown fox jumped over the lazy dog", "fox", "dog"));
// // console.log(distance("I was going to buy workout powder yesterday", "going to", "workout powder"));
// // console.log(distance("sphinx of black quartz, judge my vow", "QUARTZ", "vOW"));
// // console.log(distance("I really hope it will snow soon because I like snow", "I", "snow") );
// // console.log(distance("I like sweet and salty but I like sweet more", "salty", "sweet"));

// const string = "I really hope it will snow soon because I like snow";
// const word1 = "I";
// const word2 = "snow";
// const regex = new RegExp(
//   `\\b${word1}\\b[^\w]?(?:(?<!\\b${word1}\\b|\\b${word2}\\b).)*?\\b${word2}\\b`,
//   "gi"
// );

// // const regex = new RegExp(`[^\w]${word1}[^\w](?:(?<!${word1}|${word2}).)*[^\w]${word2}[^\w]`,'gi') ;
// const target_arr = string.match(regex);
// console.log(target_arr.join(" ").split(" "));
// console.log(target_arr.join(" ").split(" ").length);

// console.log(target_arr.length);
// console.log(target_arr);

// // const string = "sphinx of black quartz, judge my vow";
// // const word1 = 'quartz'
// // const word2 = 'vow'
// // const regex = new RegExp(`${word1}(.*?)${word2}`, 'gi');
// // const target_arr = string.match(regex);
// // console.log(target_arr);


