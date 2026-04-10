
import { type FormEvent, type JSX, useState } from 'react';
import estilo from './FormLogin.module.css';
import AuthRequest from '../../fetch/AuthRequests';

function LoginForm(): JSX.Element {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    interface LoginData {
        email: string;
        senha: string;
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const login: LoginData = { email, senha };

        try {
            if (await AuthRequest.login(login)) {
                window.location.href = '/';
            }
        } catch (error) {
            console.error(`Erro ao tentar fazer login: ${error}`);
            alert('Erro ao fazer login, verifique se o email e a senha estao corretos.');
        }
    };

    return (
        <section className={estilo['login-form-container']}>
            <form action="POST" className={estilo['login-form']} onSubmit={handleSubmit}>
                <p className={estilo['login-overline']}>Autenticacao</p>
                <h2>Login</h2>
                <p className={estilo['login-description']}>
                    Informe suas credenciais para continuar.
                </p>

                <div className={estilo['form-group']}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Informe o seu e-mail"
                        className={estilo['input-email-login']}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />
                </div>

                <div className={estilo['form-group']}>
                    <label htmlFor="senha">Senha</label>
                    <input
                        id="senha"
                        type="password"
                        placeholder="Informe sua senha"
                        className={estilo['input-password-login']}
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        autoComplete="current-password"
                        required
                    />
                </div>

                <input
                    type="submit"
                    value="Entrar"
                    className={estilo['login-button']}
                />
            </form>
        </section>
    );
}

export default LoginForm;
