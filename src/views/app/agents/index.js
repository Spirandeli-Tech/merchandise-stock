import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'reactstrap';

import { colsAgents } from 'components/tables/commom';
import TableUi from 'components/tables/table';

import { create, adminRoot } from 'constants/defaultValues';

import { getAllAgents } from 'services/agents';

import DeleteAgent from './deleteAgent';
import AgentModal from './agentModal';

const Agents = () => {
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [agents, setAgents] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [deleteAgentModal, setDeleteAgentModal] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState();

  const createAgents = () => {
    history.push(`${adminRoot}${create}`);
  };

  const getAgents = async () => {
    setLoading(true);
    const agent = await getAllAgents();
    setLoading(false);
    setAgents(agent);
  };

  useEffect(() => {
    getAgents();
  }, []);

  const handleModal = (values) => {
    setIsOpenModal(true);
    setModalData(values);
  };

  const handleEdit = (values) => {
    const editData = {
      ...values,
      edit: true,
    };
    history.push({ pathname: `${adminRoot}${create}`, state: editData });
  };

  const handleDelete = (values) => {
    setDeleteAgentModal(true);
    setDeleteModalData(values);
  };

  const agentsData = agents?.map((dto) => ({
    name: dto?.name,
    email: dto.email,
    phone: dto.phone,
    agencyName: dto.agencyName,
    info: (
      <button
        type="button"
        className="btn color-primary"
        onClick={() =>
          handleModal({
            ...dto,
          })
        }
      >
        Informações
      </button>
    ),
    edit: (
      <div className="icons-row">
        <div
          className="simple-icon-pencil edit-icon icon"
          onClick={() =>
            handleEdit({
              ...dto,
            })
          }
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
          <h2 className="PageTitle">Agentes</h2>
          <div className="row">
            <div className="mr-3">
              <button
                type="button"
                className="btn-add btn btn-shadow"
                onClick={createAgents}
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
        <Card className="table-card">
          <TableUi
            columns={colsAgents}
            data={agentsData ?? []}
            emtpyName="agente"
            loading={isLoading}
          />
        </Card>
        {isOpenModal ? (
          <AgentModal
            isOpen={isOpenModal}
            agentData={modalData}
            onClose={() => setIsOpenModal(false)}
          />
        ) : (
          <></>
        )}
      </div>
      {deleteAgentModal ?<DeleteAgent
        data={deleteModalData}
        onClose={() => setDeleteAgentModal(false)}
        isOpen={deleteAgentModal}
      />: <></>}
    </>
  );
};

export default Agents;
