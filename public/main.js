function main(){
	console.log("Hola");
}

//##################### 1 ####################################
//funcion que recibe datos
function ftest(){
	var input = $("#nombre").val(); //input = .....; var input2 = .....
	if(input != ""){
		var datos = {
			"name": "%"+input+"%" //agregar "a": "%" + input + "%","b": "%" + input2 + "%"
		};
		$.post("nombre-platos",datos,function(data){ //relacionado con food postReqData...
			console.log(data);
			var builder = "<tr><th> Restaurant </th></tr>";
			for(var i=0; i<data.length; i++){
				builder += "<tr>"+ "<td>" +data[i].name+"</td>" +"</tr>";
			}
			$("#mi-tabla").html(builder);
		});
	}
	else{
		console.log("Input no valido :v");
		$("#mi-tabla").html("");
	}
}

//########### DESDE AQUI SON LAS CONSULTAS VALIDAS ####################################

//##################### 2 y 3 ####################################
//funcion solo hace consulta
function fTop10PlatosRestaurant(){
	$.get("top10-platos-vigentes-restaurant",function(data){
		console.log(data);

		//var header = "<tr> <th> Numero </th> <th>Restaurant</th> <th>Platos</th> </tr>";
		//$("#header-table1").html(header);

		//Guardamos restaurantes
		var builder = "<tr> <th> Numero </th> <th>Restaurant</th> <th>Platos</th> </tr>";

		for(var i=0; i<data.length; i++){
			builder += "<tr> <th> #"+ (i+1) + "</th> <td>" + data[i].sponsor + "</td> <td>" + data[i].platos+ "</td> </tr>";
		}
		builder += "";
		$("#my-table1").html(builder);
		
	});
	showSimple('.Boton1', '.back1');
	console.log("Llega a query uno");
}


//##################### 4 ####################################
//funcion que recibe datos
function fRestaurantConPlato(){
	console.log("Llega a query dos");
	var input = $("#plato2").val();
	if(input != ""){
		var datos = {
			"name": "%"+input+"%"
		};
		$.post("restaurant-con-plato",datos,function(data){
			console.log(data);
			var builder = "<tr> <th> Numero </th> <th>Restaurant</th> </tr>";
			for(var i=0; i<data.length; i++){
				builder += "<tr> <th> #" + (i+1) + "</th> <td>" +data[i].sponsor+"</td> </tr>";
			}
			$("#my-table2").html(builder);
		});
	}
	else{
		console.log("Input no valido :v")
		$("#my-table2").html("");
	}

}

//##################### 5 ####################################
//funcion que recibe datos
function fLugaresConPlato(){
	console.log("Llega a query tres");
	var input = $("#plato3").val();
	if(input != ""){
		var datos = {
			"place": "%"+input+"%"
		};
		$.post("lugares-con-plato",datos,function(data){
			console.log(data);
			var builder = "<tr> <th> Numero </th> <th>Lugar</th> </tr>";
			for(var i=0; i<data.length; i++){
				builder += "<tr> <th> #" + (i+1) + "</th> <td>" +data[i].name+"</td> </tr>";
			}
			$("#my-table3").html(builder);
		});

	}
	else{
		console.log("Input no valido :v")
		$("#my-table3").html("");
	}
}

//##################### 6 ####################################
//funcion que recibe datos
function fplatosParaOcasion(){
	console.log("Llega a query cuatro");
	var input = $("#plato4").val();
	if(input != ""){
		var datos = {
			"occasion": "%"+input+"%"
		};
		$.post("platos-para-ocasion",datos,function(data){
			console.log(data);
			var builder = "<tr> <th> Numero </th> <th>Platos</th> </tr>";
			for(var i=0; i<data.length; i++){
				builder += "<tr> <th> #" + (i+1) + "</th> <td>" +data[i].name+"</td> </tr>";
			}
			$("#my-table4").html(builder);
		});
	}
	else{
		console.log("Input no valido :v")
		$("#my-table4").html("");
	}
}

//##################### 7 ####################################
//funcion que recibe datos
function fplatosParaEvento(){
	console.log("Llega a query cinco");
	var input = $("#plato5").val();
	if(input != ""){
		var datos = {
			"event": "%"+input+"%"
		};
		$.post("platos-para-evento",datos,function(data){
			console.log(data);
			var builder = "<tr> <th> Numero </th> <th>Platos</th> </tr>";
			for(var i=0; i<data.length; i++){
				builder += "<tr> <th> #" + (i+1) + "</th> <td>" +data[i].name+"</td> </tr>";
			}
			$("#my-table5").html(builder);
		});
	}
	else{
		console.log("Input no valido :v")
		$("#my-table5").html("");
	}
}

//##################### 8 ####################################
//funcion que recibe datos
function fplatosParaEventoConOcasion(){
	console.log("Llega a query seis");
	var inputA = $("#plato6a").val();
	var inputB = $("#plato6b").val();
	if(input != ""){
		var datos = {
			"event": "%"+inputA+"%",
			"occasion": "%"+inputB+"%"
		};
		$.post("platos-para-evento-con-ocasion",datos,function(data){
			console.log(data);
			var builder = "<tr> <th> Numero </th> <th>Platos</th> </tr>";
			for(var i=0; i<data.length; i++){
				builder += "<tr> <th> #" + (i+1) + "</th> <td>" +data[i].name+"</td> </tr>";
			}
			$("#my-table6").html(builder);
		});
	}
	else{
		console.log("Input no valido :v")
		$("#my-table6").html("");
	}
}

//##################### 9 ####################################
//funcion que recibe datos
function fplatosMasCarosPorLugar(){
	console.log("Llega a query siete");
	var input = $("#plato7").val();
	if(input != ""){
		var datos = {
			"place": "%"+input+"%"
		};
		$.post("platos-mas-caros-por-lugar",datos,function(data){
			console.log(data);
			var builder = "<tr> <th> Numero </th> <th>Plato</th> <th>Precio</th></tr>";
			for(var i=0; i<data.length; i++){
				builder += "<tr> <th> #" + (i+1) + "</th> <td>" +data[i].name+ "</td> <td>" + data[i].highest_price + "</td> </tr>";
			}
			$("#my-table7").html(builder);
		});
	}
	else{
		console.log("Input no valido :v")
		$("#my-table7").html("");
	}
}

//##################### 10 ####################################
//funcion que recibe datos
function fplatosMasCarosPorRestaurant(){
	console.log("Llega a query ocho");
	var input = $("#plato8").val();
	if(input != ""){
		var datos = {
			"sponsor": "%"+input+"%"
		};
		$.post("platos-mas-caros-por-restaurant",datos,function(data){
			console.log(data);
			var builder = "<tr> <th> Numero </th> <th>Plato</th> <th>Precio</th></tr>";
			for(var i=0; i<data.length; i++){
				builder += "<tr> <th> #" + (i+1) + "</th> <td>" +data[i].name+ "</td> <td>" + data[i].highest_price + "</td> </tr>";
			}
			$("#my-table8").html(builder);
		});
	}
	else{
		console.log("Input no valido :v")
		$("#my-table8").html("");
	}
}

//##################### 11 ####################################
//funcion que recibe datos
function fplatosMasCarosPorEvento(){
	console.log("Llega a query nueve");
	var input = $("#plato9").val();
	if(input != ""){
		var datos = {
			"event": "%"+input+"%"
		};
		$.post("platos-mas-caros-para-evento",datos,function(data){
			console.log(data);
			var builder = "<tr> <th> Numero </th> <th>Plato</th> <th>Precio</th></tr>";
			for(var i=0; i<data.length; i++){
				builder += "<tr> <th> #" + (i+1) + "</th> <td>" +data[i].name+ "</td> <td>" + data[i].highest_price + "</td> </tr>";
			}
			$("#my-table9").html(builder);
		});
	}
	else{
		console.log("Input no valido :v")
		$("#my-table9").html("");
	}
}

//##################### 12 ####################################
//funcion que recibe datos
function frestaurantesConPreciosPorRango(){
	console.log("Llega a query diez");
	var inputA = $("#plato10a").val();
	var inputB = $("#plato10b").val();
	if(input != ""){
		var datos = {
			"low_price": "%"+inputA+"%",
			"high_price": "%"+inputB+"%"
		};
		$.post("restaurant-por-rango-de-precios",datos,function(data){
			console.log(data);
			var builder = "<tr> <th> Numero </th> <th>Restaurantes</th> </tr>";
			for(var i=0; i<data.length; i++){
				builder += "<tr> <th> #" + (i+1) + "</th> <td>" +data[i].sponsor+"</td> </tr>";
			}
			$("#my-table10").html(builder);
		});
	}
	else{
		console.log("Input no valido :v")
		$("#my-table10").html("");
	}
}

//##################### 13 ####################################
//funcion solo hace consulta
function fplatosNoVigentes(){
	$.get("platos-no-vigentes",function(data){
		console.log(data);

		//var header = "<tr> <th> Numero </th> <th>Restaurant</th> <th>Platos</th> </tr>";
		//$("#header-table1").html(header);

		//Guardamos restaurantes
		var builder = "<tr> <th> Numero </th> <th>Platos</th> <th>Ultima aparición</th> </tr>";

		for(var i=0; i<data.length; i++){
			builder += "<tr> <th> #" + (i+1) + "</th> <td>" +data[i].name+ "</td> <td>" + data[i].last_appeared + "</td> </tr>";
		}
		builder += "";
		$("#my-table11").html(builder);
		
	});
	showSimple('.Boton11', '.back11');
	console.log("Llega a query once");
}



//##################### FUNCIONES EXTRAS ####################################

function showSimple(buttonQuery, buttonBack) {
	//back();
  	//console.log("Llega a query dos");
  	$(buttonQuery).slideUp();

  	$(buttonBack).slideDown();
}

function showForm(buttonQuery, formQuery, buttonBack) {
	//back();
  	//console.log("Llega a query dos");
  	$(buttonQuery).slideUp();
  	$(formQuery).slideDown();
  	$(buttonBack).slideDown();
}

function backSimple(buttonQuery, buttonBack, createdTable){
	$(buttonQuery).slideDown();	

	$(buttonBack).slideUp();

	$(createdTable).html("");
}

function backForm(buttonQuery, formQuery, buttonBack, createdTable){
	$(buttonQuery).slideDown();	
	$(formQuery).slideUp();
	$(buttonBack).slideUp();
	
	$(createdTable).html("");
}


function back() {
  	$(".back1").slideUp();
  	$(".back2").slideUp();  
  	$(".Consulta2").slideUp();
  	//$(".Query2").slideUp();
  	//$(".Query3").slideUp();
  	//$(".Query4").slideUp();
  	//$(".Query5").slideUp();
  	//$(".Query6").slideUp();
  	//$(".Query7").slideUp();
  	//$(".Query8").slideUp();
  	//$(".Query9").slideUp();
	
  	$(".Boton1").slideDown();
  	$(".Boton2").slideDown();
  	//$('#submissions').slideUp();
  	//$('#results_table').slideUp();
  	//resetConsulta1();
	//resetConsulta2();
}



$(document).ready(main);