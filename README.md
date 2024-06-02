# Google Keep Clone

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)

## About <a name = "about"></a>

Meniru Google Keep meskipun tidak mirip mirip banget
## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Installing

A step by step series of examples that tell you how to get a development env running.

- langkah pertama, cloning source code 

```
git clone https://
```
#
- langkah kedua, setup file .env

.env di folder 'client'
```
VITE_API_URL = http://localhost:4000/
```

.env di folder 'server'
```
# api
API = mongodb api
CORS_URL = http://localhost:5173


# configuration nodemailer
SERVICE = Gmail
HOST = smtp.gmail.com
PORT = 465
USER = email anda
APP_PASSWORD = App Password Anda
```
#
- langkah ketiga, jalankan server pada directory 'client' dan 'server'
```
npm run dev

```
#
## DEMO
```
https://notes
```
