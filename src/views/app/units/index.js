import Empty from 'components/Empty';
import React, { useEffect, useState } from 'react';
import { Card } from 'reactstrap';
import { getAllUnits } from 'services/units';
import DeleteUnit from './deleteUnits';
import UnitForm from './unitForm';

const Units = () => {
  const [openModal, setOpenModal] = useState(false);
  const [units, setUnits] = useState([]);
  const [deleteUnitModal, setDeleteUnitModal] = useState(false);
  const [deleteUnitData, setDeleteUnitData] = useState();
  const [modalData, setModalData] = useState();

  const getUnits = async () => {
    const response = await getAllUnits();
    setUnits(response);
  };

  const setCreationUnit = () => {
    setOpenModal(true);
    setModalData();
  };

  useEffect(() => {
    getUnits();
  }, []);

  const handleEdit = (values) => {
    setOpenModal(true);
    const editUnit = {
      ...values,
      edit: true,
    };
    setModalData(editUnit);
  };

  const handleDelete = (values) => {
    setDeleteUnitModal(true);
    setDeleteUnitData(values);
  };

  const unitsResponse = units?.map((dto) => ({
    name: dto?.name,
    type: dto?.type,
    edit: (
      <div className="icons-row">
        <div
          className="simple-icon-pencil edit-icon icon"
          onClick={() => handleEdit(dto)}
          role="presentation"
        />
        <div
          className="simple-icon-trash edit-icon icon"
          onClick={() => handleDelete(dto)}
          role="presentation"
        />
      </div>
    ),
  }));

  return (
    <>
      <div>
        <div className="table-custom-title">
          <h2 className="PageTitle">Unidades</h2>
          <div className="row">
            <div className="mr-3">
              <button
                type="button"
                className="btn-add btn btn-shadow"
                onClick={setCreationUnit}
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
        <Card className="table-card">
          {unitsResponse.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Tipo de Unidade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {unitsResponse.map((item) => {
                  return (
                    <tr key={item.name}>
                      <td>{item.name}</td>
                      <td>{item.type}</td>
                      <td>{item.edit}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <Empty name="unidade" complement="a" />
          )}
        </Card>

        {openModal ? (
          <UnitForm
            isOpen={openModal}
            unit={modalData}
            onClose={() => setOpenModal(false)}
          />
        ) : (
          <></>
        )}
      </div>
      {deleteUnitModal ? (
        <DeleteUnit
          isOpen={deleteUnitModal}
          data={deleteUnitData}
          onClose={() => setDeleteUnitModal(false)}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Units;
