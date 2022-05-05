import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo Nome é obrigatório'),
  unit: Yup.string().required('Campo de unidade é obrigatória'),
  photo: Yup.mixed().required('Foto é Requerida'),
  type: Yup.string().required('Tipo obrigatório'),
  sellInValue: Yup.string().required('Entrada obrigatória'),
  sellOutValue: Yup.string().required('Saida obrigatória'),
  weight: Yup.string().when('type', {is: 'Kilo', then: Yup.string().required('Peso Inválido')}),
  quantity: Yup.string().when('type', {is: 'Unitário', then: Yup.string().required('Quantidade Inválida')}),
}); 



export const tableHeaderColumns = [
  {value: 'name', label: 'Nome'},
  {value: 'unit', label: 'Unidade'} ,
  {value: 'sellInValue', label: 'Sell in'},
  {value: 'sellOutValue', label: 'Sell out'},
  {value: 'quantity', label: 'Quantidade'},
  {value: 'info', label: 'Informações'}
]