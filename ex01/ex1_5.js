// 붕어빵 만들기

// let name = '홍길동1';
// let age = 21;

// let fish1 = {
//     name: '홍길동1',
//     age: 21,
//     swim: function () {
//         console.log('붕어빵이 헤엄칩니다.');
//     }
// }

// console.log(`fish1 붕어빵의 이름: ${fish1.name}`)
// fish1.swim();

class Fish {
    
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    swim() {
        console.log(this);
        console.log('붕어빵이 헤엄칩니다.');
    }
}

let fish2 = new Fish('붕어빵1', 1);
console.log(`fish2 붕어빵의 이름 : ${fish2.name}`);
fish2.swim();

