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
  setRefs,
  name,
}) => {
  useEffect(() => {
    console.log(names.length);
    console.log(names);
  }, []);
  return (
    <form name={name} id={id} className={classes}>
      {time ? (
        // <div>
        //   <input min={"09:00"} max={"18:00"} ref={time[1]} type="time" />
        // </div>
        <select ref={time[1]} id="myTime">
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="12:00">12:00</option>
          <option value="13:00">13:00</option>
          <option value="14:00">14:00</option>
          <option value="15:00">15:00</option>
          <option value="16:00">16:00</option>
          <option value="17:00">17:00</option>
          <option value="18:00">18:00</option>
        </select>
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
            ref={setRefs[n]}
          />
        </div>
      ))}
    </form>
  );
};

export default Form;
