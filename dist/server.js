(()=>{"use strict";var t={n:e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},d:(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};const e=require("express");var r=t.n(e);const n=require("express-session");var o=t.n(n);const i=require("dotenv");t.n(i)().config();const s=process.argv[4]||process.env.PERSISTENCE||1,d={ENVIRONMENT_MODE:process.env.ENVIRONMENT_MODE,MONGO_ATLAS_URL:process.env.MONGO_ATLAS_URL,MONGO_OPTIONS:{useNewUrlParser:!0,useUnifiedTopology:!0},SECRET_KEY:process.env.SECRET_KEY,PERSISTENCE:s,PORT:process.env.PORT,TWILIO_ACCOUNT_SID:process.env.TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN:process.env.TWILIO_AUTH_TOKEN,TWILIO_NUMBER:process.env.TWILIO_NUMBER,TWILIO_WHATSAPP:process.env.TWILIO_WHATSAPP,TWILIO_ADMIN_NUMBER:process.env.TWILIO_ADMIN_NUMBER,GMAIL_MAIL:process.env.GMAIL_MAIL,GMAIL_PROVISIONAL_PASS:process.env.GMAIL_PROVISIONAL_PASS,SESSION_TIME:process.env.SESSION_TIME},c=require("connect-mongo");var u=t.n(c);const a=require("cluster");var l=t.n(a);const h=require("os");var m=t.n(h);const p=require("winston");var f=t.n(p);const y=f().createLogger({transports:[new(f().transports.Console)({level:"info",format:f().format.combine(f().format.colorize(),f().format.simple())})]}),v=f().createLogger({transports:[new(f().transports.Console)({level:"info",format:f().format.combine(f().format.errors({stack:!0}),f().format.timestamp(),f().format.prettyPrint())}),new(f().transports.File)({filename:"logs/error.log",level:"error",format:f().format.combine(f().format.errors({stack:!0}),f().format.timestamp(),f().format.prettyPrint())})]}),g=(f().createLogger({transports:[new(f().transports.Console)({level:"info",format:f().format.combine(f().format.colorize(),f().format.simple())}),new(f().transports.File)({filename:"logs/warn.log",level:"warn",format:f().format.combine(f().format.errors({stack:!0}),f().format.timestamp(),f().format.prettyPrint())})]}),t=>y.info(t)),w=t=>v.error(t),I=require("mongoose");var P=t.n(I);const O=new(P().Schema)({name:{type:String,required:!0,minlength:3,maxlength:70},price:{type:Number,required:!0,min:0},description:{type:String,required:!1,minlength:6,maxlength:200},photoURL:{type:String,required:!0,minlength:8,maxlength:200},stock:{type:Number,required:!1,min:0},category:{type:String,required:!0,min:0},timestamp:{type:String,required:!1,default:(new Date).toLocaleString()}}),_=P().model("products",O);const C=()=>{return t=void 0,e=void 0,n=function*(){try{yield P().connect(`${d.MONGO_ATLAS_URL}`),g("connected to mongoDB Atlas")}catch(t){w(t)}},new((r=void 0)||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function d(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,d)}c((n=n.apply(t,e||[])).next())}));var t,e,r,n};var S=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function d(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,d)}c((n=n.apply(t,e||[])).next())}))};const A=class{constructor(){}getProductById(t){return S(this,void 0,void 0,(function*(){throw new Error("Product - getById not Implemented")}))}getAll(){return S(this,void 0,void 0,(function*(){throw new Error("Product - getAll not Implemented")}))}addProduct(t){return S(this,void 0,void 0,(function*(){throw new Error("Product - addProduct not Implemented")}))}updateProductById(t,e){return S(this,void 0,void 0,(function*(){throw new Error("Product - updateProductById not Implemented")}))}deleteProductById(t){return S(this,void 0,void 0,(function*(){throw new Error("Product - deleteProductById not Implemented")}))}};var B=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function d(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,d)}c((n=n.apply(t,e||[])).next())}))};class $ extends A{constructor(t,e){super(),this.model=t,this.DTO=e,C()}static getInstance(t,e){return this.instance||(this.instance=new $(t,e)),this.instance}getAll(){return B(this,void 0,void 0,(function*(){try{return(yield this.model.find()).map((t=>new this.DTO(t).toJson()))}catch(t){w(`MongoAtlas getAll method error: ${t}`)}}))}getProductById(t){return B(this,void 0,void 0,(function*(){try{if(!P().isValidObjectId(t))return;const e=yield this.model.findById(t);return e?new this.DTO(e).toJson():null}catch(t){w(`MongoAtlas getProductById method error: ${t}`)}}))}getByCategory(t){return B(this,void 0,void 0,(function*(){try{const e=yield this.model.find({category:{$in:`${t}`}});return e?e.map((t=>new this.DTO(t).toJson())):null}catch(t){w(`MongoAtlas getById method error: ${t}`)}}))}addProduct(t){return B(this,void 0,void 0,(function*(){try{const e=new this.model(t),r=yield e.save();return new this.DTO(r).toJson()}catch(t){w(`MongoCloud addProduct method error: ${t}`)}}))}updateProductById(t,e){return B(this,void 0,void 0,(function*(){try{return 0===(yield this.model.updateOne({_id:t},e)).matchedCount?{error:"Product not found."}:this.getProductById(t)}catch(t){w(`MongoCloud updateProductById method error: ${t}`)}}))}deleteProductById(t){return B(this,void 0,void 0,(function*(){try{const e=yield this.getProductById(t);if(!e)return;return yield this.model.deleteOne({_id:t}),e}catch(t){w(`MongoCloud deleteProductById method error: ${t}`)}}))}}const T=$.getInstance(_,class{constructor(t){this.id=t._id,this.name=t.name,this.price=t.price,this.description=t.description,this.photoURL=t.photoURL,this.stock=t.stock,this.timestamp=t.timestamp}getId(){return this.id}getName(){return this.name}getPrice(){return this.price}getDescription(){return this.description}getPhotoURL(){return this.photoURL}getStock(){return this.stock}getTimestamp(){return this.timestamp}toJson(){return{id:this.id,name:this.name,price:this.price,description:this.description,photoURL:this.photoURL,stock:this.stock,timestamp:this.timestamp}}}),E=new(P().Schema)({products:[{prod_id:{type:String,required:!0},quantity:{type:Number},_id:!1}],user_id:{type:String,required:!0},user_email:{type:String,required:!0},timestamp:{type:String,required:!0,default:(new Date).toLocaleString()}}),N=P().model("carts",E);var x=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function d(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,d)}c((n=n.apply(t,e||[])).next())}))};class M{constructor(t,e){this.model=t,this.DTO=e,C()}static getInstance(t,e){return this.instance||(this.instance=new M(t,e)),this.instance}createNewCart(t){return x(this,void 0,void 0,(function*(){const e=new this.model({user_id:t.id,user_email:t.email,products:[]}),r=yield e.save();return new this.DTO(r).toJson()}))}deleteProductsByCartId(t){return x(this,void 0,void 0,(function*(){const e=yield this.model.findOne({user_id:t.id});if(null===e)return{error:"Cart not found"};if(0===(yield this.model.updateOne({_id:e._id},{$set:{products:[]}})).modifiedCount)return{error:"Products not deleted from Cart"};{const e=yield this.model.findOne({user_id:t.id});return new this.DTO(e).toJson()}}))}getProductsByCartId(t){return x(this,void 0,void 0,(function*(){const e=yield this.model.findOne({user_id:t.id});return null===e?{error:"Cart not found"}:new this.DTO(e).getProducts()}))}addProductToCartById(t,e,r){return x(this,void 0,void 0,(function*(){const n=yield this.model.findOne({user_id:t.id});if(null===n)w("Cart not found in addToCartById method.");else{let o=yield this.model.aggregate([{$match:{"products.prod_id":e}},{$project:{count:{$size:{$filter:{input:"$products",cond:{$eq:["$$this.prod_id",e]}}}}}},{$group:{_id:null,count:{$sum:"$count"}}}]);if(o&&o[0]){if(0!==(yield this.model.updateOne({_id:n._id,"products.prod_id":e},{$inc:{"products.$.quantity":r}})).modifiedCount){g("Product quantity succesfully updated!");const e=yield this.model.findOne({user_id:t.id});return new this.DTO(e).toJson()}w("Product quantity could not been modified.")}else{if(0!==(yield this.model.updateOne({_id:n._id},{$push:{products:{prod_id:e,quantity:r}}})).modifiedCount){g("Product succesfully added to cart!");const e=yield this.model.findOne({user_id:t.id});return new this.DTO(e).toJson()}w("Product not added to cart.")}}}))}deleteProductByCartId(t,e){return x(this,void 0,void 0,(function*(){const r=yield this.model.findOne({user_id:t.id});if(null===r)return{error:"Cart not found"};if(0!==(yield this.model.updateOne({_id:r._id},{$pull:{products:{prod_id:e}}})).modifiedCount){const e=yield this.model.findOne({user_id:t.id});return new this.DTO(e).toJson()}w("Product not deleted from cart")}))}}const U=M.getInstance(N,class{constructor(t){this.id=t.id,this.products=t.products,this.user=t.user_id,this.email=t.user_email,this.timestamp=t.timestamp}getId(){return this.id}getProducts(){return this.products}getUserId(){return this.user}getTimestamp(){return this.timestamp}toJson(){return{id:this.id,products:this.products,user:this.user,email:this.email,timestamp:this.timestamp}}}),L=new(P().Schema)({user:{type:String,required:!0},products:[{type:Object,required:!0,ref:"products"}],status:{type:String,default:"generada"},timestamp:{type:String,required:!0,default:(new Date).toLocaleString()}}),q=P().model("orders",L);const b=class{constructor(){}createOrder(t){return e=this,r=void 0,o=function*(){throw new Error("User -signUp not Implemented")},new((n=void 0)||(n=Promise))((function(t,i){function s(t){try{c(o.next(t))}catch(t){i(t)}}function d(t){try{c(o.throw(t))}catch(t){i(t)}}function c(e){var r;e.done?t(e.value):(r=e.value,r instanceof n?r:new n((function(t){t(r)}))).then(s,d)}c((o=o.apply(e,r||[])).next())}));var e,r,n,o}},R=require("nodemailer");var j=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function d(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,d)}c((n=n.apply(t,e||[])).next())}))};const D=t.n(R)().createTransport({service:"gmail",auth:{user:d.GMAIL_MAIL,pass:d.GMAIL_PROVISIONAL_PASS}}),W=new class{constructor(){this.transporter=D}newRegister(t){return j(this,void 0,void 0,(function*(){try{yield this.transporter.sendMail({from:"E-commerce GG",to:d.GMAIL_MAIL,subject:"New registered user",html:` <p>Name: ${t.name}</p> \n                        <p>Email: ${t.email}</p>\n                        <p>Address: ${t.address}</p>   \n                        <p>Age: ${t.age}</p>\n                        <p>Phone: ${t.phoneNumber}</p>\n                        `})}catch(e){w(`An error has occurred when sending the user registration email: ${t.email}`)}}))}newOrder(t,e){return j(this,void 0,void 0,(function*(){try{yield this.transporter.sendMail({from:"E-commerce GG",to:d.GMAIL_MAIL,subject:`New order from ${t.name}`,html:`\n                        <h2> User: </h2>\n                        <p>Name: ${t.name}</p> \n                        <p>Email: ${t.email}</p> \n                        <p>Phone: ${t.phoneNumber}</p>\n                        </hr>\n            \n                        <h2> Pedido </h2>\n                        <table>\n                            <thead>\n                                <tr>\n                                    <th scope="col">Name</th>\n                                    <th scope="col">Price</th>\n                                    <th scope="col">Quantity</th>\n                                    <th scope="col">Description</th>\n                                    <th scope="col">Thumbnail</th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                ${e.map((t=>`<tr>\n                                    <td>${t.name}</td>\n                                    <td>${t.price}</td>\n                                    <td>${t.quantity}</td>\n                                    <td>${t.description}</td>\n                                    <td><img style="max-width: 40px" src="${t.photoURL}"></img></td>\n                                </tr>`))}\n                            </tbody>\n                        </table>\n                        `})}catch(e){w(`An error has occurred when sending the user registration email: ${t.email}`)}}))}},k=require("twilio");var G=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function d(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,d)}c((n=n.apply(t,e||[])).next())}))};const J=t.n(k)()(d.TWILIO_ACCOUNT_SID,d.TWILIO_AUTH_TOKEN),F=new class{newSMS(t){return G(this,void 0,void 0,(function*(){try{yield J.messages.create({body:"Your order has been received and is being process",from:d.TWILIO_NUMBER,to:t.phoneNumber})}catch(e){w(`An error has occurred when sending a SMS: ${t.email}`)}}))}newWhatsapp(t){return G(this,void 0,void 0,(function*(){try{yield J.messages.create({body:`New order from ${t.name} - ${t.email}`,from:`whatsapp:${d.TWILIO_WHATSAPP}`,to:`whatsapp:${d.TWILIO_ADMIN_NUMBER}`})}catch(t){w("An error has occurred when sendinding a Whatsapp message")}}))}};var H=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function d(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,d)}c((n=n.apply(t,e||[])).next())}))};class z extends b{constructor(t,e){super(),this.orderModel=t,this.DTO=e,C()}static getInstance(t,e){return this.instance||(this.instance=new z(t,e)),this.instance}createOrder(t){return H(this,void 0,void 0,(function*(){try{const e=yield ft.getProductsByCartId(t);if(0==e.length)return{error:"There is not products in Cart"};const r=yield Promise.all(e.map((t=>H(this,void 0,void 0,(function*(){const{name:e,price:r,description:n,photoURL:o}=yield It.getProductById(t.prod_id),i={name:e,price:r,description:n,photoURL:o,quantity:t.quantity};return Object.assign({},i)}))))),n=yield this.orderModel.create({user:t.email,products:r,status:"generated"});return yield W.newOrder(t,r),yield F.newSMS(t),yield ft.deleteProductsByCartId(t),new this.DTO(n).toJson()}catch(t){w(`MongoAtlas createOrder method error: ${t}`)}}))}}const K=z.getInstance(q,class{constructor(t){this.id=t._id,this.user=t.user,this.products=t.products,this.status=t.status,this.timestamp=t.timestamp}toJson(){return{orderNo:this.id,user:this.user,products:this.products,status:this.status,timestamp:this.timestamp}}}),V=require("bcrypt");var Y=t.n(V),Q=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function d(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,d)}c((n=n.apply(t,e||[])).next())}))};const X=new(P().Schema)({email:{type:String,required:!0,lowercase:!0,trim:!0,unique:!0},password:{type:String,required:!0},name:{type:String,required:!0},address:{type:String,required:!0},age:{type:Number,required:!0},phoneNumber:{type:String,required:!0},picture:{type:String,required:!1},isAdmin:{type:Boolean,required:!0,default:!1}},{collection:"users"});X.pre("save",(function(t){return Q(this,void 0,void 0,(function*(){const e=this;try{const r=yield Y().genSalt(10),n=yield Y().hash(e.password,r);e.password=n,t()}catch(e){t(e)}}))})),X.post("save",(function(t,e){return Q(this,void 0,void 0,(function*(){try{const e={id:this.id,email:this.email};yield Bt.createNewCart(e,t)}catch(t){e(t)}}))})),X.methods.comparePassword=(t,e)=>Q(void 0,void 0,void 0,(function*(){return yield Y().compareSync(t,e)}));const Z=P().model("User",X);var tt=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function d(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,d)}c((n=n.apply(t,e||[])).next())}))};const et=class{constructor(){}save(t){return tt(this,void 0,void 0,(function*(){throw new Error("User save not Implemented")}))}getUser(t){return tt(this,void 0,void 0,(function*(){throw new Error("User getUser not Implemented")}))}};var rt=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function d(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,d)}c((n=n.apply(t,e||[])).next())}))};class nt extends et{constructor(t,e){super(),this.model=t,this.DTO=e,C()}static getInstance(t,e){return this.instance||(this.instance=new nt(t,e)),this.instance}save(t){return rt(this,void 0,void 0,(function*(){return yield this.model.create(t)}))}getUser(t){return rt(this,void 0,void 0,(function*(){try{const e=yield this.model.findOne({email:t.name});return e?new this.DTO(e).chatUser():null}catch(t){w(`MongoAtlas getUser method error: ${t}`)}}))}}const ot=nt.getInstance(Z,class{constructor(t){this.id=t._id,this.email=t.name,this.password=t.password,this.name=t.name,this.address=t.address,this.age=t.age,this.phoneNumber=t.phoneNumber,this.picture=t.picture,this.isAdmin=t.isAdmin}chatUser(){return{id:this.id,email:this.email,isAdmin:this.isAdmin}}toJson(){return{id:this.id,email:this.email,password:this.password,name:this.name,address:this.address,age:this.age,number:this.phoneNumber,picture:this.picture,isAdmin:this.isAdmin}}});const it=class{constructor(){}addMessage(t,e,r){return n=this,o=void 0,s=function*(){throw new Error("Chat addMessage not Implemented")},new((i=void 0)||(i=Promise))((function(t,e){function r(t){try{c(s.next(t))}catch(t){e(t)}}function d(t){try{c(s.throw(t))}catch(t){e(t)}}function c(e){var n;e.done?t(e.value):(n=e.value,n instanceof i?n:new i((function(t){t(n)}))).then(r,d)}c((s=s.apply(n,o||[])).next())}));var n,o,i,s}},st=new(P().Schema)({user:{type:String,required:!0},messages:[{sender:{type:String,required:!0},body:[{type:String}],timestamp:{type:String,required:!0,default:(new Date).toLocaleString()},_id:!1}],timestamp:{type:String,required:!0,default:(new Date).toLocaleString()}}),dt=P().model("chats",st);class ct extends it{constructor(t,e){super(),this.chatModel=t,this.DTO=e,C()}static getInstance(t,e){return this.instance||(this.instance=new ct(t,e)),this.instance}addMessage(t,e,r){return n=this,o=void 0,s=function*(){yield _t.getUser(e)},new((i=void 0)||(i=Promise))((function(t,e){function r(t){try{c(s.next(t))}catch(t){e(t)}}function d(t){try{c(s.throw(t))}catch(t){e(t)}}function c(e){var n;e.done?t(e.value):(n=e.value,n instanceof i?n:new i((function(t){t(n)}))).then(r,d)}c((s=s.apply(n,o||[])).next())}));var n,o,i,s}}const ut=ct.getInstance(dt,class{constructor(t){this.user=t.user,this.messages=t.messages,this.timestamp=t.timestamp}toJson(){return{user:this.user,messages:this.messages,timestamp:this.timestamp}}});class at{static getPersistence(t,e){try{if("products"===e)return T;if("cart"===e)return U;if("order"===e)return K;if("user"===e)return ot;if("chat"===e)return ut;throw new Error("Persistence not found")}catch(t){w(`Persistence type not found ${t}`)}}}const lt=d.PERSISTENCE,ht=t=>at.getPersistence(lt,t);var mt=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function d(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,d)}c((n=n.apply(t,e||[])).next())}))};const pt=ht("cart"),ft=new class{constructor(t){this.model=t}createNewCart(t){return mt(this,void 0,void 0,(function*(){return yield this.model.createNewCart(t)}))}deleteProductsByCartId(t){return mt(this,void 0,void 0,(function*(){return yield this.model.deleteProductsByCartId(t)}))}getProductsByCartId(t){return mt(this,void 0,void 0,(function*(){return yield this.model.getProductsByCartId(t)}))}addProductToCartById(t,e,r){return mt(this,void 0,void 0,(function*(){return yield this.model.addProductToCartById(t,e,r)}))}deleteProductByCartId(t,e){return mt(this,void 0,void 0,(function*(){return yield this.model.deleteProductByCartId(t,e)}))}}(pt);const yt=ht("order"),vt=new class{constructor(t){this.model=t}createOrder(t){return e=this,r=void 0,o=function*(){return yield this.model.createOrder(t)},new((n=void 0)||(n=Promise))((function(t,i){function s(t){try{c(o.next(t))}catch(t){i(t)}}function d(t){try{c(o.throw(t))}catch(t){i(t)}}function c(e){var r;e.done?t(e.value):(r=e.value,r instanceof n?r:new n((function(t){t(r)}))).then(s,d)}c((o=o.apply(e,r||[])).next())}));var e,r,n,o}}(yt);var gt=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function d(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,d)}c((n=n.apply(t,e||[])).next())}))};const wt=ht("products"),It=new class{constructor(t){this.model=t}getAll(){return gt(this,void 0,void 0,(function*(){return yield this.model.getAll()}))}getProductById(t){return gt(this,void 0,void 0,(function*(){return yield this.model.getProductById(t)}))}getProductByCategory(t){return gt(this,void 0,void 0,(function*(){return yield this.model.getByCategory(t)}))}addProduct(t){return gt(this,void 0,void 0,(function*(){return yield this.model.addProduct(t)}))}updateProductById(t,e){return gt(this,void 0,void 0,(function*(){return yield this.model.updateProductById(t,e)}))}deleteProductById(t){return gt(this,void 0,void 0,(function*(){return yield this.model.deleteProductById(t)}))}}(wt);var Pt=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function d(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,d)}c((n=n.apply(t,e||[])).next())}))};const Ot=ht("user"),_t=new class{constructor(t){this.model=t}saveUser(t){return Pt(this,void 0,void 0,(function*(){return yield this.model.save(t)}))}getUser(t){return Pt(this,void 0,void 0,(function*(){return yield this.model.getUser(t)}))}}(Ot);var Ct=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function d(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,d)}c((n=n.apply(t,e||[])).next())}))};const St=new class{constructor(){}getAll(t,e){return Ct(this,void 0,void 0,(function*(){try{const t=yield It.getAll();return e.status(200).json({products:t})}catch(t){w(`Error in getAll method: ${t}`)}}))}getProductById(t,e){return Ct(this,void 0,void 0,(function*(){try{const{id:r}=t.params,n=yield It.getProductById(r);return null==n?e.status(404).json({error:"Cannot find requested product"}):e.status(200).json({product:n})}catch(t){return w(`Error in getById method: ${t}`),e.status(500).json({error:"An error has occurred."})}}))}getProductByCategory(t,e){return Ct(this,void 0,void 0,(function*(){try{const{category:r}=t.params,n=yield It.getProductByCategory(r);return null==n||0===n.length?e.status(404).json({error:`Cannot find products belonging to ${r} category`}):e.status(200).json({ProductsByCategories:n})}catch(t){return w(`Error in getById method: ${t}`),e.status(500).json({error:"An error has occurred."})}}))}addProduct(t,e){return Ct(this,void 0,void 0,(function*(){try{const r=t.body;return yield It.addProduct(r),e.status(200).json({ProductAdded:r})}catch(t){return w(`Error in addProduct method: ${t}`),e.status(500).json({error:"An error has occurred."})}}))}updateProductById(t,e){return Ct(this,void 0,void 0,(function*(){try{const{id:r}=t.params,n=t.body,o=yield It.updateProductById(r,n);return null==o?e.status(404).json({error:"Cannot find requested product"}):e.status(200).json({ProductUpdated:o})}catch(t){return w(`Error in updateProductById method: ${t}`),e.status(500).json({error:"An error has occurred."})}}))}deleteProductById(t,e){return Ct(this,void 0,void 0,(function*(){try{const{id:r}=t.params,n=yield It.deleteProductById(r);return null==n?e.status(404).json({error:"Cannot find requested product"}):e.status(200).json({ProductDeleted:n})}catch(t){w(`Error in deleteProductById method: ${t}`)}}))}};var At=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function d(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,d)}c((n=n.apply(t,e||[])).next())}))};const Bt=new class{constructor(){}createNewCart(t,e){return At(this,void 0,void 0,(function*(){try{yield ft.createNewCart(t),g("Cart Created")}catch(t){w(`Error in createNewCart method: ${t}`)}}))}deleteProductsByCartId(t,e){return At(this,void 0,void 0,(function*(){try{const r=t.user,n=yield ft.deleteProductsByCartId(r);return e.status(200).json({NewCart:n})}catch(t){w(`Error in deleteProductsByCartId method: ${t}`)}}))}getProductsByCartId(t,e){return At(this,void 0,void 0,(function*(){try{const r=t.user,n=yield ft.getProductsByCartId(r);return e.status(200).json({products:n})}catch(t){w(`Error in getProductsByCartId method: ${t}`)}}))}addProductToCartById(t,e){return At(this,void 0,void 0,(function*(){try{const{prod_id:r}=t.params,n=t.body.quantity,o=t.user,i=yield ft.addProductToCartById(o,r,n);return e.status(200).json({ProductAdded:r,NewCart:i})}catch(t){w(`Error in addProductToCartById method: ${t}`)}}))}deleteProductByCartId(t,e){return At(this,void 0,void 0,(function*(){try{const{prod_id:r}=t.params,n=t.user,o=yield ft.deleteProductByCartId(n,r);return e.status(200).json({Cart:o})}catch(t){w(`Error in deleteProductByCartId method: ${t}`)}}))}cartOrder(t,e){return At(this,void 0,void 0,(function*(){try{const r=t.user,n=yield ft.getProductsByCartId(r);yield ft.deleteProductsByCartId(r),W.newOrder(r,n),F.newSMS(r),F.newWhatsapp(r),e.redirect("/")}catch(t){w(`Error in cartOrder method: ${t}`)}}))}};var $t=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function d(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,d)}c((n=n.apply(t,e||[])).next())}))};const Tt=new class{constructor(){}login(t,e){return $t(this,void 0,void 0,(function*(){try{t.isAuthenticated()&&e.status(200).json({message:"user logged"})}catch(t){w(`Error when login method in SessionControllers, ${t}`)}}))}failedLogin(t,e){return $t(this,void 0,void 0,(function*(){e.status(403).json({error:t.flash("error")[0]})}))}logout(t,e){return $t(this,void 0,void 0,(function*(){try{t.isAuthenticated()&&(t.user,t.session.destroy((()=>{e.status(201).json({message:"user logged out"})})))}catch(t){w(`Error in logout method in SessionControllers, ${t}`)}}))}signUp(t,e){return $t(this,void 0,void 0,(function*(){try{e.status(200).json({message:"user registered"})}catch(t){w(`Error in signUp method in SessionControllers, ${t}`)}}))}failedSignup(t,e){return $t(this,void 0,void 0,(function*(){e.status(409).json({error:t.flash("error")[0]})}))}uploadSuccess(t,e){return $t(this,void 0,void 0,(function*(){e.status(201).json({success:"Photo uploaded"})}))}};const Et=new class{constructor(){}createOrder(t,e){return r=this,n=void 0,i=function*(){try{const r=t.user,n=yield vt.createOrder(r);return e.status(200).json({Order:n})}catch(t){w(`Error in createOrder method, Order Controller: ${t}`)}},new((o=void 0)||(o=Promise))((function(t,e){function s(t){try{c(i.next(t))}catch(t){e(t)}}function d(t){try{c(i.throw(t))}catch(t){e(t)}}function c(e){var r;e.done?t(e.value):(r=e.value,r instanceof o?r:new o((function(t){t(r)}))).then(s,d)}c((i=i.apply(r,n||[])).next())}));var r,n,o,i}};const Nt=new class{renderInfo(t,e){return r=this,n=void 0,i=function*(){try{e.render("info",{config:d})}catch(t){w(`Error in Info method: ${t}`)}},new((o=void 0)||(o=Promise))((function(t,e){function s(t){try{c(i.next(t))}catch(t){e(t)}}function d(t){try{c(i.throw(t))}catch(t){e(t)}}function c(e){var r;e.done?t(e.value):(r=e.value,r instanceof o?r:new o((function(t){t(r)}))).then(s,d)}c((i=i.apply(r,n||[])).next())}));var r,n,o,i}};const xt=ht("chat"),Mt=new class{constructor(t){this.model=t}addMessage(t,e){return r=this,n=void 0,i=function*(){return yield this.model.addMessage(t,e)},new((o=void 0)||(o=Promise))((function(t,e){function s(t){try{c(i.next(t))}catch(t){e(t)}}function d(t){try{c(i.throw(t))}catch(t){e(t)}}function c(e){var r;e.done?t(e.value):(r=e.value,r instanceof o?r:new o((function(t){t(r)}))).then(s,d)}c((i=i.apply(r,n||[])).next())}));var r,n,o,i}}(xt);var Ut=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function d(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,d)}c((n=n.apply(t,e||[])).next())}))};const Lt=new class{renderChat(t,e){return Ut(this,void 0,void 0,(function*(){try{t.user}catch(t){w(`Error in Chat method: ${t}`)}}))}addMessage(t,e){return Ut(this,void 0,void 0,(function*(){try{const e=t.user,r=t.body;return void(yield Mt.addMessage(e,r))}catch(t){w(`Error in Chat method: ${t}`)}}))}},qt=(t,e,r)=>{try{return t.isAuthenticated()?r():e.status(401).json({error:"Not logged in"})}catch(t){w(`Error has occured when checkUserAuth method, ${t}`)}},bt=(t,e,r)=>{const n=t.user;try{return n.isAdmin?r():e.status(403).json({error:`You do not have permission to access to ${t.originalUrl}`})}catch(t){w(`Error has occured when checkUserAuth method, ${t}`)}},Rt=(0,e.Router)();Rt.get("/",St.getAll),Rt.get("/:id",St.getProductById),Rt.get("/categories/:category",St.getProductByCategory),Rt.post("/",qt,bt,St.addProduct),Rt.put("/:id",qt,bt,St.updateProductById),Rt.delete("/:id",qt,bt,St.deleteProductById);const jt=Rt,Dt=(0,e.Router)();Dt.delete("/",qt,Bt.deleteProductsByCartId),Dt.get("/",qt,Bt.getProductsByCartId),Dt.post("/:prod_id",qt,Bt.addProductToCartById),Dt.delete("/:prod_id",qt,Bt.deleteProductByCartId);const Wt=Dt,kt=(0,e.Router)();kt.get("/",Nt.renderInfo);const Gt=kt,Jt=require("passport");var Ft=t.n(Jt);const Ht=(0,e.Router)();Ht.post("/",Ft().authenticate("login",{failureRedirect:"/login/failed",failureFlash:!0}),Tt.login),Ht.get("/failed",Tt.failedLogin);const zt=(0,e.Router)();zt.post("/",Tt.logout);const Kt=require("multer");var Vt=t.n(Kt);const Yt=Vt().diskStorage({destination:function(t,e,r){r(null,"uploads")},filename:function(t,e,r){r(null,`${Date.now()}-${e.originalname}`)}}),Qt=Vt()({storage:Yt});var Xt=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function d(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,d)}c((n=n.apply(t,e||[])).next())}))};const Zt=(0,e.Router)();Zt.post("/",Ft().authenticate("signup",{failureRedirect:"/signup/failed",failureFlash:!0}),((t,e)=>Xt(void 0,void 0,void 0,(function*(){e.status(200).json({message:"User registered"})})))),Zt.post("/upload",Qt.single("picture"),((t,e,r)=>Xt(void 0,void 0,void 0,(function*(){const e=t.file;if(!e)return r({message:"Error when uploading file.",statusCode:400});try{const n={email:t.user.email,passport:t.user.password,address:t.user.address,age:t.user.age,phoneNumber:t.user.phoneNumber,picture:`${e.filename}`,isAdmin:t.user.isAdmin};if(0===(yield Z.updateOne({_id:t.user.id},n)).matchedCount)return r({message:"User not found",statusCode:400})}catch(t){console.log("Method update: ",t)}r()}))),Tt.uploadSuccess),Zt.get("/failed",Tt.failedSignup);const te=(0,e.Router)();te.post("/",qt,Et.createOrder);const ee=te,re=(0,e.Router)();re.get("/",Lt.renderChat),re.post("/",qt,Lt.addMessage);const ne=re,oe=(0,e.Router)();oe.use("/login",Ht),oe.use("/logout",zt),oe.use("/signup",Zt),oe.use("/api/products",jt),oe.use("/api/cart",Wt),oe.use("/api/info",Gt),oe.use("/api/order",ee),oe.use("/api/chat",ne);const ie=oe,se=require("connect-flash");var de=t.n(se);const ce=require("cookie-parser");var ue=t.n(ce);const ae=require("passport-local");var le=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function d(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,d)}c((n=n.apply(t,e||[])).next())}))};const he=require("path");var me=t.n(he);const pe=d.PORT||8080,fe=r()();if("cluster"===process.argv[3]&&l().isPrimary){const t=m().cpus().length;g(`Number of CPUs: ${t}`),g(`Master PID ${process.pid} is running`);for(let e=0;e<t;e++)l().fork();l().on("exit",(t=>{g(`Worker ${t.process.pid} died`),l().fork()}))}else fe.listen(pe,(()=>{g(`Server listening on port ${pe}.`)})).on("error",(t=>w(`An error has ocurred when starting: ${t}`)));fe.use(r().static(me().join(__dirname,"../public"))),fe.use(r().static(me().join(__dirname,"../uploads"))),fe.use(r().json()),fe.use(ue()()),fe.use(r().urlencoded({extended:!0})),fe.set("views",me().join(__dirname,"../api/views")),fe.set("view engine","ejs");const ye=d.MONGO_OPTIONS;fe.use(o()({store:u().create({mongoUrl:d.MONGO_ATLAS_URL,mongoOptions:ye}),secret:d.SECRET_KEY,resave:!1,saveUninitialized:!1,rolling:!0,cookie:{maxAge:Number(d.SESSION_TIME)}})),fe.use(Ft().initialize()),fe.use(Ft().session()),fe.use(de()()),function(t){t.use("login",new ae.Strategy({usernameField:"email",passwordField:"password"},((t,e,r)=>le(this,void 0,void 0,(function*(){try{const n=yield Z.findOne({email:t}).exec();return n?(yield n.comparePassword(e,n.password))?r(null,n):r(null,!1,{message:"Wrong password"}):r(null,!1,{message:"User doesn't exist"})}catch(t){r(t)}}))))),t.use("signup",new ae.Strategy({passReqToCallback:!0,usernameField:"email"},((t,e,r,n)=>le(this,void 0,void 0,(function*(){const o=new Z({email:e,password:r,name:t.body.name,address:t.body.address,age:t.body.age,phoneNumber:`+54${t.body.phoneNumber}`,picture:"avatar.png",isAdmin:"false"});try{const t=yield _t.saveUser(o);return n(null,t)}catch(t){return 11e3===t.code?n(null,!1,{message:"User already exists"}):(w(t),n(t))}}))))),t.serializeUser(((t,e)=>{e(null,t._id)})),t.deserializeUser(((t,e)=>le(this,void 0,void 0,(function*(){const r=yield Z.findById(t);e(null,r)}))))}(Ft()),fe.use("/",ie),fe.use(((t,e,r,n)=>{try{return w(`An error has occured: ${t.message}`),r.status(500).json({error:"An error has occured, captured by errorHandler"})}catch(t){return r.status(500).json({error:"An error has occured, captured by errorHandler"})}})),fe.use(((t,e,r)=>{e.status(404).json({status:404,message:`Route: ${t.originalUrl}, not implemented.`,error:"Not Found"})}))})();