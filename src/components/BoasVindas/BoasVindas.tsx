import { useState, type JSX } from "react";
import AuthRequests from "../../fetch/AuthRequests";

function BoasVindas(): JSX.Element {

    const [isAuthenticated] = useState(() => {
            const isAuth = localStorage.getItem('isAuth');
            const token = localStorage.getItem('token');
            return !!(isAuth && token && AuthRequests.checkTokenExpiry());
    });

    return (
        <main className="bg-gray-200 h-[76vh]">
            <h1 className="text-[3rem] pt-20" style={{ textAlign: 'center' }}>Acervo Digital</h1>
        {isAuthenticated ? (
        <p className="text-[1.2rem] mt-10" style={{ textAlign: 'center' }}>
                Seja bem-vindo ao acervo digital. Aqui você encontra uma coleção
                completa de conteúdos organizados e acessíveis para facilitar
                sua pesquisa e aprendizado.
            </p>
        ) : (
        <p className="text-[1.2rem] mt-10" style={{ textAlign: 'center' }}>
                Seja bem-vindo ao acervo digital. Por favor, efetue o login para
                acessar o conteúdo do site.
            </p>
        )
    }
            
        </main>
    );
}

export default BoasVindas;