import React, { Component } from "react";
import PropTypes from "prop-types";

const ALPHA = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const numberToString = number => {
  if (typeof number !== "number") {
    throw new Error("Must be a nunber.");
  }
  if (number <= 0) {
    throw new RangeError("Number must be > 0.");
  }
  let res = "";
  let a = number - 1;
  const _alphabetLength = ALPHA.length;
  while (true) {
    const remainder = a % _alphabetLength;
    res = ALPHA[remainder] + res;
    if (a < _alphabetLength) {
      break;
    }
    a = Math.floor(a / _alphabetLength) - 1;
  }
  return res;
};
export default class RowNumber extends Component {
  static propTypes = {
    rowNumber: PropTypes.string,
    visible: PropTypes.bool,
  };

  render() {
    return this.props.visible ? (
      <div className="seat-picker__row__number">
        {numberToString(Number(this.props.rowNumber))}
      </div>
    ) : null;
  }
}
