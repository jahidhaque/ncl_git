!function(){function t(t,e){t.when("/",{templateUrl:"home/home.view.html",controller:"homeCtrl",controllerAs:"hmvm"}).when("/grocery",{templateUrl:"grocery/grocery.view.html",controller:"groceryCtrl",controllerAs:"vm"}).when("/meatandfish",{templateUrl:"/meatandfish/meatandfish.view.html",controller:"meatfishCtrl",controllerAs:"vm"}).when("/riceandflour",{templateUrl:"/riceandflour/riceandflour.view.html",controller:"riceandflourCtrl",controllerAs:"vm"}).when("/kitchenandhome",{templateUrl:"/kitchenandhome/kitchenandhome.view.html",controller:"kitchenandhomeCtrl",controllerAs:"vm"}).when("/readyfood",{templateUrl:"/readyfood/readyfood.view.html",controller:"readyfoodCtrl",controllerAs:"vm"}).when("/vegetableandfruits",{templateUrl:"/vegetableandfruits/vegetableandfruits.view.html",controller:"vegetableandfruitsCtrl",controllerAs:"vm"}).when("/herbs",{templateUrl:"/herbs/herbs.view.html",controller:"herbsCtrl",controllerAs:"vm"}).when("/aboutus",{templateUrl:"/aboutus/aboutus.view.html",controller:"aboutusCtrl",controllerAs:"aboutvm"}).when("/login",{templateUrl:"/login/login.view.html",controller:"loginCtrl",controllerAs:"vm"}).when("/register",{templateUrl:"/register/register.view.html",controller:"registerCtrl",controllerAs:"vm"}).when("/profile",{templateUrl:"/profile/profile.view.html",controller:"profileCtrl",controllerAs:"vm"}).when("/bye",{templateUrl:"bye/bye.view.html",controller:"byeCtrl",controllerAs:"vm"}).when("/settings",{templateUrl:"settings/settings.view.html",controller:"systemCtrl",controllerAs:"sysvm"}).when("/settings/manage",{templateUrl:"settings/manage/manage.view.html",controller:"manageCtrl",controllerAs:"mgvm"}).when("/singleproduct/:productname",{templateUrl:"products/singleproduct.view.html",controller:"singleProductCtrl",controllerAs:"sngprovm"}),e.html5Mode({enabled:!0})}angular.module("nclhalal",["ngResource","ngRoute"]).config(["$routeProvider","$locationProvider",t])}(),function(){function t(t,e){function r(t){return t}function n(t){return t}var o=function(e){t.localStorage.ncltoken=e},a=function(){return t.localStorage.ncltoken},c=function(){var e,r=a();return!!r&&(e=r.split(".")[1],e=t.atob(e),e=JSON.parse(e))},l=function(){if(c()){var e=a(),r=e.split(".")[1];return r=t.atob(r),r=JSON.parse(r),{email:r.email,name:r.name,status:r.status}}return!1},s=function(t){return e.post("/api/register",t).success(function(t){o(t.token)})},u=function(t){return e.post("/api/login",t).success(function(t){o(t.token)})};return{currentUser:l,saveToken:o,getToken:a,isLoggedIn:c,register:s,rewards:function(t){return e.get("/api/rewards/"+t).then(r).catch(n)},setCustomerRewards:function(t){return e.post("/api/setrewards",t).then(r).catch(n)},login:u,logout:function(){t.localStorage.removeItem("ncltoken")}}}angular.module("nclhalal").service("authentication",t),t.$inject=["$window","$http"]}(),function(){function t(t){function e(t){return t}function r(t){return t}return{createProduct:function(n){return t.post("/api/createproduct",n).then(e).catch(r)},showProducts:function(n){return t.get("/api/showproducts"+n).then(e).catch(r)},singleProduct:function(n){return t.get("/api/singleproduct/"+n).then(e).catch(r)},searchProducts:function(n){return t.get("/api/generalsearch/"+n).then(e).catch(r)}}}angular.module("nclhalal").service("systemservice",t),t.$inject=["$http"]}(),function(){function t(t){function e(t){return t}function r(t){return t}return{addComment:function(n){return t.post("/api/makecomment",n).then(e).catch(r)}}}angular.module("nclhalal").service("nclCart",t),t.$inject=["$http"]}(),function(){function t(t){function e(t){return t}function r(t){return t}return{getAllProducts:function(){return t.get("/api/products").then(e).catch(r)}}}angular.module("nclhalal").service("generalQueries",t),t.$inject=["$http"]}(),function(){function t(t){function e(t){return t}function r(t){return t}return{uploadProductFile:function(n){var o=new FormData;return o.append("product_pic",n),t.post("/api/fileupload",o,{transformRequest:angular.identity,headers:{"Content-Type":void 0}}).then(e).catch(r)}}}angular.module("nclhalal").service("productfile",t),t.$inject=["$http"]}(),function(){function t(){return{restrict:"EA",templateUrl:"/common/directives/navigation/navigation.template.html",controller:"navigationCtrl as navvm"}}angular.module("nclhalal").directive("navigation",t)}(),function(){function t(){return{restrict:"EA",templateUrl:"common/directives/breadcrumb/breadcrumb.template.html",controller:"breadcrumbCtrl",controllerAs:"brdvm"}}angular.module("nclhalal").directive("breadCrumb",t)}(),function(){function t(t,e,r){var n=this;n.customerPromo=!0,n.path=e.path(),"/"===n.path?(n.shownextcrumb=!1,n.noBorder="no-border"):n.shownextcrumb=!0,console.log(n.path),!1!==t.isLoggedIn()?(n.currentUser=t.currentUser(),"customer"===n.currentUser.status?t.rewards(n.currentUser.email).then(function(e){204===parseInt(e.status)?(n.promoteRewards=!0,n.user={user:n.currentUser.email},n.setRewards=function(){t.setCustomerRewards(n.user).then(function(t){!0===t.data.success&&(n.promoteRewards=!1,n.rewardSetted=!0,n.successFlash=!0,r(function(){n.successFlash=!1},3e3))}).catch(function(t){alert(t)})}):!0===e.data.rewards[0].rewards_on&&(n.hasRewards=!0)}).catch(function(t){alert(t)}):"admin"===n.currentUser.status&&(n.customerPromo=!1)):n.generalRewardPromo=!0}angular.module("nclhalal").controller("breadcrumbCtrl",t),t.$inject=["authentication","$location","$timeout"]}(),function(){function t(){return{restrict:"EA",templateUrl:"common/directives/productlanding/productlanding.template.html",controller:"productlandingCtrl",controllerAs:"prolnvm"}}angular.module("nclhalal").directive("productLanding",t)}(),function(){function t(t,e){var r=this;r.products="",r.path=e.path(),t.showProducts(r.path).then(function(t){!0===t.data.error?(r.error=!0,r.errormessage="Error! While looking for products"):!0===t.data.success&&(r.error=!1,r.productson=!0,r.products=t.data.products)}).catch(function(t){console.log(t)})}angular.module("nclhalal").controller("productlandingCtrl",t),t.$inject=["systemservice","$location"]}(),function(){function t(){return{restrict:"EA",templateUrl:"common/directives/shoppingcart/shoppingcart.template.html",controller:"shoppingcartCtrl",controllerAs:"cartvm"}}angular.module("nclhalal").directive("shoppingCart",t)}(),function(){function t(t,e,r){var n=this;n.shoppingCart=[],n.quantity=1,n.addtoCart=function(e,r,o,a){if(n.cartitems={cartid:e,name:r,price:o,unit:a,quantity:n.quantity++},t.localStorage.cart){var c=localStorage.getItem("cart")||[];console.log(c),t.localStorage.setItem("cart",c)}else n.shoppingCart.push(n.cartitems),t.localStorage.setItem("cart",n.cartitems)},n.commentForm=!1,n.addComment=function(t){n.comment={product_id:t,message:"",user:r.currentUser().name},n.commentForm=!0,n.activeCat="active-cat-list",n.makeComment=function(){n.comment.message?(n.commentError=!1,e.addComment(n.comment).then(function(t){404===t.status?(n.commentError=!0,n.commentError_message=t.data.error):200===t.status&&(n.commentError=!1,n.commentForm=!1,n.showComments=!0,n.productComments=t.data.comments)}).catch(function(t){alert(t)})):(n.commentError=!0,n.commentError_message="Please add comment!")}},n.cancleComment=function(){n.commentForm=!1,n.activeCat=""}}angular.module("nclhalal").controller("shoppingcartCtrl",t),t.$inject=["$window","nclCart","authentication"]}(),function(){function t(){return{restrict:"EA",templateUrl:"/common/directives/footerGeneric/footerGeneric.template.html"}}angular.module("nclhalal").directive("footerGeneric",t)}(),function(){function t(t,e){var r=this;r.currentPath=t.path(),r.isLoggedIn=e.isLoggedIn(),r.currentUser=e.currentUser(),"admin"===e.currentUser().status?(r.adminon=!0,r.customeron=!1):"customer"===e.currentUser().status&&(r.adminon=!1,r.customeron=!0),r.logout=function(){e.logout(),t.path("/bye")}}angular.module("nclhalal").controller("navigationCtrl",t),t.$inject=["$location","authentication"]}(),function(){function t(t){return{restrict:"A",link:function(e,r,n){var o=t(n.fileModel),a=o.assign;r.bind("change",function(){e.$apply(function(){a(e,r[0].files[0])})})}}}angular.module("nclhalal").directive("fileModel",t),t.$inject=["$parse"]}(),function(){function t(t){var e=this;e.loadProducts=function(){t.getAllProducts().then(function(t){!0===t.data.error?(e.errorOn=!0,e.message=t.data.message):!0===t.data.success&&(e.errorOn=!1,e.success=!0,e.products=r(t.data.products),e.subproduct=t.data.products[3],e.subproducttwo=t.data.products[9],e.subproducttop=t.data.products[10])}).catch(function(t){console.log(t)})};var r=function(t){for(var e,r,n=t.length;n;)r=Math.floor(Math.random()*n--),e=t[n],t[n]=t[r],t[r]=e;return t}}angular.module("nclhalal").controller("homeCtrl",t),t.$inject=["generalQueries"]}(),function(){function t(t){console.log("grocery controller")}angular.module("nclhalal").controller("groceryCtrl",t),t.$inject=["$http"]}(),function(){function t(t){console.log("meat controller")}angular.module("nclhalal").controller("meatfishCtrl",t),t.$inject=["$http"]}(),function(){function t(t){console.log("rice and flour controller")}angular.module("nclhalal").controller("riceandflourCtrl",t),t.$inject=["$http"]}(),function(){function t(t){console.log("kitchen and home")}angular.module("nclhalal").controller("kitchenandhomeCtrl",t),t.$inject=["$http"]}(),function(){function t(t){console.log("ready food")}angular.module("nclhalal").controller("readyfoodCtrl",t),t.$inject=["$http"]}(),function(){function t(t){console.log("veg controller")}angular.module("nclhalal").controller("vegetableandfruitsCtrl",t),t.$inject=["$http"]}(),function(){function t(t){console.log("veg controller")}angular.module("nclhalal").controller("herbsCtrl",t),t.$inject=["$http"]}(),function(){function t(t){var e=this;e.message={sender:"",contact:"",query:""},e.sendMessage=function(){e.message.sender&&e.message.contact&&e.message.query||(e.form_error=!0,e.form_error_message="All * fields are required. Must not be empty")}}angular.module("nclhalal").controller("aboutusCtrl",t),t.$inject=["$http"]}(),function(){function t(t,e){var r=this;r.credentials={email:"",password:""},r.returnPage=t.search().page||"/",r.onlogin=function(){if(r.errors="",!r.credentials.email||!r.credentials.password)return r.errors={error:"All fields are required. Must not be empty"},!1;r.doLogin()},r.doLogin=function(){r.errors="",e.login(r.credentials).error(function(t){r.errors=t}).then(function(){t.search("page",null),"/bye"===r.returnPage?t.path("/"):t.path(r.returnPage)})},e.isLoggedIn()&&t.path(r.returnPage)}angular.module("nclhalal").controller("loginCtrl",t),t.$inject=["$location","authentication"]}(),function(){function t(t,e){var r=this;r.returnPage=t.search().page||"/",r.credentials={name:"",email:"",password:""},r.createAccount=function(){r.errors="",r.credentials.name&&r.credentials.email&&r.credentials.password?r.doRegister():r.errors={error:"All fields are required. Must not be empty"}},r.doRegister=function(){r.errors="",e.register(r.credentials).error(function(t){r.errors=t}).then(function(){t.search("page",null),"/bye"===r.returnPage?t.path("/"):t.path(r.returnPage)})},e.isLoggedIn()&&t.path(r.returnPage)}angular.module("nclhalal").controller("registerCtrl",t),t.$inject=["$location","authentication"]}(),function(){function t(t,e){t.isLoggedIn()||e.path("/login")}angular.module("nclhalal").controller("profileCtrl",t),t.$inject=["authentication","$location"]}(),function(){function t(t,e,r,n,o){var a=this;if(n.isLoggedIn()){const c=n.currentUser();"customer"===c.status?o.path("/profile"):"admin"===c.status&&(a.active="active",a.products={product_name:"",category:"",subcat:"",unit:"",inventoryunit:"",price:"",desc:"",image:""},a.saveProduct=function(){a.products.image=e.product_img,a.products.product_name&&a.products.category&&a.products.subcat&&a.products.unit&&a.products.inventoryunit&&a.products.price&&a.products.desc?r.uploadProductFile(a.products.image).then(function(e){!1===e.data.success?(a.error=!0,a.message=e.data.error):!0===e.data.success&&(a.products.image=e.data.filename,t.createProduct(a.products).then(function(t){!0===t.data.success?(a.successon=!0,a.error=!1,a.message=t.data.message):!0===t.data.error&&(a.error=!0,a.message=t.data.message)}).catch(function(t){console.log(t)}))}).catch(function(t){console.log(t)}):(a.error=!0,a.message="All fields are required. Must not be empty")})}else o.path("/login")}angular.module("nclhalal").controller("systemCtrl",t),t.$inject=["systemservice","$scope","productfile","authentication","$location"]}(),function(){function t(t,e,r){const n=this;if(t.isLoggedIn()){const o=t.currentUser();"customer"===o.status?e.path("/profile"):"admin"===o.status&&(n.hasSearchResult=!1,n.search={name:""},n.searchProduct=function(){n.search.name?(n.searchFormError=!1,r.searchProducts(n.search.name).then(function(t){200===t.status?(n.hasSearchResult=!0,t.data.results.length>0?(n.weHaveResults=!0,n.searchResults=t.data.results):n.noResults=!0):404===t.status&&(n.systemError=!0)}).catch(function(t){alert(t)})):(n.searchFormError=!0,n.emptySearch="Please enter product name to search")})}else e.path("/login")}angular.module("nclhalal").controller("manageCtrl",t),t.$inject=["authentication","$location","systemservice"]}(),function(){function t(t,e){}angular.module("nclhalal").controller("byeCtrl",t),t.$inject=["$location","authentication"]}(),function(){function t(t,e){var r=this;r.productname=e.productname,r.product="",t.singleProduct(r.productname).then(function(t){!0===t.data.error?(r.error=!0,r.message=t.data.message):!0===t.data.success&&(r.error=!1,r.success=!0,r.product=t.data.product,console.log(r.product),r.product.comments.length>0&&(r.hasComments=!0))}).catch(function(t){console.log(t)})}angular.module("nclhalal").controller("singleProductCtrl",t),t.$inject=["systemservice","$routeParams"]}();