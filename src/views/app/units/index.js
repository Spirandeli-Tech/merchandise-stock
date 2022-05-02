import React, { useEffect, useState } from 'react';
import { Card } from 'reactstrap';
import { colsUnits } from 'components/tables/commom';
import TableUi from 'components/tables/table';
import { getAllUnits } from 'services/units';
import DeleteUnit from './deleteUnits';
import UnitForm from './unitForm';

const Units = () => {
  const [openModal, setOpenModal] = useState(false);
  const [units, setUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteUnitModal, setDeleteUnitModal] = useState(false);
  const [deleteUnitData, setDeleteUnitData] = useState();
  const [modalData, setModalData] = useState();

  const getUnits = async () => {
    setIsLoading(true);
    const response = await getAllUnits();
    setIsLoading(false);
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
    edit: (
      <div className="icons-row">
        <div
          className="simple-icon-pencil edit-icon icon"
          onClick={() => handleEdit({ ...dto })}
          role="presentation"
        />
        <div
          className="simple-icon-trash edit-icon icon"
          onClick={() => handleDelete({ ...dto })}
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
          <TableUi
            columns={colsUnits}
            data={unitsResponse ?? []}
            emtpyName="unidade"
            loading={isLoading}
          />
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
