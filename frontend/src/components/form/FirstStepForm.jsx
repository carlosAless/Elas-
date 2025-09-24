// UserAccountForm.jsx
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

export const FirstStepForm = ({ register, errors }) => {
  return (
    <>
      {/* Nome Completo */}
      <div className="inputGroup">
        <label htmlFor="name">Nome Completo</label>
        <input
          type="text"
          id="name"
          placeholder="Seu nome completo"
          {...register("name")}
          className={errors.name ? "error-border" : ""}
        />
        <span className="iconsInput">
          <FaUser />
        </span>
        {errors.name && (
          <span className="error-message">{errors.name.message}</span>
        )}
      </div>

      {/* Email */}
      <div className="inputGroup">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="voce@exemplo.com"
          {...register("email")}
          className={errors.email ? "error-border" : ""}
        />
        <span className="iconsInput">
          <IoMdMail />
        </span>
        {errors.email && (
          <span className="error-message">{errors.email.message}</span>
        )}
      </div>

      {/* Telefone */}
      <div className="inputGroup">
        <label htmlFor="tel">Telefone</label>
        <input
          type="text"
          id="tel"
          placeholder="(00) 00000-0000"
          {...register("tel")}
          className={errors.tel ? "error-border" : ""}
        />
        <span className="iconsInput">
          <FaPhoneAlt />
        </span>
        {errors.tel && (
          <span className="error-message">{errors.tel.message}</span>
        )}
      </div>

      {/* Senha */}
      <div className="inputGroup">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          placeholder="Crie uma senha forte"
          {...register("password")}
          className={errors.password ? "error-border" : ""}
        />
        <span className="iconsInput">
          <FaLock />
        </span>
        {errors.password && (
          <span className="error-message">{errors.password.message}</span>
        )}
      </div>

      {/* Confirmação de Senha */}
      <div className="inputGroup">
        <label htmlFor="confirmpassword">Confirmação de senha</label>
        <input
          type="password"
          id="confirmpassword"
          placeholder="Confirme sua senha"
          {...register("confirmpassword")}
          className={errors.confirmpassword ? "error-border" : ""}
        />
        <span className="iconsInput">
          <FaLock />
        </span>
        {errors.confirmpassword && (
          <span className="error-message">
            {errors.confirmpassword.message}
          </span>
        )}
      </div>
    </>
  );
};
