import  express  from "express"
// import ProductManager from "./managers/productManager.js"
import productRouter from "./routes/productRouter.js";


const app = express()



app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api/products' , productRouter);











app.listen(8080, () => {
    console.log(`Server on port ${8080}`);
  });