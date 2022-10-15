function getRandomInteger(min, max) {
  if (min < 0 || max < 0) {
    return NaN;
  }
  if (min === max) {
    return min;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  const randomValue = min + Math.random() * (max - min);
  const roundValue = Math.round(randomValue);
  return roundValue;
}

const getRandomFloat = (min, max, quantity) => {
  if (min < 0 || max < 0 || quantity < 0) {
    return NaN;
  }
  if (min === max) {
    return min;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  const randomValue = min + Math.random() * (max - min);
  const floatValue = +randomValue.toFixed(quantity);
  return floatValue;
};

const getRandomArrayItem = (items) => items[getRandomInteger(0, items.length - 1)];

export {getRandomInteger, getRandomFloat, getRandomArrayItem};
