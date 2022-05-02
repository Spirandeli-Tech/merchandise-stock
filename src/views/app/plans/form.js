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
  Row,
} from 'reactstrap';
import { Formik, Form } from 'formik';
import Select from 'react-select';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';

import CustomSelectInput from 'components/common/CustomSelectInput';
import { addPlan, updatePlan } from '../../../services/plans';
import { PLAN_OPTIONS, validationSchema } from './utils';

const ModalForm = ({ isOpen, onClose, plan, length }) => {
  function refreshPage() {
    window.location.reload(false);
  }

  const onSubmit = async (values) => {
    const sendMethod = values.method.map((opt) => opt.value);
    const response = {
      ...values,
      value: Number(values.value.replace(',', '.')),
      method: sendMethod,
      highlight: values?.highlight,
      yield: values?.yield,
      plan_id: values?.plan_id
        ? values.plan_idå
        : Math.floor(Math.random() * 999999),
      status: values?.status,
      order: length === 0 || length === undefined ? values?.order : length + 1 
    };
    if (plan?.title === 'Editar') {
      await updatePlan(plan.id, response);
    } else {
      await addPlan(response);
    }
    onClose();
    await refreshPage();
  };

  const initialPlans = plan?.method.map((opt) =>
    PLAN_OPTIONS?.find((el) => el.value === opt && opt !== undefined)
  );

  const initialFormValues = {
    planName: plan?.planName || '',
    description: plan?.description || '',
    value:
      plan?.value.toLocaleString('pt-BR') || '',
    method: initialPlans || [],
    yield: plan?.yield || '',
    highlight: plan?.highlight || false,
    status: plan?.status || true,
    order: plan?.order
  };

  const onBlurMoney = async (event, setFieldValue) => {
    let currency = event.target.value.replace(/\D/g, '');
    currency += '';
    currency = parseInt(currency.replace(/[\D]+/g, ''), 10);
    currency += '';
    currency = currency.replace(/([0-9]{2})$/g, ',$1');

    if (currency.length > 6) {
      currency = currency.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
    }
    if (currency === 'NaN') {
      currency = '';
    }
    setFieldValue('value', currency);
  };

  const handlePercent = (event, setFieldValue) => {
    let percent = event.target.value.replace(/\D/g, '');
    percent.replace(/^(100(\.00?)?|[1-9]?\d(\.\d\d?)?)$/, '');
    if (percent.length === 4) {
      setFieldValue('yield', percent.substring(0, percent.length - 1));
    } else {
      if (percent === 'NaN') {
        percent = 0.0;
      }
      setFieldValue('yield', percent);
    }
  };

  return (
    <Card className="mb-4">
      <Modal isOpen={isOpen} toggle={onClose}>
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({
            handleChange,
            values,
            errors,
            touched,
            setFieldTouched,
            handleBlur,
            setFieldValue,
          }) => {
            return (
              <Form>
                <ModalHeader>{plan?.title || 'Adicionar Plano'}</ModalHeader>
                <ModalBody>
                  <FormGroup className="mr-2">
                    <Label>Nome {errors.planName && '*'}</Label>
                    <Input
                      id="planName"
                      name="planName"
                      placeholder="Ex: Básico"
                      onChange={handleChange}
                      value={values.planName}
                      onBlur={handleBlur('planName')}
                    />
                    {errors.planName && touched.planName ? (
                      <div className="invalid-feedback d-block">
                        {errors.planName}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Label>Descrição {errors.description && '*'}</Label>
                    <Input
                      id="description"
                      name="description"
                      onChange={handleChange}
                      type="text"
                      value={values.description}
                      onBlur={setFieldTouched}
                    />
                    {errors.description && touched.description ? (
                      <div className="invalid-feedback d-block">
                        {errors.description}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Label>Valor (R$){errors.value && '*'}</Label>
                    <Input
                      id="value"
                      name="value"
                      placeholder="R$0,00"
                      value={values.value}
                      onChange={(e) => onBlurMoney(e, setFieldValue)}
                      onBlur={(e) => onBlurMoney(e, setFieldValue)}
                      disabled={plan?.value}
                    />
                    <div className="yield-percentage">R$ </div>
                    {errors.value && touched.value ? (
                      <div className="invalid-feedback d-block">
                        {errors.value}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Label>Rendimento por Ano (%) {errors.yield && '*'}</Label>
                    <Input
                      id="yield"
                      name="yield"
                      placeholder="10"
                      onChange={(e) => handlePercent(e, setFieldValue)}
                      onBlur={(e) => handlePercent(e, setFieldValue)}
                      value={values.yield}
                      disabled={plan?.yield}
                    />
                    <div className="yield-percentage">%</div>
                    {errors.yield && touched.yield ? (
                      <div className="invalid-feedback d-block">
                        {errors.yield}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Label>Método de Pagamento{errors.method && '*'}</Label>
                    <Select
                      id="method"
                      name="method"
                      components={{ Input: CustomSelectInput }}
                      classNamePrefix="react-select"
                      placeholder="Selecionar método de pagamento"
                      isMulti
                      value={values.method}
                      onChange={(e) => setFieldValue('method', [].concat(e))}
                      options={PLAN_OPTIONS}
                    />
                    {errors.method && touched.method ? (
                      <div className="invalid-feedback d-block">
                        {errors.method}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Row className="row">
                      <div className="switch-row">
                        <Label>Destaque</Label>
                        <Switch
                          id="highlight"
                          className="custom-switch custom-switch-primary-inverse"
                          checked={values.highlight}
                          onChange={() =>
                            setFieldValue('highlight', !values.highlight)
                          }
                        />
                      </div>
                      <div className="switch-row">
                        <Label>Ativo</Label>
                        <Switch
                          id="status"
                          className="custom-switch custom-switch-primary-inverse"
                          checked={values.status}
                          onChange={() =>
                            setFieldValue('status', !values.status)
                          }
                        />
                      </div>
                    </Row>
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit">
                    {plan?.title === 'Editar' ? 'Atualizar' : 'Adicionar'}
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

export default ModalForm;
