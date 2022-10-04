const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return NaN;
  }
  if (typeof min !== 'number' || typeof max !== 'number') {
    return NaN;
  }
  if (min === max) {
    return 'Задайте разные числа';
  }
  if(min > max){
    const temporary = min;
    min = max;
    max = temporary;
  }
  const randomValue = min + Math.random() * (max - min);
  const roundValue = Math.round(randomValue);
  return roundValue;
};

const getRandomFloat = (min, max, quantity) => {
  if (min < 0 || max < 0 || quantity < 0) {
    return NaN;
  }
  if (typeof min !== 'number' || typeof max !== 'number' || typeof max !== 'number') {
    return NaN;
  }
  if (min === max) {
    return 'Задайте разные числа';
  }
  if(min > max){
    const temporary = min;
    min = max;
    max = temporary;
  }
  const randomValue = min + Math.random() * (max - min);
  const floatValue = Number(randomValue.toFixed(quantity));
  return floatValue;
};

getRandomInteger(40, 10);
getRandomFloat(20, 40, 5);


