import React from "react";
import classes from "./MyToggle.module.css";

const MyToggle = (props) => {
  return (
    <label className={classes.switch}>
      <input type="checkbox" {...props} />
      <span className={classes.slider} />
    </label>
  );
};

export default MyToggle;
