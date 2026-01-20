import React from "react";
import "./Home.css"; // Importando um arquivo CSS para estilização
import { Link } from "react-router-dom"; // Importe o Link
import HeartIcon from "/src/assets/heart.svg";
import ShieldIcon from "/src/assets/shield.svg";
import UsersIcon from "/src/assets/users.svg";
import Chat from "/src/assets/chat.svg";
import Hand from "/src/assets/hand-heart.svg";
import UserCheck from "/src/assets/user-check.svg";
import Arrow from "/src/assets/arrow-right.svg";
import Scale from "/src/assets/scale.svg";
import Brain from "/src/assets/brain.svg";
import House from "/src/assets/house.svg";
import BriefCase from "/src/assets/briefcase.svg";
import Baby from "/src/assets/baby.svg";
import HeartHandshake from "/src/assets/heart-handshake.svg";

export const Home = () => {
  return (
    <div className="containerHome">
      <nav className="navbarHome">
        <div className="logoHome">
          <img src="src/assets/elasporelas.png" alt="elasporelas" />
        </div>

        <ul className="navLinks">
          <li>
            <a href="#sobre">Sobre</a>
          </li>
          <li>
            <a href="#como-funciona">Como funciona</a>
          </li>
          <li>
            <a href="#rede-apoio">Rede de apoio</a>
          </li>
          <li>
            <a href="#contato">Contato</a>
          </li>
        </ul>

        <li className="loginBtn">
          <Link to="/login">Entrar</Link>
        </li>
      </nav>

      <main className="mainContent">
        <section id="voce-nao-esta-sozinha">
          <div id="conteudo">
            <h1>Você não está sozinha.</h1>

            <p>
              O Elas por Elas é uma plataforma de acolhimento que conecta
              mulheres em situação de vulnerabilidade a uma rede segura de
              apoio, orientação e encaminhamento.
            </p>
            <div className="botoesajuda">
              <div id="btns">
                <button>Quero ajuda agora</button>
                <button>Como funciona</button>
              </div>
              <span>
                Se houver risco imediato, ligue 190 ou procure o serviço de
                emergência local.
              </span>
            </div>
          </div>

          <div id="redeapoiomulheres">
            <img
              src="src/assets/redeapoiomulheres.jpg"
              alt="redeapoiomulheres"
            />
          </div>
        </section>
        <section id="sobre">
          <h2 className="titulo-sections">SOBRE NÓS</h2>
          <p className="info">
            O Elas por Elas é uma iniciativa social dedicada ao acolhimento,
            orientação e encaminhamento de mulheres em situação de
            vulnerabilidade. Atuamos com base na escuta empática, no respeito e
            na proteção da privacidade, conectando quem precisa de ajuda a uma
            rede segura de apoio. Inspirado em projetos de referência nacional,
            o Elas por Elas nasce para fortalecer redes de cuidado, ampliar o
            acesso à informação e apoiar a construção de caminhos mais seguros e
            dignos.
          </p>

          <div className="box-sobre">
            <div className="box">
              <img
                src={HeartIcon}
                alt="Coração - Acolhimento"
                className="box-icon"
              />
              <p className="title-box">Acolhimento</p>
              <span>
                Oferecemos um ambiente seguro e acolhedor, onde você pode
                compartilhar sua história sem julgamentos. Nosso time de
                voluntárias está preparado para ouvir e apoiar você.
              </span>
            </div>

            <div className="box">
              <img
                src={ShieldIcon}
                alt="Escudo - Proteção"
                className="box-icon"
              />
              <p className="title-box">Proteção</p>
              <span>
                Garantimos total sigilo e segurança. Todas as informações
                compartilhadas são tratadas com confidencialidade e respeito à
                sua privacidade.
              </span>
            </div>

            <div className="box">
              <img src={UsersIcon} alt="Usuários - Rede" className="box-icon" />
              <p className="title-box">Rede de Apoio</p>
              <span>
                Conectamos você com uma rede de mulheres preparadas para
                oferecer suporte emocional, orientação prática e encaminhamentos
                seguros.
              </span>
            </div>
          </div>
        </section>

        <section id="como-funciona">
          <h2 className="titulo-sections">COMO FUNCIONA?</h2>
          <p className="info">
            Nosso processo é simples, seguro e totalmente confidencial. Você
            está no controle durante todo o caminho.
          </p>

          <div className="box-como-funciona">
            <div className="box">
              <div className="info-numero">1</div>

              <img
                src={Chat}
                alt="Coração - Acolhimento"
                className="box-icon"
              />
              <p className="title-box">Entre em contato</p>
              <span>
                A mulher pode solicitar acolhimento de forma simples, segura e,
                se desejar, anônima.
              </span>
            </div>

            <div className="box">
              <div className="info-numero">2</div>
              <img src={Arrow} alt="arrow" className="arrow" />
              <img
                src={UserCheck}
                alt="Escudo - Proteção"
                className="box-icon"
              />
              <p className="title-box">Acolhimento inicial</p>
              <span>
                Uma de nossas voluntárias entrará em contato para entender sua
                situação e identificar as melhores formas de ajudar você.
              </span>
            </div>

            <div className="box">
              <div className="info-numero">3</div>
              <img src={Arrow} alt="arrow" className="arrow" />

              <img src={Hand} alt="Usuários - Rede" className="box-icon" />
              <p className="title-box">Rede de Apoio</p>
              <span>
                A mulher é direcionada para serviços, voluntárias ou
                instituições adequadas à sua necessidade.
              </span>
            </div>
          </div>
        </section>

        <section id="rede-apoio">
          <h2 className="titulo-sections">REDE DE ACOLHIMENTO</h2>
          <p className="info">
            Oferecemos uma rede completa de apoio com profissionais voluntárias
            e parceiras comprometidas com a sua segurança e bem-estar.
          </p>

          <div className="rede-acolhedora">
            <div className="box">
              <img
                src={Scale}
                alt="Coração - Acolhimento"
                className="box-icon"
              />
              <p className="title-box">Orientação Jurídica</p>
              <span>
                Advogadas voluntárias oferecem orientação sobre medidas
                protetivas, divórcio, guarda e pensão alimentícia.{" "}
              </span>
            </div>

            <div className="box">
              <img src={Brain} alt="Escudo - Proteção" className="box-icon" />
              <p className="title-box">Apoio Psicológico</p>
              <span>
                Psicólogas especializadas em trauma e violência doméstica para
                ajudar no processo de recuperação emocional.
              </span>
            </div>

            <div className="box">
              <img src={House} alt="Usuários - Rede" className="box-icon" />
              <p className="title-box">Abrigo Temporário</p>
              <span>
                Parceria com casas de acolhimento para situações de emergência
                quando você precisar de um lugar seguro.
              </span>
            </div>
            <div className="box">
              <img src={BriefCase} alt="Usuários - Rede" className="box-icon" />
              <p className="title-box">Capacitação Profissional</p>
              <span>
                Cursos e workshops para desenvolvimento de habilidades e
                reinserção no mercado de trabalho.
              </span>
            </div>
            <div className="box">
              <img src={Baby} alt="Usuários - Rede" className="box-icon" />
              <p className="title-box">Apoio à Maternidade</p>
              <span>
                Suporte para mães em situação de vulnerabilidade, incluindo
                orientação sobre direitos e cuidados.
              </span>
            </div>
            <div className="box">
              <img
                src={HeartHandshake}
                alt="Usuários - Rede"
                className="box-icon"
              />
              <p className="title-box">Grupos de Apoio</p>
              <span>
                Encontros virtuais e presenciais com outras mulheres que
                passaram por situações semelhantes.
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Logo & description */}
            <div className="footer-logo-section">
              <div className="footer-logo">
                <span className="footer-logo-text">
                  Elas<span className="footer-logo-highlight">por</span>Elas
                </span>
              </div>
              <p className="footer-description">
                Somos uma organização dedicada a apoiar mulheres em situação de
                vulnerabilidade, oferecendo acolhimento, orientação e uma rede
                de suporte segura.
              </p>
              <div className="footer-social">
                <a href="#" className="social-icon">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="social-svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="social-icon">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="social-svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="footer-links">
              <h4 className="footer-title">Links Úteis</h4>
              <ul className="footer-list">
                <li>
                  <a href="#sobre" className="footer-link">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#como-funciona" className="footer-link">
                    Como funciona
                  </a>
                </li>
                <li>
                  <a href="#rede-apoio" className="footer-link">
                    Serviços
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Seja voluntária
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Política de Privacidade
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-contact">
              <h4 className="footer-title">Contato</h4>
              <ul className="footer-list">
                <li className="footer-contact-item">
                  <span>0800 123 4567</span>
                </li>
                <li className="footer-contact-item">
                  <span>contato@elasporelas.org</span>
                </li>
                <li className="footer-contact-item">
                  <span>Atendimento online 24 horas em todo o Brasil</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Elas por Elas. Todos os direitos reservados.</p>
            <p className="footer-bottom-text">
              Feito com ❤️ para mulheres que precisam de apoio.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
