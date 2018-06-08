const genClothingMsg = (lowestTemp, highestTemp) => {
  if (lowestTemp < 5 && highestTemp < 10) {
    return "a thick jumper";
  } else if (lowestTemp > 20 && highestTemp > 20) {
    return "shorts";
  } else if (lowestTemp < 20 && highestTemp > 20) {
    return "shorts and a jumper";
  } else {
    return "something not too thin and not too thick";
  }
};
module.exports = genClothingMsg;