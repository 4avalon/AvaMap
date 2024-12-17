const path = require('path');

// Ajuste o caminho para a pasta correta
const PROJECTS_DIR = path.join(__dirname, '..', '..', '..');
console.log('PROJECTS_DIR:', PROJECTS_DIR); // Log para validar novamente

module.exports = { PROJECTS_DIR };
