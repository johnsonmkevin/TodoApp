const { v4: uuidv4 } = require("uuid");
const pool = require("../db");

const getTodos = async (req, res) => {
  const { userEmail } = req.params;
	
	console.log(req)

	try {
		const todos = await pool.query("SELECT * FROM todos WHERE user_email = $1", [userEmail]);
		res.json(todos.rows);
	} catch (err) {
		console.error(err);
	}
};


const createTodo = async (req, res) => {
  const { user_email, title, progress, date } = req.body;//we are attaching this to the req.body
	console.log(user_email, title, progress, date);
	const id = uuidv4();
	try {
		const newToDo = await pool.query(
			`INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)`,
			[id, user_email, title, progress, date]
		);
		res.json(newToDo);
	} catch (err) {
		console.error(err);
	}
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;

  try {
    await pool.query(
      "UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;",
      [user_email, title, progress, date, id],
      (err, result) => {
        if (err) {
          console.log(err);
          throw new Error(err + " in update a todo");
        }
        res.json(result.rows);
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error(error + " in update a todo");
  }
};

const deleteTodo = async (req, res) => {
  	const { id } = req.params;
	try {
		const deleteToDo = await pool.query("DELETE FROM todos WHERE id = $1;", [id])
		res.json(deleteToDo);
	} catch (err) {
		console.error(err)
		}
};

module.exports = {getTodos, createTodo, updateTodo, deleteTodo};