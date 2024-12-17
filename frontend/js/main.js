// main.js - Inicialização principal do AvaMap

import { loadProjectMap } from './loader.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('[AvaMap] Inicializando aplicação...');
    
    // Seleciona o container principal
    const projectMapContainer = document.querySelector('#project-map');
    
    if (!projectMapContainer) {
        console.error('[AvaMap] Erro: Container #project-map não encontrado!');
        return;
    }

    // Carrega o mapa de projetos
    console.log('[AvaMap] Carregando mapa de projetos...');
    loadProjectMap(projectMapContainer);
});
