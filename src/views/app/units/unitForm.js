import { Formik, Form } from 'formik';
import React from 'react';
import {
  Card,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  FormGroup
} from 'reactstrap';
import { addUnit, updateUnit } from 'services/units';
import * as Yup from 'yup';

const UnitForm = ({ isOpen, onClose, unit }) => {
  function refreshPage() {
    window.location.reload(false);
  }

  const typeOptions = [
    {
      name: 'Depósito',
      value: 'deposit',
    },
    {
      name: 'Unidade de Venda',
      value: 'unit', 
    }
  ];

  const onSubmit = async (values) => {
    const response = {
      ...values,
    };

    if (unit?.edit) {
      await updateUnit(unit.id, response);
    } else {
      await addUnit(response);
    }
    onClose();
    refreshPage();
  };

  const initialFormValues = {
    name: unit?.name || '',
    type: unit?.type || ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome obrigatório'),

  });

  return (
    <Card className="mb-4">
      <Modal isOpen={isOpen}>
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, handleChange, touched }) => {
            return (
              <Form>
                <ModalHeader>Adicionar Unidade</ModalHeader>
                <ModalBody>
                <FormGroup>
                  <Label>Nome {errors.name && '*'}</Label>
                  <Input
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                  {errors.name && touched.name ? (
                    <div className="invalid-feedback d-block">
                      {errors.name}
                    </div>
                  ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Label>Tipo {errors.type && '*'}</Label>
                    <Input
                      id="type"
                      name="type"
                      type="select"
                      value={values.type}
                      onChange={handleChange}
                    >
                      <option disabled value>
                        -- selecione um tipo--
                      </option>
                      <option hidden selected value>
                        -
                      </option>
                      {typeOptions?.map((opt) => (
                        <option key={opt.name} value={opt.name}>
                          {opt.name}
                        </option>
                      ))}
                    </Input>
                    {errors.type && touched.type ? (
                      <div className="invalid-feedback d-block">
                        {errors.type}
                      </div>
                    ) : null}
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit">
                    {unit?.edit ? 'Atualizar' : 'Criar'}
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
    </Card>
  );
};

export default UnitForm;
