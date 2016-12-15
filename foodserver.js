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
    postReqData: ["name"], // : ["a","b"]
    sql: "select id, name from wotm.dish where name like $1 limit 30;",
    sqlParams: [rpg.sqlParam("post","name")] // : [rpg.sqlParam("post","a"), rpg.sqlParam("post","b")]
}));

//##################### 2 ####################################
//consulta que entrega datos:
//los 10 restaurant que tienen mas platos
ap.get("/top10-platos-restaurant",rpg.multiSQL({
    dbcon: conString,
    sql: "select count(*) platos, sponsor from (select sponsor, T3.dish_id from wotm.MenuItem T3, (select T2.id, sponsor from wotm.Menu T1, wotm.MenuPage T2 where T2.menu_id = T1.id and T1.sponsor <> '' and T1.sponsor <>'?') AS T where T3.menu_page_id = T.id) AS T4 group by sponsor order by sponsor,platos limit 10;"
}));

//##################### 3 ####################################
//consulta que entrega datos:
//los 10 restaurant que tienen mas platos vigentes
ap.get("/top10-platos-vigentes-restaurant",rpg.multiSQL({
    dbcon: conString,
    sql: "select count(*) platos, sponsor from wotm.Menu where sponsor<>'' and id in (select menu_id from wotm.menuPage where id in (select menu_page_id from wotm.MenuItem where dish_id in (select id from wotm.dish where last_appeared>=2016))) group by sponsor order by platos desc limit 10;"p
}));

//##################### 4 ####################################
//consulta que pide datos:
//restaurants que contienen un *plato* dado (como substring)
ap.post("/restaurant-con-plato",rpg.multiSQL({
    dbcon: conString,
    postReqData: ["name"],
    sql: "select distinct sponsor, name from wotm.dishrelation where LOWER(name) LIKE LOWER($1) AND sponsor<>'?' LIMIT 30;",
    sqlParams: [rpg.sqlParam("post","name")]
}));

//##################### 5 ####################################
//no esta testeada
//consulta que pide datos:
//platos que se sirven en cierto lugar
ap.post("/lugares-con-plato",rpg.multiSQL({
    dbcon: conString,
    postReqData: ["place"],
    sql: "select distinct name from wotm.dishrelation where LOWER(place) LIKE LOWER($1) LIMIT 30;",
    sqlParams: [rpg.sqlParam("post","place")]
}));

//##################### 6 ####################################
//en proceso
//platos que se sirven para alguna ocasion especial
ap.post("/platos-para-ocasion", rpg.multiSQL({
    dbcon: conString,
    postReqData: ["occasion"],
    sql: "select distinct name from wotm.dishrelation where LOWER(occasion) LIKE LOWER($1) LIMIT 30", 
    sqlParams: [rpg.sqlParam("post","occasion")]
}));

//##################### 7 ####################################
//platos que se sirven para algun evento
ap.post("/platos-para-evento", rpg.multiSQL({
    dbcon: conString,
    postReqData: ["event"],
    sql: "select distinct name from wotm.dishrelation where LOWER(event) LIKE LOWER($1) LIMIT 30;", 
    sqlParams: [rpg.sqlParam("post","event")]
}));

//##################### 8 ####################################
//platos que se sirven para algun evento y ocasion especial
ap.post("/platos-para-evento-con-ocasion", rpg.multiSQL({
    dbcon: conString,
    postReqData: ["event","occasion"],
    sql: "select distinct name from wotm.dishrelation where LOWER(event) LIKE LOWER($1) and LOWER(occasion) LIKE LOWER($2) LIMIT 30;",
    sqlParams: [rpg.sqlParam("post","event"),rpg.sqlParam("post","occasion")],
}));

//##################### 9 ####################################
//platos mas caros para un lugar dado
ap.post("/platos-mas-caros-por-lugar", rpg.multiSQL({
    dbcon: conString,
    postReqData: ["place"],
    sql: "select distinct name,highest_price from wotm.dishrelation where lower(place) LIKE lower($1) AND highest_price>0 ORDER BY highest_price DESC LIMIT 5;",
    sqlParams: [rpg.sqlParam("post","place")]
}));

//##################### 10 ####################################
//platos mas caros de un restaurant
ap.post("/platos-mas-caros-por-restaurant", rpg.multiSQL({
    dbcon: conString,
    postReqData: ["sponsor"],
    sql: "select distinct name,highest_price from wotm.dishrelation where lower(sponsor) LIKE lower($1) AND highest_price>0 ORDER BY highest_price DESC LIMIT 5;",
    sqlParams: [rpg.sqlParam("post","sponsor")]
}));

//##################### 11 ####################################
//platos mas caros para un evento
ap.post("/platos-mas-caros-para-evento", rpg.multiSQL({
    dbcon: conString,
    postReqData: ["event"],
    sql: "select distinct name,highest_price from wotm.dishrelation where lower(event) LIKE lower($1) AND highest_price>0 ORDER BY highest_price DESC LIMIT 5;",
    sqlParams: [rpg.sqlParam("post","event")]
}));
 
//##################### 12 ####################################
//restaurante con platos dentro de rango de precio dado
ap.post("/restaurant-por-rango-de-precios", rpg.multiSQL({
    dbcon: conString,
    postReqData: ["low_price","high_price"],
    sql: "select distinct sponsor from wotm.dishrelation where highest_price BETWEEN $1 AND $2 LIMIT 30;",
    sqlParams: [rpg.sqlParam("post","low_price"),rpg.sqlParam("post","high_price")]
}));
 
//##################### 13 ####################################
//platos no vigentes desde la ultima decada
ap.get("/platos-no-vigentes", rpg.multiSQL({
    dbcon: conString,
    sql: "select distinct name, last_appeared from wotm.dish where last_appeared <> 0 AND last_appeared<2006 ORDER BY last_appeared DESC LIMIT 50;"
}));



//port = 80 -> localhost/
//posrt = 5417 -> localhost:5417/
//si conecta desde servidor del grupo
//poner port = 80 -> http://cc3201.dcc.uchile.cl/grupo17/
var port = 80;
var server = require("http").createServer(ap);
server.listen(port,function(){
    console.log("server running...");
});




//SELECT * FROM pg_user; consultar usuarios
