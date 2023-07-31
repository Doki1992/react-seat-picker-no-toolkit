import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tooltip } from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faWheelchair } from "@fortawesome/free-solid-svg-icons";

library.add(faWheelchair);

export default class Seat extends Component {
  static defaultProps = {
    isSelected: false,
  };

  handleClick = () => {
    !this.props.isReserved && this.props.selectSeat();
  };

  handleRightClick = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    this.props.onRightClick();
  };

  render() {
    const {
      isSelected,
      tooltip,
      isEnabled,
      isReserved,
      orientation,
      showToolTip,
      isWheelChair,
    } = this.props;
    const className =
      "seat" +
      (isSelected ? " seat--selected" : "") +
      (!isSelected && isEnabled && !isReserved ? " seat--enabled" : "") +
      (isReserved ? " seat--reserved" : "") +
      ` seat--${!orientation ? "north" : orientation}`;
    return (
      <div
        data-tip={tooltip}
        className={className}
        onClick={this.handleClick}
        onContextMenu={this.handleRightClick}
      >
        {tooltip && showToolTip ? (
          <Tooltip {...this.props.tooltipProps} />
        ) : null}
        <span className="seat__number">
          {this.props.seatName || this.props.seatNumber}
        </span>
        {isWheelChair ? <FontAwesomeIcon icon="fa-wheelchair" /> : null}
      </div>
    );
  }
}

Seat.propTypes = {
  isSelected: PropTypes.bool,
  isReserved: PropTypes.bool,
  tooltip: PropTypes.string,
  isEnabled: PropTypes.bool,
  orientation: PropTypes.oneOf(["north", "south", "east", "west"]),
  seatNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  seatName: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectSeat: PropTypes.func.isRequired,
  tooltipProps: PropTypes.object,
  showToolTip: PropTypes.bool,
  onRightClick: PropTypes.func,
  isWheelChair: PropTypes.bool,
};
