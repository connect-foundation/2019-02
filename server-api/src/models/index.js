const mongoose = require('mongoose');

// 데이터 베이스 접속 코드
// mongoose.connect(process.env.DB_URL, {
//   dbName: process.env.DB_NAME,
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// }, (error) => {
//   if (error) {
//     console.log('mongodb connect error', error);
//   } else {
//     console.log('mongodb connect success!');
//   }
// });