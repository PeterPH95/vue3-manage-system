import{ax as f,aG as p,A as v,f as h,q as m,h as r,b9 as j,aP as y,r as l,o as w,H as F,G as K,ba as N}from"./index.01e26784.js";const i={prefix:Math.floor(Math.random()*1e4),current:0},R=Symbol("elIdInjection"),_=()=>m()?r(R,i):i,$=n=>{const u=_(),a=f("namespace",p);return v(()=>h(n)||`${a.value}-id-${u.prefix}-${u.current++}`)},U=()=>{const n=r(j,void 0),u=r(y,void 0);return{form:n,formItem:u}},b=(n,{formItemContext:u,disableIdGeneration:a,disableIdManagement:s})=>{a||(a=l(!1)),s||(s=l(!1));const e=l();let c;const I=v(()=>{var o;return!!(!n.label&&u&&u.inputIds&&((o=u.inputIds)==null?void 0:o.length)<=1)});return w(()=>{c=F([K(n,"id"),a],([o,d])=>{const t=o!=null?o:d?void 0:$().value;t!==e.value&&(u!=null&&u.removeInputId&&(e.value&&u.removeInputId(e.value),!(s!=null&&s.value)&&!d&&t&&u.addInputId(t)),e.value=t)},{immediate:!0})}),N(()=>{c&&c(),u!=null&&u.removeInputId&&e.value&&u.removeInputId(e.value)}),{isLabeledByFormItem:I,inputId:e}};export{_ as a,U as b,b as c,$ as u};