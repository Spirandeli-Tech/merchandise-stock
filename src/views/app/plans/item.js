import React from 'react';
import { Card } from 'reactstrap';

const Item = ({ onEdit, plan, value, id, method, status, highlight }) => {
  const maskValue = (valueMoney) => {
    let money = valueMoney;
    money = money.toFixed(2);
    money = money.replace('.', ',');
    return money;
  };
  return (
    <Card className="margin-top margin-bottom">
      <div
        className={`header-row item-plan ${
          highlight ? 'header-row-highlight' : ''
        }`}
      >
        {highlight && (
          <div className="premium-plan">
            <i className="simple-icon-star" />
          </div>
        )}
        <span>{id}</span>
        <span>{plan}</span>
        <span>R$ {maskValue(value)}</span>
        <span>{status ? 'Ativo' : 'Inativo'}</span>
        <div className="item-type-row">
          {method?.includes('CREDIT') ? (
            <div className="item-type-bill" />
          ) : (
            <div className="item-type-default" />
          )}
          {method?.includes('PIX') ? (
            <div className="item-type-bill" />
          ) : (
            <div className="item-type-default" />
          )}
          {method?.includes('BILL') ? (
            <div className="item-type-bill" />
          ) : (
            <div className="item-type-default" />
          )}
        </div>
        <div>
          <div
            className="simple-icon-pencil edit-icon"
            onClick={onEdit}
            role="presentation"
          />
        </div>
      </div>
    </Card>
  );
};

export default Item;
