class LivroRequests {
    private serverUrl;
    private endpointLivro;

    constructor() {
        this.serverUrl = 'http://localhost:3333';
        this.endpointLivro = '/api/livros';
    }

    async obterListaDeLivros() {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverUrl}${this.endpointLivro}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const listaDeAlunos = await respostaAPI.json();
                return listaDeAlunos;
            } else {
                throw new Error(`Não foi possível listar os livros.`);
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de livros. ${error}`);
            return;
        }
    }

    async obterLivroPorId(id_livro: number) {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverUrl}${this.endpointLivro}/${id_livro}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const livro = await respostaAPI.json();
                return livro;
            } else {
                throw new Error(`Não foi possível obter o livro.`);
            }
        } catch (error) {
            console.error(`Erro ao buscar livro por ID. ${error}`);
            return;
        }
    }
}

export default new LivroRequests;