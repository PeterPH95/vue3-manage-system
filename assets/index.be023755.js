import{d as E,A as x,r as T,H as g,a as c,c as r,K as l,w as i,j as t,a1 as m,bV as S,b1 as A,U as D,af as V,f as b,at as F,au as $,av as L,bC as M,n as I,m as U,aw as K}from"./index.d5caadf9.js";import{a as N,E as j}from"./el-row.5219eb80.js";import{u as z,T as H}from"./TodoChart.0bff7cf5.js";import{n as R}from"./index.browser.8e74d592.js";import"./index.76cae2ae.js";const f=u=>($("data-v-ddd11fb7"),u=u(),L(),u),q={class:"todolist"},G=f(()=>t("h1",{class:"title"},"Today's Todos",-1)),J={class:"l-content",style:{height:"100%"}},O={class:"todo-head"},P=f(()=>t("h1",null,"\u5F85\u529E\u4E8B\u4EF6",-1)),Q={class:"todos"},W=["onUpdate:modelValue"],X=["onClick"],Y={class:"todo-bottom"},Z={class:"r-content",style:{height:"100%",width:"100%"}},tt=f(()=>t("h1",null,"\u5B8C\u6210\u91CF\u7EDF\u8BA1",-1)),ot=E({__name:"index",setup(u){const n=z(),_=x(()=>n.todoList),d=T({id:"",content:"",day:0,fulfill:!1});function p(e){if(!e.content){F.error("\u8BF7\u8F93\u5165\u5185\u5BB9!");return}const o=R(),a=new Date().getDay();n.addTodo({id:o,content:e.content,day:a,fulfill:e.fulfill}),e.content=""}function y(e){n.removeTodo(e),F.success("\u5220\u9664\u6210\u529F\uFF01")}function C(){n.updateStore()}function k(){n.clearFulfill()}function w(){n.showAllTodos()}g(n,()=>{});const B={mounted(e){e.focus()}};return(e,o)=>{const a=N,h=j;return c(),r("div",q,[l(a,{style:{height:"15%"}},{default:i(()=>[G]),_:1}),l(a,{gutter:20,style:{height:"80%"}},{default:i(()=>[l(h,{span:8},{default:i(()=>[t("div",J,[t("div",O,[P,t("div",null,[m(t("input",{type:"text",placeholder:"\u8BF7\u8F93\u5165\u5F85\u529E\u4E8B\u9879","onUpdate:modelValue":o[0]||(o[0]=s=>d.value.content=s),onKeydown:o[1]||(o[1]=A(s=>p(d.value),["enter"]))},null,544),[[B],[S,d.value.content]]),t("button",{onClick:o[2]||(o[2]=s=>p(d.value))},"+\u6DFB\u52A0")])]),t("ul",Q,[(c(!0),r(D,null,V(b(_),s=>(c(),r("li",{class:"todo-container",key:s.id},[m(t("input",{class:"mark",type:"checkbox","onUpdate:modelValue":v=>s.fulfill=v},null,8,W),[[M,s.fulfill]]),t("p",{class:I(["todo-content",{todofinish:s.fulfill}])},U(s.content),3),t("button",{class:"delete",onClick:v=>y(s.id)},"\u5220\u9664",8,X)]))),128))]),t("div",Y,[t("button",{class:"button",onClick:o[3]||(o[3]=s=>C())},"\u5B8C\u6210"),t("button",{class:"button",onClick:o[4]||(o[4]=s=>k())},"\u79FB\u9664"),t("button",{class:"button",onClick:o[5]||(o[5]=s=>w())},"\u663E\u793A\u5168\u90E8")])])]),_:1}),l(h,{span:16},{default:i(()=>[t("div",Z,[tt,l(H,{todoLists:b(_)},null,8,["todoLists"])])]),_:1})]),_:1})])}}});const dt=K(ot,[["__scopeId","data-v-ddd11fb7"]]);export{dt as default};
