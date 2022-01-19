import React from 'react'

import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

function ExcelExport({ sheetName, style, data }) {

  const camelCase = (str) => {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  };

  const filterColumns = (data) => {
    const columns = Object.keys(data[0]);
    const filterColsByKey = columns.filter(c => c !== 'firstname');
    return filterColsByKey
  };

  return (
    <ExcelFile filename={`DineMate Report ${new Date}`}
      element={<div className="TableButtons TableButtonGreen"
        style={{ width: "100%", ...style, opacity: data && data.length ? '' : 0.5, display: 'flex', flexDirection: 'row' }}>
        <p>Export</p>
        <i
          style={{ margin: '0px 10px' }}
          className={'fa fa-file-excel-o'} />
      </div>}>
      {data && data.length && <ExcelSheet data={data} name={sheetName}>
        {filterColumns(data).map((col) => {
          return <ExcelColumn label={camelCase(col)} value={col} />
        })}
      </ExcelSheet>}
    </ExcelFile>
  )
}

export { ExcelExport }
