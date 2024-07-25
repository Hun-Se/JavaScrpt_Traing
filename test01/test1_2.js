// 변수상자

const name1 = '홍길동1';
const age1 = 21;

console.log(`이름과 나이 : ${name1}, ${age1}`);

const age2 = '10';
const age3 = Number(age2);

console.log(`age2의 크기 : ${typeof(age2)}, age3의 크기 : ${typeof(age3)}`);

// 함수상자

function add(a,b) {
    return a + b
}

function add2(a,b) {
    return arguments[0] + arguments[1]
}

const result1 = add(10,10);
const result2 = add2(10,20);
console.log(result1);
console.log(result2);

// 화살표 함수로 바꾸기

const addArrow =  (a,b) => {
    return a + b
}

// 콜백 함수
function add3(a, b, callback) {
    callback(a + b);
}

add3(10, 10, (result) => {
    console.log(`더하기 결과 : ${result}`);
})

// 붕어빵만들기
const fish1 = {
    name: '붕어빵1',
    age: 1,
    swim: function () {
        console.log(this);
    },
    swimArrow: () => {
        console.log(this.name);
        console.log('붕어빵이 헤엄칩니다.');
    }
}

console.log(fish1.swim);

console.log(`fish1의 이름은 : ${fish1.name}`);

// console.log(fish1.swim());

// class Fish {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     // swim
//     swim () {
//         console.log('붕어빵이 헤엄칩니다.');    
//     }
// }

// const fish2 = new Fish('붕어빵1', 1);
// const fish3 = new Fish('붕어빵2', 2);

function add5(a, b, callback) {
    callback(a + b);
}

const callback = (result) => {
    console.log(`더하기 결과 : ${result}`);
}

add5(10, 10, callback);