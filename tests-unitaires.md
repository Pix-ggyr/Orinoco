# PLAN DE TESTS UNITAIRES

**N'hésitez pas à utiliser `alert()`, `error()` et `console.log`() au long des tests**

___

## [index.html](https://github.com/Pix-ggyr/Orinoco/blob/2879f0805682c256e87c993fb2b27bff99e9524d/FRONT/index.html) Test de la réponse de l'API


  + La réponse de l'API doit inclure toutes les spécifications de l'objet, pour chacun d'eux.

  + Sur la page on devra trouver des boîtes pour autant d'objets à acheter contenus dans l'API. Dans chaque boîte on trouvera :

    1. un lien avec le nom de du produit venant de l'API
    2. un lien avec une image représentant le produit fournie par l'API
    3. le `href` du lien sera le même pour les deux paramètres ci-dessus
    
  + En cliquant sur ces liens, l'utilisateur doit être redirigé sur la page dédié au produit sélectionné. Si cela n'est pas le cas, il doit y avoir une erreur. Veuillez-vous référer à la XRH `windows.getProducts()` ici :
  
  https://github.com/Pix-ggyr/Orinoco/blob/2879f0805682c256e87c993fb2b27bff99e9524d/FRONT/JS/utilities.js#L106-L120
___

## [product.html](https://github.com/Pix-ggyr/Orinoco/blob/2879f0805682c256e87c993fb2b27bff99e9524d/FRONT/product.html) API test de la réponse de l'API et apport de l'ID dans l'URL dédiée

  + Pour chaque produit l'URL de la page produit est modifiée grâce à l'ajout de l'ID du produit en extension, par exemple :

    > Le lien pour la Coffee Table s'affiche comme ceci : `https://orinoco/products.html?id=5beaadda1c9d440000a57d98` Étant donné que `5beaadda1c9d440000a57d98` est l'ID que l'API nous renvoi pour la Coffee Table.

Si cela venait à ne pas marcher, une page vierge apparaîtrait avec un message "Ce produit n'existe pas". Pour vous en prémunir, veuillez tester la fonction `getProduct(id)` ici :

 https://github.com/Pix-ggyr/Orinoco/blob/2879f0805682c256e87c993fb2b27bff99e9524d/FRONT/JS/utilities.js#L90
 
  + Sur la page vous devriez voir s'afficher plusieurs données relatives au produit sélectionné, renvoyées par l'API :

    1. La désignation du produit `${Furniture.name}`
    2. Sa description `${Furniture.description}`
    3. Sa photo `${Furniture.imageUrl}`
    4. Son prix à l'unité HT `${Furniture.price}/100`
    5. Un menu `<option>` pour le choix de la finition (modifier)

Veillez à ce que toutes ces informations s'affichent correctement via les fonctionnalités de la page [product-details.js](https://github.com/Pix-ggyr/Orinoco/blob/2879f0805682c256e87c993fb2b27bff99e9524d/FRONT/JS/product-details.js)   

  + Pour chaque page produit, on trouvera en bas un boutton "Add to cart" qui réalise plusieurs actions en simultané : 

    1. Au clic, il fait apparaître une popup qui propose deux options d'actions : 
    
      > "continue shopping" ou "X" ferment la popup <br>
      > "go to cart" redirige vers [cart.html](https://github.com/Pix-ggyr/Orinoco/blob/2879f0805682c256e87c993fb2b27bff99e9524d/FRONT/cart.html)

    2. Au clic, il envoi une sauvegarde sous forme d'objet nommé `cart` dans le `localStorage`, cet objet contien le nom du produit acheté, son prix unitaire et le modifier pour la finition sélectionné à l'achat.
  
Veillez à ce que toutes ces informations aient bien été sauvegardées dans le Local Storage ici :

https://github.com/Pix-ggyr/Orinoco/blob/2879f0805682c256e87c993fb2b27bff99e9524d/FRONT/JS/product-details.js#L86-L132

___

## [cart.html](https://github.com/Pix-ggyr/Orinoco/blob/2879f0805682c256e87c993fb2b27bff99e9524d/FRONT/cart.html) récupération des informations contenues dans le `localStorage`, validation des données utilisateur et requête POST XHR


  + D'abord, la page cart.html doit afficher un tableau `<table>` dans lequel, chaque `<tr>` contient les informations d'un produit, c'est à dire d'une ligne contenue dans l'objet `cart` du `localStorage`. 

    > Si vous ajouté un produit au panier et que le tableau reste vide, alors il y a une erreur. <br>
    > Si vous n'avez ajouté au panier, alors le tableau existera mais sera complètement vide.  

  + Chaque ligne du tableau devrait montrer le nom du produit, le modifier pour la finition selectionné lors de l'achat, la quantité présente dans le panier pour cette combinaison spécifique, le prix unitaire et un bouton "remove", strictement dans cet ordre. Si des données sont manquantes, mal placées ou aberrantes il faudra vérifier la fonctionnalité `printCartSummary()` ici :
  
  https://github.com/Pix-ggyr/Orinoco/blob/2879f0805682c256e87c993fb2b27bff99e9524d/FRONT/JS/cart-summary.js#L39-L127

  + Le bouton "remove" appelle une fonction qui retranche 1 à la quantité initiale, remplace cette valeur dans le `localStorage` et rafraîchi la page. Si ce n'est pas le cas, il faudra vérifier la fonctionnalité `clearOneLine(key)` ici:
  
  https://github.com/Pix-ggyr/Orinoco/blob/2879f0805682c256e87c993fb2b27bff99e9524d/FRONT/JS/cart-utilities.js#L14-L31

  + La dernière `<tr>`  de `<table>` indique le prix total pour tous les objets présents dans le panier, c'est à dire dans l'objet `cart`.

  + Lorsque la commande est complète, l'utilisateur à deux choix sous forme de boutons d'action :

    1. **Clear** qui va effacer l'objet `cart` du `localStorage`, le sauvegarder à nouveau et rafraîchir la page.
    2. **Purchase** qui a deux fonctionnalités en simultané : 

      > Il affiche une popup demandant à l'utilisateur de remplir ses informations personnelles dans un formulaire, plus précisément : son nom, son prénom, son email, son adresse postale et sa ville. <br>
      > Il envoi à l'API, une fois que l'utilisateur à cliqué sur le bouton "order", toutes les informations issues des champs du formulaire et permet la génération d'un identifiant de commande unique `order_id`.


    Veillez à vérifier que la requête POST passe correctement et que le serveur reçoive bien un objet de contact contenant : nom, prénom, adresse, ville et email. Si ce n'est pas le cas, veuillez tester la fonctionnalité `windows.postOrder()` ici: 
    
    https://github.com/Pix-ggyr/Orinoco/blob/2879f0805682c256e87c993fb2b27bff99e9524d/FRONT/JS/utilities.js#L122-L135
    
    ainsi qu'ici:
    
    https://github.com/Pix-ggyr/Orinoco/blob/2879f0805682c256e87c993fb2b27bff99e9524d/FRONT/JS/cart-summary.js#L87-L106

      ***Veillez à vérifier que l'identifiant de la commande apparaît bien dans le `localStorage` dans un objet `order_id`***

  + Enfin, vérifiez que les informations utilisateur sont correctement vérifiées ici:
  
  https://github.com/Pix-ggyr/Orinoco/blob/2879f0805682c256e87c993fb2b27bff99e9524d/FRONT/JS/cart-summary.js#L82-L84


___


## Chouette, On a terminé. Tout fonctionne correctement. <br> Good job \o/ !
