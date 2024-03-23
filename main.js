const express = require("express");
const { v4: uuidv4 } = require("uuid"); // for genrating unique number third party library.

//creates an instance of an Express application,
// allowing you to build web applications using the Express framework in Node.js.
const app = express();
// sets up a rule for your Express application to understand and handle data sent to it in JSON format.
app.use(express.json());

//Declraring Port
const PORT = process.env.PORT || 3000;

//store todos in empty array
let todos = [];

//function you've provided is a utility function that creates a standardized
//response object containing the data and a meta object with a message.
const createResponse = (data, message) => {
    return {
        data,
        meta: {
            message,
        },
    };
};
app.get("/todos", (req, res) => {
    // const response={
    //      todos:todos,
    //     totalTodoLength:todos.length,
    //     message:todos.length>0?"todos List":"todo list Empty"
    // }
    try {
        const response = createResponse(
            { todos, totalRecords: todos.length },
            todos.length > 0 ? "Todo List" : "Empty List"
        );
        res.status(200).send(response);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.post("/todos", (req, res) => {
    try {
        //Destructures the title and description from the request body.
        const { title, description } = req.body;
        //Genrate timeStamp in ISO format from Date()
        const timeStamp = new Date().toISOString();
        //gernate new Todo object
        const id=parseInt(uuidv4()).toFixed()
        const newTodo = { id, title, description, timeStamp };
        todos.push(newTodo);
        const response = createResponse(newTodo, "Todo Created Succesfully");
        res.status(201).json(response);
    } catch (error) {
        res.status(501).json({ error: error.message })
    }
});

app.get("/todos/:id", (req, res) => {
    try {
        const { id } = req.params;
        const todo = todos.find((todo) => todo.id == String(id));
        if (!todo) {
            const response = createResponse({}, "Id not found");
            res.status(404).json(response);
        }
        const response = createResponse(todo, "Todo detail found");
        res.status(200).json(response);
    } catch (error) {
        res.status(501).json({ error: error.message })
    }

});

app.delete("/todos/:id", (req, res) => {
    try {
        const { id } = req.params;
        const stringId = String(id);
        todos = todos.filter((todo) => todo.id !== stringId);
        res.status(200).send("DELETED TOTOs");
    } catch (error) {
        res.status(501).json({ error: error.message })
    }

});

app.put("/todos/:id", (req, res) => {

    try {
        const { id } = req.params
        const { title, description } = req.body
        const todoIndex = todos.findIndex((todo) => todo.id === id)
        if (todoIndex !== -1) {
            todos[todoIndex] = { ...todos[todoIndex], title, description }
            const response = createResponse(todos[todoIndex], "Todo Updated Succesfully")
            res.status(200).json(response)
        } else {
            const response = createResponse({}, "Todo Id not found")
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(501).json({ error: error.message })
    }

});

//This starts the Express application and instructs it to listen for incoming
// HTTP requests on the specified port (PORT). 
app.listen(PORT, () => {
    console.log(`The Surver is runnig on localhost:${PORT}`);
});
