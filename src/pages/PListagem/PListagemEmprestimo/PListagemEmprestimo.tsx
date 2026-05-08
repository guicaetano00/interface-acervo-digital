import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import ListagemEmprestimos from "../../../components/Listagens/ListagemEmprestimos/ListagemEmprestimos";
import Rodape from "../../../components/Rodape/Rodape";

function PListagemEmprestimo(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <ListagemEmprestimos />
            <Rodape />
        </div>
    );
}

export default PListagemEmprestimo;