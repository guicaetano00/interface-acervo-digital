import type { JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import Rodape from "../../components/Rodape/Rodape";
import ListagemLivro from "../../components/Listagem/ListagemLivro/ListagemLivro";

function PLivros(): JSX.Element {
    return (
        <div className="pagina">
            <Navegacao/>
            <ListagemLivro />
            <Rodape />
        </div>
    );
}

export default PLivros;