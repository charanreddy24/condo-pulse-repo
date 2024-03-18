import React from "react";
import Board from "/src/pages/home/boards/Board";

export default function MainBody({ selectedOption, selectedPeriod }) {
  return (
    <Board selectedOption={selectedOption} selectedPeriod={selectedPeriod} />
  );
}
