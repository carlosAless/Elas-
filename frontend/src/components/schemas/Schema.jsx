// schemas/Schema.ts
import { z } from "zod";
import { ValidateCPForCNPJ } from "../../utils/ValidateCPForCNPJ";
// Schema para o primeiro passo
export const FirstStepFormSchema = z
  .object({
    name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("Endereço de email inválido"),
    tel: z
      .string()
      .regex(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, "Telefone inválido")
      .min(10, "Digite um número de telefone válido com DDD"),
    password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .max(30, "A senha não pode ter mais que 30 caracteres"),
    confirmpassword: z.string().min(6, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "As senhas não conferem",
    path: ["confirmpassword"],
  });

// Schema para o segundo passo
export const SecondStepFormSchema = z.object({
  cpf_cnpj: z
    .string()
    .min(1, "Documento é obrigatório")
    .min(11, "Documento deve ter pelo menos 11 dígitos")
    .max(18, "Documento muito longo")
    .refine(ValidateCPForCNPJ, "CPF ou CNPJ inválido"),
  country: z.string().min(1, "País é obrigatório"),
  state: z.string().min(1, "Estado é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  type: z.string().min(1, "Perfil é obrigatório"),
});
