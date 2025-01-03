console.log(`[loader] carregado.`);
import { config } from './config.js';
import { generateFilePaths } from './path.js';

async function loadComponent(type, name) {
    console.log(`[Loader] Iniciando o carregamento do componente "${name}" do tipo "${type}"...`);

    const entry = config[type]?.[name];
    if (!entry) {
        console.error(`[Loader] Componente "${name}" não encontrado no tipo "${type}".`);
        throw new Error(`Componente "${name}" não encontrado no tipo "${type}".`);
    }

    const { html, css, js, functionName } = generateFilePaths(type, entry);
    console.log(`[Loader] Caminhos gerados:`, { html, css, js, functionName });

    const containerId =
        type === "globals" ? `${name}-container` :
        type === "pages" ? "pages-container" :
        `${name}-placeholder`;

    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`[Loader] Container "${containerId}" não encontrado no DOM.`);
        throw new Error(`Container "${containerId}" não encontrado no DOM.`);
    }

    try {
        console.log(`[Loader] Buscando HTML: ${html}`);
        const response = await fetch(html);
        if (!response.ok) {
            console.error(`[Loader] Erro ao carregar HTML: ${html}`, response.status);
            throw new Error(`Erro ao carregar HTML: ${html}`);
        }

        container.innerHTML = await response.text();
        console.log(`[Loader] HTML carregado e inserido para "${name}".`);

        if (css) {
            console.log(`[Loader] Carregando CSS: ${css}`);
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = css;
            document.head.appendChild(link);
            console.log(`[Loader] CSS carregado: ${css}`);
        }

        if (js && functionName) {
            console.log(`[Loader] Carregando módulo JS: ${js}`);
            const module = await import(js);
            const setupFunction = module[functionName] || window[functionName]; // Adiciona fallback para `window`
            if (setupFunction) {
                console.log(`[Loader] Executando função de setup: ${functionName}`);
                setupFunction();
                console.log(`[Loader] Função de setup executada para "${name}".`);
            } else {
                console.warn(`[Loader] Função "${functionName}" não encontrada no módulo JS "${js}".`);
            }
        } else {
            console.log(`[Loader] Nenhum JS associado ao componente "${name}".`);
        }
    } catch (error) {
        console.error(`[Loader] Erro ao carregar componente "${name}": ${error.message}`);
        throw error;
    }
    
    console.log(`[Loader] Carregamento do componente "${name}" concluído.`);
}

export { loadComponent };
