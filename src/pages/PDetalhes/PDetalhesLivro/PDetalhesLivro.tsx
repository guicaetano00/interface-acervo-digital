import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalhesLivro from "../../../components/Listagens/DetalhesLivro/DetalhesLivro";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";

function PDetalhesLivro(): JSX.Element {
    const { id_livro } = useParams();

    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <DetalhesLivro id_livro={Number(id_livro)} />
            <Rodape />
        </div>
    );
}

export default PDetalhesLivro;