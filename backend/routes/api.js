app.get('/api/projects', (req, res) => {
    res.json([{ name: 'AvaMap', description: 'Mapa dos Projetos' }]);
});
