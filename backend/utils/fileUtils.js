// backend/utils/fileUtils.js
const fs = require('fs');
const path = require('path');

function listProjects(directory) {
    try {
        return fs.readdirSync(directory)
            .filter((item) => 
                fs.statSync(path.join(directory, item)).isDirectory() && item !== '.git'
            )
            .map((project) => ({ name: project, description: 'Projeto disponível' }));
    } catch (err) {
        console.error('Erro ao listar projetos:', err);
        throw err;
    }
}



/**
 * Gera a árvore de arquivos de um projeto específico.
 */
function getProjectTree(projectPath) {
    const tree = [];

    function buildTree(currentPath) {
        const items = fs.readdirSync(currentPath, { withFileTypes: true });
        return items.map((item) => {
            const fullPath = path.join(currentPath, item.name);
            return item.isDirectory()
                ? { name: item.name, type: 'directory', children: buildTree(fullPath) }
                : { name: item.name, type: 'file' };
        });
    }

    return buildTree(projectPath);
}

module.exports = { listProjects, getProjectTree };
