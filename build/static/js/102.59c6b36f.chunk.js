"use strict";(self.webpackChunkmenu_network=self.webpackChunkmenu_network||[]).push([[102],{9498:function(e,r,t){t.d(r,{K:function(){return s}});var n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:21;return crypto.getRandomValues(new Uint8Array(e)).reduce((function(e,r){return e+=(r&=63)<36?r.toString(36):r<62?(r-26).toString(36).toUpperCase():r>62?"-":"_"}),"")},a=t(5719),s={LOGIN:{email:a.Ns?"chnirt@gmail.com":"",password:a.Ns?"Admin@123":""},REGISTER:{fullName:a.Ns?"Chnirt Chnirt":"",email:a.Ns?"chnirt@gmail.com":"",username:a.Ns?"chnirt":"",password:a.Ns?"Admin@123":"",confirmPassword:a.Ns?"Admin@123":""},NEW_CATEGORY:{categoryName:a.Ns?"Cocktail":""},NEW_DISH:{dishName:a.Ns?"Phatty\u2019S Nachos":"",price:a.Ns?99e3:0,dishFiles:[]}};n(),n(),n(),n(),n(),n(),n(),n(),n(),n(),n(),n(),n(),n(),n(),n(),n(),n(),n(),n(),n(),n(),n(),n(),n(),n(),n(),n(),n(),n(),n()},8102:function(e,r,t){t.r(r);var n=t(3941),a=t(6097),s=t(9245),i=t(2119),u=t(7242),c=t(6016),o=t(9932),l=t(14),d=t(9498),h=t(980),m=t(9651),f=d.K.NEW_CATEGORY;r.default=function(){var e=(0,c.s0)(),r=(0,l.Z)().user,t=(0,c.UO)().categoryId,d=Boolean(t),p=i.l0.useForm(),g=(0,s.Z)(p,1)[0],N=(0,u.useState)(null),x=(0,s.Z)(N,2),b=x[0],y=x[1],C=(0,u.useCallback)(function(){var t=(0,a.Z)((0,n.Z)().mark((function t(a){var s,u,c,l;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(null!==r){t.next=2;break}return t.abrupt("return");case 2:if(t.prev=2,h.g.get().show(),s=a.categoryName,u=r.uid,c={categoryName:s,uid:u},!d){t.next=14;break}if(null!==b){t.next=10;break}return t.abrupt("return");case 10:return t.next=12,(0,o.gU)(b,c);case 12:t.next=17;break;case 14:return l=(0,o.Uj)("users",u,"categories"),t.next=17,(0,o.H_)(l,c);case 17:return e(-1),i.FN.show({icon:"success",content:d?"Category is updated":"Category is created"}),t.abrupt("return");case 22:t.prev=22,t.t0=t.catch(2),i.FN.show({icon:"error",content:t.t0.message});case 25:return t.prev=25,h.g.get().hide(),t.finish(25);case 28:case"end":return t.stop()}}),t,null,[[2,22,25,28]])})));return function(e){return t.apply(this,arguments)}}(),[r,d,b]),k=(0,u.useCallback)(function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){var a,s;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==r){e.next=2;break}return e.abrupt("return");case 2:return a=(0,o.BQ)("users",null===r||void 0===r?void 0:r.uid,"categories",t),y(a),e.next=6,(0,o.Me)(a);case 6:s=e.sent,g.setFieldsValue(s);case 8:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}(),[r,t]);return(0,u.useEffect)((function(){void 0!==t&&k(t)}),[t,k]),(0,m.jsxs)(u.Fragment,{children:[(0,m.jsx)(i.l2,{className:"sticky top-0 z-[100] bg-white",onBack:function(){return e(-1)},children:d?"EDIT CATEGORY":"NEW CATEGORY"}),(0,m.jsx)(i.mQ,{children:(0,m.jsx)(i.mQ.Tab,{title:d?"Edit":"New",children:(0,m.jsxs)(i.l0,{form:g,initialValues:f,layout:"horizontal",onFinish:C,children:[(0,m.jsx)(i.l0.Header,{children:d?"Edit Category":"New Category"}),(0,m.jsx)(i.l0.Item,{name:"categoryName",label:"Category Name",rules:[{required:!0,message:"Category Name is required"}],shouldUpdate:!0,children:(0,m.jsx)(i.II,{autoComplete:"none",placeholder:"chnirt"})}),(0,m.jsx)(i.l0.Item,{shouldUpdate:!0,className:"submit",children:function(){return(0,m.jsx)(i.zx,{block:!0,type:"submit",color:"primary",size:"large",disabled:!g.isFieldsTouched(!0)||g.getFieldsError().filter((function(e){return e.errors.length})).length>0,children:d?"EDIT":"CREATE"})}})]})},"new")})]})}}}]);
//# sourceMappingURL=102.59c6b36f.chunk.js.map