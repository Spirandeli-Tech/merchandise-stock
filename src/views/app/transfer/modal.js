import { Form, Formik } from 'formik';
import React from 'react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Input,
  FormGroup,
  Label,
} from 'reactstrap';

const ModalTransfer = ({ isOpen, onClose, data, units }) => {
  console.log(units);
  const unitOptions = units?.map((unit) => ({
    name: unit.name,
    value: unit.id,
  }));

  const initialValues = {
    quantity: parseInt(data?.quantity, 10) || 0,
    name: data?.name || '',
  };

  return (
    <Modal isOpen={isOpen}>
      <Formik initialValues={initialValues}>
        {({ values, handleChange }) => {
          return (
            <Form>
              {console.log(values)}
              <ModalHeader>Transferir</ModalHeader>
              <ModalBody>
                <Label>Produto:</Label>

                <FormGroup>
                  <Input value={values.name} />
                </FormGroup>
                <FormGroup>
                <Label>Quantidade:</Label>
                  <Input
                    id="quantiy"
                    name="quantity"
                    value={values.quantity}
                    onChange={handleChange}
                    type="number"
                  />
                  {values.quantity <= 0 && (
                    <div className="invalid-feedback d-block">
                      Quantidade não pode ser menor ou igual 0
                    </div>
                  )}
                  {values.quantity > parseInt(data.quantity, 10) && (
                    <div className="invalid-feedback d-block">
                      Quantidade não pode ser maior que o disponível
                    </div>
                  )}
                </FormGroup>
                <Label>Transferir para: </Label>
                <FormGroup>
                  <Input
                    id="unit"
                    name="unit"
                    type="select"
                    value={values.unit}
                    onChange={handleChange}
                  >
                    <option disabled value>
                      -- selecione uma unidade--
                    </option>
                    <option hidden selected value>
                      Nome da Unidade
                    </option>
                    {unitOptions?.map((opt) => (
                      <option key={opt.uid} value={opt.value}>
                        {opt.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" outline onClick={onClose}>
                  Fechar
                </Button>
              </ModalFooter>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default ModalTransfer;
