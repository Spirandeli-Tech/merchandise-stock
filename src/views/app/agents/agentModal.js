import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  ModalFooter,
  Button,
} from 'reactstrap';

const AgentModal = ({ isOpen, agentData, onClose }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>Informações do Agente</ModalHeader>
      <ModalBody>
        <div className="grid-modal-agent">
          <div className="mb-5">
            <h6>Nome</h6>
            <Label>{agentData.name}</Label>
          </div>
          <div className="mb-5">
            <h6>Email</h6>
            <Label>{agentData.email}</Label>
          </div>
          <div className="mb-5">
            <h6>Telefone</h6>
            <Label>{agentData.phone}</Label>
          </div>

          <div className="mb-5">
            <h6>Cidade</h6>
            <Label>{agentData.city}</Label>
          </div>
          <div className="mb-5">
            <h6>Bairro</h6>
            <Label>{agentData.distric}</Label>
          </div>
          <div className="mb-5">
            <h6>Estado</h6>
            <Label>{agentData.state}</Label>
          </div>
          <div className="mb-5">
            <h6>Cep</h6>
            <Label>{agentData.cep}</Label>
          </div>
          <div className="mb-5">
            <h6>Endereço</h6>
            <Label>{agentData.address}</Label>
          </div>
          <div className="mb-5">
            <h6>Agência</h6>
            <Label>{agentData.agencyName}</Label>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" outline onClick={onClose}>
          Fechar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AgentModal;
