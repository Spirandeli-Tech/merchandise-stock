import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo Nome é obrigatório'),
  email: Yup.string().required('Campo de email é obrigatório'),
  phone: Yup.string().required('Campo telefone é obrigatório'),
  cep: Yup.string().required('Campo Cep é obrigatório'),
  street: Yup.string().required('Campo Endereço é obrigatório'),
  number: Yup.number().required('Campo Número é obrigatório'),
  distric: Yup.string().required('Campo Bairro é obrigatório'),
  city: Yup.string().required('Campo Cidade é obrigatório'),
  state: Yup.string().required('Campo Estado/UF é obrigatório'),
}); 