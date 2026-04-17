import type { JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import Rodape from "../../components/Rodape/Rodape";
import ListagemEmprestimo from "../../components/Listagem/ListagemEmprestimo/ListagemEmprestimo";

function PEmprestimos(): JSX.Element {
    return (
        <div className="pagina">
            <Navegacao/>
            <ListagemEmprestimo />
            <Rodape />
        </div>
    );
}

export default PEmprestimos;