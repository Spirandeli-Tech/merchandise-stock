import { Form, Formik } from 'formik';
import { getCurrentUser } from 'helpers/Utils';
import React from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import { validationSchema } from './utils';
import {updateUser} from '../../../services/users'

const ProfileData = () => {
  const data = getCurrentUser();
  const { address } = data;
  
  function refreshPage() {
    window.location.reload(false);
  }

  const onSubmit = async (values) => {
    const response = {
      ...data,
      ...data.address = {
        street: values.street,
        distric: values.distric,
        number: values.number,
        state: values.state,
        city: values.city
      },
      displayName: values.name,
      email: values.email,
      document: values.document,
      phone: values.phone,

    }
    await updateUser(data.uid, response)
    await localStorage.setItem('current_user', JSON.stringify(response))
    await refreshPage();
  }

  const initialvalues = {
    name: data?.displayName || data?.name || '',
    email: data?.email || '',
    document: data?.document || '',
    phone: data?.phone || '',
    cep: address?.cep || '',
    street: address?.street || '',
    number: address?.number || '',
    distric: address?.distric || '',
    city: address?.city || '',
    state: address?.state || '',
    complement: address?.complement || '',
  };

  const handlePhone = async (event, setFieldValue) => {
    let phone = event.target.value.replace(/\D/g, '');
    phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2');
    phone = phone.replace(/(\d)(\d{4})$/, '$1-$2');
    setFieldValue('phone', phone);
  };

  const handleCep = async (event, setFieldValue) => {
    let cep = event.target.value.replace(/\D/g, '');
    cep = cep.replace(/(\d)(\d{3})$/, '$1-$2');
    setFieldValue('cep', cep);
  };

  return (
    <div className="profile-card">
      <Formik
        initialValues={initialvalues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, resetForm, dirty, setFieldValue }) => {
          return (
            <Form>
              <div className="profile-row">
                <FormGroup className="mr-2">
                  <div className="profile-item">
                    <Label>Nome Completo</Label>
                    <Input
                      id="name"
                      className="profile-text"
                      value={values.name}
                      onChange={(e) => setFieldValue('name', e.target.value)}
                    />
                    {errors.name && touched.name ? (
                      <div className="invalid-feedback d-block">
                        {errors.name}
                      </div>
                    ) : null}
                  </div>
                </FormGroup>
                <div className="profile-item">
                  <FormGroup>
                    <Label>E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      className="profile-text"
                      value={values.email}
                      onChange={(e) => setFieldValue('email', e.target.value)}
                    />
                    {errors.email && touched.email ? (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    ) : null}
                  </FormGroup>
                </div>
              </div>
              <div className="profile-row">
                <div className="profile-item">
                  <Label>CPF/CNPJ</Label>
                  <Input
                    id="document"
                    className="profile-text"
                    disabled
                    value={values.document}
                  />
                </div>
                <div className="profile-item">
                  <FormGroup>
                    <Label>Telefone</Label>
                    <Input
                      id="phone"
                      className="profile-text"
                      maxLength="15"
                      value={values.phone}
                      onChange={(e) => handlePhone(e, setFieldValue)}
                    />
                    {errors.phone && touched.phone ? (
                      <div className="invalid-feedback d-block">
                        {errors.phone}
                      </div>
                    ) : null}
                  </FormGroup>
                </div>
              </div>
              <hr />
              <div className="profile-row">
                <div className="profile-item">
                  <FormGroup>
                    <Label>CEP</Label>
                    <Input
                      id="cep"
                      className="profile-text"
                      value={values.cep}
                      maxLength="9"
                      onChange={(e) => handleCep(e, setFieldValue)}
                    />
                    {errors.cep && touched.cep ? (
                      <div className="invalid-feedback d-block">
                        {errors.cep}
                      </div>
                    ) : null}
                  </FormGroup>
                </div>
                <div className="profile-item">
                  <FormGroup>
                    <Label>Endereço</Label>
                    <Input
                      id="street"
                      className="profile-text"
                      value={values.street}
                      onChange={(e) => setFieldValue('street', e.target.value)}
                    />
                    {errors.street && touched.street ? (
                      <div className="invalid-feedback d-block">
                        {errors.street}
                      </div>
                    ) : null}
                  </FormGroup>
                </div>
              </div>
              <div className="profile-row">
                <div className="profile-item">
                  <FormGroup>
                    <Label>Número</Label>
                    <Input
                      id="number"
                      className="profile-text"
                      type="number"
                      value={values.number}
                      onChange={(e) => setFieldValue('number', e.target.value)}
                    />
                    {errors.number && touched.number ? (
                      <div className="invalid-feedback d-block">
                        {errors.number}
                      </div>
                    ) : null}
                  </FormGroup>
                </div>
                <div className="profile-item">
                  <FormGroup>
                    <Label>Bairro</Label>
                    <Input
                      id="distric"
                      className="profile-text"
                      value={values.distric}
                      onChange={(e) => setFieldValue('distric', e.target.value)}
                    />
                    {errors.distric && touched.distric ? (
                      <div className="invalid-feedback d-block">
                        {errors.distric}
                      </div>
                    ) : null}
                  </FormGroup>
                </div>
              </div>
              <div className="profile-row">
                <div className="profile-item">
                  <FormGroup>
                    <Label>Cidade</Label>
                    <Input
                      id="city"
                      className="profile-text"
                      value={values.city}
                      onChange={(e) => setFieldValue('city', e.target.value)}
                    />
                    {errors.city && touched.city ? (
                      <div className="invalid-feedback d-block">
                        {errors.city}
                      </div>
                    ) : null}
                  </FormGroup>
                </div>
                <div className="profile-item">
                  <FormGroup>
                    <Label>Estado/UF</Label>
                    <Input
                      id="state"
                      className="profile-text"
                      value={values.state}
                      onChange={(e) => setFieldValue('state', e.target.value)}
                    />
                    {errors.state && touched.state ? (
                      <div className="invalid-feedback d-block">
                        {errors.state}
                      </div>
                    ) : null}
                  </FormGroup>
                </div>
              </div>
              <div>
                <Label>Complemento</Label>
                <Input
                  id="complement"
                  className="profile-text"
                  value={values.complement}
                  onChange={(e) => setFieldValue('complement', e.target.value)}
                />
              </div>
              {touched && dirty && (
                <div className="confirm-row">
                  <Button
                    color="primary"
                    outline
                    onClick={resetForm}
                    className="button"
                  >
                    Cancelar
                  </Button>
                  <Button color="primary" type="submit">
                    Salvar Alterações
                  </Button>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ProfileData;
