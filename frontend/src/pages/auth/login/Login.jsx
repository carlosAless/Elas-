import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../../../helper/supabaseClient";
import "../auth.css";
import { images } from "../../../assets/assets";

export const Login = () => {
  const navigate = useNavigate();

  // Estados para armazenar e-mail, senha e erros
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMsg(""); // limpa erros antes de tentar logar

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    // Login bem-sucedido → Redireciona para a Dashboard
    navigate("/dashboard");
  };

  return (
    <div className="containerLogin">
      <div className="auth-container">
        <form id="formLogin" onSubmit={handleLogin}>
          <div className="title">
            <h1>
              ElasPorElas<span className="rose">+</span>
            </h1>
          </div>

          <span>Entre na sua conta para começar a fazer a diferença</span>

          {errorMsg && <p className="error">{errorMsg}</p>}

          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="iconsInput">
              <FaLock />
            </span>
          </div>

          <div className="inputGroup">
            <input className="btnLogin" type="submit" value="Login" />
          </div>

          <span>
            Não possui uma conta?{" "}
            <Link to="/cadastro" style={{ textDecoration: "none" }}>
              <strong>Criar conta</strong>
            </Link>
          </span>
        </form>

        <div className="auth-rigth-panel">
          <img
            src={images.mulheres}
            alt="ElasPorElas - Ilustração"
            className="auth-image-right"
          />
        </div>
      </div>
    </div>
  );
};
