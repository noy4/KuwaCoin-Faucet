function g(){}const Q=t=>t;function wt(t,e){for(const n in e)t[n]=e[n];return t}function kt(t){return t&&typeof t=="object"&&typeof t.then=="function"}function ot(t){return t()}function rt(){return Object.create(null)}function S(t){t.forEach(ot)}function O(t){return typeof t=="function"}function vt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let R;function Zt(t,e){return R||(R=document.createElement("a")),R.href=e,t===R.href}function Et(t){return Object.keys(t).length===0}function U(t,...e){if(t==null)return g;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function St(t){let e;return U(t,n=>e=n)(),e}function te(t,e,n){t.$$.on_destroy.push(U(e,n))}function ee(t,e,n,i){if(t){const s=lt(t,e,n,i);return t[0](s)}}function lt(t,e,n,i){return t[1]&&i?wt(n.ctx.slice(),t[1](i(e))):n.ctx}function ne(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const l=[],c=Math.max(e.dirty.length,s.length);for(let u=0;u<c;u+=1)l[u]=e.dirty[u]|s[u];return l}return e.dirty|s}return e.dirty}function ie(t,e,n,i,s,l){if(s){const c=lt(e,n,i,l);t.p(c,s)}}function se(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function re(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function ce(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}const ut=typeof window<"u";let V=ut?()=>window.performance.now():()=>Date.now(),X=ut?t=>requestAnimationFrame(t):g;const C=new Set;function at(t){C.forEach(e=>{e.c(t)||(C.delete(e),e.f())}),C.size!==0&&X(at)}function Y(t){let e;return C.size===0&&X(at),{promise:new Promise(n=>{C.add(e={c:t,f:n})}),abort(){C.delete(e)}}}let W=!1;function At(){W=!0}function Ct(){W=!1}function Nt(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function jt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const r=[];for(let o=0;o<e.length;o++){const f=e[o];f.claim_order!==void 0&&r.push(f)}e=r}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let r=0;r<e.length;r++){const o=e[r].claim_order,f=(s>0&&e[n[s]].claim_order<=o?s+1:Nt(1,s,_=>e[n[_]].claim_order,o))-1;i[r]=n[f]+1;const a=f+1;n[a]=r,s=Math.max(a,s)}const l=[],c=[];let u=e.length-1;for(let r=n[s]+1;r!=0;r=i[r-1]){for(l.push(e[r-1]);u>=r;u--)c.push(e[u]);u--}for(;u>=0;u--)c.push(e[u]);l.reverse(),c.sort((r,o)=>r.claim_order-o.claim_order);for(let r=0,o=0;r<c.length;r++){for(;o<l.length&&c[r].claim_order>=l[o].claim_order;)o++;const f=o<l.length?l[o]:null;t.insertBefore(c[r],f)}}function Mt(t,e){t.appendChild(e)}function ft(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Dt(t){const e=dt("style");return Ot(ft(t),e),e.sheet}function Ot(t,e){return Mt(t.head||t,e),e.sheet}function Tt(t,e){if(W){for(jt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function oe(t,e,n){W&&!n?Tt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function _t(t){t.parentNode&&t.parentNode.removeChild(t)}function le(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function dt(t){return document.createElement(t)}function Z(t){return document.createTextNode(t)}function ue(){return Z(" ")}function ae(){return Z("")}function fe(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function _e(t){return function(e){return e.preventDefault(),t.call(this,e)}}function Rt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function de(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set?t[i]=e[i]:Rt(t,i,e[i])}function Pt(t){return Array.from(t.childNodes)}function qt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function ht(t,e,n,i,s=!1){qt(t);const l=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const u=t[c];if(e(u)){const r=n(u);return r===void 0?t.splice(c,1):t[c]=r,s||(t.claim_info.last_index=c),u}}for(let c=t.claim_info.last_index-1;c>=0;c--){const u=t[c];if(e(u)){const r=n(u);return r===void 0?t.splice(c,1):t[c]=r,s?r===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,u}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function zt(t,e,n,i){return ht(t,s=>s.nodeName===e,s=>{const l=[];for(let c=0;c<s.attributes.length;c++){const u=s.attributes[c];n[u.name]||l.push(u.name)}l.forEach(c=>s.removeAttribute(c))},()=>i(e))}function he(t,e,n){return zt(t,e,n,dt)}function Bt(t,e){return ht(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>Z(e),!0)}function me(t){return Bt(t," ")}function pe(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function ye(t,e){t.value=e==null?"":e}function ge(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function be(t,e,n){t.classList[n?"add":"remove"](e)}function Lt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,i,e),s}function xe(t,e){const n=[];let i=0;for(const s of e.childNodes)if(s.nodeType===8){const l=s.textContent.trim();l===`HEAD_${t}_END`?(i-=1,n.push(s)):l===`HEAD_${t}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}function $e(t,e){return new t(e)}const B=new Map;let L=0;function Ht(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Ft(t,e){const n={stylesheet:Dt(e),rules:{}};return B.set(t,n),n}function tt(t,e,n,i,s,l,c,u=0){const r=16.666/i;let o=`{
`;for(let m=0;m<=1;m+=r){const b=e+(n-e)*l(m);o+=m*100+`%{${c(b,1-b)}}
`}const f=o+`100% {${c(n,1-n)}}
}`,a=`__svelte_${Ht(f)}_${u}`,_=ft(t),{stylesheet:d,rules:h}=B.get(_)||Ft(_,t);h[a]||(h[a]=!0,d.insertRule(`@keyframes ${a} ${f}`,d.cssRules.length));const y=t.style.animation||"";return t.style.animation=`${y?`${y}, `:""}${a} ${i}ms linear ${s}ms 1 both`,L+=1,a}function H(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?l=>l.indexOf(e)<0:l=>l.indexOf("__svelte")===-1),s=n.length-i.length;s&&(t.style.animation=i.join(", "),L-=s,L||Wt())}function Wt(){X(()=>{L||(B.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&_t(e)}),B.clear())})}function we(t,e,n,i){if(!e)return g;const s=t.getBoundingClientRect();if(e.left===s.left&&e.right===s.right&&e.top===s.top&&e.bottom===s.bottom)return g;const{delay:l=0,duration:c=300,easing:u=Q,start:r=V()+l,end:o=r+c,tick:f=g,css:a}=n(t,{from:e,to:s},i);let _=!0,d=!1,h;function y(){a&&(h=tt(t,0,1,c,l,u,a)),l||(d=!0)}function m(){a&&H(t,h),_=!1}return Y(b=>{if(!d&&b>=r&&(d=!0),d&&b>=o&&(f(1,0),m()),!_)return!1;if(d){const w=b-r,v=0+1*u(w/c);f(v,1-v)}return!0}),y(),f(0,1),m}function ke(t){const e=getComputedStyle(t);if(e.position!=="absolute"&&e.position!=="fixed"){const{width:n,height:i}=e,s=t.getBoundingClientRect();t.style.position="absolute",t.style.width=n,t.style.height=i,Gt(t,s)}}function Gt(t,e){const n=t.getBoundingClientRect();if(e.left!==n.left||e.top!==n.top){const i=getComputedStyle(t),s=i.transform==="none"?"":i.transform;t.style.transform=`${s} translate(${e.left-n.left}px, ${e.top-n.top}px)`}}let M;function k(t){M=t}function et(){if(!M)throw new Error("Function called outside component initialization");return M}function ve(t){et().$$.on_mount.push(t)}function Ee(t){et().$$.after_update.push(t)}const j=[],ct=[],q=[],J=[],mt=Promise.resolve();let K=!1;function pt(){K||(K=!0,mt.then(nt))}function Se(){return pt(),mt}function D(t){q.push(t)}function Ae(t){J.push(t)}const I=new Set;let P=0;function nt(){const t=M;do{for(;P<j.length;){const e=j[P];P++,k(e),It(e.$$)}for(k(null),j.length=0,P=0;ct.length;)ct.pop()();for(let e=0;e<q.length;e+=1){const n=q[e];I.has(n)||(I.add(n),n())}q.length=0}while(j.length);for(;J.length;)J.pop()();K=!1,I.clear(),k(t)}function It(t){if(t.fragment!==null){t.update(),S(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(D)}}let N;function yt(){return N||(N=Promise.resolve(),N.then(()=>{N=null})),N}function F(t,e,n){t.dispatchEvent(Lt(`${e?"intro":"outro"}${n}`))}const z=new Set;let E;function Jt(){E={r:0,c:[],p:E}}function Kt(){E.r||S(E.c),E=E.p}function it(t,e){t&&t.i&&(z.delete(t),t.i(e))}function gt(t,e,n,i){if(t&&t.o){if(z.has(t))return;z.add(t),E.c.push(()=>{z.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const bt={duration:0};function Ce(t,e,n){let i=e(t,n),s=!1,l,c,u=0;function r(){l&&H(t,l)}function o(){const{delay:a=0,duration:_=300,easing:d=Q,tick:h=g,css:y}=i||bt;y&&(l=tt(t,0,1,_,a,d,y,u++)),h(0,1);const m=V()+a,b=m+_;c&&c.abort(),s=!0,D(()=>F(t,!0,"start")),c=Y(w=>{if(s){if(w>=b)return h(1,0),F(t,!0,"end"),r(),s=!1;if(w>=m){const v=d((w-m)/_);h(v,1-v)}}return s})}let f=!1;return{start(){f||(f=!0,H(t),O(i)?(i=i(),yt().then(o)):o())},invalidate(){f=!1},end(){s&&(r(),s=!1)}}}function Ne(t,e,n){let i=e(t,n),s=!0,l;const c=E;c.r+=1;function u(){const{delay:r=0,duration:o=300,easing:f=Q,tick:a=g,css:_}=i||bt;_&&(l=tt(t,1,0,o,r,f,_));const d=V()+r,h=d+o;D(()=>F(t,!1,"start")),Y(y=>{if(s){if(y>=h)return a(0,1),F(t,!1,"end"),--c.r||S(c.c),!1;if(y>=d){const m=f((y-d)/o);a(1-m,m)}}return s})}return O(i)?yt().then(()=>{i=i(),u()}):u(),{end(r){r&&i.tick&&i.tick(1,0),s&&(l&&H(t,l),s=!1)}}}function je(t,e){const n=e.token={};function i(s,l,c,u){if(e.token!==n)return;e.resolved=u;let r=e.ctx;c!==void 0&&(r=r.slice(),r[c]=u);const o=s&&(e.current=s)(r);let f=!1;e.block&&(e.blocks?e.blocks.forEach((a,_)=>{_!==l&&a&&(Jt(),gt(a,1,1,()=>{e.blocks[_]===a&&(e.blocks[_]=null)}),Kt())}):e.block.d(1),o.c(),it(o,1),o.m(e.mount(),e.anchor),f=!0),e.block=o,e.blocks&&(e.blocks[l]=o),f&&nt()}if(kt(t)){const s=et();if(t.then(l=>{k(s),i(e.then,1,e.value,l),k(null)},l=>{if(k(s),i(e.catch,2,e.error,l),k(null),!e.hasCatch)throw l}),e.current!==e.pending)return i(e.pending,0),!0}else{if(e.current!==e.then)return i(e.then,1,e.value,t),!0;e.resolved=t}}function Me(t,e,n){const i=e.slice(),{resolved:s}=t;t.current===t.then&&(i[t.value]=s),t.current===t.catch&&(i[t.error]=s),t.block.p(i,n)}function Qt(t,e){gt(t,1,1,()=>{e.delete(t.key)})}function De(t,e){t.f(),Qt(t,e)}function Oe(t,e,n,i,s,l,c,u,r,o,f,a){let _=t.length,d=l.length,h=_;const y={};for(;h--;)y[t[h].key]=h;const m=[],b=new Map,w=new Map;for(h=d;h--;){const p=a(s,l,h),x=n(p);let $=c.get(x);$?i&&$.p(p,e):($=o(x,p),$.c()),b.set(x,m[h]=$),x in y&&w.set(x,Math.abs(h-y[x]))}const v=new Set,st=new Set;function G(p){it(p,1),p.m(u,f),c.set(p.key,p),f=p.first,d--}for(;_&&d;){const p=m[d-1],x=t[_-1],$=p.key,T=x.key;p===x?(f=p.first,_--,d--):b.has(T)?!c.has($)||v.has($)?G(p):st.has(T)?_--:w.get($)>w.get(T)?(st.add($),G(p)):(v.add(T),_--):(r(x,c),_--)}for(;_--;){const p=t[_];b.has(p.key)||r(p,c)}for(;d;)G(m[d-1]);return m}function Te(t,e){const n={},i={},s={$$scope:1};let l=t.length;for(;l--;){const c=t[l],u=e[l];if(u){for(const r in c)r in u||(i[r]=1);for(const r in u)s[r]||(n[r]=u[r],s[r]=1);t[l]=u}else for(const r in c)s[r]=1}for(const c in i)c in n||(n[c]=void 0);return n}function Re(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function Pe(t){t&&t.c()}function qe(t,e){t&&t.l(e)}function Ut(t,e,n,i){const{fragment:s,after_update:l}=t.$$;s&&s.m(e,n),i||D(()=>{const c=t.$$.on_mount.map(ot).filter(O);t.$$.on_destroy?t.$$.on_destroy.push(...c):S(c),t.$$.on_mount=[]}),l.forEach(D)}function Vt(t,e){const n=t.$$;n.fragment!==null&&(S(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Xt(t,e){t.$$.dirty[0]===-1&&(j.push(t),pt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function ze(t,e,n,i,s,l,c,u=[-1]){const r=M;k(t);const o=t.$$={fragment:null,ctx:[],props:l,update:g,not_equal:s,bound:rt(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(r?r.$$.context:[])),callbacks:rt(),dirty:u,skip_bound:!1,root:e.target||r.$$.root};c&&c(o.root);let f=!1;if(o.ctx=n?n(t,e.props||{},(a,_,...d)=>{const h=d.length?d[0]:_;return o.ctx&&s(o.ctx[a],o.ctx[a]=h)&&(!o.skip_bound&&o.bound[a]&&o.bound[a](h),f&&Xt(t,a)),_}):[],o.update(),f=!0,S(o.before_update),o.fragment=i?i(o.ctx):!1,e.target){if(e.hydrate){At();const a=Pt(e.target);o.fragment&&o.fragment.l(a),a.forEach(_t)}else o.fragment&&o.fragment.c();e.intro&&it(t.$$.fragment),Ut(t,e.target,e.anchor,e.customElement),Ct(),nt()}k(r)}class Be{$destroy(){Vt(this,1),this.$destroy=g}$on(e,n){if(!O(n))return g;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!Et(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const A=[];function xt(t,e){return{subscribe:$t(t,e).subscribe}}function $t(t,e=g){let n;const i=new Set;function s(u){if(vt(t,u)&&(t=u,n)){const r=!A.length;for(const o of i)o[1](),A.push(o,t);if(r){for(let o=0;o<A.length;o+=2)A[o][0](A[o+1]);A.length=0}}}function l(u){s(u(t))}function c(u,r=g){const o=[u,r];return i.add(o),i.size===1&&(n=e(s)||g),u(t),()=>{i.delete(o),i.size===0&&(n(),n=null)}}return{set:s,update:l,subscribe:c}}function Yt(t,e,n){const i=!Array.isArray(t),s=i?[t]:t,l=e.length<2;return xt(n,c=>{let u=!1;const r=[];let o=0,f=g;const a=()=>{if(o)return;f();const d=e(i?r[0]:r,c);l?c(d):f=O(d)?d:g},_=s.map((d,h)=>U(d,y=>{r[h]=y,o&=~(1<<h),u&&a()},()=>{o|=1<<h}));return u=!0,a(),function(){S(_),f()}})}const Le=Object.freeze(Object.defineProperty({__proto__:null,derived:Yt,readable:xt,writable:$t,get:St},Symbol.toStringTag,{value:"Module"}));export{ne as $,Se as A,$t as B,te as C,Tt as D,fe as E,O as F,g as G,je as H,Me as I,be as J,ct as K,le as L,S as M,ye as N,Oe as O,ke as P,Gt as Q,we as R,Be as S,D as T,Ce as U,Ne as V,De as W,ee as X,xe as Y,ie as Z,se as _,ue as a,Yt as a0,wt as a1,de as a2,Te as a3,ce as a4,re as a5,Le as a6,Zt as a7,Re as a8,_e as a9,Ae as aa,oe as b,me as c,Kt as d,ae as e,it as f,Jt as g,_t as h,ze as i,Ee as j,dt as k,he as l,Pt as m,Rt as n,ve as o,ge as p,Z as q,Bt as r,vt as s,gt as t,pe as u,$e as v,Pe as w,qe as x,Ut as y,Vt as z};
