import { type JSX } from "react";
import estilo from "./PLogin.module.css";
import Navegacao from "../../components/Navegacao/Navegacao";
import LoginForm from "../../components/FormLogin/FormLogin";

function PLogin(): JSX.Element {
    return (
        <div className={estilo["login-page"]}>
            <Navegacao />

            <main className={estilo["login-content"]}>
                <section className={estilo["login-hero"]}>
                    <span className={estilo["hero-badge"]}>Area restrita</span>
                    <h1>Acesse o Acervo Digital</h1>
                    <p>
                        Entre com seu email e sua senha para gerenciar alunos, livros
                        e emprestimos em um unico lugar.
                    </p>

                    <div className={estilo["hero-card"]}>
                        <strong>O que voce encontra aqui</strong>
                        <ul>
                            <li>Consulta rapida do acervo escolar</li>
                            <li>Controle organizado de emprestimos</li>
                            <li>Acesso centralizado para a equipe</li>
                        </ul>
                    </div>
                </section>

                <LoginForm />
            </main>
        </div>
    );
}

export default PLogin;