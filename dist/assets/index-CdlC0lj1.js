import{aa as et,X as te,Q as ee,ab as ne,c as nt,d as it,r as ht,j as I}from"./index-Cb_E7giR.js";const C=(e,t)=>e.querySelector(`[data-key="${t}"]`);function X(e,t){e.style.transform=`translate(${t.x}px, ${t.y}px)`}const b=(e,...t)=>e==null?void 0:e.classList.add(...t),E=(e,t)=>e==null?void 0:e.classList.remove(t),ft=(e,t)=>e==null?void 0:e.classList.contains(t);function rt(e,t,n,i){t.styles||(t.styles=[]);const o=t.styles.findIndex(s=>s.startsWith(n));o>-1&&(E(e,t.styles[o]),t.styles.splice(o,1)),t.styles.push(i),b(e,i)}const y=(e,t,n,i)=>e.addEventListener(t,n,{passive:!0,once:i}),v=(e,t,n,i)=>e==null?void 0:e.removeEventListener(t,n,{capture:i});function Y(e,t,n){e.querySelectorAll(t).forEach(i=>{i.onclick=n})}const V=(e,t)=>e.currentTarget.getAttribute(t);function R(e,t){const n=document.createElementNS("http://www.w3.org/2000/svg",e);return t&&(n.innerHTML=t),n}function Mt(e){let t,n=0;for(const i of e.getElementsByTagName("tspan"))for(const o of ie(i.getBBox())){const s=Math.abs(o.x)+Math.abs(o.y);n<s&&(t=o,n=s)}return t}const ie=e=>[{x:e.x,y:e.y},{x:e.right,y:e.y},{x:e.x,y:e.bottom},{x:e.right,y:e.bottom}];function q(e,t,n){return n<=e?e:e+Math.ceil((n-e)/t)*t}function N(e,t){let n=e.pop();for(;n;)t(n),n=e.pop()}function mt(e,t,n){const i=n??1;return e.x+=i*t.x,e.y+=i*t.y,e}const $t=e=>JSON.parse(JSON.stringify(e));function oe(e){let t,n,i;function o(s){if(!(!s.isPrimary||!s.isTrusted)){if(t&&Math.abs(t.x-s.clientX)<3&&Math.abs(t.y-s.clientY)<3){s.stopImmediatePropagation();return}t=null,s.movementX===void 0?(s[ot]=n?s.clientX-n:0,s[st]=i?s.clientY-i:0,n=s.clientX,i=s.clientY):(s[ot]=s.movementX,s[st]=s.movementY)}}e.addEventListener("pointerdown",s=>{t={x:s.clientX,y:s.clientY},n=null,i=null,e.addEventListener("pointermove",o,{capture:!0,passive:!0}),e.addEventListener("pointerup",r=>{v(e,"pointermove",o,!0)},{capture:!0,once:!0,passive:!0})},{capture:!0,passive:!0})}const ot=Symbol("movementX"),st=Symbol("movementY"),g=Symbol("Canvas");function Ht(e,t,n,i,o,s,r,l,d){let c=!1,a=!1,p;function m(w){a&&(!c&&(o(w),!a)||(lt(i,n.scale,w),c=!0,s(w)))}function u(w){c?r(w):l(w),x(!0)}function f(w){t.contains(w.target)||(x(),d())}function H(){x(),d()}function h(w){w[L]||!w.isPrimary||(w[L]=!0,p=w.target,w.pointerId!==zt&&p.setPointerCapture(w.pointerId),y(p,"pointercancel",u,!0),y(p,"pointerup",u,!0),y(p,"pointermove",m),y(e,"wheel",H,!0),y(e,"pointerdown",f),a=!0)}y(t,"pointerdown",h);function x(w){v(p,"pointercancel",u),v(p,"pointerup",u),v(p,"pointermove",m),w||(v(e,"pointerdown",f),v(e,"wheel",H)),p=null,c=!1,a=!1}return x}function lt(e,t,n){e.x+=n[ot]/t,e.y+=n[st]/t}const zt=42;function yt(e){e.ownerSVGElement.focus(),e.dispatchEvent(new PointerEvent("pointerdown",{isPrimary:!0,pointerId:zt})),e.dispatchEvent(new PointerEvent("pointerup",{isPrimary:!0}))}const L=Symbol("processed"),j=(e,t,n)=>({x:(t-e.position.x)/e.scale,y:(n-e.position.y)/e.scale});function K(e,t){const n=t/2;function i(o){const s=Math.round(o/t)*t;return o-s>0?s+n:s-n}e.x=i(e.x),e.y=i(e.y)}function se(e){const t=e[g].data,n=le(e.ownerSVGElement,t);function i(){e.style.transform=`matrix(${t.scale}, 0, 0, ${t.scale}, ${t.position.x}, ${t.position.y})`,n()}function o(s,r){if(s<.25||s>4)return;const l=s/t.scale;t.scale=s,t.position.x=l*(t.position.x-r.x)+r.x,t.position.y=l*(t.position.y-r.y)+r.y,i()}re(e.ownerSVGElement,t,o,i),e.ownerSVGElement.addEventListener("wheel",s=>{s.preventDefault();const r=s.deltaY||s.deltaX,l=Math.abs(r)<50?.05:.25;o(t.scale+(r<0?l:-l),Ct(s))}),e[g].move=function(s,r,l){t.position.x=s,t.position.y=r,t.scale=l,i()}}function re(e,t,n,i){let o,s,r,l;function d(a){r=null,l=null,(o==null?void 0:o.id)===a.pointerId&&(o=null),(s==null?void 0:s.id)===a.pointerId&&(s=null),!o&&!s&&(v(e,"pointermove",c),v(e,"pointercancel",d),v(e,"pointerup",d))}function c(a){if(a[L])return;if(o&&!s||!o&&s){t.position.x=a.clientX+(o||s).shift.x,t.position.y=a.clientY+(o||s).shift.y,i();return}if(!s||!o||(s==null?void 0:s.id)!==a.pointerId&&(o==null?void 0:o.id)!==a.pointerId)return;const p=Math.hypot(o.pos.x-s.pos.x,o.pos.y-s.pos.y),m={x:(o.pos.x+s.pos.x)/2,y:(o.pos.y+s.pos.y)/2};r&&(t.position.x=t.position.x+m.x-l.x,t.position.y=t.position.y+m.y-l.y,n(t.scale/r*p,m)),r=p,l=m,o.id===a.pointerId&&(o=W(a,t)),s.id===a.pointerId&&(s=W(a,t))}y(e,"pointerdown",a=>{if(!(a[L]||!o&&!a.isPrimary||o&&s)){if(e.setPointerCapture(a.pointerId),o||(y(e,"pointermove",c),y(e,"pointercancel",d),y(e,"pointerup",d)),!o){o=W(a,t);return}s||(s=W(a,t))}})}function le(e,t){let n;function i(o){n!==o&&(n=o,e.style.backgroundImage=`radial-gradient(rgb(73 80 87 / ${o}) 1px, transparent 0)`)}return i(.7),e.style.backgroundSize=`${t.cell}px ${t.cell}px`,function(){const o=t.cell*t.scale;t.scale<.5?i(0):t.scale<=.9?i(.3):i(.7),e.style.backgroundSize=`${o}px ${o}px`,e.style.backgroundPosition=`${t.position.x}px ${t.position.y}px`}}function Ct(e){return{x:e.clientX,y:e.clientY}}function W(e,t){return{id:e.pointerId,pos:Ct(e),shift:{x:t.position.x-e.clientX,y:t.position.y-e.clientY}}}function ae(e){e.addEventListener("pointerdown",t=>{if(!t.isPrimary||t[gt]||!t.isTrusted)return;t.stopImmediatePropagation();const n=new PointerEvent("pointerdown",t);n[gt]=!0,de(t).dispatchEvent(n)},{capture:!0,passive:!0})}function de(e){return Tt(e).find(t=>!t.hasAttribute("data-evt-no"))}function _t(e){return Tt(e)[0]}function Tt(e){return document.elementsFromPoint(e.clientX,e.clientY).sort((t,n)=>{const i=t.getAttribute("data-evt-index"),o=n.getAttribute("data-evt-index");return i===o?0:i>o?-1:1})}const gt=Symbol("routeed"),S=Symbol("path"),k=Symbol("shape"),It='<svg data-cmd="del" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z" fill="rgb(52,71,103)"/></svg>',Lt='<svg data-cmd="copy" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z" fill="rgb(52,71,103)"/></svg>';class At extends HTMLElement{constructor(t){super(),this._cmdHandler=t}connectedCallback(){const t=this.attachShadow({mode:"closed"});t.innerHTML=`
		<style>
			.ln { display: flex; }
			.ln > * {
				height: 24px;
				padding: 10px;
			}
			[data-cmd] { cursor: pointer; }
		</style>
		<div class="ln">
			${Lt}
			${It}
		</div>`,Y(t,"[data-cmd]",n=>this._cmdHandler(V(n,"data-cmd")))}}customElements.define("ap-grp-settings",At);let z;function F(e,t,n){z=document.createElement("div"),z.style.cssText="position: fixed; box-shadow: 0px 0px 58px 2px rgb(34 60 80 / 20%); border-radius: 16px; background-color: rgba(255,255,255, .9);",z.append(n),document.body.append(z);function i(o,s){z.style.left=`${o}px`,z.style.top=`${window.scrollY+s-z.getBoundingClientRect().height}px`}return i(e,t),{position:i,del:()=>{z.remove(),z=null}}}function ce(e){z.style.top=`${z.getBoundingClientRect().top+e}px`}function pe(e,t){const n=j(e[g].data,window.innerWidth/2,window.innerHeight/2);K(n,e[g].data.cell);const i=mt(n,ue(t),-1);Pt(t,o=>{o&&mt(o,i)})}function ue(e){const t=he(e);return{x:t.min.x+(t.max.x-t.min.x)/2,y:t.min.y+(t.max.y-t.min.y)/2}}function he(e){const t={x:1/0,y:1/0},n={x:-1/0,y:-1/0};return Pt(e,i=>{i&&(t.x>i.x&&(t.x=i.x),t.y>i.y&&(t.y=i.y),n.x<i.x&&(n.x=i.x),n.y<i.y&&(n.y=i.y))}),{min:t,max:n}}function Pt(e,t){e.s.forEach(n=>{var i,o;n.type===0?(t((i=n.s.p)==null?void 0:i.position),t((o=n.e.p)==null?void 0:o.position)):t(n.position)})}function at(e){e[g].selectClear&&e[g].selectClear()}function B(e,t){e[g].selectClear=t}const Vt="1.1",fe=e=>Bt([...e.children]);function Bt(e){const t={v:Vt,s:[]};for(const n of e)if(n[k])t.s.push(n[k].data);else{let i=function(r){var d;const l=e.indexOf((d=r.shape)==null?void 0:d.shapeEl);return l!==-1?{s:l,k:r.shape.connectorKey}:{p:r.data}};const o=n[S].data,s={type:0,s:i(o.s),e:i(o.e)};o.styles&&(s.c=o.styles),t.s.push(s)}return t}function Xt(e,t,n){if(t.v!==Vt)return alert("Wrong format"),null;const i=new Map;function o(l){let d=i.get(l);return d||(d=e[g].shapeMap[l.type].create(l),e.append(d),i.set(l,d)),d}const s=l=>o(t.s[l]),r=[];for(const l of t.s)switch(l.type){case 0:{const d=a=>a.p?{data:a.p}:{shape:{shapeEl:s(a.s),connectorKey:a.k}},c=e[g].shapeMap[0].create({styles:l.c,s:d(l.s),e:d(l.e)});r.push(c),e.append(c);break}default:o(l);break}return[...i.values(),...r]}let T;function xt(e){e&&!T?(T=document.createElement("div"),T.style.cssText="z-index: 2; position: fixed; left: 0; top: 0; width:100%; height:100%; background: #fff; opacity: 0",T.innerHTML=`<style>
		@keyframes blnk {
			0% { opacity: 0; }
			50% { opacity: 0.7; }
			100% {opacity: 0;}
		}
		.blnk { animation: blnk 1.6s linear infinite; }
		</style>`,T.classList.add("blnk"),document.body.append(T)):e||(T.remove(),T=null)}function dt(e){document.getElementById("diagram").style.pointerEvents=e?"none":"unset",document.getElementById("tip").style.display=e?"unset":"none"}const Yt="dgrm";function ct(e){function t(n){const i=e();document.activeElement===i[0].ownerSVGElement&&(n.preventDefault(),n.clipboardData.setData(Yt,JSON.stringify(Rt(i))))}return document.addEventListener("copy",t),function(){v(document,"copy",t)}}function me(e){y(document,"paste",t=>{if(t.target.tagName.toUpperCase()==="TEXTAREA")return;const n=t.clipboardData.getData(Yt);n&&(dt(!1),at(e),jt(e,JSON.parse(n)))})}const G=(e,t)=>jt(e,Rt(t)),Rt=e=>$t(Bt(e));function jt(e,t){at(e),pe(e,t),Jt(e,Xt(e,t))}const Kt="highlight-s",Nt="highlight-e",Wt="highlight";function ye(e){const t=e.ownerSVGElement;let n,i,o,s,r;function l(a){if(a[L]||!s){c();return}a[L]=!0,o&&(o.remove(),o=null);const p=a.clientX-i.x,m=a.clientY-i.y;s.width.baseVal.value=Math.abs(p),s.height.baseVal.value=Math.abs(m),p<0&&(r.x=a.clientX),m<0&&(r.y=a.clientY),s.style.transform=`translate(${r.x}px, ${r.y}px)`}function d(){if(s){const a=p=>xe(j(e[g].data,r.x,r.y),s.width.baseVal.value/e[g].data.scale,s.height.baseVal.value/e[g].data.scale,p.x,p.y);Jt(e,e.children,a)}c()}function c(){clearTimeout(n),n=null,o==null||o.remove(),o=null,s==null||s.remove(),s=null,v(t,"pointermove",l),v(t,"wheel",c),v(t,"pointerup",d)}y(t,"pointerdown",a=>{if(a[L]||!a.isPrimary){c();return}y(t,"pointermove",l),y(t,"wheel",c,!0),y(t,"pointerup",d,!0),n=setTimeout(p=>{at(e),o=R("circle"),b(o,"ative-elem"),o.style.cssText="r:10px; fill: rgb(108 187 247 / 51%)",X(o,{x:a.clientX,y:a.clientY}),t.append(o),i={x:a.clientX,y:a.clientY},r={x:a.clientX,y:a.clientY},s=R("rect"),s.style.cssText="rx:10px; fill: rgb(108 187 247 / 51%)",X(s,r),t.append(s)},500)})}function Jt(e,t,n){const i=r=>n?n(r.position):!0,o={shapes:[],shapesPaths:[],pathEnds:[],pathEndsPaths:[]};function s(r,l,d){return!l.shape&&i(l.data)?(o.pathEnds.push(l),b(r,d),1):l.shape&&i(l.shape.shapeEl[k].data)?2:0}for(const r of t)if(r[k])i(r[k].data)&&(b(r,Wt),o.shapes.push(r));else if(r[S]){const l=s(r,r[S].data.s,Kt),d=s(r,r[S].data.e,Nt);(l===1||d===1)&&o.pathEndsPaths.push(r),(l===2||d===2)&&o.shapesPaths.push(r)}ge(e,o)}function ge(e,t){var u,f,H,h,x,w,ut;if(((u=t.shapes)==null?void 0:u.length)===1&&!((f=t.pathEnds)!=null&&f.length)){E(t.shapes[0],"highlight"),yt(t.shapes[0]);return}if(!((H=t.shapes)!=null&&H.length)&&((h=t.pathEnds)==null?void 0:h.length)===1){Q(t.pathEndsPaths[0]);return}if(!((x=t.shapes)!=null&&x.length)&&((w=t.pathEnds)==null?void 0:w.length)===2&&((ut=t.pathEndsPaths)==null?void 0:ut.length)===1){Q(t.pathEndsPaths[0]),yt(t.pathEndsPaths[0]);return}const n=e.ownerSVGElement;let i=!1,o=!1,s;const r=()=>{s==null||s.del(),s=null};function l(M){var $,_;if(r(),o=(($=t.shapes)==null?void 0:$.some(A=>A.contains(M.target)))||((_=t.pathEnds)==null?void 0:_.some(A=>A.el.contains(M.target))),!o&&M.target!==n){p();return}o&&M.stopImmediatePropagation(),n.setPointerCapture(M.pointerId),y(n,"pointerup",c,!0),y(n,"pointermove",a)}function d(M){var $,_,A;($=t.shapes)==null||$.forEach(P=>{M(P[k].data.position),P[k].drawPosition()}),(_=t.pathEnds)==null||_.forEach(P=>M(P.data.position)),(A=t.pathEndsPaths)==null||A.forEach(P=>P[S].draw())}function c(M){if(i)d($=>K($,e[g].data.cell));else{if(!o){p();return}s=F(M.clientX-10,M.clientY-10,new At($=>{switch($){case"del":N(t.shapes,_=>_[k].del()),N(t.pathEndsPaths,_=>_[S].del()),p();break;case"copy":{G(e,wt(t));break}}}))}p(!0)}function a(M){if(!o){p(!0);return}i=!0,d($=>lt($,e[g].data.scale,M))}function p(M){v(n,"pointerup",c),v(n,"pointermove",a),i=!1,o=!1,M||(B(e,null),m&&(m(),m=null),v(n,"pointerdown",l,!0),r(),N(t.shapes,$=>E($,Wt)),N(t.pathEndsPaths,$=>Q($)),t.pathEnds=null,t.shapesPaths=null)}n.addEventListener("pointerdown",l,{passive:!0,capture:!0}),B(e,p);let m=ct(()=>wt(t))}function wt(e){var o,s;const t=new Set,n=r=>{var l;return e.shapes.includes((l=r.shape)==null?void 0:l.shapeEl)||e.pathEnds.includes(r)};function i(r){n(r[S].data.s)&&n(r[S].data.e)&&t.add(r)}return(o=e.shapesPaths)==null||o.forEach(i),(s=e.pathEndsPaths)==null||s.forEach(i),[...e.shapes,...t]}function Q(e){E(e,Kt),E(e,Nt)}const xe=(e,t,n,i,o)=>e.x<=i&&i<=e.x+t&&e.y<=o&&o<=e.y+n;class Ut extends HTMLElement{constructor(t,n){super(),this._pathElement=n,this._canvas=t}connectedCallback(){const t=this._pathElement[S].data.styles,n=o=>{var s;return(s=this._pathElement[S].data.styles)!=null&&s.includes(o)?'class="actv"':""},i=this.attachShadow({mode:"closed"});i.innerHTML=`
		<style>
			.ln { display: flex; }
			.ln > * {
				height: 24px;
				padding: 10px;
				fill-opacity: 0.3;
				stroke-opacity: 0.3;
			}
			[data-cmd] { cursor: pointer; }
			.actv { 
				fill-opacity: 1;
				stroke-opacity: 1;
			}
		</style>
		<ap-shape-edit id="edit" edit-btn="true">
			<div class="ln">
				<svg data-cmd data-cmd-arg="arw-s" ${n("arw-s")} viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" fill="rgb(52,71,103)"/></svg>
				<svg data-cmd data-cmd-arg="arw-e" ${n("arw-e")} viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="rgb(52,71,103)"/></svg>
				<svg data-cmd data-cmd-arg="dash" ${n("dash")} viewBox="0 0 24 24" width="24" height="24"><path d="M 2,11 L 20,11" stroke="rgb(52,71,103)" style="stroke-dasharray: 4,3; stroke-width: 3;"></path></svg>
			</div>
		</ap-shape-edit>`,y(i.getElementById("edit"),"cmd",o=>{switch(o.detail.cmd){case"style":rt(this._pathElement,this._pathElement[S].data,"cl-",o.detail.arg);break;case"del":this._pathElement[S].del();break;case"copy":G(this._canvas,[this._pathElement]);break}}),Y(i,"[data-cmd]",o=>{const s=V(o,"data-cmd-arg"),r=t.indexOf(s);r>-1?(E(this._pathElement,s),t.splice(r,1),E(o.currentTarget,"actv")):(b(this._pathElement,s),t.push(s),b(o.currentTarget,"actv"))})}}customElements.define("ap-path-settings",Ut);function qt(e,t){const n=R("g",`
		<path data-key="outer" d="M0 0" stroke="transparent" stroke-width="20" fill="none" />
		<path data-key="path" class="path" d="M0 0" stroke="#495057" stroke-width="1.8" fill="none" style="pointer-events: none;" />
		<path data-key="selected" d="M0 0" stroke="transparent" stroke-width="10" fill="none" style="pointer-events: none;" />
		<g data-key="start">
			<circle data-evt-index="1" class="path-end" r="10" stroke-width="0" fill="transparent" />
			<path class="path" d="M-7 7 l 7 -7 l -7 -7" stroke="#495057" stroke-width="1.8" fill="none" style="pointer-events: none;"></path>
		</g>
		<g data-key="end">
			<circle data-evt-index="1" class="path-end" r="10" stroke-width="0" fill="transparent" />
			<path class="path" d="M-7 7 l 7 -7 l -7 -7" stroke="#495057" stroke-width="1.8" fill="none" style="pointer-events: none;"></path>
		</g>`);b(n,"shpath"),t.s.el=C(n,"start"),t.e.el=C(n,"end"),t.styles=t.styles??["arw-e"];const i=Me(n,"path","outer","selected");function o(){if(!t.s.shape||!t.e.shape){const x=Ee(t.s.data.position,t.e.data.position);t.e.shape||(t.e.data.dir=x),t.s.shape||(t.s.data.dir=Ot(x))}const h=ke(t);i.forEach(x=>x.setAttribute("d",h)),bt(t.s),bt(t.e)}function s(h){var x;(x=Z(h.shape))==null||x.pathDel(n)}function r(h){h.shape&&(h.data=Z(h.shape).pathAdd(h.shape.connectorKey,n))}let l;function d(){u(),H(),s(t.s),s(t.e),n.remove()}let c=0,a;function p(h){if(c!==2){if(c===1){c=2,l=F(h.clientX-10,h.clientY-10,new Ut(e,n));return}c=1,b(n,"select"),J(t.s,2),J(t.e,2),B(e,u),a=ct(()=>[n])}}let m;function u(){c=0,E(n,"select"),J(t.s,1),J(t.e,1),l==null||l.del(),l=null,m&&(m(),m=null,n.style.pointerEvents="unset"),B(e,null),a&&(a(),a=null)}let f;const H=Ht(e.ownerSVGElement,n,e[g].data,{get x(){var h;return(h=t[f])==null?void 0:h.data.position.x},set x(h){f&&(t[f].data.position.x=h)},get y(){var h;return(h=t[f])==null?void 0:h.data.position.y},set y(h){f&&(t[f].data.position.y=h)}},h=>{var x;u(),f=t.e.el.contains(h.target)?"e":t.s.el.contains(h.target)?"s":null,f&&(t[f].shape&&(t[f].shape.shapeEl!==((x=t[f==="s"?"e":"s"].shape)==null?void 0:x.shapeEl)&&s(t[f]),t[f].shape=null,t[f].data={dir:t[f].data.dir,position:j(e[g].data,h.clientX,h.clientY)}),n.style.pointerEvents="none",m=Se(n.parentElement))},h=>{f?o():we(e[g].data,t,o,h)},h=>{if(!f)be(e[g].data,t,o);else{const x=_t(h),w=x==null?void 0:x.getAttribute("data-connect");w?(t[f].shape={shapeEl:x.parentElement,connectorKey:w},r(t[f])):K(t[f].data.position,e[g].data.cell),o()}u()},p,u);return n[S]={draw:o,pointerCapture:h=>t.e.el.dispatchEvent(new PointerEvent("pointerdown",h)),del:d,data:t},t.styles&&b(n,...t.styles),r(t.s),r(t.e),o(),n}function we(e,t,n,i){const o=s=>lt(s,e.scale,i);O(t.s,o),O(t.e,o),!t.s.shape&&!t.e.shape&&n()}function be(e,t,n){const i=o=>K(o,e.cell);O(t.s,i),O(t.e,i),(!t.s.shape||!t.e.shape)&&n()}function O(e,t){e.shape?(t(Z(e.shape).data.position),Z(e.shape).drawPosition()):t(e.data.position)}const Z=e=>e==null?void 0:e.shapeEl[k];function bt(e){e.el.style.transform=`translate(${e.data.position.x}px, ${e.data.position.y}px) rotate(${ve(e.data.dir)}deg)`}function J(e,t){e.el.firstElementChild.setAttribute("data-evt-index",t.toString())}const ve=e=>e==="right"?180:e==="left"?0:e==="bottom"?270:90,Ot=e=>e==="left"?"right":e==="right"?"left":e==="top"?"bottom":"top";function Ee(e,t){const n=Math.atan2(t.y-e.y,t.x-e.x);return U(n,-.8,.8)?"left":U(n,.8,2.4)?"top":U(n,2.4,3.2)||U(n,-3.2,-2.4)?"right":"bottom"}function ke(e){let t=Math.hypot(e.s.data.position.x-e.e.data.position.x,e.s.data.position.y-e.e.data.position.y)*.5;t=t>70?70:t<15?15:t;function n(o){return o.dir==="right"||o.dir==="left"?o.dir==="right"?o.position.x+t:o.position.x-t:o.position.x}function i(o){return o.dir==="right"||o.dir==="left"?o.position.y:o.dir==="bottom"?o.position.y+t:o.position.y-t}return`M ${e.s.data.position.x} ${e.s.data.position.y} C ${n(e.s.data)} ${i(e.s.data)}, ${n(e.e.data)} ${i(e.e.data)}, ${e.e.data.position.x} ${e.e.data.position.y}`}function Se(e){let t=null;function n(i){const o=_t(i);if(t!==o){ft(o,"hovertrack")&&b(o,"hover");let s=!1;ft(o==null?void 0:o.parentElement,"hovertrack")&&(b(o.parentElement,"hover"),s=!0),E(t,"hover"),((t==null?void 0:t.parentElement)!==(o==null?void 0:o.parentElement)||!s)&&E(t==null?void 0:t.parentElement,"hover"),t=o}}return y(e,"pointermove",n),function(){v(e,"pointermove",n),E(t,"hover"),E(t==null?void 0:t.parentElement,"hover"),t=null}}const Me=(e,...t)=>t.map(n=>C(e,n)),U=(e,t,n)=>t<=e&&e<=n;function Zt(e,t,n){var o,s;const i=$e(n||"",((s=(o=e.x)==null?void 0:o.baseVal[0])==null?void 0:s.value)??0);e.innerHTML=i.s,e.y.baseVal[0].newValueSpecifiedUnits(e.y.baseVal[0].SVG_LENGTHTYPE_EMS,i.c>0?t-i.c/2:t)}function $e(e,t){let n=0;return{s:e.split(`
`).map((i,o)=>(n=o,`<tspan x="${t}" dy="${o===0?.41:1}em" ${i.length===0?'visibility="hidden"':""}>${i.length===0?".":He(i).replaceAll(" ","&nbsp;")}</tspan>`)).join(""),c:n}}function He(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ze(e,t,n,i,o){let s=R("foreignObject");const r=document.createElement("textarea"),l=()=>Ce(e,s,r,c,d.textAlign);r.value=n||"",r.oninput=function(){Zt(e,t,r.value),i(r.value),l()},r.onblur=function(){o(r.value)},r.onpointerdown=function(a){a.stopImmediatePropagation()},s.appendChild(r),e.parentElement.appendChild(s);const d=getComputedStyle(r),c=parseInt(d.paddingLeft)+parseInt(d.borderWidth);return l(),r.focus(),{dispose:()=>{s.remove(),s=null},draw:l}}function Ce(e,t,n,i,o){const s=e.getBBox(),r=s.width+20;t.width.baseVal.value=r+2*i+2,t.x.baseVal.value=s.x-i-(o==="center"?10:o==="right"?20:0),t.height.baseVal.value=s.height+2*i+3,t.y.baseVal.value=s.y-i,n.style.width=`${r}px`,n.style.height=`${s.height}px`}function Ft(e,t,n,i){const o=new Gt;return y(o,"cmd",s=>{switch(s.detail.cmd){case"style":rt(t,t[k].data,"cl-",s.detail.arg);break;case"del":t[k].del();break;case"copy":G(e,[t]);break}}),F(n,i,o)}class Gt extends HTMLElement{connectedCallback(){const t=this.attachShadow({mode:"closed"});t.innerHTML=`<style>
			.ln { display: flex; }
			.ln > * {
				height: 24px;
				padding: 10px;
				cursor: pointer;
			}
			#prop { padding-bottom: 10px; }

			.crcl { width: 25px; height: 25px; border-radius: 50%; }
		</style>
		<div id="pnl">
			<div id="clr" style="display: none;">
				<div class="ln">
					<div data-cmd="style" data-cmd-arg="cl-red">
						<div class="crcl" style="background: #E74C3C"></div>
					</div>
					<div data-cmd="style" data-cmd-arg="cl-orange">
						<div class="crcl" style="background: #ff6600"></div>
					</div>
					<div data-cmd="style" data-cmd-arg="cl-green">
						<div class="crcl" style="background: #19bc9b"></div>
					</div>
				</div>
				<div class="ln">
					<div data-cmd="style" data-cmd-arg="cl-blue">
						<div class="crcl" style="background: #1aaee5"></div>
					</div>
					<div data-cmd="style" data-cmd-arg="cl-dblue">
						<div class="crcl" style="background: #1D809F"></div>
					</div>
					<div data-cmd="style" data-cmd-arg="cl-dgray">
						<div class="crcl" style="background: #495057"></div>
					</div>
				</div>
			</div>
			<div id="prop" style="display: none;"><slot id="slot"></slot></div>
		</div>
		<div class="ln">
			<svg data-toggle="clr" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M19.228 18.732l1.768-1.768 1.767 1.768a2.5 2.5 0 1 1-3.535 0zM8.878 1.08l11.314 11.313a1 1 0 0 1 0 1.415l-8.485 8.485a1 1 0 0 1-1.414 0l-8.485-8.485a1 1 0 0 1 0-1.415l7.778-7.778-2.122-2.121L8.88 1.08zM11 6.03L3.929 13.1 11 20.173l7.071-7.071L11 6.029z" fill="rgb(52,71,103)"/></svg>
			<svg data-toggle="prop"  ${this.getAttribute("edit-btn")?"":'style="display: none;"'} viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z" fill="rgb(52,71,103)"/></svg>
			${Lt}
			${It}
		</div>`;{let i=function(s){ce(window.scrollY+s*n.getBoundingClientRect().height)};const n=t.getElementById("pnl");let o;Y(t,"[data-toggle]",s=>{o&&(i(1),vt(o,!1));const r=t.getElementById(V(s,"data-toggle"));o!==r?(vt(r,!0),i(-1),o=r):o=null})}Y(t,"[data-cmd]",n=>{this.dispatchEvent(new CustomEvent("cmd",{detail:{cmd:V(n,"data-cmd"),arg:V(n,"data-cmd-arg")}}))})}}customElements.define("ap-shape-edit",Gt);function vt(e,t){e.style.display=t?"unset":"none"}function pt(e,t,n,i,o,s){const r=R("g",`${n}
		${Object.entries(i).map(c=>`<circle data-key="${c[0]}" data-connect="${c[1].dir}"	class="hovertrack" data-evt-index="2" r="10" cx="0" cy="0" style="transform: translate(${c[1].position.x}px, ${c[1].position.y}px);" />`).join()}`),l={el:C(r,"text"),vMid:0};Zt(l.el,l.vMid,t.title);const d=_e(e,r,t,i,l,s,()=>o(l.el));return{el:r,cons:i,draw:d.draw}}function _e(e,t,n,i,o,s,r){let l,d;function c(){l==null||l.dispose(),l=null,d==null||d.del(),d=null}function a(u){n.title=u,r()}const p=s??Ft,m=Te(e,t,n,i,()=>{l=ze(o.el,o.vMid,n.title,a,a);const u=t.getBoundingClientRect();d=p(e,t,u.left+10,u.top+10)},c);return n.styles&&b(t,...n.styles),t[k].del=function(){m.del(),t.remove()},{draw:()=>{if(m.drawPosition(),d){const u=t.getBoundingClientRect();d.position(u.left+10,u.top+10)}l&&l.draw()}}}function Te(e,t,n,i,o,s){b(t,"hovertrack");const r=$t(i),l=new Set;function d(){t.style.transform=`translate(${n.position.x}px, ${n.position.y}px)`;for(const u in i)r[u].position={x:i[u].position.x+n.position.x,y:i[u].position.y+n.position.y};for(const u of l)u[S].draw()}let c=0,a;function p(){s(),c=0,E(t,"select"),E(t,"highlight"),B(e,null),a&&(a(),a=null)}const m=Ht(e.ownerSVGElement,t,e[g].data,n.position,u=>{p();const f=u.target.getAttribute("data-connect");if(f){m();const H=qt(e,{s:{shape:{shapeEl:t,connectorKey:f}},e:{data:{dir:Ot(r[f].dir),position:j(e[g].data,u.clientX,u.clientY)}}});t.parentNode.append(H),H[S].pointerCapture(u),l.add(H)}},d,u=>{K(n.position,e[g].data.cell),d()},u=>{if(c!==2){if(c===1){c=2,E(t,"select"),b(t,"highlight"),o();return}c=1,b(t,"select"),B(e,p),a=ct(()=>[t])}},p);return t[k]={pathAdd:function(u,f){return l.add(f),r[u]},pathDel:function(u){l.delete(u)},drawPosition:d,data:n},{drawPosition:d,del:()=>{p(),m();for(const u of l)u[S].del()}}}function Ie(e,t){const i=pt(e,t,`
		<circle data-key="outer" data-evt-no data-evt-index="2" r="72" fill="transparent" stroke-width="0" />
		<circle data-key="main" r="48" fill="#ff6600" stroke="#fff" stroke-width="1" />
		<text data-key="text" x="0" y="0" text-anchor="middle" style="pointer-events: none;" fill="#fff">&nbsp;</text>`,{right:{dir:"right",position:{x:48,y:0}},left:{dir:"left",position:{x:-48,y:0}},bottom:{dir:"bottom",position:{x:0,y:48}},top:{dir:"top",position:{x:0,y:-48}}},s=>{const r=Le(s,48,24);r!==t.r&&(t.r=r,o())});function o(){i.cons.right.position.x=t.r,i.cons.left.position.x=-t.r,i.cons.bottom.position.y=t.r,i.cons.top.position.y=-t.r;for(const s in i.cons)X(C(i.el,s),i.cons[s].position);Et(i.el,"outer",t.r+24),Et(i.el,"main",t.r),i.draw()}return t.r&&t.r!==48?o():i.draw(),i.el}function Et(e,t,n){C(e,t).r.baseVal.value=n}function Le(e,t,n){const i=Mt(e);return q(t,n,Math.sqrt(i.x**2+i.y**2))}const Ae=(e,t,n,i)=>F(n,i,new Qt(e,t));class Qt extends HTMLElement{constructor(t,n){super(),this._rectElement=n,this._canvas=t}connectedCallback(){const t=this.attachShadow({mode:"closed"});t.innerHTML=`
		<style>
			.ln { display: flex; }
			.ln > * {
				height: 24px;
				padding: 10px;
				fill-opacity: 0.3;
				stroke-opacity: 0.3;
			}
			[data-cmd] { cursor: pointer; }

			.ta-1 [data-cmd-arg="1"],
			.ta-2 [data-cmd-arg="2"],
			.ta-3 [data-cmd-arg="3"]
			{ fill-opacity: 1; stroke-opacity: 1; }
		</style>
		<ap-shape-edit id="edit" edit-btn="true">
			<div class="ln">
				<svg data-cmd data-cmd-arg="1" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm0 15h14v2H3v-2zm0-5h18v2H3v-2zm0-5h14v2H3V9z" fill="rgb(52,71,103)"/></svg>
				<svg data-cmd data-cmd-arg="2" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm2 15h14v2H5v-2zm-2-5h18v2H3v-2zm2-5h14v2H5V9z" fill="rgb(52,71,103)"/></svg>
				<svg data-cmd data-cmd-arg="3" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm4 15h14v2H7v-2zm-4-5h18v2H3v-2zm4-5h14v2H7V9z" fill="rgb(52,71,103)"/></svg>
			</div>
		</ap-shape-edit>`;const n=this._rectElement[k].data,i=t.getElementById("edit");b(i,`ta-${n.a}`),y(i,"cmd",o=>{switch(o.detail.cmd){case"style":rt(this._rectElement,n,"cl-",o.detail.arg);break;case"del":this._rectElement[k].del();break;case"copy":G(this._canvas,[this._rectElement]);break}}),Y(t,"[data-cmd]",o=>{const s=Number.parseInt(V(o,"data-cmd-arg"));if(s===n.a)return;const r=n.a;n.a=s,this._rectElement[k].draw(),E(i,`ta-${r}`),b(i,`ta-${n.a}`)})}}customElements.define("ap-rect-txt-settings",Qt);function kt(e,t){t.w=t.w??96,t.h=t.h??48,t.a=t.a??(t.t?1:2);const n=`
		<rect data-key="outer" data-evt-no data-evt-index="2" width="144" height="96" x="-72" y="-48" fill="transparent" stroke="transparent" stroke-width="0" />
		<rect data-key="main" width="96" height="48" x="-48" y="-24" rx="15" ry="15" fill="#1aaee5" stroke="#fff" stroke-width="1" />
		<text data-key="text" y="0" x="${Pe(t)}" style="pointer-events: none;" fill="#fff">&nbsp;</text>`,i=pt(e,t,n,{right:{dir:"right",position:{x:48,y:0}},left:{dir:"left",position:{x:-48,y:0}},bottom:{dir:"bottom",position:{x:0,y:24}},top:{dir:"top",position:{x:0,y:-24}}},l=>{const d=l.getBBox(),c=q(96,48,d.width+(t.t?6:0)),a=q(48,48,d.height);(t.w!==c||t.h!==a)&&(t.w=c,t.h=a,r())},t.t?Ae:Ft);b(i.el,t.t?"shtxt":"shrect");let o=t.w,s=t.a;function r(l){const d=t.w/-2,c=t.h/-2,a=0;i.cons.right.position.x=-d,i.cons.left.position.x=d,i.cons.bottom.position.y=-c,i.cons.bottom.position.x=a,i.cons.top.position.y=c,i.cons.top.position.x=a;for(const p in i.cons)X(C(i.el,p),i.cons[p].position);if(St(i.el,"main",t.w,t.h,d,c),St(i.el,"outer",t.w+48,t.h+48,d-24,c-24),l||s!==t.a||o!==t.w){let p,m;switch(t.a){case 1:p=d+8,m=(t.w-o)/2;break;case 2:p=0,m=0;break;case 3:p=-d-8,m=(t.w-o)/-2;break}const u=C(i.el,"text");u.x.baseVal[0].value=p,u.querySelectorAll("tspan").forEach(f=>{f.x.baseVal[0].value=p}),t.position.x+=m,E(i.el,`ta-${s}`),b(i.el,`ta-${t.a}`),s=t.a,o=t.w}i.draw()}return b(i.el,`ta-${t.a}`),t.w!==96||t.h!==48?r(!0):i.draw(),i.el[k].draw=r,i.el}function St(e,t,n,i,o,s){const r=C(e,t);r.width.baseVal.value=n,r.height.baseVal.value=i,r.x.baseVal.value=o,r.y.baseVal.value=s}const Pe=e=>e.a===1?-40:e.a===2?0:40;function Ve(e,t){const i=pt(e,t,`
		<path data-key="outer" data-evt-no data-evt-index="2" d="M-72 0 L0 -72 L72 0 L0 72 Z" stroke-width="0" fill="transparent" />
		<path data-key="border" d="M-39 0 L0 -39 L39 0 L0 39 Z" stroke-width="20" stroke="#fff"	fill="transparent" stroke-linejoin="round" />
		<path data-key="main" d="M-39 0 L0 -39 L39 0 L0 39 Z" stroke-width="18" stroke-linejoin="round"	stroke="#1D809F" fill="#1D809F" />
		<text data-key="text" x="0" y="0" text-anchor="middle" style="pointer-events: none;" fill="#fff">&nbsp;</text>`,{right:{dir:"right",position:{x:48,y:0}},left:{dir:"left",position:{x:-48,y:0}},bottom:{dir:"bottom",position:{x:0,y:48}},top:{dir:"top",position:{x:0,y:-48}}},s=>{const r=q(96,48,Be(s)-20);r!==t.w&&(t.w=r,o())});b(i.el,"shrhomb");function o(){const s=tt(t.w,0);i.cons.right.position.x=s.r.x,i.cons.left.position.x=s.l.x,i.cons.bottom.position.y=s.b.y,i.cons.top.position.y=s.t.y;for(const l in i.cons)X(C(i.el,l),i.cons[l].position);const r=tt(t.w,9);D(i.el,"main",r),D(i.el,"border",r),D(i.el,"outer",tt(t.w,-24)),i.draw()}return t.w&&t.w!==96?o():i.draw(),i.el}function D(e,t,n){C(e,t).setAttribute("d",`M${n.l.x} ${n.l.y} L${n.t.x} ${n.t.y} L${n.r.x} ${n.r.y} L${n.b.x} ${n.b.y} Z`)}function tt(e,t){const n=e/2,i=t-n,o=n-t;return{l:{x:i,y:0},t:{x:0,y:i},r:{x:o,y:0},b:{x:0,y:o}}}function Be(e){const t=Mt(e);return 2*(Math.abs(t.x)+Math.abs(t.y))}function Xe(e){return{0:{create:t=>qt(e,t)},1:{create:t=>Ie(e,t)},2:{create:t=>kt(e,t)},3:{create:t=>(t.t=!0,kt(e,t))},4:{create:t=>Ve(e,t)}}}function Ye(e,t){async function n(){console.log(t);let i={Description:`Block Diagram for project ${et()}`,upload_diagram:JSON.parse(t),User_Id:te(),Project_ID:et(),stud_id:ee(),Sec_ID:ne()};const o=await Dt();o.data.length!==0?await nt.post(`${it.BlockDiagram.UPDATE}${o.data[0].DID}/`,i):await nt.post(`${it.BlockDiagram.CREATE}`,i)}n()}class Re extends HTMLElement{connectedCallback(){const t=this.attachShadow({mode:"closed"});t.innerHTML=`
			<style>
			.menu {
				position: fixed;
				top: 15px;
				left: 15px;
				cursor: pointer;
			}
			#options {
				position: fixed;
				padding: 15px;
				top: 0px;
				left: 0px;
				z-index: 1;
			}
      .ant-btn-primary {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 2px;
  height: 32px;
  user-select: none;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}

.ant-btn-primary:hover,
.ant-btn-primary:focus {
  color: #fff;
  background-color: #40a9ff;
  border-color: #40a9ff;
}

.ant-btn-primary:active {
  color: #fff;
  background-color: #096dd9;
  border-color: #096dd9;
}

.ant-btn-default {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  cursor: pointer;
  background-image: none;
  border: 1px solid #d9d9d9;
  white-space: nowrap;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 2px;
  height: 32px;
  user-select: none;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
}

.ant-btn-default:hover,
.ant-btn-default:focus {
  color: #40a9ff;
  border-color: #40a9ff;
  background-color: #fff;
}

.ant-btn-default:active {
  color: #096dd9;
  border-color: #096dd9;
  background-color: #fff;
}

			#options div, #options a { 
				color: rgb(13, 110, 253); 
				cursor: pointer; margin: 10px 0;
				display: flex;
				align-items: center;
				line-height: 25px;
				text-decoration: none;
			}
			#options div svg, #options a svg { margin-right: 10px; }
			</style>
		<!--<svg id="menu" class="menu" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" fill="rgb(52,71,103)"/></svg> -->
			<div id="options" class="shadow" >
			 	<!--<div id="menu2" style="margin: 0 0 15px;"><svg viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" fill="rgb(52,71,103)"/></svg></div>-->
        <button id="save" class="ant-btn-primary">Save</button> 
        <button id="save" class="ant-btn-default" onclick="history.back()">Back</button>
		 	</div>
      `;function n(i,o){t.getElementById(i).onclick=s=>{xt(!0),o(),xt(!1)}}n("save",()=>{const i=fe(this._canvas);Ye(this._canvas,JSON.stringify(i))}),(()=>{const i=document.querySelector("#canvas");je(i)})()}init(t){this._canvas=t}}customElements.define("ap-menu",Re);async function je(e){let t=null,n=await Dt();n.data.length!==0&&(t=n.data[0].upload_diagram,Xt(e,t)&&dt(!1))}async function Dt(){try{return await nt.get(`${it.BlockDiagram.GET}${et()}/`)}catch(e){console.log(e)}}class Ke extends HTMLElement{connectedCallback(){const t=this.attachShadow({mode:"closed"});t.innerHTML=`<style>
			.menu {
				overflow-x: auto;
				padding: 0;
				position: absolute;
				top: 50%;
				left: 5px;
				transform: translateY(-50%);
				box-shadow: 0px 0px 58px 2px rgba(34, 60, 80, 0.2);
				border-radius: 16px;
				background-color: rgba(255,255,255, .9);
			}

			.content {
				white-space: nowrap;
				display: flex;
				flex-direction: column;
			}
			
			[data-cmd] {
				cursor: pointer;
			}

			.menu svg { padding: 10px; }
			.stroke {
				stroke: #344767;
				stroke-width: 2px;
				fill: transparent;
			}
		
			.menu .big {
				width: 62px;
				min-width: 62px;
			}

			@media only screen and (max-width: 700px) {
				.menu {
					width: 100%;
					border-radius: 0;
					bottom: 0;
					display: flex;
  					flex-direction: column;
					top: unset;
					left: unset;
					transform: unset;
				}

				.content {
					align-self: center;
					flex-direction: row;
				}
			}
			</style>
			<div id="menu" class="menu" style="touch-action: none;">
				<div class="content">
					<svg class="stroke" data-cmd="shapeAdd" data-cmd-arg="1" viewBox="0 0 24 24" width="24" height="24"><circle r="9" cx="12" cy="12"></circle></svg>
					<svg class="stroke" data-cmd="shapeAdd" data-cmd-arg="4" viewBox="0 0 24 24" width="24" height="24"><path d="M2 12 L12 2 L22 12 L12 22 Z" stroke-linejoin="round"></path></svg>
					<svg class="stroke" data-cmd="shapeAdd" data-cmd-arg="2" viewBox="0 0 24 24" width="24" height="24"><rect x="2" y="4" width="20" height="16" rx="3" ry="3"></rect></svg>
					<svg data-cmd="shapeAdd" data-cmd-arg="0" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13 8v8a3 3 0 0 1-3 3H7.83a3.001 3.001 0 1 1 0-2H10a1 1 0 0 0 1-1V8a3 3 0 0 1 3-3h3V2l5 4-5 4V7h-3a1 1 0 0 0-1 1z" fill="rgba(52,71,103,1)"/></svg>
					<svg data-cmd="shapeAdd" data-cmd-arg="3" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13 6v15h-2V6H5V4h14v2z" fill="rgba(52,71,103,1)"/></svg>

				</div>
			</div>`;const n=t.getElementById("menu");n.querySelectorAll('[data-cmd="shapeAdd"]').forEach(i=>y(i,"pointerdown",this)),y(n,"pointerleave",this),y(n,"pointerup",this),y(n,"pointermove",this)}init(t){this._canvas=t}handleEvent(t){switch(t.type){case"pointermove":if(!this._isNativePointerleaveTriggered){const n=document.elementFromPoint(t.clientX,t.clientY);if(n===this._pointElem)return;this._parentElem===this._pointElem&&this._canvas.ownerSVGElement.setPointerCapture(t.pointerId),this._pointElem=n}break;case"pointerleave":this._isNativePointerleaveTriggered=!0,this._pressedShapeTemplKey!=null&&this._shapeCreate(t),this._clean();break;case"pointerdown":this._pressedShapeTemplKey=parseInt(t.currentTarget.getAttribute("data-cmd-arg")),this._parentElem=document.elementFromPoint(t.clientX,t.clientY),this._pointElem=this._parentElem,this._isNativePointerleaveTriggered=null;break;case"pointerup":this._clean();break}}_shapeCreate(t){dt(!1);const n=j(this._canvas[g].data,t.clientX,t.clientY),i=this._pressedShapeTemplKey===0?{s:{data:{dir:"right",position:{x:n.x-24,y:n.y}}},e:{data:{dir:"right",position:{x:n.x+24,y:n.y}}}}:{type:this._pressedShapeTemplKey,position:{x:n.x,y:n.y},title:"Title"},o=this._canvas[g].shapeMap[this._pressedShapeTemplKey].create(i);this._canvas.append(o),o.dispatchEvent(new PointerEvent("pointerdown",t))}_clean(){this._pressedShapeTemplKey=null,this._parentElem=null,this._pointElem=null}}customElements.define("ap-menu-shape",Ke);const Ne=()=>{const e=ht.useRef(null);return ht.useEffect(()=>{const t=e.current;t[g]={data:{position:{x:0,y:0},scale:1,cell:24},shapeMap:Xe(t)},oe(t.ownerSVGElement),ae(t.ownerSVGElement),me(t),ye(t),se(t),document.getElementById("menu").init(t),document.getElementById("menu-shape").init(t)},[]),I.jsxs("div",{children:[I.jsx("ap-menu",{id:"menu"}),I.jsx("ap-menu-shape",{id:"menu-shape"}),I.jsx("div",{id:"tip",style:{position:"fixed",left:"50%",top:"30%",transform:"translate(-50%, -30%)",minWidth:"290px"}}),I.jsx("svg",{id:"diagram",tabIndex:"0",style:{touchAction:"none",backgroundColor:"#fff",display:"block",userSelect:"none",WebkitUserSelect:"none",WebkitTouchCallout:"none",pointerEvents:"none"},children:I.jsx("g",{ref:e,id:"canvas"})})]})},We=Ne;function Ue(){return I.jsx("div",{children:I.jsx(We,{})})}export{Ue as default};
