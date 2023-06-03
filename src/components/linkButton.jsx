import React from "react";

const LinkButton = ({children,func}) => {
  return <button className="link-button" onClick={func}>{children}</button>;
};

export default LinkButton;