import React, { useEffect } from "react";

const Form = ({
  names,
  dataInfo,
  children,
  func,
  id,
  type,
  time,
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
      {time ? (
        <div>
          <input type="time" />
        </div>
      ) : (
        <></>
      )}
      {Array.from({ length: names.length }).map((_, n) => (
        <div key={names[n]}>
          <label htmlFor={`${names[n]}`}>{`${names[n]}`}</label>
          <input
            type={type}
            id={`${names[n]}`}
            name={`${names[n]}`}
            placeholder={`Preencha o ${names[n]}`}
          />
        </div>
      ))}
    </form>
  );
};

export default Form;
