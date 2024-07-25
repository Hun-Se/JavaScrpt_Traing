// 상속하기

class Fish {

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    swim() {
        console.log('붕어빵이 헤엄칩니다.');
    }


}

class Shark extends Fish {

}

const fish1 = new Fish('붕어빵1', 1);
const shark1 = new Shark('상어빵', 2);
console.log(`상어빵: ${shark1.name}, ${shark1.age}`);

const arrLiteral = [];
const arr = new Array();
arr.push(1);

console.log(arr);