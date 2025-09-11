// Gerar id aleatório e único
export function gerarId() {
    return crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
}
