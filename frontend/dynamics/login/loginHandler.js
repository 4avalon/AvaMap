function setupLoginEvents() {
    console.log("[setupLoginEvents] Configurando eventos de login...");

    const loginForm = document.getElementById("loginForm");
    const userNameElement = document.getElementById("user-name");
    const loginPanel = document.getElementById("login-panel");

    if (!loginForm || !userNameElement || !loginPanel) {
        console.error("[LoginHandler] Elementos necessários não encontrados no DOM.");
        return;
    }

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            console.log("[LoginHandler] Tentando logar com o backend...");
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error("[LoginHandler] Erro do servidor:", errorMessage);
                userNameElement.textContent = "Erro no Login";
                userNameElement.style.color = "red";
                return;
            }

            const data = await response.json();
            console.log("[LoginHandler] Login bem-sucedido:", data);

            // Verifica se o backend retornou o campo `username`
            const userName = data.username || (data.message && data.message.split(",")[1]?.trim()) || "Usuário";
            if (userName) {
                userNameElement.textContent = userName;
                userNameElement.style.color = "green";
                loginPanel.style.display = "block";
            } else {
                console.error("[LoginHandler] Nome do usuário não encontrado.");
                userNameElement.textContent = "Erro: Nome não encontrado";
                userNameElement.style.color = "red";
            }

        } catch (error) {
            console.error("[LoginHandler] Erro ao conectar ao backend:", error);
            userNameElement.textContent = "Erro ao conectar ao servidor";
            userNameElement.style.color = "red";
        }
    });
}

window.setupLoginEvents = setupLoginEvents;
export { setupLoginEvents };
