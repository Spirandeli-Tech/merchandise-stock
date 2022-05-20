import { getCurrentUser } from 'helpers/Utils';
import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { getAllProducts, updateProduct } from 'services/products';
import { getAllUnits } from 'services/units';
import ReactImg from '../../../assets/logos/whatsapp.png';

const Workflow = () => {
  const [unitOptions, setUnitOptions] = useState();
  const [products, setProducts] = useState();
  const currentUser = getCurrentUser();

  const getUnits = async () => {
    const units = await getAllUnits();
    if (currentUser.role === 'employee') {
      const filteredUnits = units.filter(
        (item) => item.id === currentUser.unit
      );
      filteredUnits.map((opt) => ({
        name: opt.name,
        value: opt.uid,
      }));
      setUnitOptions(filteredUnits);
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

  const handleAdd = async (product) => {
    const { id, quantity } = product;
    let sum = parseInt(Object.values(quantity), 10);
    sum += 1;
    document.getElementById(id).value = sum;
    await updateProduct(product.id, {
      ...product,
      quantity: {
        ...product.quantity,
        [product.unit]: sum,
      },
    });
    getProducts();
  };

  const handleSubtract = async (product) => {
    const { id, quantity } = product;
    let subtract = Object.values(quantity);
    if (Object.values(quantity) > 0) {
      subtract -= 1;

      document.getElementById(id).value = subtract;

      await updateProduct(product.id, {
        ...product,
        quantity: {
          ...product.quantity,
          [product.unit]: subtract,
        },
      });
      getProducts();
    }
    if (subtract === 0) {
      document.getElementById(id).value = 0;
    }
  };

  const handleOrder = () => {
    window.open('https://wa.me/+553491402120?text=Precisamos mais do produtos');
  };


  return (
    <div>
      <div className="workflow-title">
        <h1>
          {currentUser.role === 'admin'
            ? 'Fluxo de Produtos'
            : unitOptions?.map((opt) => opt.name)}
        </h1>
      </div>
      <div className="workflow-header">
        <h2>Foto</h2>
        <h2>Nome</h2>
        <h2>Quantidade</h2>
        <h2>Ações</h2>
      </div>
      <div>
        {products?.map((item) => {
          const currentQuantity = item.quantity;

          return (
            <div key={item.id} className="worflow-item">
              <div>
                <img className="workflow-img" src={item?.photo} alt="" />
              </div>
              <p className="margin">{item?.name}</p>
              <span
                type="number"
                id={item.uid}
                value={Object.values(item.quantity)}
                readOnly
              >
                {currentQuantity[currentUser.unit]}
              </span>
              <div className="worflow-button-row">
                <Button
                  className="workflow-button"
                  type="button"
                  onClick={() => handleAdd(item)}
                >
                  +
                </Button>
                <Button
                  className="workflow-button"
                  type="button"
                  disabled={Number(Object.values(item.quantity)) === 0}
                  onClick={() => handleSubtract(item)}
                >
                  -
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div
        role="presentation"
        type="button"
        className="order-button"
        onClick={() => handleOrder()}
      >
        <img src={ReactImg} alt="" className="workflow-img" />
        Solicitar mais
      </div>
      <div className="img" />
    </div>
  );
};

export default Workflow;
