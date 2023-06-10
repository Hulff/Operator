import React, { useEffect } from "react";

const Form = ({
  names,
  fields,
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
    console.log(fields);
    console.log(names);
  }, []);
  return (
    <form name={name} id={id} className={classes}>
    {Array.from({ length: fields }).map((_, n) => (
      <div key={names[n]}>
        <label htmlFor={`campo${names[n]}`}>{`Campo ${names[n]}`}</label>
        <input name={`campo${names[n]}`} placeholder={`Preencha o campo ${names[n]}`} />
      </div>
    ))}
  </form>
  );
};

export default Form;
