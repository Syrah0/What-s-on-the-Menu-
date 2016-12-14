var pg = require ("pg"); //postgress
var express = require("express"); //express
var bb = require("express-busboy");
var rpg = require("./rest-pg.js"); // Sergio <3
//var conString = "tcp://postgres:postgres@localhost/postgres";
var conString = "tcp://postgres:postgres@localhost/cc3201";

var ap = express(); //application
bb.extend(ap);
ap.use(express.static(__dirname+"/public"));

/*
//consulta de prueba
ap.get("/mejores-platos",rpg.multiSQL({
    dbcon: conString,
    sql: "select id, name from dish limit 30"
}));

//consulta de prueba dos, sin pedir parametros
ap.get("/peores-platos",rpg.multiSQL({
    dbcon: conString,
    sql: "select id, name from dish limit 40"
}));
*/

//##################### 1 ####################################
//consulta que pide datos:
//platos que contienen un nombre dado (como substring)
ap.post("/nombre-platos",rpg.multiSQL({
    dbcon: conString,
    postReqData: ["name"],
    sql: "select id, name from dish where name like $1 limit 10",
    sqlParams: [rpg.sqlParam("post","name")]
}));

//##################### 2 ####################################
//consulta que entrega datos:
//los 10 restaurant que tienen mas platos
ap.get("/top10-platos-restaurant",rpg.multiSQL({
    dbcon: conString,
    sql: "SELECT COUNT(*) as platos, sponsor FROM (SELECT sponsor, T3.dish_id FROM MenuItem T3, (SELECT T2.id, sponsor FROM Menu T1, MenuPage T2 WHERE T2.menu_id = T1.id AND T1.sponsor <> '' AND T1.sponsor <> '?') AS T WHERE T3.menu_page_id = T.id) AS T4 GROUP BY sponsor ORDER BY platos desc, sponsor limit 10;"
}));

//##################### 3 ####################################
//consulta que entrega datos:
//los 10 restaurant que tienen mas platos vigentes
ap.get("/top10-platos-vigentes-restaurant",rpg.multiSQL({
    dbcon: conString,
    sql: "SELECT COUNT(*) platos, sponsor FROM Menu WHERE sponsor<>'' AND id IN (SELECT menu_id FROM menuPage WHERE id IN (SELECT menu_page_id FROM MenuItem WHERE dish_id IN (SELECT id FROM dish WHERE last_appeared>=2016))) GROUP BY sponsor ORDER BY platos DESC LIMIT 10;"
}));

//##################### 4 ####################################
//consulta que pide datos:
//restaurants que contienen un *plato* dado (como substring)
ap.post("/restaurant-con-plato",rpg.multiSQL({
    dbcon: conString,
    postReqData: ["name"],
    sql: "SELECT DISTINCT sponsor FROM menu WHERE sponsor <> '?' AND id IN (SELECT menu_id FROM menuPage WHERE id IN (SELECT menu_page_id FROM MenuItem WHERE dish_id IN (SELECT id FROM dish WHERE name LIKE $1))) ORDER BY sponsor limit 30;",
    sqlParams: [rpg.sqlParam("post","name")]
}));

//##################### 5 ####################################
//no esta testeada
//consulta que pide datos:
//lugares que contienen un *plato* dado (como substring)
ap.post("/lugares-con-plato",rpg.multiSQL({
    dbcon: conString,
    postReqData: ["place"],
    sql: "SELECT DISTINCT name FROM dish Where id IN (SELECT dish_id FROM MenuItem WHERE menu_page_id IN (SELECT id FROM menuPage WHERE menu_id IN (SELECT id FROM menu WHERE place = $1))) ORDER BY name ASC LIMIT 10;",
    sqlParams: [rpg.sqlParam("post","place")]
}));

//##################### 6 ####################################
//en proceso

//##################### 7 ####################################



//port = 80 -> localhost/
//posrt = 5417 -> localhost:5417/
//si conecta desde servidor del grupo
//poner port = 80 -> http://cc3201.dcc.uchile.cl/grupo17/
var port = 5417
var server = require("http").createServer(ap);
server.listen(port,function(){
    console.log("server running...");
});




//SELECT * FROM pg_user; consultar usuarios
