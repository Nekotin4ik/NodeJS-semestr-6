// import express from 'express';
// import {userRouter} from './users/users.js';

// const port = 8000;
// const app = express();

// app.use((req, res, next) => {
//     console.log('Time ', Date.now());
//     next();
// });

// app.get('/hello', (req, res) => {
//     //JSON файл передаём
//     //res.send({ success: true });
//     //или
//     //res.json({success:true});
//     //можно передавать статус
//     //res.status(201).send({success:true});
//     //передаём сылку на скачивание файла, можно вторым параметром задать файлу кастомное имя
//     //res.download('/block4_Coursera.pdf', 'teste.pdf');
//     //редирект, принимает статус и страничку
//     //res.redirect(301, 'https://example.com');

//     //устанавливаем параметр заголовка

//     //res.set('Content-type', 'text/plain');
//     //добавляет новый заголовок
//     //res.append('warning!', 'code');
//     //можем задавать тип ответа
//     //res.type('application/json');
//     //
//     //res.location();
//     //для включения линков в header
//     // res.links({
//     //     next: 'sdad'
//     // });

//     //работа с cookies
//     // res.cookie('token', 'token_value', {
//     //     domain: '',
//     //     path: '/',
//     //     secure: true,
//     //     expires :60000 //милисекунды
//     // });
//     // res.clearCookie('token', {path}); //путь - опционально

//     //метод завершает работу
//     res.end();
// });

// app.use('/users', userRouter);

// app.listen(port, () => {
//     console.log('Server started on http://localhost:' + port);
// });
