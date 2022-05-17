// import { getCurrentUser } from 'helpers/Utils';
import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { updateProduct, getProductsDeposit } from 'services/products';
import { getAllUnits } from 'services/units';

const Workflow = () => {
  const [products, setProducts] = useState([]);
 
  const getDepositUnit = async () => {
    const units = await getAllUnits();
    const response =  await getProductsDeposit();
    const filteredUnits = units.find(
      (item) => item.type === 'Depósito'
      );
    const data = response.filter((opt) => filteredUnits.uid === opt.unit)
    setProducts(data)
  console.log(units,response, data, filteredUnits)

  };

  useEffect(() => {
    getDepositUnit();
    getProductsDeposit()
  }, []);


  const handleAdd = async (product) => {
    const { id, quantity} = product;
    let sum = parseInt(quantity, 10)
    sum += 1;
    
      document.getElementById(id).value = sum.toString();
    await updateProduct(product.id, {
      ...product,
      quantity: `${sum}`,
    });
    getDepositUnit();
  };

  const handleSubtract = async (product) => {
    const { id, quantity } = product;
    let subtract = parseInt(quantity, 10)
    if (subtract > 0) {
      subtract -= 1;
      await updateProduct(product.id, {
        ...product,
        quantity: `${subtract}`,
      });
      getDepositUnit();
    }
    if (subtract === 0) {
      document.getElementById(id).value = 0;
    }
  };


  return (
    <div>
      <div className="workflow-title">
        <h1>
          Depósito
        </h1>
      </div>
      <div className="workflow-header">
        <h2>Foto</h2>
        <h2>Nome</h2>
        <h2>Quantidade</h2>
        <h2>Ações</h2>
      </div>
      <div>
        {products?.map((item) => (
          <div key={item.id} className="worflow-item">
            <div>
              <img className="workflow-img" src={item?.photo} alt="" />
            </div>
            <p className='margin'>{item?.name}</p>
            <span type="number" id={item.uid} value={item.quantity} readOnly>{item.quantity}</span>
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
                disabled={parseInt(item.quantity, 10) === 0}
                onClick={() => handleSubtract(item)}
              >
                -
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workflow;
