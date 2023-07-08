
import shortid from "shortid";

class ProductManager {

    constructor(){
        this.products = [];
        this.currentId = 1;


    }

    async  addProduct  (name , description , price , thumbnail , stock)  {
        try{
            const product = {
                id : this.currentId,
                name : name,
                description : description,
                price : price,
                thumbnail : thumbnail,
                code : shortid(),
                stock : stock

            }
            this.products.push(product);
            this.currentId++;
        }
        catch (e){
            console.log(e)
        }


     }

    async getProducts () {
        try{
            return this.products
        }
        catch(e){
            console.log(e)
        }
    } 

    async getProductById(id){
        try {
           const result =  this.products.find(product => product.id === id)
           if(result){
            return result
           }
           else{
            console.log('no pudimos encontrar el producto')
           }
        }
        
        catch (e) {
            console.log(e)
        }
    }
        
   

    
    
}   



const productManager = new ProductManager();

await productManager.addProduct('campera valencia' , 'campera invierno' , 25000 , '/images' , 23);
await productManager.addProduct('remera skull' , 'campera craneo tradi' , 5000 , '/images' , 27);

const products = await productManager.getProducts();

const productById =  await productManager.getProductById(2);
 

console.log(products)
console.log(productById)


