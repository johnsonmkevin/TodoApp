const PORT = 8000;
const express = require("express");
const app = express();
const cors = require("cors");
/* const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");  */
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");



app.use(express.json());
app.use(cors({
		origin: "http://localhost:3000",
}))



/* todo routes section */
app.use(todoRoutes);
app.use(userRoutes);



app.listen(PORT, () => console.log(`Serving running on ${PORT}`));