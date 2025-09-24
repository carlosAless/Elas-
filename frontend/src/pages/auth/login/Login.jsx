import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom"; // Importe useNavigate e Link

import "./Login.css";

export const Login = () => {
  return (
    <>
      <div className="containerLogin">
        <form action="" id="formLogin">
          <div className="title">
            <h1>
              ElasPorElas<span className="rose">+</span>
            </h1>
          </div>

          <span>Entre na sua conta para começar a fazer a diferença</span>

          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Digite seu email" />
            <span className="iconsInput">
              <IoMdMail />
            </span>
          </div>

          <div className="inputGroup">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
            />
            <span className="iconsInput">
              <FaLock />
            </span>
          </div>

          <div className="inputGroup">
            <input className="btnLogin" type="button" value="Login" />
          </div>

          <span>
            Não possui uma conta?{" "}
            <Link to="/cadastro" style={{ textDecoration: "none" }}>
              <strong>Criar conta</strong>
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};
