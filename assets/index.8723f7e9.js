import{d as v,r as f,a as r,c as h,K as x,w as _,a1 as k,k as E,a9 as d,j as p,m as y,au as F,av as w,at as C,aw as D}from"./index.be336d3b.js";import{E as V}from"./index.be7d1a33.js";import{E as b}from"./index.cbf00552.js";import"./index.771b666e.js";import"./index.c4628339.js";import"./event.4982e83d.js";const g=o=>(F("data-v-c7a4f873"),o=o(),w(),o),B={class:"content-box"},I=g(()=>p("div",{class:"text"}," \u{1F347} \u8282\u6D41\u6307\u4EE4 \u{1F353}",-1)),L={style:{color:"red","font-size":"1.2em"}},S=v({__name:"index",setup(o){const t=f(1),u=()=>C({type:"success",message:"\u8282\u6D41\u6210\u529F\uFF01\u{1F389}\u{1F389}\u{1F389}"}),i=function(e,s=1e3){let a=Date.now();return function(...n){const c=this;let l=Date.now();l-a<s||(e.apply(c,n),a=l)}},m={mounted(e){e.__handleClick=i(u,t.value*1e3),e.addEventListener("click",e.__handleClick)},updated(e){e.removeEventListener("click",e.__handleClick),e.__handleClick=i(u,t.value*1e3),e.addEventListener("click",e.__handleClick)},beforeUnmount(e){e.removeEventListener("click",e.__handleClick)}};return(e,s)=>{const a=V,n=b;return r(),h("div",B,[I,x(n,{class:"input",modelValue:t.value,"onUpdate:modelValue":s[0]||(s[0]=c=>t.value=c),type:"number",style:{width:"500px"}},{append:_(()=>[k((r(),E(a,{class:"btn"},{default:_(()=>[d(" \u8282\u6D41\u6309\u94AE--\u95F4\u9694\xA0"),p("i",L,y(t.value),1),d("\xA0s ")]),_:1})),[[m]])]),_:1},8,["modelValue"])])}}});const K=D(S,[["__scopeId","data-v-c7a4f873"]]);export{K as default};
