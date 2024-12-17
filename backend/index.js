const express = require('express');
const path = require('path');
const fs = require('fs');
const { listProjects, getProjectTree } = require('./utils/fileUtils');
const { PROJECTS_DIR } = require('./data/projectsDir');

const app = express();
const PORT = 3000;

// Middleware para aceitar JSON
app.use(express.json());

// Rota para listar todos os projetos
app.get('/api/projects', (req, res) => {
    try {
        const projects = listProjects(PROJECTS_DIR);
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao listar os projetos.' });
    }
});

// Rota para obter a árvore de arquivos de um projeto específico
app.get('/api/projects/:projectName/tree', (req, res) => {
    const { projectName } = req.params;
    const projectPath = path.join(PROJECTS_DIR, projectName);

    if (!fs.existsSync(projectPath)) {
        return res.status(404).json({ message: 'Projeto não encontrado.' });
    }

    try {
        const tree = getProjectTree(projectPath);
        res.json(tree);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao gerar a árvore do projeto.' });
    }
});

// 🔥 NOVO ENDPOINT: Carregar conteúdo do arquivo específico
app.get('/api/projects/file', (req, res) => {
    const { path: filePath } = req.query; // Caminho do arquivo vindo da query
    const fullPath = path.join(PROJECTS_DIR, filePath); // Caminho completo

    if (!fs.existsSync(fullPath)) {
        return res.status(404).json({ message: 'Arquivo não encontrado.' });
    }

    try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        res.json({ content }); // Retorna o conteúdo do arquivo
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao carregar o arquivo.' });
    }
});

// Servidor rodando
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
