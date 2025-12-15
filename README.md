# Aera Project

Aera Project est une application web élégante et minimaliste conçue pour simplifier la collaboration entre freelances créatifs (designers, développeurs, photographes, etc.) et leurs clients. Elle propose un espace client dédié pour chaque projet, favorisant une communication fluide, un suivi visuel des étapes et le partage sécurisé de fichiers.

## ✨ Fonctionnalités principales

- 🧾 **Suivi d’étapes visuel** : gardez une vue claire de l’avancement du projet.
- 📂 **Partage de fichiers** : ajoutez et consultez les fichiers liés à chaque étape.
- 💬 **Commentaires simplifiés** : discutez avec votre client directement depuis l’interface.
- 🎨 **Design minimaliste** : une interface intuitive pensée pour l’expérience utilisateur.

## 🛠️ Stack technique

- **Frontend** : Next.js (React), TypeScript, Tailwind CSS
- **Backend** : GraphQL (Apollo Server)
- **Base de données** : PostgreSQL 
- **Authentification** : Auth.js (anciennement NextAuth)
- **Stockage de fichiers** : Cloudinary
- **Déploiement** : Vercel

## 🚀 Installation locale

```bash
# 1. Clonez le repo
git clone https://github.com/ton-utilisateur/aera_project.git
cd aera_project

# 2. Installez les dépendances
npm install

# 3. Configurez les variables d’environnement
cp .env.example .env
# Remplissez les variables nécessaires dans le fichier .env

# 4. Démarrez l’application
npm run dev


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```


## Dependences utilisés 

### 🎨 Frontend

- NextJs
- Tailwind
- Motion_dev : animation / effet

### 🎯 Backend 

- TypeORM
- Postgres
- NestJs
- GraphQL 