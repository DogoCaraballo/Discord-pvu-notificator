const express        = require ('express')
const srv            = express();



//correr para actualizar solamente guardando el archivo
//npm run dev

// Settings
srv.set('port',process.env.PORT || 3000);

// Middleware
srv.use(express.json());

// Routes
srv.use(require("./routes/empleados"));

//run main scripts

//require("./scrapers/water7");


var discordBot = require("./discord/discordbot");
discordBot.botardo;



srv.listen(srv.get('port'), () =>{
    console.log('Server on port ',srv.get('port'));
})