// comandos mongo en Mongosh
show dbs;   //muestra todas las ddbb
use clientes; //abre tabla, si no existe la crea
db;         //muestra bbdd actual
db.help: //ayuda relacionada con la bbdd


db.createCollection("proveedores")
show collections //muestra tablas de ddbb actual

db.proveedores.insert({"nombre": "labtop"})

//Borrar: 
db.dropDatabase() // borra la tabla en curso. atencion asegurarse antes de cual es la tabla en curso!

db.clientes.drop() : true //borra la coleccion clientes. Devuleve true si lo ejecuta
//objeto json

db.productos.insertOne(
{
    "nombre" : "laptop",
    "precio" : 40.2,
    "activo": true,
    "fecha_creacion": new Date("12/12/1999"),
    "x": /foobar/i,
    "array": [1, "a", []],
    "fabricante": {
        "nombre" : "dell",
        "version": "xps",
        "ubicacion": {
            "ciudad": "NY",
            "direccion": "Park Avenue";
        }
    }
}
)
db.productos.insertMany(
    {
        "nombre" : "raton",
        "descripcion": "wifi",
        "tags":
    }
)

//consultas
//todos los documentos de una coleccion
db.productos.find()
db.productos.find({filtro}, {campos a mostrar})

//el nombre del campo NO va entre ""
db.productos.find({nombre : "labtop"})

//Filtro:si es un campo que esta dentro de un array. separado por . y entre comillas:
db.productos.find({"direccion.codigo_postal" : "labtop"})

// Parametro projection: campos a mostrar.
db.products.find({},{nombre: 1 , precio : 1})

//forEach =>
db.productos.find().forEach(producto =>print({"Nombre del producto: " + producto.nombre + " Precio: " + producto.precio}

))
