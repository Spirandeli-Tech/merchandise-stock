import React from 'react';
import { Card, Modal } from 'reactstrap';

const EmployeeRegister = ({ isOpen, onClose }) => {
  return (
    <Card className="mb-4">
      <Modal isOpen={isOpen} toggle={onClose}>
        <div>modal</div>
      </Modal>
    </Card>
  );
};

export default EmployeeRegister;
