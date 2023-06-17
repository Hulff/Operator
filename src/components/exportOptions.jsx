import React from "react";
const ExportOptions = ({ monthList, refList, daysList }) => {
  const check = (n) => {
    for (let i = 0; i < monthList.length; i++) {
      if (n == monthList[i]) {
        return true;
      }
    }
    return false;
  };
  return (
    <>
      <div className="div-form-export">
        <form className="form-export">
          <select ref={refList[0]}>
            {[2023, 2024, 2025].map((n) => (
              <option value={n} name={n}>
                {n}
              </option>
            ))}
          </select>
          <select ref={refList[1]}>
            {[
              { nome: "Janeiro", valor: "1" },
              { nome: "Fevereiro", valor: "2" },
              { nome: "Março", valor: "3" },
              { nome: "Abril", valor: "4" },
              { nome: "Maio", valor: "5" },
              { nome: "Junho", valor: "6" },
              { nome: "Julho", valor: "7" },
              { nome: "Agosto", valor: "8" },
              { nome: "Setembro", valor: "9" },
              { nome: "Outubro", valor: "10" },
              { nome: "Novembro", valor: "11" },
              { nome: "Dezembro", valor: "12" },
            ].map((n) =>
              monthList.some((val) => check(n.valor)) ? (
                <option value={n.valor} name={n.nome}>
                  {n.nome}
                </option>
              ) : (
                <></>
              )
            )}
          </select>
          <select ref={refList[2]}>
            {daysList.map((n) => (
              <option name={n}>{n}</option>
            ))}
          </select>
          <select ref={refList[3]}>
            {daysList.map((n) => (
              <option name={n}>{n}</option>
            ))}
          </select>
        </form>
      </div>
    </>
  );
};

export default ExportOptions;
