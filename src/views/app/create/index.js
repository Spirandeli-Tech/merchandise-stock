import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { adminRoot } from 'constants/defaultValues';
import { Button } from 'reactstrap';
import AgentForm from './form';
import { getAllCompanies } from '../../../services/users';

const Create = () => {
  const history = useHistory();
  const [selectData, setSelectData] = useState([]);

  const handleCancel = () => {
    history.push(`${adminRoot}/agents`);
  };

  const getCompanies = async () => {
    const companies = await getAllCompanies();
    const data = companies.map((opt) => ({
      name: opt.displayName,
      value: opt.displayName,
    }));
    setSelectData(data);
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div>
      <div className="table-custom-title">
        <h2 className="PageTitle">Agentes</h2>
        <div className="mr-3">
          <Button
            color="primary"
            className="confirmButton"
            onClick={handleCancel}
            outline
          >
            Voltar
          </Button>
        </div>
      </div>
      <AgentForm
        selectOptions={selectData ?? []}
        onCreateRoute={handleCancel}
      />
    </div>
  );
};

export default Create;
