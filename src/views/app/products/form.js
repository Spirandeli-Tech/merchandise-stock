import React, { useState } from 'react';
import {
  Card,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  FormGroup,
} from 'reactstrap';
import { Formik, Form } from 'formik';

import { formatMoney } from 'assets/utils/validations';
import { uploadImage, addProduct } from 'services/products';
import DefaultPhoto from '../../../assets/logos/defaultPhoto.jpg';
import { validationSchema } from './utils';

const ProductsForm = ({ isOpen, onClose, product, selectOptions }) => {
  const [imagePreview, setImagePreview] = useState();
  const typeOptions = [
    { name: 'Kilo', value: 'Kilo' },
    { name: 'Unitário', vaue: 'Unitario' },
  ];

  function refreshPage() {
    window.location.reload(false);
  }

  const onSubmit = async (values) => {
    const cloudStorageImageUrl = await uploadImage(values.photo);
    const response = {
      ...values,
      photo: cloudStorageImageUrl,
    };
    await addProduct(response);
    refreshPage();
  };

  const handleURLPhoto = (event, setFieldValue) => {
    const file = event.target.files[0];
    const preview = URL.createObjectURL(event.target.files[0]);
    setImagePreview(preview);
    setFieldValue('photo', file);
  };

  const initialFormValues = {
    name: product?.name || '',
    unit: product?.unit || '',
    photo: product?.photo || null,
    type: product?.type || '',
    weight: product?.weight || '',
    quantity: product?.quantity || '',
    sellInValue: product?.sellInValue || '',
    sellOutValue: product?.sellOutValue || '',
    observation: product?.observation || '',
  };

  return (
    <Card className="mb-4">
      <Modal isOpen={isOpen}>
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            handleChange,
            touched,
            setFieldValue,
            handleBlur,
          }) => {
            return (
              <Form>
                <ModalHeader>Adicionar Produto</ModalHeader>
                <ModalBody>
                  <FormGroup className="form-photo-style">
                    <label htmlFor="file-input">
                      <div className="image">
                        <img
                          id="photo"
                          className="photo"
                          src={imagePreview || DefaultPhoto}
                          width="100px"
                          height="100px"
                          alt=""
                        />
                      </div>
                      <Label className="label-photo">
                        Foto do Produto {errors.photo && '*'}
                      </Label>
                      <input
                        id="file-input"
                        className="input-photo"
                        type="file"
                        accept="image/*"
                        name="photo"
                        onChange={(e) => handleURLPhoto(e, setFieldValue)}
                      />
                    </label>
                    {errors.photo && touched.photo ? (
                      <div className="invalid-feedback d-block">
                        {errors.photo}
                      </div>
                    ) : null}
                  </FormGroup>
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
                    <Label>Unidade {errors.unit && '*'}</Label>
                    <Input
                      id="unit"
                      name="unit"
                      type="select"
                      value={values.unit}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option disabled value>
                        -- selecione uma unidade--
                      </option>
                      <option hidden selected value>
                        Nome da Unidade
                      </option>
                      {selectOptions?.map((opt) => (
                        <option key={opt.name} value={opt.name}>
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

                  <div className="product-form-row">
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
                    {values.type === 'Kilo' ? (
                      <FormGroup>
                        <Label>Peso {errors.weight && '*'}</Label>
                        <Input
                          id="weight"
                          name="weight"
                          placeholder="Ex:. 100g"
                          value={values.weight}
                          onChange={handleChange}
                        />
                        {errors.weight && touched.weight ? (
                          <div className="invalid-feedback d-block">
                            {errors.weight}
                          </div>
                        ) : null}
                      </FormGroup>
                    ) : (
                      <></>
                    )}
                    {values.type === 'Unitário' ? (
                      <FormGroup>
                        <Label>Quantidade {errors.quantity && '*'}</Label>
                        <Input
                          id="quantity"
                          name="quantity"
                          placeholder="Ex:. 15"
                          value={values.quantity}
                          onChange={handleChange}
                        />
                        {errors.quantity && touched.quantity ? (
                          <div className="invalid-feedback d-block">
                            {errors.quantity}
                          </div>
                        ) : null}
                      </FormGroup>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="product-form-row">
                    <FormGroup>
                      <Label>Valor Sell In {errors.sellInValue && '*'}</Label>
                      <Input
                        id="sellInValue"
                        name="sellInValue"
                        placeholder="R$0,00"
                        value={values.sellInValue}
                        onChange={(e) =>
                          formatMoney(e, setFieldValue, 'sellInValue')
                        }
                      />
                      <div className="yield-percentage">R$ </div>
                      {errors.sellInValue && touched.sellInValue ? (
                        <div className="invalid-feedback d-block">
                          {errors.sellInValue}
                        </div>
                      ) : null}
                    </FormGroup>
                    <FormGroup>
                      <Label>Valor Sell Out {errors.sellOutValue && '*'}</Label>
                      <Input
                        id="sellOutValue"
                        name="sellOutValue"
                        placeholder="R$0,00"
                        value={values.sellOutValue}
                        onChange={(e) =>
                          formatMoney(e, setFieldValue, 'sellOutValue')
                        }
                      />
                      <div className="yield-percentage">R$ </div>
                      {errors.sellOutValue && touched.sellOutValue ? (
                        <div className="invalid-feedback d-block">
                          {errors.sellOutValue}
                        </div>
                      ) : null}
                    </FormGroup>
                  </div>
                  <FormGroup>
                    <Label>Observação {errors.observation && '*'}</Label>
                    <Input
                      id="observation"
                      name="observation"
                      value={values.observation}
                      onChange={handleChange}
                    />
                    {errors.observation && touched.observation ? (
                      <div className="invalid-feedback d-block">
                        {errors.observation}
                      </div>
                    ) : null}
                  </FormGroup>
                </ModalBody>

                <ModalFooter>
                  <Button color="primary" type="submit">
                    {product?.edit ? 'Atualizar' : 'Criar'}
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

export default ProductsForm;
