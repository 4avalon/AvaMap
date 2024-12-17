// Função principal para carregar a árvore
async function loadProjectTree(projectName) {
    const treeContainer = document.getElementById('project-tree');
    // Modificação no início do JS de tree.html
const urlParams = new URLSearchParams(window.location.search);
const projectName = urlParams.get('project');

if (projectName) {
    console.log(`Carregando árvore do projeto: ${projectName}`);
    loadTree(projectName); // Chama a função que carrega a árvore
} else {
    alert('Nenhum projeto selecionado!');
}


    try {
        // Faz a requisição para buscar a árvore do projeto
        const response = await fetch(`/api/projects/${projectName}/tree`);
        if (!response.ok) throw new Error('Erro ao carregar a árvore do projeto.');

        const treeData = await response.json();
        treeContainer.innerHTML = ''; // Limpa o container antes de renderizar
        renderTree(treeData, treeContainer); // Renderiza a árvore

        console.log('[AvaMap] Árvore carregada com sucesso!');
    } catch (error) {
        console.error(error);
        treeContainer.innerHTML = '<p>Erro ao carregar a árvore do projeto.</p>';
    }
}

// Função recursiva para renderizar a árvore
function renderTree(treeData, container) {
    const ul = document.createElement('ul');

    treeData.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item.name;

        if (item.type === 'directory') {
            li.className = 'directory';
            const subContainer = document.createElement('ul');
            renderTree(item.children, subContainer);
            li.appendChild(subContainer);
        } else {
            li.className = 'file';
            li.onclick = () => loadFileContent(item);
        }

        ul.appendChild(li);
    });

    container.appendChild(ul);
}

// Função para carregar o conteúdo do arquivo
async function loadFileContent(file) {
    const fileContentElement = document.getElementById('file-content');
    const copyButton = document.getElementById('copy-button');

    try {
        const response = await fetch(`/api/projects/file?path=${encodeURIComponent(file.path)}`);
        if (!response.ok) throw new Error('Erro ao carregar o conteúdo do arquivo.');

        const data = await response.json();
        fileContentElement.textContent = data.content;

      
