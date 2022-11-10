# **Disney api**

API REST que permite crear tu usuario, y administrar tus personajes, películas, y géneros de películas.

## **Table of Contents**

- [Instalación](#Instalación)
  - [Clonar el repositorio](<#Clonar el repositorio>)
  - [Configurar el entorno](<#Configurar el entorno>)
  - [Instalar dependencias](<#Instalar dependencias>)
  - [Crear base de datos](<#Crear base de datos>)
  - [Crear tablas de la base de datos](<#Crear tablas de la base de datos>)
  - [Agregar datos de ejemplo (opcional)](<#Agregar datos de ejemplo>)
  - [Iniciar la aplicación](<#Iniciar la aplicación>)
- [Uso](#Uso)

<div id="Instalación"></div>

## **Instalación**

<div id="Clonar el repositorio"></div>

### **Clonar el repositorio**

Abrir una terminal en la carpeta donde se desea guardar el proyecto y ejecutar:

```bash
$ git clone https://github.com/agusbarrio/disney-api.git
```

<div id="Configurar el entorno"></div>

### **Configurar el entorno**

Cambiar el nombre del archivo example.env a .env. Modificar el contenido del archivo con los datos correspondientes. Por ejemplo:

```shell
DB_HOST=localhost
DB_PORT=3306
DB_NAME=disney-api
DB_USER=root
DB_PASSWORD=1bhsg
PORT=8080
JWT_SECRET=secretToken
SENDGRID_API_KEY=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
SENDGRID_EMAIL=example@gmail.com
```

<div id="Instalar dependencias"></div>

### **Instalar dependencias**

Abrir una terminal en la carpeta del proyecto y ejecutar:

```bash
$ npm install
```

<div id="Crear base de datos"></div>

### **Crear base de datos**

Si no la posee, crear la base de datos en MySQL. Puede hacerlo ejecutando lo siguiente en la línea de comandos de MySQL o en MySQLWorkbench:

```sql
CREATE DATABASE IF NOT EXISTS db-name;
USE db-name;
```

<div id="Crear tablas de la base de datos"></div>

### **Crear tablas de la base de datos**

Abrir una terminal en la carpeta del proyecto y ejecutar:

```bash
$ npx sequelize-cli db:migrate
```

<div id="Agregar datos de ejemplo"></div>

### **Agregar datos de ejemplo (opcional)**

Abrir una terminal en la carpeta del proyecto y ejecutar:

```bash
$ npx sequelize-cli db:seed:all
```

Esto agregará los siguientes usuarios con personajes, películas y géneros asociados

email: ej1@ej1.com - contraseña: 123456

email: ej2@ej2.com - contraseña: 123456

email: ej3@ej3.com - contraseña: 123456

<div id="Iniciar la aplicación"></div>

### **Iniciar la aplicación**

Abrir una terminal en la carpeta del proyecto y ejecutar:

```bash
$ npm start
```

<div id="Uso"></div>

## **Uso**

Puede ver documentación de los endpoints disponibles y ejemplos de uso en el siguiente enlace:

[Documentación de Postman](https://documenter.getpostman.com/view/24096244/2s8YekQuAo){:target="\_blank"}
