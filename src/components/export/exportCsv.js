import React from 'react';
import { CSVLink } from 'react-csv';

const ExportCSV = ({ filename, data, btnName }) => (
  <CSVLink data={data} filename={filename} className="btn btn-add btn-sm">
    {btnName}
  </CSVLink>
);

export default ExportCSV;
