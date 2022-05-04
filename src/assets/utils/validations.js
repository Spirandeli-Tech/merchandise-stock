export const handleCep = async (event, setFieldValue) => {
  let cep = event.target.value.replace(/\D/g, '');
  cep = cep.replace(/(\d)(\d{3})$/, '$1-$2');
  setFieldValue('cep', cep);
};

export const handlePhone = async (event, setFieldValue) => {
  let phone = event.target.value.replace(/\D/g, '');
  phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2');
  phone = phone.replace(/(\d)(\d{4})$/, '$1-$2');
  setFieldValue('phone', phone);
};

export function formatCPF(cpf, setFieldValue) {
  const data = cpf.target.value.replace(/[^\d]/g, '');

  const document = data.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  setFieldValue('document', document);
}

export const formatMoney = async (event, setFieldValue, param) => {
  let currency = event.target.value.replace(/\D/g, '');
  currency += '';
  currency = parseInt(currency.replace(/[\D]+/g, ''), 10);
  currency += '';
  currency = currency.replace(/([0-9]{2})$/g, ',$1');

  if (currency.length > 6) {
    currency = currency.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
  }
  if (currency === 'NaN') {
    currency = '';
  }
  setFieldValue(param, currency);
};
