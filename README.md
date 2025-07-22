# Tour Matrix Server

This is a Modular MVC Pattern backend.

#### start installation
```
npm init -y

npm i -D typescript

tsc --init

npm i express mongoose zod jsonwebtoken dotenv cors

npm i -D ts-node-dev @types/express @types/jsonwebtoken @types/dotenv @types/cors

npm install --save-dev eslint @eslint/js typescript typescript-eslint

"dev": "ts-node-dev --respawn --transpile-only ./src/server.ts"
```

package :
1. httpStatus 
 npm i http-status-codes
2. bcryptjs
 npm i bcryptjs
 npm i -D @types/bcryptjs
3. cookie parser
  npm i cookie-parser
  npm i -D @types/cookie-parser
4. Passport.js
  npm i passport passport-local passport-google-oauth20
  npm i -D @types/passport @types/passport-local @types/passport-google-oauth20
5. Express session
  npm i express-session
  npm i -D @types/express-session
6. Axios
  npm i axios
7. Multer
  npm i multer 
  npm install --save @types/multer
8. Cloudinary
  npm i cloudinary
9. Multer Storage Cloudinary
  npm i multer-storage-cloudinary or  npm i multer-storage-cloudinary --force