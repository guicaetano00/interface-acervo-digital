class Utilitario {
    formatarData(data: string | Date): string {
        return new Date(data).toLocaleDateString("pt-BR", { timeZone: "UTC" });
    }

    formatarTelefone(telefone: string): string {
        const nums = telefone.replace(/\D/g, "");

        if (nums.length === 11) {
            return nums.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
        } else if (nums.length === 10) {
            return nums.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        }

        return telefone;
    }

    formatarParaReal(valor: number): string {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    }

    formatarDataParaInput(data: string | Date | undefined): string {
        if (!data) return '';
        const d = new Date(data);
        return d.toISOString().split('T')[0];
    }
}

export default new Utilitario;