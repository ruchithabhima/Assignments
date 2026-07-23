import React from "react";

function SummaryCards({ title, value, color,Icon,bgColor }) {
  return (
    <div className="card1 shadow d-flex align-items center gap-2 ">
      <div className="icon-container" style={{background:bgColor}}>
       <Icon style={{color}}/> 
      </div>
      <div className="d-flex flex-column gap-1">
        <h4 className="cardheading">{title}</h4>
        <h2 className="value" style={{ color }}>{value}</h2>
      </div>
    </div>
  );
}
export default SummaryCards;
