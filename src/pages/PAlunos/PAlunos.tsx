import type { JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import Rodape from "../../components/Rodape/Rodape";
import ListagemAluno from "../../components/Listagem/ListagemAluno/ListagemAluno";

function PAlunos(): JSX.Element {
    return (
        <div className="pagina">
            <Navegacao/>
            <div className="pagina-conteudo">
                <ListagemAluno />
            </div>
            <Rodape />
        </div>
    );
}

export default PAlunos;