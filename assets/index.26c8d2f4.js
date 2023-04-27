import{aB as le,aR as _,aV as Z,o as Te,a5 as Ie,C as he,P as ce,ay as Me,u as ue,aW as Oe,aC as Se,X as fe,H as J,aX as Re,V as Ne,aY as De,W as $e,aJ as ee,N as z,D as Ve,b as He,g as me,d as we,K as C,e as re,$ as ze,E as Ye,aZ as Ue,r as L,aQ as Ke,Z as Xe,A as I,a_ as pe,Q as Pe,t as We,_ as Ge,J as O,a as c,k as b,w as p,a1 as ne,j as v,n as u,B as ve,a$ as W,c as oe,l as G,S as R,m as H,b0 as j,a9 as te,a2 as se,T as je,a0 as Be,b1 as Ae,b2 as Ee,a7 as qe,b3 as Ze,aO as ye}from"./index.be336d3b.js";import{E as Je}from"./index.be7d1a33.js";import{E as Qe}from"./index.cbf00552.js";import{f as Fe,d as xe}from"./el-popper.e277863e.js";import{g as _e,i as en}from"./validator.14365305.js";import{u as be}from"./index.c4628339.js";import{t as nn}from"./event.4982e83d.js";const on='a[href],button:not([disabled]),button:not([hidden]),:not([tabindex="-1"]),input:not([disabled]),input:not([type="hidden"]),select:not([disabled]),textarea:not([disabled])',tn=e=>getComputedStyle(e).position==="fixed"?!1:e.offsetParent!==null,ge=e=>Array.from(e.querySelectorAll(on)).filter(n=>sn(n)&&tn(n)),sn=e=>{if(e.tabIndex>0||e.tabIndex===0&&e.getAttribute("tabIndex")!==null)return!0;if(e.disabled)return!1;switch(e.nodeName){case"A":return!!e.href&&e.rel!=="ignore";case"INPUT":return!(e.type==="hidden"||e.type==="file");case"BUTTON":case"SELECT":case"TEXTAREA":return!0;default:return!1}},Dn=function(e,n,...t){let s;n.includes("mouse")||n.includes("click")?s="MouseEvents":n.includes("key")?s="KeyboardEvent":s="HTMLEvents";const a=document.createEvent(s);return a.initEvent(n,...t),e.dispatchEvent(a),e},$n=(...e)=>n=>{e.forEach(t=>{le(t)?t(n):t.value=n})};var q=(e=>(e[e.TEXT=1]="TEXT",e[e.CLASS=2]="CLASS",e[e.STYLE=4]="STYLE",e[e.PROPS=8]="PROPS",e[e.FULL_PROPS=16]="FULL_PROPS",e[e.HYDRATE_EVENTS=32]="HYDRATE_EVENTS",e[e.STABLE_FRAGMENT=64]="STABLE_FRAGMENT",e[e.KEYED_FRAGMENT=128]="KEYED_FRAGMENT",e[e.UNKEYED_FRAGMENT=256]="UNKEYED_FRAGMENT",e[e.NEED_PATCH=512]="NEED_PATCH",e[e.DYNAMIC_SLOTS=1024]="DYNAMIC_SLOTS",e[e.HOISTED=-1]="HOISTED",e[e.BAIL=-2]="BAIL",e))(q||{});const ae=e=>{const n=_(e)?e:[e],t=[];return n.forEach(s=>{var a;_(s)?t.push(...ae(s)):Z(s)&&_(s.children)?t.push(...ae(s.children)):(t.push(s),Z(s)&&((a=s.component)==null?void 0:a.subTree)&&t.push(...ae(s.component.subTree)))}),t},an=(e,n,t)=>{let s={offsetX:0,offsetY:0};const a=d=>{const f=d.clientX,E=d.clientY,{offsetX:T,offsetY:h}=s,r=e.value.getBoundingClientRect(),m=r.left,D=r.top,M=r.width,A=r.height,U=document.documentElement.clientWidth,Q=document.documentElement.clientHeight,F=-m+T,S=-D+h,K=U-m-M+T,x=Q-D-A+h,X=$=>{const P=Math.min(Math.max(T+$.clientX-f,F),K),V=Math.min(Math.max(h+$.clientY-E,S),x);s={offsetX:P,offsetY:V},e.value.style.transform=`translate(${ce(P)}, ${ce(V)})`},w=()=>{document.removeEventListener("mousemove",X),document.removeEventListener("mouseup",w)};document.addEventListener("mousemove",X),document.addEventListener("mouseup",w)},l=()=>{n.value&&e.value&&n.value.addEventListener("mousedown",a)},o=()=>{n.value&&e.value&&n.value.removeEventListener("mousedown",a)};Te(()=>{Ie(()=>{t.value?l():o()})}),he(()=>{o()})},ln=e=>{Me(e)||nn("[useLockscreen]","You need to pass a ref param to this function");const n=ue("popup"),t=Oe(()=>n.bm("parent","hidden"));if(!Se||fe(document.body,t.value))return;let s=0,a=!1,l="0";const o=()=>{setTimeout(()=>{$e(document.body,t.value),a&&(document.body.style.width=l)},200)};J(e,d=>{if(!d){o();return}a=!fe(document.body,t.value),a&&(l=document.body.style.width),s=_e(n.namespace.value);const f=document.documentElement.clientHeight<document.body.scrollHeight,E=Re(document.body,"overflowY");s>0&&(f||E==="scroll")&&a&&(document.body.style.width=`calc(100% - ${s}px)`),Ne(document.body,t.value)}),De(()=>o())},rn=(e,n)=>{let t;J(()=>e.value,s=>{var a,l;s?(t=document.activeElement,Me(n)&&((l=(a=n.value).focus)==null||l.call(a))):t.focus()})},ke=e=>{if(!e)return{onClick:ee,onMousedown:ee,onMouseup:ee};let n=!1,t=!1;return{onClick:o=>{n&&t&&e(o),n=t=!1},onMousedown:o=>{n=o.target===o.currentTarget},onMouseup:o=>{t=o.target===o.currentTarget}}},ie="_trap-focus-children",B=[],Ce=e=>{if(B.length===0)return;const n=B[B.length-1][ie];if(n.length>0&&e.code===Ve.tab){if(n.length===1){e.preventDefault(),document.activeElement!==n[0]&&n[0].focus();return}const t=e.shiftKey,s=e.target===n[0],a=e.target===n[n.length-1];s&&t&&(e.preventDefault(),n[n.length-1].focus()),a&&!t&&(e.preventDefault(),n[0].focus())}},un={beforeMount(e){e[ie]=ge(e),B.push(e),B.length<=1&&document.addEventListener("keydown",Ce)},updated(e){z(()=>{e[ie]=ge(e)})},unmounted(){B.shift(),B.length===0&&document.removeEventListener("keydown",Ce)}},dn=He({mask:{type:Boolean,default:!0},customMaskEvent:{type:Boolean,default:!1},overlayClass:{type:me([String,Array,Object])},zIndex:{type:me([String,Number])}}),cn={click:e=>e instanceof MouseEvent};var fn=we({name:"ElOverlay",props:dn,emits:cn,setup(e,{slots:n,emit:t}){const s=ue("overlay"),a=f=>{t("click",f)},{onClick:l,onMousedown:o,onMouseup:d}=ke(e.customMaskEvent?void 0:a);return()=>e.mask?C("div",{class:[s.b(),e.overlayClass],style:{zIndex:e.zIndex},onClick:l,onMousedown:o,onMouseup:d},[re(n,"default")],q.STYLE|q.CLASS|q.PROPS,["onClick","onMouseup","onMousedown"]):ze("div",{class:e.overlayClass,style:{zIndex:e.zIndex,position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px"}},[re(n,"default")])}});const mn=fn,pn=we({name:"ElMessageBox",directives:{TrapFocus:un},components:{ElButton:Je,ElFocusTrap:Fe,ElInput:Qe,ElOverlay:mn,ElIcon:Ye,...Ue},inheritAttrs:!1,props:{buttonSize:{type:String,validator:en},modal:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},showClose:{type:Boolean,default:!0},closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},closeOnHashChange:{type:Boolean,default:!0},center:Boolean,draggable:Boolean,roundButton:{default:!1,type:Boolean},container:{type:String,default:"body"},boxType:{type:String,default:""}},emits:["vanish","action"],setup(e,{emit:n}){const{t}=xe(),s=ue("message-box"),a=L(!1),{nextZIndex:l}=Ke(),o=Xe({autofocus:!0,beforeClose:null,callback:null,cancelButtonText:"",cancelButtonClass:"",confirmButtonText:"",confirmButtonClass:"",customClass:"",customStyle:{},dangerouslyUseHTMLString:!1,distinguishCancelAndClose:!1,icon:"",inputPattern:null,inputPlaceholder:"",inputType:"text",inputValue:null,inputValidator:null,inputErrorMessage:"",message:null,modalFade:!0,modalClass:"",showCancelButton:!1,showConfirmButton:!0,type:"",title:void 0,showInput:!1,action:"",confirmButtonLoading:!1,cancelButtonLoading:!1,confirmButtonDisabled:!1,editorErrorMessage:"",validateError:!1,zIndex:l()}),d=I(()=>{const i=o.type;return{[s.bm("icon",i)]:i&&pe[i]}}),f=be(),E=be(),T=Pe(I(()=>e.buttonSize),{prop:!0,form:!0,formItem:!0}),h=I(()=>o.icon||pe[o.type]||""),r=I(()=>!!o.message),m=L(),D=L(),M=L(),A=L(),U=L(),Q=I(()=>o.confirmButtonClass);J(()=>o.inputValue,async i=>{await z(),e.boxType==="prompt"&&i!==null&&$()},{immediate:!0}),J(()=>a.value,i=>{var y,k;i&&(e.boxType!=="prompt"&&(o.autofocus?M.value=(k=(y=U.value)==null?void 0:y.$el)!=null?k:m.value:M.value=m.value),o.zIndex=l()),e.boxType==="prompt"&&(i?z().then(()=>{var de;A.value&&A.value.$el&&(o.autofocus?M.value=(de=P())!=null?de:m.value:M.value=m.value)}):(o.editorErrorMessage="",o.validateError=!1))});const F=I(()=>e.draggable);an(m,D,F),Te(async()=>{await z(),e.closeOnHashChange&&window.addEventListener("hashchange",S)}),he(()=>{e.closeOnHashChange&&window.removeEventListener("hashchange",S)});function S(){!a.value||(a.value=!1,z(()=>{o.action&&n("action",o.action)}))}const K=()=>{e.closeOnClickModal&&w(o.distinguishCancelAndClose?"close":"cancel")},x=ke(K),X=i=>{if(o.inputType!=="textarea")return i.preventDefault(),w("confirm")},w=i=>{var y;e.boxType==="prompt"&&i==="confirm"&&!$()||(o.action=i,o.beforeClose?(y=o.beforeClose)==null||y.call(o,i,o,S):S())},$=()=>{if(e.boxType==="prompt"){const i=o.inputPattern;if(i&&!i.test(o.inputValue||""))return o.editorErrorMessage=o.inputErrorMessage||t("el.messagebox.error"),o.validateError=!0,!1;const y=o.inputValidator;if(typeof y=="function"){const k=y(o.inputValue);if(k===!1)return o.editorErrorMessage=o.inputErrorMessage||t("el.messagebox.error"),o.validateError=!0,!1;if(typeof k=="string")return o.editorErrorMessage=k,o.validateError=!0,!1}}return o.editorErrorMessage="",o.validateError=!1,!0},P=()=>{const i=A.value.$refs;return i.input||i.textarea},V=()=>{w("close")},Le=()=>{e.closeOnPressEscape&&V()};return e.lockScroll&&ln(a),rn(a),{...We(o),ns:s,overlayEvent:x,visible:a,hasMessage:r,typeClass:d,contentId:f,inputId:E,btnSize:T,iconComponent:h,confirmButtonClasses:Q,rootRef:m,focusStartRef:M,headerRef:D,inputRef:A,confirmRef:U,doClose:S,handleClose:V,onCloseRequested:Le,handleWrapperClick:K,handleInputEnter:X,handleAction:w,t}}}),vn=["aria-label","aria-describedby"],En=["aria-label"],yn=["id"];function bn(e,n,t,s,a,l){const o=O("el-icon"),d=O("close"),f=O("el-input"),E=O("el-button"),T=O("el-focus-trap"),h=O("el-overlay");return c(),b(je,{name:"fade-in-linear",onAfterLeave:n[11]||(n[11]=r=>e.$emit("vanish")),persisted:""},{default:p(()=>[ne(C(h,{"z-index":e.zIndex,"overlay-class":[e.ns.is("message-box"),e.modalClass],mask:e.modal},{default:p(()=>[v("div",{role:"dialog","aria-label":e.title,"aria-modal":"true","aria-describedby":e.showInput?void 0:e.contentId,class:u(`${e.ns.namespace.value}-overlay-message-box`),onClick:n[8]||(n[8]=(...r)=>e.overlayEvent.onClick&&e.overlayEvent.onClick(...r)),onMousedown:n[9]||(n[9]=(...r)=>e.overlayEvent.onMousedown&&e.overlayEvent.onMousedown(...r)),onMouseup:n[10]||(n[10]=(...r)=>e.overlayEvent.onMouseup&&e.overlayEvent.onMouseup(...r))},[C(T,{loop:"",trapped:e.visible,"focus-trap-el":e.rootRef,"focus-start-el":e.focusStartRef,onReleaseRequested:e.onCloseRequested},{default:p(()=>[v("div",{ref:"rootRef",class:u([e.ns.b(),e.customClass,e.ns.is("draggable",e.draggable),{[e.ns.m("center")]:e.center}]),style:ve(e.customStyle),tabindex:"-1",onClick:n[7]||(n[7]=W(()=>{},["stop"]))},[e.title!==null&&e.title!==void 0?(c(),oe("div",{key:0,ref:"headerRef",class:u(e.ns.e("header"))},[v("div",{class:u(e.ns.e("title"))},[e.iconComponent&&e.center?(c(),b(o,{key:0,class:u([e.ns.e("status"),e.typeClass])},{default:p(()=>[(c(),b(G(e.iconComponent)))]),_:1},8,["class"])):R("v-if",!0),v("span",null,H(e.title),1)],2),e.showClose?(c(),oe("button",{key:0,type:"button",class:u(e.ns.e("headerbtn")),"aria-label":e.t("el.messagebox.close"),onClick:n[0]||(n[0]=r=>e.handleAction(e.distinguishCancelAndClose?"close":"cancel")),onKeydown:n[1]||(n[1]=j(W(r=>e.handleAction(e.distinguishCancelAndClose?"close":"cancel"),["prevent"]),["enter"]))},[C(o,{class:u(e.ns.e("close"))},{default:p(()=>[C(d)]),_:1},8,["class"])],42,En)):R("v-if",!0)],2)):R("v-if",!0),v("div",{id:e.contentId,class:u(e.ns.e("content"))},[v("div",{class:u(e.ns.e("container"))},[e.iconComponent&&!e.center&&e.hasMessage?(c(),b(o,{key:0,class:u([e.ns.e("status"),e.typeClass])},{default:p(()=>[(c(),b(G(e.iconComponent)))]),_:1},8,["class"])):R("v-if",!0),e.hasMessage?(c(),oe("div",{key:1,class:u(e.ns.e("message"))},[re(e.$slots,"default",{},()=>[e.dangerouslyUseHTMLString?(c(),b(G(e.showInput?"label":"p"),{key:1,for:e.showInput?e.inputId:void 0,innerHTML:e.message},null,8,["for","innerHTML"])):(c(),b(G(e.showInput?"label":"p"),{key:0,for:e.showInput?e.inputId:void 0},{default:p(()=>[te(H(e.dangerouslyUseHTMLString?"":e.message),1)]),_:1},8,["for"]))])],2)):R("v-if",!0)],2),ne(v("div",{class:u(e.ns.e("input"))},[C(f,{id:e.inputId,ref:"inputRef",modelValue:e.inputValue,"onUpdate:modelValue":n[2]||(n[2]=r=>e.inputValue=r),type:e.inputType,placeholder:e.inputPlaceholder,"aria-invalid":e.validateError,class:u({invalid:e.validateError}),onKeydown:j(e.handleInputEnter,["enter"])},null,8,["id","modelValue","type","placeholder","aria-invalid","class","onKeydown"]),v("div",{class:u(e.ns.e("errormsg")),style:ve({visibility:e.editorErrorMessage?"visible":"hidden"})},H(e.editorErrorMessage),7)],2),[[se,e.showInput]])],10,yn),v("div",{class:u(e.ns.e("btns"))},[e.showCancelButton?(c(),b(E,{key:0,loading:e.cancelButtonLoading,class:u([e.cancelButtonClass]),round:e.roundButton,size:e.btnSize,onClick:n[3]||(n[3]=r=>e.handleAction("cancel")),onKeydown:n[4]||(n[4]=j(W(r=>e.handleAction("cancel"),["prevent"]),["enter"]))},{default:p(()=>[te(H(e.cancelButtonText||e.t("el.messagebox.cancel")),1)]),_:1},8,["loading","class","round","size"])):R("v-if",!0),ne(C(E,{ref:"confirmRef",type:"primary",loading:e.confirmButtonLoading,class:u([e.confirmButtonClasses]),round:e.roundButton,disabled:e.confirmButtonDisabled,size:e.btnSize,onClick:n[5]||(n[5]=r=>e.handleAction("confirm")),onKeydown:n[6]||(n[6]=j(W(r=>e.handleAction("confirm"),["prevent"]),["enter"]))},{default:p(()=>[te(H(e.confirmButtonText||e.t("el.messagebox.confirm")),1)]),_:1},8,["loading","class","round","disabled","size"]),[[se,e.showConfirmButton]])],2)],6)]),_:3},8,["trapped","focus-trap-el","focus-start-el","onReleaseRequested"])],42,vn)]),_:3},8,["z-index","overlay-class","mask"]),[[se,e.visible]])]),_:3})}var gn=Ge(pn,[["render",bn],["__file","/home/runner/work/element-plus/element-plus/packages/components/message-box/src/index.vue"]]);const Y=new Map,Cn=e=>{let n=document.body;return e.appendTo&&(Be(e.appendTo)&&(n=document.querySelector(e.appendTo)),ye(e.appendTo)&&(n=e.appendTo),ye(n)||(n=document.body)),n},Tn=(e,n,t=null)=>{const s=C(gn,e,le(e.message)||Z(e.message)?{default:le(e.message)?e.message:()=>e.message}:null);return s.appContext=t,Ae(s,n),Cn(e).appendChild(n.firstElementChild),s.component},hn=()=>document.createElement("div"),Mn=(e,n)=>{const t=hn();e.onVanish=()=>{Ae(null,t),Y.delete(a)},e.onAction=l=>{const o=Y.get(a);let d;e.showInput?d={value:a.inputValue,action:l}:d=l,e.callback?e.callback(d,s.proxy):l==="cancel"||l==="close"?e.distinguishCancelAndClose&&l!=="cancel"?o.reject("close"):o.reject("cancel"):o.resolve(d)};const s=Tn(e,t,n),a=s.proxy;for(const l in e)Ee(e,l)&&!Ee(a.$props,l)&&(a[l]=e[l]);return a.visible=!0,a};function N(e,n=null){if(!Se)return Promise.reject();let t;return Be(e)||Z(e)?e={message:e}:t=e.callback,new Promise((s,a)=>{const l=Mn(e,n!=null?n:N._context);Y.set(l,{options:e,callback:t,resolve:s,reject:a})})}const Sn=["alert","confirm","prompt"],wn={alert:{closeOnPressEscape:!1,closeOnClickModal:!1},confirm:{showCancelButton:!0},prompt:{showCancelButton:!0,showInput:!0}};Sn.forEach(e=>{N[e]=Bn(e)});function Bn(e){return(n,t,s,a)=>{let l="";return qe(t)?(s=t,l=""):Ze(t)?l="":l=t,N(Object.assign({title:l,message:n,type:"",...wn[e]},s,{boxType:e}),a)}}N.close=()=>{Y.forEach((e,n)=>{n.doClose()}),Y.clear()};N._context=null;const g=N;g.install=e=>{g._context=e._context,e.config.globalProperties.$msgbox=g,e.config.globalProperties.$messageBox=g,e.config.globalProperties.$alert=g.alert,e.config.globalProperties.$confirm=g.confirm,e.config.globalProperties.$prompt=g.prompt};const Vn=g;export{Vn as E,ln as a,ke as b,$n as c,mn as d,ae as f,Dn as t,an as u};