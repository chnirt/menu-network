"use strict";(self.webpackChunkmenu_network=self.webpackChunkmenu_network||[]).push([[513],{9498:function(e,r,n){n.d(r,{K:function(){return i}});var t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:21;return crypto.getRandomValues(new Uint8Array(e)).reduce((function(e,r){return e+=(r&=63)<36?r.toString(36):r<62?(r-26).toString(36).toUpperCase():r>62?"-":"_"}),"")},s=n(5719),i={LOGIN:{email:s.Ns?"chnirt@gmail.com":"",password:s.Ns?"Admin@123":""},REGISTER:{fullName:s.Ns?"Chnirt Chnirt":"",email:s.Ns?"chnirt@gmail.com":"",username:s.Ns?"chnirt":"",password:s.Ns?"Admin@123":"",confirmPassword:s.Ns?"Admin@123":""},NEW_CATEGORY:{categoryName:s.Ns?"Cocktail":""},NEW_DISH:{dishName:s.Ns?"Phatty\u2019S Nachos":"",price:s.Ns?99e3:0,dishFiles:[]}};t(),t(),t(),t(),t(),t(),t(),t(),t(),t(),t(),t(),t(),t(),t(),t(),t(),t(),t(),t(),t(),t(),t(),t(),t(),t(),t(),t(),t(),t(),t()},4513:function(e,r,n){n.r(r),n.d(r,{default:function(){return v}});var t=n(9919),s=n(3941),i=n(6097),a=n(9245),u=n(2119),o=n(7242),c=n(6016),l=n(9932),d=n(14),h=n(9498),p=n(3159),f=n(6541),m=n(980),g=n(9651),N=h.K.NEW_DISH,v=function(){var e=(0,d.Z)().user,r=(0,c.s0)(),n=(0,c.UO)(),h=n.categoryId,v=n.dishId,b=Boolean(v),x=u.l0.useForm(),w=(0,a.Z)(x,1)[0],y=(0,o.useState)(null),k=(0,a.Z)(y,2),I=k[0],F=k[1],j=(0,o.useCallback)(function(){var n=(0,i.Z)((0,s.Z)().mark((function n(t){var i,a,o,c,d,p;return(0,s.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(null!==e&&void 0!==h){n.next=2;break}return n.abrupt("return");case 2:if(n.prev=2,m.g.get().show(),i=t.dishName,a=t.price,o=t.dishFiles,c=e.uid,d={dishFiles:o.map((function(e){return e.url})),dishName:i,price:a},!b){n.next=14;break}if(null!==I){n.next=10;break}return n.abrupt("return");case 10:return n.next=12,(0,l.gU)(I,d);case 12:n.next=17;break;case 14:return p=(0,l.Uj)("users",c,"categories",h,"dishes"),n.next=17,(0,l.H_)(p,d);case 17:return r(-1),u.FN.show({icon:"success",content:b?"Dish is updated":"Dish is created"}),n.abrupt("return");case 22:n.prev=22,n.t0=n.catch(2),u.FN.show({icon:"error",content:n.t0.message});case 25:return n.prev=25,m.g.get().hide(),n.finish(25);case 28:case"end":return n.stop()}}),n,null,[[2,22,25,28]])})));return function(e){return n.apply(this,arguments)}}(),[e,b,I]),E=(0,o.useCallback)(function(){var r=(0,i.Z)((0,s.Z)().mark((function r(n){var i,a;return(0,s.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(null!==e&&void 0!==h){r.next=2;break}return r.abrupt("return");case 2:return i=(0,l.BQ)("users",null===e||void 0===e?void 0:e.uid,"categories",h,"dishes",n),F(i),r.next=6,(0,l.Me)(i);case 6:a=r.sent,w.setFieldsValue((0,t.Z)((0,t.Z)({},a),{},{dishFiles:a.dishFiles.map((function(e){return{url:e}}))}));case 8:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}(),[e,h,w]);return(0,o.useEffect)((function(){void 0!==h&&void 0!==v&&E(v)}),[h,v,E]),(0,g.jsxs)(o.Fragment,{children:[(0,g.jsx)(u.l2,{className:"sticky top-0 z-[100] bg-white",onBack:function(){return r(-1)},children:b?"EDIT DISH":"NEW DISH"}),(0,g.jsxs)(u.l0,{form:w,initialValues:N,layout:"horizontal",onFinish:j,children:[(0,g.jsx)(u.l0.Header,{children:b?"Edit Dish":"New Dish"}),(0,g.jsx)(u.l0.Item,{name:"dishFiles",label:"Dish Files",rules:[{required:!0,message:"Dish Files is required"}],children:(0,g.jsx)(u.wA,{upload:function(e){return"image/jpeg"===e.type||"image/png"===e.type?e.size/1024/1024<2?new Promise((function(r,n){!function(e,r,n,t){if(null!==f.I8.currentUser){var s=e.type.split("/")[1],i="uploads/".concat(f.I8.currentUser.uid,"/").concat(Date.now(),".").concat(s),a=(0,p.iH)(f.tO,i),u=(0,p.B0)(a,e);u.on("state_changed",(function(e){var n=e.bytesTransferred/e.totalBytes*100;"function"===typeof r&&r({state:e.state,progress:n}),e.state}),(function(e){"function"===typeof n&&n(e),e.code}),(function(){(0,p.Jt)(u.snapshot.ref).then((function(e){"function"===typeof t&&t({downloadURL:e,storageUrl:i})}))}))}}(e,void 0,(function(e){return n(e)}),function(){var e=(0,i.Z)((0,s.Z)().mark((function e(n){var t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.downloadURL,e.abrupt("return",r({url:t}));case 2:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}())})):Promise.reject(new Error("Image must smaller than 2MB!")):Promise.reject(new Error("You can only upload JPG/PNG file!"))},multiple:!0,maxCount:3})}),(0,g.jsx)(u.l0.Item,{name:"dishName",label:"Dish Name",rules:[{required:!0,message:"Dish Name is required"}],children:(0,g.jsx)(u.II,{placeholder:"Phatty\u2019S Nachos"})}),(0,g.jsx)(u.l0.Item,{name:"price",label:"Price",rules:[{required:!0,message:"Price is required"},{type:"number",min:1,message:"Invalid Price"}],children:(0,g.jsx)(u.vF,{style:{width:"100%","--border":"1px solid #f5f5f5","--border-inner":"none","--height":"36px","--input-width":"70px","--input-background-color":"var(--adm-color-background)","--active-border":"1px solid #1677ff"},min:0,step:1e3})}),(0,g.jsx)(u.l0.Item,{shouldUpdate:!0,className:"submit",children:function(){return(0,g.jsx)(u.zx,{block:!0,type:"submit",color:"primary",size:"large",disabled:!w.isFieldsTouched(!0)||w.getFieldsError().filter((function(e){return e.errors.length})).length>0,children:b?"EDIT":"CREATE"})}})]})]})}}}]);
//# sourceMappingURL=513.e9c424c7.chunk.js.map