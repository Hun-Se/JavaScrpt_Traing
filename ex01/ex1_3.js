console.log('안녕');

// 변수 상자
let name1;
name1 = '홍길동1';

console.log("name1 변수상자의 크기 : " + typeof(name1));

let age = 21;

console.log(`age 변수상장의 크기: ${typeof(age)}`);

let visible = true;
console.log(`visible 변수상자의 크기: ${typeof(visible)}`);

let name2;

console.log(`name2 변수 상장의 크기: ${typeof(name2)}`);


console.log(`이름과 나이 ${name1}, ${age}`); //인터폴레이션 방식을 권장한다.

if (typeof(name2) == 'undefined') {
    console.log('name2 변수상자의 크기가 결정되지 않았습니다.');
} else {
    console.log('name2 변수상자의 크기가 결정되었습니다.');
}

name2 = '홍길동2';

if (name2) {
    console.log('name2 변수상자의 크기가 결정되었스빈다.');
} else {
    console.log('name2 변수상자의 크기가 결정되지 않았습니다.');
}

let age2 = '22가';
let age3 = Number(age2);

console.log(`age3 : ${age3}`);