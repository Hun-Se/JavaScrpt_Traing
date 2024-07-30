
function add(a,b) {
    return a + b;
}

const result = add(10, 10);
console.log(`더하기 결과 : ${result}`);

// 화살표 함수
const add2 = (a, b) => {
        return a + b;
}
    
// 콜백 함수 
    
const add3 = (a, b, callback) => {
    setTimeout(() => {
        const result = a + b;
        // return result;
        callback(null, result);
    }, 2000);
    console.log('add 실행');
}

const divide = (a, b, callback) => {
    setTimeout(() => {
        if (b == 0) {
            callback(`두번째 값이 없습니다.`, null);
            return;
        }
        
        const result = a / b;
        callback(null, result);
    }, 1000);

    console.log('divide 실행');
}

add3(10, 10, (err ,result) => {
    console.log(`콜백함수 안에서 더하기 결과 ${result}`);
});


divide(100, 10, (err, result) => {
    if (err) {
        console.error(`에러 발생 : ${err}`);
        return;
    }
    console.log(`콜백함수 안에서 나누기 결과 : ${result}`);
})

divide(100, 5, (err, result) => {
    if (err) {
        console.error(`에러 발생 : ${err}`);
        return;
    }

    console.log(`콜백함수 안에서 나누기 결과 : ${result}`);

    add3(10, 10, (err, result) => {
        if (err) {
            console.error(`에러 발생 : ${err}`);
            return;
        }
        console.log(`콜백함수 안에서 더하기 결과 ${result}`);
    });
})

function a() {
    setTimeout(()=> {
        console.log('비동기 실행');
    }, 0)

}

function b() {
    console.log('b');
}


function c() {
    console.log('c');
}
const add4 = (a, b) => new Promise((resolve, reject) => {
        add3(a, b, (err, result) => {
            if (err) {
                reject(err);
            }           

            resolve(result);
        });
    });

const divide4 = (a, b) => { return new Promise((resolve, reject) => {
        divide(a,b, (err, result) => {
            if (err) {
                reject(err);
                return;
            } 

            resolve(result);
        })
    })}


const doCalc = async () => {
    try {
        const result1 = await divide4(200, 10);
        console.log(`나누기 결과 : ${result1}`);
        
        const resutl2 = await add4(result1, 10);
        console.log(`더하기 결과 : ${resutl2}`);
    } catch (err) {
        console.error(err)
    }
}
doCalc();



function test(a) {
    if (a) {
        console.log(a)
    }
}

test(0)