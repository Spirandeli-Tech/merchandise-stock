import React, { useState } from 'react';
import { Card } from 'reactstrap';
import moment from 'moment';

import TableUi from 'components/tables/table';
import { colUsers } from 'components/tables/commom';
import ExportCSV from 'components/export/exportCsv';

import { FetchAllUsers } from 'redux/queries/FetchAllUsers';
import ModalUser from './modalUser';

const Users = () => {
  const { data, isLoading } = FetchAllUsers();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState();
  const handleDate = (value) => {
    moment(value).format('DD/MM/yyyy');
  };

  const handleModal = (values) => {
    setIsOpenModal(true);
    setModalData(values);
  };

  const people = data?.users?.map((dto) => ({
    name: dto.displayName,
    email: dto.email,
    date: handleDate(dto?.subscription?.date) ?? moment().format('DD/MM/yyyy'),
    admin: (
      <button
        type="button"
        className="btn color-primary "
        onClick={() =>
          handleModal({
            name: dto.displayName,
            email: dto.email,
            phone: dto?.phone || '',
            destinations: dto?.destinations || [],
            id: dto?.uid,
            ...dto,
          })
        }
      >
        Mostrar
      </button>
    ),
  }));

  return (
    <div>
      <div className="table-custom-title">
        <h2 className="PageTitle">Usuários</h2>
        <ExportCSV
          data={people ?? []}
          filename="usuarios.csv"
          btnName="Exportar Tabela"
        />
      </div>
      <Card className="table-card">
        <TableUi
          columns={colUsers}
          data={people ?? []}
          emtpyName="usuário"
          loading={isLoading}
        />
      </Card>
      {isOpenModal ? (
        <ModalUser
          isOpen={isOpenModal}
          userData={modalData}
          onClose={() => setIsOpenModal(false)}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Users;
