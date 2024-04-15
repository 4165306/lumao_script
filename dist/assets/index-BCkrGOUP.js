import{d as C,c as d,r as J,p as Q,a as se,i as de,s as T,w as W,o as ue,b as ce,e as ge,f as pe,g as v,u as fe,h as me,j as k,k as he}from"./index-Dr93Dt7c.js";import{g as ye,m as ve,_ as b,u as N,S as Y,A as xe,i as be,c as F,a as K,P as h,t as V,b as Se,d as $e,M as Ce}from"./index-CAOU8RSW.js";import{R as X,L as U}from"./LeftOutlined-Bwi9xmcD.js";const _e=e=>!isNaN(parseFloat(e))&&isFinite(e),ke=e=>{const{componentCls:o,colorBgContainer:t,colorBgBody:a,colorText:r}=e;return{[`${o}-sider-light`]:{background:t,[`${o}-sider-trigger`]:{color:r,background:t},[`${o}-sider-zero-width-trigger`]:{color:r,background:t,border:`1px solid ${a}`,borderInlineStart:0}}}},we=e=>{const{antCls:o,componentCls:t,colorText:a,colorTextLightSolid:r,colorBgHeader:s,colorBgBody:u,colorBgTrigger:c,layoutHeaderHeight:g,layoutHeaderPaddingInline:f,layoutHeaderColor:m,layoutFooterPadding:n,layoutTriggerHeight:l,layoutZeroTriggerSize:x,motionDurationMid:$,motionDurationSlow:i,fontSize:y,borderRadius:p}=e;return{[t]:b(b({display:"flex",flex:"auto",flexDirection:"column",minHeight:0,background:u,"&, *":{boxSizing:"border-box"},[`&${t}-has-sider`]:{flexDirection:"row",[`> ${t}, > ${t}-content`]:{width:0}},[`${t}-header, &${t}-footer`]:{flex:"0 0 auto"},[`${t}-header`]:{height:g,paddingInline:f,color:m,lineHeight:`${g}px`,background:s,[`${o}-menu`]:{lineHeight:"inherit"}},[`${t}-footer`]:{padding:n,color:a,fontSize:y,background:u},[`${t}-content`]:{flex:"auto",minHeight:0},[`${t}-sider`]:{position:"relative",minWidth:0,background:s,transition:`all ${$}, background 0s`,"&-children":{height:"100%",marginTop:-.1,paddingTop:.1,[`${o}-menu${o}-menu-inline-collapsed`]:{width:"auto"}},"&-has-trigger":{paddingBottom:l},"&-right":{order:1},"&-trigger":{position:"fixed",bottom:0,zIndex:1,height:l,color:r,lineHeight:`${l}px`,textAlign:"center",background:c,cursor:"pointer",transition:`all ${$}`},"&-zero-width":{"> *":{overflow:"hidden"},"&-trigger":{position:"absolute",top:g,insetInlineEnd:-x,zIndex:1,width:x,height:x,color:r,fontSize:e.fontSizeXL,display:"flex",alignItems:"center",justifyContent:"center",background:s,borderStartStartRadius:0,borderStartEndRadius:p,borderEndEndRadius:p,borderEndStartRadius:0,cursor:"pointer",transition:`background ${i} ease`,"&::after":{position:"absolute",inset:0,background:"transparent",transition:`all ${i}`,content:'""'},"&:hover::after":{background:"rgba(255, 255, 255, 0.2)"},"&-right":{insetInlineStart:-x,borderStartStartRadius:p,borderStartEndRadius:0,borderEndEndRadius:0,borderEndStartRadius:p}}}}},ke(e)),{"&-rtl":{direction:"rtl"}})}},He=ye("Layout",e=>{const{colorText:o,controlHeightSM:t,controlHeight:a,controlHeightLG:r,marginXXS:s}=e,u=r*1.25,c=ve(e,{layoutHeaderHeight:a*2,layoutHeaderPaddingInline:u,layoutHeaderColor:o,layoutFooterPadding:`${t}px ${u}px`,layoutTriggerHeight:r+s*2,layoutZeroTriggerSize:r});return[we(c)]},e=>{const{colorBgLayout:o}=e;return{colorBgHeader:"#001529",colorBgBody:o,colorBgTrigger:"#002140"}}),R=()=>({prefixCls:String,hasSider:{type:Boolean,default:void 0},tagName:String});function B(e){let{suffixCls:o,tagName:t,name:a}=e;return r=>C({compatConfig:{MODE:3},name:a,props:R(),setup(u,c){let{slots:g}=c;const{prefixCls:f}=N(o,u);return()=>{const m=b(b({},u),{prefixCls:f.value,tagName:t});return d(r,m,g)}}})}const I=C({compatConfig:{MODE:3},props:R(),setup(e,o){let{slots:t}=o;return()=>d(e.tagName,{class:e.prefixCls},t)}}),Be=C({compatConfig:{MODE:3},inheritAttrs:!1,props:R(),setup(e,o){let{slots:t,attrs:a}=o;const{prefixCls:r,direction:s}=N("",e),[u,c]=He(r),g=J([]);Q(Y,{addSider:n=>{g.value=[...g.value,n]},removeSider:n=>{g.value=g.value.filter(l=>l!==n)}});const m=se(()=>{const{prefixCls:n,hasSider:l}=e;return{[c.value]:!0,[`${n}`]:!0,[`${n}-has-sider`]:typeof l=="boolean"?l:g.value.length>0,[`${n}-rtl`]:s.value==="rtl"}});return()=>{const{tagName:n}=e;return u(d(n,b(b({},a),{class:[m.value,a.class]}),t))}}}),Oe=B({suffixCls:"layout",tagName:"section",name:"ALayout"})(Be),w=B({suffixCls:"layout-header",tagName:"header",name:"ALayoutHeader"})(I),P=B({suffixCls:"layout-footer",tagName:"footer",name:"ALayoutFooter"})(I),H=B({suffixCls:"layout-content",tagName:"main",name:"ALayoutContent"})(I),E=Oe;var Le={icon:{tag:"svg",attrs:{viewBox:"0 0 1024 1024",focusable:"false"},children:[{tag:"path",attrs:{d:"M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"}}]},name:"bars",theme:"outlined"};const ze=Le;function Z(e){for(var o=1;o<arguments.length;o++){var t=arguments[o]!=null?Object(arguments[o]):{},a=Object.keys(t);typeof Object.getOwnPropertySymbols=="function"&&(a=a.concat(Object.getOwnPropertySymbols(t).filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),a.forEach(function(r){Te(e,r,t[r])})}return e}function Te(e,o,t){return o in e?Object.defineProperty(e,o,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[o]=t,e}var M=function(o,t){var a=Z({},o,t.attrs);return d(xe,Z({},a,{icon:ze}),null)};M.displayName="BarsOutlined";M.inheritAttrs=!1;const Pe=M,G={xs:"479.98px",sm:"575.98px",md:"767.98px",lg:"991.98px",xl:"1199.98px",xxl:"1599.98px",xxxl:"1999.98px"},Ee=()=>({prefixCls:String,collapsible:{type:Boolean,default:void 0},collapsed:{type:Boolean,default:void 0},defaultCollapsed:{type:Boolean,default:void 0},reverseArrow:{type:Boolean,default:void 0},zeroWidthTriggerStyle:{type:Object,default:void 0},trigger:h.any,width:h.oneOfType([h.number,h.string]),collapsedWidth:h.oneOfType([h.number,h.string]),breakpoint:h.oneOf(V("xs","sm","md","lg","xl","xxl","xxxl")),theme:h.oneOf(V("light","dark")).def("dark"),onBreakpoint:Function,onCollapse:Function}),Ae=(()=>{let e=0;return function(){let o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";return e+=1,`${o}${e}`}})(),A=C({compatConfig:{MODE:3},name:"ALayoutSider",inheritAttrs:!1,props:be(Ee(),{collapsible:!1,defaultCollapsed:!1,reverseArrow:!1,width:200,collapsedWidth:80}),emits:["breakpoint","update:collapsed","collapse"],setup(e,o){let{emit:t,attrs:a,slots:r}=o;const{prefixCls:s}=N("layout-sider",e),u=de(Y,void 0),c=T(!!(e.collapsed!==void 0?e.collapsed:e.defaultCollapsed)),g=T(!1);W(()=>e.collapsed,()=>{c.value=!!e.collapsed}),Q(Se,c);const f=(i,y)=>{e.collapsed===void 0&&(c.value=i),t("update:collapsed",i),t("collapse",i,y)},m=T(i=>{g.value=i.matches,t("breakpoint",i.matches),c.value!==i.matches&&f(i.matches,"responsive")});let n;function l(i){return m.value(i)}const x=Ae("ant-sider-");u&&u.addSider(x),ue(()=>{W(()=>e.breakpoint,()=>{try{n==null||n.removeEventListener("change",l)}catch{n==null||n.removeListener(l)}if(typeof window<"u"){const{matchMedia:i}=window;if(i&&e.breakpoint&&e.breakpoint in G){n=i(`(max-width: ${G[e.breakpoint]})`);try{n.addEventListener("change",l)}catch{n.addListener(l)}l(n)}}},{immediate:!0})}),ce(()=>{try{n==null||n.removeEventListener("change",l)}catch{n==null||n.removeListener(l)}u&&u.removeSider(x)});const $=()=>{f(!c.value,"clickTrigger")};return()=>{var i,y;const p=s.value,{collapsedWidth:j,width:q,reverseArrow:O,zeroWidthTriggerStyle:ee,trigger:_=(i=r.trigger)===null||i===void 0?void 0:i.call(r),collapsible:D,theme:te}=e,L=c.value?j:q,S=_e(L)?`${L}px`:String(L),z=parseFloat(String(j||0))===0?d("span",{onClick:$,class:F(`${p}-zero-width-trigger`,`${p}-zero-width-trigger-${O?"right":"left"}`),style:ee},[_||d(Pe,null,null)]):null,oe={expanded:O?d(X,null,null):d(U,null,null),collapsed:O?d(U,null,null):d(X,null,null)},ne=c.value?"collapsed":"expanded",re=oe[ne],ae=_!==null?z||d("div",{class:`${p}-trigger`,onClick:$,style:{width:S}},[_||re]):null,le=[a.style,{flex:`0 0 ${S}`,maxWidth:S,minWidth:S,width:S}],ie=F(p,`${p}-${te}`,{[`${p}-collapsed`]:!!c.value,[`${p}-has-trigger`]:D&&_!==null&&!z,[`${p}-below`]:!!g.value,[`${p}-zero-width`]:parseFloat(S)===0},a.class);return d("aside",K(K({},a),{},{class:ie,style:le}),[d("div",{class:`${p}-children`},[(y=r.default)===null||y===void 0?void 0:y.call(r)]),D||g.value&&z?ae:null])}}}),Ne=w,Re=H,Ie=b(E,{Header:w,Footer:P,Content:H,Sider:A,install:e=>(e.component(E.name,E),e.component(w.name,w),e.component(P.name,P),e.component(A.name,A),e.component(H.name,H),e)}),Me=he("div",{class:"logo"},null,-1),Fe=C({__name:"index",setup(e){const o=J(),t=fe(),a=r=>{t.push(r)};return(r,s)=>{const u=$e,c=Ce,g=Ne,f=me("router-view"),m=Re,n=Ie;return ge(),pe(n,{class:"layout"},{default:v(()=>[d(g,null,{default:v(()=>[Me,d(c,{selectedKeys:o.value,"onUpdate:selectedKeys":s[4]||(s[4]=l=>o.value=l),theme:"dark",mode:"horizontal",style:{lineHeight:"64px"}},{default:v(()=>[d(u,{key:"1",onClick:s[0]||(s[0]=l=>a("/index"))},{default:v(()=>[k("首页")]),_:1}),d(u,{key:"2",onClick:s[1]||(s[1]=l=>a("/airdrop"))},{default:v(()=>[k("空投批量查询")]),_:1}),d(u,{key:"3",onClick:s[2]||(s[2]=l=>a("/wallet"))},{default:v(()=>[k("钱包管理")]),_:1}),d(u,{key:"4",onClick:s[3]||(s[3]=l=>a("/script"))},{default:v(()=>[k("空投脚本")]),_:1})]),_:1},8,["selectedKeys"])]),_:1}),d(m,{style:{padding:"10px 20px"}},{default:v(()=>[d(f)]),_:1})]),_:1})}}});export{Fe as default};
