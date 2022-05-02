import { Formik, Form} from 'formik';
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
} from 'reactstrap';
import { addUnit, updateUnit } from 'services/units';
import * as Yup from 'yup';

const UnitForm = ({ isOpen, onClose, unit }) => {
  function refreshPage() {
    window.location.reload(false);
  }

  const onSubmit = async(values) => {
    const response = {
      ...values,
    }

    if (unit?.edit) {
      await updateUnit(unit.id, response);
    } else {
      await addUnit(response);
    }
    onClose();
    refreshPage()
  };

  const initialFormValues = {
    name: unit?.name || '',
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
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit">
                    Criar
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
