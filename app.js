const Express = require("express");

const todoList = require('./utils/database');

const lista = require("./models/todos.model");
const  cors = requiee('cors');

const app = Express();
require('dotenv').config();

const PORT = process.env.PORT ?? 3000

lista;

todoList.authenticate()
.then( () => {
    console.log("base de datos conectado GAA!!");
})
.catch( (error) => console.log(error));

todoList.sync()
.then( () => console.log("base de datos sincronisada"))

app.use(Express.json());
app.use(cors());

// * Crear TodoList
app.post('/todos',async (req,res) => {
    try {
        const newTodo = req.body;
        const xd = await lista.create(newTodo);
        res.status(201).json(xd);
    } catch (error) {
        res.status(400).json(error);
    }
})

// * Traer  todas los TodoList

app.get('/todos', async (req ,res) => {
    try {
        const listas = await lista.findAll({
            attributes : {
                exclude: ['createdAt','updatedAt']
            }
        });
        res.json(listas)
    } catch (error) {
        res.status(400).json(error);
    }
})

// * Encontrar una Todolist por su  ID


app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const listitas = await lista.findByPk(id)
        res.json(listitas)
    } catch (error) {
        res.status(400).json(error);
    }
})

//! ***** UPDATE ******

app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title , description , completed} = req.body;
        await lista.update({title, description ,completed },{
            where : { id }
        });
        res.status(201).send();
    } catch (error) {
        res.status(201).send();
    }
});

// ! ***** DELETE *****

app.delete('/todos/:id',  async (req, res) => {
    try {
        const { id } = req.params;
        await lista.destroy({
            where : { id }
        });
        res.status(204).send();
    } catch (error) {
        res.status(400).json(error)
    }
})

app.get('/', (req, res) => {
    res.send("Hola des mi TodoLits");
});

app.listen(PORT, () => {
    console.log(`servidor escuchando causa GAAAAA!! ${PORT}`);
});