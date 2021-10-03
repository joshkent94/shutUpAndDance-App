(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{35:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){},54:function(e,t,n){},55:function(e,t,n){},58:function(e,t,n){},59:function(e,t,n){"use strict";n.r(t);var c,a=n(1),s=n.n(a),r=n(21),i=n.n(r),o=n(15),u=n(5),l=(n(35),n(14)),b=n(30),d=n(20),j=n(4),f=n.n(j),m=n(6),p=n(9),h=Object(p.b)("user/getUserDetails",Object(m.a)(f.a.mark((function e(){var t,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/user",{mode:"cors",credentials:"include"});case 2:if(!(t=e.sent).ok){e.next=8;break}return e.next=6,t.json();case 6:return n=e.sent,e.abrupt("return",{firstName:n.firstName,lastName:n.lastName,email:n.email});case 8:case"end":return e.stop()}}),e)})))),O=Object(p.c)({name:"user",initialState:{firstName:"",lastName:"",email:"",genres:[]},reducers:{resetUserDetails:function(e,t){e.firstName="",e.lastName="",e.email="",e.genres=[]},setGenres:function(e,t){if(-1===e.genres.indexOf(t.payload)&e.genres.length<5)return Object(d.a)(Object(d.a)({},e),{},{genres:[].concat(Object(b.a)(e.genres),[t.payload])});var n=e.genres.filter((function(e){return e!==t.payload}));return Object(d.a)(Object(d.a)({},e),{},{genres:n})}},extraReducers:Object(l.a)({},h.fulfilled,(function(e,t){e.firstName=t.payload.firstName,e.lastName=t.payload.lastName,e.email=t.payload.email}))}),g=function(e){return e.user.firstName},x=function(e){return e.user.lastName},v=function(e){return e.user.email},y=function(e){return e.user.genres},N=O.actions,k=N.resetUserDetails,w=N.setGenres,S=O.reducer,C=n(2),D=n(0);function E(){var e=Object(C.c)(g);return Object(D.jsxs)("div",{id:"dashboard",children:[Object(D.jsx)("div",{className:"heading",children:Object(D.jsxs)("h3",{children:[e,"'s Dashboard"]})}),Object(D.jsx)("div",{className:"content"})]})}var T=Object(p.b)("music/getAccessToken",Object(m.a)(f.a.mark((function e(){var t,n,c;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=btoa("".concat("9da83291fa8744f68669357eb0bef8da",":").concat("db1c51c9de494b6789087dc718c828de")),e.next=3,fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{Authorization:"Basic ".concat(t),"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=client_credentials"});case 3:if(!(n=e.sent).ok){e.next=9;break}return e.next=7,n.json();case 7:return c=e.sent,e.abrupt("return",c.access_token);case 9:case 10:case"end":return e.stop()}}),e)})))),L=Object(p.b)("music/getAvailableGenres",function(){var e=Object(m.a)(f.a.mark((function e(t){var n,c,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.accessToken,e.next=3,fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds",{headers:{Authorization:"Bearer "+n}});case 3:if(!(c=e.sent).ok){e.next=9;break}return e.next=7,c.json();case 7:return a=e.sent,e.abrupt("return",a.genres);case 9:case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),I=Object(p.b)("music/getSuggestions",function(){var e=Object(m.a)(f.a.mark((function e(t){var n,c,a,s,r,i;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.accessToken,0!==(c=t.genres).length){e.next=5;break}return e.abrupt("return",[]);case 5:return a=c.join(),e.next=8,fetch("https://api.spotify.com/v1/recommendations?seed_genres=".concat(a),{headers:{Authorization:"Bearer "+n}});case 8:if(!(s=e.sent).ok){e.next=15;break}return e.next=12,s.json();case 12:return r=e.sent,i=r.tracks.map((function(e){return{id:e.id,name:e.name,artist:e.artists[0].name,album:e.album.name,uri:e.uri,images:e.album.images}})),e.abrupt("return",i);case 15:case 16:case 17:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),A=Object(p.c)({name:"music",initialState:{accessToken:"",availableGenres:[],suggestions:[]},reducers:{resetMusicDetails:function(e,t){e.accessToken="",e.availableGenres=[],e.suggestions=[]}},extraReducers:(c={},Object(l.a)(c,T.fulfilled,(function(e,t){e.accessToken=t.payload})),Object(l.a)(c,L.fulfilled,(function(e,t){e.availableGenres=t.payload})),Object(l.a)(c,I.fulfilled,(function(e,t){e.suggestions=t.payload})),c)}),B=function(e){return e.music.accessToken},q=function(e){return e.music.availableGenres},G=function(e){return e.music.suggestions},_=A.actions.resetMusicDetails,R=A.reducer;n(43);function z(e){var t=e.track;return Object(D.jsxs)("div",{className:"track",children:[Object(D.jsx)("img",{src:t.images[2].url,alt:t.name}),Object(D.jsx)("h6",{className:"track-info",children:t.name}),Object(D.jsx)("h6",{className:"track-info",children:t.artist})]})}n(44);var J=n(11);n(45);function M(e){var t=e.genre,n=Object(C.c)(y),c=Object(C.b)();return Object(D.jsxs)("label",{htmlFor:t,className:"genre-label",children:[Object(D.jsx)("input",{className:"genre-checkbox",type:"checkbox",id:t,value:t.toLowerCase(),onClick:function(e){c(w(e.target.value))},checked:n.includes(t.toLowerCase()),readOnly:!0}),Object(D.jsx)("p",{className:"genre",children:t})]})}var P=!1,F=function(){var e=document.getElementById("genres");P||(e.style.display="block",P=!0)},U=function(){for(var e,t=document.getElementById("genres"),n=document.getElementsByClassName("genre-label"),c=0;c<n.length;c++)n[c].matches(":hover")&&(e=!0);P&!e&&(t.style.display="none",P=!1)};n(46);function V(){var e=Object(C.c)(q),t=Object(a.useState)(""),n=Object(J.a)(t,2),c=n[0],s=n[1],r=e.filter((function(e){return e.includes(c.toLowerCase())}));return Object(D.jsx)("form",{id:"search",onFocus:F,onBlur:U,children:Object(D.jsxs)("div",{className:"multiselect",children:[Object(D.jsx)("input",{className:"form-control",type:"search",placeholder:"Select genres... (max 5)",onChange:function(e){e.preventDefault(),s(e.target.value)}}),Object(D.jsx)("div",{id:"genres",children:r.map((function(e){return Object(D.jsx)(M,{genre:e},e)}))})]})})}function H(){var e,t=Object(C.c)(G),n=Object(C.c)(g);return e=0===t.length?Object(D.jsx)("div",{className:"content",children:Object(D.jsx)("div",{children:"Select genres to see suggestions."})}):Object(D.jsx)("div",{className:"content",children:t.map((function(e){return Object(D.jsx)(z,{track:e},e.id)}))}),Object(D.jsxs)("div",{id:"suggestions",children:[Object(D.jsxs)("div",{className:"heading",children:[Object(D.jsxs)("h3",{children:[n,"'s Suggestions"]}),Object(D.jsx)(V,{})]}),e]})}n(47);function K(){var e=Object(C.c)(g),t=Object(a.useState)(""),n=Object(J.a)(t,2)[1];return Object(D.jsxs)("div",{id:"forum",children:[Object(D.jsxs)("div",{className:"heading",children:[Object(D.jsxs)("h3",{children:[e,"'s Forum"]}),Object(D.jsx)("form",{children:Object(D.jsx)("input",{className:"form-control",id:"search",type:"search",placeholder:"Search posts...",onChange:function(e){e.preventDefault(),n(e.target.value)}})})]}),Object(D.jsx)("div",{className:"content"})]})}n(48);function Q(){var e=Object(C.c)(g);return Object(D.jsxs)("div",{id:"account",children:[Object(D.jsx)("div",{className:"heading",children:Object(D.jsxs)("h3",{children:[e,"'s Account"]})}),Object(D.jsx)("div",{className:"content"})]})}n(49);var W,X=function(){var e=Object(m.a)(f.a.mark((function e(){var t,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/genres",{mode:"cors",credentials:"include"});case 2:if(!(t=e.sent).ok){e.next=8;break}return e.next=6,t.json();case 6:return n=e.sent,e.abrupt("return",n);case 8:case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Y=function(){var e=Object(m.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/user",{method:"PUT",mode:"cors",credentials:"include",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Z=n.p+"static/media/inverted-logo.31f83cb9.png",$=Object(p.b)("preLogin/requestLogin",function(){var e=Object(m.a)(f.a.mark((function e(t){var n,c,a,s,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.email,c=t.password,a={email:n,password:c},e.next=4,fetch("/authenticate",{method:"POST",mode:"cors",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});case 4:if(!(s=e.sent).ok){e.next=9;break}return e.abrupt("return",{signedIn:!0,message:""});case 9:return e.next=11,s.json();case 11:return r=e.sent,e.abrupt("return",{signedIn:!1,message:r.message});case 13:case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ee=Object(p.b)("preLogin/logout",Object(m.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/logout",{method:"GET",credentials:"include",mode:"cors"});case 2:if(!e.sent.ok){e.next=6;break}return window.location.reload(),e.abrupt("return",!1);case 6:return e.abrupt("return",!0);case 8:case"end":return e.stop()}}),e)})))),te=Object(p.c)({name:"preLogin",initialState:{registering:!1,signedIn:!1,message:""},reducers:{setRegistering:function(e,t){e.registering=t.payload},setMessage:function(e,t){e.message=t.payload.message}},extraReducers:(W={},Object(l.a)(W,$.fulfilled,(function(e,t){e.signedIn=t.payload.signedIn,e.message=t.payload.message})),Object(l.a)(W,ee.fulfilled,(function(e,t){e.signedIn=t.payload})),W)}),ne=function(e){return e.preLogin.registering},ce=function(e){return e.preLogin.signedIn},ae=function(e){return e.preLogin.message},se=te.actions,re=se.setRegistering,ie=se.setMessage,oe=te.reducer;function ue(){var e=Object(C.b)(),t=Object(C.c)(y),n=Object(C.c)(v),c=Object(C.c)(g),s=Object(C.c)(x),r=Object(C.c)(B);return Object(a.useEffect)((function(){""!==n&&window.pendo.initialize({disableCookies:!0,visitor:{id:n,email:n,full_name:"".concat(c," ").concat(s),return_url:"https://shut-up-and-dance.herokuapp.com/dashboard"},account:{id:n,name:n,is_paying:!1,monthly_value:0}})}),[n,c,s]),Object(a.useEffect)((function(){""===r&""!==n&&e(T()),""!==r&&e(L({accessToken:r}))}),[r,e,n]),Object(a.useEffect)((function(){""!==n&0===t.length&&X().then((function(t){for(var n=0;n<t.length;n++)e(w(t[n]))}))}),[e,n,t]),Object(a.useEffect)((function(){""!==r&&e(I({accessToken:r,genres:t}))}),[t,r,e]),Object(a.useEffect)((function(){""!==n&&Y(t)}),[t,n]),Object(D.jsxs)(o.a,{children:[Object(D.jsx)(u.a,{to:"/dashboard"}),Object(D.jsxs)("nav",{id:"sidebar",children:[Object(D.jsxs)("ul",{id:"nav-list",children:[Object(D.jsx)("li",{className:"icon-element",children:Object(D.jsx)(o.b,{to:"/dashboard",children:Object(D.jsx)("img",{src:Z,alt:"logo",id:"logo"})})}),Object(D.jsx)("li",{className:"nav-element",children:Object(D.jsxs)(o.b,{to:"/dashboard",className:"nav-option",children:[Object(D.jsx)("i",{className:"bi bi-house-fill nav-icon dashboard-button"}),Object(D.jsx)("p",{className:"nav-title",children:"Dashboard"})]})}),Object(D.jsx)("li",{className:"nav-element",children:Object(D.jsxs)(o.b,{to:"/suggestions",className:"nav-option",children:[Object(D.jsx)("i",{className:"bi bi-music-note-beamed nav-icon suggestions-button"}),Object(D.jsx)("p",{className:"nav-title",children:"Suggestions"})]})}),Object(D.jsx)("li",{className:"nav-element",children:Object(D.jsxs)(o.b,{to:"/forum",className:"nav-option",children:[Object(D.jsx)("i",{className:"bi bi-chat-fill nav-icon forum-button"}),Object(D.jsx)("p",{className:"nav-title",children:"Forum"})]})}),Object(D.jsx)("li",{className:"nav-element",children:Object(D.jsxs)(o.b,{to:"/account",className:"nav-option",children:[Object(D.jsx)("i",{className:"bi bi-person-fill nav-icon account-button"}),Object(D.jsx)("p",{className:"nav-title",children:"Account"})]})})]}),Object(D.jsxs)("button",{className:"nav-option",id:"logout",onClick:function(t){t.preventDefault(),e(k()),e(_()),e(ee())},children:[Object(D.jsx)("i",{className:"bi bi-box-arrow-left nav-icon"}),Object(D.jsx)("p",{className:"nav-title",children:"Log Out"})]})]}),Object(D.jsxs)(u.d,{children:[Object(D.jsx)(u.b,{path:"/dashboard",children:Object(D.jsx)(E,{})}),Object(D.jsx)(u.b,{path:"/suggestions",children:Object(D.jsx)(H,{})}),Object(D.jsx)(u.b,{path:"/forum",children:Object(D.jsx)(K,{})}),Object(D.jsx)(u.b,{path:"/Account",children:Object(D.jsx)(Q,{})})]})]})}n(54);var le=function(){document.getElementById("message").style.visibility="visible"};function be(){var e=Object(C.b)(),t=Object(a.useState)(null),n=Object(J.a)(t,2),c=n[0],s=n[1],r=Object(a.useState)(null),i=Object(J.a)(r,2),o=i[0],u=i[1],l=Object(C.c)(ae);return Object(a.useEffect)((function(){le()}),[l]),Object(D.jsxs)("div",{id:"login",children:[Object(D.jsx)("div",{className:"overlay"}),Object(D.jsx)("p",{id:"message",children:l}),Object(D.jsxs)("form",{id:"login-form",onSubmit:function(t){t.preventDefault(),e($({email:c,password:o}))},children:[Object(D.jsx)("input",{type:"email",placeholder:"Enter your email address",className:"form-control login-element",onChange:function(e){e.preventDefault(),s(e.target.value)},required:!0}),Object(D.jsx)("input",{type:"password",placeholder:"Enter your password",className:"form-control login-element",onChange:function(e){e.preventDefault(),u(e.target.value)},required:!0}),Object(D.jsx)("button",{id:"login-button",type:"submit",className:"btn btn-outline-light login-element",children:"Log In"})]}),Object(D.jsx)("button",{onClick:function(t){t.preventDefault(),e(re(!0)),e(ie({message:""}))},id:"reg-link",className:"btn btn-outline-light login-element",children:"Don't have an account? Click here to sign up."})]})}n(55);var de=function(){var e=Object(m.a)(f.a.mark((function e(t,n,c,a,s){var r,i,o,u;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a===s){e.next=4;break}return e.abrupt("return",{message:"Passwords do not match."});case 4:return r={firstName:t,lastName:n,email:c,password:a},e.next=7,fetch("/register",{method:"POST",mode:"cors",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});case 7:if(!(i=e.sent).ok){e.next=13;break}return e.next=11,i.json();case 11:return o=e.sent,e.abrupt("return",o);case 13:return e.next=16,i.json();case 16:return u=e.sent,e.abrupt("return",u);case 18:case 19:case"end":return e.stop()}}),e)})));return function(t,n,c,a,s){return e.apply(this,arguments)}}();function je(){var e=Object(C.b)(),t=Object(a.useState)(null),n=Object(J.a)(t,2),c=n[0],s=n[1],r=Object(a.useState)(null),i=Object(J.a)(r,2),o=i[0],u=i[1],l=Object(a.useState)(null),b=Object(J.a)(l,2),d=b[0],j=b[1],p=Object(a.useState)(null),h=Object(J.a)(p,2),O=h[0],g=h[1],x=Object(a.useState)(null),v=Object(J.a)(x,2),y=v[0],N=v[1],k=Object(C.c)(ae),w=function(){var t=Object(m.a)(f.a.mark((function t(n){var a;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),t.next=3,de(c,o,d,O,y);case 3:a=t.sent,e(ie({message:a.message}));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(a.useEffect)((function(){"Account created successfully."===k?e(re(!1)):le()}),[k,e]),Object(D.jsxs)("div",{id:"reg",children:[Object(D.jsx)("div",{className:"overlay"}),Object(D.jsx)("p",{id:"message",children:k}),Object(D.jsxs)("form",{id:"reg-form",onSubmit:w,children:[Object(D.jsx)("input",{type:"text",placeholder:"Enter your first name",className:"form-control reg-element",onChange:function(e){e.preventDefault(),s(e.target.value)},required:!0}),Object(D.jsx)("input",{type:"text",placeholder:"Enter your last name",className:"form-control reg-element",onChange:function(e){e.preventDefault(),u(e.target.value)},required:!0}),Object(D.jsx)("input",{type:"email",placeholder:"Enter your email address",className:"form-control reg-element",onChange:function(e){e.preventDefault(),j(e.target.value)},required:!0}),Object(D.jsx)("input",{type:"password",placeholder:"Enter your password",className:"form-control reg-element",onChange:function(e){e.preventDefault(),g(e.target.value)},required:!0}),Object(D.jsx)("input",{type:"password",placeholder:"Validate your password",className:"form-control reg-element",onChange:function(e){e.preventDefault(),N(e.target.value)},required:!0}),Object(D.jsx)("button",{id:"reg-button",type:"submit",className:"btn btn-outline-light",children:"Register"})]}),Object(D.jsx)("button",{id:"login-link",className:"btn btn-outline-light reg-element",onClick:function(t){t.preventDefault(),e(re(!1)),e(ie({message:""}))},children:"Already have an account? Click here to log in."})]})}function fe(){var e=Object(C.b)(),t=Object(C.c)(ne),n=Object(C.c)(ce);return"https:"!==window.location.protocol&&window.location.replace("https:".concat(window.location.href.substring(window.location.protocol.length))),Object(a.useEffect)((function(){""!==document.cookie&!n&&e($())})),Object(a.useEffect)((function(){n&&e(h())})),Object(D.jsxs)(o.a,{children:[n&&Object(D.jsx)(u.a,{to:"/signedin"}),t&&Object(D.jsx)(u.a,{to:"/register"}),!n&&!t&&Object(D.jsx)(u.a,{to:"/login"}),Object(D.jsxs)(u.d,{children:[Object(D.jsx)(u.b,{path:"/login",children:Object(D.jsx)(be,{})}),Object(D.jsx)(u.b,{path:"/signedin",children:Object(D.jsx)(ue,{})}),Object(D.jsx)(u.b,{path:"/register",children:Object(D.jsx)(je,{})})]})]})}var me=n(16),pe=n(28),he=n.n(pe),Oe=n(7),ge={key:"root",storage:he.a},xe=Object(Oe.b)({preLogin:oe,user:S,music:R}),ve=Object(me.g)(ge,xe),ye=Object(p.a)({reducer:ve,middleware:function(e){return e({serializableCheck:{ignoredActions:[me.a,me.f,me.b,me.c,me.d,me.e]}})}}),Ne=Object(me.h)(ye),ke=(n(58),n(29));i.a.render(Object(D.jsx)(s.a.StrictMode,{children:Object(D.jsx)(C.a,{store:ye,children:Object(D.jsx)(ke.a,{loading:null,persistor:Ne,children:Object(D.jsx)(fe,{})})})}),document.getElementById("root"))}},[[59,1,2]]]);
//# sourceMappingURL=main.04c3cac3.chunk.js.map