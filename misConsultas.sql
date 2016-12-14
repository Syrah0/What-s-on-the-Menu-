#vista# Top 10 cantidad de platos que vende cada restaurant:
#HECHA: 2
SELECT COUNT(*) platos, sponsor FROM (SELECT sponsor, T3.dish_id FROM MenuItem T3, (SELECT T2.id, sponsor FROM Menu T1, MenuPage T2 WHERE T2.menu_id = T1.id AND T1.sponsor <> '' AND T1.sponsor <>'?') AS T WHERE T3.menu_page_id = T.id) AS T4 GROUP BY sponsor ORDER BY sponsor,platos;


#vista#(10) Lugar(es) que contiene mas variedad de comidas que aun siguen vigentes:
#HECHA: 3
SELECT COUNT(*) platos, sponsor 
	FROM Menu 
	WHERE sponsor<>'' 
	AND id IN (
		SELECT menu_id 
		FROM menuPage 
		WHERE id IN (
			SELECT menu_page_id 
			FROM MenuItem 
			WHERE dish_id IN (
				SELECT id 
				FROM dish 
				WHERE last_appeared>=2016
				)
			)
		) 
	GROUP BY sponsor 
	ORDER BY platos 
	DESC LIMIT 10;

SELECT COUNT(*) platos, sponsor FROM Menu WHERE sponsor<>'' AND id IN (SELECT menu_id FROM menuPage WHERE id IN (SELECT menu_page_id FROM MenuItem WHERE dish_id IN (SELECT id FROM dish WHERE last_appeared>=2016))) GROUP BY sponsor ORDER BY platos DESC LIMIT 10;	

##vista##Donde se pueden encontrar ciertos platos:
#HECHA: 4
# $1 = '%fish%'
SELECT DISTINCT sponsor 
	FROM menu 
	WHERE id IN (
		SELECT menu_id 
		FROM menuPage 
		WHERE id IN (
			SELECT menu_page_id 
			FROM MenuItem 
			WHERE dish_id IN (
				SELECT id 
				FROM dish 
				WHERE name 
				LIKE $1
				)
			)
		)
	AND sponsor <> '?'
	ORDER BY platos 
	LIMIT 10;

SELECT DISTINCT sponsor FROM menu WHERE id IN (SELECT menu_id FROM menuPage WHERE id IN (SELECT menu_page_id FROM MenuItem WHERE dish_id IN (SELECT id FROM dish WHERE name LIKE $1))) WHERE sponsor <> '?' ORDER BY sponsor limit 10;

#Que platos se sirven cerca de una zona geografica:
#MENU: place -> ID MENU -> ID PAGE -> ID DISH -> NOMBRE
#REVISAR: 5
#$1 = 'YORK'
SELECT DISTINCT name 
	FROM dish 
	Where id IN (
		SELECT dish_id 
		FROM MenuItem 
		WHERE menu_page_id IN (
			SELECT id 
			FROM menuPage 
			WHERE menu_id IN (
				SELECT id 
				FROM menu 
				WHERE place LIKE $1 
				)
			)
		)
	ORDER BY name ASC
	LIMIT 10;

SELECT DISTINCT name FROM dish Where id IN (SELECT dish_id FROM MenuItem WHERE menu_page_id IN (SELECT id FROM menuPage WHERE menu_id IN (SELECT id FROM menu WHERE place LIKE '%YORK%' )))ORDER BY name ASC LIMIT 10;

#Que platos se sirven para cierta ocasion especial:
#MENU: occasion -> ID MENU -> ID PAGE -> ID DISH -> NOMBRE
#REVISAR: 6
#este podria ser consulta con opciones predefinidas
#$1 = ''
SELECT DISTINCT name 
	FROM dish 
	Where id IN (
		SELECT dish_id 
		FROM MenuItem 
		WHERE menu_page_id IN (
			SELECT id 
			FROM menuPage 
			WHERE menu_id IN (
				SELECT id 
				FROM menu 
				WHERE occasion = OCCASION)
			)
		)
	;

SELECT DISTINCT name FROM dish Where id IN (SELECT dish_id FROM MenuItem WHERE menu_page_id IN (SELECT id FROM menuPage WHERE menu_id IN (SELECT id FROM menu WHERE occasion = OCCASION)));

#SELECT id, occasion from menu where occasion <> '' order by occasion desc limit 20;

#Platos tipicos para comer en el desayudo/cena/almuerzo:
#MENU: event -> ID MENU -> ID PAGE -> ID DISH -> NOMBRE
#REVISAR: 7
#este podria ser consulta con opciones predefinidas
SELECT DISTINCT name FROM dish Where id IN (SELECT dish_id FROM MenuItem WHERE menu_page_id IN (SELECT id FROM menuPage WHERE menu_id IN (SELECT id FROM menu WHERE event = EVENT)));


#marcada#Platos tipicos para comer en el desayuno/cena/almuerzo en cierta ocasion especial:
#MENU: event/occasion -> ID MENU -> ID PAGE -> ID DISH -> NOMBRE

SELECT DISTINCT name FROM dish Where id IN (SELECT dish_id FROM MenuItem WHERE menu_page_id IN (SELECT id FROM menuPage WHERE menu_id IN (SELECT id FROM menu WHERE event = EVENT AND occasion = OCCASION)));


#Los (5) platos mas caros por zona geografica especifica(place):
#MENU: PLACE -> ID MENU -> ID PAGE -> ID DISH -> HIGH PRICE 
#REVISAR: 8

SELECT name FROM dish WHERE id IN (SELECT dish_id FROM MenuItem WHERE menu_page_id IN (SELECT id FROM MenuPage WHERE menu_id IN (SELECT id FROM Menu WHERE place = PLACE))) ORDER BY highest_price DESC LIMIT 5;

#
Los (5) platos mas caros de un restaurant:
MENU: sponsor -> ID MENU -> ID PAGE -> ID DISH -> HIGH PRICE 

SELECT name FROM dish WHERE id IN (SELECT dish_id FROM MenuItem WHERE menu_page_id IN (SELECT id FROM MenuPage WHERE menu_id IN (SELECT id FROM Menu WHERE sponsor = SPONSOR))) ORDER BY highest_price DESC LIMIT 5;


Los (5) platos más caros/baratos para realizar en alguna ocasion especial:
MENU: NOMBRE <- ID DISH/HIGH PRICE <- ID PAGE <- ID MENU <- occasion

SELECT DISTINCT name FROM dish WHERE id IN (SELECT dish_id FROM MenuItem WHERE menu_page_id IN (SELECT id FROM menuPage WHERE menu_id IN (SELECT id FROM menu WHERE event = EVENT))) ORDER BY highest_price DESC LIMIT 5;

Lugares que sirven platos entre PRECIO y PRECIO:
DISH: first/last_appeared y high price

SELECT DISTINCT sponsor FROM Menu WHERE id IN (SELECT menu_id FROM MenuPage WHERE id IN (SELECT menu_page_id FROM MenuItem WHERE dish_id IN (SELECT id FROM dish WHERE highest_price BETWEEN PRECIO1 AND PRECIO2)));


Platos que no siguen vigentes desde hace a lo más 10 años:
DISH: LAST_APPEARED

SELECT DISTINCT name FROM dish WHERE last_appeared<2006;*