(()=>{"use strict";var e={n:t=>{var r=t&&t.__esModule?()=>t.default:()=>t;return e.d(r,{a:r}),r},d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=require("express");var r=e.n(t);const n=require("express-session");var o=e.n(n);const i=require("dotenv");var s=e.n(i);s().config();const d={MONGO_ATLAS_URL:`mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PWD}@${process.env.MONGO_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,PERSISTENCE:process.argv[4]||process.env.PERSISTENCE||3},c=require("connect-mongo");var a=e.n(c);const u=require("cluster");var l=e.n(u);const h=require("os");var p=e.n(h);const f=require("winston");var m=e.n(f);const v=m().createLogger({transports:[new(m().transports.Console)({level:"info",format:m().format.combine(m().format.colorize(),m().format.simple())})]}),y=m().createLogger({transports:[new(m().transports.Console)({level:"info",format:m().format.combine(m().format.errors({stack:!0}),m().format.timestamp(),m().format.prettyPrint())}),new(m().transports.File)({filename:"logs/error.log",level:"error",format:m().format.combine(m().format.errors({stack:!0}),m().format.timestamp(),m().format.prettyPrint())})]}),g=(m().createLogger({transports:[new(m().transports.Console)({level:"info",format:m().format.combine(m().format.colorize(),m().format.simple())}),new(m().transports.File)({filename:"logs/warn.log",level:"warn",format:m().format.combine(m().format.errors({stack:!0}),m().format.timestamp(),m().format.prettyPrint())})]}),e=>v.info(e)),w=e=>y.error(e),P=require("mongoose");var b=e.n(P);const I=new(b().Schema)({name:{type:String,required:!0,minlength:3,maxlength:70},price:{type:Number,required:!0,min:0},description:{type:String,required:!1,minlength:6,maxlength:200},photoURL:{type:String,required:!0,minlength:8,maxlength:200},stock:{type:Number,required:!1,min:0},timestamp:{type:Number,required:!1,default:Date.now}}),A=b().model("products",I);const C=()=>{return e=void 0,t=void 0,n=function*(){try{yield b().connect(d.MONGO_ATLAS_URL),g("connected to mongoDB Atlas")}catch(e){w(e)}},new((r=void 0)||(r=Promise))((function(o,i){function s(e){try{c(n.next(e))}catch(e){i(e)}}function d(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,d)}c((n=n.apply(e,t||[])).next())}));var e,t,r,n};var N,$,S,O,_,x,q,T=function(e,t,r,n,o){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!o:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?o.call(e,r):o?o.value=r:t.set(e,r),r},M=function(e,t,r,n){if("a"===r&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!n:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?n:"a"===r?n.call(e):n?n.value:t.get(e)};N=new WeakMap,$=new WeakMap,S=new WeakMap,O=new WeakMap,_=new WeakMap,x=new WeakMap,q=new WeakMap;var U=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function s(e){try{c(n.next(e))}catch(e){i(e)}}function d(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,d)}c((n=n.apply(e,t||[])).next())}))};class E{constructor(e,t){this.model=e,this.DTO=t,C()}static getInstance(e,t){return this.instance||(this.instance=new E(e,t)),this.instance}getAllProducts(){return U(this,void 0,void 0,(function*(){try{return(yield this.model.find()).map((e=>new this.DTO(e).toJson()))}catch(e){w(`MongoAtlas getAll method error: ${e}`)}}))}getProductById(e){return U(this,void 0,void 0,(function*(){try{const t=yield this.model.findOne({_id:e},{__v:0});return null===t?{error:"Product not found"}:new this.DTO(t).toJson()}catch(e){w(`MongoAtlas getProductById method error: ${e}`)}}))}addProduct(e){return U(this,void 0,void 0,(function*(){const t=new this.model(e);yield t.save()}))}updateProduct(e,t){return U(this,void 0,void 0,(function*(){try{return 0===(yield this.model.updateOne({_id:e},t)).matchedCount?{error:"Product not found."}:{msg:`Product ${e} updated!`}}catch(e){w(`MongoAtlas updateProduct method error: ${e}`)}}))}deleteProduct(e){return U(this,void 0,void 0,(function*(){try{return 0===(yield this.model.deleteOne({_id:e})).deletedCount?{error:"Product not found."}:{msg:"Product deleted."}}catch(e){w(`MongoAtlas deleteProduct method error: ${e}`)}}))}}const R=E.getInstance(A,class{constructor(e){N.set(this,void 0),$.set(this,void 0),S.set(this,void 0),O.set(this,void 0),_.set(this,void 0),x.set(this,void 0),q.set(this,void 0),T(this,N,e._id,"f"),T(this,$,e.name,"f"),T(this,S,e.price,"f"),T(this,O,e.description,"f"),T(this,_,e.photoURL,"f"),T(this,x,e.stock,"f"),T(this,q,e.timestamp,"f")}getId(){return M(this,N,"f")}getName(){return M(this,$,"f")}getPrice(){return M(this,S,"f")}getDescription(){return M(this,O,"f")}getPhotoURL(){return M(this,_,"f")}getStock(){return M(this,x,"f")}getTimestamp(){return M(this,q,"f")}toJson(){return{id:M(this,N,"f"),name:M(this,$,"f"),price:M(this,S,"f"),description:M(this,O,"f"),photoURL:M(this,_,"f"),stock:M(this,x,"f"),timestamp:M(this,q,"f")}}}),L=new(b().Schema)({products:[{type:Object,required:!0,ref:"products"}],user:{id:{type:String,required:!0},username:{type:String,required:!0}},timestamp:{type:Number,required:!0,default:Date.now}}),B=b().model("carts",L);var k=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function s(e){try{c(n.next(e))}catch(e){i(e)}}function d(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,d)}c((n=n.apply(e,t||[])).next())}))};const W=new class{constructor(e,t){this.model=e,this.DTO=t}createNewCart(e){return k(this,void 0,void 0,(function*(){const t=new this.model({user:{id:e.id,username:e.email},products:[]});yield t.save()}))}deleteProductsByCartId(e){return k(this,void 0,void 0,(function*(){const e=yield this.model.findOne().populate({path:"user.id"});if(null===e)return{error:"Cart not found"};0===(yield this.model.updateOne({_id:e._id},{$set:{products:[]}})).modifiedCount?w("Products not deleted from cart"):g("Products deleted from cart")}))}getProductsByCartId(e){return k(this,void 0,void 0,(function*(){const e=yield this.model.findOne().populate({path:"user.id"});if(null===e)return{error:"Cart not found"};{const t=e.products;return g(`Cart: ${t}`),t}}))}addProductToCartById(e,t){return k(this,void 0,void 0,(function*(){const t=yield this.model.findOne().populate({path:"user.id"});if(null===t)return{error:"Cart not found"};0===(yield this.model.updateOne({_id:t._id},{$push:{products:e}})).modifiedCount?w("Product not added to cart"):g("Product added to cart")}))}deleteProductByCartId(e,t){return k(this,void 0,void 0,(function*(){const e=yield this.model.findOne().populate({path:"user.id"});if(null===e)return{error:"Cart not found"};0===(yield this.model.updateOne({_id:e._id},{$pull:{products:{id:t.id}}})).modifiedCount?w("Product not deleted from cart"):g("Product deleted from cart")}))}}(B,class{constructor(e){this.id=e.id,this.products=e.products,this.user=e.user.id,this.timestamp=e.timestamp}getId(){return this.id}getProduct(){return this.products}getUserId(){return this.user.id}getUserName(){return this.user.username}getTimestamp(){return this.timestamp}toJson(){return{id:this.id,product:this.products,user:this.user.id,timestamp:this.timestamp}}}),j=d.PERSISTENCE,D=e=>class{static getPersistence(e,t){try{if("products"===t)return R;if("cart"===t)return W;throw new Error("Persistence not found")}catch(e){console.log(e),w("Persistence type not found")}}}.getPersistence(j,e);var G=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function s(e){try{c(n.next(e))}catch(e){i(e)}}function d(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,d)}c((n=n.apply(e,t||[])).next())}))};const F=D("products"),z=new class{constructor(e){this.model=e}getAllProducts(){return G(this,void 0,void 0,(function*(){return yield this.model.getAllProducts()}))}getProductById(e){return G(this,void 0,void 0,(function*(){return yield this.model.getProductById(Number(e))}))}addProduct(e){return G(this,void 0,void 0,(function*(){return yield this.model.addProduct(e)}))}updateProduct(e,t){return G(this,void 0,void 0,(function*(){return yield this.model.updateProduct(Number(e),t)}))}deleteProduct(e){return G(this,void 0,void 0,(function*(){return yield this.model.deleteProduct(Number(e))}))}}(F);var J=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function s(e){try{c(n.next(e))}catch(e){i(e)}}function d(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,d)}c((n=n.apply(e,t||[])).next())}))};const Y=(e,t)=>J(void 0,void 0,void 0,(function*(){try{const e=yield z.getAllProducts();return g("controller"),g(e),e}catch(e){w(`Error in getAll method: ${e}`)}})),H=(0,t.Router)();H.get("/products",Y),H.get("/products/:id",((e,t)=>J(void 0,void 0,void 0,(function*(){const{id:r}=e.params,n=yield z.getProductById(Number(r));t.json(n)})))),H.post("/products",((e,t)=>J(void 0,void 0,void 0,(function*(){try{const r=e.body;yield z.addProduct(r),g("Product added"),t.redirect("/api/addProdForm")}catch(e){w(e)}})))),H.put("/products/:id",((e,t)=>J(void 0,void 0,void 0,(function*(){const{id:r}=e.params,n=e.body;yield z.updateProduct(Number(r),n),t.json({msg:`producto ${r} actualizado`})})))),H.delete("/products/:id",((e,t)=>J(void 0,void 0,void 0,(function*(){const{id:r}=e.params,n=yield z.deleteProduct(Number(r));t.json({deletedProduct:n})}))));const K=H,V=require("twilio");var Q=e.n(V),X=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function s(e){try{c(n.next(e))}catch(e){i(e)}}function d(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,d)}c((n=n.apply(e,t||[])).next())}))};s().config();const Z=Q()(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN),ee=new class{newSMS(e){return X(this,void 0,void 0,(function*(){try{yield Z.messages.create({body:"Your order has been received and is being process",from:process.env.TWILIO_NUMBER,to:e.phoneNumber})}catch(t){w(`An error has occurred when sending a SMS: ${e.email}`)}}))}newWhatsapp(e){return X(this,void 0,void 0,(function*(){try{yield Z.messages.create({body:`New order from ${e.name} - ${e.email}`,from:`whatsapp:${process.env.TWILIO_WHATSAPP}`,to:`whatsapp:${process.env.TWILIO_ADMIN_NUMBER}`})}catch(e){w("An error has occurred when sendinding a Whatsapp message")}}))}};var te=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function s(e){try{c(n.next(e))}catch(e){i(e)}}function d(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,d)}c((n=n.apply(e,t||[])).next())}))};const re=D("cart"),ne=new class{constructor(e){this.model=e}createNewCart(e){return te(this,void 0,void 0,(function*(){return yield this.model.createNewCart(e)}))}deleteProductsByCartId(e){return te(this,void 0,void 0,(function*(){return yield this.model.deleteProductsByCartId(e)}))}getProductsByCartId(e){return te(this,void 0,void 0,(function*(){return yield this.model.getProductsByCartId(e)}))}addProductToCartById(e,t){return te(this,void 0,void 0,(function*(){return yield this.model.addProductToCartById(e,t)}))}deleteProductByCartId(e,t){return te(this,void 0,void 0,(function*(){return yield this.model.deleteProductByCartId(e,t)}))}}(re),oe=require("nodemailer");var ie=e.n(oe),se=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function s(e){try{c(n.next(e))}catch(e){i(e)}}function d(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,d)}c((n=n.apply(e,t||[])).next())}))};s().config();const de=ie().createTransport({service:"gmail",auth:{user:process.env.GMAIL_MAIL,pass:process.env.GMAIL_PROVISIONAL_PASS}}),ce=new class{constructor(){this.transporter=de}newRegister(e){return se(this,void 0,void 0,(function*(){try{yield this.transporter.sendMail({from:"E-commerce GG",to:process.env.GMAIL_MAIL,subject:"New registered user",html:` <p>Name: ${e.name}</p> \n                        <p>Email: ${e.email}</p>\n                        <p>Address: ${e.address}</p>   \n                        <p>Age: ${e.age}</p>\n                        <p>Phone: ${e.phoneNumber}</p>\n                        `})}catch(t){w(`An error has occurred when sending the user registration email: ${e.email}`)}}))}newOrder(e,t){return se(this,void 0,void 0,(function*(){try{yield this.transporter.sendMail({from:"E-commerce GG",to:process.env.GMAIL_MAIL,subject:`New order from ${e.name}`,html:`\n                        <h2> User: </h2>\n                        <p>Name: ${e.name}</p> \n                        <p>Email: ${e.email}</p> \n                        <p>Phone: ${e.phoneNumber}</p>\n                        </hr>\n            \n                        <h2> Pedido </h2>\n                        <table>\n                            <thead>\n                                <tr>\n                                    <th scope="col">Name</th>\n                                    <th scope="col">Price</th>\n                                    <th scope="col">Description</th>\n                                    <th scope="col">Thumbnail</th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                ${t.map((e=>`<tr>\n                                    <td>${e.name}</td>\n                                    <td>${e.price}</td>\n                                    <td>${e.description}</td>\n                                    <td><img style="max-width: 40px" src="${e.photoURL}"></img></td>\n                                </tr>`))}\n                            </tbody>\n                        </table>\n                        `})}catch(t){w(`An error has occurred when sending the user registration email: ${e.email}`)}}))}};var ae=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function s(e){try{c(n.next(e))}catch(e){i(e)}}function d(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,d)}c((n=n.apply(e,t||[])).next())}))};const ue=e=>ae(void 0,void 0,void 0,(function*(){try{yield ne.createNewCart(e),g(`Cart created for user ${e.email}`)}catch(e){w(e)}})),le=ue,he=(0,t.Router)();he.post("/",le),he.post("delete",((e,t)=>ae(void 0,void 0,void 0,(function*(){try{const r=e.user;yield ne.deleteProductsByCartId(r),t.redirect("/api/cart")}catch(e){w(e)}})))),he.get("/",((e,t)=>ae(void 0,void 0,void 0,(function*(){try{const r=e.user,n=yield ne.getProductsByCartId(r);t.render("cart",{products:n,user:r})}catch(e){w(e)}})))),he.post("addProduct",((e,t)=>ae(void 0,void 0,void 0,(function*(){try{const r=e.body,n=e.user;yield ne.addProductToCartById(r,n),t.redirect("/api/cart")}catch(e){w(e)}})))),he.post("deleteProduct",((e,t)=>ae(void 0,void 0,void 0,(function*(){try{const r=e.body,n=e.user;yield ne.deleteProductByCartId(n,r),t.redirect("/api/cart")}catch(e){w(e)}})))),he.post("order",((e,t)=>ae(void 0,void 0,void 0,(function*(){try{const r=e.user,n=yield ne.getProductsByCartId(r);yield ne.deleteProductsByCartId(r),ce.newOrder(r,n),ee.newSMS(r),ee.newWhatsapp(r),t.redirect("/")}catch(e){w(e)}}))));const pe=he;var fe=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function s(e){try{c(n.next(e))}catch(e){i(e)}}function d(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,d)}c((n=n.apply(e,t||[])).next())}))};const me=(e,t,r)=>{try{return e.isAuthenticated()?r():t.render("unauthorized")}catch(e){w(`Error has occured when checkUserAuth method, ${e}`)}};const ve=(0,t.Router)();ve.get("/",me,((e,t)=>{return r=void 0,n=void 0,i=function*(){const r=yield Y();t.render("home",{logged:!0,user:e.user,products:r})},new((o=void 0)||(o=Promise))((function(e,t){function s(e){try{c(i.next(e))}catch(e){t(e)}}function d(e){try{c(i.throw(e))}catch(e){t(e)}}function c(t){var r;t.done?e(t.value):(r=t.value,r instanceof o?r:new o((function(e){e(r)}))).then(s,d)}c((i=i.apply(r,n||[])).next())}));var r,n,o,i})),ve.get("/addProdForm",((e,t,r)=>{const n=e.user;try{return"true"===n.isAdmin?r():t.json({error:"No tiene Permiso",descripcion:`You do not have permission to access to ${e.originalUrl}`,code:"403"})}catch(e){w(`Error has occured when checkUserAuth method, ${e}`)}}),((e,t)=>fe(void 0,void 0,void 0,(function*(){try{const r=e.user;t.status(200).render("add_products",{user:r})}catch(e){w(e)}}))));const ye=ve,ge=require("passport");var we=e.n(ge);const Pe=(0,t.Router)();Pe.get("/",((e,t)=>{e.isAuthenticated()?t.redirect("/"):t.render("login")})),Pe.post("/",we().authenticate("login",{failureRedirect:"/login/failed",failureFlash:!0}),((e,t,r)=>fe(void 0,void 0,void 0,(function*(){try{e.isAuthenticated()&&r()}catch(e){w(`Error when login method in SessionControllers, ${e}`)}})))),Pe.get("/failed",((e,t)=>{t.status(401).render("failedLogin",{message:e.flash("error")[0]})}));const be=(0,t.Router)();be.post("/",((e,t)=>{if(e.isAuthenticated()){const r=e.user;e.session.destroy((()=>{t.render("logout",{user:r})}))}else t.redirect("/")}));const Ie=require("bcrypt");var Ae=e.n(Ie),Ce=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function s(e){try{c(n.next(e))}catch(e){i(e)}}function d(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,d)}c((n=n.apply(e,t||[])).next())}))};const Ne=new(b().Schema)({email:{type:String,required:!0,lowercase:!0,trim:!0,unique:!0},password:{type:String,required:!0},name:{type:String,required:!0},address:{type:String,required:!0},age:{type:Number,required:!0},phoneNumber:{type:String,required:!0},picture:{type:String,required:!1},isAdmin:{type:String,required:!0,default:!1}},{collection:"users"});Ne.pre("save",(function(e){return Ce(this,void 0,void 0,(function*(){const t=this;try{const r=yield Ae().genSalt(10),n=yield Ae().hash(t.password,r);t.password=n,e()}catch(t){e(t)}}))})),Ne.post("save",(function(e,t){return Ce(this,void 0,void 0,(function*(){try{const e={id:this.id,email:this.email};yield ue(e),t()}catch(e){t(e)}}))})),Ne.methods.comparePassword=(e,t)=>Ce(void 0,void 0,void 0,(function*(){return yield Ae().compareSync(e,t)}));const $e=b().model("User",Ne),Se=require("multer");var Oe=e.n(Se);const _e=Oe().diskStorage({destination:function(e,t,r){r(null,"uploads")},filename:function(e,t,r){r(null,`${Date.now()}-${t.originalname}`)}}),xe=Oe()({storage:_e});const qe=(0,t.Router)();qe.get("/",((e,t)=>fe(void 0,void 0,void 0,(function*(){e.isAuthenticated()?t.redirect("/"):t.render("signup")})))),qe.post("/",we().authenticate("signup",{failureRedirect:"/signup/failed",failureFlash:!0}),((e,t,r)=>fe(void 0,void 0,void 0,(function*(){const n=e.user;t.status(201).render("createdUser",{user:n}),ce.newRegister(n),r()})))),qe.get("/upload",((e,t)=>{e.isAuthenticated()?t.render("upload"):t.render("login")})),qe.post("/upload",xe.single("picture"),((e,t,r)=>{return n=void 0,o=void 0,s=function*(){const t=e.file;if(!t)return r({message:"Error when uploading file.",statusCode:400});try{const n={email:e.user.email,passport:e.user.password,address:e.user.address,age:e.user.age,phoneNumber:e.user.phoneNumber,picture:`${t.filename}`,isAdmin:e.user.isAdmin};if(0===(yield $e.updateOne({_id:e.user.id},n)).matchedCount)return r({message:"User not found",statusCode:400})}catch(e){console.log("Method update: ",e)}r()},new((i=void 0)||(i=Promise))((function(e,t){function r(e){try{c(s.next(e))}catch(e){t(e)}}function d(e){try{c(s.throw(e))}catch(e){t(e)}}function c(t){var n;t.done?e(t.value):(n=t.value,n instanceof i?n:new i((function(e){e(n)}))).then(r,d)}c((s=s.apply(n,o||[])).next())}));var n,o,i,s}),((e,t,r)=>fe(void 0,void 0,void 0,(function*(){t.status(201).render("uploadSuccess"),r()})))),qe.get("/failed",((e,t)=>fe(void 0,void 0,void 0,(function*(){t.status(409).render("failedSignup",{message:e.flash("error")[0]})}))));const Te=(0,t.Router)();Te.use("/login",Pe),Te.use("/logout",be),Te.use("/signup",qe),Te.use("/views",ye),Te.use("/api/products",K),Te.use("/api/cart",pe),Te.use("/",me,((e,t)=>{return r=void 0,n=void 0,i=function*(){return t.redirect("/views")},new((o=void 0)||(o=Promise))((function(e,t){function s(e){try{c(i.next(e))}catch(e){t(e)}}function d(e){try{c(i.throw(e))}catch(e){t(e)}}function c(t){var r;t.done?e(t.value):(r=t.value,r instanceof o?r:new o((function(e){e(r)}))).then(s,d)}c((i=i.apply(r,n||[])).next())}));var r,n,o,i}));const Me=Te,Ue=require("connect-flash");var Ee=e.n(Ue);const Re=require("cookie-parser");var Le=e.n(Re);const Be=require("passport-local");var ke=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function s(e){try{c(n.next(e))}catch(e){i(e)}}function d(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,d)}c((n=n.apply(e,t||[])).next())}))};const We=require("path");var je=e.n(We);const De=process.env.PORT||8080,Ge=r()();if("cluster"===process.argv[3]&&l().isPrimary){const e=p().cpus().length;g(`Number of CPUs: ${e}`),g(`Master PID ${process.pid} is running`);for(let t=0;t<e;t++)l().fork();l().on("exit",(e=>{g(`Worker ${e.process.pid} died`),l().fork()}))}else Ge.listen(De,(()=>{g(`Server listening on port ${De}.`)})).on("error",(e=>w(`An error has ocurred when starting: ${e}`)));Ge.use(r().static(je().join(__dirname,"../uploads"))),Ge.use(r().json()),Ge.use(Le()()),Ge.use(r().urlencoded({extended:!0})),Ge.set("views",je().join(__dirname,"../api/views")),Ge.set("view engine","ejs"),Ge.use(o()({store:a().create({mongoUrl:d.MONGO_ATLAS_URL,mongoOptions:{useNewUrlParser:!0,useUnifiedTopology:!0}}),secret:process.env.SECRET_KEY,resave:!1,saveUninitialized:!1,rolling:!0,cookie:{maxAge:6e5}})),Ge.use(we().initialize()),Ge.use(we().session()),Ge.use(Ee()()),function(e){e.use("login",new Be.Strategy({usernameField:"email",passwordField:"password"},((e,t,r)=>ke(this,void 0,void 0,(function*(){try{const n=yield $e.findOne({email:e}).exec();return n?(yield n.comparePassword(t,n.password))?r(null,n):r(null,!1,{message:"Wrong password"}):r(null,!1,{message:"User doesn't exist"})}catch(e){r(e)}}))))),e.use("signup",new Be.Strategy({passReqToCallback:!0,usernameField:"email"},((e,t,r,n)=>ke(this,void 0,void 0,(function*(){const o=new $e({email:t,password:r,name:e.body.name,address:e.body.address,age:e.body.age,phoneNumber:`+54${e.body.phoneNumber}`,picture:"avatar.png",isAdmin:"false"});try{return yield o.save(),n(null,o)}catch(e){return 11e3===e.code?n(null,!1,{message:"User already exists"}):(w(e),n(e))}}))))),e.serializeUser(((e,t)=>{t(null,e._id)})),e.deserializeUser(((e,t)=>ke(this,void 0,void 0,(function*(){const r=yield $e.findById(e);t(null,r)}))))}(we()),Ge.use("/",Me)})();