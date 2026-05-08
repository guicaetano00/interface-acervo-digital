import { useState, useEffect, type JSX } from "react";
import type LivroDTO from "../../../dto/LivroDTO";
import LivroRequests from "../../../fetch/LivroRequests";
import { useNavigate } from "react-router-dom";

function ListagemLivros(): JSX.Element {

    const [livros, setLivros] = useState<LivroDTO[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [busca, setBusca] = useState("");

    const rowsPerPage = 5;

    const navigate = useNavigate();

    useEffect(() => {

        const buscarLivros = async () => {

            try {

                const lista =
                    await LivroRequests.obterListaDeLivros();

                setLivros(lista || []);

            } catch (error) {

                console.error(error);

                alert("Erro ao buscar livros.");

            }
        };

        buscarLivros();

    }, []);

    // FILTRO

    const livrosFiltrados = livros.filter((livro) => {

        const titulo =
            livro.titulo?.toLowerCase() || "";

        const autor =
            livro.autor?.toLowerCase() || "";

        const isbn =
            livro.isbn?.toLowerCase() || "";

        return (
            titulo.includes(busca.toLowerCase()) ||
            autor.includes(busca.toLowerCase()) ||
            isbn.includes(busca.toLowerCase())
        );

    });

    // PAGINAÇÃO

    const totalPages =
        Math.ceil(livrosFiltrados.length / rowsPerPage);

    const indexOfLastRow =
        currentPage * rowsPerPage;

    const indexOfFirstRow =
        indexOfLastRow - rowsPerPage;

    const currentLivros =
        livrosFiltrados.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = (page: number) => {

        if (page >= 1 && page <= totalPages) {

            setCurrentPage(page);

        }
    };

    return (

        <main className="bg-gray-200 min-h-screen w-full px-3 sm:px-6 py-6 flex justify-center">

            <div className="w-full max-w-7xl">

                {/* TOPO */}

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">

                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                        Livros
                    </h1>

                    <button className="bg-slate-700 text-white px-5 py-3 rounded-xl hover:bg-slate-600 transition-all font-semibold shadow-md w-full sm:w-auto">
                        Novo Livro
                    </button>

                </div>

                {/* BUSCA */}

                <div className="mb-6">

                    <input
                        type="text"
                        placeholder="Buscar livro"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className="
                            w-full
                            p-4
                            rounded-xl
                            border
                            border-slate-300
                            bg-white
                            outline-none
                            focus:ring-2
                            focus:ring-slate-500
                            text-slate-700
                        "
                    />

                </div>

                {/* MOBILE */}

                <div className="grid grid-cols-1 gap-4 lg:hidden">

                    {currentLivros.length > 0 ? (

                        currentLivros.map((livro) => (

                            <div
                                key={livro.id_livro}
                                className="bg-white rounded-2xl shadow-md p-5"
                            >

                                <div className="text-center space-y-2">

                                    <p>
                                        ID:
                                        <strong> {livro.id_livro}</strong>
                                    </p>

                                    <h2 className="text-lg font-bold text-slate-800">
                                        {livro.titulo || "Sem título"}
                                    </h2>

                                    <p className="text-slate-600">
                                        Autor: {livro.autor || "Não informado"}
                                    </p>

                                    <p className="text-slate-600">
                                        ISBN: {livro.isbn || "Não informado"}
                                    </p>

                                    <p className="text-slate-600">
                                        Quantidade: {livro.quant_disponivel || 0}
                                    </p>

                                </div>

                                <div className="flex flex-col sm:flex-row gap-2 mt-4">

                                    <button
                                        onClick={() =>
                                            navigate(`/detalhes/livro/${livro.id_livro}`)
                                        }
                                        className="
                                            flex-1
                                            bg-sky-100
                                            text-sky-700
                                            py-2
                                            rounded-xl
                                            hover:bg-sky-600
                                            hover:text-white
                                            transition-all
                                        "
                                    >
                                        Detalhes
                                    </button>

                                    <button className="
                                        flex-1
                                        bg-emerald-100
                                        text-emerald-700
                                        py-2
                                        rounded-xl
                                        hover:bg-emerald-600
                                        hover:text-white
                                        transition-all
                                    ">
                                        Atualizar
                                    </button>

                                    <button className="
                                        flex-1
                                        bg-red-100
                                        text-red-700
                                        py-2
                                        rounded-xl
                                        hover:bg-red-600
                                        hover:text-white
                                        transition-all
                                    ">
                                        Deletar
                                    </button>

                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="
                            bg-white
                            rounded-2xl
                            shadow-md
                            p-10
                            text-center
                            text-slate-500
                        ">
                            Nenhum livro encontrado
                        </div>

                    )}

                </div>

                {/* DESKTOP */}

                <div className="
                    hidden
                    lg:block
                    bg-white
                    rounded-2xl
                    shadow-md
                    overflow-hidden
                ">

                    <table className="w-full">

                        <thead className="bg-slate-700">

                            <tr>

                                <th className="text-white p-4 text-left">
                                    ID
                                </th>

                                <th className="text-white p-4 text-left">
                                    Título
                                </th>

                                <th className="text-white p-4 text-left">
                                    Autor
                                </th>

                                <th className="text-white p-4 text-left">
                                    ISBN
                                </th>

                                <th className="text-white p-4 text-left">
                                    Quantidade
                                </th>

                                <th className="text-white p-4 text-center">
                                    Ações
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {currentLivros.map((livro) => (

                                <tr
                                    key={livro.id_livro}
                                    className="
                                        border-b
                                        hover:bg-slate-50
                                        transition-all
                                    "
                                >

                                    <td className="p-4">
                                        {livro.id_livro}
                                    </td>

                                    <td className="p-4 font-semibold">
                                        {livro.titulo || "Sem título"}
                                    </td>

                                    <td className="p-4">
                                        {livro.autor || "Não informado"}
                                    </td>

                                    <td className="p-4">
                                        {livro.isbn || "Não informado"}
                                    </td>

                                    <td className="p-4">
                                        {livro.quant_disponivel || 0}
                                    </td>

                                    <td className="p-4">

                                        <div className="
                                            flex
                                            justify-center
                                            gap-2
                                            flex-wrap
                                        ">

                                            <button
                                                onClick={() =>
                                                    navigate(`/detalhes/livro/${livro.id_livro}`)
                                                }
                                                className="
                                                    bg-sky-100
                                                    text-sky-700
                                                    px-3
                                                    py-2
                                                    rounded-lg
                                                    hover:bg-sky-600
                                                    hover:text-white
                                                    transition-all
                                                "
                                            >
                                                Detalhes
                                            </button>

                                            <button className="
                                                bg-emerald-100
                                                text-emerald-700
                                                px-3
                                                py-2
                                                rounded-lg
                                                hover:bg-emerald-600
                                                hover:text-white
                                                transition-all
                                            ">
                                                Atualizar
                                            </button>

                                            <button className="
                                                bg-red-100
                                                text-red-700
                                                px-3
                                                py-2
                                                rounded-lg
                                                hover:bg-red-600
                                                hover:text-white
                                                transition-all
                                            ">
                                                Deletar
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* PAGINAÇÃO */}

                <div className="
                    flex
                    flex-col
                    sm:flex-row
                    items-center
                    justify-between
                    gap-4
                    mt-6
                ">

                    <p className="text-sm text-slate-600">

                        Mostrando
                        {" "}
                        <strong>{indexOfFirstRow + 1}</strong>
                        {" "}até{" "}
                        <strong>
                            {Math.min(indexOfLastRow, livrosFiltrados.length)}
                        </strong>
                        {" "}de{" "}
                        <strong>
                            {livrosFiltrados.length}
                        </strong>

                    </p>

                    <div className="flex gap-3">

                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`
                                px-4
                                py-2
                                rounded-lg
                                transition-all
                                ${currentPage === 1
                                    ? 'bg-gray-300 text-gray-500'
                                    : 'bg-slate-700 text-white hover:bg-slate-600'
                                }
                            `}
                        >
                            ←
                        </button>

                        <span className="
                            font-semibold
                            text-slate-700
                            flex
                            items-center
                        ">
                            {currentPage}/{totalPages || 1}
                        </span>

                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className={`
                                px-4
                                py-2
                                rounded-lg
                                transition-all
                                ${currentPage === totalPages || totalPages === 0
                                    ? 'bg-gray-300 text-gray-500'
                                    : 'bg-slate-700 text-white hover:bg-slate-600'
                                }
                            `}
                        >
                            →
                        </button>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default ListagemLivros;