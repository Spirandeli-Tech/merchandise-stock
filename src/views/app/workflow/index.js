import { getCurrentUser } from 'helpers/Utils';
import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { getAllProducts, updateProduct } from 'services/products';
import { getAllUnits } from 'services/units';
import ReactImg from '../../../assets/logos/whatsapp.png'

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
    const { id, quantity} = product;
    let sum = parseInt(quantity, 10)
    sum += 1;
    
    // console.log(sum, add)
    document.getElementById(id).value = sum.toString();
    await updateProduct(product.id, {
      ...product,
      quantity: `${sum}`,
    });
    getProducts();
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
      getProducts();
    }
    if (subtract === 0) {
      document.getElementById(id).value = 0;
    }
  };

  const handleOrder = () => {
    window.open('https://wa.me/3497794633?text=Precisamos mais do produtos')
  }

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
      <div role='presentation' type='button' className='order-button' onClick={() => handleOrder()}><img src={ReactImg} alt='' className='workflow-img'/>Solicitar mais</div>
      <div className='img'/>
    </div>
  );
};

export default Workflow;
