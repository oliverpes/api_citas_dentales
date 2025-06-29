//Hash.js
const bcrypt = require('bcrypt');
bcrypt.hash('admin123', 10).then(h => {
  console.log('HASH :', h);          // Debe empezar por $2b$10$
  console.log('LONG :', h.length);   // Debe imprimir 60
});
