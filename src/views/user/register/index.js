import React, { useState } from 'react';
import {
  Row,
  Card,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { fetchRegister } from 'services/authentication';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { UserRole, adminRoot } from 'constants/defaultValues';
import { NotificationManager } from 'components/common/react-notifications';

import { formValidation } from './register.helper';

const Register = ({ history }) => {
  const [form, setForm] = useState({});

  const onUserRegister = async () => {
    const { error, errorMessage = '' } = formValidation(form);
    if (error) {
      NotificationManager.error(
        errorMessage,
        'Erro ao criar uma conta',
        4000,
        null,
        null,
        ''
      );
    } else {
      const body = {
        ...form,
        role: UserRole.admin,
        createdAt: new Date().toISOString(),
      };
      const { error: fetchRegisterError } = await fetchRegister(body);
      if (!fetchRegisterError) {
        NotificationManager.success(
          'Parabéns sua conta foi criada com sucesso',
          'Conta criada',
          4000,
          null,
          null,
          ''
        );
        history.push(adminRoot);
      }
    }
  };

  const formHandler = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side " />
          <div className="form-side">
            <CardTitle className="mb-4">Registrar-se</CardTitle>
            <Form>
              <div className="d-flex justify-content-between align-items-center w-100">
                <FormGroup className="form-group has-float-label pr-2 w-50 mb-4">
                  <Label>Nome</Label>
                  <Input type="text" name="firstName" onChange={formHandler} />
                </FormGroup>
                <FormGroup className="form-group has-float-label w-50 mb-4">
                  <Label>Sobrenome</Label>
                  <Input type="name" name="lastName" onChange={formHandler} />
                </FormGroup>
              </div>
              <FormGroup className="form-group has-float-label mb-4">
                <Label>
                  <IntlMessages id="user.email" />
                </Label>
                <Input type="email" name="email" onChange={formHandler} />
              </FormGroup>

              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="user.password" />
                </Label>
                <Input type="password" name="password" onChange={formHandler} />
              </FormGroup>
              <hr />
              <FormGroup className="form-group has-float-label  mb-4">
                <Label>CNPJ</Label>
                <Input name="cnpj" onChange={formHandler} />
              </FormGroup>
              <FormGroup className="form-group has-float-label  mb-4">
                <Label>Razão Social</Label>
                <Input name="razaoSocial" onChange={formHandler} />
              </FormGroup>
              <div className="d-flex justify-content-between align-items-center">
                <NavLink to="/user/login">
                  <p className="m-0">Ir para Login</p>
                </NavLink>
                <div className="d-flex justify-content-end align-items-center">
                  <Button
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                    onClick={() => onUserRegister()}
                  >
                    REGISTRAR
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};

export default Register;
