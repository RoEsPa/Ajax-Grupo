const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const marked = require('marked');

app.use(express.static('public'));
app.use(express.json());

app.get('/api/files', (req, res) => {
    const dir = path.join(__dirname, 'markdowns');

    fs.readdir(dir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading directory' });
        }

        const mdFiles = files.filter(file => path.extname(file) === '.md');
        res.json({ files: mdFiles });
    });
});

app.get('/api/file/:name', (req, res) => {
    const filename = req.params.name;
    const filepath = path.join(__dirname, 'markdowns', filename);

    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }

        const htmlContent = marked.parse(data);
        res.json({ content: htmlContent });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


