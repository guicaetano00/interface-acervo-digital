import { type JSX } from "react";

// Importa o componente de cabeçalho da aplicação
import Navegacao from "../../components/Navegacao/Navegacao";

// Importa o componente que contém o formulário de login
import LoginForm from "../../components/Formularios/FormLogin/FormLogin";

import Rodape from "../../components/Rodape/Rodape";


// Componente funcional que representa a página de login
function PLogin(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Renderiza o cabeçalho da página */}
            <Navegacao />

            {/* Renderiza o formulário de login */}
            <LoginForm />

            <Rodape />
        </div>
    );
}

// Exporta o componente para que possa ser usado em outras partes da aplicação
export default PLogin;
