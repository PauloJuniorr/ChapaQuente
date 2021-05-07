function funcoes(){
	fazGet();
}


function fazGet() {

	var filme = (document.getElementById('filmeteste').value);

	const settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://movie-database-imdb-alternative.p.rapidapi.com/?s="+filme+"&page=1&r=json",
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "4af577d37amsh9c03112be168792p1c85e8jsnc17de5335054",
			"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
		}
	};
	
	$.ajax(settings).done(function (response) {
		var id = response['Search'][0]['imdbID'];
		document.getElementById('filmeteste').value = id
		console.log(response);

		pegaDado();
		PegaImagem();
	});
}

function pegaDado(){

	var input = (document.getElementById('filmeteste').value);

	const s2 = {
		"async": true,
		"crossDomain": true,
		"url": "https://movie-database-imdb-alternative.p.rapidapi.com/?i="+input+"&r=json",
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "4af577d37amsh9c03112be168792p1c85e8jsnc17de5335054",
			"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
		}
	};

	$.ajax(s2).done(function (link) {
		
		$("#titulo").text(link['Title']);
		$("#nota").text(link['imdbRating']);
		$("#plot").text(link['Plot']);
		$("#Runtime").text(link['Runtime']);
		$("#Genre").text(link['Genre']);
		$("#Year").text(link['Year']);

		var atores = link['Actors'];
		var nomes = atores.split(",");
		$("#ator1").text(nomes[0]);
		$("#ator2").text(nomes[1]);
		$("#ator3").text(nomes[2]);

		console.log(link);
	});	
}


function PegaImagem(){

	var input = (document.getElementById('filmeteste').value)
	

	const s2 = {
		"async": true,
		"crossDomain": true,
		"url": "https://movie-database-imdb-alternative.p.rapidapi.com/?i="+input+"&r=json",
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "4af577d37amsh9c03112be168792p1c85e8jsnc17de5335054",
			"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
		}
	};
	
	$.ajax(s2).done(function (link) {
		$("#titulo").text(link['Title']);
		document.getElementById('filmeteste').value = link['Title'];
		var poster = link['Poster'];
		var img    = document.createElement("IMG"); 
		img.src    = poster
		document.getElementById('img').appendChild(img);
		
		console.log(poster);
		OndeAssistir();
	});

}

function OndeAssistir(){

	var input = (document.getElementById('filmeteste').value)
	console.log(input+"A");
	
	const settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://tandera.p.rapidapi.com/?titulo="+input+"&tipo=mv&ano=2012&pais=br",
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "4af577d37amsh9c03112be168792p1c85e8jsnc17de5335054",
			"x-rapidapi-host": "tandera.p.rapidapi.com"
		}
	};
	
	console.log(input);
	$.ajax(settings).done(function (response) {
		var stream = response['stream'];
		console.log(stream);
		var array  = stream.length;
		array = parseInt(array);

		console.log(array);

		while(array > 0){
			array = array-1;
			var iconeFilme   = response["stream"][array]["logo"];
			var linkFilme    = response["stream"][array]["link"];
			var filmeLogo    = document.createElement("IMG");
			var filmelink    = document.createElement("A");
			filmeLogo.src    = iconeFilme;
			filmelink.href	 = linkFilme;
			filmelink.id     = "Link"+array;

			document.getElementById('iconeFilme'+array).appendChild(filmelink);
			document.getElementById('Link'+array).appendChild(filmeLogo);

		}
		console.log(response);
	})
}
