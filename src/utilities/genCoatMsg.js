const genCoatMsg = (precipProbability, precipType) => {
  if (precipProbability < 20) {
    return `take your chances and don't bring a ${precipType} jacket!`;
  } else if (precipProbability > 70) {
    return `put on your ${precipType} jacket!`;
  } else {
    return `carry your ${precipType} jacket (or get your chances - ${100 - precipProbability}% chance of being fine!`;
  }
};

module.exports = genCoatMsg;