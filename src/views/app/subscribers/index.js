import React from 'react';
import { Card } from 'reactstrap';

import ExportCSV from 'components/export/exportCsv';
import TableUi from 'components/tables/table';
import { colsSubscribers } from 'components/tables/commom';

import { FetchAllUsers } from 'redux/queries/FetchAllUsers';

const Subscribers = () => {
  const { data, isLoading } = FetchAllUsers();

  const subscribers = data?.subscribers.map((dto) => ({
    name: dto.displayName,
    email: dto.email,
    phone: dto.phone,
    plan: dto?.subscription?.plan?.name ?? '',
    status: dto?.subscription.status ? 'Ativo' : 'Inativo',
  }));

  return (
    <div>
      <div className="table-custom-title">
        <h2 className="PageTitle">Assinantes</h2>
        <ExportCSV
            data={subscribers ?? []}
            filename='assinanttes.csv'
            btnName='Exportar Tabela'
          />
      </div>
      <Card className="table-card">
        <TableUi
          columns={colsSubscribers}
          data={subscribers ?? []}
          emtpyName="assinante"
          loading={isLoading}
        />
      </Card>
    </div>
  );
};

export default Subscribers;
