// import 'reflect-metadata';

// function Injectable(key: string) {
//     return (target: Function) => {
//         Reflect.defineMetadata(key, 1, target); //создаём метаданные ключ-значение на таргете
//         const meta = Reflect.getMetadata(key, target); //тырим значение в зависимости от ключа и таргета
//         console.log(meta);
//     }
// }

// function Prop(
//     target: Object,
//     name: string
// ) {

// }

// @Injectable('C')
// export class C {
//     @Prop prop: number;
// }

// @Injectable('D')
// export class D {
//     constructor(@Inject('C') c: C) { //благодаря Inject понимаем, что сюда надо поставить instance

//     }
// }
