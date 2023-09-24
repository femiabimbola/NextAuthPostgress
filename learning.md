### Learning Prisma

- Install Prisma, `npm install prisma --save-dev`,
- Initialize Prisma `npx prisma init`
- Change the url to the host
- Then create the model for the user or the schema you want
- Everytime you change the model, run `npx prisma migrate dev --name init`
- Then install `npm install @prisma/client` to use in your app
- You must create Lib folder
