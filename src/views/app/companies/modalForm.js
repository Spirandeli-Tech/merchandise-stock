import React from 'react';
import {
  Card,
  Button,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from 'reactstrap';
import { Formik, Form } from 'formik';
import 'yup-phone';
import moment from 'moment';

import { registerWithEmailPasswordAsync } from 'services/register';
import { addCompanie } from 'services/companies';
import { validationSchema } from './utils';

const ModalForm = ({ isOpen, onClose }) => {
  function refreshPage() {
    window.location.reload(false);
  }

  const onSubmit = async (values) => {
    const response = {
      ...values,
      role: 'business',
      password: '123456',
      createdAt: moment().format('DD/MM/YYYY'),
    };
    const password = '123456';
    const { email } = values;

    const { user } = await registerWithEmailPasswordAsync(email, password);
    if (user) {
      await addCompanie(response, user);
      onClose();
      await refreshPage();
    } else {
      alert('Não foi possível cadastrar essa empresa. Tente novamente');
    }
  };

  const initialFormValues = {
    displayName: '',
    email: '',
    phone: '',
    owner: '',
  };

  return (
    <Card className="mb-4">
      <Modal isOpen={isOpen} toggle={onClose}>
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnChange={false}
        >
          {({ handleChange, values, errors, touched, setFieldTouched }) => (
            <Form>
              <ModalHeader>Adicionar Empresa</ModalHeader>
              <ModalBody>
                <FormGroup className="mr-2">
                  <Label>Nome {errors.displayName && '*'}</Label>
                  <Input
                    id="displayName"
                    name="displayName"
                    placeholder="Ex: Lazertur"
                    onChange={handleChange}
                    value={values.displayName}
                    onBlur={setFieldTouched}
                  />
                  {errors.displayName && touched.displayName ? (
                    <div className="invalid-feedback d-block">
                      {errors.displayName}
                    </div>
                  ) : null}
                </FormGroup>
                <FormGroup>
                  <Label>Email {errors.email && '*'}</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Email Obrigatório"
                    onChange={handleChange}
                    type="name"
                    value={values.email}
                    onBlur={setFieldTouched}
                  />
                  {errors.email && touched.email ? (
                    <div className="invalid-feedback d-block">
                      {errors.email}
                    </div>
                  ) : null}
                </FormGroup>
                <FormGroup>
                  <Label>Telefone {errors.phone && '*'}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Ex.: (11) 99875-1532"
                    onChange={handleChange}
                    value={values.phone}
                    onBlur={setFieldTouched}
                    type="tel"
                  />
                  {errors.phone && touched.phone ? (
                    <div className="invalid-feedback d-block">
                      {errors.phone}
                    </div>
                  ) : null}
                </FormGroup>
                <FormGroup>
                  <Label>
                    Responsável
                    {errors.owner && '*'}
                  </Label>
                  <Input
                    id="owner"
                    name="owner"
                    placeholder="-"
                    onChange={handleChange}
                    value={values.owner}
                    onBlur={setFieldTouched}
                  />
                  {errors.owner && touched.owner ? (
                    <div className="invalid-feedback d-block">
                      {errors.owner}
                    </div>
                  ) : null}
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit">
                  Adicionar
                </Button>
                <Button color="primary" outline onClick={onClose}>
                  Fechar
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>
    </Card>
  );
};

export default ModalForm;
