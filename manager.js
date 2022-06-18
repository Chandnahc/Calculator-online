var fno;
var sno;
var braflag = 0;
var nextOp = 0;
var isRoot = 0;
var yesRoot = 0;

// function reverse(str) {
//     var splitString = str.split("");
//     var reverseArray = splitString.reverse();
//     var joinArray = reverseArray.join("");
//     return joinArray;
// }

function isEmpty(str){
    return(!str || str.length === 0);
}

function add(a) {

    ele = document.getElementById('answer').innerHTML;
    if((a == decodeEntities('&times;')) || (a == decodeEntities('&div;')) || (a == '%') || (a == '+') || (a == '-')){
        isRoot=1;
    }
    if(isRoot == 1 && a==decodeEntities('&Sqrt;')){
        yesRoot = 1;
    }
    //only one operator logic
    tp = ele.slice(-1);
    if ((tp == decodeEntities('&times;'))  || (tp == decodeEntities('&div;')) || (tp == '%') || (tp == '+') || (tp == '-')) {
        if ((a == decodeEntities('&times;')) || (a == decodeEntities('&div;')) || (a == '%') || (a == '+') || (a == '-')) {
            ele = ele.slice(0, -1); 
        }
        else{
            nextOp = 1;
        }
        
    }

    //plusminus logic here
    if (a == decodeEntities('&plusmin;')) {
        scd = ele.slice(-2);
        if (scd.slice(0, -1) == '+') {
            tp = ele.slice(-1);
            ele = ele.slice(0,-2);
            ele = ele + '-' + tp;
            // ele = reverse(ele);
            // console.log(ele);
            // ele.replace('+','-');
            // ele = reverse(ele);
            // console.log(ele);
        }
        else {
            if (scd.slice(0, 1) == '-') {
                tp = ele.slice(-1);
                ele = ele.slice(0,-2);
                ele = ele + '+' + tp;
                // ele = reverse(ele);
                // console.log(ele);
                // ele.replace('-','+');
                // ele = reverse(ele);
                // console.log(ele);
            }
        }
        document.getElementById('answer').innerText = ele;
    }
    else {
        //writing logic
        if(nextOp==1){
            if((a == decodeEntities('&times;')) || (a == decodeEntities('&div;')) || (a == '%') || (a == '+') || (a == '-')){
                perform('enter');
                ele = document.getElementById('answer').innerHTML;
                nextOp = 0;
            }
        }
        ele = ele + a;
        document.getElementById('answer').innerText = ele;
    }

    //bracket solve logic
    if (a == '(') {
        braflag = 1
    }
    if ((braflag == 1) && (a == ')')) {
        temp = ele.slice(1, -1);
        document.getElementById('answer').innerText = temp;
        perform('enter');
    }
}

var decodeEntities = (function () {
    // this prevents any overhead from creating the object each time
    var element = document.createElement('div');

    function decodeHTMLEntities(str) {
        if (str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
        }

        return str;
    }

    return decodeHTMLEntities;
})();

function perform(a) {
    switch (a) {
        case 'answer':
            perform('enter');
            break;
        case 'del':
            ele = document.getElementById('answer').innerHTML;
            ele = ele.slice(0, -1);
            document.getElementById('answer').innerText = ele;
            break;
        case 'enter':
            var test = document.getElementById('answer').innerHTML;
            document.getElementById('screen').innerHTML = test;
            let count = 0;
            const myArr = test.split("");
            // console.log(myArr);
            for (let i = 0; i < myArr.length; i++) {
                if ((myArr[i] == decodeEntities('&times;')) || (myArr[i] == decodeEntities('&Sqrt;')) || (myArr[i] == decodeEntities('&div;')) || (myArr[i] == '%') || (myArr[i] == '+') || (myArr[i] == '-')) {
                    if ((myArr[0] == '-')||(myArr[0] == '+')) {
                        continue;
                    }
                    else {
                        break;
                    }
                }
                else {
                    count++;
                    // console.log(count);
                }
            }
            const invisible = test.slice(0,count);
            // console.log(count)
            if(yesRoot == 1){
                isRoot = 0;
                yesRoot = 0;
                best = test.slice(count+1, test.length);
                document.getElementById('answer').innerHTML=best;
                perform('enter');
                temporary = document.getElementById('answer').innerHTML;
                // console.log(temporary);
                test = invisible + myArr[count] + temporary;
                document.getElementById('answer').innerHTML = test;
                // console.log(test);
                document.getElementById('screen').innerHTML = test;
            }
            
            fno = parseFloat(test.slice(0, count));
            sno = parseFloat(test.slice(count + 1, test.length));
            // console.log(sno)
            
            // console.log(fno);
            // console.log(sno);
            temp = myArr[count];
            // console.log(temp)
            if (temp == decodeEntities('&times;')) {
                if(isEmpty(sno)){
                    sno = 1;
                }
                if(isEmpty(fno)){
                    fno = 1;
                }
                perform('&times;');
            }
            if (temp == decodeEntities('&div;')) {
                if(isEmpty(sno)){
                    sno = 1;
                }
                if(isEmpty(fno)){
                    fno = 1;
                }
                perform('&div;');
            }
            if (temp == '%') {
                if(isEmpty(sno)){
                    sno = 0;
                }
                if(isEmpty(fno)){
                    fno = 0;
                }
                perform('%');
            }
            if (temp == '+') {
                if(isEmpty(sno)){
                    sno = 0;
                }
                if(isEmpty(fno)){
                    fno = 0;
                }
                perform('+');
            }
            if (temp == '-') {
                if(isEmpty(sno)){
                    sno = 0;
                }
                if(isEmpty(fno)){
                    fno = 0;
                }
                perform('-');
            }
            if (temp == decodeEntities('&Sqrt;')){
                if(isEmpty(sno)){
                    sno = 1;
                }
                if(isEmpty(fno)){
                    fno = 1;
                }
                perform('&Sqrt;');
            }
            break;
        case 'clear':
            document.getElementById('answer').innerText = '';
            document.getElementById('screen').innerHTML = '';
            break;

        case '&Sqrt;':
            document.getElementById('answer').innerHTML = fno * Math.sqrt(sno);
            break;
        case '&times;':
            document.getElementById('answer').innerHTML = fno * sno;
            break;
        case '&div;':
            document.getElementById('answer').innerHTML = fno / sno;
            break;
        case '%':
            document.getElementById('answer').innerHTML = fno % sno;
            break;
        case '+':
            document.getElementById('answer').innerHTML = fno + sno;
            break;
        case '-':
            document.getElementById('answer').innerHTML = fno - sno;
            break;
        default:
            break;
    }
}
