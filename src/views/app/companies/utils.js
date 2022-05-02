import * as Yup from 'yup';

export const phoneRegex = RegExp(/^\D*(\d{2})\D*(\d{5}|\d{4})\D*(\d{4})/g);

export const handlePhoneChange = (value) => {
  let r = value.replace(/\D/g, '');
  r = r.replace(/^0/, '');
  if (r.length > 10) {
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
  } else if (r.length > 5) {
    r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
  } else if (r.length > 2) {
    r = r.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
  } else {
    r = r.replace(/^(\d*)/, '($1');
  }
  return r;
};

export const validationSchema = Yup.object().shape({
  displayName: Yup.string().required('Campo Nome é obrigatório'),
  email: Yup.string()
    .email('Formato de Email inválido')
    .required('Campo Email é obrigatório'),
  phone: Yup.string()
    .matches(phoneRegex, 'Telefone inválido')
    .max(11, 'Telefone inválido')
    .min(8, 'Telefone Inválido')
    .required('Campo Telefone é obrigatório'),
  owner: Yup.string().required('Campo Responsável é obrigatório'),
});

const configureData = (el) => {
  const date = el.split('/');
  const newDate = new Date(date[2], date[1] - 1, date[0]);
  return newDate;
};

export function ordemDecrescente(a, b) {
  return configureData(a.createdAt) - configureData(b.createdAt);
}

export function ordemCrescente(a, b) {
  return configureData(b.createdAt) - configureData(a.createdAt);
}