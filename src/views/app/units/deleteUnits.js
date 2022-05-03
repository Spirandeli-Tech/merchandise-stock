import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { deleteUnit } from 'services/units';

const DeleteUnit = ({ data, onClose, isOpen }) => {
  function refreshPage() {
    window.location.reload(false);
  }
  const onConfirm = async () => {
    await deleteUnit(data.id, data);
    await refreshPage();
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>Excluir Unidade</ModalHeader>
      <ModalBody>Tem certeza que deseja excluir a unidade? </ModalBody>
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

export default DeleteUnit;
