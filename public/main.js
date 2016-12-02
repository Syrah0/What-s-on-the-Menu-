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
	$.get("top10-platos-vigentes-restaurant",function(data){
		console.log(data);
		var builder = "<tr> <th> Restaurant </th> <th> Cantidad de Platos </th> </tr>";
		for(var i=0; i<data.length; i++){
			builder += "<tr>"+ "<td>" + data[i].sponsor + "</td>" + "<td>" + data[i].platos+ "</td>" +"</tr>";
		}
		$("#mi-tabla").html(builder);
	});
}

//##################### 4 ####################################
//funcion que recibe datos
function fRestaurantConPlato(){
	var input = $("#nombre").val();
	if(input != ""){
		var datos = {
			"name": "%"+input+"%"
		};
		$.post("restaurant-con-plato",datos,function(data){
			console.log(data);
			var builder = "";
			for(var i=0; i<data.length; i++){
				builder += "<li>"+data[i].sponsor+"</li>";
			}
			$("#mi-lista").html(builder);
		});
	}
	else{
		console.log("Input no valido :v")
		$("#mi-lista").html("");
	}
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

$(document).ready(main);