import React, { useEffect, useState } from 'react';
import { getAllUnits } from 'services/units';
import ProductsForm from './form';

const Products = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [unitOptions, setUnitOptions] = useState([])
  
  const getUnits = async() => {
    const units = await getAllUnits()
    const data = units.map((opt) => ({
      name: opt.name,
      value: opt.name
    }))
    setUnitOptions(data)
  }

  useEffect(()=> {
    getUnits()
  },[])
  const handleCreate = () => {
    setIsOpenModal(true);
  };

  return (
    <div>
      <div className="table-custom-title">
        <h2 className="PageTitle">Produtos</h2>
        <div className="row">
          <div className="mr-3">
            <button
              type="button"
              className="btn-add btn btn-shadow"
              onClick={handleCreate}
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
      <ProductsForm
        isOpen={isOpenModal}
        selectOptions={unitOptions}
        onClose={() => setIsOpenModal(false)}
        product={[]}
      />
    </div>
  );
};

export default Products;
