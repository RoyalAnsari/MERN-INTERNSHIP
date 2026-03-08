import Product from "./modules/product.js"
import {debounce,throttle} from "./modules/utils.js"
import {createAuditCounter} from "./modules/audit.js"

let products=[]

const auditCounter=createAuditCounter()
async function loadProducts(){

const res=await fetch("./data/products.json")
const data=await res.json()

products=data.map(p=>new Product(
p.id,
p.name,
p.price,
p.stock,
p.sold
))

displayProducts(products)

}

loadProducts()
function displayProducts(products){

const grid=document.getElementById("productGrid")

grid.innerHTML=""

products.forEach(p=>{

const div=document.createElement("div")

div.className="card"

div.innerHTML=`
<h3>${p.name}</h3>
<p>Price: ${p.price}</p>
<p>Stock: ${p.stock}</p>
`

grid.appendChild(div)

})

}
document.getElementById("search")
.addEventListener(
"input",
debounce(function(e){

const value=e.target.value.toLowerCase()

const filtered=products.filter(p=>
p.name.toLowerCase().includes(value)
)

displayProducts(filtered)

},300)
)
window.addEventListener(
"scroll",
throttle(function(){

console.log("scroll event optimized")

},500)
)
document.getElementById("exportBtn")
.addEventListener("click",function(){

const json=JSON.stringify(products,null,2)

const blob=new Blob([json],{type:"application/json"})

const a=document.createElement("a")

a.href=URL.createObjectURL(blob)
a.download="inventory.json"

a.click()

})