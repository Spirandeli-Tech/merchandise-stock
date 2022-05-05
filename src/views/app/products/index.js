import React, { useEffect, useState } from 'react';
import { Card } from 'reactstrap';

import { getAllProducts } from 'services/products';
import { getAllUnits } from 'services/units';

import { v4 as uuidv4 } from 'uuid';

import Empty from 'components/Empty';
import ProductModal from './modal';
import ProductsForm from './form';

import { tableHeaderColumns } from './utils';

const Products = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isProductModal, setIsProductModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [unitOptions, setUnitOptions] = useState([]);
  const [products, setProducts] = useState([]);

  const getUnits = async () => {
    const units = await getAllUnits();
    const data = units.map((opt) => ({
      name: opt.name,
      value: opt.name,
    }));
    setUnitOptions(data);
  };

  const getProducts = async () => {
    const response = await getAllProducts();
    setProducts(response);
  };

  useEffect(() => {
    getUnits();
    getProducts();
  }, []);

  const handleCreate = () => {
    setIsOpenModal(true);
  };

  const handleModal = (values) => {
    console.log("entrei")
    setIsProductModal(true);
    setModalData(values);
  };

  const productTable = products?.map((dto) => ({
    name: dto?.name,
    unit: dto?.unit,
    sellInValue: `R$${dto?.sellInValue}`,
    sellOutValue: `R$${dto?.sellOutValue}`,
    quantity: dto?.quantity,
    info: (
      <div
        type='button'
        onClick={() => handleModal({...dto})}
        role="presentation"
        className="btn color-primary"
      >
        Ver Mais...
      </div>
    ),
  }));

  return (
    <>
      <div>
        <div className="table-custom-title">
          <h2 className="PageTitle">Produtos</h2>
          <div className="row">
            <div className="mr-3">
              <button
                type="button"
                className="btn-add btn btn-shadow"
                onClick={() => handleCreate()}
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
        <Card className="table-card">
         {products.length > 0 ? <table className="table">
            <thead>
              <tr>
                {tableHeaderColumns.map((thItem) => (
                  <th key={thItem.value}>{thItem.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {productTable.map((item) => {
                return (
                  <tr key={uuidv4()}>
                    <td>{item.name}</td>
                    <td>{item.unit}</td>
                    <td>{item.sellInValue}</td>
                    <td>{item.sellOutValue}</td>
                    <td>{item.quantity}</td>
                    <td>{item.info}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>:
            (
            <Empty name="unidade" complement="a" />
          )}
        </Card>

        {isOpenModal ? (
          <ProductsForm
            isOpen={isOpenModal}
            selectOptions={unitOptions}
            onClose={() => setIsOpenModal(false)}
            product={[]}
          />
        ) : (
          <></>
        )}
      </div>

      {isProductModal ? (
        <ProductModal
          isOpen={isProductModal}
          onClose={() => setIsProductModal(false)}
          productData={modalData}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Products;
