const fs = require('fs')

class Contenedor {
    constructor(name) {
        this.fileName = name
        this.countID = 0
        this.content = []
        this.init()
    }

    async init() {
        try {
			let data = await fs.promises.readFile(this.fileName);
			this.content = JSON.parse(data);
			for (const element of this.content) {
				if (element.id > this.countID) this.countID = element.id;
			}
		} catch (error) {
			console.log('Aún no hay archivo');
		}
    }

    //Método que escribe/sobreescribe: de este manera queda más limpio el código de los otros métodos
    async write() {
        await fs.promises.writeFile(this.fileName, JSON.stringify(this.content))
    }

    save(object) {
        this.countID++ //Aumento la propiedad que va guardando el ID más alto
        object["id"] = this.countID //Agrego la propiedad id al objeto pasado como parámetro
        this.content.push(object) //Agrego el objeto al contenido(array)
        this.write() //Agrego el objeto al archivo
        return `El id del objeto añadido es ${this.countID}.` //Retorna el ID
    }

    //Devuelve un array con los objetos presentes en el archivo
    getAll() { 
        return this.content
    }

    //Recibe un id y devuelve el objeto con ese id, o null si no está.
    getById(id) { 
        let result
        if (this.content !== []) {
            result = this.content.find(x => x.id === id)
            if (result === undefined) {
                result = null
            }
        } else {
            result = 'El archivo está vacío'
        }
        return result
    }

    //Elimina del archivo el objeto con el id buscado
    deleteById(id) { 
        let result
        if (this.content !== []) {
            let newContent = this.content.filter(x => x.id !== id)
            this.content = newContent
            this.write() //SobreEscribo el archivo
            result = `El producto fue eliminado`
        } else {
            result = `El archivo está vacío`
        }
        return result
    }

    //Elimina todos los objetos presentes en el archivo.
    async deleteAll() { 
        this.content = await this.content.splice(0, this.content.length)
        this.write()
    }

    update(id, obj){
        const index = this.content.findIndex( objT => objT.id == id);
        obj.id = this[index].id
        this.content[index] = obj;
        return obj;
    }
}

module.exports = Contenedor