import React, { useEffect, useState } from "react";
import { InterestItems } from "../../constant/constant";

function IntrestItem({ intrestValue, setIntrestValue }) {
  const onChangeIntrest = (e) => {
    console.log("vinay", e.target.value);
    setIntrestValue([...intrestValue, e.target.value]);
  };

  useEffect(() => {
    console.log("Profile ", intrestValue);
  });

  return (
    <div className="image-Slide-1">
      {InterestItems.map((item, index) => {
        return (
          <div className={`imgWrap`} key={"index" + index}>
            <img src={`./images/${item.img}`} />
            <input
              type="checkbox"
              value={item.title}
              onChange={onChangeIntrest}
            ></input>
            <img className="thumbIcon" src={"./images/thumb.png"} />
            <div className="title">{item.title}</div>
          </div>
        );
      })}
    </div>
  );
}

export default IntrestItem;
