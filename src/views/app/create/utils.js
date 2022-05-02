import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo nome é Obrigatório'),
  document: Yup.string()
    .min(11, 'CPF inválido')
    .required('Campo CPF é Obrigatório'),
  email: Yup.string().required('Campo email é Obrigatório'),
  phone: Yup.string().required('Campo telefone é Obrigatório'),
  state: Yup.string().required('Campo estado é Obrigatório'),
  cep: Yup.string().required('Campo CEP é Obrigatório'),
  city: Yup.string().required('Campo Cidade é Obrigatório'),
  distric: Yup.string().required('Campo Bairro é Obrigatório'),
  address: Yup.string().required('Campo Endereço é Obrigatório'),
  number: Yup.string().required('Campo Número é Obrigatório'),
  agencyName: Yup.string().required('Campo Agencia é Obrigatório'),
});
