import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string().required('Campo Email é obrigatório'),
  unit: Yup.string().required('Campo de Unidade é obrigatória'),
  password: Yup.string().min(8,'A senha deve conter no mínimo 8 caracteres').required('Senha obrigatória'),
  role: Yup.string().required('Permissão obrigatório'),
}); 
