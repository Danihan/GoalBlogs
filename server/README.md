Make a copy of `.env.example` and name it `.env`. Edit the neccessary variables in the file to make a connection to the database and other services.

Then run these commands to install all dependencies and populate your database

```
yarn
yarn run db:migrate
```

To start your development server

```
yarn run dev
```