// function func1() {
//     console.log('func1');
//     func2();
//   }
  
//   function func2() {
//     setTimeout(function() {
//       console.log('func2');
//     }, 0);
  
//     func3();
//   }
  
//   function func3() {
//     console.log('func3');
//   }
  
//   func1();

// function func1() {
//     console.log('func1');
//     func2();
// }

// function func2() {
//     const el = document.querySelector('.foo');

//     el.addEventListener('click', function () {
//         this.style.backgroundColor = 'indigo';
//         console.log('func2');
//     })

//     func3();
// }

// function func3() {
//     console.log('func3');
// }

// func1();



// function 

함수선언식();
/// 호이스팅이 안되서 에러
// 함수표현식();
// 화살표함수();

// 함수선언식: 호이스팅 가능
function 함수선언식 () {
    console.log("함수선언식");
}


//함수표현식: 호이스팅 불가능 -> 선언, 초기화만 된채로 호이스팅 되고 할당까지 호이스팅 되지 않기 때문이다.
const 함수표현식 = function () {
    console.log("함수표현식");
}

// 화살표함수: 호이스팅 불가능
const 화살표함수= () => { console.log("화살표함수");}

// 화살표 함수가 생략 가능할때

const main1 = () => console.log(this);

const main2 = (a) => {return a};

// 리턴 생략 가능
const main3 = (a) => {a};

// () 생략가능 -> 대신 인자가 하나 일때만
const main4 = a => {a};

// {} 생략가능 -> {} 안에 코드가 한 줄 일때만
const main5 = a => a;


//this 값 확인

function test1 () {
    console.log(this);
}

test1();

const cat = {
    name: 'cat1',
    test1: function() {
        console.log(this.name);
    }
}

cat.test1();


const test2 = () => {
    console.log('hi');
    console.log(this)
}

const cat2 = {
    name: 'cat2',
    test2: () => {console.log(this)}
}

window.cat2.test2();