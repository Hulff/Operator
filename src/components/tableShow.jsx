import React, { useEffect } from "react";
const TableShow = ({ headerName, data }) => {
  useEffect(() => {
    console.log(data);
    console.log(headerName);
  }, [data, headerName]);
  return (
    <>
      <table>
        <thead>
          <tr>
            {headerName.map((n) => (
              <th key={n}>{n}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((a) => (
            <tr>
              {headerName.map((n, index) => (
                <td key={n}>{Object.values(data[parseFloat(a)])[index]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableShow;
