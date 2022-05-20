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
import {  updateProduct } from 'services/products';

const ModalTransfer = ({ isOpen, onClose, data, units }) => {
  
  function refreshPage() {
    window.location.reload(false);
  }

  const unitOptions = units?.map((unit) => ({
    name: unit.name,
    value: unit.id,
  }));


  const onSubmit = async (values) => {
    const quantityTransfer = Number(values.quantity)
    const quantityRest = Number(data.quantity) - Number(values.quantity)


    const atualizedProduc = {
      ...data,
      quantity: {
        [values.unit]: quantityTransfer,
        [values.atualUnit]: quantityRest,
      }
    }

    await updateProduct(data.id, atualizedProduc)
    onClose();
    await refreshPage()
  }

  const initialValues = {
    quantity: data?.quantity || 0,
    name: data?.name || '',
    atualUnit: data?.unit || ''
  };

  return (
    <Modal isOpen={isOpen}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, handleChange }) => {
          return (
            <Form>
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
              <Button color="primary" type="submit">
                   Transferir
                  </Button>
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
