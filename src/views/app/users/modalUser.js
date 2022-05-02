import React, { useState } from 'react';
import {
  Modal,
  ModalFooter,
  Button,
  ModalBody,
  Label,
  ModalHeader,
} from 'reactstrap';
import { updateUser } from 'services/users';

const ModalUser = ({ isOpen, userData, onClose }) => {
  const [isConfirmation, setIsConfirmation] = useState(false);
  function refreshPage() {
    window.location.reload(false);
  }

  const handleConfirm = () => {
    setIsConfirmation(true);
  };

  const onConfirm = async () => {
    const response = {
      ...userData,
      role: 'Admin',
    };
    await updateUser(userData.id, response);
    onClose();
    await refreshPage();
  };

  return (
    <Modal isOpen={isOpen}>
      {!isConfirmation ? (
        <>
          <ModalHeader>Informações deste usuário</ModalHeader>
          <ModalBody>
            <div className="grid-modal-user">
              <div className="mb-5">
                <h6>Nome</h6>
                <Label className="modal-item">
                  {userData.name || 'Não informado'}
                </Label>
              </div>
              <div className="mb-5">
                <h6>Email</h6>
                <Label className="modal-item">
                  {userData.email || 'Não informado'}
                </Label>
              </div>
              <div>
                <h6>Telefone</h6>
                <Label className="modal-item">
                  {userData.phone || 'Não informado'}
                </Label>
              </div>
              <div>
                <h6>Destinos</h6>
                <Label>
                  {userData.destinations.length
                    ? userData.destinations.map((dest) => (
                        <div key={dest.name} className="modal-item">
                          • {dest.name}
                        </div>
                      ))
                    : 'Nenhum destino Cadastrado'}
                </Label>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleConfirm}>
              Tornar Usuário Admin
            </Button>
            <Button color="primary" outline onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </>
      ) : (
        <>
          <ModalHeader>Tornar Administrador</ModalHeader>
          <ModalBody>
            <h6>
              Tem certeza que deseja tornar <b>{userData.name}</b> um usuário
              Administrador?
            </h6>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={onConfirm}>
              Confirmar
            </Button>
            <Button color="primary" outline onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </>
      )}
    </Modal>
  );
};

export default ModalUser;
