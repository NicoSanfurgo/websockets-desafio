import fs from 'fs';

class ProductManager{
    constructor(path){
        this.path = path;
    }

    addProduct({title, description,  code, price, status = true,  stock, category, thumbnails=[]}){
        const productList = this.getData();

        if(productList.length != 0){
            let verifyCode = productList.find(product => product.code == code);
            if(verifyCode){
                return 'El codigo existe en la lista.';
            }
        }

        let product = {
            id: productList.length == 0 ? 1 : productList[productList.length-1].id + 1,
            title, 
            description, 
            code, 
            price, 
            status: true, 
            stock, 
            category, 
            thumbnails
        }
        productList.push(product);
        fs.writeFileSync(this.path,JSON.stringify(productList, null, 2))
        return product;
    }

    getProducts(){
        return this.getData();
    }

    getProductByID(id_prod){
        let productList = this.getData();
        let searchProduct = productList.find(product => product.id == id_prod);
        if(searchProduct){
            return searchProduct;
        }else{
            return {err: 'El producto con ese ID no existe'}
        }
    }

    updateProduct(id_prod, {title, description, code, price, status, stock, category, thumbnails}){
        let productList = this.getData();

        let index = productList.findIndex(product => product.id == id_prod);

        if(index >= 0){
            let product = productList[index];

            if(product.title != title && title ){
                productList[index].title = title;
            }
            if(product.description != description && description){
                productList[index].description = description;
            }
            if(product.code != code && code){
                productList[index].code = code;
            }
            if(product.price != price && price){
                productList[index].price = price;
            }
            if(product.status != status && status){
                productList[index].status = status;
            }
            if(product.stock != stock && stock){
                productList[index].stock = stock;
            }
            if(product.category != category && category){
                productList[index].category = category;
            }
            if(product.thumbnails != thumbnails && thumbnails){
                productList[index].thumbnails = thumbnails;
            }
            fs.writeFileSync(this.path,JSON.stringify(productList, null, 2));
            return productList[index];
        }else{
            return {err: 'El producto no existe en la lista.'}
        }
    }

    deleteProduct(id_prod){
        let productList = this.getData();

        let indexProduct = productList.findIndex(product => product.id == id_prod)

        if(indexProduct >= 0){
            productList.splice(indexProduct,1)
            fs.writeFileSync(this.path,JSON.stringify(productList, null, 2))
            return {message: 'El producto se elimino con exito.'}
        }else{
            return {err: 'El producto no existe en la lista.'}
        }
    }
    
    getData(){
        let data = []
        try{
            const carts = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
            carts.forEach(element => {
                data.push(element)
            });

        }catch{
            console.log('Archivo vacio o no encontrado.')
        }
        return data;
    }

}

export default ProductManager;