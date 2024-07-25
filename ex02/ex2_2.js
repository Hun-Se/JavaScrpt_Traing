// 여러 개의 값을 하나의 변수상자에 넣기

let names = ['홍길동1', '홍길동2', '홍길동3'];
console.log(`names 변수상자 안에 들어있는 칸의 개수: ${names.length }`);

let first = names[0];

let fish1 = {
    name: '붕어빵',
    age: 1
}
console.log(`첫번째 칸 : ${first}`);

if (Array.isArray(names)) {
    console.log(`names가 배열입니다.`);
}

if (Array.isArray(fish1)) {
    console.log(`fish1이 배열입니다.`);
}

// for문(C스타일 for문)
for (let i = 0; i < names.length; i++) {
    console.log(`names의 ${i}번째 요소 : ${names[i]}`);
}

names.forEach((value, index) => {
    console.log(`names의 ${index}번째 요소: ${value}`);
});

// for문
for (let name of names) {
    console.log(`names의 요소 ${name}`);
}

// 배열에 추가하기
names.push('홍길동4');
// JSON -> 글자로 바꿔준다.
console.log(`names 전체 : ${JSON.stringify(names)}`);
console.log(names);

console.log(`fish1의 전체: ${JSON.stringify(fish1)}`);

const fish2 = {
    name: '붕어빵2',
    children: [
        {
            name: '자식붕어빵1',
            age: 1
        },
        {
            name: '자식붕어빵2',
            age: 1
        }
    ]
}

console.log(`fish2의 이름 : ${fish2.name}`);
console.log(`fish2의 이름 : ${fish2['name']}`);

const attr1 = 'name';
console.log(`fish2의 속성 : ${fish2[attr1]}`);
console.log(`fish2의 두번째 자식의 나이 : ${fish2['children'][1]['age']}`);

