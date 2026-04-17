export default interface EmprestimoDTO {
    id_emprestimo: number,
    aluno: {
        id_aluno: number,
        nome?: string,
        sobrenome?: string,
        data_nascimento?: Date,
        endereco?: string,
        email?: string,
        celular?: string,
        ra?: string,
        status_aluno?: boolean
    },
    livro: {
        id_livro: number,
        titulo?: string,
        autor?: string,
        editora?: string,
        ano_publicacao?: string,
        isbn?: string,
        quant_total?: number,
        quant_disponivel?: number,
        quant_aquisicao?: number,
        valor_aquisicao?: number,
        status_livro_emprestado?: string;
        status_livro?: boolean
    },
    data_emprestimo: Date,
    data_devolucao?: Date,
    status_emprestimo?: string,
    status_emprestimo_registro?: boolean
}