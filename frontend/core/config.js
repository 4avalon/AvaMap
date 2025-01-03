//config.js
console.log(`[Config] carregado.`);
const config = {
    globals: {
        nav: { name: "nav", hasJs: true },        // Navbar, tem JS
        footer: { name: "footer", hasJs: false }, // Footer, sem JS
    },
    pages: {

        login: { name: "login", hasJs: false },
        profile: { name: "profile", hasJs: false },
        home: { name: "home", hasJs: false },
        contact: { name: "contact", hasJs: false },
        about: { name: "about", hasJs: false },
    },
    dynamics: {
        carousel: {
        name: "carousel",
        hasJs: true 
        },
        form: { 
            name: "form", 
            hasJs: true 
        }, 
        search: {
            name: "search",
            hasJs: true,
        },
        login: {
            name: "login",
            hasJs: true,
        }, 
        

    },
};

// Exportar configuração para outros módulos (se necessário)
export { config };
