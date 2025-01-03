// frontend/pages/login/loginHandler.js

document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault(); // Evita o reload da página

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const messageElement = document.getElementById("loginMessage");

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
      messageElement.textContent = `Erro: ${errorMessage}`;
      messageElement.style.color = "red"; // Mensagem de erro em vermelho
      return; // Não continua
    }

    const data = await response.json();
    messageElement.textContent = `Bem-vindo, ${data.message}!`;
    messageElement.style.color = "green"; // Mensagem de sucesso em verde

    // Salva o token JWT no localStorage
    localStorage.setItem("token", data.token);

    // Redireciona para a página inicial
    window.location.href = "/frontend/pages/home/home.html";
  } catch (error) {
    console.error("Erro ao conectar:", error);
    messageElement.textContent = "Erro ao conectar ao servidor.";
    messageElement.style.color = "red";
  }
});

// Exibe o nome do usuário se já estiver logado
const token = localStorage.getItem("token");

if (token) {
  try {
    // Decodifica o payload do token (JWT)
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const messageElement = document.getElementById("loginMessage");
    messageElement.textContent = `Olá, ${decoded.username}! Você já está logado.`;
    messageElement.style.color = "blue";
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
  }
}
