import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import ListagemAlunos from "../../../components/Listagens/ListagemAlunos/ListagemAlunos";
import Rodape from "../../../components/Rodape/Rodape";

function PListagemAluno(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <ListagemAlunos />
            <Rodape />
        </div>
    );
}

export default PListagemAluno;