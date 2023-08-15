const peopleCounter = () => {
  let howManyPeople = 0;
  return () => {
    // if (!howManyPeople) howManyPeople = 0;
    howManyPeople++;
    console.log(howManyPeople);
  };
};

// --- //

let howManyPeople = 0;
const pCtr = () => {
  howManyPeople++;
};

// --- //

// const ctr = peopleCounter();
// ctr();
// ctr();
// ctr();

pCtr()
console.log(howManyPeople);
