import { type JSX } from "react";

function ListagemAlunos(): JSX.Element {
    return (
        <main> { }
            <h1>Listagem de Alunos</h1>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>RA</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
            </table>
        </main>
    );
}

export default ListagemAlunos;