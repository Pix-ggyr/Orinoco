const srcAPI = "http://localhost:3000/api/furniture/";

    //GET products list

async function searchAllFurnitures() {
    try {
        let productsCollection = await getProducts();
        console.log(productsCollection);
        productsCollection.forEach(item => {
            createElement({
                containerId: "items-display",
                type: "div",
                classList: "new-furniture",
                contentAttribution: {
                    type: "innerHTML",
                    value: `
                    <a href="product.html?id=${item._id}">
                        <h2>${item.name}</h2>
                        <img src="${item.imageUrl}"/>
                    </a>`
                }
            });            
        }); 
    } catch (_e) {
        console.log("la page n'existe pas");
        createElement({
            containerId: "items-display",
            type: "div",
            contentAttribution: {
                type: "innerHTML",
                value: `
                <p> This collection page doesn't exist</p>
                `
            }
        })
    }
}

searchAllFurnitures();

    

