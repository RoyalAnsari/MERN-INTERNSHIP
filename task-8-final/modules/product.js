function Product(id,name,price,stock,sold){

this.id=id
this.name=name
this.price=price
this.stock=stock
this.sold=sold

}

Product.prototype.isLowStock=function(){

return this.stock<10

}

export default Product