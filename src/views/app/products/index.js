import React, { useEffect, useState } from 'react';
import { Card } from 'reactstrap';

import { getAllProducts } from 'services/products';
import { getAllUnits } from 'services/units';
import { getCurrentUser } from 'helpers/Utils';

import Empty from 'components/Empty';
import ProductModal from './modal';
import ProductsForm from './form';

import { tableHeaderColumns } from './utils';
import DeleteProduct from './deleteModal';

const Products = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isProductModal, setIsProductModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [unitOptions, setUnitOptions] = useState([]);
  const [products, setProducts] = useState([]);
  const [isDeletionOpen, setIsDeletionOpen] = useState(false);
  const [deleteData, setDeleteData] = useState();

  const currentUser = getCurrentUser();

  const getUnits = async () => {
    const units = await getAllUnits();
    if (currentUser.role === 'employee') {
      const filteredUnits = units.filter(
        (item) => item.id === currentUser.unit
      );
      const result = filteredUnits.map((opt) => ({
        name: opt.name,
        value: opt.uid,
      }));
      setUnitOptions(result);
    }
    if (currentUser.role === 'admin') {
      const data = units.map((opt) => ({
        name: opt.name,
        value: opt.uid,
      }));
      setUnitOptions(data);
    }
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
    setModalData();
  };

  const handleModal = (values) => {
    setIsProductModal(true);
    setModalData(values);
  };

  const handleDelete = (values) => {
    setIsDeletionOpen(true);
    setDeleteData(values);
  };

  const handleEdit = (values) => {
    setIsOpenModal(true);
    const response = {
      ...values,
      edit: true,
    };
    setModalData(response);
  };

  const productTable = products?.map((dto) => ({
    uid: dto?.id,
    photo: dto?.photo,
    name: dto?.name,
    unit: dto?.unit,
    sellInValue: `R$${dto?.sellInValue}`,
    sellOutValue: `R$${dto?.sellOutValue}`,
    quantity: dto?.quantity,
    info: (
      <div
        type="button"
        onClick={() => handleModal({ ...dto })}
        role="presentation"
        className="btn color-primary"
      >
        Ver Mais...
      </div>
    ),
    edit: (
      <div className="icons-row">
        <div
          className="simple-icon-pencil edit-icon icon"
          onClick={() => handleEdit(dto)}
          role="presentation"
        />
        <div
          className="simple-icon-trash edit-icon icon"
          onClick={() => handleDelete(dto)}
          role="presentation"
        />
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
          {products?.length > 0 ? (
            <table className="table">
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
                    <tr key={item.name}>
                      <td>
                        <div>
                          <img className="img-table" src={item.photo} alt="" />
                        </div>
                      </td>
                      <td>{item.name}</td>
                      <td>{item.sellInValue}</td>
                      <td>{item.sellOutValue}</td>
                      <td>{item.quantity}</td>
                      <td>{item.info}</td>
                      <td>{item.edit}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <Empty name="produto" complement="o" />
          )}
        </Card>

        {isOpenModal ? (
          <ProductsForm
            isOpen={isOpenModal}
            selectOptions={unitOptions}
            onClose={() => setIsOpenModal(false)}
            product={modalData}
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

      {isDeletionOpen ? (
        <DeleteProduct
          isOpen={isDeletionOpen}
          onClose={() => setIsDeletionOpen(false)}
          productData={deleteData}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Products;
