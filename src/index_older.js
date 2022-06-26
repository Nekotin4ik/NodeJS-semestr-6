// //начинаем создавать сервер
// //import http from 'http';
// import express from 'express';

// //const host = '127.0.0.1'; //не нужон для експреса
// const port = 8000;
// const app = express();

// //в ответ на все запросы
// //next - передаёет функцию, следующему по списку обработчику
// //что-то типо промежуточного обработчика, может не передавать следующему, а выкинуть ошибку
// //порядок задания роутов, определяет порядок их ОБРАБОТКИ
// app.all('/hello', (req, res, next) => {
//     console.log('All');
//     next();
// });

// const cb = (req, res, next) => {
//     console.log('CB1');
//     next();
// };

// app.get('/hello', [cb, cb, cb, (req, res) => {
//     res.send('Hi!');    //hel?lo -valid- hello, helo
//                         //hel+lo -valid- hello, helllllo
//                         //hel*lo -valid- hello, helqsdfsdfsdfslo
//                         //he(la)?lo -valid- helo, helalo
//                         //пример regexp? /.*f$/ - строка любой длинны, которая заканчивается на f
// }]);

// //более удобная запись роутеров
// app.route('/user')
//     .get('/hello', (req, res) => {
//         res.send('Hi!');
//     })
//     .post('/hello', (req, res) => {
//         res.send('Hi, Post!');
//     });

// app.listen(port, () => {
//     console.log('Server started on http://localhost:' + port);
// });

// //сюда передаётся функция, которая будет лисенером запросов
// //принимает 2 параметра: запрос и ответ
// // const server = http.createServer((req, res) => {
//     //route на который нам стучаться содержиться в request, смотреть ниже
//     //получается, нужно писать огромную структуру, со всеми разными вариантами, и для больших проектов это не удобно
//     //Для замены такого полотна существую API фреймворки
//     // switch (req.method) {
//     //     case 'GET':
//     //         switch (req.url) {
//     //             case '/hello':
//     //                 res.statusCode = 200;
//     //                 res.setHeader('Content-type', 'text/plain');
//     //                 res.end('Hi!');
//     //         }
//     //         break;
//     // };
//     //ниже приведён такой же сервак, но с использованием express
// // });

// //часть полотна
// // server.listen(port, host, () => {
// //     console.log('Server started on ' + host + ':' + port);
// // });
