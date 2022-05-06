import React, { useState } from 'react';
import EmployeeRegister from './EmployeeRegister';

const Employee = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  
  const handleCreate = () => {
    setIsOpenModal(true)
  }

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
      <EmployeeRegister isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}/>
    </div>
  );
};

export default Employee;
