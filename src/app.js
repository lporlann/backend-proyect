import  express  from "express"
import ProductManager from "./productManager.js"

const app = express()
const productManager = new ProductManager()


app.use(express.urlencoded({extended:true}))


app.get('/' , (req , res) =>{
  res.send('El servidor esta funcionando')
})


app.get('/products' , async (req , res) => {
  const resp = await productManager.getProducts()
  res.send(({resp}))
})



app.listen(8080, () => {
    console.log(`Server on port ${8080}`);
  });