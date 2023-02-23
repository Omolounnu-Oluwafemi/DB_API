import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "PASSWORD_DB",
    database: "gibhorizon"
})