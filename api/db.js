import mysql from "mysql2"; // <-- Troque mysql por mysql2

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admadm",
    database: "crud_full_stack"
});

db.connect(err => { // <-- Corrigido de "connection" para "db"
    if (err) {
        console.error("Erro de conexão:", err);
    } else {
        console.log("Conectado ao MySQL!");
    }
});
