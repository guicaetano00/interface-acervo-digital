import { type JSX } from "react";

function BoasVindas(): JSX.Element {
    return (
        <main className="bg-gray-200 h-[76vh]">
            <h1 className="text-[3rem] pt-20" style={{ textAlign: 'center' }}>Acervo Digital</h1>

            <p className="text-[1.2rem] mt-10" style={{ textAlign: 'center' }}>
                Seja bem-vindo ao acervo digital. Aqui você encontra uma coleção
                completa de conteúdos organizados e acessíveis para facilitar
                sua pesquisa e aprendizado.
            </p>
        </main>
    );
}

export default BoasVindas;