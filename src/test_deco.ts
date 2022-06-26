// function Component(id: number) {
//     console.log('init component');
//     return (target: Function) => {
//         console.log('run component');
//         target.prototype.id = id; //прототип, прототипом, но оно поменяло/присвоило значение свойству класса
//     }
// }

// function Logger() {
//     console.log('init logger');
//     return (target: Function) => {
//         console.log('run logger');
//     }
// }

// function Method(
//     target: Object,
//     propertyKey: string,
//     propertyDescriptor: PropertyDescriptor
// ) {
//     console.log(propertyKey);
//     const oldValue = propertyDescriptor.value; //сохранение текущего значения
//     propertyDescriptor.value = function (...args: any[]) { //получается переопредили
//         return args[0] * 10;
//     }
// }

// function Prop(
//     target: Object,
//     propertyKey: string
// ) {
//     let value: number;

//     const getter = () => {
//         console.log('Get!');
//         return value;
//     }

//     const setter = (newValue: number) => {
//         console.log('Set!');
//         value = newValue;
//     }

//     //фактически переопределилил getter и setter для указаного свойства
//     Object.defineProperty(target, propertyKey, {
//         get: getter,
//         set: setter
//     })
// }

// function Param(
//     target: Object, //указание на User
//     propertyKey: string, //указание на updateId
//     index: number //индекс параметра, который был передан
// ) {
//     console.log(propertyKey, index);
// }

// @Logger()
// //в Декораторы можна передавать дополнительные параметры
// @Component(1)
// export class User {
//     @Prop id: number;

//     @Method
//     updateId(@Param newId: number) {
//         this.id = newId;
//         return this.id;
//     }
// }

// console.log(new User().id);
// console.log(new User().updateId(2));
