import { Form, Formik } from 'formik';
import React from 'react';
import {
  Button,
  Card,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { registerWithEmailPasswordAsync } from 'services/authentication';
import { addUser, updateUser } from 'services/users';
import { validationSchema } from './utils';

const EmployeeRegister = ({ isOpen, onClose, userData, selectOptions }) => {
  function refreshPage() {
    window.location.reload(false);
  }

  const role = [
    { name: 'adminstrador', value: 'admin' },
    { name: 'funcionário', value: 'employee' },
  ];

  const onSubmit = async (values) => {
    const response = {
      ...values,
    };
    if (userData?.edit) {
      await updateUser(userData.uid, response);
      await refreshPage();
    } else {
      const { user } = await registerWithEmailPasswordAsync(
        values.email,
        values.password
      );
      if (user) {
        await addUser({ ...response, uid: user?.uid });
        onClose();
        await refreshPage();
      } else {
        alert('Não foi possível cadastrar o usuário. Tente novamente');
      }
    }
  };

  const initialValues = {
    email: userData?.email || '',
    unit: userData?.unit || '',
    password: userData?.password || '',
    role: userData?.role || '',
  };

  return (
    <Card className="mb-4">
      <Modal isOpen={isOpen} toggle={onClose}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <ModalHeader>Cadastro</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label>Email{errors.email && '*'}</Label>
                  <Input
                    id="email"
                    className="padding background"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && touched.email ? (
                    <div className="invalid-feedback d-block">
                      {errors.email}
                    </div>
                  ) : null}
                </FormGroup>
                <FormGroup>
                  <Label>Unidade{errors.unit && '*'}</Label>
                  <Input
                    id="unit"
                    className="padding background"
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
                    {selectOptions?.map((opt) => (
                      <option key={opt.uid} value={opt.value}>
                        {opt.name}
                      </option>
                    ))}
                  </Input>
                  {errors.unit && touched.unit ? (
                    <div className="invalid-feedback d-block">
                      {errors.unit}
                    </div>
                  ) : null}
                </FormGroup>
                <FormGroup>
                  <Label>Senha{errors.password && '*'}</Label>
                  <Input
                    id="password"
                    className="padding background"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {errors.password && touched.password ? (
                    <div className="invalid-feedback d-block">
                      {errors.password}
                    </div>
                  ) : null}
                </FormGroup>
                <FormGroup>
                  <Label>Role{errors.role && '*'}</Label>
                  <Input
                    id="role"
                    className="padding background"
                    type="select"
                    value={values.role}
                    onChange={handleChange}
                  >
                    {role?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.name}
                      </option>
                    ))}
                  </Input>
                  {errors.role && touched.role ? (
                    <div className="invalid-feedback d-block">
                      {errors.role}
                    </div>
                  ) : null}
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit">
                  {userData?.edit ? 'Atualizar' : 'Adicionar'}
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

export default EmployeeRegister;
