
const generateHead = () => {
    console.log("#include <stdio.h>\n");
    console.log("int main() {");

};

const generateFooter = () => {
  console.log("return 0;\n");
  console.log("}");
}

const applications = {

    define(expr) {
        if (isNaN(expr.args[1].value) == false) {
          console.log(`int ${evaluate(expr.args[0])} = ${expr.args[1]};`);
        } else {
          console.log(`char ${expr.args[0].name}[] = "${expr.args[1].value}";`);

        }
        
    }
};

let ArithOps = [">", "<", "+", "-", "*", "/"];

const evaluate = (expr) => {
  if (expr.type == "apply") {
    if (expr.operator.name === "define") {
     switch(isNaN(expr.args[1].value)) {
      case false:
       return `int ${expr.args[0].name} = ${expr.args[1].value};`
      case true:
        return `char ${expr.args[0].name}[] = "${expr.args[1].value}";`
     }
    } else if (expr.operator.name === "print") {
      return `printf("${expr.args[0].value}");`
    } else if (expr.operator.name === "do") {
      for (let i = 0; i < expr.args.length; i++) {
        evaluate(expr.args[i]);
      }
    } else if (expr.operator.name === "if") {

      let expr1 = evaluate(expr.args[0]);
      let expr2 = evaluate(expr.args[1]);
      let expr3 = evaluate(expr.args[2]);

      return `if (${expr1}) {\n 
          ${expr2}\n
      } else {\n
        ${expr3}
      }`;

    } else if (ArithOps.includes(expr.operator.name)) {
      let expr1 = evaluate(expr.args[0]);
      let expr2 = evaluate(expr.args[1]);
      return `${expr1} ${expr.operator.name} ${expr2}`
    } else if (expr.operator.name === "do") {
      let block = "";
      for (let i = 0; i < expr.args.length; i++) {
        block.concat(evaluate(expr.args[i]));
      }
      return block;
    }
  } else if (expr.type === "word") {
    return `${expr.name}`;
  } else if (expr.type === "value") {
    return `${expr.value}`
  }
}

const compile = (expr) => {
  generateHead();
  console.log(evaluate(expr));
  generateFooter();
}

console.log(compile(
  {
    "type": "apply",
    "operator": {
      "type": "word",
      "name": "do"
    },
    "args": [
      {
        "type": "apply",
        "operator": {
          "type": "word",
          "name": "print"
        },
        "args": [
          {
            "type": "value",
            "value": "one"
          }
        ]
      },
      {
        "type": "apply",
        "operator": {
          "type": "word",
          "name": "print"
        },
        "args": [
          {
            "type": "value",
            "value": "two"
          }
        ]
      }
    ]
  }
  
  
));

