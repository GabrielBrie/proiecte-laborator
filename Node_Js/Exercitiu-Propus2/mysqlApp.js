const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",      
    user: "root",          
    password: "",           
    database: "testdb"      
});

con.connect(function(err) {
    if (err) {
        console.error("❌ Eroare la conectare:", err.message);
        return;
    }

    console.log("✔️ Conectat cu succes la MySQL!");

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS CLIENTI (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            NUME VARCHAR(255),
            ADRESA VARCHAR(255)
        )
    `;

    con.query(createTableQuery, function(err, result) {
        if (err) {
            console.error("❌ Eroare la crearea tabelei:", err.message);
            return;
        }

        console.log("✔️ Tabela CLIENTI este pregătită.");

        const insertQuery = `
            INSERT INTO CLIENTI (NUME, ADRESA)
            VALUES ?
        `;
        const valori = [
            ['Ana Pop', 'Str. Florilor 1'],
            ['George Radu', 'Bd. Unirii 24'],
            ['Ioana Dumitru', 'Calea București 99']
        ];

        con.query(insertQuery, [valori], function(err, result) {
            if (err) {
                console.error("❌ Eroare la inserare:", err.message);
                return;
            }

            console.log(`✔️ ${result.affectedRows} rânduri au fost inserate.`);
            con.end(); 
        });
    });
});
