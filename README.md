#Inglish

# DaJTs

It is a package 📦 that simplifies data management and makes it easier for programmers. Created in TypeScript, this package offers functionalities that allow you to save JavaScript objects as encrypted JSON data, acting as a lightweight database, DB Lite, ideal for small projects.

## Usage

The package exposes the following classes, interfaces, and types:

### Classes:
- `daj`: instance
- `User`: class type
- `DajB`: abstract
- `Token`: class type

### Interfaces:
- `Response`

### Types:
- `Callback`: function `(error: Error, data: Data) => void`
- `Data`: object, string, null
- `Error`: string, null

Create models using the abstract class 'DajB'.

**Examples:**

```typescript

import { DajB } from "./index";

class Person extends DajB {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    super();
    this.name = name;
    this.age = age;
  }
}
````

Use the 'daj' class, which is an instance, with any of the methods that are similar to HTTP methods:

| Method Name          | Parameters                 | Return Value      |
|-----------------|----------------------------|------------------------|
| registerSync    | User                       | Response               |
| loginSync       | Credentials                | Token o null           |
| checkTokenSync  | Token                      | boolean                |
| logoutAsync     | Credentials                | boolean                |
| getAll          | callback, object           | void                   |
| getAllSync      | object                     | Response               |
| get             | callback, object           | void                   |
| getSync         | object                     | Response               |
| getByKey        | callback, object, string   | void                   |
| getByKeySync    | object, string             | Response               |
| post            | callback, object           | void                   |
| postSync        | object                     | Response               |
| put             | callback, object           | void                   |
| putSync         | object                     | Response               |
| delete          | callback, object           | void                   |
| deleteAsync     | object                     | Response               |

**Examples:**

```typescript

import daj, { Response } from "./index";

const doctor = new Person("Jose", 32);
const response: Response = daj.postSync(doctor);

const { error, data } = response;

console.log(error); // null
console.log(data); // Success
````

**Examples:**

```typescript

import daj, { Error, Data } from "./index";

const callback = (error: Error, data: Data) => {
  console.log(error); // null
  console.log(data); // Éxito
};

const paciente = new Person("Felipe", 12);
daj.post(callback, paciente);
````

Some methods are provided to simplify the registration:

- `registerSync`
: registers a user.

- `loginSync`
: allows you to log in.

- `checkTokenSync`
: verifies an authentication token provided by the login.

- `logoutAsync`: logs out the user.

**Examples:**
```typescript

import daj, { User, Response, Credentials, Token } from "./index";

class Model_User extends User {
  name: string;
  lastName: string;
  age: number;
  credentials: Credentials;
  constructor(name: string, lastName: string, age: number, user: string, password: string) {
    super();
    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.credentials = { user, password };
  }
}

const teacher: Model_User = new Model_User("Carlos", "Felipe", 32, "Carlos_Felipe", "Carlos.F.3232");

// Registering user
const { error, data } = daj.registerSync(teacher);

if (!error)
  console.log(data) // Success

// Login process
const credentials: Credentials = {
  user: "Carlos_Felipe",
  password: "Carlos.F.3232"
};

const user_token: Token = daj.loginSync(credentials);

console.log(user_token.token)   // 7d5a3b9e-572a-4f9b-b3f8-2c8e5d19a6e1
// Tokens are GUID (Globally Unique Identifier).

// Validating the token
const isLogin: boolean = daj.checkTokenSync(user_token.token);
console.log(isLogin) // true

// Logging out
const logout: boolean = daj.logoutAsync(credentials);
console.log(logout) // true

// Validating the token
const isLogin: boolean = daj.checkTokenSync(user_token.token);
console.log(isLogin) // false

````

# Español

# DaJTs

Es un paquete 📦 que simplifica la gestión de datos y la hace más fácil para los programadores. Creado en TypeScript, este paquete ofrece funcionalidades que te permiten guardar objetos JavaScript en datos JSON cifrados como una base de datos, DB Lite, ideal para proyectos pequeños.

## Uso

El paquete expone las siguientes clases, interfaces y tipos:

### Clases:
- `daj`: instancia
- `User`: tipo de clase
- `DajB`: abstracto
- `Token`: tipo de clase

### Interfaces:
- `Response`

### Tipos:
- `Callback`: función `(error: Error, data: Data) => void`
- `Data`: object, string, null
- `Error`: string, null

Crea los modelos usando la clase abstracta 'DajB'.

**Ejemplo:**

````typescript

import { DajB } from "./index";

class Person extends DajB {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    super();
    this.name = name;
    this.age = age;
  }
}

````

Usa la clase 'daj', la importación es una instancia, con cualquiera de los métodos que tienen similitud a los métodos HTTP:

| Nombre del método | Parámetros               | Valor de retorno |
| ----------------- |:------------------------:|:----------------:|
| registerSync      | User                     | Response         |
| loginSync         | Credential               | Token or null    |
| checkTokenSync    | Token                    | boolean          |
| logoutAsync       | Credentials              | boolean          |
| getAll            | callback, object         | void             |
| getAllSync        | object                   | Response         |
| get               | callback, object         | void             |
| getSync           | object                   | Response         |
| getByKey          | callback, object, string | void             |
| getByKeySync      | object, string           | Response         |
| post              | callback, object         | void             |
| postSync          | object                   | Response         |
| put               | callback, object         | void             |
| putSync           | object                   | Respo            |
| delete            | callback, object         | void             |
| deleteAsync       | object                   | Response         |

**Ejemplo:**

```typescript

import daj, { Response } from "./index";

const doctor = new Person("Jose", 32);
const response: Response = daj.postSync(doctor);

const { error, data } = response;

console.log(error); // null
console.log(data); // Success

````

**Ejemplo:**

```typescript

import daj, { Error, Data } from "./index";

const callback = (error: Error, data: Data) => {
  console.log(error); // null
  console.log(data); // Success
};

const paciente = new Person("Felipe", 12);
daj.post(callback, paciente);

````

Métodos de Registro Simplificado

- `registerSync`: registra un usuario.
- `loginSync`: te permite iniciar sesión.
- `checkTokenSync`: verifica un token de autenticación proporcionado por el inicio de sesión.
- `logoutAsync`: cierra la sesión del usuario.

**Ejemplo:**
```typescript

import daj, { User, Response, Credentials, Token } from "./index";

class Model_User extends User {
  name: string;
  lastName: string;
  age: number;
  credentials: Credentials;
  constructor(name: string, lastName: string, age: number, user: string, password: string) {
    super();
    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.credentials = { user, password };
  }
}

const teacher: Model_User = new Model_User("Carlos", "Felipe", 32, "Carlos_Felipe", "Carlos.F.3232");

// Registrando usuario
const { error, data } = daj.registerSync(teacher);

if (!error) {
  console.log(data); // Success
}

// Proceso de inicio de sesión
const credentials: Credentials = {
  user: "Carlos_Felipe",
  password: "Carlos.F.3232"
};

const user_token: Token = daj.loginSync(credentials);

console.log(user_token.token); // 7d5a3b9e-572a-4f9b-b3f8-2c8e5d19a6e1
// Los token son GUID (Globally Unique Identifier).

// Validando el token
const isLogin: boolean = daj.checkTokenSync(user_token.token);
console.log(isLogin); // true

// Cerrando sesión
const logout: boolean = daj.logoutAsync(credentials);
console.log(logout); // true

// Validando el token
const isLogin: boolean = daj.checkTokenSync(user_token.token);
console.log(isLogin); // false

````