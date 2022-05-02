import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  planName: Yup.string().required('Campo Nome é obrigatório'),
  description: Yup.string().required('Campo de descrição é obrigatória'),
  value: Yup.string().required('Valor é obrigatório'),
  method: Yup.array().min(1, 'Deve conter pelo menos um método').required('Método Obrigatório'),
  yield: Yup.number().min(1, 'Rendimento minimo de 1%').max(100, 'Rendimento máximo de 100%').required('Rendimento Obrigatório')
}); 

export const PLAN_OPTIONS = [
  {label: 'CARTÃO DE CRÉDITO', value: 'CREDIT', key: 'CREDIT'},
  {label: 'PIX', value: 'PIX', key: 'PIX'},
  {label: 'BOLETO', value: 'BILL', key: 'BILL'},

]

