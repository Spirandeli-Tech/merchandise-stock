import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';

import { getAllPlans } from '../../../services/plans';
import Item from './item';
import Empty from './Empty';
import ModalForm from './form';

const Plans = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  const [modalData, setModalData] = useState();
  const [plansLength, setPlansLength] = useState(plans.length)

  const getPlans = async () => {
    setLoading(true);
    const response = await getAllPlans();
    setLoading(false);
    setPlans(response);
  };

  useEffect(() => {
    getPlans();
    setPlansLength(plans.length);
  }, []);

  const setEditionModal = (values) => {
    setOpenModal(true);
    setModalData({
      ...values,
      title: 'Editar',
    });
  };

  const setCreationPlan = () => {
    setOpenModal(true);
    setModalData();
    setPlansLength(plans.length)
  };

  const handleEmptyState = () => {
    <Empty className="position" name="plano" />;
  };

  return (
    <div>
      <div className="table-custom-title">
        <h2 className="PageTitle">Planos</h2>
        <div>
          <button
            type="button"
            className="btn-add btn btn-shadow"
            onClick={() => setCreationPlan()}
          >
            Adicionar
          </button>
        </div>
      </div>
      <ModalForm
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        plan={modalData}
        length={plansLength}
      />
      <div className="header-row margin-bottom">
        <span>ID</span>
        <span>Nome</span>
        <span>Preço Mensal</span>
        <span>Status</span>
        <span>Crédito/Pix/Boleto</span>
        <span>Ações</span>
      </div>

      <div>
        {isLoading ? (
          <div className="loading-table">
            <Spinner color="primary" className="mb-1" />
          </div>
        ) : (
          plans.map((plan) => (
            <Item
              id={plan.plan_id}
              key={plan.plan_id}
              plan={plan.planName}
              value={plan.value}
              method={plan.method}
              status={plan.status}
              highlight={plan.highlight}
              onEdit={() => setEditionModal(plan)}
            />
          ))
        )}
        {plans.length === 0 && handleEmptyState}
      </div>
    </div>
  );
};

export default Plans;
