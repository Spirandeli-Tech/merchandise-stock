import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { deleteAgent } from 'services/plans';

const DeleteAgent = ({ data, onClose, isOpen }) => {
  function refreshPage() {
    window.location.reload(false);
  }
  const onConfirm = async () => {
    await deleteAgent(data.id, data);
    await refreshPage();
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>Excluir Agente</ModalHeader>
      <ModalBody>Tem certeza que deseja excluir o agente? </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onConfirm}>
          Confirmar
        </Button>
        <Button color="primary" outline onClick={onClose}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteAgent;
