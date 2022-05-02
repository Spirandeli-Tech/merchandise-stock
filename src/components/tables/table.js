import React from 'react';
import { Spinner } from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
import { v4 as uuidv4 } from 'uuid';

import Empty from 'components/Empty';
import DataTablePagination from '../DatatablePagination';

function TableUi({
  columns,
  data,
  defaultPageSize = 8,
  emtpyName,
  loading,
  complement,
  
}) {
  const hasData = data.length > 0;

  const renderColorTag = (cel) => {
    if (cel.column.Header === 'Status' && cel.value === 'Ativo') {
      return { color: '#00CD08' };
    }
    if (cel.column.Header === 'Status' && cel.value === 'Inativo') {
      return { color: 'red' };
    }

    return {};
  };

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
    },
    useSortBy,
    usePagination
  );

  const header = () => (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()} key={uuidv4()}>
          {headerGroup.headers.map((column) => (
            <th
              key={uuidv4()}
              {...column.getHeaderProps(column.getSortByToggleProps())}
            >
              {column.render('Header')}
              { column.isSortedDesc ? <span className='order-icon simple-icon-arrow-down'/> : <span className='order-icon simple-icon-arrow-up'/>}
              <span />
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );

  if (loading) {
    return (
      <>
        <table {...getTableProps()} className="table">
          {header()}
        </table>
        <div className="loading-table">
          <Spinner color="primary" className="mb-1" />
        </div>
      </>
    );
  }
  if (!loading && !hasData) {
    return <Empty name={emtpyName} complement={complement} />;
  }
  return (
    <>
      <table {...getTableProps()} className="table">
        {header()}
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={uuidv4()}>
                {row.cells.map((cell) => (
                  <td
                    key={uuidv4()}
                    {...cell.getCellProps({
                      className: cell.column.cellClass,
                    })}
                    style={renderColorTag(cell)}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {hasData && (
        <DataTablePagination
          page={pageIndex}
          pages={pageCount}
          canPrevious={canPreviousPage}
          canNext={canNextPage}
          pageSizeOptions={[4, 10, 20, 30, 40, 50]}
          showPageSizeOptions={false}
          showPageJump={false}
          defaultPageSize={pageSize}
          onPageChange={(p) => gotoPage(p)}
          onPageSizeChange={(s) => setPageSize(s)}
          paginationMaxSize={pageCount}
        />
      )}
    </>
  );
}

export default TableUi;
