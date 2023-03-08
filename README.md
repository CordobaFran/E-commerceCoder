# ProyectoFinal - Ecommerce

## Lista de comandos utilizados en local :

```
npm run dev

nodemon server 8081 FORK
nodemon server 8082 CLUSTER

```

# Rutas

Para poder ingresar a las rutas se debe estar logueado. Puede crearse un usuario y contraseñas nuevos o ingresar con el usuario generico:

**user:** admin <br>
**pass:** admin
<br>
<br>


[Register](https://e-commercecoder.up.railway.app/auth/register)

[Login](https://e-commercecoder.up.railway.app/auth/login)

[Home](https://e-commercecoder.up.railway.app/)

[Cart List](https://e-commercecoder.up.railway.app/cart)


# Schemas
Estos son los schemas de los diferentes tipos de datos que son creados en la aplicacion como "productos", "usuarios" y "carritos".
* ## Productos:

```    
    {   
        _id: ,
        product: { type: String, require: true, max: 100 },
        detail: { type: String, require: true, max: 150 },
        value: { type: Number, require: true },
        urlImg: { type: String, require: true },
        rating: {
            rate: {type: Number},
            count: {type: Number}
        },
        stock: {type: Number},
        author: {type: String},
        category: {type: Number}
    }
```
* ## Usuarios
```    
    {   
        _id: ,
        username: { type: String, require: true, max: 100 },
        email: { type: String, require: true, max: 150 },
        password: { type: String, require: true },
        admin: { type: Boolean, require: true },
        name: { type: String, require: true, max: 100 },
        age: { type: Number, require: true, min: 18, max: 120 },
        phoneNumber: { type: Number, require: true },
        address: { type: String, require: true, max: 100 },
        profilePicture: { type: String, require: true, max: 1000},
        cartId: {type: String},
        addedDate: {type: Number}
    }
```
* ## Carritos
```    
    {   
        _id: ,
        productos: {
            productId: {type: String},
            qty: {type: Number}
        }
    }
```
<br>
<br>
<br>

#
# Resultados de comparación fork vs. cluster con Artillery

* ## **Fork**
![result_fork](public/images/artillery_fork.png)

* ## **Cluster**
![result_fork](public/images/artillery_cluster.png)


