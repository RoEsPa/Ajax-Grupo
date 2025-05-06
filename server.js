const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
