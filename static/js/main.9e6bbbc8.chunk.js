(this["webpackJsonpGLARE-editor"]=this["webpackJsonpGLARE-editor"]||[]).push([[0],{46:function(e,t,a){e.exports=a(67)},52:function(e,t,a){},53:function(e,t,a){},54:function(e,t,a){},57:function(e,t,a){},58:function(e,t,a){},64:function(e,t,a){},67:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(16),c=a.n(l),o=a(26),i=a.n(o),u=a(37),m=a(18),s=a(15),p=a(8);a(52),a(53);var d=function(){return r.a.createElement("div",{className:"homepage"},r.a.createElement("img",{src:"".concat("/GLARE-editor","/images/ConfigPhone.png"),alt:"logo"}),r.a.createElement("div",{className:"side-text"},r.a.createElement("h1",null,"GLARE"),r.a.createElement("h2",null,"Configuration Editor"),r.a.createElement("h5",null," Welcome to the GLARE Configuration Editor! Glare is an Augumented Reality Editor enabling the development of individual experiences regarding humanties and beyond.")))},g=a(25),E=(a(54),function(e){var t=new DataTransfer;return e&&t.items.add(new File([""],e)),t.files}),f=function(){var e=Object(n.useContext)(x),t=e.Answers,a=e.changeAnswer,l=e.checkValidity,c=Object(n.useState)({project_name:""}),o=Object(p.a)(c,2),i=o[0],u=o[1],m=Object(n.useState)(null),s=Object(p.a)(m,2),d=s[0],f=s[1],h=Object(n.useCallback)((function(){l().then((function(e){if(!0===e){var a=JSON.stringify(t),n=new Blob([a],{type:"application/json"});f(URL.createObjectURL(n))}else""!==t.project_name&&t.hotspots.length>0&&Object(g.b)("Not all the required data has been populated! Please check each hotspot to verify the required fields have been filled in.",{type:g.b.TYPE.ERROR,draggablePercent:50})}))}),[t,l]);Object(n.useEffect)((function(){u(t),document.querySelector("#intro-audio").files=E(t.intro_audio),document.querySelector("#homepage-img").files=E(t.homepage_image),h()}),[t,h]);var b=function(e,n){a(e,n),u(t),h()};return r.a.createElement("div",{className:"CreateProject"},r.a.createElement("div",{className:"pure-form pure-form-aligned"},r.a.createElement("h1",null,"New Project"),r.a.createElement("h2",null,"Homepage Content"),r.a.createElement("div",{className:"pure-control-group required"},r.a.createElement("label",{htmlFor:"project-name"},"Project Name"),r.a.createElement("input",{type:"text",id:"project-name",placeholder:"enter project name",value:i.project_name,onChange:function(e){return b("project_name",e.target.value)}})),r.a.createElement("div",{className:"pure-control-group"},r.a.createElement("label",{htmlFor:"intro-audio"},"Introduction Audio"),r.a.createElement("input",{type:"file",id:"intro-audio",accept:"audio/*",onChange:function(e){return b("intro_audio",e.target.files[0].name)}})),r.a.createElement("div",{className:"pure-control-group"},r.a.createElement("label",{htmlFor:"homepage-img"},"Homepage Image"),r.a.createElement("input",{type:"file",id:"homepage-img",accept:"image/*",name:"file.jpg",onChange:function(e){return b("homepage_image",e.target.files[0].name)}})),r.a.createElement("br",null),d&&r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{className:"pure-button download-btn",href:d,download:"markers.json"},"Download Configuration File"),r.a.createElement("a",{className:"pure-button download-btn",href:"".concat("/GLARE-editor","/server-files.zip"),download:"server-files.zip"},"Download Server Files"))))},h=(a(57),function(e){var t=e.history,a=Object(n.useContext)(x).setAnswers;return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("h1",null,"Project"),r.a.createElement("h2",null,"Configuration Editor"),r.a.createElement("input",{type:"file",id:"file",className:"input-file",accept:".json",onChange:function(e){var n=e.target.files,r=new FileReader;r.readAsText(n[0]),r.onload=function(){a(JSON.parse(r.result)),t.push({pathname:"/project"})}}})))});a(58);var b=function(){return r.a.createElement("div",{className:"FAQ-ctn"},r.a.createElement("h1",null,r.a.createElement("b",null,"FAQ")),r.a.createElement("h3",null,"Subject 1"),r.a.createElement("div",null,r.a.createElement("dl",null,r.a.createElement("dt",null,r.a.createElement("b",null,"FAQ 1")),r.a.createElement("dd",null,r.a.createElement("small",null,"Answer to FAQ 1")),r.a.createElement("hr",null),r.a.createElement("dt",null,r.a.createElement("b",null,"FAQ 2")),r.a.createElement("dd",null,r.a.createElement("small",null,"Answer to FAQ 2")),r.a.createElement("hr",null),r.a.createElement("dt",null,r.a.createElement("b",null,"FAQ 3")),r.a.createElement("dd",null,r.a.createElement("small",null,"Answer to FAQ 3")),r.a.createElement("hr",null))))},v=a(23),j=a(6),y=a(72),O=a(73),_=a(71),N=a(74),C=(a(59),function(e){var t=e.handleLocation,l=e.currentLatitude,c=e.currentLongitude,o=Object(n.useRef)(null),i=Object(n.useState)([l,c]),u=Object(p.a)(i,2),m=u[0],s=u[1],d=Object(n.useState)(2),g=Object(p.a)(d,2),E=g[0],f=g[1],h=Object(n.useCallback)((function(e){o.current.leafletElement.flyTo(e,E,{animate:!0})}),[E]);Object(n.useEffect)((function(){var e=a(9);delete e.Icon.Default.prototype._getIconUrl,e.Icon.Default.mergeOptions({iconRetinaUrl:a(60),iconUrl:a(61),shadowUrl:a(62)}),s([l,c]),h({lat:l,lng:c})}),[l,c,h]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(y.a,{style:{height:"20em",margin:"1em 0"},center:m,zoom:E,onClick:function(e){var a=e.latlng,n=a.lat,r=a.lng;f(10),t(n,r)},ref:o,minZoom:2},r.a.createElement(O.a,{attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.osm.org/{z}/{x}/{y}.png"}),0!==m[0]&&0!==m[1]&&r.a.createElement(_.a,{position:m},r.a.createElement(N.a,null,r.a.createElement("span",null,"selected location")))))}),k=function(e){var t=e.handleLibrary,a=e.libraryPages,l=["Pictures","Audio","Links"],c=Object(n.useState)(0),o=Object(p.a)(c,2),i=o[0],u=o[1],m=Object(n.useState)([]),s=Object(p.a)(m,2),d=s[0],g=s[1],f=Object(n.useState)([]),h=Object(p.a)(f,2),b=h[0],j=h[1],y=Object(n.useState)([]),O=Object(p.a)(y,2),_=O[0],N=O[1];Object(n.useEffect)((function(){var e=F(a.filter((function(e){return"Pictures"===e.title})).pop());JSON.stringify(d)===JSON.stringify(e)?d.forEach((function(e,t){document.querySelector("#content-image-".concat(t)).files=E(e.item)})):g(e);var t=F(a.filter((function(e){return"Audio"===e.title})).pop());j(t);var n=F(a.filter((function(e){return"Links"===e.title})).pop());N(n)}),[a,d]);var C=function(e,a,n){var r=d;"image"===a?r[e].item=n.target.files[0].name:r[e].item_description=n.target.value;var c=l.map((function(e,t){return{title:e,content_type:t,content_items:1===t?b:2===t?_:r}}));t(c)},k=function(e,t,a){var n=b;"audio"===t?n[e].item=a.target.value:n[e].item_description=a.target.value,j(n),w()},q=function(e,t,a){var n=_;"link"===t?n[e].item=a.target.value:n[e].item_description=a.target.value,N(n),w()},A=l.map((function(e,t){return{title:e,content_type:t,content_items:1===t?b:2===t?_:d}})),F=function(e){return e&&e.hasOwnProperty("content_items")?e.content_items.map((function(e){return{item:e.item,item_description:e.item_description}})):[]},w=function(){t(A)};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"pure-control-group"},r.a.createElement("label",{htmlFor:"content-type"},"Content Type"),r.a.createElement("select",{name:"content",id:"content-type",onChange:function(e){u(e.target.value)},value:i},l.map((function(e,t){return r.a.createElement("option",{key:t,value:t},e)})))),r.a.createElement("div",{className:"pure-controls"},r.a.createElement("button",{type:"button",className:"pure-button",onClick:function(){var e={item:"",item_description:""},a=l.map((function(t,a){var n=1===a?b:2===a?_:d;return parseInt(i)===a&&(n=[].concat(Object(v.a)(n),[e])),{title:t,content_type:a,content_items:n}}));t(a)}},"Create Content")),d.length>0&&r.a.createElement("legend",null,"Pictures"),d.map((function(e,t){return r.a.createElement(r.a.Fragment,{key:t},r.a.createElement("div",{className:"pure-control-group required"},r.a.createElement("label",{htmlFor:"content-image-".concat(t)},"Image file"),r.a.createElement("input",{type:"file",id:"content-image-".concat(t),placeholder:"select image",accept:"image/*",onChange:function(e){return C(t,"image",e)}})),r.a.createElement("div",{className:"pure-control-group required"},r.a.createElement("label",{htmlFor:"picture-descript-".concat(t)},"Picture Caption"),r.a.createElement("input",{type:"text",id:"picture-descript-".concat(t),placeholder:"enter caption",value:e.item_description,onChange:function(e){return C(t,"description",e)}})))})),b.length>0&&r.a.createElement("legend",null,"Audio"),b.map((function(e,t){return r.a.createElement(r.a.Fragment,{key:t},r.a.createElement("div",{className:"pure-control-group required"},r.a.createElement("label",{htmlFor:"content-audio-".concat(t)},"Audio Link"),r.a.createElement("input",{type:"text",id:"content-audio-".concat(t),placeholder:"Audio Link",value:e.item,onChange:function(e){return k(t,"audio",e)}})),r.a.createElement("div",{className:"pure-control-group required"},r.a.createElement("label",{htmlFor:"audio-descript-".concat(t)},"Audio Description"),r.a.createElement("input",{type:"text",id:"audio-descript-".concat(t),placeholder:"enter description",value:e.item_description,onChange:function(e){return k(t,"description",e)}})))})),_.length>0&&r.a.createElement("legend",null,"Links"),_.map((function(e,t){return r.a.createElement(r.a.Fragment,{key:t},r.a.createElement("div",{className:"pure-control-group required"},r.a.createElement("label",{htmlFor:"content-link-".concat(t)},"Link URL"),r.a.createElement("input",{type:"text",id:"content-link-".concat(t),placeholder:"enter link",value:e.item,onChange:function(e){return q(t,"link",e)}})),r.a.createElement("div",{className:"pure-control-group required"},r.a.createElement("label",{htmlFor:"link-descript-".concat(t)},"Content Description"),r.a.createElement("input",{type:"text",id:"link-descript-".concat(t),placeholder:"enter description",value:e.item_description,onChange:function(e){return q(t,"description",e)}})))})))},q=function(e){var t=e.handleMenu,a=e.menuItems,l=Object(n.useState)([]),c=Object(p.a)(l,2),o=c[0],i=c[1];Object(n.useEffect)((function(){JSON.stringify(o)===JSON.stringify(a)?a.forEach((function(e,t){document.querySelector("#menu-bg-image-".concat(t)).files=E(e.background_image),document.querySelector("#menu-audio-".concat(t)).files=E(e.descriptive_audio)})):i(a)}),[a,o]);var u=function(e,a,n){var r=o,l="title"===a||"description"===a?n.target.value:n.target.files[0].name;r[e]=Object(s.a)(Object(s.a)({},r[e]),Object(m.a)({},a,l)),t(r)};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"pure-controls"},r.a.createElement("button",{type:"button",className:"pure-button",onClick:function(){t([].concat(Object(v.a)(o),[{title:"",description:"",background_image:"",descriptive_audio:""}]))}},"Create Link")),o.length>0&&r.a.createElement("legend",null,"Menu Link"),o.map((function(e,t){return r.a.createElement(r.a.Fragment,{key:t},r.a.createElement("div",{className:"pure-control-group required"},r.a.createElement("label",{htmlFor:"menu-title-".concat(t)},"Menu Link Title"),r.a.createElement("input",{type:"text",id:"menu-title-".concat(t),placeholder:"enter title",value:e.title,onChange:function(e){return u(t,"title",e)}})),r.a.createElement("div",{className:"pure-control-group required"},r.a.createElement("label",{htmlFor:"menu-descript-".concat(t)},"Menu Link Description"),r.a.createElement("input",{type:"text",id:"menu-descript-".concat(t),placeholder:"enter description",value:e.description,onChange:function(e){return u(t,"description",e)}})),r.a.createElement("div",{className:"pure-control-group required"},r.a.createElement("label",{htmlFor:"menu-bg-image-".concat(t)},"Background Image"),r.a.createElement("input",{type:"file",id:"menu-bg-image-".concat(t),placeholder:"select image",accept:"image/*",onChange:function(e){return u(t,"background_image",e)}})),r.a.createElement("div",{className:"pure-control-group required"},r.a.createElement("label",{htmlFor:"menu-audio-".concat(t)},"Descriptive Audio"),r.a.createElement("input",{type:"file",id:"menu-audio-".concat(t),placeholder:"select audio",accept:"audio/*",onChange:function(e){return u(t,"descriptive_audio",e)}})))})))};a(64);var A=function(){var e=Object(n.useContext)(x),t=e.Answers,a=e.changeAnswer,l=Object(j.g)().id,c=Object(n.useState)(l),o=Object(p.a)(c,2),i=o[0],u=o[1],d=Object(n.useState)({name:"",latitude:0,longitude:0,AR_overlay:"",panorama_image:"",VR_overylay:"",overlay_size:10,overlay_offset_x:0,overlay_offset_y:0,start_audio:"",main_pages:[],media_pages:[]}),g=Object(p.a)(d,2),f=g[0],h=g[1];Object(n.useEffect)((function(){if("new"!==l&&t.hotspots.length>l){var e=t.hotspots[l];h(e),document.querySelector("#ar-overlay").files=E(e.AR_overlay),document.querySelector("#panorama-img").files=E(e.panorama_image),document.querySelector("#vr-overlay").files=E(e.VR_overylay),document.querySelector("#narration-audio").files=E(e.start_audio)}}),[t.hotspots,l]);var b=function(e){if("new"===i)u(t.hotspots.length),a("hotspots",[].concat(Object(v.a)(t.hotspots),[e]));else{var n=t.hotspots;n[i]=e,a("hotspots",n)}},y=function(e,t){var a=Object(s.a)(Object(s.a)({},f),Object(m.a)({},e,t));h(a),b(a)};return r.a.createElement("div",{className:"newConfigMain"},r.a.createElement("div",{className:"pure-form pure-form-aligned"},r.a.createElement("div",{className:"pure-control-group required"},r.a.createElement("label",{htmlFor:"hotspot-name"},"Hotspot name"),r.a.createElement("input",{type:"text",id:"hotspot-name",placeholder:"enter name",value:f.name,onChange:function(e){return y("name",e.target.value)}})),r.a.createElement(C,{handleLocation:function(e,t){var a=Object(s.a)(Object(s.a)({},f),{},{latitude:e,longitude:t});h(a),b(a)},currentLatitude:f.latitude,currentLongitude:f.longitude}),r.a.createElement("div",{className:"pure-control-group required"},r.a.createElement("label",{htmlFor:"latitude"},"Latitude"),r.a.createElement("input",{type:"number",id:"latitude",placeholder:"enter latitude",min:-90,max:90,value:null!=f.latitude?f.latitude:"",onChange:function(e){return y("latitude",e.target.value)}})),r.a.createElement("div",{className:"pure-control-group required"},r.a.createElement("label",{htmlFor:"longitude"},"Longitude"),r.a.createElement("input",{type:"number",id:"longitude",placeholder:"enter longitude",min:-180,max:80,value:null!=f.longitude?f.longitude:"",onChange:function(e){return y("longitude",e.target.value)}})),r.a.createElement("div",{className:"pure-control-group required"},r.a.createElement("label",{htmlFor:"ar-overlay"},"AR Overlay"),r.a.createElement("input",{type:"file",id:"ar-overlay",placeholder:"select image",accept:"image/*",onChange:function(e){return y("AR_overlay",e.target.files[0].name)}})),r.a.createElement("div",{className:"pure-control-group required"},r.a.createElement("label",{htmlFor:"panorama-img"},"Panorama image"),r.a.createElement("input",{type:"file",id:"panorama-img",placeholder:"select image",accept:"image/*",onChange:function(e){return y("panorama_image",e.target.files[0].name)}})),r.a.createElement("div",{className:"pure-control-group required"},r.a.createElement("label",{htmlFor:"vr-overlay"},"VR Overlay"),r.a.createElement("input",{type:"file",id:"vr-overlay",placeholder:"select image",accept:"image/*",onChange:function(e){return y("VR_overylay",e.target.files[0].name)}})),r.a.createElement("div",{className:"pure-control-group required"},r.a.createElement("label",{htmlFor:"narration-audio"},"Narration Audio"),r.a.createElement("input",{type:"file",id:"narration-audio",placeholder:"select audio",accept:"audio/*",onChange:function(e){return y("start_audio",e.target.files[0].name)}})),r.a.createElement(k,{handleLibrary:function(e){return y("media_pages",e)},libraryPages:f.media_pages}),r.a.createElement(q,{handleMenu:function(e){return y("main_pages",e)},menuItems:f.main_pages})))},F=a(11),w=a(3),x=r.a.createContext(),L=function(e){var t=e.children,a=Object(j.f)(),l=Object(w.a)().of(Object(w.d)().shape({item:Object(w.e)().required(),item_description:Object(w.e)().required()})),c=Object(w.a)().of(Object(w.d)().shape({title:Object(w.e)().required(),content_type:Object(w.c)().required(),content_items:l.required()})),o=Object(w.a)().of(Object(w.d)().shape({title:Object(w.e)().required(),description:Object(w.e)().required(),background_image:Object(w.e)().required(),descriptive_audio:Object(w.e)().required()})),d=Object(w.a)().of(Object(w.d)().shape({name:Object(w.e)().required(),position:Object(w.b)(),latitude:Object(w.c)().required().min(-90).max(90),longitude:Object(w.c)().required().min(-180).max(80),AR_overlay:Object(w.e)().required(),panorama_image:Object(w.e)().required(),VR_overylay:Object(w.e)().required(),overlay_size:Object(w.c)().min(1).max(10),overlay_offset_x:Object(w.c)().min(-9).max(9),overlay_offset_y:Object(w.c)().min(-9).max(9),start_audio:Object(w.e)().required(),main_pages:o,media_pages:c})),g=Object(w.d)().shape({project_name:Object(w.e)().required(),intro_audio:Object(w.e)(),homepage_image:Object(w.e)(),hotspots:d.required()}),E=Object(n.useState)({project_name:"",intro_audio:"",homepage_image:"",hotspots:[]}),f=Object(p.a)(E,2),h=f[0],b=f[1],v=function(){var e=Object(u.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.isValid(h);case 2:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=function(){var e=Object(u.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/GLARE-editor/markers.json").then((function(e){return e.json()})).then((function(e){e.hasOwnProperty("hotspots")&&(b(e),a.push({pathname:"/project"}))}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(x.Provider,{value:{Answers:h,changeAnswer:function(e,t){return a=e,n=t,void b(Object(s.a)(Object(s.a)({},h),Object(m.a)({},a,n)));var a,n},setAnswers:function(e){return b(e)},checkValidity:function(){return v()},loadExample:function(){return y()}}},t)},S=function(){return r.a.createElement(L,null,r.a.createElement("div",{className:"app"},r.a.createElement("nav",{className:"top-nav"},r.a.createElement("div",{className:"pure-menu pure-menu-horizontal"},r.a.createElement("ul",{className:"pure-menu-list"},r.a.createElement("li",{className:"pure-menu-item"},r.a.createElement(F.b,{className:"pure-menu-link",to:"/"},"Home")),r.a.createElement("li",{className:"pure-menu-item pure-menu-has-children pure-menu-allow-hover"},r.a.createElement(F.b,{className:"pure-menu-link",to:"/project"},"New Project"),r.a.createElement("ul",{className:"pure-menu-children"},r.a.createElement("li",{className:"pure-menu-item"},r.a.createElement(F.b,{className:"pure-menu-link",to:"/project"},"Configuration Editor")),r.a.createElement(x.Consumer,null,(function(e){var t=e.loadExample;return r.a.createElement("li",{className:"pure-menu-item"},r.a.createElement("div",{tabIndex:"0",className:"pure-menu-link",onClick:t},"Expert Configuration"))})))),r.a.createElement("li",{className:"pure-menu-item pure-menu-has-children pure-menu-allow-hover"},r.a.createElement(F.b,{className:"pure-menu-link",to:"/update"},"Edit Project"),r.a.createElement("ul",{className:"pure-menu-children"},r.a.createElement("li",{className:"pure-menu-item"},r.a.createElement(F.b,{className:"pure-menu-link",to:"/update"},"Project Name")))),r.a.createElement("li",{className:"pure-menu-item"},r.a.createElement(F.b,{className:"pure-menu-link",to:"/faq"},"FAQ"))))),r.a.createElement("main",{className:"content-container"},r.a.createElement("section",{className:"content-section"},r.a.createElement(j.c,null,r.a.createElement(j.a,{exact:!0,path:"/",component:d}),r.a.createElement(j.a,{exact:!0,path:"/project",component:f}),r.a.createElement(j.a,{path:"/hotspot/:id",component:A}),r.a.createElement(j.a,{exact:!0,path:"/update",component:h}),r.a.createElement(j.a,{exact:!0,path:"/faq",component:b}))),r.a.createElement("aside",{className:"project-side"},r.a.createElement("h2",null,"New Project"),r.a.createElement("nav",{className:"side-nav"},r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(F.b,{to:"/project"},"Homepage Content")))),r.a.createElement("h3",null,"Hotspots"),r.a.createElement("nav",{className:"hotspot-nav"},r.a.createElement(x.Consumer,null,(function(e){var t=e.Answers;return r.a.createElement("ul",{className:"hotspot-items"},t.hotspots.map((function(e,t){return r.a.createElement("li",{key:t},r.a.createElement(F.b,{to:"/hotspot/".concat(t)},e.name))})))})),r.a.createElement("ul",null,r.a.createElement("li",{className:"add-hotspot"},r.a.createElement(F.b,{to:"/hotspot/new"},"Add a Hotspot")))))),r.a.createElement("footer",null,r.a.createElement("ul",null,r.a.createElement("li",null," FAQ | 2017 \xa9 Kent State University | Privacy & Terms of Use "),r.a.createElement("li",null,r.a.createElement("img",{alt:"NEH Logo",id:"logo",src:"".concat("/GLARE-editor","/images/NEH_logo.png")})),r.a.createElement("li",null,r.a.createElement("img",{alt:"KSU Logo",id:"logo",src:"".concat("/GLARE-editor","/images/Kent State Logo.png")}))))))};a(66);c.a.render(r.a.createElement(F.a,{basename:"/GLARE-editor"},r.a.createElement(S,null),r.a.createElement(g.a,null)),document.getElementById("root"))}},[[46,1,2]]]);
//# sourceMappingURL=main.9e6bbbc8.chunk.js.map