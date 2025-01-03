import { loadComponent } from '../../core/loader.js';

// Gerenciar Login
function setupLoginEvents() {
  // Aguarda o carregamento do DOM
  document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");

    if (!loginForm || !loginMessage) {
      console.error("Elementos do formulário de login não encontrados no DOM.");
      return;
    }

    // Adiciona o evento de submit ao formulário de login
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Evita o reload da página

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          loginMessage.textContent = `Erro: ${errorMessage}`;
          loginMessage.style.color = "red";
          return;
        }

        const data = await response.json();
        loginMessage.textContent = `Bem-vindo, ${data.message}!`;
        loginMessage.style.color = "green";

        // Salva o token e redireciona para o profile
        localStorage.setItem("token", data.token);
        await loadComponent("pages", "profile");
      } catch (error) {
        console.error("Erro ao conectar:", error);
        loginMessage.textContent = "Erro ao conectar ao servidor.";
        loginMessage.style.color = "red";
      }
    });
  });
}


window.setupLoginEvents = setupLoginEvents;

export { setupLoginEvents };
