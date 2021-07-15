// Async/Await

function funcTwo()
{
      return new Promise((resolve) =>
      {setTimeout(() => {
            resolve("funcTwo")
      }, 2000);})
}

async function func() 
{console.log("ok")
let text = await funcTwo()
return text
}

console.log(func())

func().then(res => console.log(res))

/*que fait ce code?
1) éxécuter func: log ok 
2) puis execute functionTwo
3) puis attends func two pour créer la variable text
4) return le text 
*/

//Map promise.all


//données d'entrée
let timings = [1000,2000,3000]
//tableau des promesses à récupérer après résolution
let promises = []

// .map permet d'appliquer tour à tour toutes les données d'entrée(timings) comme argument à une fonction(timer)
let promisestoresolve= timings.map(timing => timer(timing))
//promises to resolve est un array de promises à résoudre
console.log("promisestoresolve",promisestoresolve)


//Promise.all accepte comme argument un array de promises
Promise.all(promisestoresolve).then(promises => {
      console.log ("promises display", promises) 
      displayPromises(promises)     // une fois les promesses traitée on les affiche.
      localStorage.setItem("promises",JSON.stringify(promises)) //on stock les données
      document.location.href="confirmation.html" //on change de page
})

function displayPromises(promises)
{basketContainer.innerHTML = promises}



timer(timings[0]).then(res => {
      console.log("WTF2",res)
     // basketContainer.innerHTML = res
})
     
      basketContainer.innerHTML = promises


function timer(timing)
{
      return new Promise ((resolve) => {setTimeout(() => 
            { 
            let timedreturnpromise = returnTimer(timing)
            console.log("timeout return",timedreturnpromise)  
            resolve (timedreturnpromise)
      }, timing);})

     function returnTimer(timing)
     {
            return ("time"+timing+"returned")
     }

}
