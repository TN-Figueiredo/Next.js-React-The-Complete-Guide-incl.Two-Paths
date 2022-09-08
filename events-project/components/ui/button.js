import Link from "next/link";
import React from "react";

import classes from "./button.module.css";

const Button = ({ link, children, onClick }) => {
  if (link) {
    return (
      <Link href={link}>
        <a className={classes.btn}>{children}</a>
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={classes.btn}>
      {children}
    </button>
  );
};

export default Button;
