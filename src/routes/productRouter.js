import { Router } from "express";
import productManager from "../managers/productManager.js"

const pManager = new productManager()
const productRouter = Router()



productRouter.get('/' , async (req , res) => {
    const products = await pManager.getProducts();
    const {limit} = req.query;
  
    if(limit){
      const limitResponse = products.slice(0 , limit)
      res.status(200).json({limitResponse})
    }else{
      res.status(200).json(products)
    }
    
  })

productRouter.get("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const product = await pManager.getProductById(id);
    if (product) {
      res.send({product});
    } else {
      res.send({ message: "Product not found" });
    }
  });  



  export default productRouter;