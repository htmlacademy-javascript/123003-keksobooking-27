function getRandomInteger(min, max) {
  const randomNum = min + Math.random() * (max - min);
  let roundNum = Math.round(randomNum);
  if (min < 0 || max < 0) {
    roundNum = NaN;
  }
  if (min === max) {
    roundNum = 'Задайте разные числа';
  }
  return roundNum;
}
getRandomInteger(20, 10);

function getRandomFloat(min, max, qty) {
  const randomNum = min + Math.random() * (max - min);
  let floatNum = randomNum.toFixed(qty);
  if (min < 0 || max < 0 || qty < 0) {
    floatNum = NaN;
  }
  if (min === max) {
    floatNum = 'Задайте разные числа';
  }
  return floatNum;
}
getRandomFloat(20, 40, 5);
