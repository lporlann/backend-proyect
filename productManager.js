
import shortid from "shortid";
import {promises as fs} from "fs"

class ProductManager {

    constructor(){
        this.products = [];
        this.currentId = 1;
        this.path = './data/products.json'

    }

    async  addProduct  (name , description , price , thumbnail ,stock , code)  {
        try{
            const product = {
                id : this.currentId,
                name : name,
                description : description,
                price : price,
                thumbnail : thumbnail,
                stock : stock,
                code : shortid()
                

            }
            const validateCode = this.products.find(product => product.code === code)
                if(!validateCode){
                    this.products.push(product);
                    this.currentId++;
                    await fs.writeFile(this.path , JSON.stringify(this.products) , 'utf-8');
                }
                else{
                    return console.log('repeated code')
                }
            
        }
        catch (e){
            console.log(e)
        }


     }

    async getProducts () {
        try{
            const data = await  fs.readFile(this.path , 'utf-8')
            const parsedData = JSON.parse(data)
            
            return parsedData
        }
        catch(e){
            console.log(e)
        }
    } 

    async getProductById(id){
        try {
            const products = await this.getProducts()
            const result =  products.find(product => product.id === id)
           if(result){
            // console.log(result)
            return result
           }
           else{
             return console.log('product not found')
           }
        }
        
        catch (e) {
            console.log(e)
        }
    }

    async updateProduct(product){
        try {
            const products = await this.getProducts()
            const productToUpdate = products.find( p => p.id === product.id);
            if(!productToUpdate){
                return console.log(`can't find the product with id : ${product.id}`);
            }
            const productIndex = products.findIndex(p => p.id === product.id);
            products[productIndex] = {
                ...productToUpdate,
                ...product
            };
            await fs.writeFile(this.path , JSON.stringify(products));
            
            console.log(products[productIndex])
            return products[productIndex]

        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id){
        try {
            const products = await this.getProducts()
            const indexToDelete = products.findIndex(p => p.id === id)
            
            if(indexToDelete !== -1){
                products.splice(indexToDelete , 1);
                await fs.writeFile(this.path , JSON.stringify(products))
            }
            else{
                console.log(`can't find the product with id : ${id}`)
            }
        } catch (error) {
            
        }
    }
        
   

    
    
}   



const productManager = new ProductManager();

await productManager.addProduct('producto prueba 1' , 'producto de prueba' , 15000 , '/images' , 27);
await productManager.addProduct('producto prueba 2' , 'producto de prueba' , 25000 , '/images' , 27);
await productManager.addProduct('producto prueba 3' , 'producto de prueba' , 35000 , '/images' , 27);
await productManager.addProduct('producto prueba 4' , 'producto de prueba' , 45000 , '/images' , 27);



const productById =  await productManager.getProductById(2);
const productByIdd =  await productManager.getProductById(7);

await productManager.updateProduct({
    id: 1,
    name: 'producto de prueba actualizado',
    description : 'producto actualizado'
})

await productManager.deleteProduct(9)
await productManager.deleteProduct(2)

const products = await productManager.getProducts();

 

console.log(products)
console.log(productById)
console.log(productByIdd)



