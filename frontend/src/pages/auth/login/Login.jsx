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
      <img
        src={images.mulheres}
        alt="ElasPorElas - Ilustração"
        className="auth-image-left"
      />
      <div className="auth-container">
        <img
          src={images.elasporelas}
          alt="ElasPorElas - Ilustração"
          className="imagelogo"
        />
        <div className="auth-box">
          <div className="information">
            <h2>Você não está sozinha. Estamos aqui para te ouvir</h2>
            <span>
              Este é um canal seguro e confidencial para mulheres fazerem
              denúncias de forma rápida e direto pelo WhatsApp. Sua conversa é
              sigilosa.
            </span>
          </div>
          <form id="formLogin" onSubmit={handleLogin}>
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

            <div className="btnContainerLogin">
              <input className="btnLogin" type="submit" value="Login" />
            </div>

            <span>
              Não possui uma conta?{" "}
              <Link to="/cadastro" style={{ textDecoration: "none" }}>
                <strong>Criar conta</strong>
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};
