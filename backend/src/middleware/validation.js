// backend/middleware/validation.js
import { body, validationResult } from "express-validator";
import { validateCPForCNPJ } from "../utils/validationUtils.js";

export const validateRegistration = [
  body("name")
    .isLength({ min: 3 })
    .withMessage("Nome deve ter pelo menos 3 caracteres")
    .trim()
    .escape(),

  body("email").isEmail().withMessage("Email inválido").normalizeEmail(),

  body("tel")
    .matches(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/)
    .withMessage("Telefone inválido"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Senha deve ter pelo menos 6 caracteres")
    .matches(/[a-z]/)
    .withMessage("Senha deve conter letra minúscula")
    .matches(/[A-Z]/)
    .withMessage("Senha deve conter letra maiúscula")
    .matches(/\d/)
    .withMessage("Senha deve conter número"),

  body("confirmpassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Senhas não coincidem"),

  body("cpf_cnpj")
    .custom((value) => validateCPForCNPJ(value))
    .withMessage("CPF ou CNPJ inválido"),

  body("country").notEmpty().withMessage("País é obrigatório"),

  body("state").notEmpty().withMessage("Estado é obrigatório"),

  body("city").notEmpty().withMessage("Cidade é obrigatória"),

  body("type")
    .isIn([
      "Gestor Público",
      "Moderador",
      "Organização não governamental",
      "Cidadão",
      "Outro",
    ])
    .withMessage("Tipo de perfil inválido"),

  // Middleware para verificar erros
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Dados de entrada inválidos",
        errors: errors.array(),
      });
    }
    next();
  },
];
