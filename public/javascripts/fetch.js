function theTable(table,data){
    for(let e of data)
    {
        let user = {
            id: e.id,
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
            if(user[i]== "modifier"){
                let btn = document.createElement("button");
                btn.innerHTML=i;
                btn.classList.add('btn');
                btn.classList.add('btn-outline-primary');
		        cellule.appendChild(btn);
                row.appendChild(cellule);
                btn.onclick = function() {
                    fetch(`http://localhost:3000/users/${e.id}`, {
                    method: 'put',  
                }).then(location.reload())
            }  
            } 
            else if(user[i] == "supprimer"){
                let btn = document.createElement("button");
                btn.innerHTML=i;
                btn.classList.add('btn');
                btn.classList.add('btn-outline-danger');
                cellule.appendChild(btn);
                row.appendChild(cellule);
                btn.onclick = function() {
                fetch(`http://localhost:3000/:${e.id}`, {
                    method: 'delete',
                }).then(location.reload())
                }
            }
    
        
            else{  /// l'ajout des infos des users
            let cellText = document.createTextNode(user[i]);   /// l'info dans la cellule
            cellule.appendChild(cellText);   /// l'info dans la cellule
            row.appendChild(cellule);   
            }
        }    
        table.appendChild(row);    /// l'ajout de la ligne dans la table

    }
    }

    
    let table = document.querySelector("table");
    //const fetch = require("node-fetch");



    fetch('http://localhost:3000/users/all')    
        .then(res => res.json())                  /// to read response body and parse as JSON
        .then(data => theTable(table, data));     




