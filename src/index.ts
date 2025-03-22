

function add( a: number, b: number ) : number{
    return a + b;
}

function substract( a: number, b: number ) : number{
    return a - b;
}

function multiply( a: number, b: number ) : number{
    return a * b;
}


function divide( a: number, b: number ) : number{
    return a / b;
}


function operate(number1:number, operator:'+'|'-'|'*'|"/", number2 = 0) : number{

    if (operator === '+'){
        return add(number1, number2);
    }
    else if (operator === '-'){
        return substract(number1, number2);
    }
    if (operator === '*'){
        return multiply(number1, number2);
    }
    if (operator === '/'){
        return divide(number1, number2);
    }
    return 0;
}

//Create the functions that populate the display when you click the digit buttons.
// You should store the content of the display (the number) in a variable
// for use in the next step.

let output : HTMLOutputElement | null = document.querySelector("output");



// creating button list
let buttonList : NodeList = document.querySelectorAll("button");
let operationList: any[] = [];
let result:number = 0;
// this flags helps me add digits to the second numeral.
let flag:boolean = false;

// populating the buttons with event listener
for (let node of buttonList){
    if (node.textContent === "Clear"){
        node.addEventListener("click", (e)=>{
            output!.textContent = '';
            operationList = [];
        });
    }else if(node.textContent === '='){
        node.addEventListener("click", e =>{
            if(operationList.length < 2){

            }else{
            operationList.push(parseInt(output!.textContent!));
            output!.textContent = operate(operationList[0],operationList[1],operationList[2]).toString();
            operationList = [parseInt(output!.textContent)];
            console.log(e.target, operationList);
            }
        })
    }else if(!isNaN(parseInt(node.textContent!))){
        node.addEventListener("click", (e)=>{

            if(operationList.length !== 0){
                if (!flag){
                    output!.textContent = node.textContent ?? "";
                    console.log(e.target, operationList);
                    flag = true;
                }else{

                    output!.textContent += node.textContent ?? "";
                    console.log(e.target, operationList);
                }
            }else{
                output!.textContent += node.textContent ?? "";
                console.log(e.target, operationList);
            }
        });
    }else{
        node.addEventListener("click", e => {
            flag = false;
            if(operationList.length === 3){
                output!.textContent = operate(operationList[0],operationList[1],operationList[2])
                    .toString();
                operationList = [parseInt(output!.textContent)];
            }
            if(operationList.length === 1){
                operationList.push(node.textContent);
                console.log(e.target, operationList);
            }else if(operationList.length === 0 ){
                operationList.push(parseInt(output?.textContent!));
                operationList.push(node.textContent);
                console.log(e.target, operationList);
            }else{
                operationList.push(parseInt(output?.textContent!));
                output!.textContent = operate(operationList[0],operationList[1],operationList[2])
                    .toString();
                operationList = [parseInt(output!.textContent)];
                operationList.push(node.textContent);
                console.log(e.target, operationList);
            }
//if  operationList.includes(node.textContent) (esto para lidiar con operaciones consecutivas respetando
// la operacion de a dos numeros.)
        });
    }
}

/*
* Make the calculator work! You’ll need to store the first and second numbers
* input by the user and then operate() on them when the user presses the = button,
*  according to the operator that was selected between the numbers.

    You should already have the code that can populate the display,
    * so once operate has been called, update the display with the result of the operation.
    This is the hardest part of the project.
    *  You need to figure out how to store all the values and call the operate function with them.
    * Don’t feel bad if it takes you a while to figure out the logic.

* */

