import React from "react";

const Button = ({dataInfo,children,func,id,type,hidden,classes,name}) => {
  return <button data-info={dataInfo} name={name} hidden={hidden} type={type} id={id} className={classes} onClick={func}>{children}</button>;
};

export default Button;
