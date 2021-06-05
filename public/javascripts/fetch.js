function theTable(table,data){
    for(let e of data)
    {
        let user = {
            username: e.username,
            email: e.email,
            password: e.password,
            role: e.role,
            modifier: "modifier",
            supprimer: "supprimer"
        }
        let row = document.createElement("tr");

        for (let i in user) {
            let cellule = document.createElement("td");
            if(i== "modifier"){
                btn = document.createElement("BUTTON");
                btn.innerHTML=i;
                btn.classList.add('btn');
                btn.classList.add('btn-outline-danger');
                btn.onclick = function() {
                    document.querySelector("#gestion").classList.add("is-visible");  /// gestion des bouttons supprimer et modifier
                    document.querySelector("#update").setAttribute('action', `/users/:${e.id}`)
                    cellule.appendChild(btn);
            }  
            } 
            else if(i == "supprimer"){
                btn = document.createElement("BUTTON");
                btn.innerHTML=i;
                btn.classList.add('btn');
                btn.onclick = function() {
                fetch(`http://localhost:3000/users/:${e.id}`, {
                    method: 'DELETE',
                }).then(location.reload())
                cellule.appendChild(btn);
            }
            }
    
        
        else{  /// l'ajout dans la table
            let cellText = document.createTextNode(user[i]);
            cellule.appendChild(cellText);
            row.appendChild(cellule);
        }
        }    
        table.appendChild(row);

    }
    }

    
    let table = document.querySelector("table");
    const fetch = require("node-fetch");



    fetch('http://localhost:3000/users/')    
        .then(res => res.json())                  /// to read response body and parse as JSON
        .then(data => theTable(table, data));



 let btnClose = document.getElementById("del");
 btnClose.addEventListener("click", function() {
 const modal = document.querySelector("#gestion");
 modal.classList.remove("is-visible");
        })


theTable(table,data);