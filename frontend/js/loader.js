// frontend/js/core/loader.js
import { getProjectData } from './data.js';

/**
 * Carrega e renderiza o mapa de projetos estáticos.
 * @param {HTMLElement} container - Elemento onde o mapa será renderizado.
 */
export function loadProjectMap(container) {
    console.log('[AvaMap] Buscando dados dos projetos...');
    const projects = getProjectData();

    if (!projects || projects.length === 0) {
        console.warn('[AvaMap] Nenhum projeto encontrado.');
        container.innerHTML = '<p>Nenhum projeto disponível no momento.</p>';
        return;
    }

    container.innerHTML = ''; // Limpa o container
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project-card';
        projectElement.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <button onclick="alert('Abrindo ${project.name}')">Abrir</button>
        `;
        container.appendChild(projectElement);
    });
    console.log('[AvaMap] Mapa de projetos carregado com sucesso!');
}

/**
 * Carrega a lista de projetos disponíveis no backend.
 */
export async function loadProjectList() {
    const projectContainer = document.getElementById('project-list');

    try {
        const response = await fetch('/api/projects');
        if (!response.ok) throw new Error('Erro ao carregar a lista de projetos.');

        const projects = await response.json();
        projectContainer.innerHTML = ''; // Limpa o container

        projects.forEach((project) => {
            const projectItem = document.createElement('div');
            projectItem.className = 'project-item';
            projectItem.innerHTML = `
                <h3>${project.name}</h3>
                <button onclick="loadProjectTree('${project.name}')">Abrir</button>
            `;
            projectContainer.appendChild(projectItem);
        });
    } catch (error) {
        console.error('Erro:', error);
        projectContainer.innerHTML = '<p>Não foi possível carregar os projetos.</p>';
    }
}

/**
 * Carrega a árvore de arquivos de um projeto.
 */
export async function loadProjectTree(projectName) {
    const treeContainer = document.getElementById('tree-container');
    try {
        const response = await fetch(`/api/projects/${projectName}/tree`);
        if (!response.ok) throw new Error('Erro ao carregar a árvore do projeto.');

        const treeData = await response.json();
        treeContainer.innerHTML = formatTree(treeData);
    } catch (error) {
        console.error('Erro:', error);
        treeContainer.innerHTML = '<p>Não foi possível carregar a árvore do projeto.</p>';
    }
}

/**
 * Formata a árvore em HTML.
 */
function formatTree(treeData) {
    let html = '<ul>';
    treeData.forEach((item) => {
        if (item.type === 'directory') {
            html += `<li>${item.name}/</li>`;
            html += formatTree(item.children); // Recursão
        } else {
            html += `<li>${item.name}</li>`;
        }
    });
    html += '</ul>';
    return html;
}

// Inicialização
document.addEventListener('DOMContentLoaded', loadProjectList);
