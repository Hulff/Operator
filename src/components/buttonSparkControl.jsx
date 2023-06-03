import React from "react";

const ButtonControl = ({children,func,id,type,hidden,classes,p1,p2}) => {
  function base () {
    func(p1,p2)
  }
  return <button hidden={hidden} type={type} id={id} className={classes} onClick={base}>{children}</button>;
};

export default ButtonControl;
