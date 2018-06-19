exports.solve = function(fileName) {
  let formula = readFormula(fileName)
  let result = doSolve(formula.clauses, formula.variables)
  return result
}

function nextAssignment(currentAssignment) {

    var ass = currentAssignment.join("")
    var spli = ass.slice(0,ass.indexOf("1"))
    var spli2 = ass.slice(ass.indexOf("1"),ass.length)
    var valor = parseInt(ass, 2) + 1;
    valor = valor.toString(2);
    if(spli2.length < valor.length){
        return (spli.slice(0,spli.length-1)+valor).split("").map(Number)
    }else{
        return (spli+valor).split("").map(Number)
    }

}




function doSolve(clauses, assignment) {
  let isSat = false
  var first = assignment
  var semSolution = 0
  var naoE = 0
  var todasAtt = 0
  var deveSer = 0
  
  while (!(isSat) && semSolution == 0) {
                var confere = 0 
                var proces = new Array();
                for (var i = 0; i < clauses.length ; i++) {
                    proces[i] = new Array();
                }
                var ind2 = 0
                for(var i = 0 ; i < clauses.length ; i++){
                  var aux = ""
                  for(var q = 0 ; q < clauses[i].length;q++){
                    if(clauses[i][q] != "  " ){
                      aux += clauses[i][q]
                    }
                  }

                   var arr = aux.split(" ").map(Number)
                  naoE = 0
                  var ind3 = 0
                  var quebra = 0;
                  for(var j = 0 ; j < arr.length && quebra == 0  ; j++){
                    if(arr[j] < 0){
                      if(first[Math.abs(arr[j])-1] == 0){
                        proces[ind2][ind3] = 1
                        confere++ 

                        quebra = 1;
                        
                      }

                    }
                    else{
                      if(first[Math.abs(arr[j])-1] == 1){
                        proces[ind2][ind3] = 1
                        confere++ 
                        quebra = 1;
                        
                      }
                    }
                    
                    ind3++
                  }
                  
                  ind2++
                
                }
                if(confere == clauses.length){
                  var valor = first
                  isSat = true
                  
                }
                todasAtt++;
                if(todasAtt-1 ==Math.pow(2,assignment.length)){
                  semSolution = 1
                }
                first = nextAssignment(first)
                
                  
  }
  
  let result = {'isSat': isSat, satisfyingAssignment: null}
  if (isSat == true) {
    result.satisfyingAssignment = valor
    
  }
   return result
  
  
}
function readFormula(fileName) {
  var fs = require('fs')  ;
  let text = fs.readFileSync(fileName,"utf-8").split("\n") 
  function readClauses(text){
    var arr = []
    var ind = 0
    var compara2 = 1



    for(i = 0 ; i < text.length ; i++){
        var compara = text[i][0] 
        if(compara2 == 0 && text[i] != []){
          arr[ind] = text[i]

          ind++

        }

        if(compara == "p"){
          compara2 = 0
        }
        

    }
    return arr
  }
  function readVariables(clauses){
    var arr2 = []
    var ind2 = 0

    for(i = 0 ; i < clauses.length ; i++){
        var arr3 = clauses[i].split(" ") 
        for(j = 0 ; j < arr3.length ; j++){
          var comp = false;
          for(q = 0 ; q < arr2.length ; q++){
              if(Math.abs(arr2[q]) == Math.abs(arr3[j]) ){
                comp = true
              }
          }
          if(comp == false && arr3[j] != 0){
            arr2[ind2] = Math.abs(arr3[j]);
            ind2++;
          }
          
        }
    }
    var arrFinale = []
    for(q = 0; q < arr2.length;q++){
      arrFinale[q] = 0
    }
    return arrFinale
    
  }

function checkProblemSpecification(text, clauses, variables){
  var check1 = false
  var check2 = false

  for(i = 0 ; i < text.length ; i ++){

    if(text[i][0] == "p"){
        var spli = text[i].split(" ")
        if(spli[2] == variables.length ){
          check1 = true
        }
        if(spli[3] == clauses.length ){
          check2 = true
        }
      
    }

  }
  return check1 && check2

}


  let clauses = readClauses(text)
  let variables = readVariables(clauses)
  
  let specOk = checkProblemSpecification(text, clauses, variables)

  let result = { 'clauses': [], 'variables': [] }
  if (specOk) {
    result.clauses = clauses
    result.variables = variables
  }
  


  return result
}


  