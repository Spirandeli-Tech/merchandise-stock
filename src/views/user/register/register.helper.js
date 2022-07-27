export const formValidation = (form) => {
  console.log('prevState', form);
  const { firstName, lastName, email, password, cnpj, razaoSocial } = form;
  if (firstName && lastName && email && password && cnpj && razaoSocial) {
    return { error: false };
  }
  if (!firstName) {
    return {
      error: true,
      field: 'firstName',
      errorMessage: 'Campo Nome é obrigatório',
    };
  }
  if (!lastName) {
    return {
      error: true,
      field: 'lastName',
      errorMessage: 'Campo sobrenome é obrigatório',
    };
  }
  if (!email) {
    return {
      error: true,
      field: 'email',
      errorMessage: 'Campo email é obrigatório',
    };
  }
  if (!password) {
    return {
      error: true,
      field: 'password',
      errorMessage: 'Campo password é obrigatório',
    };
  }
  if (!cnpj) {
    return {
      error: true,
      field: 'cnpj',
      errorMessage: 'Campo cnpj é obrigatório',
    };
  }
  if (!razaoSocial) {
    return {
      error: true,
      field: 'razaoSocial',
      errorMessage: 'Campo razaoSocial é obrigatório',
    };
  }
  return { error: true };
};
