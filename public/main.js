function main(){
	console.log("Hola");
}

//##################### 1 ####################################
//funcion que recibe datos
function ftest(){
	var input = $("#nombre").val();
	if(input != ""){
		var datos = {
			"name": "%"+input+"%"
		};
		$.post("nombre-platos",datos,function(data){
			console.log(data);
			var builder = "";
			for(var i=0; i<data.length; i++){
				builder += "<li>"+data[i].name+"</li>";
			}
			$("#mi-lista").html(builder);
		});
	}
	else{
		console.log("Input no valido :v");
		$("#mi-lista").html("");
	}
}

//##################### 2 y 3 ####################################
//funcion solo hace consulta
function fTop10PlatosRestaurant(){
	$(".Boton1").slideUp();
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
	$(".back1").slideDown();
	console.log("Llega a query uno");
}

function resetConsulta1(){
	$("#my-table1").html("");
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

function resetConsulta2(){
	$("#my-table2").html("");
}

//##################### 5 ####################################
//funcion que recibe datos
function fLugaresConPlato(){
	var input = $("#nombre").val();
	if(input != ""){
		var datos = {
			"place": "%"+input+"%"
		};
		$.post("restaurant-con-plato",datos,function(data){
			console.log(data);
			var builder = "";
			for(var i=0; i<data.length; i++){
				builder += "<li>"+data[i].name+"</li>";
			}
			$("#mi-lista").html(builder);
		});
	}
	else{
		console.log("Input no valido :v")
		$("#mi-lista").html("");
	}
}

function showQ1() {
	back();
  	//console.log("Llega a query dos");
  	$(".Boton2").slideUp();
  	$(".Consulta2").slideDown();
  	$(".back2").slideDown();
}

function showForm(buttonQuery, formQuery, buttonBack) {
	back();
  	//console.log("Llega a query dos");
  	$(buttonQuery).slideUp();
  	$(inputQuery).slideDown();
  	$(buttonBack).slideDown();
}

function backForm(buttonQuery){
	$(".Boton1").slideDown();
	$(".back1").slideUp();
	$(".Consulta2").slideUp();
	
	$("#mi-lista").html("");
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
  	resetConsulta1();
	  resetConsulta2();
}



$(document).ready(main);