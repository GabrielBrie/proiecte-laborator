const http = require('http');
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');

const uploadDir = 'C:/Uploads';

// Creează directorul dacă nu există
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

http.createServer((req, res) => {
    if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Eroare la incarcare.');
            }

            const oldPath = files.fisierul.filepath;
            const newPath = path.join(uploadDir, files.fisierul.originalFilename);

            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    return res.end('Eroare la mutarea fisierului.');
                }

                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Fisierul a fost incarcat cu succes in C:/Uploads/');
            });
        });
    } else {
        // Afișează formularul
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <h2>Incarca un fisier text</h2>
            <form action="/upload" method="post" enctype="multipart/form-data">
                <input type="file" name="fisierul" accept=".txt" required><br><br>
                <input type="submit" value="Trimite fisierul">
            </form>
        `);
    }
}).listen(8080);

console.log('Serverul de upload ruleaza pe http://localhost:8080');
