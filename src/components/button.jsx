import React from "react";

const Button = ({children,func,id,type,hidden,classes,name}) => {
  return <button  name={name} hidden={hidden} type={type} id={id} className={classes} onClick={func}>{children}</button>;
};

export default Button;
