class EmprestimoRequests {
    private serverURL;
    private endpointEmprestimo;

    constructor() {
        this.serverURL = 'http://localhost:3333';
        this.endpointEmprestimo = '/api/emprestimos';
    }

    async obterListaDeEmprestimos() {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverURL}${this.endpointEmprestimo}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const listaDeEmprestimos = await respostaAPI.json();
                return listaDeEmprestimos;
            } else {
                throw new Error("Não foi possível listar os empréstimos.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de empréstimos. ${error}`);
            return;
        }
    }

    // Método novo
    async obterEmprestimoPorId(id_emprestimo: number) {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverURL}${this.endpointEmprestimo}/${id_emprestimo}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const emprestimo = await respostaAPI.json();
                return emprestimo;
            } else {
                throw new Error("Não foi possível obter o empréstimo.");
            }
        } catch (error) {
            console.error(`Erro ao buscar empréstimo por ID. ${error}`);
            return;
        }
    }
}

export default new EmprestimoRequests;