import React, { useEffect } from "react";

const Form = ({
  names,
  dataInfo,
  children,
  func,
  id,
  type,
  hidden,
  classes,
  name,
}) => {
  useEffect(() => {
    console.log(names.length);
    console.log(names);
  }, []);
  return (
    <form name={name} id={id} className={classes}>
      {Array.from({ length: names.length }).map((_, n) => (
        <div key={names[n]}>
          <label htmlFor={`${names[n]}`}>{`Campo ${names[n]}`}</label>
          <input
            type={type}
            name={`${names[n]}`}
            placeholder={`Preencha o campo ${names[n]}`}
          />
        </div>
      ))}
    </form>
  );
};

export default Form;
