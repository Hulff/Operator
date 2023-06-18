import React from "react";
const ExportOptions = ({
  id,
  monthList,
  refList,
  daysList,
  handleYearInputChange,
  handleMonthInputChange,
}) => {
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
      <div id={id} className="div-form-export"  style={{
            "--start-height": `25vh`,
            "--start-pad": `0 0 .5vh 0`,
          }}>
        <form className="form-export">
          <select onChange={handleYearInputChange}>
            <option value="" disabled selected hidden>
              Selecione o ano
            </option>
            {[2023, 2024, 2025].map((n) => (
              <option value={n} name={n}>
                {n}
              </option>
            ))}
          </select>
          <select onChange={handleMonthInputChange}>
            <option value="" disabled selected hidden>
              Selecione o mês
            </option>
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
          <select ref={refList[0]}>
            <option value="" disabled selected hidden>
              Selecione o dia de inicio busca
            </option>
            {daysList.map((n) => (
              <option name={n}>{n}</option>
            ))}
          </select>
          <select ref={refList[1]}>
            <option value="" disabled selected hidden>
              Selecione o dia do fim da busca
            </option>
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
