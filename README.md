# README
# Secret-Santa-API
This is an API that was built using NestJS. It is a Rest API and can perform all rest functions . Users can make requests to retrieve, create, edit or delete information.

## Table of Contents

* [Features](#features)
* [Concepts Employed](#concepts-employed)
* [Built With](#built-with)
* [Required Installations](#required-installations)
* [Instalation of This App](#instalation)
  * [Docker (alternative)](#docker)
* [Future Improvements](#future-improvements)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)


<!-- features -->
## Features
* There is a user table with authentication
* THere is a groups table that contains a list of groups users can belong to
* There is a pivot user-group table that connects users to groups

<!-- concepts employed -->
## Concepts Employed
* Associations
* Authentication (`cookie` and `jwt`)
* Foreign Keys
* Validations (`Pipes` and `Guards`)
* Emailing (`nodemailer` and `@nestjs-modules/mailer`)
* Handlebars Email Templating
* One time password (`otp`)

<!-- BUILT WITH -->
## Built With
* NestJs
* Postgres
* Redis
* Docker


<!-- REQUIRED INSTALLATION -->
## REQUIRED INSTALLATIONS
* node
* postgres
* redis
* docker (optional)

<!-- INSTALLATION -->
## Installation of This Repository

Once you have installed the requiered packages shown on the [Required Installations](#required-installations), proceed with the following steps

Clone the Repository,

```Shell
your@pc:~$ git clone https://github.com/frankly034/secret-santa-api.git
```

Move to the downloaded folder

```Shell
your@pc:~$ cd secret-santa-api
```

Install all packages

```Shell
your@pc:~$ npm install
```

To test

```Shell
your@pc:~$ npm test
```

<!-- DOCKER INSTALLATION -->
### Docker (alernative)
```Ensure you have docker desktop installed```

Clone the Repository,

```Shell
your@pc:~$ git clone https://github.com/frankly034/secret-santa-api.git
```

Move to the downloaded folder

```Shell
your@pc:~$ cd secret-santa-api
```

Run with docker-compose

```Shell
your@pc:~$ docker-compose up
```

<!-- FUTURE IMPROVEMENTS -->
## Future Improvements
* ...

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact
- 🇳🇬 Lewis Ugege - franklynugege@gmail.com | [Github Account](https://github.com/frankly034) | [Twitter](https://twitter.com/@wizlulu) | [Linkedin](https://linkedin.com/in/lewis-ugege) | 


<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* <a href="https://nestjs.com/"> NestJS</a>

