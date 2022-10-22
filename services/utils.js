'use strict';
const twoDecimalRound = (v) =>
  Math.round((Number(v) + Number.EPSILON) * 100) / 100;

const convertToString = (v) => `${v}`;

const onlyInts = ({ min, max }) => {
  return (value) => {
    return !value.some((el) => {
      try {
        el = Number(el);
      } catch (error) {
        return true;
      }
      if (!Number.isInteger(el)) return true;
      if (Number.isInteger(min) && el < min) return true;
      if (Number.isInteger(max) && el > max) return true;
    });
  };
};

const minMaxString = ({ min, max }) => {
  let minString = typeof min === 'number' ? `min: ${min}` : '';
  let maxString = typeof max === 'number' ? `max: ${max}` : '';
  let result =
    minString && maxString
      ? `${minString}, ${maxString}`
      : `${minString}${maxString}`;
  return result;
};

module.exports = {
  twoDecimalRound,
  convertToString,
  onlyInts,
  minMaxString,
};
