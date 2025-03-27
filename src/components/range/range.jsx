import React, { useState } from "react";

const Range = ({ value, setValue }) => {
  const min = 20;
  const max = 200;

  const getLeftPosition = () => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Hodnota v thumbu */}
      <div style={{ position: "relative", width: "100%" }}>
        <div
          style={{
            position: "absolute",
            top: "30px",
            left: `${getLeftPosition()}%`,
            transform: "translateX(-50%)",
            background: "#8ABF37",
            color: "#1A1A1A",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "bold",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            whiteSpace: "nowrap",
          }}
        >
          {value} cm
        </div>

        <input
          type="range"
          min={min}
          max={max}
          value={value}
          id="sirka-desky"
          onChange={(e) => setValue(Number(e.target.value))}
          className="slider"
          style={{
            width: "100%",
            height: "6px",
            background: `linear-gradient(to right,#98ba49 0%, #1A1A1A ${((value - min) / (max - min)) * 100}%, #C4C4C4 ${((value - min) / (max - min)) * 100}%, #C4C4C4 100%)`,
            borderRadius: "5px",
            outline: "none",
            appearance: "none",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};

export default Range;
