import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalhesEmprestimo from "../../../components/Listagens/DetalhesEmprestimo/DetalhesEmprestimo";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";

function PDetalhesEmprestimo(): JSX.Element {
    const { id_emprestimo } = useParams();

    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <DetalhesEmprestimo id_emprestimo={Number(id_emprestimo)} />
            <Rodape />
        </div>
    );
}

export default PDetalhesEmprestimo;