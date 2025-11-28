import express from "express";

const app = express();

app.use(express.json()); // Gør serveren i stand til at læse JSON


// DATA
let todos = [
    { id: 1, title: "Køb mælk", done: false},
    { id: 2, title: "Lav lektier", done: true},
    { id: 3, title: "Træn", done: false},
    
];

// -------- ROUTES --------------

// GET hent alle opgaver
app.get('/todos', (req, res) => {
   res.json(todos);
});

// GET hent en opgave efter id
app.get('/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    const todo = todos.find(t => t.id === id);
    
    if (!todo) {
    return res.status(404).json({error: "Todo ikke fundet"});
}
    res.json(todo);
});

// POST: tilføj ny opgave
app.post('/todos', (req, res) => {
    const { title, done } = req.body;

    const newTodo = {
        id: todos.length + 1,
        title,
        done: done ?? false
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT: Opdater eksisterende opgave
app.put('/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (!todo) {
        return res.status(404).json({ error: "Todo ikke fumdet "});
    }

    todo.title = req.body.title ?? todo.title;
    todo.done = req.body.done ?? todo.done;

    res.json(todo);
});

// DELETE: slet opgave
app.delete('/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    const initialLength = todos.length;

    todos = todos.filter(t => t.id !== id);

    if (todos.length === initialLength) {
        return res.status(404).json({ error: "Todo ikke fundet" });
    }

    res.json({ message: "Todo slettet" });
});

// ---------- SERVER ----------
app.listen(3000, () => {
  console.log("Server kører på http://localhost:3000");
});

