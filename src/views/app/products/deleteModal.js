import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { deleteProduct } from 'services/products';

const DeleteProduct = ({ productData, onClose, isOpen }) => {
  function refreshPage() {
    window.location.reload(false);
  }
  console.log(productData)
  const onConfirm = async () => {
    await deleteProduct(productData.uid, productData);
    await refreshPage();
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>Excluir Produto</ModalHeader>
      <ModalBody>Tem certeza que deseja excluir o produto? </ModalBody>
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

export default DeleteProduct;
