import express from "express"
import 'dotenv/config'
import cors from 'cors'
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

await connectDB()

//Middlewares
app.use(cors())
app.use(express.json())

//Routes
app.get('/', (req,res) => res.send("Api is working"))
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)

const PORT = process.env.PORT ||  3000;

app.listen(PORT, () => {
    console.log("Server is running on PORT " + PORT)
})

export default app;


// arifjamal2012
// arifjamal2012

// mongodb+srv://arifjamal2012:arifjamal2012@cluster0.clnb7b0.mongodb.net/