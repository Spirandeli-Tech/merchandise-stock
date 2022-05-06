import Empty from 'components/Empty';
import React, { useEffect, useState } from 'react';
import { Card } from 'reactstrap';
import { getAllUnits } from 'services/units';
import { deleteUser, getAllUsers } from 'services/users';
import EmployeeRegister from './EmployeeRegister';

const Employee = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [user, setUsers] = useState();
  const [units, setUnits] = useState();
  const [selectUnit, setSelectUnit] = useState();
  const [userEdit, setUserEdit] = useState();
  
  function refreshPage() {
    window.location.reload(false);
  }

  const getUnits = async () => {
    const data = await getAllUnits();
    setUnits(data);
    const filterUnits = data.map((opt) => ({
      name: opt.name,
      value: opt.uid,
    }));
    setSelectUnit(filterUnits);
  };

  const getUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };
  const handleCreate = () => {
    setIsOpenModal(true);
    setUserEdit([]);
  };

  useEffect(() => {
    getUsers();
    getUnits();
  }, []);

  const handleEdit = (values) => {
    setIsOpenModal(true);
    setUserEdit({
      ...values,
      edit: true,
    });
  };

  const handleDelete = (values) => {
    deleteUser(values.uid, values)
    refreshPage()
  };

  return (
    <div>
      <div className="table-custom-title">
        <h2 className="PageTitle">Funcionários</h2>
        <div className="row">
          <div className="mr-3">
            <button
              type="button"
              className="btn-add btn btn-shadow"
              onClick={() => handleCreate()}
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
      <Card className="table-card">
        {user?.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Unidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {user.map((opt) => (
                <tr key={opt?.id}>
                  <td key={opt.email}>{opt?.email}</td>
                  <td key={opt.id}>
                    {units?.map((item) =>
                      item.id === opt.unit ? item.name : ''
                    )}
                  </td>
                  <td>
                    <div className="icons-row">
                      <div
                        className="simple-icon-pencil edit-icon icon"
                        onClick={() => handleEdit(opt)}
                        role="presentation"
                      />
                      <div
                        className="simple-icon-trash edit-icon icon"
                        onClick={() => handleDelete(opt)}
                        role="presentation"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Empty name="unidade" complement="a" />
        )}
      </Card>

      <EmployeeRegister
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        selectOptions={selectUnit}
        userData={userEdit}
      />
    </div>
  );
};

export default Employee;
