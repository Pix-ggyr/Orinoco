# UNIT TESTS PLAN

**Do not hesitate to use `alert()`, `error()` and `console.log`() along the ongoing tests**

___

## index.html API response test

  + The API response should include all items specifications, if not, path is not correct.

  + On page we should have a box for each item in the database, each box should contain :

    1. a link with the name of the item oncoming from the API
    2. a link with an image of the product oncoming from the API
    3. link `href` is the same for both name and image
    
  + By clicking on those links the visitor should be redirected on product page, if not, the path is not correct. Please check **utilities.js** l.106 if `getProducts()` is working properly.
___

## products.html API response and URL's customization

  + URL for each product in the database should contain product's ID as in :

    > The link of the Coffee Table's product page should display like so : `https://orinoco/products.html?id=5beaadda1c9d440000a57d98` Such as `5beaadda1c9d440000a57d98` is the ID of the Coffee Table returned by the API.

If it's not the case, please check `getProduct(id)` in **utilities.js** l.90.

  + On page you should be able to see several datas oncoming from the API request :

    1. Product's designation `${Furniture.name}`
    2. Product's description `${Furniture.description}`
    3. Product's image `${Furniture.imageUrl}`
    4. Product's price `${Furniture.price}/100`
    5. An `<option>` for the finition modifier

***Make sure that all that informations display in the appropriate page section.***   

  + On the bottom page for each item you should have a "Add to cart" : 

    1. On click a popup appears with two choices : 
    
      > "continue shopping" or "X" closes popup <br>
      > "go to cart" redirects on cart.html

    2. On click, saves item name, unit price and selected modifier to the `localStorage` within an object `cart`. 
  
Make sure that all those informations have been correctly stored by checking in product-details.js from the *line 86*

___

## cart.html getting localStorage datas, user informations treatment and POST XHR

  + First, cart.html should display a `<table>` in which, each `<tr>` is related to an item in the object `cart` saved in `localStorage`. 

    > If you've added item into `cart` and an empty `<table>`, an error has occured. <br>
    > If you've not added anything, then `<table>` should be empty.  

  + Each table row should show item name, modifier, quantity, unit price and a "remove" button, in this very order. If some datas are missing or misplaced, please check the object `printCartSummary()` in **cart-summary** starting l.39.

  + The "remove" button calls a function which subtract 1 to the previous quantity, replace the quantity initial value in `localStorage` and refresh current page. If it's not the case, please check if the object `clearOneLine(key)` in **cart-utilities.js** from *l.14* works properly.

  + `<table>` last `<tr>` indicates total price for all the items inside the object `cart`.

  + When the order's complete, customers have two choices :

    1. **Clear** which remove the object `cart` from the `localStorage` and refresh.
    2. **Purchase** which has two functionnalities : 

      > Displays a popup inside of which customer is called to fill up his personnal informations such as : Name, Lastname, Email, Address and City. <br>
      > Sends to the API server, after the customer has clicked on **order**, thoses informations and generates a unique *order_id*.


      Please check that the POST request to the server sends customer informations into an object which contains the following fields : name, firstname, address, city and email address. If it's not the case, please test `windows.postOrder()` in ***utilities.js***  from *ligne 122* and *lignes 87 to 106* in ***cart-summary.js***

      ***Please check that the object `order_id` appears correctly in the `localStorage`***

  + Please check that user inputs verification is working correctly in **cart-summary.js** l.82 to l.84.


___


## Hurray, we're done. Everything is working properly. <br> Good job \oo/ !