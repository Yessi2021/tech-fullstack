## TypeORM API LIBROS

## DESDECIPCION DEL PROYECTO

El proyecto contiene una autenticacion con JWT,
todas las demas rutas estan protegidas, en un cliente postman
agregar en (header: x-token : valor token) para aceder
para acceder a las demas rutas. en la carpeta entity estan definidos los modelos de los empoints

ruta de autenticacion
ruta para un crud de libros
ruta para prestar libros
ruta para comprar libros

# DEPENDENCIAS

En el achivo package.json estas las dependencias necesarias para el proyecto.

En el archivo ormconfig.json estan las configuraciones basicas y tsconfig.json estas las configuraciones de TS.

# ARRANCAR PROYECTO

reconstruir las dependencias: npm install
arrancar : npm run dev

# VARIABLES DE ENTORNO

estan definidas las variables del puerto y la variable de la key para la compra de libros.

# ENPOINTS

En el archivo que esta dentro de la carpeta requests
estan definidos los empoints del proyecto
