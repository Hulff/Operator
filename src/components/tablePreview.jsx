import React, { useEffect } from "react";
const TablePreview = ({ headerName, data }) => {
  useEffect(() => {
    console.log(data);
    console.log(headerName);
  }, [data, headerName]);
  return (
    <>
      <table >
        <thead>
          <tr>
            {headerName.map((n) => (
              <th key={n}>{n}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {headerName.map((n, index) => (
              <td key={n}>{Object.values(data)[index]}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TablePreview;
