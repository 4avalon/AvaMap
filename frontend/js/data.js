// data.js - Dados simulados dos projetos

/**
 * Retorna a lista de projetos disponíveis.
 * @returns {Array} Lista de projetos com nome, descrição e caminho.
 */
export function getProjectData() {
    return [
        {
            name: "Avalume",
            description: "Projeto principal com funcionalidades de backend e frontend organizados.",
            path: "./Avalume/"
        },
        {
            name: "SwordPixelArt",
            description: "Ferramenta para manipular e converter imagens para pixel art.",
            path: "./SwordPixelArt/"
        },
        {
            name: "AvaMap",
            description: "Mapa interativo dos projetos organizados da Avalon.",
            path: "./AvaMap/"
        }
    ];
}
