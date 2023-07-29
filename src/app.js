import  express  from "express"
import ProductManager from "./productManager.js"

const app = express()
const productManager = new ProductManager()


app.use(express.urlencoded({extended:true}))


app.get('/' , (req , res) =>{
  res.send('El servidor esta funcionando')
})


app.get('/products' , async (req , res) => {
  const products = await productManager.getProducts();
  const {limit} = req.query;

  if(limit){
    const limitResponse = products.slice(0 , limit)
    res.send({limitResponse})
  }else{
    res.send(products)
  }
  
})

app.get("/products/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const product = await productManager.getProductById(id);
  if (product) {
    res.send({product});
  } else {
    res.send({ message: "Product not found" });
  }
});


app.listen(8080, () => {
    console.log(`Server on port ${8080}`);
  });