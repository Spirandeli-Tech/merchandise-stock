import React from 'react';

const Employee = () => {
  return (
    <div>
      <div className="table-custom-title">
        <h2 className="PageTitle">Funcionários</h2>
        <div className="row">
          <div className="mr-3">
            <button
              type="button"
              className="btn-add btn btn-shadow"
              // onClick={() => handleCreate()}
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
