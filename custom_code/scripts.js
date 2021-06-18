let display = document.getElementById('displ');


//let ourson = fetch("http://localhost:3000/api/teddies");
//console.log(ourson);

/*fetch("http://localhost:3000/api/teddies")
    .then(res => res.json());
            {
                if(res.ok)
            {console.log ('Success!')}
                else{console.log("error from backend")}
            
            }
    .then(data => console.log(data))
    .catch(error => console.log("error from frontend!!")) */

    fetch("http://localhost:3000/api/teddies").then(res=>res.json()).then(data=> console.log(data) );