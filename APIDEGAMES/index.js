// Importando express
const express = require("express");
const app = express();
// Importando bodyParser
const bodyParser = require("body-parser");
// Importando cors
const cors = require("cors");

// Habilitando cors
app.use(cors());

// Configurando bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Criando banco de dados falso

var DB = {
    games: [
        {
            id: 23,
            title: "Call of duty",
            year: 2019,
            price: 60
        },
        {
            id: 65,
            title: "Sea of Thieves",
            year: 2018,
            price: 40
        },
        {
            id: 2,
            title: "Minecraft",
            year: 2012,
            price: 20
        }
    ]
}

// Criando primeira rota listando todos games
app.get("/games", (req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
});

// Rota para listar um game
app.get("/game/:id", (req, res) => {
    // Valida se o parametro e valido
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        // Se for valido converte o id para int e consulta no "banco de dados"
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);
        if (game != undefined) {
            // Retorna o game
            res.statusCode = 200;
            res.json(game);
        } else {
            // Retorna o statusCode
            res.sendStatus(404);
        }
    }
});
// Rota para cadastra game
app.post("/game", (req, res) => {
    // Pegando valores usando destructuring
    var { title, price, year } = req.body;
    // Adicionando valor ao array
    DB.games.push({
        id: 22,
        title,
        price,
        year
    });

    res.sendStatus(200);

})

// Rota para deletar um game
app.delete("/game/:id", (req, res) => {
    // Valida se o parametro e um numero
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        // Converte o numero para int e procura no JSON
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);
        // Valida se o numero existe
        if (index == -1) {
            res.sendStatus(404);
        } else {
            // deleta o registro do "banco de dados"
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }
    }
});

// Rota para edição
app.put("/game/:id", (req, res) => {
    // Valida se o parametro e valido
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        // Se for valido converte o id para int e consulta no "banco de dados"
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);
        if (game != undefined) {
            // Edita o game

            var { title, price, year } = req.body;

            if (title != undefined) {
                game.title = title;
            }
            if (price != undefined) {
                game.price = price;
            }
            if (year != undefined) {
                game.year = year;
            }

            res.sendStatus(200);

        } else {
            // Retorna o statusCode
            res.sendStatus(404);
        }
    }
})

// Abrindo porta servidor
app.listen(3000, () => {
    console.log("API RODANDO!");
});