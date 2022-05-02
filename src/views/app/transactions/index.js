import React, { useEffect, useState } from 'react';
import { Card } from 'reactstrap';

import TableUi from 'components/tables/table';
import { colTransactions } from 'components/tables/commom';

import { getAllPayments } from 'services/payments';
import handleResponse from './utils';

const Transactions = () => {
  const [isLoading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);

  const getPayments = async () => {
    setLoading(true);
    const response = await getAllPayments();
    setLoading(false);
    setPayments(response);
  };

  useEffect(() => {
    getPayments();
  }, []);
  
  const PAYMENTS_DATA = handleResponse(payments)

  return (
    <div>
      <div className="table-custom-title">
        <h2 className="PageTitle">Transações</h2>
      </div>
      <Card className="table-card">
        <TableUi
          columns={colTransactions}
          data={PAYMENTS_DATA ?? []}
          emtpyName="transação"
          complement="a"
          loading={isLoading}
        />
      </Card>
    </div>
  );
};

export default Transactions;
