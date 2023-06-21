import React, { useEffect } from "react";
const TableShow = ({ headerName, data, month, year, setRef, tableMode }) => {
  useEffect(() => {
    console.log(data);
    console.log(headerName);
  }, [data, headerName]);
  return (
    <>
      <table ref={setRef}>
        <thead>
          <tr>
            {headerName.map((n) => (
              <th key={n}>{n}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data ? (
            <>
              {tableMode ? (
                <>
                  {Object.keys(data).map((n) => (
                    <React.Fragment key={n}>
                      <tr>
                        <td rowSpan={Object.keys(data[n]).length + 1}>
                          {`${n}/${month}/${year}`}
                        </td>
                      </tr>
                      {Object.keys(data[n]).map((m) => (
                        <tr key={m}>
                          <td>{m}</td>
                          <td>{data[n][m].data.nDeCabines}</td>
                          <td>{data[n][m].data.velocidade}</td>
                          <td>{data[n][m].data.ventoNaTorre10}</td>
                          <td>{data[n][m].data.CarroTensor1}</td>
                          <td>{data[n][m].data.CarroTensor2}</td>
                          <td>{data[n][m].data.CarroTensor1Pressao}</td>
                          <td>{data[n][m].data.CarroTensor2Pressao}</td>
                          <td>{data[n][m].data.pressaoEmergencia}</td>
                          <td>{data[n][m].data.pressaoServiço}</td>
                          <td>{data[n][m].data.posiçãoDoCarro}</td>
                          <td>{data[n][m].data.temperaturaAmbiente}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <>
                  <tr>
                    <td>{data.data.OprPassaegeiroViagem}</td>
                    <td>{data.data.OprPassaegeiroViagem}</td>
                    <td>{data.data.SistemaParado}</td>
                    <td>{data.data.SistemaViagem}</td>
                  </tr>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableShow;
