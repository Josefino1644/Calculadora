const preOperationText = document.querySelector("#pre-operation");
const atualOperationText = document.querySelector("#atual-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(preOperationText, atualOperationText){
        this.preOperationText = preOperationText
        this.atualOperationText = atualOperationText
        this.atualOperation = ""
    }

    addDigit(digit){

        if(digit === "," && this.atualOperationText.innerText.includes(",")){
            return;
        }

        this.atualOperation = digit
        this.uptadeScreen()
    }

    processOperation(operation){
        
        if(this.atualOperationText.innerText === "" && operation !== "C"){
            if(this.preOperationText.innerText !== ""){
                this.changeOperation(operation);
            }
            return
        }

        let operationValue
        let pre = +this.preOperationText.innerText.split(" ")[0];
        let atual = +this.atualOperationText.innerText

        switch(operation){
            case "+":
                operationValue = pre + atual;
                this.uptadeScreen(operationValue, operation, pre, atual)
                break;

            case "-":
                operationValue = pre - atual;
                this.uptadeScreen(operationValue, operation, pre, atual)
                break;

            case "/":
                operationValue = pre / atual;
                this.uptadeScreen(operationValue, operation, pre, atual)
                break;

            case "*":
                operationValue = pre * atual;
                this.uptadeScreen(operationValue, operation, pre, atual)
                break;
            
            case "DEL":
                this.precessDelOperator();
                break;

            case "CE":
                this.processCeOperator();
                break;
            
            case "C":
                this.processCOperator();
                break;
            
            case "=":
                this.processEqualOperator();
                break;

            default:
                return;
        }

    }
    
    // Atualizar
    uptadeScreen(
        operationValue = null,
        operation = null,
        atual = null,
        pre = null
    ) {
        if(operationValue === null){
            this.atualOperationText.innerText += this.atualOperation 
        } else {
            if(pre === 0){
                operationValue = atual
            }

            this.preOperationText.innerText = `${operationValue} ${operation}`
            this.atualOperationText.innerText = "";
        }
    }

    changeOperation(operation){
        const mathOperations = ["*", "/", "-", "+"]

        if(!mathOperations.includes(operation)) {
            return
        }

        this.preOperationText.innerText = this.preOperationText.innerText.slice(0, -1) + operation
    }

    precessDelOperator(){
        this.atualOperationText.innerText = this.atualOperationText.innerText.slice(0, -1)
    }
    
    processCeOperator(){
        this.atualOperationText.innerText = ""
    }

    processCOperator(){
        this.atualOperationText.innerText = ""
        this.preOperationText.innerText = ""
    }

    processEqualOperator(){

        const operation = preOperationText.innerText.split(" ")[1]
        this.processOperation(operation)
    }
}


const calc = new Calculator(preOperationText, atualOperationText)

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >=0 || value === ","){
            calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }

    })
});

