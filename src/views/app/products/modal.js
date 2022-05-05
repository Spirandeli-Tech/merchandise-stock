import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  ModalFooter,
  Button,
} from 'reactstrap';

const ProductModal = ({ isOpen, productData, onClose }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>Informações do Produto</ModalHeader>
      <ModalBody>
        <div className="grid-modal-agent">
          <div className='mb-5'>
            <img className='img-modal' src={productData.photo} alt=''/>
          </div>
          <div className="mb-5">
            <h6>Nome</h6>
            <Label>{productData?.name}</Label>
          </div>
          <div className="mb-5">
            <h6>Unidade</h6>
            <Label>{productData?.unit}</Label>
          </div>
          <div className="mb-5">
            <h6>Sell In</h6>
            <Label>{productData?.sellInValue}</Label>
          </div>
          <div className="mb-5">
            <h6>Sell Out</h6>
            <Label>{productData?.sellOutValue}</Label>
          </div>
          <div className="mb-5">
            <h6>Quantidade</h6>
            <Label>{productData?.quantidade || '-'}</Label>
          </div>
          <div className="mb-5">
            <h6>Peso</h6>
            <Label>{productData?.weight || '-'}</Label>
          </div>
          <div className="mb-5">
            <h6>Tipo</h6>
            <Label>{productData?.type || '-'}</Label>
          </div>
          <div className="mb-5">
            <h6>Observação</h6>
            <Label>{productData?.observation || '-'}</Label>
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

export default ProductModal;
