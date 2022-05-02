import React, { useState, useEffect } from 'react';
import { Card } from 'reactstrap';

import TableUi from 'components/tables/table';
import { colsCompanies } from 'components/tables/commom';
import ExportCSV from 'components/export/exportCsv';
import ModalForm from './modalForm';

import { getAllCompanies } from '../../../services/users';

const Companies = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);

  const getCompanies = async () => {
    setLoading(true);
    const companies = await getAllCompanies();
    setLoading(false);
    setDocuments(companies);
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div>
      <div className="table-custom-title">
        <h2 className="PageTitle">Empresas</h2>
        <div className='row'>
          <div className='mr-3'>
            <button
              type='button'
              className="btn-add btn btn-shadow"
              onClick={() => setModalOpen(true)}
            >
              Adicionar
            </button>
          </div>
          <ExportCSV
            data={documents}
            filename='empresas.csv'
            btnName='Exportar Tabela'
          />
        </div>
      </div>
      <Card className="table-card">
        <TableUi
          columns={colsCompanies}
          data={documents ?? []}
          emtpyName="empresa"
          complement="a"
          loading={isLoading}
        />
      </Card>
      <ModalForm isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Companies;
