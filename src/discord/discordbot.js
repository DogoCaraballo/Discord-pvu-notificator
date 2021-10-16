const Discord = require('discord.js');
//const figlet = require('figlet');
const readline = require('readline');
const mysqlConnection = require('../database');

function guardarPlanta(usuario,planta,secundaria=0){
var query = "insert into plantascheck (id,owner,secundaria) values ('"+planta+"','"+usuario+"'," + secundaria + ");";
    console.log(query);
	
		return new Promise(function (resolve,reject){


			mysqlConnection.query(query,(err,rows,fields) =>{
			
			if (!err){
				resolve(rows);
			}
				reject(err);
			})
		});	

}

function togglePrivado(usuario,nuevoEstado){
    var query = "update config set estado = "+ nuevoEstado +" where id = '"+usuario+"';";
    console.log(query);
	
		return new Promise(function (resolve,reject){


			mysqlConnection.query(query,(err,rows,fields) =>{
			
			if (!err){
				resolve(rows);
			}
				reject(err);
			})
		});	

}

function leerPrivado(usuario){
    var query = "select estado from config where id = '"+usuario+"';";
    //console.log(query);
    return new Promise(function (resolve,reject){


			mysqlConnection.query(query,(err,rows,fields) =>{
			
			if (!err){
				resolve(rows);
			}
				reject(err);
			})
		});	

}

function agregarConfig(usuario){
    var query = "insert into config (id,estado) values ('"+usuario+"','"+0+"');";
    //console.log(query);
	
		return new Promise(function (resolve,reject){


			mysqlConnection.query(query,(err,rows,fields) =>{
			
			if (!err){
				resolve(rows);
			}
				reject(err);
			})
		});

}

function regarPlantas(usuario){
	var fecha = new Date();
	fecha.setHours(fecha.getHours()+10);
	
    var query = "update plantascheck set riego = '"+ fecha.toISOString() +"' where owner = '"+usuario+"';";
    console.log(query);
	
		return new Promise(function (resolve,reject){


			mysqlConnection.query(query,(err,rows,fields) =>{
			
			if (!err){
				resolve(rows);
			}
				reject(err);
			})
		});	

}

function tirarPlanta(usuario,planta){
    var query = "update plantascheck set verificar = 0 where owner ='"+usuario+"' and id = '"+ planta +"';";
    console.log(query);
	var resultado = "";
    mysqlConnection.query(query,(err,rows,fields) =>{

        if (!err){
			resultado = rows;
        }
        return resultado;
    });
}


var verPrivada = require("../scrapers/water-private");




var plantas = [];

funcionasa = async () =>{
    while(1){
        await sleep(1000);

        mysqlConnection.query('select * from plantascheck',(err,rows,fields) =>{
            if(!err)
            plantas = rows;

        });
        
        var cantidad = plantas.length;
        //console.log(cantidad);

        var i=0;
        while(i<cantidad){
            
            
            //verPrivada.funcion return [id,cantidadAgua,fechaAhora>fechaHarvest,hayCuervo,necesitaAgua]
			try{
            var datosPlanta = await verPrivada.funcion(plantas[i].id);
            if(typeof(datosPlanta[0]) == 'undefined'){
                //console.log("planta indefinida");
				
				if (plantas[i].verificar == 1){
					var extra = "[1]";

					if(plantas[i].cosecha != 'null' && plantas[i].cosecha <= new Date().toISOString()){
						console.log("Una deberia poder cosecharse!");
						borrarPlanta(plantas[i].owner,plantas[i].id)
						if(plantas[i].secundaria == 1) extra = "[2]";
						bot.channels.get(canal).send(extra+" <@"+plantas[i].owner + "> tu planta **DEBERÍA** poder cosecharse! https://marketplace.plantvsundead.com/farm/#/farm/" + plantas[i].id);
					}
				}
				
            }else if (plantas[i].verificar == 1){
				var extra = "[1]";
				if(datosPlanta[2]){
					console.log("Una planta necesita cosecharse, llamando al owner...");
                    borrarPlanta(plantas[i].owner,plantas[i].id)
					if(plantas[i].secundaria == 1) extra = "[2]";
					bot.channels.get(canal).send(extra+" <@"+plantas[i].owner + "> tu planta puede cosecharse! https://marketplace.plantvsundead.com/farm/#/farm/" + plantas[i].id);
                }else if(datosPlanta[1] == 0 || datosPlanta[4]){
					console.log("Una planta necesita agua, llamando al owner...");
                    tirarPlanta(plantas[i].owner,plantas[i].id)
					if(plantas[i].secundaria == 1) extra = "[2]";
					bot.channels.get(canal).send(extra+" <@"+plantas[i].owner + "> tu planta necesita agua! https://marketplace.plantvsundead.com/farm/#/farm/" + plantas[i].id);
                }else if(datosPlanta[3]){
					console.log("Una planta tiene cuervo, llamando al owner...");
                    tirarPlanta(plantas[i].owner,plantas[i].id)
					if(plantas[i].secundaria == 1) extra = "[2]";
					bot.channels.get(canal).send(extra+" <@"+plantas[i].owner + "> tu planta tiene un cuervo! https://marketplace.plantvsundead.com/farm/#/farm/" + plantas[i].id);
                }else if(datosPlanta[5]){
					console.log("Una planta tiene SEMILLA, llamando al owner...");
                    tirarPlanta(plantas[i].owner,plantas[i].id)
					if(plantas[i].secundaria == 1) extra = "[2]";
					bot.channels.get(canal).send(extra+" <@"+plantas[i].owner + "> tu planta tiene una SEMILLA! https://marketplace.plantvsundead.com/farm/#/farm/" + plantas[i].id);
                }

            
            }
			}catch(error){}

            i++;
            await sleep(15000);
        }
            
        

        
        
    }
    
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



function borrarPlantas(usuario){
    var query = "delete from plantascheck where owner = '"+usuario+"';";
    console.log(query);
    mysqlConnection.query(query,(err,rows,fields) =>{

        if (!err){
            return -1;
        }else{
            return 0;
        }
        
    });
}

function mostrarPlantas(usuario){
    var query = "select id,secundaria from plantascheck where owner = '"+usuario+"';";
    console.log(query);
    return new Promise(function (resolve,reject){


			mysqlConnection.query(query,(err,rows,fields) =>{
			
			if (!err){
				resolve(rows);
			}
				reject(err);
			})
		});	
};



function borrarPlanta(usuario,planta){
    var query = "delete from plantascheck where owner = '"+usuario+"' and id = '"+ planta +"';";
    console.log(query);
    return new Promise(function (resolve,reject){


			mysqlConnection.query(query,(err,rows,fields) =>{
			
			if (!err){
				resolve(rows);
			}
				reject(err);
			})
		});	
}

const fs = require('fs');

const config = require('./config.json');
const { ConsoleMessage } = require('puppeteer');
/*const bot = new commando.Client({
    commandPrefix: config.prefijo,
    owner: config.ownerid,
});*/

const bot = new Discord.Client();


var canal = config.canalid;

bot.on("ready", () => {
	bot.user.setActivity('RuneScape');
    console.log('______');
});


bot.on("error", (error) => {
    bot.login(config.token);
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
	bot.destroy();
	bot.login(config.token);
});


if (process.env.TESTING) process.exit();

try {
    if (process.env.BOT_TOKEN) bot.login(process.env.BOT_TOKEN);
    else bot.login(config.token);
}
catch (e) {
    console.log(e);
    console.log("Failed to login to Discord!");
}

bot.on('message', async (message) => {
	if (canal==message.channel.id) {
        mensajito = message.content;
        mensajito=mensajito.toLowerCase();
        if(mensajito.indexOf("~") == 0){
            if(mensajito.indexOf("ayuda") == 1 || mensajito.indexOf("comandos") == 1){
                message.channel.send("**Comandos**\n~Agregar <idPlanta>\n~Borrar <idPlanta>\n~Borrarplantas (borra todas tus registradas)\n~Plantas (Ve todas tus plantas)\n~Water (le dice al bot que regaste todas tus plantas) [PREDICCION]");

            }else if(mensajito.indexOf("agregar ") == 1){

                guardarPlanta(message.author.id,mensajito.replace('~agregar ','')).then(function(rows){
					//message.channel.send("Planta agregada!");
					message.react(':xdboca:497923429413158918');
				}).catch((err)=>{
					message.channel.send("Ya tienes esa planta! Usa ~plantas para verlas!");
				});
				
				leerPrivado(message.author.id).then(function(rows){
					
					if(rows.length == 0)
						agregarConfig(message.author.id);
				}).catch((err)=>{
					agregarConfig(message.author.id);
				});
                

            }else if(mensajito.indexOf("agregar2 ") == 1){

                guardarPlanta(message.author.id,mensajito.replace('~agregar2 ',''),1).then(function(rows){
					//message.channel.send("Planta agregada!");
					message.react(':xdboca:497923429413158918');
				}).catch((err)=>{
					message.channel.send("Ya tienes esa planta! Usa ~plantas para verlas!");
				});
				
				leerPrivado(message.author.id).then(function(rows){
					
					if(rows.length == 0)
						agregarConfig(message.author.id);
				}).catch((err)=>{
					agregarConfig(message.author.id);
				});
                

            }else if(mensajito.indexOf("borrarplantas") == 1 || mensajito.indexOf("borrartodo") == 1){

                console.log(borrarPlantas(message.author.id));
                message.channel.send("Borraste todas tus plantas! F");

            }else if(mensajito.indexOf("borrar ") == 1){
                borrarPlanta(message.author.id,mensajito.replace('~borrar ','')).then(function(rows){
					//console.log(rows.affectedRows);
					if (rows.affectedRows == 0){
						message.channel.send("Esa planta no se ha encontrado!");
					}else{
						//message.channel.send("Borraste tu planta!");
						message.react(':xdboca:497923429413158918');
					}
					
				}).catch((err)=>{
					
				});
				
            }else if(mensajito.indexOf("plantas") == 1 || mensajito.indexOf("misplantas") == 1){
                mostrarPlantas(message.author.id,mensajito.replace('~agregar ','')).then(function(rows){
					
					//console.log(rows);
					var msj = "**Tus plantas (Dispositivo ~ ID):**";
					//msj+= "\n**Dispositivo  -  ID**";
					var primarios = [];
					var secundarios = [];
					rows.forEach(row =>{
						indice = row.secundaria+1;
						if(row.secundaria == 0) {
							primarios.push(row.id);
						}else{
							secundarios.push(row.id);
						}
					});
					
					primarios.forEach(row =>{
						msj+= "\n [1] ~ " + row;
					});
					
					secundarios.forEach(row =>{
						msj+= "\n [2] ~ " + row;
					});
					
					
					message.channel.send(msj);
				}).catch((err)=>{
					message.channel.send("Dou, error inesperado.");
				});
            }else if(mensajito.indexOf("agua") == 1 || mensajito.indexOf("water") == 1){
                regarPlantas(message.author.id);
				message.react(':xdboca:497923429413158918');
            }else if(mensajito.indexOf("privado") == 1 || mensajito.indexOf("publico") == 1){
				leerPrivado(message.author.id).then(function(rows){
					
					//console.log(rows);
					var msj = "Las notificaciones de: <@";
					
					rows.forEach(row =>{
						console.log(row);
						msj+= message.author.id+"> ahora son ";
						
						if (row.estado == 1){
							msj+= "**públicas**";
							togglePrivado(message.author.id,0);
						}else{
							msj+= "**privadas**";
							togglePrivado(message.author.id,1);
						};
					});
					message.channel.send(msj);
				}).catch((err)=>{
					message.channel.send("Dou, error inesperado.");
				});
                
				//console.log(message.author);
            }


        }
    }
});


funcionasa();

module.exports.botardo = {bot};