export const check_string = (pram, pram_name) => {
    if (!pram) throw `${pram_name} must be exist!`;
    if (typeof pram !== "string")
      throw `the type of ${pram_name} must be string!`;
    pram = pram.trim();
    if (pram.length === 0)
      throw `${pram_name} cannot consist of spaces entirely!`;
    return pram;
  };