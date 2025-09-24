// validateCPForCNPJ.jsx
export const ValidateCPForCNPJ = (documento) => {
  // Remove tudo que não é número
  const cleanDoc = documento.replace(/\D/g, "");

  // Valida CPF (11 dígitos)
  if (cleanDoc.length === 11) {
    return validateCPF(cleanDoc);
  }

  // Valida CNPJ (14 dígitos)
  if (cleanDoc.length === 14) {
    return validateCNPJ(cleanDoc);
  }

  // Se não tem 11 ou 14 dígitos, é inválido
  return false;
};

// Função para validar CPF
const validateCPF = (cpf) => {
  if (/^(\d)\1{10}$/.test(cpf)) return false; // Todos dígitos iguais

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10))) return false;

  return true;
};

// Função para validar CNPJ
const validateCNPJ = (cnpj) => {
  if (/^(\d)\1{13}$/.test(cnpj)) return false; // Todos dígitos iguais

  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  const digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
};

// Exporta as funções individuais também, se precisar
export { validateCPF, validateCNPJ };
