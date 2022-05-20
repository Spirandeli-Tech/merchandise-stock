// import { getCurrentUser } from 'helpers/Utils';
import { sum } from 'lodash';
import React, { useEffect, useState } from 'react';
import { getAllProductsBase } from 'services/products';
import { getAllUnits } from 'services/units';
import ModalTransfer from './modal';

const Workflow = () => {
  // const [unitOptions, setUnitOptions] = useState();
  const [products, setProducts] = useState();
  const [isOpenModal, setIsOpenModal] = useState();
  const [modalData, setModalData] = useState();
  // const currentUser = getCurrentUser();
  const [defaultUnits, setDefaultUnits] = useState();

  const getUnits = async () => {
    const units = await getAllUnits();
    setDefaultUnits(units);
    //   if (currentUser.role === 'employee') {
    //     const filteredUnits = units.filter(
    //       (item) => item.id === currentUser.unit
    //     );
    //     filteredUnits.map((opt) => ({
    //       name: opt.name,
    //       value: opt.uid,
    //     }));
    //     setUnitOptions(filteredUnits);
    //   }
    //   if (currentUser.role === 'admin') {
    //     const data = units.map((opt) => ({
    //       name: opt.name,
    //       value: opt.uid,
    //     }));
    //     setUnitOptions(data);
    //   }
  };

  const getProducts = async () => {
    const response = await getAllProductsBase();
    setProducts(response);
  };

  useEffect(() => {
    getUnits();
    getProducts();
  }, []);

  const handleModal = (values) => {
    setIsOpenModal(true);
    const quantityValues = Object.values(values.quantity);
    if (quantityValues.length > 1) {
      const response = {
        ...values,
        quantity: sum(Object.values(values.quantity)),
        unit: Object.keys(values.quantity),
      };
      setModalData(response);
    } else {
      const response = {
        ...values,
        quantity: Object.values(values.quantity),
        unit: Object.keys(values.quantity),
      };

      setModalData(response);
    }
  };

  return (
    <div>
      <div className="workflow-title">
        <h1>Transferir Produtos</h1>
      </div>
      <div className="workflow-header">
        <h2>Foto</h2>
        <h2>Nome</h2>
        <h2>Quantidade</h2>
        <h2>Tranferir</h2>
      </div>
      <div>
        {products?.map((item) => (
          <div key={item.id} className="worflow-item">
            <div>
              <img className="workflow-img" src={item?.photo} alt="" />
            </div>
            <p className="margin">{item?.name}</p>
            <span
              type="number"
              id={item.uid}
              value={sum(Object.values(item.quantity))}
              readOnly
            >
              {sum(Object.values(item.quantity))}
            </span>
            <div className="worflow-button-row">
              <div
                className="iconsminds-to-right"
                onClick={() => handleModal(item)}
                role="presentation"
              />
            </div>
          </div>
        ))}
      </div>
      <ModalTransfer
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        data={modalData}
        units={defaultUnits}
      />
    </div>
  );
};

export default Workflow;
