import React from "react";

const Button = ({children,func,id,type,hidden,classes}) => {
  return <button hidden={hidden} type={type} id={id} className={classes} onClick={func}>{children}</button>;
};

export default Button;
