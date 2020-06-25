function displayItems() {
    var searchItems = new XMLHttpRequest();
    searchItems.onreadystatechange = function() {
        if (searchItems.readyState == XMLHttpRequest.DONE && searchItems.status == 200) {
            let itemsList = JSON.parse(searchItems.response);
            console.log(itemsList);
            const items = document.getElementById("items-display");
            itemsList.forEach(item => {
                console.log(item.name);
                const newItem = document.createElement("div");
                items.appendChild(newItem);
                newItem.classList.add("new-item");
                const link = document.createElement("a");
                newItem.appendChild(link); 
                link.href = "Produit.html?id=" + item._id; //penser à ajouter la vérification de l'url pour voir s'il est correct.
                link.innerHTML = `<h2>${item.name}</h2><img src="${item.imageUrl}"/>`; 
            })
        }
    };
    searchItems.open("GET" , "http://localhost:3000/api/furniture/");
    searchItems.send();
}

displayItems();