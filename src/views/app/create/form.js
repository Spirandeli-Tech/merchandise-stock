import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button, FormGroup, Input } from 'reactstrap';

import { Form, Formik } from 'formik';
import { addAgent, updateAgent } from 'services/agents';
import { registerWithEmailPasswordAsync } from 'services/register';
import { formatCPF, handleCep, handlePhone } from 'assets/utils/validations';
import { validationSchema } from './utils';

const AgentForm = ({ selectOptions, onCreateRoute }) => {
  const location = useLocation();
  const editData = (location && location.state) || [];


  const onSubmit = async (values) => {
    const response = {
      ...values,
    };

    if (editData.edit) {
      await updateAgent(editData.id, response);
    } else {
      const password = '123456'
      await registerWithEmailPasswordAsync(values.email, password)
      await addAgent({
        ...response,
        role: 'agent',
        password: '123456',
      });
    }
    onCreateRoute();
  };

  const initialValues = {
    name: editData?.name || '',
    document: editData?.document || '',
    email: editData?.email || '',
    phone: editData?.phone || '',
    state: editData?.state || '',
    cep: editData?.cep || '',
    city: editData?.city || '',
    distric: editData?.distric || '',
    address: editData?.address || '',
    number: editData?.number || '',
    complement: editData?.complement || '',
    agencyName: editData?.agencyName || '',
  };

  return (
    <div className="Card">
      <div className="Header">
        <h2>Cadastro de Agente</h2>
      </div>
      <p className="subtitle">Dados do Agente</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleReset,
          setFieldValue,
          handleBlur,
        }) => (
          <Form>
            <FormGroup>
              <div className="FirstRow">
                <FormGroup>
                  <Input
                    id="name"
                    placeholder="Nome"
                    className="padding background"
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
                  <Input
                    id="document"
                    placeholder="CPF"
                    className="padding background"
                    maxLength="11"
                    disabled={editData.edit}
                    value={values.document}
                    onChange={(e) => formatCPF(e, setFieldValue)}
                  />
                  {errors.document && touched.document ? (
                    <div className="invalid-feedback d-block">
                      {errors.document}
                    </div>
                  ) : null}
                </FormGroup>
                <FormGroup>
                  <Input
                    id="email"
                    placeholder="Email"
                    type="email"
                    className="padding background"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && touched.email ? (
                    <div className="invalid-feedback d-block">
                      {errors.email}
                    </div>
                  ) : null}
                </FormGroup>
              </div>
            </FormGroup>
            <FormGroup>
              <div className="SecondRow">
                <FormGroup>
                  <Input
                    id="phone"
                    placeholder="Telefone"
                    className="padding background"
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
                <FormGroup>
                  <Input
                    id="cep"
                    placeholder="CEP"
                    value={values.cep}
                    maxLength="9"
                    className="padding background"
                    onChange={(e) => handleCep(e, setFieldValue)}
                  />
                  {errors.cep && touched.cep ? (
                    <div className="invalid-feedback d-block">{errors.cep}</div>
                  ) : null}
                </FormGroup>
                <FormGroup>
                  <Input
                    id="state"
                    placeholder="Estado"
                    className="padding background"
                    value={values.state}
                    onChange={handleChange}
                  />
                  {errors.state && touched.state ? (
                    <div className="invalid-feedback d-block">
                      {errors.state}
                    </div>
                  ) : null}
                </FormGroup>
                <FormGroup>
                  <Input
                    id="city"
                    placeholder="Cidade"
                    className="padding background"
                    value={values.city}
                    onChange={handleChange}
                  />
                  {errors.city && touched.city ? (
                    <div className="invalid-feedback d-block">
                      {errors.city}
                    </div>
                  ) : null}
                </FormGroup>
              </div>
            </FormGroup>
            <FormGroup>
              <div className="thirdRow">
                <FormGroup>
                  <Input
                    id="distric"
                    placeholder="Bairro"
                    className="padding background"
                    value={values.distric}
                    onChange={handleChange}
                  />
                  {errors.distric && touched.distric ? (
                    <div className="invalid-feedback d-block">
                      {errors.distric}
                    </div>
                  ) : null}
                </FormGroup>
                <FormGroup>
                  <Input
                    id="address"
                    placeholder="Endereço"
                    className="padding background"
                    value={values.address}
                    onChange={handleChange}
                  />
                  {errors.address && touched.address ? (
                    <div className="invalid-feedback d-block">
                      {errors.address}
                    </div>
                  ) : null}
                </FormGroup>
                <FormGroup>
                  <Input
                    id="number"
                    placeholder="N°"
                    className="padding background"
                    value={values.number}
                    onChange={handleChange}
                  />
                  {errors.number && touched.number ? (
                    <div className="invalid-feedback d-block">
                      {errors.number}
                    </div>
                  ) : null}
                </FormGroup>
              </div>
            </FormGroup>
            <FormGroup>
              <div className="lastRow">
                <Input
                  id="complement"
                  placeholder="Complemento"
                  className="padding background"
                  value={values.complement}
                  onChange={handleChange}
                />
              </div>
            </FormGroup>
            <p className="subtitle">Trabalha em qual agência? </p>
            <div className="agencyRow">
              <FormGroup>
                <Input
                  id="agencyName"
                  placeholder="Nome da Agência"
                  type="select"
                  className="padding background"
                  value={values.agencyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option disabled selected value>
                    {' '}
                    -- selecione uma agência--{' '}
                  </option>
                  <option hidden selected>
                    Nome da Agência
                  </option>
                  {selectOptions?.map((opt) => (
                    <option key={opt.name} value={opt.name}>
                      {opt.name}
                    </option>
                  ))}
                </Input>
                {errors.agencyName && touched.agencyName ? (
                  <div className="invalid-feedback d-block">
                    {errors.agencyName}
                  </div>
                ) : null}
              </FormGroup>
            </div>
            <div className="footer">
              <Button className="confirmButton" color="primary" type="submit">
                {editData.edit ? 'Salvar' : 'Criar'}
              </Button>
              {!editData.edit &&<Button color="primary" outline onClick={handleReset}>
                Limpar Campos
              </Button>}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AgentForm;
