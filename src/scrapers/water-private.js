const https = require('https')
var request = require('request');

const proxy = require('node-global-proxy').default;

proxy.setConfig({
	http: "http://135",
	https: "http://185"
	
});

proxy.start();

const proxyingAgent = require('proxying-agent');

var host = "138";
var port = 20185;


var agentOptions = {
	'host': host,
	'port': port,
	path: '/',
	rejectUnauthorized: false
	
};

//agente = new https.Agent(agentOptions);


function json2array(json){
  var result = [];
  var keys = Object.keys(json);
  keys.forEach(function(key){
      result.push(json[key]);
  });
  return result;
}

baseUrl = 'https://backend-farm.plantvsundead.com/farms/';

var tokens= [
"Bearer Token: eyJhbGciOiJIUzI1NiIsInR5ZXNzIjoiMHhjNDODFiZTU0MGNhODU1MDczMjlkODljIiwibG9naW5UaW1lIjoxNjI5NDczNDg0NjI2LCJjcmVhdGVEYXRlIjoiMjAyMS0wOC0xOSAyMjozMTo0NiIsImlhdCI6MTYyOTQ3MzQ4NH0.Eje6Zuid3HzQivvMsnrEf9-e89hYxF5-UEod2xiH26g",
"Bearer Token: eyJhbGciOiJIUzI1NiIsInRXNzIjoiM5ZDU1YjRkZGQ5OGZiNGU5YjRmIiwibG9naW5UaW1lIjoxNjI5ODA5MTAwNzYxLCJjcmVhdGVEYXRlIjoiMjAyMS0wOC0yNCAxMjo0NDo0NSIsImlhdCI6MTYyOTgwOTEwMH0.PaujLclPCllSr4oiiRe36CBDhS3uglutHPgqdGuhlSk",
"Bearer Token: eyJhbGciOiJIUzI1NiIsInRyZXNzIjoiMHg2MjVkZlZjQ0YjVmNmM0ZGI1MTlmNjQzIiwibG9naW5UaW1lIjoxNjI5ODI4ODY4NTQ4LCJjcmVhdGVEYXRlIjoiMjAyMS0wOC0yNCAxODoxMzo1MSIsImlhdCI6MTYyOTgyODg2OH0.BCpMltXq82srlkqZeHFZOTewLgwmsJuShVfD7JxYtIY",
"Bearer Token: eyJhbGciOiJIUzI1NiIjoiMHhlNzhlNWVjYzA5Zm5ZmVlZTcyNmZjNzJlIiwibG9naW5UaW1lIjoxNjI5OTA0MDUzNDI0LCJjcmVhdGVEYXRlIjoiMjAyMS0wOC0yNSAxNTowNTozMSIsImlhdCI6MTYyOTkwNDA1M30.iwjVXatUf7C9X-FWS-yYy_OgEmpUox4KMqIUF2lTxTQ",
"Bearer Token: eyJhbGciOiJoiMHg5NDFkM2IyMGZmYTM2N2MyYmZhY2NTk4NTc0IiwibG9naW5UaW1lIjoxNjMwMjc5NDQ2OTIyLCJjcmVhdGVEYXRlIjoiMjAyMS0wOC0yOSAyMzoyNDowNCIsImlhdCI6MTYzMDI3OTQ0Nn0.JNJgkjKvB948jjRC6H_8Imt-9HpuPiVXwFq-d7iIemE",
"Bearer Token: eyJhZGRmNjkzODA5MGZljc5NjEyMjM0LwOC0yOSAyMzoyNjo0OCIsImlhdCI6MTYzMDI3OTYxMn0.bBjzTFeuJx4PUyH_0JTC162v9cIpAM6bSEI-jqFHKOw",

]

console.log(tokens.length + " tokens guardados!");
var indexOptions = 0;
var options = {
   'method': 'GET',
   'timeout': 15000,
   "headers": {
	'authority': 'backend-farm.plantvsundead.com',
    "accept": "application/json, text/plain, */*",
    "accept-language": "es-419,es;q=0.9,en;q=0.8",
    "authorization": tokens[0],
    "if-none-match": "W/\"44-GNe/fCRiiGB2f0BVwHUW57Yxjss\"",
    "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site"
  }
}

console.log("Cambio de token...\n"+tokens[indexOptions]);
//console.log(options);

const mysqlConnection = require('../database');

function guardarDatosPlanta(planta,riego,cosecha){
	if(riego.length > 4 && cosecha.length > 4){
    var query = "update plantascheck set cosecha = '"+ cosecha +"', riego = '"+ riego +"' where id = '"+ planta +"';";
    //console.log(query);
	var resultado = "";
    mysqlConnection.query(query,(err,rows,fields) =>{

        if (!err){
			resultado = rows;
        }
        return resultado;
    });
	}
}


    //1"authorization": "Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNBZGRyZXNzIjoiMHhiZTlkYTcwZjg5OTJlYTY5ZGE0ZTQ5ZDU1YjRkZGQ5OGZiNGU5YjRmIiwibG9naW5UaW1lIjoxNjI5ODA5MTAwNzYxLCJjcmVhdGVEYXRlIjoiMjAyMS0wOC0yNCAxMjo0NDo0NSIsImlhdCI6MTYyOTgwOTEwMH0.PaujLclPCllSr4oiiRe36CBDhS3uglutHPgqdGuhlSk",
	//2"authorization": "Bearer Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNBZGRyZXNzIjoiMHhlNzhlNWVjYzA5ZmY1ZTNhNjgyMGJhYjExYTY5ZmVlZTcyNmZjNzJlIiwibG9naW5UaW1lIjoxNjI5OTA0MDUzNDI0LCJjcmVhdGVEYXRlIjoiMjAyMS0wOC0yNSAxNTowNTozMSIsImlhdCI6MTYyOTkwNDA1M30.iwjVXatUf7C9X-FWS-yYy_OgEmpUox4KMqIUF2lTxTQ",

var contadorFails = 0;


async function fetch(direccion) {
  return new Promise((resolve, reject) => {
    const request = https.get(baseUrl+direccion, options, (res) => {
      if (res.statusCode < 200 || res.statusCode > 299) 
        console.log(res.statusCode + " " + (new Date()).toUTCString());
		
		contadorFails += 1;
		if (contadorFails>3){
			contadorFails = 0;
			indexOptions+=1;
			optionsTemp = options;
			optionsTemp.headers.authorization = tokens[indexOptions];
			options = optionsTemp;
			console.log("Cambio de token...\n"+tokens[indexOptions]);
			//console.log(options);
			if (indexOptions >= tokens.length) indexOptions = 0;
		};
		
        //return reject(new Error(`HTTP status code ${res.statusCode}`))

			  const body = []
			  res.on('data', (chunk) => body.push(chunk))
			  res.on('end', () => {
				const resString = Buffer.concat(body).toString()
				resolve(resString)
				//console.log(resString);
				return  resString;
			  })
    })

    request.on('error', (err) => {
		console.log("error fetch");
      //console.log(err);
	  resolve("{'sas':'sas'}");
	  return "{'sas':'sas'}";
	  
      //reject(err)
      
    })
    request.on('timeout', () => {
		console.log("timeout fetch");
		resolve("{'sas':'sas'}");
      //request.destroy();
      //reject(new Error('timed out'));
	  return "{'sas':'sas'}";
    })
  })
}




const respuesta = async (plantita) =>{
  const res = await fetch(plantita)
  
  //console.log(json.data[9]);

  try{
	var json = JSON.parse(res);
    //console.log(json);

    var id = json.data._id;
	
	console.log(id);
	
	if(id == 'undefined' || id === 'undefined')
		return ["0",10,false,false,false,false];

    var crow = json.data.hasCrow;
    var hayCuervo = false;
    if (crow && crow != 'undefined'){
      //Debería tener cuervo la planta esa xd
      //console.log("La planta "+ json.data._id + " tiene un cuervo!");
      hayCuervo = true;
    }
    var necesitaAgua = json.data.needWater;
    var agua = json.data.activeTools;
    var cantidadAgua = 0;
	var fechaRiego = "as";
    try{
    agua.forEach(elemento =>{
      if(elemento.type === 'WATER')
      cantidadAgua = elemento.count;
	  fechaRiego = elemento.endTime;
    });
    }catch(erro){
      cantidadAgua = 0;
	  fechaRiego = "as";
    }

    var fechaAhora = new Date().toISOString();
    var fechaHarvest = json.data.harvestTime;
	

	
	if (contadorFails>3){
			contadorFails = 0;
			indexOptions+=1;
			
			//console.log(options);
			if (indexOptions >= tokens.length) indexOptions = 0;
			
			optionsTemp = options;
			optionsTemp.headers.authorization = tokens[indexOptions];
			options = optionsTemp;
			console.log("Cambio de token...\n"+tokens[indexOptions]);
		};
	
	if(typeof(id) == 'undefined'){
		contadorFails += 1;
		
			
	}else{
		contadorFails = 0;
	};
	
	var tieneSemilla = false;
	
	try{
		tieneSemilla = json.data.hasSeed;
	}catch(error){
		tieneSemilla = false;
	}
	
	guardarDatosPlanta(id,fechaRiego,fechaHarvest);
    return [id,cantidadAgua,fechaAhora>fechaHarvest,hayCuervo,necesitaAgua,tieneSemilla];

  }
  catch(error){

	return ["0",10,false,false,false,false];
  }
  


  


}

hello = (valor)=>{
	try{
  return respuesta(valor);
	}catch(error){
		console.log("asd355");
		console.log(error);
		return ["0",10,false,false,false];
	}
}

module.exports.funcion = hello;