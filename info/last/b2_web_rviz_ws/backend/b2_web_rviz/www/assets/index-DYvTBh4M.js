(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var Xg={exports:{}},Uc={},jg={exports:{}},gt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fa=Symbol.for("react.element"),Kv=Symbol.for("react.portal"),Zv=Symbol.for("react.fragment"),Jv=Symbol.for("react.strict_mode"),Qv=Symbol.for("react.profiler"),ey=Symbol.for("react.provider"),ty=Symbol.for("react.context"),ny=Symbol.for("react.forward_ref"),iy=Symbol.for("react.suspense"),ry=Symbol.for("react.memo"),sy=Symbol.for("react.lazy"),Fh=Symbol.iterator;function oy(t){return t===null||typeof t!="object"?null:(t=Fh&&t[Fh]||t["@@iterator"],typeof t=="function"?t:null)}var qg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Yg=Object.assign,$g={};function So(t,e,n){this.props=t,this.context=e,this.refs=$g,this.updater=n||qg}So.prototype.isReactComponent={};So.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};So.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Kg(){}Kg.prototype=So.prototype;function wd(t,e,n){this.props=t,this.context=e,this.refs=$g,this.updater=n||qg}var Td=wd.prototype=new Kg;Td.constructor=wd;Yg(Td,So.prototype);Td.isPureReactComponent=!0;var Oh=Array.isArray,Zg=Object.prototype.hasOwnProperty,Ad={current:null},Jg={key:!0,ref:!0,__self:!0,__source:!0};function Qg(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)Zg.call(e,i)&&!Jg.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:Fa,type:t,key:s,ref:o,props:r,_owner:Ad.current}}function ay(t,e){return{$$typeof:Fa,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function bd(t){return typeof t=="object"&&t!==null&&t.$$typeof===Fa}function ly(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var kh=/\/+/g;function uu(t,e){return typeof t=="object"&&t!==null&&t.key!=null?ly(""+t.key):e.toString(36)}function Hl(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Fa:case Kv:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+uu(o,0):i,Oh(r)?(n="",t!=null&&(n=t.replace(kh,"$&/")+"/"),Hl(r,e,n,"",function(c){return c})):r!=null&&(bd(r)&&(r=ay(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(kh,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Oh(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+uu(s,a);o+=Hl(s,e,n,l,r)}else if(l=oy(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+uu(s,a++),o+=Hl(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function qa(t,e,n){if(t==null)return t;var i=[],r=0;return Hl(t,i,"","",function(s){return e.call(n,s,r++)}),i}function cy(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Ln={current:null},Vl={transition:null},uy={ReactCurrentDispatcher:Ln,ReactCurrentBatchConfig:Vl,ReactCurrentOwner:Ad};function e_(){throw Error("act(...) is not supported in production builds of React.")}gt.Children={map:qa,forEach:function(t,e,n){qa(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return qa(t,function(){e++}),e},toArray:function(t){return qa(t,function(e){return e})||[]},only:function(t){if(!bd(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};gt.Component=So;gt.Fragment=Zv;gt.Profiler=Qv;gt.PureComponent=wd;gt.StrictMode=Jv;gt.Suspense=iy;gt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=uy;gt.act=e_;gt.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=Yg({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Ad.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)Zg.call(e,l)&&!Jg.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:Fa,type:t.type,key:r,ref:s,props:i,_owner:o}};gt.createContext=function(t){return t={$$typeof:ty,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:ey,_context:t},t.Consumer=t};gt.createElement=Qg;gt.createFactory=function(t){var e=Qg.bind(null,t);return e.type=t,e};gt.createRef=function(){return{current:null}};gt.forwardRef=function(t){return{$$typeof:ny,render:t}};gt.isValidElement=bd;gt.lazy=function(t){return{$$typeof:sy,_payload:{_status:-1,_result:t},_init:cy}};gt.memo=function(t,e){return{$$typeof:ry,type:t,compare:e===void 0?null:e}};gt.startTransition=function(t){var e=Vl.transition;Vl.transition={};try{t()}finally{Vl.transition=e}};gt.unstable_act=e_;gt.useCallback=function(t,e){return Ln.current.useCallback(t,e)};gt.useContext=function(t){return Ln.current.useContext(t)};gt.useDebugValue=function(){};gt.useDeferredValue=function(t){return Ln.current.useDeferredValue(t)};gt.useEffect=function(t,e){return Ln.current.useEffect(t,e)};gt.useId=function(){return Ln.current.useId()};gt.useImperativeHandle=function(t,e,n){return Ln.current.useImperativeHandle(t,e,n)};gt.useInsertionEffect=function(t,e){return Ln.current.useInsertionEffect(t,e)};gt.useLayoutEffect=function(t,e){return Ln.current.useLayoutEffect(t,e)};gt.useMemo=function(t,e){return Ln.current.useMemo(t,e)};gt.useReducer=function(t,e,n){return Ln.current.useReducer(t,e,n)};gt.useRef=function(t){return Ln.current.useRef(t)};gt.useState=function(t){return Ln.current.useState(t)};gt.useSyncExternalStore=function(t,e,n){return Ln.current.useSyncExternalStore(t,e,n)};gt.useTransition=function(){return Ln.current.useTransition()};gt.version="18.3.1";jg.exports=gt;var rt=jg.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fy=rt,dy=Symbol.for("react.element"),hy=Symbol.for("react.fragment"),py=Object.prototype.hasOwnProperty,my=fy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,gy={key:!0,ref:!0,__self:!0,__source:!0};function t_(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)py.call(e,i)&&!gy.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:dy,type:t,key:s,ref:o,props:r,_owner:my.current}}Uc.Fragment=hy;Uc.jsx=t_;Uc.jsxs=t_;Xg.exports=Uc;var Le=Xg.exports,n_={exports:{}},jn={},i_={exports:{}},r_={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(O,G){var j=O.length;O.push(G);e:for(;0<j;){var re=j-1>>>1,oe=O[re];if(0<r(oe,G))O[re]=G,O[j]=oe,j=re;else break e}}function n(O){return O.length===0?null:O[0]}function i(O){if(O.length===0)return null;var G=O[0],j=O.pop();if(j!==G){O[0]=j;e:for(var re=0,oe=O.length,W=oe>>>1;re<W;){var $=2*(re+1)-1,le=O[$],ae=$+1,fe=O[ae];if(0>r(le,j))ae<oe&&0>r(fe,le)?(O[re]=fe,O[ae]=j,re=ae):(O[re]=le,O[$]=j,re=$);else if(ae<oe&&0>r(fe,j))O[re]=fe,O[ae]=j,re=ae;else break e}}return G}function r(O,G){var j=O.sortIndex-G.sortIndex;return j!==0?j:O.id-G.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],u=1,h=null,d=3,p=!1,v=!1,y=!1,m=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(O){for(var G=n(c);G!==null;){if(G.callback===null)i(c);else if(G.startTime<=O)i(c),G.sortIndex=G.expirationTime,e(l,G);else break;G=n(c)}}function E(O){if(y=!1,g(O),!v)if(n(l)!==null)v=!0,z(P);else{var G=n(c);G!==null&&ne(E,G.startTime-O)}}function P(O,G){v=!1,y&&(y=!1,f(U),U=-1),p=!0;var j=d;try{for(g(G),h=n(l);h!==null&&(!(h.expirationTime>G)||O&&!H());){var re=h.callback;if(typeof re=="function"){h.callback=null,d=h.priorityLevel;var oe=re(h.expirationTime<=G);G=t.unstable_now(),typeof oe=="function"?h.callback=oe:h===n(l)&&i(l),g(G)}else i(l);h=n(l)}if(h!==null)var W=!0;else{var $=n(c);$!==null&&ne(E,$.startTime-G),W=!1}return W}finally{h=null,d=j,p=!1}}var C=!1,b=null,U=-1,M=5,T=-1;function H(){return!(t.unstable_now()-T<M)}function V(){if(b!==null){var O=t.unstable_now();T=O;var G=!0;try{G=b(!0,O)}finally{G?ie():(C=!1,b=null)}}else C=!1}var ie;if(typeof _=="function")ie=function(){_(V)};else if(typeof MessageChannel<"u"){var k=new MessageChannel,X=k.port2;k.port1.onmessage=V,ie=function(){X.postMessage(null)}}else ie=function(){m(V,0)};function z(O){b=O,C||(C=!0,ie())}function ne(O,G){U=m(function(){O(t.unstable_now())},G)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(O){O.callback=null},t.unstable_continueExecution=function(){v||p||(v=!0,z(P))},t.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<O?Math.floor(1e3/O):5},t.unstable_getCurrentPriorityLevel=function(){return d},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(O){switch(d){case 1:case 2:case 3:var G=3;break;default:G=d}var j=d;d=G;try{return O()}finally{d=j}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(O,G){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var j=d;d=O;try{return G()}finally{d=j}},t.unstable_scheduleCallback=function(O,G,j){var re=t.unstable_now();switch(typeof j=="object"&&j!==null?(j=j.delay,j=typeof j=="number"&&0<j?re+j:re):j=re,O){case 1:var oe=-1;break;case 2:oe=250;break;case 5:oe=1073741823;break;case 4:oe=1e4;break;default:oe=5e3}return oe=j+oe,O={id:u++,callback:G,priorityLevel:O,startTime:j,expirationTime:oe,sortIndex:-1},j>re?(O.sortIndex=j,e(c,O),n(l)===null&&O===n(c)&&(y?(f(U),U=-1):y=!0,ne(E,j-re))):(O.sortIndex=oe,e(l,O),v||p||(v=!0,z(P))),O},t.unstable_shouldYield=H,t.unstable_wrapCallback=function(O){var G=d;return function(){var j=d;d=G;try{return O.apply(this,arguments)}finally{d=j}}}})(r_);i_.exports=r_;var _y=i_.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var vy=rt,Xn=_y;function xe(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var s_=new Set,_a={};function ss(t,e){so(t,e),so(t+"Capture",e)}function so(t,e){for(_a[t]=e,t=0;t<e.length;t++)s_.add(e[t])}var qi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Sf=Object.prototype.hasOwnProperty,yy=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,zh={},Bh={};function xy(t){return Sf.call(Bh,t)?!0:Sf.call(zh,t)?!1:yy.test(t)?Bh[t]=!0:(zh[t]=!0,!1)}function Sy(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function My(t,e,n,i){if(e===null||typeof e>"u"||Sy(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Pn(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var fn={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){fn[t]=new Pn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];fn[e]=new Pn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){fn[t]=new Pn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){fn[t]=new Pn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){fn[t]=new Pn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){fn[t]=new Pn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){fn[t]=new Pn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){fn[t]=new Pn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){fn[t]=new Pn(t,5,!1,t.toLowerCase(),null,!1,!1)});var Rd=/[\-:]([a-z])/g;function Cd(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Rd,Cd);fn[e]=new Pn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Rd,Cd);fn[e]=new Pn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Rd,Cd);fn[e]=new Pn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){fn[t]=new Pn(t,1,!1,t.toLowerCase(),null,!1,!1)});fn.xlinkHref=new Pn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){fn[t]=new Pn(t,1,!1,t.toLowerCase(),null,!0,!0)});function Ld(t,e,n,i){var r=fn.hasOwnProperty(e)?fn[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(My(e,n,r,i)&&(n=null),i||r===null?xy(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Qi=vy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ya=Symbol.for("react.element"),Os=Symbol.for("react.portal"),ks=Symbol.for("react.fragment"),Pd=Symbol.for("react.strict_mode"),Mf=Symbol.for("react.profiler"),o_=Symbol.for("react.provider"),a_=Symbol.for("react.context"),Nd=Symbol.for("react.forward_ref"),Ef=Symbol.for("react.suspense"),wf=Symbol.for("react.suspense_list"),Dd=Symbol.for("react.memo"),lr=Symbol.for("react.lazy"),l_=Symbol.for("react.offscreen"),Hh=Symbol.iterator;function ko(t){return t===null||typeof t!="object"?null:(t=Hh&&t[Hh]||t["@@iterator"],typeof t=="function"?t:null)}var Gt=Object.assign,fu;function ea(t){if(fu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);fu=e&&e[1]||""}return`
`+fu+t}var du=!1;function hu(t,e){if(!t||du)return"";du=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{du=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?ea(t):""}function Ey(t){switch(t.tag){case 5:return ea(t.type);case 16:return ea("Lazy");case 13:return ea("Suspense");case 19:return ea("SuspenseList");case 0:case 2:case 15:return t=hu(t.type,!1),t;case 11:return t=hu(t.type.render,!1),t;case 1:return t=hu(t.type,!0),t;default:return""}}function Tf(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case ks:return"Fragment";case Os:return"Portal";case Mf:return"Profiler";case Pd:return"StrictMode";case Ef:return"Suspense";case wf:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case a_:return(t.displayName||"Context")+".Consumer";case o_:return(t._context.displayName||"Context")+".Provider";case Nd:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Dd:return e=t.displayName||null,e!==null?e:Tf(t.type)||"Memo";case lr:e=t._payload,t=t._init;try{return Tf(t(e))}catch{}}return null}function wy(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Tf(e);case 8:return e===Pd?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Ar(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function c_(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Ty(t){var e=c_(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function $a(t){t._valueTracker||(t._valueTracker=Ty(t))}function u_(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=c_(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function ec(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Af(t,e){var n=e.checked;return Gt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Vh(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=Ar(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function f_(t,e){e=e.checked,e!=null&&Ld(t,"checked",e,!1)}function bf(t,e){f_(t,e);var n=Ar(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Rf(t,e.type,n):e.hasOwnProperty("defaultValue")&&Rf(t,e.type,Ar(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Gh(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Rf(t,e,n){(e!=="number"||ec(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var ta=Array.isArray;function Zs(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+Ar(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Cf(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(xe(91));return Gt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Wh(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(xe(92));if(ta(n)){if(1<n.length)throw Error(xe(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Ar(n)}}function d_(t,e){var n=Ar(e.value),i=Ar(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function Xh(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function h_(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Lf(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?h_(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ka,p_=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Ka=Ka||document.createElement("div"),Ka.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ka.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function va(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var ra={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ay=["Webkit","ms","Moz","O"];Object.keys(ra).forEach(function(t){Ay.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),ra[e]=ra[t]})});function m_(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||ra.hasOwnProperty(t)&&ra[t]?(""+e).trim():e+"px"}function g_(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=m_(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var by=Gt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Pf(t,e){if(e){if(by[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(xe(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(xe(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(xe(61))}if(e.style!=null&&typeof e.style!="object")throw Error(xe(62))}}function Nf(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Df=null;function Id(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var If=null,Js=null,Qs=null;function jh(t){if(t=za(t)){if(typeof If!="function")throw Error(xe(280));var e=t.stateNode;e&&(e=Bc(e),If(t.stateNode,t.type,e))}}function __(t){Js?Qs?Qs.push(t):Qs=[t]:Js=t}function v_(){if(Js){var t=Js,e=Qs;if(Qs=Js=null,jh(t),e)for(t=0;t<e.length;t++)jh(e[t])}}function y_(t,e){return t(e)}function x_(){}var pu=!1;function S_(t,e,n){if(pu)return t(e,n);pu=!0;try{return y_(t,e,n)}finally{pu=!1,(Js!==null||Qs!==null)&&(x_(),v_())}}function ya(t,e){var n=t.stateNode;if(n===null)return null;var i=Bc(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(xe(231,e,typeof n));return n}var Uf=!1;if(qi)try{var zo={};Object.defineProperty(zo,"passive",{get:function(){Uf=!0}}),window.addEventListener("test",zo,zo),window.removeEventListener("test",zo,zo)}catch{Uf=!1}function Ry(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(u){this.onError(u)}}var sa=!1,tc=null,nc=!1,Ff=null,Cy={onError:function(t){sa=!0,tc=t}};function Ly(t,e,n,i,r,s,o,a,l){sa=!1,tc=null,Ry.apply(Cy,arguments)}function Py(t,e,n,i,r,s,o,a,l){if(Ly.apply(this,arguments),sa){if(sa){var c=tc;sa=!1,tc=null}else throw Error(xe(198));nc||(nc=!0,Ff=c)}}function os(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function M_(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function qh(t){if(os(t)!==t)throw Error(xe(188))}function Ny(t){var e=t.alternate;if(!e){if(e=os(t),e===null)throw Error(xe(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return qh(r),t;if(s===i)return qh(r),e;s=s.sibling}throw Error(xe(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(xe(189))}}if(n.alternate!==i)throw Error(xe(190))}if(n.tag!==3)throw Error(xe(188));return n.stateNode.current===n?t:e}function E_(t){return t=Ny(t),t!==null?w_(t):null}function w_(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=w_(t);if(e!==null)return e;t=t.sibling}return null}var T_=Xn.unstable_scheduleCallback,Yh=Xn.unstable_cancelCallback,Dy=Xn.unstable_shouldYield,Iy=Xn.unstable_requestPaint,jt=Xn.unstable_now,Uy=Xn.unstable_getCurrentPriorityLevel,Ud=Xn.unstable_ImmediatePriority,A_=Xn.unstable_UserBlockingPriority,ic=Xn.unstable_NormalPriority,Fy=Xn.unstable_LowPriority,b_=Xn.unstable_IdlePriority,Fc=null,wi=null;function Oy(t){if(wi&&typeof wi.onCommitFiberRoot=="function")try{wi.onCommitFiberRoot(Fc,t,void 0,(t.current.flags&128)===128)}catch{}}var hi=Math.clz32?Math.clz32:By,ky=Math.log,zy=Math.LN2;function By(t){return t>>>=0,t===0?32:31-(ky(t)/zy|0)|0}var Za=64,Ja=4194304;function na(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function rc(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=na(a):(s&=o,s!==0&&(i=na(s)))}else o=n&~r,o!==0?i=na(o):s!==0&&(i=na(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-hi(e),r=1<<n,i|=t[n],e&=~r;return i}function Hy(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Vy(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-hi(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=Hy(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function Of(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function R_(){var t=Za;return Za<<=1,!(Za&4194240)&&(Za=64),t}function mu(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Oa(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-hi(e),t[e]=n}function Gy(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-hi(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function Fd(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-hi(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var Tt=0;function C_(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var L_,Od,P_,N_,D_,kf=!1,Qa=[],mr=null,gr=null,_r=null,xa=new Map,Sa=new Map,ur=[],Wy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function $h(t,e){switch(t){case"focusin":case"focusout":mr=null;break;case"dragenter":case"dragleave":gr=null;break;case"mouseover":case"mouseout":_r=null;break;case"pointerover":case"pointerout":xa.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Sa.delete(e.pointerId)}}function Bo(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=za(e),e!==null&&Od(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function Xy(t,e,n,i,r){switch(e){case"focusin":return mr=Bo(mr,t,e,n,i,r),!0;case"dragenter":return gr=Bo(gr,t,e,n,i,r),!0;case"mouseover":return _r=Bo(_r,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return xa.set(s,Bo(xa.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Sa.set(s,Bo(Sa.get(s)||null,t,e,n,i,r)),!0}return!1}function I_(t){var e=Vr(t.target);if(e!==null){var n=os(e);if(n!==null){if(e=n.tag,e===13){if(e=M_(n),e!==null){t.blockedOn=e,D_(t.priority,function(){P_(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Gl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=zf(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Df=i,n.target.dispatchEvent(i),Df=null}else return e=za(n),e!==null&&Od(e),t.blockedOn=n,!1;e.shift()}return!0}function Kh(t,e,n){Gl(t)&&n.delete(e)}function jy(){kf=!1,mr!==null&&Gl(mr)&&(mr=null),gr!==null&&Gl(gr)&&(gr=null),_r!==null&&Gl(_r)&&(_r=null),xa.forEach(Kh),Sa.forEach(Kh)}function Ho(t,e){t.blockedOn===e&&(t.blockedOn=null,kf||(kf=!0,Xn.unstable_scheduleCallback(Xn.unstable_NormalPriority,jy)))}function Ma(t){function e(r){return Ho(r,t)}if(0<Qa.length){Ho(Qa[0],t);for(var n=1;n<Qa.length;n++){var i=Qa[n];i.blockedOn===t&&(i.blockedOn=null)}}for(mr!==null&&Ho(mr,t),gr!==null&&Ho(gr,t),_r!==null&&Ho(_r,t),xa.forEach(e),Sa.forEach(e),n=0;n<ur.length;n++)i=ur[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<ur.length&&(n=ur[0],n.blockedOn===null);)I_(n),n.blockedOn===null&&ur.shift()}var eo=Qi.ReactCurrentBatchConfig,sc=!0;function qy(t,e,n,i){var r=Tt,s=eo.transition;eo.transition=null;try{Tt=1,kd(t,e,n,i)}finally{Tt=r,eo.transition=s}}function Yy(t,e,n,i){var r=Tt,s=eo.transition;eo.transition=null;try{Tt=4,kd(t,e,n,i)}finally{Tt=r,eo.transition=s}}function kd(t,e,n,i){if(sc){var r=zf(t,e,n,i);if(r===null)Tu(t,e,i,oc,n),$h(t,i);else if(Xy(r,t,e,n,i))i.stopPropagation();else if($h(t,i),e&4&&-1<Wy.indexOf(t)){for(;r!==null;){var s=za(r);if(s!==null&&L_(s),s=zf(t,e,n,i),s===null&&Tu(t,e,i,oc,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Tu(t,e,i,null,n)}}var oc=null;function zf(t,e,n,i){if(oc=null,t=Id(i),t=Vr(t),t!==null)if(e=os(t),e===null)t=null;else if(n=e.tag,n===13){if(t=M_(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return oc=t,null}function U_(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Uy()){case Ud:return 1;case A_:return 4;case ic:case Fy:return 16;case b_:return 536870912;default:return 16}default:return 16}}var dr=null,zd=null,Wl=null;function F_(){if(Wl)return Wl;var t,e=zd,n=e.length,i,r="value"in dr?dr.value:dr.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return Wl=r.slice(t,1<i?1-i:void 0)}function Xl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function el(){return!0}function Zh(){return!1}function qn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?el:Zh,this.isPropagationStopped=Zh,this}return Gt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=el)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=el)},persist:function(){},isPersistent:el}),e}var Mo={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Bd=qn(Mo),ka=Gt({},Mo,{view:0,detail:0}),$y=qn(ka),gu,_u,Vo,Oc=Gt({},ka,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Hd,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Vo&&(Vo&&t.type==="mousemove"?(gu=t.screenX-Vo.screenX,_u=t.screenY-Vo.screenY):_u=gu=0,Vo=t),gu)},movementY:function(t){return"movementY"in t?t.movementY:_u}}),Jh=qn(Oc),Ky=Gt({},Oc,{dataTransfer:0}),Zy=qn(Ky),Jy=Gt({},ka,{relatedTarget:0}),vu=qn(Jy),Qy=Gt({},Mo,{animationName:0,elapsedTime:0,pseudoElement:0}),ex=qn(Qy),tx=Gt({},Mo,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),nx=qn(tx),ix=Gt({},Mo,{data:0}),Qh=qn(ix),rx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},sx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ox={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ax(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=ox[t])?!!e[t]:!1}function Hd(){return ax}var lx=Gt({},ka,{key:function(t){if(t.key){var e=rx[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Xl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?sx[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Hd,charCode:function(t){return t.type==="keypress"?Xl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Xl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),cx=qn(lx),ux=Gt({},Oc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ep=qn(ux),fx=Gt({},ka,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Hd}),dx=qn(fx),hx=Gt({},Mo,{propertyName:0,elapsedTime:0,pseudoElement:0}),px=qn(hx),mx=Gt({},Oc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),gx=qn(mx),_x=[9,13,27,32],Vd=qi&&"CompositionEvent"in window,oa=null;qi&&"documentMode"in document&&(oa=document.documentMode);var vx=qi&&"TextEvent"in window&&!oa,O_=qi&&(!Vd||oa&&8<oa&&11>=oa),tp=" ",np=!1;function k_(t,e){switch(t){case"keyup":return _x.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function z_(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var zs=!1;function yx(t,e){switch(t){case"compositionend":return z_(e);case"keypress":return e.which!==32?null:(np=!0,tp);case"textInput":return t=e.data,t===tp&&np?null:t;default:return null}}function xx(t,e){if(zs)return t==="compositionend"||!Vd&&k_(t,e)?(t=F_(),Wl=zd=dr=null,zs=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return O_&&e.locale!=="ko"?null:e.data;default:return null}}var Sx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ip(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Sx[t.type]:e==="textarea"}function B_(t,e,n,i){__(i),e=ac(e,"onChange"),0<e.length&&(n=new Bd("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var aa=null,Ea=null;function Mx(t){Z_(t,0)}function kc(t){var e=Vs(t);if(u_(e))return t}function Ex(t,e){if(t==="change")return e}var H_=!1;if(qi){var yu;if(qi){var xu="oninput"in document;if(!xu){var rp=document.createElement("div");rp.setAttribute("oninput","return;"),xu=typeof rp.oninput=="function"}yu=xu}else yu=!1;H_=yu&&(!document.documentMode||9<document.documentMode)}function sp(){aa&&(aa.detachEvent("onpropertychange",V_),Ea=aa=null)}function V_(t){if(t.propertyName==="value"&&kc(Ea)){var e=[];B_(e,Ea,t,Id(t)),S_(Mx,e)}}function wx(t,e,n){t==="focusin"?(sp(),aa=e,Ea=n,aa.attachEvent("onpropertychange",V_)):t==="focusout"&&sp()}function Tx(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return kc(Ea)}function Ax(t,e){if(t==="click")return kc(e)}function bx(t,e){if(t==="input"||t==="change")return kc(e)}function Rx(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var gi=typeof Object.is=="function"?Object.is:Rx;function wa(t,e){if(gi(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Sf.call(e,r)||!gi(t[r],e[r]))return!1}return!0}function op(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function ap(t,e){var n=op(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=op(n)}}function G_(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?G_(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function W_(){for(var t=window,e=ec();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=ec(t.document)}return e}function Gd(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function Cx(t){var e=W_(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&G_(n.ownerDocument.documentElement,n)){if(i!==null&&Gd(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=ap(n,s);var o=ap(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Lx=qi&&"documentMode"in document&&11>=document.documentMode,Bs=null,Bf=null,la=null,Hf=!1;function lp(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Hf||Bs==null||Bs!==ec(i)||(i=Bs,"selectionStart"in i&&Gd(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),la&&wa(la,i)||(la=i,i=ac(Bf,"onSelect"),0<i.length&&(e=new Bd("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Bs)))}function tl(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Hs={animationend:tl("Animation","AnimationEnd"),animationiteration:tl("Animation","AnimationIteration"),animationstart:tl("Animation","AnimationStart"),transitionend:tl("Transition","TransitionEnd")},Su={},X_={};qi&&(X_=document.createElement("div").style,"AnimationEvent"in window||(delete Hs.animationend.animation,delete Hs.animationiteration.animation,delete Hs.animationstart.animation),"TransitionEvent"in window||delete Hs.transitionend.transition);function zc(t){if(Su[t])return Su[t];if(!Hs[t])return t;var e=Hs[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in X_)return Su[t]=e[n];return t}var j_=zc("animationend"),q_=zc("animationiteration"),Y_=zc("animationstart"),$_=zc("transitionend"),K_=new Map,cp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Cr(t,e){K_.set(t,e),ss(e,[t])}for(var Mu=0;Mu<cp.length;Mu++){var Eu=cp[Mu],Px=Eu.toLowerCase(),Nx=Eu[0].toUpperCase()+Eu.slice(1);Cr(Px,"on"+Nx)}Cr(j_,"onAnimationEnd");Cr(q_,"onAnimationIteration");Cr(Y_,"onAnimationStart");Cr("dblclick","onDoubleClick");Cr("focusin","onFocus");Cr("focusout","onBlur");Cr($_,"onTransitionEnd");so("onMouseEnter",["mouseout","mouseover"]);so("onMouseLeave",["mouseout","mouseover"]);so("onPointerEnter",["pointerout","pointerover"]);so("onPointerLeave",["pointerout","pointerover"]);ss("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));ss("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));ss("onBeforeInput",["compositionend","keypress","textInput","paste"]);ss("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));ss("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));ss("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ia="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Dx=new Set("cancel close invalid load scroll toggle".split(" ").concat(ia));function up(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,Py(i,e,void 0,t),t.currentTarget=null}function Z_(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;up(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;up(r,a,c),s=l}}}if(nc)throw t=Ff,nc=!1,Ff=null,t}function Dt(t,e){var n=e[jf];n===void 0&&(n=e[jf]=new Set);var i=t+"__bubble";n.has(i)||(J_(e,t,2,!1),n.add(i))}function wu(t,e,n){var i=0;e&&(i|=4),J_(n,t,i,e)}var nl="_reactListening"+Math.random().toString(36).slice(2);function Ta(t){if(!t[nl]){t[nl]=!0,s_.forEach(function(n){n!=="selectionchange"&&(Dx.has(n)||wu(n,!1,t),wu(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[nl]||(e[nl]=!0,wu("selectionchange",!1,e))}}function J_(t,e,n,i){switch(U_(e)){case 1:var r=qy;break;case 4:r=Yy;break;default:r=kd}n=r.bind(null,e,n,t),r=void 0,!Uf||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Tu(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=Vr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}S_(function(){var c=s,u=Id(n),h=[];e:{var d=K_.get(t);if(d!==void 0){var p=Bd,v=t;switch(t){case"keypress":if(Xl(n)===0)break e;case"keydown":case"keyup":p=cx;break;case"focusin":v="focus",p=vu;break;case"focusout":v="blur",p=vu;break;case"beforeblur":case"afterblur":p=vu;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Jh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=Zy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=dx;break;case j_:case q_:case Y_:p=ex;break;case $_:p=px;break;case"scroll":p=$y;break;case"wheel":p=gx;break;case"copy":case"cut":case"paste":p=nx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=ep}var y=(e&4)!==0,m=!y&&t==="scroll",f=y?d!==null?d+"Capture":null:d;y=[];for(var _=c,g;_!==null;){g=_;var E=g.stateNode;if(g.tag===5&&E!==null&&(g=E,f!==null&&(E=ya(_,f),E!=null&&y.push(Aa(_,E,g)))),m)break;_=_.return}0<y.length&&(d=new p(d,v,null,n,u),h.push({event:d,listeners:y}))}}if(!(e&7)){e:{if(d=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",d&&n!==Df&&(v=n.relatedTarget||n.fromElement)&&(Vr(v)||v[Yi]))break e;if((p||d)&&(d=u.window===u?u:(d=u.ownerDocument)?d.defaultView||d.parentWindow:window,p?(v=n.relatedTarget||n.toElement,p=c,v=v?Vr(v):null,v!==null&&(m=os(v),v!==m||v.tag!==5&&v.tag!==6)&&(v=null)):(p=null,v=c),p!==v)){if(y=Jh,E="onMouseLeave",f="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(y=ep,E="onPointerLeave",f="onPointerEnter",_="pointer"),m=p==null?d:Vs(p),g=v==null?d:Vs(v),d=new y(E,_+"leave",p,n,u),d.target=m,d.relatedTarget=g,E=null,Vr(u)===c&&(y=new y(f,_+"enter",v,n,u),y.target=g,y.relatedTarget=m,E=y),m=E,p&&v)t:{for(y=p,f=v,_=0,g=y;g;g=ds(g))_++;for(g=0,E=f;E;E=ds(E))g++;for(;0<_-g;)y=ds(y),_--;for(;0<g-_;)f=ds(f),g--;for(;_--;){if(y===f||f!==null&&y===f.alternate)break t;y=ds(y),f=ds(f)}y=null}else y=null;p!==null&&fp(h,d,p,y,!1),v!==null&&m!==null&&fp(h,m,v,y,!0)}}e:{if(d=c?Vs(c):window,p=d.nodeName&&d.nodeName.toLowerCase(),p==="select"||p==="input"&&d.type==="file")var P=Ex;else if(ip(d))if(H_)P=bx;else{P=Tx;var C=wx}else(p=d.nodeName)&&p.toLowerCase()==="input"&&(d.type==="checkbox"||d.type==="radio")&&(P=Ax);if(P&&(P=P(t,c))){B_(h,P,n,u);break e}C&&C(t,d,c),t==="focusout"&&(C=d._wrapperState)&&C.controlled&&d.type==="number"&&Rf(d,"number",d.value)}switch(C=c?Vs(c):window,t){case"focusin":(ip(C)||C.contentEditable==="true")&&(Bs=C,Bf=c,la=null);break;case"focusout":la=Bf=Bs=null;break;case"mousedown":Hf=!0;break;case"contextmenu":case"mouseup":case"dragend":Hf=!1,lp(h,n,u);break;case"selectionchange":if(Lx)break;case"keydown":case"keyup":lp(h,n,u)}var b;if(Vd)e:{switch(t){case"compositionstart":var U="onCompositionStart";break e;case"compositionend":U="onCompositionEnd";break e;case"compositionupdate":U="onCompositionUpdate";break e}U=void 0}else zs?k_(t,n)&&(U="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(U="onCompositionStart");U&&(O_&&n.locale!=="ko"&&(zs||U!=="onCompositionStart"?U==="onCompositionEnd"&&zs&&(b=F_()):(dr=u,zd="value"in dr?dr.value:dr.textContent,zs=!0)),C=ac(c,U),0<C.length&&(U=new Qh(U,t,null,n,u),h.push({event:U,listeners:C}),b?U.data=b:(b=z_(n),b!==null&&(U.data=b)))),(b=vx?yx(t,n):xx(t,n))&&(c=ac(c,"onBeforeInput"),0<c.length&&(u=new Qh("onBeforeInput","beforeinput",null,n,u),h.push({event:u,listeners:c}),u.data=b))}Z_(h,e)})}function Aa(t,e,n){return{instance:t,listener:e,currentTarget:n}}function ac(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=ya(t,n),s!=null&&i.unshift(Aa(t,s,r)),s=ya(t,e),s!=null&&i.push(Aa(t,s,r))),t=t.return}return i}function ds(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function fp(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=ya(n,s),l!=null&&o.unshift(Aa(n,l,a))):r||(l=ya(n,s),l!=null&&o.push(Aa(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var Ix=/\r\n?/g,Ux=/\u0000|\uFFFD/g;function dp(t){return(typeof t=="string"?t:""+t).replace(Ix,`
`).replace(Ux,"")}function il(t,e,n){if(e=dp(e),dp(t)!==e&&n)throw Error(xe(425))}function lc(){}var Vf=null,Gf=null;function Wf(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Xf=typeof setTimeout=="function"?setTimeout:void 0,Fx=typeof clearTimeout=="function"?clearTimeout:void 0,hp=typeof Promise=="function"?Promise:void 0,Ox=typeof queueMicrotask=="function"?queueMicrotask:typeof hp<"u"?function(t){return hp.resolve(null).then(t).catch(kx)}:Xf;function kx(t){setTimeout(function(){throw t})}function Au(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Ma(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Ma(e)}function vr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function pp(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Eo=Math.random().toString(36).slice(2),Mi="__reactFiber$"+Eo,ba="__reactProps$"+Eo,Yi="__reactContainer$"+Eo,jf="__reactEvents$"+Eo,zx="__reactListeners$"+Eo,Bx="__reactHandles$"+Eo;function Vr(t){var e=t[Mi];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Yi]||n[Mi]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=pp(t);t!==null;){if(n=t[Mi])return n;t=pp(t)}return e}t=n,n=t.parentNode}return null}function za(t){return t=t[Mi]||t[Yi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Vs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(xe(33))}function Bc(t){return t[ba]||null}var qf=[],Gs=-1;function Lr(t){return{current:t}}function Ut(t){0>Gs||(t.current=qf[Gs],qf[Gs]=null,Gs--)}function Pt(t,e){Gs++,qf[Gs]=t.current,t.current=e}var br={},Mn=Lr(br),Fn=Lr(!1),Zr=br;function oo(t,e){var n=t.type.contextTypes;if(!n)return br;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function On(t){return t=t.childContextTypes,t!=null}function cc(){Ut(Fn),Ut(Mn)}function mp(t,e,n){if(Mn.current!==br)throw Error(xe(168));Pt(Mn,e),Pt(Fn,n)}function Q_(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(xe(108,wy(t)||"Unknown",r));return Gt({},n,i)}function uc(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||br,Zr=Mn.current,Pt(Mn,t),Pt(Fn,Fn.current),!0}function gp(t,e,n){var i=t.stateNode;if(!i)throw Error(xe(169));n?(t=Q_(t,e,Zr),i.__reactInternalMemoizedMergedChildContext=t,Ut(Fn),Ut(Mn),Pt(Mn,t)):Ut(Fn),Pt(Fn,n)}var zi=null,Hc=!1,bu=!1;function e0(t){zi===null?zi=[t]:zi.push(t)}function Hx(t){Hc=!0,e0(t)}function Pr(){if(!bu&&zi!==null){bu=!0;var t=0,e=Tt;try{var n=zi;for(Tt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}zi=null,Hc=!1}catch(r){throw zi!==null&&(zi=zi.slice(t+1)),T_(Ud,Pr),r}finally{Tt=e,bu=!1}}return null}var Ws=[],Xs=0,fc=null,dc=0,Kn=[],Zn=0,Jr=null,Hi=1,Vi="";function Or(t,e){Ws[Xs++]=dc,Ws[Xs++]=fc,fc=t,dc=e}function t0(t,e,n){Kn[Zn++]=Hi,Kn[Zn++]=Vi,Kn[Zn++]=Jr,Jr=t;var i=Hi;t=Vi;var r=32-hi(i)-1;i&=~(1<<r),n+=1;var s=32-hi(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,Hi=1<<32-hi(e)+r|n<<r|i,Vi=s+t}else Hi=1<<s|n<<r|i,Vi=t}function Wd(t){t.return!==null&&(Or(t,1),t0(t,1,0))}function Xd(t){for(;t===fc;)fc=Ws[--Xs],Ws[Xs]=null,dc=Ws[--Xs],Ws[Xs]=null;for(;t===Jr;)Jr=Kn[--Zn],Kn[Zn]=null,Vi=Kn[--Zn],Kn[Zn]=null,Hi=Kn[--Zn],Kn[Zn]=null}var Wn=null,Gn=null,Ft=!1,fi=null;function n0(t,e){var n=ti(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function _p(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Wn=t,Gn=vr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Wn=t,Gn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Jr!==null?{id:Hi,overflow:Vi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=ti(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Wn=t,Gn=null,!0):!1;default:return!1}}function Yf(t){return(t.mode&1)!==0&&(t.flags&128)===0}function $f(t){if(Ft){var e=Gn;if(e){var n=e;if(!_p(t,e)){if(Yf(t))throw Error(xe(418));e=vr(n.nextSibling);var i=Wn;e&&_p(t,e)?n0(i,n):(t.flags=t.flags&-4097|2,Ft=!1,Wn=t)}}else{if(Yf(t))throw Error(xe(418));t.flags=t.flags&-4097|2,Ft=!1,Wn=t}}}function vp(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Wn=t}function rl(t){if(t!==Wn)return!1;if(!Ft)return vp(t),Ft=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Wf(t.type,t.memoizedProps)),e&&(e=Gn)){if(Yf(t))throw i0(),Error(xe(418));for(;e;)n0(t,e),e=vr(e.nextSibling)}if(vp(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(xe(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Gn=vr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Gn=null}}else Gn=Wn?vr(t.stateNode.nextSibling):null;return!0}function i0(){for(var t=Gn;t;)t=vr(t.nextSibling)}function ao(){Gn=Wn=null,Ft=!1}function jd(t){fi===null?fi=[t]:fi.push(t)}var Vx=Qi.ReactCurrentBatchConfig;function Go(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(xe(309));var i=n.stateNode}if(!i)throw Error(xe(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(xe(284));if(!n._owner)throw Error(xe(290,t))}return t}function sl(t,e){throw t=Object.prototype.toString.call(e),Error(xe(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function yp(t){var e=t._init;return e(t._payload)}function r0(t){function e(f,_){if(t){var g=f.deletions;g===null?(f.deletions=[_],f.flags|=16):g.push(_)}}function n(f,_){if(!t)return null;for(;_!==null;)e(f,_),_=_.sibling;return null}function i(f,_){for(f=new Map;_!==null;)_.key!==null?f.set(_.key,_):f.set(_.index,_),_=_.sibling;return f}function r(f,_){return f=Mr(f,_),f.index=0,f.sibling=null,f}function s(f,_,g){return f.index=g,t?(g=f.alternate,g!==null?(g=g.index,g<_?(f.flags|=2,_):g):(f.flags|=2,_)):(f.flags|=1048576,_)}function o(f){return t&&f.alternate===null&&(f.flags|=2),f}function a(f,_,g,E){return _===null||_.tag!==6?(_=Iu(g,f.mode,E),_.return=f,_):(_=r(_,g),_.return=f,_)}function l(f,_,g,E){var P=g.type;return P===ks?u(f,_,g.props.children,E,g.key):_!==null&&(_.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===lr&&yp(P)===_.type)?(E=r(_,g.props),E.ref=Go(f,_,g),E.return=f,E):(E=Jl(g.type,g.key,g.props,null,f.mode,E),E.ref=Go(f,_,g),E.return=f,E)}function c(f,_,g,E){return _===null||_.tag!==4||_.stateNode.containerInfo!==g.containerInfo||_.stateNode.implementation!==g.implementation?(_=Uu(g,f.mode,E),_.return=f,_):(_=r(_,g.children||[]),_.return=f,_)}function u(f,_,g,E,P){return _===null||_.tag!==7?(_=qr(g,f.mode,E,P),_.return=f,_):(_=r(_,g),_.return=f,_)}function h(f,_,g){if(typeof _=="string"&&_!==""||typeof _=="number")return _=Iu(""+_,f.mode,g),_.return=f,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Ya:return g=Jl(_.type,_.key,_.props,null,f.mode,g),g.ref=Go(f,null,_),g.return=f,g;case Os:return _=Uu(_,f.mode,g),_.return=f,_;case lr:var E=_._init;return h(f,E(_._payload),g)}if(ta(_)||ko(_))return _=qr(_,f.mode,g,null),_.return=f,_;sl(f,_)}return null}function d(f,_,g,E){var P=_!==null?_.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return P!==null?null:a(f,_,""+g,E);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Ya:return g.key===P?l(f,_,g,E):null;case Os:return g.key===P?c(f,_,g,E):null;case lr:return P=g._init,d(f,_,P(g._payload),E)}if(ta(g)||ko(g))return P!==null?null:u(f,_,g,E,null);sl(f,g)}return null}function p(f,_,g,E,P){if(typeof E=="string"&&E!==""||typeof E=="number")return f=f.get(g)||null,a(_,f,""+E,P);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case Ya:return f=f.get(E.key===null?g:E.key)||null,l(_,f,E,P);case Os:return f=f.get(E.key===null?g:E.key)||null,c(_,f,E,P);case lr:var C=E._init;return p(f,_,g,C(E._payload),P)}if(ta(E)||ko(E))return f=f.get(g)||null,u(_,f,E,P,null);sl(_,E)}return null}function v(f,_,g,E){for(var P=null,C=null,b=_,U=_=0,M=null;b!==null&&U<g.length;U++){b.index>U?(M=b,b=null):M=b.sibling;var T=d(f,b,g[U],E);if(T===null){b===null&&(b=M);break}t&&b&&T.alternate===null&&e(f,b),_=s(T,_,U),C===null?P=T:C.sibling=T,C=T,b=M}if(U===g.length)return n(f,b),Ft&&Or(f,U),P;if(b===null){for(;U<g.length;U++)b=h(f,g[U],E),b!==null&&(_=s(b,_,U),C===null?P=b:C.sibling=b,C=b);return Ft&&Or(f,U),P}for(b=i(f,b);U<g.length;U++)M=p(b,f,U,g[U],E),M!==null&&(t&&M.alternate!==null&&b.delete(M.key===null?U:M.key),_=s(M,_,U),C===null?P=M:C.sibling=M,C=M);return t&&b.forEach(function(H){return e(f,H)}),Ft&&Or(f,U),P}function y(f,_,g,E){var P=ko(g);if(typeof P!="function")throw Error(xe(150));if(g=P.call(g),g==null)throw Error(xe(151));for(var C=P=null,b=_,U=_=0,M=null,T=g.next();b!==null&&!T.done;U++,T=g.next()){b.index>U?(M=b,b=null):M=b.sibling;var H=d(f,b,T.value,E);if(H===null){b===null&&(b=M);break}t&&b&&H.alternate===null&&e(f,b),_=s(H,_,U),C===null?P=H:C.sibling=H,C=H,b=M}if(T.done)return n(f,b),Ft&&Or(f,U),P;if(b===null){for(;!T.done;U++,T=g.next())T=h(f,T.value,E),T!==null&&(_=s(T,_,U),C===null?P=T:C.sibling=T,C=T);return Ft&&Or(f,U),P}for(b=i(f,b);!T.done;U++,T=g.next())T=p(b,f,U,T.value,E),T!==null&&(t&&T.alternate!==null&&b.delete(T.key===null?U:T.key),_=s(T,_,U),C===null?P=T:C.sibling=T,C=T);return t&&b.forEach(function(V){return e(f,V)}),Ft&&Or(f,U),P}function m(f,_,g,E){if(typeof g=="object"&&g!==null&&g.type===ks&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case Ya:e:{for(var P=g.key,C=_;C!==null;){if(C.key===P){if(P=g.type,P===ks){if(C.tag===7){n(f,C.sibling),_=r(C,g.props.children),_.return=f,f=_;break e}}else if(C.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===lr&&yp(P)===C.type){n(f,C.sibling),_=r(C,g.props),_.ref=Go(f,C,g),_.return=f,f=_;break e}n(f,C);break}else e(f,C);C=C.sibling}g.type===ks?(_=qr(g.props.children,f.mode,E,g.key),_.return=f,f=_):(E=Jl(g.type,g.key,g.props,null,f.mode,E),E.ref=Go(f,_,g),E.return=f,f=E)}return o(f);case Os:e:{for(C=g.key;_!==null;){if(_.key===C)if(_.tag===4&&_.stateNode.containerInfo===g.containerInfo&&_.stateNode.implementation===g.implementation){n(f,_.sibling),_=r(_,g.children||[]),_.return=f,f=_;break e}else{n(f,_);break}else e(f,_);_=_.sibling}_=Uu(g,f.mode,E),_.return=f,f=_}return o(f);case lr:return C=g._init,m(f,_,C(g._payload),E)}if(ta(g))return v(f,_,g,E);if(ko(g))return y(f,_,g,E);sl(f,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,_!==null&&_.tag===6?(n(f,_.sibling),_=r(_,g),_.return=f,f=_):(n(f,_),_=Iu(g,f.mode,E),_.return=f,f=_),o(f)):n(f,_)}return m}var lo=r0(!0),s0=r0(!1),hc=Lr(null),pc=null,js=null,qd=null;function Yd(){qd=js=pc=null}function $d(t){var e=hc.current;Ut(hc),t._currentValue=e}function Kf(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function to(t,e){pc=t,qd=js=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Un=!0),t.firstContext=null)}function ii(t){var e=t._currentValue;if(qd!==t)if(t={context:t,memoizedValue:e,next:null},js===null){if(pc===null)throw Error(xe(308));js=t,pc.dependencies={lanes:0,firstContext:t}}else js=js.next=t;return e}var Gr=null;function Kd(t){Gr===null?Gr=[t]:Gr.push(t)}function o0(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Kd(e)):(n.next=r.next,r.next=n),e.interleaved=n,$i(t,i)}function $i(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var cr=!1;function Zd(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function a0(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function ji(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function yr(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,vt&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,$i(t,n)}return r=i.interleaved,r===null?(e.next=e,Kd(i)):(e.next=r.next,r.next=e),i.interleaved=e,$i(t,n)}function jl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Fd(t,n)}}function xp(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function mc(t,e,n,i){var r=t.updateQueue;cr=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var u=t.alternate;u!==null&&(u=u.updateQueue,a=u.lastBaseUpdate,a!==o&&(a===null?u.firstBaseUpdate=c:a.next=c,u.lastBaseUpdate=l))}if(s!==null){var h=r.baseState;o=0,u=c=l=null,a=s;do{var d=a.lane,p=a.eventTime;if((i&d)===d){u!==null&&(u=u.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var v=t,y=a;switch(d=e,p=n,y.tag){case 1:if(v=y.payload,typeof v=="function"){h=v.call(p,h,d);break e}h=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=y.payload,d=typeof v=="function"?v.call(p,h,d):v,d==null)break e;h=Gt({},h,d);break e;case 2:cr=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,d=r.effects,d===null?r.effects=[a]:d.push(a))}else p={eventTime:p,lane:d,tag:a.tag,payload:a.payload,callback:a.callback,next:null},u===null?(c=u=p,l=h):u=u.next=p,o|=d;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;d=a,a=d.next,d.next=null,r.lastBaseUpdate=d,r.shared.pending=null}}while(!0);if(u===null&&(l=h),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=u,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);es|=o,t.lanes=o,t.memoizedState=h}}function Sp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(xe(191,r));r.call(i)}}}var Ba={},Ti=Lr(Ba),Ra=Lr(Ba),Ca=Lr(Ba);function Wr(t){if(t===Ba)throw Error(xe(174));return t}function Jd(t,e){switch(Pt(Ca,e),Pt(Ra,t),Pt(Ti,Ba),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Lf(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Lf(e,t)}Ut(Ti),Pt(Ti,e)}function co(){Ut(Ti),Ut(Ra),Ut(Ca)}function l0(t){Wr(Ca.current);var e=Wr(Ti.current),n=Lf(e,t.type);e!==n&&(Pt(Ra,t),Pt(Ti,n))}function Qd(t){Ra.current===t&&(Ut(Ti),Ut(Ra))}var Ht=Lr(0);function gc(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Ru=[];function eh(){for(var t=0;t<Ru.length;t++)Ru[t]._workInProgressVersionPrimary=null;Ru.length=0}var ql=Qi.ReactCurrentDispatcher,Cu=Qi.ReactCurrentBatchConfig,Qr=0,Vt=null,Jt=null,on=null,_c=!1,ca=!1,La=0,Gx=0;function hn(){throw Error(xe(321))}function th(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!gi(t[n],e[n]))return!1;return!0}function nh(t,e,n,i,r,s){if(Qr=s,Vt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,ql.current=t===null||t.memoizedState===null?qx:Yx,t=n(i,r),ca){s=0;do{if(ca=!1,La=0,25<=s)throw Error(xe(301));s+=1,on=Jt=null,e.updateQueue=null,ql.current=$x,t=n(i,r)}while(ca)}if(ql.current=vc,e=Jt!==null&&Jt.next!==null,Qr=0,on=Jt=Vt=null,_c=!1,e)throw Error(xe(300));return t}function ih(){var t=La!==0;return La=0,t}function xi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return on===null?Vt.memoizedState=on=t:on=on.next=t,on}function ri(){if(Jt===null){var t=Vt.alternate;t=t!==null?t.memoizedState:null}else t=Jt.next;var e=on===null?Vt.memoizedState:on.next;if(e!==null)on=e,Jt=t;else{if(t===null)throw Error(xe(310));Jt=t,t={memoizedState:Jt.memoizedState,baseState:Jt.baseState,baseQueue:Jt.baseQueue,queue:Jt.queue,next:null},on===null?Vt.memoizedState=on=t:on=on.next=t}return on}function Pa(t,e){return typeof e=="function"?e(t):e}function Lu(t){var e=ri(),n=e.queue;if(n===null)throw Error(xe(311));n.lastRenderedReducer=t;var i=Jt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var u=c.lane;if((Qr&u)===u)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var h={lane:u,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=h,o=i):l=l.next=h,Vt.lanes|=u,es|=u}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,gi(i,e.memoizedState)||(Un=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,Vt.lanes|=s,es|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Pu(t){var e=ri(),n=e.queue;if(n===null)throw Error(xe(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);gi(s,e.memoizedState)||(Un=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function c0(){}function u0(t,e){var n=Vt,i=ri(),r=e(),s=!gi(i.memoizedState,r);if(s&&(i.memoizedState=r,Un=!0),i=i.queue,rh(h0.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||on!==null&&on.memoizedState.tag&1){if(n.flags|=2048,Na(9,d0.bind(null,n,i,r,e),void 0,null),an===null)throw Error(xe(349));Qr&30||f0(n,e,r)}return r}function f0(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Vt.updateQueue,e===null?(e={lastEffect:null,stores:null},Vt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function d0(t,e,n,i){e.value=n,e.getSnapshot=i,p0(e)&&m0(t)}function h0(t,e,n){return n(function(){p0(e)&&m0(t)})}function p0(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!gi(t,n)}catch{return!0}}function m0(t){var e=$i(t,1);e!==null&&pi(e,t,1,-1)}function Mp(t){var e=xi();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Pa,lastRenderedState:t},e.queue=t,t=t.dispatch=jx.bind(null,Vt,t),[e.memoizedState,t]}function Na(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=Vt.updateQueue,e===null?(e={lastEffect:null,stores:null},Vt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function g0(){return ri().memoizedState}function Yl(t,e,n,i){var r=xi();Vt.flags|=t,r.memoizedState=Na(1|e,n,void 0,i===void 0?null:i)}function Vc(t,e,n,i){var r=ri();i=i===void 0?null:i;var s=void 0;if(Jt!==null){var o=Jt.memoizedState;if(s=o.destroy,i!==null&&th(i,o.deps)){r.memoizedState=Na(e,n,s,i);return}}Vt.flags|=t,r.memoizedState=Na(1|e,n,s,i)}function Ep(t,e){return Yl(8390656,8,t,e)}function rh(t,e){return Vc(2048,8,t,e)}function _0(t,e){return Vc(4,2,t,e)}function v0(t,e){return Vc(4,4,t,e)}function y0(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function x0(t,e,n){return n=n!=null?n.concat([t]):null,Vc(4,4,y0.bind(null,e,t),n)}function sh(){}function S0(t,e){var n=ri();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&th(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function M0(t,e){var n=ri();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&th(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function E0(t,e,n){return Qr&21?(gi(n,e)||(n=R_(),Vt.lanes|=n,es|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Un=!0),t.memoizedState=n)}function Wx(t,e){var n=Tt;Tt=n!==0&&4>n?n:4,t(!0);var i=Cu.transition;Cu.transition={};try{t(!1),e()}finally{Tt=n,Cu.transition=i}}function w0(){return ri().memoizedState}function Xx(t,e,n){var i=Sr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},T0(t))A0(e,n);else if(n=o0(t,e,n,i),n!==null){var r=Cn();pi(n,t,i,r),b0(n,e,i)}}function jx(t,e,n){var i=Sr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(T0(t))A0(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,gi(a,o)){var l=e.interleaved;l===null?(r.next=r,Kd(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=o0(t,e,r,i),n!==null&&(r=Cn(),pi(n,t,i,r),b0(n,e,i))}}function T0(t){var e=t.alternate;return t===Vt||e!==null&&e===Vt}function A0(t,e){ca=_c=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function b0(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Fd(t,n)}}var vc={readContext:ii,useCallback:hn,useContext:hn,useEffect:hn,useImperativeHandle:hn,useInsertionEffect:hn,useLayoutEffect:hn,useMemo:hn,useReducer:hn,useRef:hn,useState:hn,useDebugValue:hn,useDeferredValue:hn,useTransition:hn,useMutableSource:hn,useSyncExternalStore:hn,useId:hn,unstable_isNewReconciler:!1},qx={readContext:ii,useCallback:function(t,e){return xi().memoizedState=[t,e===void 0?null:e],t},useContext:ii,useEffect:Ep,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Yl(4194308,4,y0.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Yl(4194308,4,t,e)},useInsertionEffect:function(t,e){return Yl(4,2,t,e)},useMemo:function(t,e){var n=xi();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=xi();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=Xx.bind(null,Vt,t),[i.memoizedState,t]},useRef:function(t){var e=xi();return t={current:t},e.memoizedState=t},useState:Mp,useDebugValue:sh,useDeferredValue:function(t){return xi().memoizedState=t},useTransition:function(){var t=Mp(!1),e=t[0];return t=Wx.bind(null,t[1]),xi().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=Vt,r=xi();if(Ft){if(n===void 0)throw Error(xe(407));n=n()}else{if(n=e(),an===null)throw Error(xe(349));Qr&30||f0(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Ep(h0.bind(null,i,s,t),[t]),i.flags|=2048,Na(9,d0.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=xi(),e=an.identifierPrefix;if(Ft){var n=Vi,i=Hi;n=(i&~(1<<32-hi(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=La++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=Gx++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},Yx={readContext:ii,useCallback:S0,useContext:ii,useEffect:rh,useImperativeHandle:x0,useInsertionEffect:_0,useLayoutEffect:v0,useMemo:M0,useReducer:Lu,useRef:g0,useState:function(){return Lu(Pa)},useDebugValue:sh,useDeferredValue:function(t){var e=ri();return E0(e,Jt.memoizedState,t)},useTransition:function(){var t=Lu(Pa)[0],e=ri().memoizedState;return[t,e]},useMutableSource:c0,useSyncExternalStore:u0,useId:w0,unstable_isNewReconciler:!1},$x={readContext:ii,useCallback:S0,useContext:ii,useEffect:rh,useImperativeHandle:x0,useInsertionEffect:_0,useLayoutEffect:v0,useMemo:M0,useReducer:Pu,useRef:g0,useState:function(){return Pu(Pa)},useDebugValue:sh,useDeferredValue:function(t){var e=ri();return Jt===null?e.memoizedState=t:E0(e,Jt.memoizedState,t)},useTransition:function(){var t=Pu(Pa)[0],e=ri().memoizedState;return[t,e]},useMutableSource:c0,useSyncExternalStore:u0,useId:w0,unstable_isNewReconciler:!1};function ci(t,e){if(t&&t.defaultProps){e=Gt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Zf(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:Gt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Gc={isMounted:function(t){return(t=t._reactInternals)?os(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=Cn(),r=Sr(t),s=ji(i,r);s.payload=e,n!=null&&(s.callback=n),e=yr(t,s,r),e!==null&&(pi(e,t,r,i),jl(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=Cn(),r=Sr(t),s=ji(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=yr(t,s,r),e!==null&&(pi(e,t,r,i),jl(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Cn(),i=Sr(t),r=ji(n,i);r.tag=2,e!=null&&(r.callback=e),e=yr(t,r,i),e!==null&&(pi(e,t,i,n),jl(e,t,i))}};function wp(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!wa(n,i)||!wa(r,s):!0}function R0(t,e,n){var i=!1,r=br,s=e.contextType;return typeof s=="object"&&s!==null?s=ii(s):(r=On(e)?Zr:Mn.current,i=e.contextTypes,s=(i=i!=null)?oo(t,r):br),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Gc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function Tp(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Gc.enqueueReplaceState(e,e.state,null)}function Jf(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Zd(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=ii(s):(s=On(e)?Zr:Mn.current,r.context=oo(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Zf(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Gc.enqueueReplaceState(r,r.state,null),mc(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function uo(t,e){try{var n="",i=e;do n+=Ey(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Nu(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Qf(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var Kx=typeof WeakMap=="function"?WeakMap:Map;function C0(t,e,n){n=ji(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){xc||(xc=!0,cd=i),Qf(t,e)},n}function L0(t,e,n){n=ji(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Qf(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Qf(t,e),typeof i!="function"&&(xr===null?xr=new Set([this]):xr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Ap(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new Kx;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=uS.bind(null,t,e,n),e.then(t,t))}function bp(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Rp(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=ji(-1,1),e.tag=2,yr(n,e,1))),n.lanes|=1),t)}var Zx=Qi.ReactCurrentOwner,Un=!1;function An(t,e,n,i){e.child=t===null?s0(e,null,n,i):lo(e,t.child,n,i)}function Cp(t,e,n,i,r){n=n.render;var s=e.ref;return to(e,r),i=nh(t,e,n,i,s,r),n=ih(),t!==null&&!Un?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ki(t,e,r)):(Ft&&n&&Wd(e),e.flags|=1,An(t,e,i,r),e.child)}function Lp(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!hh(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,P0(t,e,s,i,r)):(t=Jl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:wa,n(o,i)&&t.ref===e.ref)return Ki(t,e,r)}return e.flags|=1,t=Mr(s,i),t.ref=e.ref,t.return=e,e.child=t}function P0(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(wa(s,i)&&t.ref===e.ref)if(Un=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(Un=!0);else return e.lanes=t.lanes,Ki(t,e,r)}return ed(t,e,n,i,r)}function N0(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},Pt(Ys,Vn),Vn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,Pt(Ys,Vn),Vn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,Pt(Ys,Vn),Vn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,Pt(Ys,Vn),Vn|=i;return An(t,e,r,n),e.child}function D0(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function ed(t,e,n,i,r){var s=On(n)?Zr:Mn.current;return s=oo(e,s),to(e,r),n=nh(t,e,n,i,s,r),i=ih(),t!==null&&!Un?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ki(t,e,r)):(Ft&&i&&Wd(e),e.flags|=1,An(t,e,n,r),e.child)}function Pp(t,e,n,i,r){if(On(n)){var s=!0;uc(e)}else s=!1;if(to(e,r),e.stateNode===null)$l(t,e),R0(e,n,i),Jf(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=ii(c):(c=On(n)?Zr:Mn.current,c=oo(e,c));var u=n.getDerivedStateFromProps,h=typeof u=="function"||typeof o.getSnapshotBeforeUpdate=="function";h||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&Tp(e,o,i,c),cr=!1;var d=e.memoizedState;o.state=d,mc(e,i,o,r),l=e.memoizedState,a!==i||d!==l||Fn.current||cr?(typeof u=="function"&&(Zf(e,n,u,i),l=e.memoizedState),(a=cr||wp(e,n,a,i,d,l,c))?(h||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,a0(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:ci(e.type,a),o.props=c,h=e.pendingProps,d=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=ii(l):(l=On(n)?Zr:Mn.current,l=oo(e,l));var p=n.getDerivedStateFromProps;(u=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==h||d!==l)&&Tp(e,o,i,l),cr=!1,d=e.memoizedState,o.state=d,mc(e,i,o,r);var v=e.memoizedState;a!==h||d!==v||Fn.current||cr?(typeof p=="function"&&(Zf(e,n,p,i),v=e.memoizedState),(c=cr||wp(e,n,c,i,d,v,l)||!1)?(u||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,v,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,v,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=v),o.props=i,o.state=v,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),i=!1)}return td(t,e,n,i,s,r)}function td(t,e,n,i,r,s){D0(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&gp(e,n,!1),Ki(t,e,s);i=e.stateNode,Zx.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=lo(e,t.child,null,s),e.child=lo(e,null,a,s)):An(t,e,a,s),e.memoizedState=i.state,r&&gp(e,n,!0),e.child}function I0(t){var e=t.stateNode;e.pendingContext?mp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&mp(t,e.context,!1),Jd(t,e.containerInfo)}function Np(t,e,n,i,r){return ao(),jd(r),e.flags|=256,An(t,e,n,i),e.child}var nd={dehydrated:null,treeContext:null,retryLane:0};function id(t){return{baseLanes:t,cachePool:null,transitions:null}}function U0(t,e,n){var i=e.pendingProps,r=Ht.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),Pt(Ht,r&1),t===null)return $f(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=jc(o,i,0,null),t=qr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=id(n),e.memoizedState=nd,t):oh(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return Jx(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=Mr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=Mr(a,s):(s=qr(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?id(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=nd,i}return s=t.child,t=s.sibling,i=Mr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function oh(t,e){return e=jc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function ol(t,e,n,i){return i!==null&&jd(i),lo(e,t.child,null,n),t=oh(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Jx(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=Nu(Error(xe(422))),ol(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=jc({mode:"visible",children:i.children},r,0,null),s=qr(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&lo(e,t.child,null,o),e.child.memoizedState=id(o),e.memoizedState=nd,s);if(!(e.mode&1))return ol(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(xe(419)),i=Nu(s,i,void 0),ol(t,e,o,i)}if(a=(o&t.childLanes)!==0,Un||a){if(i=an,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,$i(t,r),pi(i,t,r,-1))}return dh(),i=Nu(Error(xe(421))),ol(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=fS.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,Gn=vr(r.nextSibling),Wn=e,Ft=!0,fi=null,t!==null&&(Kn[Zn++]=Hi,Kn[Zn++]=Vi,Kn[Zn++]=Jr,Hi=t.id,Vi=t.overflow,Jr=e),e=oh(e,i.children),e.flags|=4096,e)}function Dp(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Kf(t.return,e,n)}function Du(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function F0(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(An(t,e,i.children,n),i=Ht.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Dp(t,n,e);else if(t.tag===19)Dp(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(Pt(Ht,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&gc(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Du(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&gc(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Du(e,!0,n,null,s);break;case"together":Du(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function $l(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Ki(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),es|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(xe(153));if(e.child!==null){for(t=e.child,n=Mr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Mr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Qx(t,e,n){switch(e.tag){case 3:I0(e),ao();break;case 5:l0(e);break;case 1:On(e.type)&&uc(e);break;case 4:Jd(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;Pt(hc,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(Pt(Ht,Ht.current&1),e.flags|=128,null):n&e.child.childLanes?U0(t,e,n):(Pt(Ht,Ht.current&1),t=Ki(t,e,n),t!==null?t.sibling:null);Pt(Ht,Ht.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return F0(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),Pt(Ht,Ht.current),i)break;return null;case 22:case 23:return e.lanes=0,N0(t,e,n)}return Ki(t,e,n)}var O0,rd,k0,z0;O0=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};rd=function(){};k0=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Wr(Ti.current);var s=null;switch(n){case"input":r=Af(t,r),i=Af(t,i),s=[];break;case"select":r=Gt({},r,{value:void 0}),i=Gt({},i,{value:void 0}),s=[];break;case"textarea":r=Cf(t,r),i=Cf(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=lc)}Pf(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(_a.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(_a.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&Dt("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};z0=function(t,e,n,i){n!==i&&(e.flags|=4)};function Wo(t,e){if(!Ft)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function pn(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function eS(t,e,n){var i=e.pendingProps;switch(Xd(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return pn(e),null;case 1:return On(e.type)&&cc(),pn(e),null;case 3:return i=e.stateNode,co(),Ut(Fn),Ut(Mn),eh(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(rl(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,fi!==null&&(dd(fi),fi=null))),rd(t,e),pn(e),null;case 5:Qd(e);var r=Wr(Ca.current);if(n=e.type,t!==null&&e.stateNode!=null)k0(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(xe(166));return pn(e),null}if(t=Wr(Ti.current),rl(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[Mi]=e,i[ba]=s,t=(e.mode&1)!==0,n){case"dialog":Dt("cancel",i),Dt("close",i);break;case"iframe":case"object":case"embed":Dt("load",i);break;case"video":case"audio":for(r=0;r<ia.length;r++)Dt(ia[r],i);break;case"source":Dt("error",i);break;case"img":case"image":case"link":Dt("error",i),Dt("load",i);break;case"details":Dt("toggle",i);break;case"input":Vh(i,s),Dt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},Dt("invalid",i);break;case"textarea":Wh(i,s),Dt("invalid",i)}Pf(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&il(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&il(i.textContent,a,t),r=["children",""+a]):_a.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&Dt("scroll",i)}switch(n){case"input":$a(i),Gh(i,s,!0);break;case"textarea":$a(i),Xh(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=lc)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=h_(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[Mi]=e,t[ba]=i,O0(t,e,!1,!1),e.stateNode=t;e:{switch(o=Nf(n,i),n){case"dialog":Dt("cancel",t),Dt("close",t),r=i;break;case"iframe":case"object":case"embed":Dt("load",t),r=i;break;case"video":case"audio":for(r=0;r<ia.length;r++)Dt(ia[r],t);r=i;break;case"source":Dt("error",t),r=i;break;case"img":case"image":case"link":Dt("error",t),Dt("load",t),r=i;break;case"details":Dt("toggle",t),r=i;break;case"input":Vh(t,i),r=Af(t,i),Dt("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=Gt({},i,{value:void 0}),Dt("invalid",t);break;case"textarea":Wh(t,i),r=Cf(t,i),Dt("invalid",t);break;default:r=i}Pf(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?g_(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&p_(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&va(t,l):typeof l=="number"&&va(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(_a.hasOwnProperty(s)?l!=null&&s==="onScroll"&&Dt("scroll",t):l!=null&&Ld(t,s,l,o))}switch(n){case"input":$a(t),Gh(t,i,!1);break;case"textarea":$a(t),Xh(t);break;case"option":i.value!=null&&t.setAttribute("value",""+Ar(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?Zs(t,!!i.multiple,s,!1):i.defaultValue!=null&&Zs(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=lc)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return pn(e),null;case 6:if(t&&e.stateNode!=null)z0(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(xe(166));if(n=Wr(Ca.current),Wr(Ti.current),rl(e)){if(i=e.stateNode,n=e.memoizedProps,i[Mi]=e,(s=i.nodeValue!==n)&&(t=Wn,t!==null))switch(t.tag){case 3:il(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&il(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[Mi]=e,e.stateNode=i}return pn(e),null;case 13:if(Ut(Ht),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ft&&Gn!==null&&e.mode&1&&!(e.flags&128))i0(),ao(),e.flags|=98560,s=!1;else if(s=rl(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(xe(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(xe(317));s[Mi]=e}else ao(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;pn(e),s=!1}else fi!==null&&(dd(fi),fi=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||Ht.current&1?en===0&&(en=3):dh())),e.updateQueue!==null&&(e.flags|=4),pn(e),null);case 4:return co(),rd(t,e),t===null&&Ta(e.stateNode.containerInfo),pn(e),null;case 10:return $d(e.type._context),pn(e),null;case 17:return On(e.type)&&cc(),pn(e),null;case 19:if(Ut(Ht),s=e.memoizedState,s===null)return pn(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)Wo(s,!1);else{if(en!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=gc(t),o!==null){for(e.flags|=128,Wo(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return Pt(Ht,Ht.current&1|2),e.child}t=t.sibling}s.tail!==null&&jt()>fo&&(e.flags|=128,i=!0,Wo(s,!1),e.lanes=4194304)}else{if(!i)if(t=gc(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Wo(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!Ft)return pn(e),null}else 2*jt()-s.renderingStartTime>fo&&n!==1073741824&&(e.flags|=128,i=!0,Wo(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=jt(),e.sibling=null,n=Ht.current,Pt(Ht,i?n&1|2:n&1),e):(pn(e),null);case 22:case 23:return fh(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Vn&1073741824&&(pn(e),e.subtreeFlags&6&&(e.flags|=8192)):pn(e),null;case 24:return null;case 25:return null}throw Error(xe(156,e.tag))}function tS(t,e){switch(Xd(e),e.tag){case 1:return On(e.type)&&cc(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return co(),Ut(Fn),Ut(Mn),eh(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Qd(e),null;case 13:if(Ut(Ht),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(xe(340));ao()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Ut(Ht),null;case 4:return co(),null;case 10:return $d(e.type._context),null;case 22:case 23:return fh(),null;case 24:return null;default:return null}}var al=!1,_n=!1,nS=typeof WeakSet=="function"?WeakSet:Set,Fe=null;function qs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Wt(t,e,i)}else n.current=null}function sd(t,e,n){try{n()}catch(i){Wt(t,e,i)}}var Ip=!1;function iS(t,e){if(Vf=sc,t=W_(),Gd(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,u=0,h=t,d=null;t:for(;;){for(var p;h!==n||r!==0&&h.nodeType!==3||(a=o+r),h!==s||i!==0&&h.nodeType!==3||(l=o+i),h.nodeType===3&&(o+=h.nodeValue.length),(p=h.firstChild)!==null;)d=h,h=p;for(;;){if(h===t)break t;if(d===n&&++c===r&&(a=o),d===s&&++u===i&&(l=o),(p=h.nextSibling)!==null)break;h=d,d=h.parentNode}h=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Gf={focusedElem:t,selectionRange:n},sc=!1,Fe=e;Fe!==null;)if(e=Fe,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Fe=t;else for(;Fe!==null;){e=Fe;try{var v=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var y=v.memoizedProps,m=v.memoizedState,f=e.stateNode,_=f.getSnapshotBeforeUpdate(e.elementType===e.type?y:ci(e.type,y),m);f.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var g=e.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(xe(163))}}catch(E){Wt(e,e.return,E)}if(t=e.sibling,t!==null){t.return=e.return,Fe=t;break}Fe=e.return}return v=Ip,Ip=!1,v}function ua(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&sd(e,n,s)}r=r.next}while(r!==i)}}function Wc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function od(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function B0(t){var e=t.alternate;e!==null&&(t.alternate=null,B0(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Mi],delete e[ba],delete e[jf],delete e[zx],delete e[Bx])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function H0(t){return t.tag===5||t.tag===3||t.tag===4}function Up(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||H0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function ad(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=lc));else if(i!==4&&(t=t.child,t!==null))for(ad(t,e,n),t=t.sibling;t!==null;)ad(t,e,n),t=t.sibling}function ld(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(ld(t,e,n),t=t.sibling;t!==null;)ld(t,e,n),t=t.sibling}var ln=null,ui=!1;function nr(t,e,n){for(n=n.child;n!==null;)V0(t,e,n),n=n.sibling}function V0(t,e,n){if(wi&&typeof wi.onCommitFiberUnmount=="function")try{wi.onCommitFiberUnmount(Fc,n)}catch{}switch(n.tag){case 5:_n||qs(n,e);case 6:var i=ln,r=ui;ln=null,nr(t,e,n),ln=i,ui=r,ln!==null&&(ui?(t=ln,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):ln.removeChild(n.stateNode));break;case 18:ln!==null&&(ui?(t=ln,n=n.stateNode,t.nodeType===8?Au(t.parentNode,n):t.nodeType===1&&Au(t,n),Ma(t)):Au(ln,n.stateNode));break;case 4:i=ln,r=ui,ln=n.stateNode.containerInfo,ui=!0,nr(t,e,n),ln=i,ui=r;break;case 0:case 11:case 14:case 15:if(!_n&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&sd(n,e,o),r=r.next}while(r!==i)}nr(t,e,n);break;case 1:if(!_n&&(qs(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){Wt(n,e,a)}nr(t,e,n);break;case 21:nr(t,e,n);break;case 22:n.mode&1?(_n=(i=_n)||n.memoizedState!==null,nr(t,e,n),_n=i):nr(t,e,n);break;default:nr(t,e,n)}}function Fp(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new nS),e.forEach(function(i){var r=dS.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function si(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:ln=a.stateNode,ui=!1;break e;case 3:ln=a.stateNode.containerInfo,ui=!0;break e;case 4:ln=a.stateNode.containerInfo,ui=!0;break e}a=a.return}if(ln===null)throw Error(xe(160));V0(s,o,r),ln=null,ui=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Wt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)G0(e,t),e=e.sibling}function G0(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(si(e,t),yi(t),i&4){try{ua(3,t,t.return),Wc(3,t)}catch(y){Wt(t,t.return,y)}try{ua(5,t,t.return)}catch(y){Wt(t,t.return,y)}}break;case 1:si(e,t),yi(t),i&512&&n!==null&&qs(n,n.return);break;case 5:if(si(e,t),yi(t),i&512&&n!==null&&qs(n,n.return),t.flags&32){var r=t.stateNode;try{va(r,"")}catch(y){Wt(t,t.return,y)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&f_(r,s),Nf(a,o);var c=Nf(a,s);for(o=0;o<l.length;o+=2){var u=l[o],h=l[o+1];u==="style"?g_(r,h):u==="dangerouslySetInnerHTML"?p_(r,h):u==="children"?va(r,h):Ld(r,u,h,c)}switch(a){case"input":bf(r,s);break;case"textarea":d_(r,s);break;case"select":var d=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?Zs(r,!!s.multiple,p,!1):d!==!!s.multiple&&(s.defaultValue!=null?Zs(r,!!s.multiple,s.defaultValue,!0):Zs(r,!!s.multiple,s.multiple?[]:"",!1))}r[ba]=s}catch(y){Wt(t,t.return,y)}}break;case 6:if(si(e,t),yi(t),i&4){if(t.stateNode===null)throw Error(xe(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(y){Wt(t,t.return,y)}}break;case 3:if(si(e,t),yi(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Ma(e.containerInfo)}catch(y){Wt(t,t.return,y)}break;case 4:si(e,t),yi(t);break;case 13:si(e,t),yi(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(ch=jt())),i&4&&Fp(t);break;case 22:if(u=n!==null&&n.memoizedState!==null,t.mode&1?(_n=(c=_n)||u,si(e,t),_n=c):si(e,t),yi(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!u&&t.mode&1)for(Fe=t,u=t.child;u!==null;){for(h=Fe=u;Fe!==null;){switch(d=Fe,p=d.child,d.tag){case 0:case 11:case 14:case 15:ua(4,d,d.return);break;case 1:qs(d,d.return);var v=d.stateNode;if(typeof v.componentWillUnmount=="function"){i=d,n=d.return;try{e=i,v.props=e.memoizedProps,v.state=e.memoizedState,v.componentWillUnmount()}catch(y){Wt(i,n,y)}}break;case 5:qs(d,d.return);break;case 22:if(d.memoizedState!==null){kp(h);continue}}p!==null?(p.return=d,Fe=p):kp(h)}u=u.sibling}e:for(u=null,h=t;;){if(h.tag===5){if(u===null){u=h;try{r=h.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=h.stateNode,l=h.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=m_("display",o))}catch(y){Wt(t,t.return,y)}}}else if(h.tag===6){if(u===null)try{h.stateNode.nodeValue=c?"":h.memoizedProps}catch(y){Wt(t,t.return,y)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===t)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===t)break e;for(;h.sibling===null;){if(h.return===null||h.return===t)break e;u===h&&(u=null),h=h.return}u===h&&(u=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:si(e,t),yi(t),i&4&&Fp(t);break;case 21:break;default:si(e,t),yi(t)}}function yi(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(H0(n)){var i=n;break e}n=n.return}throw Error(xe(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(va(r,""),i.flags&=-33);var s=Up(t);ld(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=Up(t);ad(t,a,o);break;default:throw Error(xe(161))}}catch(l){Wt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function rS(t,e,n){Fe=t,W0(t)}function W0(t,e,n){for(var i=(t.mode&1)!==0;Fe!==null;){var r=Fe,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||al;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||_n;a=al;var c=_n;if(al=o,(_n=l)&&!c)for(Fe=r;Fe!==null;)o=Fe,l=o.child,o.tag===22&&o.memoizedState!==null?zp(r):l!==null?(l.return=o,Fe=l):zp(r);for(;s!==null;)Fe=s,W0(s),s=s.sibling;Fe=r,al=a,_n=c}Op(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Fe=s):Op(t)}}function Op(t){for(;Fe!==null;){var e=Fe;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:_n||Wc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!_n)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:ci(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Sp(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Sp(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var u=c.memoizedState;if(u!==null){var h=u.dehydrated;h!==null&&Ma(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(xe(163))}_n||e.flags&512&&od(e)}catch(d){Wt(e,e.return,d)}}if(e===t){Fe=null;break}if(n=e.sibling,n!==null){n.return=e.return,Fe=n;break}Fe=e.return}}function kp(t){for(;Fe!==null;){var e=Fe;if(e===t){Fe=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Fe=n;break}Fe=e.return}}function zp(t){for(;Fe!==null;){var e=Fe;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Wc(4,e)}catch(l){Wt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Wt(e,r,l)}}var s=e.return;try{od(e)}catch(l){Wt(e,s,l)}break;case 5:var o=e.return;try{od(e)}catch(l){Wt(e,o,l)}}}catch(l){Wt(e,e.return,l)}if(e===t){Fe=null;break}var a=e.sibling;if(a!==null){a.return=e.return,Fe=a;break}Fe=e.return}}var sS=Math.ceil,yc=Qi.ReactCurrentDispatcher,ah=Qi.ReactCurrentOwner,ni=Qi.ReactCurrentBatchConfig,vt=0,an=null,$t=null,un=0,Vn=0,Ys=Lr(0),en=0,Da=null,es=0,Xc=0,lh=0,fa=null,In=null,ch=0,fo=1/0,ki=null,xc=!1,cd=null,xr=null,ll=!1,hr=null,Sc=0,da=0,ud=null,Kl=-1,Zl=0;function Cn(){return vt&6?jt():Kl!==-1?Kl:Kl=jt()}function Sr(t){return t.mode&1?vt&2&&un!==0?un&-un:Vx.transition!==null?(Zl===0&&(Zl=R_()),Zl):(t=Tt,t!==0||(t=window.event,t=t===void 0?16:U_(t.type)),t):1}function pi(t,e,n,i){if(50<da)throw da=0,ud=null,Error(xe(185));Oa(t,n,i),(!(vt&2)||t!==an)&&(t===an&&(!(vt&2)&&(Xc|=n),en===4&&fr(t,un)),kn(t,i),n===1&&vt===0&&!(e.mode&1)&&(fo=jt()+500,Hc&&Pr()))}function kn(t,e){var n=t.callbackNode;Vy(t,e);var i=rc(t,t===an?un:0);if(i===0)n!==null&&Yh(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&Yh(n),e===1)t.tag===0?Hx(Bp.bind(null,t)):e0(Bp.bind(null,t)),Ox(function(){!(vt&6)&&Pr()}),n=null;else{switch(C_(i)){case 1:n=Ud;break;case 4:n=A_;break;case 16:n=ic;break;case 536870912:n=b_;break;default:n=ic}n=J0(n,X0.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function X0(t,e){if(Kl=-1,Zl=0,vt&6)throw Error(xe(327));var n=t.callbackNode;if(no()&&t.callbackNode!==n)return null;var i=rc(t,t===an?un:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Mc(t,i);else{e=i;var r=vt;vt|=2;var s=q0();(an!==t||un!==e)&&(ki=null,fo=jt()+500,jr(t,e));do try{lS();break}catch(a){j0(t,a)}while(!0);Yd(),yc.current=s,vt=r,$t!==null?e=0:(an=null,un=0,e=en)}if(e!==0){if(e===2&&(r=Of(t),r!==0&&(i=r,e=fd(t,r))),e===1)throw n=Da,jr(t,0),fr(t,i),kn(t,jt()),n;if(e===6)fr(t,i);else{if(r=t.current.alternate,!(i&30)&&!oS(r)&&(e=Mc(t,i),e===2&&(s=Of(t),s!==0&&(i=s,e=fd(t,s))),e===1))throw n=Da,jr(t,0),fr(t,i),kn(t,jt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(xe(345));case 2:kr(t,In,ki);break;case 3:if(fr(t,i),(i&130023424)===i&&(e=ch+500-jt(),10<e)){if(rc(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){Cn(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Xf(kr.bind(null,t,In,ki),e);break}kr(t,In,ki);break;case 4:if(fr(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-hi(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=jt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*sS(i/1960))-i,10<i){t.timeoutHandle=Xf(kr.bind(null,t,In,ki),i);break}kr(t,In,ki);break;case 5:kr(t,In,ki);break;default:throw Error(xe(329))}}}return kn(t,jt()),t.callbackNode===n?X0.bind(null,t):null}function fd(t,e){var n=fa;return t.current.memoizedState.isDehydrated&&(jr(t,e).flags|=256),t=Mc(t,e),t!==2&&(e=In,In=n,e!==null&&dd(e)),t}function dd(t){In===null?In=t:In.push.apply(In,t)}function oS(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!gi(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function fr(t,e){for(e&=~lh,e&=~Xc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-hi(e),i=1<<n;t[n]=-1,e&=~i}}function Bp(t){if(vt&6)throw Error(xe(327));no();var e=rc(t,0);if(!(e&1))return kn(t,jt()),null;var n=Mc(t,e);if(t.tag!==0&&n===2){var i=Of(t);i!==0&&(e=i,n=fd(t,i))}if(n===1)throw n=Da,jr(t,0),fr(t,e),kn(t,jt()),n;if(n===6)throw Error(xe(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,kr(t,In,ki),kn(t,jt()),null}function uh(t,e){var n=vt;vt|=1;try{return t(e)}finally{vt=n,vt===0&&(fo=jt()+500,Hc&&Pr())}}function ts(t){hr!==null&&hr.tag===0&&!(vt&6)&&no();var e=vt;vt|=1;var n=ni.transition,i=Tt;try{if(ni.transition=null,Tt=1,t)return t()}finally{Tt=i,ni.transition=n,vt=e,!(vt&6)&&Pr()}}function fh(){Vn=Ys.current,Ut(Ys)}function jr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,Fx(n)),$t!==null)for(n=$t.return;n!==null;){var i=n;switch(Xd(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&cc();break;case 3:co(),Ut(Fn),Ut(Mn),eh();break;case 5:Qd(i);break;case 4:co();break;case 13:Ut(Ht);break;case 19:Ut(Ht);break;case 10:$d(i.type._context);break;case 22:case 23:fh()}n=n.return}if(an=t,$t=t=Mr(t.current,null),un=Vn=e,en=0,Da=null,lh=Xc=es=0,In=fa=null,Gr!==null){for(e=0;e<Gr.length;e++)if(n=Gr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}Gr=null}return t}function j0(t,e){do{var n=$t;try{if(Yd(),ql.current=vc,_c){for(var i=Vt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}_c=!1}if(Qr=0,on=Jt=Vt=null,ca=!1,La=0,ah.current=null,n===null||n.return===null){en=1,Da=e,$t=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=un,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,u=a,h=u.tag;if(!(u.mode&1)&&(h===0||h===11||h===15)){var d=u.alternate;d?(u.updateQueue=d.updateQueue,u.memoizedState=d.memoizedState,u.lanes=d.lanes):(u.updateQueue=null,u.memoizedState=null)}var p=bp(o);if(p!==null){p.flags&=-257,Rp(p,o,a,s,e),p.mode&1&&Ap(s,c,e),e=p,l=c;var v=e.updateQueue;if(v===null){var y=new Set;y.add(l),e.updateQueue=y}else v.add(l);break e}else{if(!(e&1)){Ap(s,c,e),dh();break e}l=Error(xe(426))}}else if(Ft&&a.mode&1){var m=bp(o);if(m!==null){!(m.flags&65536)&&(m.flags|=256),Rp(m,o,a,s,e),jd(uo(l,a));break e}}s=l=uo(l,a),en!==4&&(en=2),fa===null?fa=[s]:fa.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var f=C0(s,l,e);xp(s,f);break e;case 1:a=l;var _=s.type,g=s.stateNode;if(!(s.flags&128)&&(typeof _.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(xr===null||!xr.has(g)))){s.flags|=65536,e&=-e,s.lanes|=e;var E=L0(s,a,e);xp(s,E);break e}}s=s.return}while(s!==null)}$0(n)}catch(P){e=P,$t===n&&n!==null&&($t=n=n.return);continue}break}while(!0)}function q0(){var t=yc.current;return yc.current=vc,t===null?vc:t}function dh(){(en===0||en===3||en===2)&&(en=4),an===null||!(es&268435455)&&!(Xc&268435455)||fr(an,un)}function Mc(t,e){var n=vt;vt|=2;var i=q0();(an!==t||un!==e)&&(ki=null,jr(t,e));do try{aS();break}catch(r){j0(t,r)}while(!0);if(Yd(),vt=n,yc.current=i,$t!==null)throw Error(xe(261));return an=null,un=0,en}function aS(){for(;$t!==null;)Y0($t)}function lS(){for(;$t!==null&&!Dy();)Y0($t)}function Y0(t){var e=Z0(t.alternate,t,Vn);t.memoizedProps=t.pendingProps,e===null?$0(t):$t=e,ah.current=null}function $0(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=tS(n,e),n!==null){n.flags&=32767,$t=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{en=6,$t=null;return}}else if(n=eS(n,e,Vn),n!==null){$t=n;return}if(e=e.sibling,e!==null){$t=e;return}$t=e=t}while(e!==null);en===0&&(en=5)}function kr(t,e,n){var i=Tt,r=ni.transition;try{ni.transition=null,Tt=1,cS(t,e,n,i)}finally{ni.transition=r,Tt=i}return null}function cS(t,e,n,i){do no();while(hr!==null);if(vt&6)throw Error(xe(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(xe(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(Gy(t,s),t===an&&($t=an=null,un=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ll||(ll=!0,J0(ic,function(){return no(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=ni.transition,ni.transition=null;var o=Tt;Tt=1;var a=vt;vt|=4,ah.current=null,iS(t,n),G0(n,t),Cx(Gf),sc=!!Vf,Gf=Vf=null,t.current=n,rS(n),Iy(),vt=a,Tt=o,ni.transition=s}else t.current=n;if(ll&&(ll=!1,hr=t,Sc=r),s=t.pendingLanes,s===0&&(xr=null),Oy(n.stateNode),kn(t,jt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(xc)throw xc=!1,t=cd,cd=null,t;return Sc&1&&t.tag!==0&&no(),s=t.pendingLanes,s&1?t===ud?da++:(da=0,ud=t):da=0,Pr(),null}function no(){if(hr!==null){var t=C_(Sc),e=ni.transition,n=Tt;try{if(ni.transition=null,Tt=16>t?16:t,hr===null)var i=!1;else{if(t=hr,hr=null,Sc=0,vt&6)throw Error(xe(331));var r=vt;for(vt|=4,Fe=t.current;Fe!==null;){var s=Fe,o=s.child;if(Fe.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(Fe=c;Fe!==null;){var u=Fe;switch(u.tag){case 0:case 11:case 15:ua(8,u,s)}var h=u.child;if(h!==null)h.return=u,Fe=h;else for(;Fe!==null;){u=Fe;var d=u.sibling,p=u.return;if(B0(u),u===c){Fe=null;break}if(d!==null){d.return=p,Fe=d;break}Fe=p}}}var v=s.alternate;if(v!==null){var y=v.child;if(y!==null){v.child=null;do{var m=y.sibling;y.sibling=null,y=m}while(y!==null)}}Fe=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,Fe=o;else e:for(;Fe!==null;){if(s=Fe,s.flags&2048)switch(s.tag){case 0:case 11:case 15:ua(9,s,s.return)}var f=s.sibling;if(f!==null){f.return=s.return,Fe=f;break e}Fe=s.return}}var _=t.current;for(Fe=_;Fe!==null;){o=Fe;var g=o.child;if(o.subtreeFlags&2064&&g!==null)g.return=o,Fe=g;else e:for(o=_;Fe!==null;){if(a=Fe,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Wc(9,a)}}catch(P){Wt(a,a.return,P)}if(a===o){Fe=null;break e}var E=a.sibling;if(E!==null){E.return=a.return,Fe=E;break e}Fe=a.return}}if(vt=r,Pr(),wi&&typeof wi.onPostCommitFiberRoot=="function")try{wi.onPostCommitFiberRoot(Fc,t)}catch{}i=!0}return i}finally{Tt=n,ni.transition=e}}return!1}function Hp(t,e,n){e=uo(n,e),e=C0(t,e,1),t=yr(t,e,1),e=Cn(),t!==null&&(Oa(t,1,e),kn(t,e))}function Wt(t,e,n){if(t.tag===3)Hp(t,t,n);else for(;e!==null;){if(e.tag===3){Hp(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(xr===null||!xr.has(i))){t=uo(n,t),t=L0(e,t,1),e=yr(e,t,1),t=Cn(),e!==null&&(Oa(e,1,t),kn(e,t));break}}e=e.return}}function uS(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=Cn(),t.pingedLanes|=t.suspendedLanes&n,an===t&&(un&n)===n&&(en===4||en===3&&(un&130023424)===un&&500>jt()-ch?jr(t,0):lh|=n),kn(t,e)}function K0(t,e){e===0&&(t.mode&1?(e=Ja,Ja<<=1,!(Ja&130023424)&&(Ja=4194304)):e=1);var n=Cn();t=$i(t,e),t!==null&&(Oa(t,e,n),kn(t,n))}function fS(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),K0(t,n)}function dS(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(xe(314))}i!==null&&i.delete(e),K0(t,n)}var Z0;Z0=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Fn.current)Un=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Un=!1,Qx(t,e,n);Un=!!(t.flags&131072)}else Un=!1,Ft&&e.flags&1048576&&t0(e,dc,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;$l(t,e),t=e.pendingProps;var r=oo(e,Mn.current);to(e,n),r=nh(null,e,i,t,r,n);var s=ih();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,On(i)?(s=!0,uc(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Zd(e),r.updater=Gc,e.stateNode=r,r._reactInternals=e,Jf(e,i,t,n),e=td(null,e,i,!0,s,n)):(e.tag=0,Ft&&s&&Wd(e),An(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch($l(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=pS(i),t=ci(i,t),r){case 0:e=ed(null,e,i,t,n);break e;case 1:e=Pp(null,e,i,t,n);break e;case 11:e=Cp(null,e,i,t,n);break e;case 14:e=Lp(null,e,i,ci(i.type,t),n);break e}throw Error(xe(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ci(i,r),ed(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ci(i,r),Pp(t,e,i,r,n);case 3:e:{if(I0(e),t===null)throw Error(xe(387));i=e.pendingProps,s=e.memoizedState,r=s.element,a0(t,e),mc(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=uo(Error(xe(423)),e),e=Np(t,e,i,n,r);break e}else if(i!==r){r=uo(Error(xe(424)),e),e=Np(t,e,i,n,r);break e}else for(Gn=vr(e.stateNode.containerInfo.firstChild),Wn=e,Ft=!0,fi=null,n=s0(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ao(),i===r){e=Ki(t,e,n);break e}An(t,e,i,n)}e=e.child}return e;case 5:return l0(e),t===null&&$f(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,Wf(i,r)?o=null:s!==null&&Wf(i,s)&&(e.flags|=32),D0(t,e),An(t,e,o,n),e.child;case 6:return t===null&&$f(e),null;case 13:return U0(t,e,n);case 4:return Jd(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=lo(e,null,i,n):An(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ci(i,r),Cp(t,e,i,r,n);case 7:return An(t,e,e.pendingProps,n),e.child;case 8:return An(t,e,e.pendingProps.children,n),e.child;case 12:return An(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,Pt(hc,i._currentValue),i._currentValue=o,s!==null)if(gi(s.value,o)){if(s.children===r.children&&!Fn.current){e=Ki(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=ji(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var u=c.pending;u===null?l.next=l:(l.next=u.next,u.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Kf(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(xe(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Kf(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}An(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,to(e,n),r=ii(r),i=i(r),e.flags|=1,An(t,e,i,n),e.child;case 14:return i=e.type,r=ci(i,e.pendingProps),r=ci(i.type,r),Lp(t,e,i,r,n);case 15:return P0(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ci(i,r),$l(t,e),e.tag=1,On(i)?(t=!0,uc(e)):t=!1,to(e,n),R0(e,i,r),Jf(e,i,r,n),td(null,e,i,!0,t,n);case 19:return F0(t,e,n);case 22:return N0(t,e,n)}throw Error(xe(156,e.tag))};function J0(t,e){return T_(t,e)}function hS(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ti(t,e,n,i){return new hS(t,e,n,i)}function hh(t){return t=t.prototype,!(!t||!t.isReactComponent)}function pS(t){if(typeof t=="function")return hh(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Nd)return 11;if(t===Dd)return 14}return 2}function Mr(t,e){var n=t.alternate;return n===null?(n=ti(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Jl(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")hh(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case ks:return qr(n.children,r,s,e);case Pd:o=8,r|=8;break;case Mf:return t=ti(12,n,e,r|2),t.elementType=Mf,t.lanes=s,t;case Ef:return t=ti(13,n,e,r),t.elementType=Ef,t.lanes=s,t;case wf:return t=ti(19,n,e,r),t.elementType=wf,t.lanes=s,t;case l_:return jc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case o_:o=10;break e;case a_:o=9;break e;case Nd:o=11;break e;case Dd:o=14;break e;case lr:o=16,i=null;break e}throw Error(xe(130,t==null?t:typeof t,""))}return e=ti(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function qr(t,e,n,i){return t=ti(7,t,i,e),t.lanes=n,t}function jc(t,e,n,i){return t=ti(22,t,i,e),t.elementType=l_,t.lanes=n,t.stateNode={isHidden:!1},t}function Iu(t,e,n){return t=ti(6,t,null,e),t.lanes=n,t}function Uu(t,e,n){return e=ti(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function mS(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=mu(0),this.expirationTimes=mu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=mu(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function ph(t,e,n,i,r,s,o,a,l){return t=new mS(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=ti(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Zd(s),t}function gS(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Os,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function Q0(t){if(!t)return br;t=t._reactInternals;e:{if(os(t)!==t||t.tag!==1)throw Error(xe(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(On(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(xe(171))}if(t.tag===1){var n=t.type;if(On(n))return Q_(t,n,e)}return e}function ev(t,e,n,i,r,s,o,a,l){return t=ph(n,i,!0,t,r,s,o,a,l),t.context=Q0(null),n=t.current,i=Cn(),r=Sr(n),s=ji(i,r),s.callback=e??null,yr(n,s,r),t.current.lanes=r,Oa(t,r,i),kn(t,i),t}function qc(t,e,n,i){var r=e.current,s=Cn(),o=Sr(r);return n=Q0(n),e.context===null?e.context=n:e.pendingContext=n,e=ji(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=yr(r,e,o),t!==null&&(pi(t,r,o,s),jl(t,r,o)),o}function Ec(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Vp(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function mh(t,e){Vp(t,e),(t=t.alternate)&&Vp(t,e)}function _S(){return null}var tv=typeof reportError=="function"?reportError:function(t){console.error(t)};function gh(t){this._internalRoot=t}Yc.prototype.render=gh.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(xe(409));qc(t,e,null,null)};Yc.prototype.unmount=gh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;ts(function(){qc(null,t,null,null)}),e[Yi]=null}};function Yc(t){this._internalRoot=t}Yc.prototype.unstable_scheduleHydration=function(t){if(t){var e=N_();t={blockedOn:null,target:t,priority:e};for(var n=0;n<ur.length&&e!==0&&e<ur[n].priority;n++);ur.splice(n,0,t),n===0&&I_(t)}};function _h(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function $c(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Gp(){}function vS(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Ec(o);s.call(c)}}var o=ev(e,i,t,0,null,!1,!1,"",Gp);return t._reactRootContainer=o,t[Yi]=o.current,Ta(t.nodeType===8?t.parentNode:t),ts(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=Ec(l);a.call(c)}}var l=ph(t,0,!1,null,null,!1,!1,"",Gp);return t._reactRootContainer=l,t[Yi]=l.current,Ta(t.nodeType===8?t.parentNode:t),ts(function(){qc(e,l,n,i)}),l}function Kc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=Ec(o);a.call(l)}}qc(e,o,t,r)}else o=vS(n,e,t,r,i);return Ec(o)}L_=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=na(e.pendingLanes);n!==0&&(Fd(e,n|1),kn(e,jt()),!(vt&6)&&(fo=jt()+500,Pr()))}break;case 13:ts(function(){var i=$i(t,1);if(i!==null){var r=Cn();pi(i,t,1,r)}}),mh(t,1)}};Od=function(t){if(t.tag===13){var e=$i(t,134217728);if(e!==null){var n=Cn();pi(e,t,134217728,n)}mh(t,134217728)}};P_=function(t){if(t.tag===13){var e=Sr(t),n=$i(t,e);if(n!==null){var i=Cn();pi(n,t,e,i)}mh(t,e)}};N_=function(){return Tt};D_=function(t,e){var n=Tt;try{return Tt=t,e()}finally{Tt=n}};If=function(t,e,n){switch(e){case"input":if(bf(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Bc(i);if(!r)throw Error(xe(90));u_(i),bf(i,r)}}}break;case"textarea":d_(t,n);break;case"select":e=n.value,e!=null&&Zs(t,!!n.multiple,e,!1)}};y_=uh;x_=ts;var yS={usingClientEntryPoint:!1,Events:[za,Vs,Bc,__,v_,uh]},Xo={findFiberByHostInstance:Vr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},xS={bundleType:Xo.bundleType,version:Xo.version,rendererPackageName:Xo.rendererPackageName,rendererConfig:Xo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Qi.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=E_(t),t===null?null:t.stateNode},findFiberByHostInstance:Xo.findFiberByHostInstance||_S,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var cl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!cl.isDisabled&&cl.supportsFiber)try{Fc=cl.inject(xS),wi=cl}catch{}}jn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=yS;jn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!_h(e))throw Error(xe(200));return gS(t,e,null,n)};jn.createRoot=function(t,e){if(!_h(t))throw Error(xe(299));var n=!1,i="",r=tv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=ph(t,1,!1,null,null,n,!1,i,r),t[Yi]=e.current,Ta(t.nodeType===8?t.parentNode:t),new gh(e)};jn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(xe(188)):(t=Object.keys(t).join(","),Error(xe(268,t)));return t=E_(e),t=t===null?null:t.stateNode,t};jn.flushSync=function(t){return ts(t)};jn.hydrate=function(t,e,n){if(!$c(e))throw Error(xe(200));return Kc(null,t,e,!0,n)};jn.hydrateRoot=function(t,e,n){if(!_h(t))throw Error(xe(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=tv;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=ev(e,null,t,1,n??null,r,!1,s,o),t[Yi]=e.current,Ta(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new Yc(e)};jn.render=function(t,e,n){if(!$c(e))throw Error(xe(200));return Kc(null,t,e,!1,n)};jn.unmountComponentAtNode=function(t){if(!$c(t))throw Error(xe(40));return t._reactRootContainer?(ts(function(){Kc(null,null,t,!1,function(){t._reactRootContainer=null,t[Yi]=null})}),!0):!1};jn.unstable_batchedUpdates=uh;jn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!$c(n))throw Error(xe(200));if(t==null||t._reactInternals===void 0)throw Error(xe(38));return Kc(t,e,n,!1,i)};jn.version="18.3.1-next-f1338f8080-20240426";function nv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(nv)}catch(t){console.error(t)}}nv(),n_.exports=jn;var SS=n_.exports,iv,Wp=SS;iv=Wp.createRoot,Wp.hydrateRoot;/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const vh="160",hs={ROTATE:0,DOLLY:1,PAN:2},ps={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},MS=0,Xp=1,ES=2,rv=1,wS=2,Oi=3,Zi=0,zn=1,di=2,Er=0,io=1,jp=2,qp=3,Yp=4,TS=5,Br=100,AS=101,bS=102,$p=103,Kp=104,RS=200,CS=201,LS=202,PS=203,hd=204,pd=205,NS=206,DS=207,IS=208,US=209,FS=210,OS=211,kS=212,zS=213,BS=214,HS=0,VS=1,GS=2,wc=3,WS=4,XS=5,jS=6,qS=7,Zc=0,YS=1,$S=2,wr=0,KS=1,ZS=2,JS=3,QS=4,eM=5,tM=6,Zp="attached",nM="detached",sv=300,ho=301,po=302,md=303,gd=304,Jc=306,Xr=1e3,Rn=1001,_d=1002,cn=1003,Jp=1004,Fu=1005,bn=1006,iM=1007,ns=1008,Tr=1009,rM=1010,sM=1011,yh=1012,ov=1013,pr=1014,Gi=1015,Ia=1016,av=1017,lv=1018,Yr=1020,oM=1021,Qn=1023,aM=1024,lM=1025,$r=1026,mo=1027,cM=1028,cv=1029,uM=1030,uv=1031,fv=1033,Ou=33776,ku=33777,zu=33778,Bu=33779,Qp=35840,em=35841,tm=35842,nm=35843,dv=36196,im=37492,rm=37496,sm=37808,om=37809,am=37810,lm=37811,cm=37812,um=37813,fm=37814,dm=37815,hm=37816,pm=37817,mm=37818,gm=37819,_m=37820,vm=37821,Hu=36492,ym=36494,xm=36495,fM=36283,Sm=36284,Mm=36285,Em=36286,Tc=2300,Ac=2301,Vu=2302,wm=2400,Tm=2401,Am=2402,dM=2500,hv=3e3,Kr=3001,hM=3200,pM=3201,Qc=0,mM=1,ei="",Xt="srgb",Ji="srgb-linear",xh="display-p3",eu="display-p3-linear",bc="linear",It="srgb",Rc="rec709",Cc="p3",ms=7680,bm=519,gM=512,_M=513,vM=514,pv=515,yM=516,xM=517,SM=518,MM=519,vd=35044,Rm="300 es",yd=1035,Wi=2e3,Lc=2001;class as{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Cm=1234567;const ha=Math.PI/180,go=180/Math.PI;function mi(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(mn[t&255]+mn[t>>8&255]+mn[t>>16&255]+mn[t>>24&255]+"-"+mn[e&255]+mn[e>>8&255]+"-"+mn[e>>16&15|64]+mn[e>>24&255]+"-"+mn[n&63|128]+mn[n>>8&255]+"-"+mn[n>>16&255]+mn[n>>24&255]+mn[i&255]+mn[i>>8&255]+mn[i>>16&255]+mn[i>>24&255]).toLowerCase()}function vn(t,e,n){return Math.max(e,Math.min(n,t))}function Sh(t,e){return(t%e+e)%e}function EM(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)}function wM(t,e,n){return t!==e?(n-t)/(e-t):0}function pa(t,e,n){return(1-n)*t+n*e}function TM(t,e,n,i){return pa(t,e,1-Math.exp(-n*i))}function AM(t,e=1){return e-Math.abs(Sh(t,e*2)-e)}function bM(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function RM(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function CM(t,e){return t+Math.floor(Math.random()*(e-t+1))}function LM(t,e){return t+Math.random()*(e-t)}function PM(t){return t*(.5-Math.random())}function NM(t){t!==void 0&&(Cm=t);let e=Cm+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function DM(t){return t*ha}function IM(t){return t*go}function xd(t){return(t&t-1)===0&&t!==0}function UM(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function Pc(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function FM(t,e,n,i,r){const s=Math.cos,o=Math.sin,a=s(n/2),l=o(n/2),c=s((e+i)/2),u=o((e+i)/2),h=s((e-i)/2),d=o((e-i)/2),p=s((i-e)/2),v=o((i-e)/2);switch(r){case"XYX":t.set(a*u,l*h,l*d,a*c);break;case"YZY":t.set(l*d,a*u,l*h,a*c);break;case"ZXZ":t.set(l*h,l*d,a*u,a*c);break;case"XZX":t.set(a*u,l*v,l*p,a*c);break;case"YXY":t.set(l*p,a*u,l*v,a*c);break;case"ZYZ":t.set(l*v,l*p,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ei(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function At(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const Fs={DEG2RAD:ha,RAD2DEG:go,generateUUID:mi,clamp:vn,euclideanModulo:Sh,mapLinear:EM,inverseLerp:wM,lerp:pa,damp:TM,pingpong:AM,smoothstep:bM,smootherstep:RM,randInt:CM,randFloat:LM,randFloatSpread:PM,seededRandom:NM,degToRad:DM,radToDeg:IM,isPowerOfTwo:xd,ceilPowerOfTwo:UM,floorPowerOfTwo:Pc,setQuaternionFromProperEuler:FM,normalize:At,denormalize:Ei};class Ke{constructor(e=0,n=0){Ke.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(vn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class mt{constructor(e,n,i,r,s,o,a,l,c){mt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=n,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],d=i[2],p=i[5],v=i[8],y=r[0],m=r[3],f=r[6],_=r[1],g=r[4],E=r[7],P=r[2],C=r[5],b=r[8];return s[0]=o*y+a*_+l*P,s[3]=o*m+a*g+l*C,s[6]=o*f+a*E+l*b,s[1]=c*y+u*_+h*P,s[4]=c*m+u*g+h*C,s[7]=c*f+u*E+h*b,s[2]=d*y+p*_+v*P,s[5]=d*m+p*g+v*C,s[8]=d*f+p*E+v*b,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return n*o*u-n*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,d=a*l-u*s,p=c*s-o*l,v=n*h+i*d+r*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/v;return e[0]=h*y,e[1]=(r*c-u*i)*y,e[2]=(a*i-r*o)*y,e[3]=d*y,e[4]=(u*n-r*l)*y,e[5]=(r*s-a*n)*y,e[6]=p*y,e[7]=(i*l-c*n)*y,e[8]=(o*n-i*s)*y,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(Gu.makeScale(e,n)),this}rotate(e){return this.premultiply(Gu.makeRotation(-e)),this}translate(e,n){return this.premultiply(Gu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Gu=new mt;function mv(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Ua(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function OM(){const t=Ua("canvas");return t.style.display="block",t}const Lm={};function ma(t){t in Lm||(Lm[t]=!0,console.warn(t))}const Pm=new mt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Nm=new mt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ul={[Ji]:{transfer:bc,primaries:Rc,toReference:t=>t,fromReference:t=>t},[Xt]:{transfer:It,primaries:Rc,toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[eu]:{transfer:bc,primaries:Cc,toReference:t=>t.applyMatrix3(Nm),fromReference:t=>t.applyMatrix3(Pm)},[xh]:{transfer:It,primaries:Cc,toReference:t=>t.convertSRGBToLinear().applyMatrix3(Nm),fromReference:t=>t.applyMatrix3(Pm).convertLinearToSRGB()}},kM=new Set([Ji,eu]),bt={enabled:!0,_workingColorSpace:Ji,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!kM.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=ul[e].toReference,r=ul[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return ul[t].primaries},getTransfer:function(t){return t===ei?bc:ul[t].transfer}};function ro(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Wu(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let gs;class gv{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{gs===void 0&&(gs=Ua("canvas")),gs.width=e.width,gs.height=e.height;const i=gs.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=gs}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Ua("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=ro(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(ro(n[i]/255)*255):n[i]=ro(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let zM=0;class _v{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zM++}),this.uuid=mi(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Xu(r[o].image)):s.push(Xu(r[o]))}else s=Xu(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Xu(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?gv.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let BM=0;class xn extends as{constructor(e=xn.DEFAULT_IMAGE,n=xn.DEFAULT_MAPPING,i=Rn,r=Rn,s=bn,o=ns,a=Qn,l=Tr,c=xn.DEFAULT_ANISOTROPY,u=ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:BM++}),this.uuid=mi(),this.name="",this.source=new _v(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ke(0,0),this.repeat=new Ke(1,1),this.center=new Ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new mt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(ma("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Kr?Xt:ei),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==sv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Xr:e.x=e.x-Math.floor(e.x);break;case Rn:e.x=e.x<0?0:1;break;case _d:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Xr:e.y=e.y-Math.floor(e.y);break;case Rn:e.y=e.y<0?0:1;break;case _d:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ma("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Xt?Kr:hv}set encoding(e){ma("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Kr?Xt:ei}}xn.DEFAULT_IMAGE=null;xn.DEFAULT_MAPPING=sv;xn.DEFAULT_ANISOTROPY=1;class Rt{constructor(e=0,n=0,i=0,r=1){Rt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],p=l[5],v=l[9],y=l[2],m=l[6],f=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-y)<.01&&Math.abs(v-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+y)<.1&&Math.abs(v+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const g=(c+1)/2,E=(p+1)/2,P=(f+1)/2,C=(u+d)/4,b=(h+y)/4,U=(v+m)/4;return g>E&&g>P?g<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(g),r=C/i,s=b/i):E>P?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=C/r,s=U/r):P<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),i=b/s,r=U/s),this.set(i,r,s,n),this}let _=Math.sqrt((m-v)*(m-v)+(h-y)*(h-y)+(d-u)*(d-u));return Math.abs(_)<.001&&(_=1),this.x=(m-v)/_,this.y=(h-y)/_,this.z=(d-u)/_,this.w=Math.acos((c+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class HM extends as{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Rt(0,0,e,n),this.scissorTest=!1,this.viewport=new Rt(0,0,e,n);const r={width:e,height:n,depth:1};i.encoding!==void 0&&(ma("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Kr?Xt:ei),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new xn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,n,i=1){(this.width!==e||this.height!==n||this.depth!==i)&&(this.width=e,this.height=n,this.depth=i,this.texture.image.width=e,this.texture.image.height=n,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new _v(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class is extends HM{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class vv extends xn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=cn,this.minFilter=cn,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class VM extends xn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=cn,this.minFilter=cn,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _i{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3];const d=s[o+0],p=s[o+1],v=s[o+2],y=s[o+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=u,e[n+3]=h;return}if(a===1){e[n+0]=d,e[n+1]=p,e[n+2]=v,e[n+3]=y;return}if(h!==y||l!==d||c!==p||u!==v){let m=1-a;const f=l*d+c*p+u*v+h*y,_=f>=0?1:-1,g=1-f*f;if(g>Number.EPSILON){const P=Math.sqrt(g),C=Math.atan2(P,f*_);m=Math.sin(m*C)/P,a=Math.sin(a*C)/P}const E=a*_;if(l=l*m+d*E,c=c*m+p*E,u=u*m+v*E,h=h*m+y*E,m===1-a){const P=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=P,c*=P,u*=P,h*=P}}e[n]=l,e[n+1]=c,e[n+2]=u,e[n+3]=h}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[o],d=s[o+1],p=s[o+2],v=s[o+3];return e[n]=a*v+u*h+l*p-c*d,e[n+1]=l*v+u*d+c*h-a*p,e[n+2]=c*v+u*p+a*d-l*h,e[n+3]=u*v-a*h-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),h=a(s/2),d=l(i/2),p=l(r/2),v=l(s/2);switch(o){case"XYZ":this._x=d*u*h+c*p*v,this._y=c*p*h-d*u*v,this._z=c*u*v+d*p*h,this._w=c*u*h-d*p*v;break;case"YXZ":this._x=d*u*h+c*p*v,this._y=c*p*h-d*u*v,this._z=c*u*v-d*p*h,this._w=c*u*h+d*p*v;break;case"ZXY":this._x=d*u*h-c*p*v,this._y=c*p*h+d*u*v,this._z=c*u*v+d*p*h,this._w=c*u*h-d*p*v;break;case"ZYX":this._x=d*u*h-c*p*v,this._y=c*p*h+d*u*v,this._z=c*u*v-d*p*h,this._w=c*u*h+d*p*v;break;case"YZX":this._x=d*u*h+c*p*v,this._y=c*p*h+d*u*v,this._z=c*u*v-d*p*h,this._w=c*u*h-d*p*v;break;case"XZY":this._x=d*u*h-c*p*v,this._y=c*p*h-d*u*v,this._z=c*u*v+d*p*h,this._w=c*u*h+d*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],u=n[6],h=n[10],d=i+a+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>h){const p=2*Math.sqrt(1+i-a-h);this._w=(u-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>h){const p=2*Math.sqrt(1+a-i-h);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(vn(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-n)*u)/c,d=Math.sin(n*u)/c;return this._w=o*h+this._w*d,this._x=i*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=Math.random(),n=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(n*Math.cos(r),i*Math.sin(s),i*Math.cos(s),n*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(e=0,n=0,i=0){B.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Dm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Dm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*n-s*r),h=2*(s*i-o*n);return this.x=n+l*c+o*h-a*u,this.y=i+l*u+a*c-s*h,this.z=r+l*h+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ju.copy(this).projectOnVector(e),this.sub(ju)}reflect(e){return this.sub(ju.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(vn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,n=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(n),this.y=i*Math.sin(n),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ju=new B,Dm=new _i;class wo{constructor(e=new B(1/0,1/0,1/0),n=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(oi.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(oi.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=oi.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,oi):oi.fromBufferAttribute(s,o),oi.applyMatrix4(e.matrixWorld),this.expandByPoint(oi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),fl.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),fl.copy(i.boundingBox)),fl.applyMatrix4(e.matrixWorld),this.union(fl)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,oi),oi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(jo),dl.subVectors(this.max,jo),_s.subVectors(e.a,jo),vs.subVectors(e.b,jo),ys.subVectors(e.c,jo),ir.subVectors(vs,_s),rr.subVectors(ys,vs),Dr.subVectors(_s,ys);let n=[0,-ir.z,ir.y,0,-rr.z,rr.y,0,-Dr.z,Dr.y,ir.z,0,-ir.x,rr.z,0,-rr.x,Dr.z,0,-Dr.x,-ir.y,ir.x,0,-rr.y,rr.x,0,-Dr.y,Dr.x,0];return!qu(n,_s,vs,ys,dl)||(n=[1,0,0,0,1,0,0,0,1],!qu(n,_s,vs,ys,dl))?!1:(hl.crossVectors(ir,rr),n=[hl.x,hl.y,hl.z],qu(n,_s,vs,ys,dl))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,oi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(oi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Pi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Pi=[new B,new B,new B,new B,new B,new B,new B,new B],oi=new B,fl=new wo,_s=new B,vs=new B,ys=new B,ir=new B,rr=new B,Dr=new B,jo=new B,dl=new B,hl=new B,Ir=new B;function qu(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){Ir.fromArray(t,s);const a=r.x*Math.abs(Ir.x)+r.y*Math.abs(Ir.y)+r.z*Math.abs(Ir.z),l=e.dot(Ir),c=n.dot(Ir),u=i.dot(Ir);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const GM=new wo,qo=new B,Yu=new B;class ls{constructor(e=new B,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):GM.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;qo.subVectors(e,this.center);const n=qo.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(qo,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Yu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(qo.copy(e.center).add(Yu)),this.expandByPoint(qo.copy(e.center).sub(Yu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ni=new B,$u=new B,pl=new B,sr=new B,Ku=new B,ml=new B,Zu=new B;class To{constructor(e=new B,n=new B(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ni)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Ni.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Ni.copy(this.origin).addScaledVector(this.direction,n),Ni.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){$u.copy(e).add(n).multiplyScalar(.5),pl.copy(n).sub(e).normalize(),sr.copy(this.origin).sub($u);const s=e.distanceTo(n)*.5,o=-this.direction.dot(pl),a=sr.dot(this.direction),l=-sr.dot(pl),c=sr.lengthSq(),u=Math.abs(1-o*o);let h,d,p,v;if(u>0)if(h=o*l-a,d=o*a-l,v=s*u,h>=0)if(d>=-v)if(d<=v){const y=1/u;h*=y,d*=y,p=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=s,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*l)+c;else d<=-v?(h=Math.max(0,-(-o*s+a)),d=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+d*(d+2*l)+c):d<=v?(h=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(h=Math.max(0,-(o*s+a)),d=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+d*(d+2*l)+c);else d=o>0?-s:s,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy($u).addScaledVector(pl,d),p}intersectSphere(e,n){Ni.subVectors(e.center,this.origin);const i=Ni.dot(this.direction),r=Ni.dot(Ni)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Ni)!==null}intersectTriangle(e,n,i,r,s){Ku.subVectors(n,e),ml.subVectors(i,e),Zu.crossVectors(Ku,ml);let o=this.direction.dot(Zu),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;sr.subVectors(this.origin,e);const l=a*this.direction.dot(ml.crossVectors(sr,ml));if(l<0)return null;const c=a*this.direction.dot(Ku.cross(sr));if(c<0||l+c>o)return null;const u=-a*sr.dot(Zu);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class dt{constructor(e,n,i,r,s,o,a,l,c,u,h,d,p,v,y,m){dt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,u,h,d,p,v,y,m)}set(e,n,i,r,s,o,a,l,c,u,h,d,p,v,y,m){const f=this.elements;return f[0]=e,f[4]=n,f[8]=i,f[12]=r,f[1]=s,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=u,f[10]=h,f[14]=d,f[3]=p,f[7]=v,f[11]=y,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new dt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/xs.setFromMatrixColumn(e,0).length(),s=1/xs.setFromMatrixColumn(e,1).length(),o=1/xs.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=o*u,p=o*h,v=a*u,y=a*h;n[0]=l*u,n[4]=-l*h,n[8]=c,n[1]=p+v*c,n[5]=d-y*c,n[9]=-a*l,n[2]=y-d*c,n[6]=v+p*c,n[10]=o*l}else if(e.order==="YXZ"){const d=l*u,p=l*h,v=c*u,y=c*h;n[0]=d+y*a,n[4]=v*a-p,n[8]=o*c,n[1]=o*h,n[5]=o*u,n[9]=-a,n[2]=p*a-v,n[6]=y+d*a,n[10]=o*l}else if(e.order==="ZXY"){const d=l*u,p=l*h,v=c*u,y=c*h;n[0]=d-y*a,n[4]=-o*h,n[8]=v+p*a,n[1]=p+v*a,n[5]=o*u,n[9]=y-d*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const d=o*u,p=o*h,v=a*u,y=a*h;n[0]=l*u,n[4]=v*c-p,n[8]=d*c+y,n[1]=l*h,n[5]=y*c+d,n[9]=p*c-v,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const d=o*l,p=o*c,v=a*l,y=a*c;n[0]=l*u,n[4]=y-d*h,n[8]=v*h+p,n[1]=h,n[5]=o*u,n[9]=-a*u,n[2]=-c*u,n[6]=p*h+v,n[10]=d-y*h}else if(e.order==="XZY"){const d=o*l,p=o*c,v=a*l,y=a*c;n[0]=l*u,n[4]=-h,n[8]=c*u,n[1]=d*h+y,n[5]=o*u,n[9]=p*h-v,n[2]=v*h-p,n[6]=a*u,n[10]=y*h+d}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(WM,e,XM)}lookAt(e,n,i){const r=this.elements;return Bn.subVectors(e,n),Bn.lengthSq()===0&&(Bn.z=1),Bn.normalize(),or.crossVectors(i,Bn),or.lengthSq()===0&&(Math.abs(i.z)===1?Bn.x+=1e-4:Bn.z+=1e-4,Bn.normalize(),or.crossVectors(i,Bn)),or.normalize(),gl.crossVectors(Bn,or),r[0]=or.x,r[4]=gl.x,r[8]=Bn.x,r[1]=or.y,r[5]=gl.y,r[9]=Bn.y,r[2]=or.z,r[6]=gl.z,r[10]=Bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],d=i[9],p=i[13],v=i[2],y=i[6],m=i[10],f=i[14],_=i[3],g=i[7],E=i[11],P=i[15],C=r[0],b=r[4],U=r[8],M=r[12],T=r[1],H=r[5],V=r[9],ie=r[13],k=r[2],X=r[6],z=r[10],ne=r[14],O=r[3],G=r[7],j=r[11],re=r[15];return s[0]=o*C+a*T+l*k+c*O,s[4]=o*b+a*H+l*X+c*G,s[8]=o*U+a*V+l*z+c*j,s[12]=o*M+a*ie+l*ne+c*re,s[1]=u*C+h*T+d*k+p*O,s[5]=u*b+h*H+d*X+p*G,s[9]=u*U+h*V+d*z+p*j,s[13]=u*M+h*ie+d*ne+p*re,s[2]=v*C+y*T+m*k+f*O,s[6]=v*b+y*H+m*X+f*G,s[10]=v*U+y*V+m*z+f*j,s[14]=v*M+y*ie+m*ne+f*re,s[3]=_*C+g*T+E*k+P*O,s[7]=_*b+g*H+E*X+P*G,s[11]=_*U+g*V+E*z+P*j,s[15]=_*M+g*ie+E*ne+P*re,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],p=e[14],v=e[3],y=e[7],m=e[11],f=e[15];return v*(+s*l*h-r*c*h-s*a*d+i*c*d+r*a*p-i*l*p)+y*(+n*l*p-n*c*d+s*o*d-r*o*p+r*c*u-s*l*u)+m*(+n*c*h-n*a*p-s*o*h+i*o*p+s*a*u-i*c*u)+f*(-r*a*u-n*l*h+n*a*d+r*o*h-i*o*d+i*l*u)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],p=e[11],v=e[12],y=e[13],m=e[14],f=e[15],_=h*m*c-y*d*c+y*l*p-a*m*p-h*l*f+a*d*f,g=v*d*c-u*m*c-v*l*p+o*m*p+u*l*f-o*d*f,E=u*y*c-v*h*c+v*a*p-o*y*p-u*a*f+o*h*f,P=v*h*l-u*y*l-v*a*d+o*y*d+u*a*m-o*h*m,C=n*_+i*g+r*E+s*P;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/C;return e[0]=_*b,e[1]=(y*d*s-h*m*s-y*r*p+i*m*p+h*r*f-i*d*f)*b,e[2]=(a*m*s-y*l*s+y*r*c-i*m*c-a*r*f+i*l*f)*b,e[3]=(h*l*s-a*d*s-h*r*c+i*d*c+a*r*p-i*l*p)*b,e[4]=g*b,e[5]=(u*m*s-v*d*s+v*r*p-n*m*p-u*r*f+n*d*f)*b,e[6]=(v*l*s-o*m*s-v*r*c+n*m*c+o*r*f-n*l*f)*b,e[7]=(o*d*s-u*l*s+u*r*c-n*d*c-o*r*p+n*l*p)*b,e[8]=E*b,e[9]=(v*h*s-u*y*s-v*i*p+n*y*p+u*i*f-n*h*f)*b,e[10]=(o*y*s-v*a*s+v*i*c-n*y*c-o*i*f+n*a*f)*b,e[11]=(u*a*s-o*h*s-u*i*c+n*h*c+o*i*p-n*a*p)*b,e[12]=P*b,e[13]=(u*y*r-v*h*r+v*i*d-n*y*d-u*i*m+n*h*m)*b,e[14]=(v*a*r-o*y*r-v*i*l+n*y*l+o*i*m-n*a*m)*b,e[15]=(o*h*r-u*a*r+u*i*l-n*h*l-o*i*d+n*a*d)*b,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,u=o+o,h=a+a,d=s*c,p=s*u,v=s*h,y=o*u,m=o*h,f=a*h,_=l*c,g=l*u,E=l*h,P=i.x,C=i.y,b=i.z;return r[0]=(1-(y+f))*P,r[1]=(p+E)*P,r[2]=(v-g)*P,r[3]=0,r[4]=(p-E)*C,r[5]=(1-(d+f))*C,r[6]=(m+_)*C,r[7]=0,r[8]=(v+g)*b,r[9]=(m-_)*b,r[10]=(1-(d+y))*b,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=xs.set(r[0],r[1],r[2]).length();const o=xs.set(r[4],r[5],r[6]).length(),a=xs.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],ai.copy(this);const c=1/s,u=1/o,h=1/a;return ai.elements[0]*=c,ai.elements[1]*=c,ai.elements[2]*=c,ai.elements[4]*=u,ai.elements[5]*=u,ai.elements[6]*=u,ai.elements[8]*=h,ai.elements[9]*=h,ai.elements[10]*=h,n.setFromRotationMatrix(ai),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=Wi){const l=this.elements,c=2*s/(n-e),u=2*s/(i-r),h=(n+e)/(n-e),d=(i+r)/(i-r);let p,v;if(a===Wi)p=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===Lc)p=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=Wi){const l=this.elements,c=1/(n-e),u=1/(i-r),h=1/(o-s),d=(n+e)*c,p=(i+r)*u;let v,y;if(a===Wi)v=(o+s)*h,y=-2*h;else if(a===Lc)v=s*h,y=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=y,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const xs=new B,ai=new dt,WM=new B(0,0,0),XM=new B(1,1,1),or=new B,gl=new B,Bn=new B,Im=new dt,Um=new _i;class Ao{constructor(e=0,n=0,i=0,r=Ao.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],h=r[2],d=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(vn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-vn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(vn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-vn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(vn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-vn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Im.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Im,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Um.setFromEuler(this),this.setFromQuaternion(Um,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ao.DEFAULT_ORDER="XYZ";class Mh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let jM=0;const Fm=new B,Ss=new _i,Di=new dt,_l=new B,Yo=new B,qM=new B,YM=new _i,Om=new B(1,0,0),km=new B(0,1,0),zm=new B(0,0,1),$M={type:"added"},KM={type:"removed"};class Ot extends as{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jM++}),this.uuid=mi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ot.DEFAULT_UP.clone();const e=new B,n=new Ao,i=new _i,r=new B(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new dt},normalMatrix:{value:new mt}}),this.matrix=new dt,this.matrixWorld=new dt,this.matrixAutoUpdate=Ot.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Mh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Ss.setFromAxisAngle(e,n),this.quaternion.multiply(Ss),this}rotateOnWorldAxis(e,n){return Ss.setFromAxisAngle(e,n),this.quaternion.premultiply(Ss),this}rotateX(e){return this.rotateOnAxis(Om,e)}rotateY(e){return this.rotateOnAxis(km,e)}rotateZ(e){return this.rotateOnAxis(zm,e)}translateOnAxis(e,n){return Fm.copy(e).applyQuaternion(this.quaternion),this.position.add(Fm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Om,e)}translateY(e){return this.translateOnAxis(km,e)}translateZ(e){return this.translateOnAxis(zm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Di.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?_l.copy(e):_l.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Yo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Di.lookAt(Yo,_l,this.up):Di.lookAt(_l,Yo,this.up),this.quaternion.setFromRotationMatrix(Di),r&&(Di.extractRotation(r.matrixWorld),Ss.setFromRotationMatrix(Di),this.quaternion.premultiply(Ss.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent($M)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(KM)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Di.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Di.multiply(e.parent.matrixWorld)),e.applyMatrix4(Di),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yo,e,qM),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yo,YM,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++){const s=n[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),p=o(e.animations),v=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Ot.DEFAULT_UP=new B(0,1,0);Ot.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const li=new B,Ii=new B,Ju=new B,Ui=new B,Ms=new B,Es=new B,Bm=new B,Qu=new B,ef=new B,tf=new B;let vl=!1;class Jn{constructor(e=new B,n=new B,i=new B){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),li.subVectors(e,n),r.cross(li);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){li.subVectors(r,n),Ii.subVectors(i,n),Ju.subVectors(e,n);const o=li.dot(li),a=li.dot(Ii),l=li.dot(Ju),c=Ii.dot(Ii),u=Ii.dot(Ju),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const d=1/h,p=(c*l-a*u)*d,v=(o*u-a*l)*d;return s.set(1-p-v,v,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Ui)===null?!1:Ui.x>=0&&Ui.y>=0&&Ui.x+Ui.y<=1}static getUV(e,n,i,r,s,o,a,l){return vl===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),vl=!0),this.getInterpolation(e,n,i,r,s,o,a,l)}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,Ui)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ui.x),l.addScaledVector(o,Ui.y),l.addScaledVector(a,Ui.z),l)}static isFrontFacing(e,n,i,r){return li.subVectors(i,n),Ii.subVectors(e,n),li.cross(Ii).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return li.subVectors(this.c,this.b),Ii.subVectors(this.a,this.b),li.cross(Ii).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Jn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Jn.getBarycoord(e,this.a,this.b,this.c,n)}getUV(e,n,i,r,s){return vl===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),vl=!0),Jn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}getInterpolation(e,n,i,r,s){return Jn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Jn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Jn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;Ms.subVectors(r,i),Es.subVectors(s,i),Qu.subVectors(e,i);const l=Ms.dot(Qu),c=Es.dot(Qu);if(l<=0&&c<=0)return n.copy(i);ef.subVectors(e,r);const u=Ms.dot(ef),h=Es.dot(ef);if(u>=0&&h<=u)return n.copy(r);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),n.copy(i).addScaledVector(Ms,o);tf.subVectors(e,s);const p=Ms.dot(tf),v=Es.dot(tf);if(v>=0&&p<=v)return n.copy(s);const y=p*c-l*v;if(y<=0&&c>=0&&v<=0)return a=c/(c-v),n.copy(i).addScaledVector(Es,a);const m=u*v-p*h;if(m<=0&&h-u>=0&&p-v>=0)return Bm.subVectors(s,r),a=(h-u)/(h-u+(p-v)),n.copy(r).addScaledVector(Bm,a);const f=1/(m+y+d);return o=y*f,a=d*f,n.copy(i).addScaledVector(Ms,o).addScaledVector(Es,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const yv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ar={h:0,s:0,l:0},yl={h:0,s:0,l:0};function nf(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class ot{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Xt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,bt.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=bt.workingColorSpace){return this.r=e,this.g=n,this.b=i,bt.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=bt.workingColorSpace){if(e=Sh(e,1),n=vn(n,0,1),i=vn(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=nf(o,s,e+1/3),this.g=nf(o,s,e),this.b=nf(o,s,e-1/3)}return bt.toWorkingColorSpace(this,r),this}setStyle(e,n=Xt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Xt){const i=yv[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ro(e.r),this.g=ro(e.g),this.b=ro(e.b),this}copyLinearToSRGB(e){return this.r=Wu(e.r),this.g=Wu(e.g),this.b=Wu(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Xt){return bt.fromWorkingColorSpace(gn.copy(this),e),Math.round(vn(gn.r*255,0,255))*65536+Math.round(vn(gn.g*255,0,255))*256+Math.round(vn(gn.b*255,0,255))}getHexString(e=Xt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=bt.workingColorSpace){bt.fromWorkingColorSpace(gn.copy(this),n);const i=gn.r,r=gn.g,s=gn.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,n=bt.workingColorSpace){return bt.fromWorkingColorSpace(gn.copy(this),n),e.r=gn.r,e.g=gn.g,e.b=gn.b,e}getStyle(e=Xt){bt.fromWorkingColorSpace(gn.copy(this),e);const n=gn.r,i=gn.g,r=gn.b;return e!==Xt?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(ar),this.setHSL(ar.h+e,ar.s+n,ar.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(ar),e.getHSL(yl);const i=pa(ar.h,yl.h,n),r=pa(ar.s,yl.s,n),s=pa(ar.l,yl.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const gn=new ot;ot.NAMES=yv;let ZM=0;class Ai extends as{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ZM++}),this.uuid=mi(),this.name="",this.type="Material",this.blending=io,this.side=Zi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=hd,this.blendDst=pd,this.blendEquation=Br,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ot(0,0,0),this.blendAlpha=0,this.depthFunc=wc,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=bm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ms,this.stencilZFail=ms,this.stencilZPass=ms,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==io&&(i.blending=this.blending),this.side!==Zi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==hd&&(i.blendSrc=this.blendSrc),this.blendDst!==pd&&(i.blendDst=this.blendDst),this.blendEquation!==Br&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==wc&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==bm&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ms&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ms&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ms&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class _o extends Ai{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Zc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Yt=new B,xl=new Ke;class Sn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=vd,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Gi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)xl.fromBufferAttribute(this,n),xl.applyMatrix3(e),this.setXY(n,xl.x,xl.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Yt.fromBufferAttribute(this,n),Yt.applyMatrix3(e),this.setXYZ(n,Yt.x,Yt.y,Yt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Yt.fromBufferAttribute(this,n),Yt.applyMatrix4(e),this.setXYZ(n,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Yt.fromBufferAttribute(this,n),Yt.applyNormalMatrix(e),this.setXYZ(n,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Yt.fromBufferAttribute(this,n),Yt.transformDirection(e),this.setXYZ(n,Yt.x,Yt.y,Yt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Ei(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=At(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Ei(n,this.array)),n}setX(e,n){return this.normalized&&(n=At(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Ei(n,this.array)),n}setY(e,n){return this.normalized&&(n=At(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Ei(n,this.array)),n}setZ(e,n){return this.normalized&&(n=At(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Ei(n,this.array)),n}setW(e,n){return this.normalized&&(n=At(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=At(n,this.array),i=At(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=At(n,this.array),i=At(i,this.array),r=At(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=At(n,this.array),i=At(i,this.array),r=At(r,this.array),s=At(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==vd&&(e.usage=this.usage),e}}class xv extends Sn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Sv extends Sn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class St extends Sn{constructor(e,n,i){super(new Float32Array(e),n,i)}}let JM=0;const $n=new dt,rf=new Ot,ws=new B,Hn=new wo,$o=new wo,sn=new B;class Kt extends as{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:JM++}),this.uuid=mi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(mv(e)?Sv:xv)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new mt().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return $n.makeRotationFromQuaternion(e),this.applyMatrix4($n),this}rotateX(e){return $n.makeRotationX(e),this.applyMatrix4($n),this}rotateY(e){return $n.makeRotationY(e),this.applyMatrix4($n),this}rotateZ(e){return $n.makeRotationZ(e),this.applyMatrix4($n),this}translate(e,n,i){return $n.makeTranslation(e,n,i),this.applyMatrix4($n),this}scale(e,n,i){return $n.makeScale(e,n,i),this.applyMatrix4($n),this}lookAt(e){return rf.lookAt(e),rf.updateMatrix(),this.applyMatrix4(rf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ws).negate(),this.translate(ws.x,ws.y,ws.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new St(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Hn.setFromBufferAttribute(s),this.morphTargetsRelative?(sn.addVectors(this.boundingBox.min,Hn.min),this.boundingBox.expandByPoint(sn),sn.addVectors(this.boundingBox.max,Hn.max),this.boundingBox.expandByPoint(sn)):(this.boundingBox.expandByPoint(Hn.min),this.boundingBox.expandByPoint(Hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ls);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new B,1/0);return}if(e){const i=this.boundingSphere.center;if(Hn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];$o.setFromBufferAttribute(a),this.morphTargetsRelative?(sn.addVectors(Hn.min,$o.min),Hn.expandByPoint(sn),sn.addVectors(Hn.max,$o.max),Hn.expandByPoint(sn)):(Hn.expandByPoint($o.min),Hn.expandByPoint($o.max))}Hn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)sn.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(sn));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)sn.fromBufferAttribute(a,c),l&&(ws.fromBufferAttribute(e,c),sn.add(ws)),r=Math.max(r,i.distanceToSquared(sn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=n.position.array,s=n.normal.array,o=n.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Sn(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let T=0;T<a;T++)c[T]=new B,u[T]=new B;const h=new B,d=new B,p=new B,v=new Ke,y=new Ke,m=new Ke,f=new B,_=new B;function g(T,H,V){h.fromArray(r,T*3),d.fromArray(r,H*3),p.fromArray(r,V*3),v.fromArray(o,T*2),y.fromArray(o,H*2),m.fromArray(o,V*2),d.sub(h),p.sub(h),y.sub(v),m.sub(v);const ie=1/(y.x*m.y-m.x*y.y);isFinite(ie)&&(f.copy(d).multiplyScalar(m.y).addScaledVector(p,-y.y).multiplyScalar(ie),_.copy(p).multiplyScalar(y.x).addScaledVector(d,-m.x).multiplyScalar(ie),c[T].add(f),c[H].add(f),c[V].add(f),u[T].add(_),u[H].add(_),u[V].add(_))}let E=this.groups;E.length===0&&(E=[{start:0,count:i.length}]);for(let T=0,H=E.length;T<H;++T){const V=E[T],ie=V.start,k=V.count;for(let X=ie,z=ie+k;X<z;X+=3)g(i[X+0],i[X+1],i[X+2])}const P=new B,C=new B,b=new B,U=new B;function M(T){b.fromArray(s,T*3),U.copy(b);const H=c[T];P.copy(H),P.sub(b.multiplyScalar(b.dot(H))).normalize(),C.crossVectors(U,H);const ie=C.dot(u[T])<0?-1:1;l[T*4]=P.x,l[T*4+1]=P.y,l[T*4+2]=P.z,l[T*4+3]=ie}for(let T=0,H=E.length;T<H;++T){const V=E[T],ie=V.start,k=V.count;for(let X=ie,z=ie+k;X<z;X+=3)M(i[X+0]),M(i[X+1]),M(i[X+2])}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Sn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new B,s=new B,o=new B,a=new B,l=new B,c=new B,u=new B,h=new B;if(e)for(let d=0,p=e.count;d<p;d+=3){const v=e.getX(d+0),y=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(n,v),s.fromBufferAttribute(n,y),o.fromBufferAttribute(n,m),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(i,v),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(v,a.x,a.y,a.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=n.count;d<p;d+=3)r.fromBufferAttribute(n,d+0),s.fromBufferAttribute(n,d+1),o.fromBufferAttribute(n,d+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)sn.fromBufferAttribute(e,n),sn.normalize(),e.setXYZ(n,sn.x,sn.y,sn.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(l.length*u);let p=0,v=0;for(let y=0,m=l.length;y<m;y++){a.isInterleavedBufferAttribute?p=l[y]*a.data.stride+a.offset:p=l[y]*u;for(let f=0;f<u;f++)d[v++]=c[p++]}return new Sn(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Kt,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const d=c[u],p=e(d,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const p=c[h];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(n))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let d=0,p=h.length;d<p;d++)u.push(h[d].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Hm=new dt,Ur=new To,Sl=new ls,Vm=new B,Ts=new B,As=new B,bs=new B,sf=new B,Ml=new B,El=new Ke,wl=new Ke,Tl=new Ke,Gm=new B,Wm=new B,Xm=new B,Al=new B,bl=new B;class Qt extends Ot{constructor(e=new Kt,n=new _o){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Ml.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(sf.fromBufferAttribute(h,e),o?Ml.addScaledVector(sf,u):Ml.addScaledVector(sf.sub(n),u))}n.add(Ml)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Sl.copy(i.boundingSphere),Sl.applyMatrix4(s),Ur.copy(e.ray).recast(e.near),!(Sl.containsPoint(Ur.origin)===!1&&(Ur.intersectSphere(Sl,Vm)===null||Ur.origin.distanceToSquared(Vm)>(e.far-e.near)**2))&&(Hm.copy(s).invert(),Ur.copy(e.ray).applyMatrix4(Hm),!(i.boundingBox!==null&&Ur.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Ur)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,y=d.length;v<y;v++){const m=d[v],f=o[m.materialIndex],_=Math.max(m.start,p.start),g=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let E=_,P=g;E<P;E+=3){const C=a.getX(E),b=a.getX(E+1),U=a.getX(E+2);r=Rl(this,f,e,i,c,u,h,C,b,U),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),y=Math.min(a.count,p.start+p.count);for(let m=v,f=y;m<f;m+=3){const _=a.getX(m),g=a.getX(m+1),E=a.getX(m+2);r=Rl(this,o,e,i,c,u,h,_,g,E),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,y=d.length;v<y;v++){const m=d[v],f=o[m.materialIndex],_=Math.max(m.start,p.start),g=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let E=_,P=g;E<P;E+=3){const C=E,b=E+1,U=E+2;r=Rl(this,f,e,i,c,u,h,C,b,U),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let m=v,f=y;m<f;m+=3){const _=m,g=m+1,E=m+2;r=Rl(this,o,e,i,c,u,h,_,g,E),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function QM(t,e,n,i,r,s,o,a){let l;if(e.side===zn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Zi,a),l===null)return null;bl.copy(a),bl.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(bl);return c<n.near||c>n.far?null:{distance:c,point:bl.clone(),object:t}}function Rl(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,Ts),t.getVertexPosition(l,As),t.getVertexPosition(c,bs);const u=QM(t,e,n,i,Ts,As,bs,Al);if(u){r&&(El.fromBufferAttribute(r,a),wl.fromBufferAttribute(r,l),Tl.fromBufferAttribute(r,c),u.uv=Jn.getInterpolation(Al,Ts,As,bs,El,wl,Tl,new Ke)),s&&(El.fromBufferAttribute(s,a),wl.fromBufferAttribute(s,l),Tl.fromBufferAttribute(s,c),u.uv1=Jn.getInterpolation(Al,Ts,As,bs,El,wl,Tl,new Ke),u.uv2=u.uv1),o&&(Gm.fromBufferAttribute(o,a),Wm.fromBufferAttribute(o,l),Xm.fromBufferAttribute(o,c),u.normal=Jn.getInterpolation(Al,Ts,As,bs,Gm,Wm,Xm,new B),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new B,materialIndex:0};Jn.getNormal(Ts,As,bs,h.normal),u.face=h}return u}class cs extends Kt{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let d=0,p=0;v("z","y","x",-1,-1,i,n,e,o,s,0),v("z","y","x",1,-1,i,n,-e,o,s,1),v("x","z","y",1,1,e,i,n,r,o,2),v("x","z","y",1,-1,e,i,-n,r,o,3),v("x","y","z",1,-1,e,n,i,r,s,4),v("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new St(c,3)),this.setAttribute("normal",new St(u,3)),this.setAttribute("uv",new St(h,2));function v(y,m,f,_,g,E,P,C,b,U,M){const T=E/b,H=P/U,V=E/2,ie=P/2,k=C/2,X=b+1,z=U+1;let ne=0,O=0;const G=new B;for(let j=0;j<z;j++){const re=j*H-ie;for(let oe=0;oe<X;oe++){const W=oe*T-V;G[y]=W*_,G[m]=re*g,G[f]=k,c.push(G.x,G.y,G.z),G[y]=0,G[m]=0,G[f]=C>0?1:-1,u.push(G.x,G.y,G.z),h.push(oe/b),h.push(1-j/U),ne+=1}}for(let j=0;j<U;j++)for(let re=0;re<b;re++){const oe=d+re+X*j,W=d+re+X*(j+1),$=d+(re+1)+X*(j+1),le=d+(re+1)+X*j;l.push(oe,W,le),l.push(W,$,le),O+=6}a.addGroup(p,O,M),p+=O,d+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function vo(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function Tn(t){const e={};for(let n=0;n<t.length;n++){const i=vo(t[n]);for(const r in i)e[r]=i[r]}return e}function eE(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Mv(t){return t.getRenderTarget()===null?t.outputColorSpace:bt.workingColorSpace}const tE={clone:vo,merge:Tn};var nE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,iE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class rs extends Ai{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nE,this.fragmentShader=iE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=vo(e.uniforms),this.uniformsGroups=eE(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Ev extends Ot{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new dt,this.projectionMatrix=new dt,this.projectionMatrixInverse=new dt,this.coordinateSystem=Wi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class yn extends Ev{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=go*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ha*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return go*2*Math.atan(Math.tan(ha*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(ha*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Rs=-90,Cs=1;class rE extends Ot{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new yn(Rs,Cs,e,n);r.layers=this.layers,this.add(r);const s=new yn(Rs,Cs,e,n);s.layers=this.layers,this.add(s);const o=new yn(Rs,Cs,e,n);o.layers=this.layers,this.add(o);const a=new yn(Rs,Cs,e,n);a.layers=this.layers,this.add(a);const l=new yn(Rs,Cs,e,n);l.layers=this.layers,this.add(l);const c=new yn(Rs,Cs,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===Wi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Lc)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),e.render(n,u),e.setRenderTarget(h,d,p),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class wv extends xn{constructor(e,n,i,r,s,o,a,l,c,u){e=e!==void 0?e:[],n=n!==void 0?n:ho,super(e,n,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class sE extends is{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];n.encoding!==void 0&&(ma("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Kr?Xt:ei),this.texture=new wv(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:bn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new cs(5,5,5),s=new rs({name:"CubemapFromEquirect",uniforms:vo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:zn,blending:Er});s.uniforms.tEquirect.value=n;const o=new Qt(r,s),a=n.minFilter;return n.minFilter===ns&&(n.minFilter=bn),new rE(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}const of=new B,oE=new B,aE=new mt;class Bi{constructor(e=new B(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=of.subVectors(i,n).cross(oE.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(of),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||aE.getNormalMatrix(e),r=this.coplanarPoint(of).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Fr=new ls,Cl=new B;class Eh{constructor(e=new Bi,n=new Bi,i=new Bi,r=new Bi,s=new Bi,o=new Bi){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Wi){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],h=r[6],d=r[7],p=r[8],v=r[9],y=r[10],m=r[11],f=r[12],_=r[13],g=r[14],E=r[15];if(i[0].setComponents(l-s,d-c,m-p,E-f).normalize(),i[1].setComponents(l+s,d+c,m+p,E+f).normalize(),i[2].setComponents(l+o,d+u,m+v,E+_).normalize(),i[3].setComponents(l-o,d-u,m-v,E-_).normalize(),i[4].setComponents(l-a,d-h,m-y,E-g).normalize(),n===Wi)i[5].setComponents(l+a,d+h,m+y,E+g).normalize();else if(n===Lc)i[5].setComponents(a,h,y,g).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Fr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Fr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Fr)}intersectsSprite(e){return Fr.center.set(0,0,0),Fr.radius=.7071067811865476,Fr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Fr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Cl.x=r.normal.x>0?e.max.x:e.min.x,Cl.y=r.normal.y>0?e.max.y:e.min.y,Cl.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Cl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Tv(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function lE(t,e){const n=e.isWebGL2,i=new WeakMap;function r(c,u){const h=c.array,d=c.usage,p=h.byteLength,v=t.createBuffer();t.bindBuffer(u,v),t.bufferData(u,h,d),c.onUploadCallback();let y;if(h instanceof Float32Array)y=t.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(n)y=t.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else y=t.UNSIGNED_SHORT;else if(h instanceof Int16Array)y=t.SHORT;else if(h instanceof Uint32Array)y=t.UNSIGNED_INT;else if(h instanceof Int32Array)y=t.INT;else if(h instanceof Int8Array)y=t.BYTE;else if(h instanceof Uint8Array)y=t.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)y=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:v,type:y,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:p}}function s(c,u,h){const d=u.array,p=u._updateRange,v=u.updateRanges;if(t.bindBuffer(h,c),p.count===-1&&v.length===0&&t.bufferSubData(h,0,d),v.length!==0){for(let y=0,m=v.length;y<m;y++){const f=v[y];n?t.bufferSubData(h,f.start*d.BYTES_PER_ELEMENT,d,f.start,f.count):t.bufferSubData(h,f.start*d.BYTES_PER_ELEMENT,d.subarray(f.start,f.start+f.count))}u.clearUpdateRanges()}p.count!==-1&&(n?t.bufferSubData(h,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):t.bufferSubData(h,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u&&(t.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const d=i.get(c);(!d||d.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);if(h===void 0)i.set(c,r(c,u));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(h.buffer,c,u),h.version=c.version}}return{get:o,remove:a,update:l}}class wh extends Kt{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,h=e/a,d=n/l,p=[],v=[],y=[],m=[];for(let f=0;f<u;f++){const _=f*d-o;for(let g=0;g<c;g++){const E=g*h-s;v.push(E,-_,0),y.push(0,0,1),m.push(g/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let _=0;_<a;_++){const g=_+c*f,E=_+c*(f+1),P=_+1+c*(f+1),C=_+1+c*f;p.push(g,E,C),p.push(E,P,C)}this.setIndex(p),this.setAttribute("position",new St(v,3)),this.setAttribute("normal",new St(y,3)),this.setAttribute("uv",new St(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wh(e.width,e.height,e.widthSegments,e.heightSegments)}}var cE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,uE=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,fE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,dE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hE=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,pE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mE=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,gE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,_E=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,vE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,yE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,SE=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ME=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,EE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,wE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,TE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,AE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,bE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,RE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,CE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,LE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,PE=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,NE=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,DE=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,IE=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,UE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,FE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,OE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,kE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zE="gl_FragColor = linearToOutputTexel( gl_FragColor );",BE=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,HE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,VE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,GE=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,WE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,XE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,jE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,qE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,YE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$E=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,KE=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ZE=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,JE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,QE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ew=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,tw=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,nw=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,iw=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rw=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,sw=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ow=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,aw=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lw=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,cw=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,uw=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,fw=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,dw=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hw=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pw=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,mw=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,gw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_w=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,yw=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Sw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Mw=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ew=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,ww=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Tw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Aw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,bw=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Rw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Lw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Pw=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Nw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Dw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Iw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Uw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Fw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ow=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,kw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Hw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Vw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Gw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ww=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Xw=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,jw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,qw=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Yw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$w=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Kw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Zw=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Jw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Qw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,eT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tT=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,nT=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,iT=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,rT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,sT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,oT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,aT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const lT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cT=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fT=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,mT=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,gT=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,_T=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,vT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,yT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xT=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ST=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,MT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ET=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wT=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,TT=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,AT=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,bT=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,RT=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,CT=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,LT=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,PT=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,NT=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,DT=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,IT=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,UT=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,FT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,OT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,kT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zT=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,BT=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,HT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ht={alphahash_fragment:cE,alphahash_pars_fragment:uE,alphamap_fragment:fE,alphamap_pars_fragment:dE,alphatest_fragment:hE,alphatest_pars_fragment:pE,aomap_fragment:mE,aomap_pars_fragment:gE,batching_pars_vertex:_E,batching_vertex:vE,begin_vertex:yE,beginnormal_vertex:xE,bsdfs:SE,iridescence_fragment:ME,bumpmap_pars_fragment:EE,clipping_planes_fragment:wE,clipping_planes_pars_fragment:TE,clipping_planes_pars_vertex:AE,clipping_planes_vertex:bE,color_fragment:RE,color_pars_fragment:CE,color_pars_vertex:LE,color_vertex:PE,common:NE,cube_uv_reflection_fragment:DE,defaultnormal_vertex:IE,displacementmap_pars_vertex:UE,displacementmap_vertex:FE,emissivemap_fragment:OE,emissivemap_pars_fragment:kE,colorspace_fragment:zE,colorspace_pars_fragment:BE,envmap_fragment:HE,envmap_common_pars_fragment:VE,envmap_pars_fragment:GE,envmap_pars_vertex:WE,envmap_physical_pars_fragment:nw,envmap_vertex:XE,fog_vertex:jE,fog_pars_vertex:qE,fog_fragment:YE,fog_pars_fragment:$E,gradientmap_pars_fragment:KE,lightmap_fragment:ZE,lightmap_pars_fragment:JE,lights_lambert_fragment:QE,lights_lambert_pars_fragment:ew,lights_pars_begin:tw,lights_toon_fragment:iw,lights_toon_pars_fragment:rw,lights_phong_fragment:sw,lights_phong_pars_fragment:ow,lights_physical_fragment:aw,lights_physical_pars_fragment:lw,lights_fragment_begin:cw,lights_fragment_maps:uw,lights_fragment_end:fw,logdepthbuf_fragment:dw,logdepthbuf_pars_fragment:hw,logdepthbuf_pars_vertex:pw,logdepthbuf_vertex:mw,map_fragment:gw,map_pars_fragment:_w,map_particle_fragment:vw,map_particle_pars_fragment:yw,metalnessmap_fragment:xw,metalnessmap_pars_fragment:Sw,morphcolor_vertex:Mw,morphnormal_vertex:Ew,morphtarget_pars_vertex:ww,morphtarget_vertex:Tw,normal_fragment_begin:Aw,normal_fragment_maps:bw,normal_pars_fragment:Rw,normal_pars_vertex:Cw,normal_vertex:Lw,normalmap_pars_fragment:Pw,clearcoat_normal_fragment_begin:Nw,clearcoat_normal_fragment_maps:Dw,clearcoat_pars_fragment:Iw,iridescence_pars_fragment:Uw,opaque_fragment:Fw,packing:Ow,premultiplied_alpha_fragment:kw,project_vertex:zw,dithering_fragment:Bw,dithering_pars_fragment:Hw,roughnessmap_fragment:Vw,roughnessmap_pars_fragment:Gw,shadowmap_pars_fragment:Ww,shadowmap_pars_vertex:Xw,shadowmap_vertex:jw,shadowmask_pars_fragment:qw,skinbase_vertex:Yw,skinning_pars_vertex:$w,skinning_vertex:Kw,skinnormal_vertex:Zw,specularmap_fragment:Jw,specularmap_pars_fragment:Qw,tonemapping_fragment:eT,tonemapping_pars_fragment:tT,transmission_fragment:nT,transmission_pars_fragment:iT,uv_pars_fragment:rT,uv_pars_vertex:sT,uv_vertex:oT,worldpos_vertex:aT,background_vert:lT,background_frag:cT,backgroundCube_vert:uT,backgroundCube_frag:fT,cube_vert:dT,cube_frag:hT,depth_vert:pT,depth_frag:mT,distanceRGBA_vert:gT,distanceRGBA_frag:_T,equirect_vert:vT,equirect_frag:yT,linedashed_vert:xT,linedashed_frag:ST,meshbasic_vert:MT,meshbasic_frag:ET,meshlambert_vert:wT,meshlambert_frag:TT,meshmatcap_vert:AT,meshmatcap_frag:bT,meshnormal_vert:RT,meshnormal_frag:CT,meshphong_vert:LT,meshphong_frag:PT,meshphysical_vert:NT,meshphysical_frag:DT,meshtoon_vert:IT,meshtoon_frag:UT,points_vert:FT,points_frag:OT,shadow_vert:kT,shadow_frag:zT,sprite_vert:BT,sprite_frag:HT},Re={common:{diffuse:{value:new ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new mt},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new mt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new mt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new mt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new mt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new mt},normalScale:{value:new Ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new mt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new mt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new mt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new mt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0},uvTransform:{value:new mt}},sprite:{diffuse:{value:new ot(16777215)},opacity:{value:1},center:{value:new Ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new mt},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0}}},Si={basic:{uniforms:Tn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:Tn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new ot(0)}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:Tn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new ot(0)},specular:{value:new ot(1118481)},shininess:{value:30}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:Tn([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:Tn([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new ot(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:Tn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:Tn([Re.points,Re.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:Tn([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:Tn([Re.common,Re.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:Tn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:Tn([Re.sprite,Re.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new mt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distanceRGBA:{uniforms:Tn([Re.common,Re.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distanceRGBA_vert,fragmentShader:ht.distanceRGBA_frag},shadow:{uniforms:Tn([Re.lights,Re.fog,{color:{value:new ot(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};Si.physical={uniforms:Tn([Si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new mt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new mt},clearcoatNormalScale:{value:new Ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new mt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new mt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new mt},sheen:{value:0},sheenColor:{value:new ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new mt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new mt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new mt},transmissionSamplerSize:{value:new Ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new mt},attenuationDistance:{value:0},attenuationColor:{value:new ot(0)},specularColor:{value:new ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new mt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new mt},anisotropyVector:{value:new Ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new mt}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};const Ll={r:0,b:0,g:0};function VT(t,e,n,i,r,s,o){const a=new ot(0);let l=s===!0?0:1,c,u,h=null,d=0,p=null;function v(m,f){let _=!1,g=f.isScene===!0?f.background:null;g&&g.isTexture&&(g=(f.backgroundBlurriness>0?n:e).get(g)),g===null?y(a,l):g&&g.isColor&&(y(g,1),_=!0);const E=t.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||_)&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),g&&(g.isCubeTexture||g.mapping===Jc)?(u===void 0&&(u=new Qt(new cs(1,1,1),new rs({name:"BackgroundCubeMaterial",uniforms:vo(Si.backgroundCube.uniforms),vertexShader:Si.backgroundCube.vertexShader,fragmentShader:Si.backgroundCube.fragmentShader,side:zn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(P,C,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=g,u.material.uniforms.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,u.material.toneMapped=bt.getTransfer(g.colorSpace)!==It,(h!==g||d!==g.version||p!==t.toneMapping)&&(u.material.needsUpdate=!0,h=g,d=g.version,p=t.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):g&&g.isTexture&&(c===void 0&&(c=new Qt(new wh(2,2),new rs({name:"BackgroundMaterial",uniforms:vo(Si.background.uniforms),vertexShader:Si.background.vertexShader,fragmentShader:Si.background.fragmentShader,side:Zi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=g,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=bt.getTransfer(g.colorSpace)!==It,g.matrixAutoUpdate===!0&&g.updateMatrix(),c.material.uniforms.uvTransform.value.copy(g.matrix),(h!==g||d!==g.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,h=g,d=g.version,p=t.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function y(m,f){m.getRGB(Ll,Mv(t)),i.buffers.color.setClear(Ll.r,Ll.g,Ll.b,f,o)}return{getClearColor:function(){return a},setClearColor:function(m,f=1){a.set(m),l=f,y(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,y(a,l)},render:v}}function GT(t,e,n,i){const r=t.getParameter(t.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},l=m(null);let c=l,u=!1;function h(k,X,z,ne,O){let G=!1;if(o){const j=y(ne,z,X);c!==j&&(c=j,p(c.object)),G=f(k,ne,z,O),G&&_(k,ne,z,O)}else{const j=X.wireframe===!0;(c.geometry!==ne.id||c.program!==z.id||c.wireframe!==j)&&(c.geometry=ne.id,c.program=z.id,c.wireframe=j,G=!0)}O!==null&&n.update(O,t.ELEMENT_ARRAY_BUFFER),(G||u)&&(u=!1,U(k,X,z,ne),O!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,n.get(O).buffer))}function d(){return i.isWebGL2?t.createVertexArray():s.createVertexArrayOES()}function p(k){return i.isWebGL2?t.bindVertexArray(k):s.bindVertexArrayOES(k)}function v(k){return i.isWebGL2?t.deleteVertexArray(k):s.deleteVertexArrayOES(k)}function y(k,X,z){const ne=z.wireframe===!0;let O=a[k.id];O===void 0&&(O={},a[k.id]=O);let G=O[X.id];G===void 0&&(G={},O[X.id]=G);let j=G[ne];return j===void 0&&(j=m(d()),G[ne]=j),j}function m(k){const X=[],z=[],ne=[];for(let O=0;O<r;O++)X[O]=0,z[O]=0,ne[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:X,enabledAttributes:z,attributeDivisors:ne,object:k,attributes:{},index:null}}function f(k,X,z,ne){const O=c.attributes,G=X.attributes;let j=0;const re=z.getAttributes();for(const oe in re)if(re[oe].location>=0){const $=O[oe];let le=G[oe];if(le===void 0&&(oe==="instanceMatrix"&&k.instanceMatrix&&(le=k.instanceMatrix),oe==="instanceColor"&&k.instanceColor&&(le=k.instanceColor)),$===void 0||$.attribute!==le||le&&$.data!==le.data)return!0;j++}return c.attributesNum!==j||c.index!==ne}function _(k,X,z,ne){const O={},G=X.attributes;let j=0;const re=z.getAttributes();for(const oe in re)if(re[oe].location>=0){let $=G[oe];$===void 0&&(oe==="instanceMatrix"&&k.instanceMatrix&&($=k.instanceMatrix),oe==="instanceColor"&&k.instanceColor&&($=k.instanceColor));const le={};le.attribute=$,$&&$.data&&(le.data=$.data),O[oe]=le,j++}c.attributes=O,c.attributesNum=j,c.index=ne}function g(){const k=c.newAttributes;for(let X=0,z=k.length;X<z;X++)k[X]=0}function E(k){P(k,0)}function P(k,X){const z=c.newAttributes,ne=c.enabledAttributes,O=c.attributeDivisors;z[k]=1,ne[k]===0&&(t.enableVertexAttribArray(k),ne[k]=1),O[k]!==X&&((i.isWebGL2?t:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](k,X),O[k]=X)}function C(){const k=c.newAttributes,X=c.enabledAttributes;for(let z=0,ne=X.length;z<ne;z++)X[z]!==k[z]&&(t.disableVertexAttribArray(z),X[z]=0)}function b(k,X,z,ne,O,G,j){j===!0?t.vertexAttribIPointer(k,X,z,O,G):t.vertexAttribPointer(k,X,z,ne,O,G)}function U(k,X,z,ne){if(i.isWebGL2===!1&&(k.isInstancedMesh||ne.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;g();const O=ne.attributes,G=z.getAttributes(),j=X.defaultAttributeValues;for(const re in G){const oe=G[re];if(oe.location>=0){let W=O[re];if(W===void 0&&(re==="instanceMatrix"&&k.instanceMatrix&&(W=k.instanceMatrix),re==="instanceColor"&&k.instanceColor&&(W=k.instanceColor)),W!==void 0){const $=W.normalized,le=W.itemSize,ae=n.get(W);if(ae===void 0)continue;const fe=ae.buffer,Te=ae.type,Ve=ae.bytesPerElement,ke=i.isWebGL2===!0&&(Te===t.INT||Te===t.UNSIGNED_INT||W.gpuType===ov);if(W.isInterleavedBufferAttribute){const pt=W.data,K=pt.stride,_t=W.offset;if(pt.isInstancedInterleavedBuffer){for(let Ge=0;Ge<oe.locationSize;Ge++)P(oe.location+Ge,pt.meshPerAttribute);k.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=pt.meshPerAttribute*pt.count)}else for(let Ge=0;Ge<oe.locationSize;Ge++)E(oe.location+Ge);t.bindBuffer(t.ARRAY_BUFFER,fe);for(let Ge=0;Ge<oe.locationSize;Ge++)b(oe.location+Ge,le/oe.locationSize,Te,$,K*Ve,(_t+le/oe.locationSize*Ge)*Ve,ke)}else{if(W.isInstancedBufferAttribute){for(let pt=0;pt<oe.locationSize;pt++)P(oe.location+pt,W.meshPerAttribute);k.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let pt=0;pt<oe.locationSize;pt++)E(oe.location+pt);t.bindBuffer(t.ARRAY_BUFFER,fe);for(let pt=0;pt<oe.locationSize;pt++)b(oe.location+pt,le/oe.locationSize,Te,$,le*Ve,le/oe.locationSize*pt*Ve,ke)}}else if(j!==void 0){const $=j[re];if($!==void 0)switch($.length){case 2:t.vertexAttrib2fv(oe.location,$);break;case 3:t.vertexAttrib3fv(oe.location,$);break;case 4:t.vertexAttrib4fv(oe.location,$);break;default:t.vertexAttrib1fv(oe.location,$)}}}}C()}function M(){V();for(const k in a){const X=a[k];for(const z in X){const ne=X[z];for(const O in ne)v(ne[O].object),delete ne[O];delete X[z]}delete a[k]}}function T(k){if(a[k.id]===void 0)return;const X=a[k.id];for(const z in X){const ne=X[z];for(const O in ne)v(ne[O].object),delete ne[O];delete X[z]}delete a[k.id]}function H(k){for(const X in a){const z=a[X];if(z[k.id]===void 0)continue;const ne=z[k.id];for(const O in ne)v(ne[O].object),delete ne[O];delete z[k.id]}}function V(){ie(),u=!0,c!==l&&(c=l,p(c.object))}function ie(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:V,resetDefaultState:ie,dispose:M,releaseStatesOfGeometry:T,releaseStatesOfProgram:H,initAttributes:g,enableAttribute:E,disableUnusedAttributes:C}}function WT(t,e,n,i){const r=i.isWebGL2;let s;function o(u){s=u}function a(u,h){t.drawArrays(s,u,h),n.update(h,s,1)}function l(u,h,d){if(d===0)return;let p,v;if(r)p=t,v="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),v="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[v](s,u,h,d),n.update(h,s,d)}function c(u,h,d){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<d;v++)this.render(u[v],h[v]);else{p.multiDrawArraysWEBGL(s,u,0,h,0,d);let v=0;for(let y=0;y<d;y++)v+=h[y];n.update(v,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function XT(t,e,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const b=e.get("EXT_texture_filter_anisotropic");i=t.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(b){if(b==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&t.constructor.name==="WebGL2RenderingContext";let a=n.precision!==void 0?n.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),u=n.logarithmicDepthBuffer===!0,h=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),d=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=t.getParameter(t.MAX_TEXTURE_SIZE),v=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),y=t.getParameter(t.MAX_VERTEX_ATTRIBS),m=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),f=t.getParameter(t.MAX_VARYING_VECTORS),_=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),g=d>0,E=o||e.has("OES_texture_float"),P=g&&E,C=o?t.getParameter(t.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:v,maxAttributes:y,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:_,vertexTextures:g,floatFragmentTextures:E,floatVertexTextures:P,maxSamples:C}}function jT(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new Bi,a=new mt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const p=h.length!==0||d||i!==0||r;return r=d,i=h.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){n=u(h,d,0)},this.setState=function(h,d,p){const v=h.clippingPlanes,y=h.clipIntersection,m=h.clipShadows,f=t.get(h);if(!r||v===null||v.length===0||s&&!m)s?u(null):c();else{const _=s?0:i,g=_*4;let E=f.clippingState||null;l.value=E,E=u(v,d,g,p);for(let P=0;P!==g;++P)E[P]=n[P];f.clippingState=E,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,d,p,v){const y=h!==null?h.length:0;let m=null;if(y!==0){if(m=l.value,v!==!0||m===null){const f=p+y*4,_=d.matrixWorldInverse;a.getNormalMatrix(_),(m===null||m.length<f)&&(m=new Float32Array(f));for(let g=0,E=p;g!==y;++g,E+=4)o.copy(h[g]).applyMatrix4(_,a),o.normal.toArray(m,E),m[E+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function qT(t){let e=new WeakMap;function n(o,a){return a===md?o.mapping=ho:a===gd&&(o.mapping=po),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===md||a===gd)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new sE(l.height/2);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",r),n(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Th extends Ev{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const $s=4,jm=[.125,.215,.35,.446,.526,.582],Hr=20,af=new Th,qm=new ot;let lf=null,cf=0,uf=0;const zr=(1+Math.sqrt(5))/2,Ls=1/zr,Ym=[new B(1,1,1),new B(-1,1,1),new B(1,1,-1),new B(-1,1,-1),new B(0,zr,Ls),new B(0,zr,-Ls),new B(Ls,0,zr),new B(-Ls,0,zr),new B(zr,Ls,0),new B(-zr,Ls,0)];class $m{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){lf=this._renderer.getRenderTarget(),cf=this._renderer.getActiveCubeFace(),uf=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(lf,cf,uf),e.scissorTest=!1,Pl(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===ho||e.mapping===po?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),lf=this._renderer.getRenderTarget(),cf=this._renderer.getActiveCubeFace(),uf=this._renderer.getActiveMipmapLevel();const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:bn,minFilter:bn,generateMipmaps:!1,type:Ia,format:Qn,colorSpace:Ji,depthBuffer:!1},r=Km(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Km(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=YT(s)),this._blurMaterial=$T(s,e,n)}return r}_compileMaterial(e){const n=new Qt(this._lodPlanes[0],e);this._renderer.compile(n,af)}_sceneToCubeUV(e,n,i,r){const a=new yn(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(qm),u.toneMapping=wr,u.autoClear=!1;const p=new _o({name:"PMREM.Background",side:zn,depthWrite:!1,depthTest:!1}),v=new Qt(new cs,p);let y=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,y=!0):(p.color.copy(qm),y=!0);for(let f=0;f<6;f++){const _=f%3;_===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):_===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));const g=this._cubeSize;Pl(r,_*g,f>2?g:0,g,g),u.setRenderTarget(r),y&&u.render(v,a),u.render(e,a)}v.geometry.dispose(),v.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=m}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===ho||e.mapping===po;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zm());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Qt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Pl(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,af)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Ym[(r-1)%Ym.length];this._blur(e,r-1,r,s,o)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Qt(this._lodPlanes[r],c),d=c.uniforms,p=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Hr-1),y=s/v,m=isFinite(s)?1+Math.floor(u*y):Hr;m>Hr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Hr}`);const f=[];let _=0;for(let b=0;b<Hr;++b){const U=b/y,M=Math.exp(-U*U/2);f.push(M),b===0?_+=M:b<m&&(_+=2*M)}for(let b=0;b<f.length;b++)f[b]=f[b]/_;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:g}=this;d.dTheta.value=v,d.mipInt.value=g-i;const E=this._sizeLods[r],P=3*E*(r>g-$s?r-g+$s:0),C=4*(this._cubeSize-E);Pl(n,P,C,3*E,2*E),l.setRenderTarget(n),l.render(h,af)}}function YT(t){const e=[],n=[],i=[];let r=t;const s=t-$s+1+jm.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-$s?l=jm[o-t+$s-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,v=6,y=3,m=2,f=1,_=new Float32Array(y*v*p),g=new Float32Array(m*v*p),E=new Float32Array(f*v*p);for(let C=0;C<p;C++){const b=C%3*2/3-1,U=C>2?0:-1,M=[b,U,0,b+2/3,U,0,b+2/3,U+1,0,b,U,0,b+2/3,U+1,0,b,U+1,0];_.set(M,y*v*C),g.set(d,m*v*C);const T=[C,C,C,C,C,C];E.set(T,f*v*C)}const P=new Kt;P.setAttribute("position",new Sn(_,y)),P.setAttribute("uv",new Sn(g,m)),P.setAttribute("faceIndex",new Sn(E,f)),e.push(P),r>$s&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function Km(t,e,n){const i=new is(t,e,n);return i.texture.mapping=Jc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Pl(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function $T(t,e,n){const i=new Float32Array(Hr),r=new B(0,1,0);return new rs({name:"SphericalGaussianBlur",defines:{n:Hr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ah(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Er,depthTest:!1,depthWrite:!1})}function Zm(){return new rs({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ah(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Er,depthTest:!1,depthWrite:!1})}function Jm(){return new rs({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ah(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Er,depthTest:!1,depthWrite:!1})}function Ah(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function KT(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===md||l===gd,u=l===ho||l===po;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=e.get(a);return n===null&&(n=new $m(t)),h=c?n.fromEquirectangular(a,h):n.fromCubemap(a,h),e.set(a,h),h.texture}else{if(e.has(a))return e.get(a).texture;{const h=a.image;if(c&&h&&h.height>0||u&&h&&r(h)){n===null&&(n=new $m(t));const d=c?n.fromEquirectangular(a):n.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",s),d.texture}else return null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function ZT(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(i){i.isWebGL2?(n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance")):(n("WEBGL_depth_texture"),n("OES_texture_float"),n("OES_texture_half_float"),n("OES_texture_half_float_linear"),n("OES_standard_derivatives"),n("OES_element_index_uint"),n("OES_vertex_array_object"),n("ANGLE_instanced_arrays")),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture")},get:function(i){const r=n(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function JT(t,e,n,i){const r={},s=new WeakMap;function o(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const v in d.attributes)e.remove(d.attributes[v]);for(const v in d.morphAttributes){const y=d.morphAttributes[v];for(let m=0,f=y.length;m<f;m++)e.remove(y[m])}d.removeEventListener("dispose",o),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,n.memory.geometries--}function a(h,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,n.memory.geometries++),d}function l(h){const d=h.attributes;for(const v in d)e.update(d[v],t.ARRAY_BUFFER);const p=h.morphAttributes;for(const v in p){const y=p[v];for(let m=0,f=y.length;m<f;m++)e.update(y[m],t.ARRAY_BUFFER)}}function c(h){const d=[],p=h.index,v=h.attributes.position;let y=0;if(p!==null){const _=p.array;y=p.version;for(let g=0,E=_.length;g<E;g+=3){const P=_[g+0],C=_[g+1],b=_[g+2];d.push(P,C,C,b,b,P)}}else if(v!==void 0){const _=v.array;y=v.version;for(let g=0,E=_.length/3-1;g<E;g+=3){const P=g+0,C=g+1,b=g+2;d.push(P,C,C,b,b,P)}}else return;const m=new(mv(d)?Sv:xv)(d,1);m.version=y;const f=s.get(h);f&&e.remove(f),s.set(h,m)}function u(h){const d=s.get(h);if(d){const p=h.index;p!==null&&d.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function QT(t,e,n,i){const r=i.isWebGL2;let s;function o(p){s=p}let a,l;function c(p){a=p.type,l=p.bytesPerElement}function u(p,v){t.drawElements(s,v,a,p*l),n.update(v,s,1)}function h(p,v,y){if(y===0)return;let m,f;if(r)m=t,f="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[f](s,v,a,p*l,y),n.update(v,s,y)}function d(p,v,y){if(y===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<y;f++)this.render(p[f]/l,v[f]);else{m.multiDrawElementsWEBGL(s,v,0,a,p,0,y);let f=0;for(let _=0;_<y;_++)f+=v[_];n.update(f,s,1)}}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=h,this.renderMultiDraw=d}function e1(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function t1(t,e){return t[0]-e[0]}function n1(t,e){return Math.abs(e[1])-Math.abs(t[1])}function i1(t,e,n){const i={},r=new Float32Array(8),s=new WeakMap,o=new Rt,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,h){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const v=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,y=v!==void 0?v.length:0;let m=s.get(u);if(m===void 0||m.count!==y){let X=function(){ie.dispose(),s.delete(u),u.removeEventListener("dispose",X)};var p=X;m!==void 0&&m.texture.dispose();const g=u.morphAttributes.position!==void 0,E=u.morphAttributes.normal!==void 0,P=u.morphAttributes.color!==void 0,C=u.morphAttributes.position||[],b=u.morphAttributes.normal||[],U=u.morphAttributes.color||[];let M=0;g===!0&&(M=1),E===!0&&(M=2),P===!0&&(M=3);let T=u.attributes.position.count*M,H=1;T>e.maxTextureSize&&(H=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const V=new Float32Array(T*H*4*y),ie=new vv(V,T,H,y);ie.type=Gi,ie.needsUpdate=!0;const k=M*4;for(let z=0;z<y;z++){const ne=C[z],O=b[z],G=U[z],j=T*H*4*z;for(let re=0;re<ne.count;re++){const oe=re*k;g===!0&&(o.fromBufferAttribute(ne,re),V[j+oe+0]=o.x,V[j+oe+1]=o.y,V[j+oe+2]=o.z,V[j+oe+3]=0),E===!0&&(o.fromBufferAttribute(O,re),V[j+oe+4]=o.x,V[j+oe+5]=o.y,V[j+oe+6]=o.z,V[j+oe+7]=0),P===!0&&(o.fromBufferAttribute(G,re),V[j+oe+8]=o.x,V[j+oe+9]=o.y,V[j+oe+10]=o.z,V[j+oe+11]=G.itemSize===4?o.w:1)}}m={count:y,texture:ie,size:new Ke(T,H)},s.set(u,m),u.addEventListener("dispose",X)}let f=0;for(let g=0;g<d.length;g++)f+=d[g];const _=u.morphTargetsRelative?1:1-f;h.getUniforms().setValue(t,"morphTargetBaseInfluence",_),h.getUniforms().setValue(t,"morphTargetInfluences",d),h.getUniforms().setValue(t,"morphTargetsTexture",m.texture,n),h.getUniforms().setValue(t,"morphTargetsTextureSize",m.size)}else{const v=d===void 0?0:d.length;let y=i[u.id];if(y===void 0||y.length!==v){y=[];for(let E=0;E<v;E++)y[E]=[E,0];i[u.id]=y}for(let E=0;E<v;E++){const P=y[E];P[0]=E,P[1]=d[E]}y.sort(n1);for(let E=0;E<8;E++)E<v&&y[E][1]?(a[E][0]=y[E][0],a[E][1]=y[E][1]):(a[E][0]=Number.MAX_SAFE_INTEGER,a[E][1]=0);a.sort(t1);const m=u.morphAttributes.position,f=u.morphAttributes.normal;let _=0;for(let E=0;E<8;E++){const P=a[E],C=P[0],b=P[1];C!==Number.MAX_SAFE_INTEGER&&b?(m&&u.getAttribute("morphTarget"+E)!==m[C]&&u.setAttribute("morphTarget"+E,m[C]),f&&u.getAttribute("morphNormal"+E)!==f[C]&&u.setAttribute("morphNormal"+E,f[C]),r[E]=b,_+=b):(m&&u.hasAttribute("morphTarget"+E)===!0&&u.deleteAttribute("morphTarget"+E),f&&u.hasAttribute("morphNormal"+E)===!0&&u.deleteAttribute("morphNormal"+E),r[E]=0)}const g=u.morphTargetsRelative?1:1-_;h.getUniforms().setValue(t,"morphTargetBaseInfluence",g),h.getUniforms().setValue(t,"morphTargetInfluences",r)}}return{update:l}}function r1(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,h=e.get(l,u);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return h}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:o}}class Av extends xn{constructor(e,n,i,r,s,o,a,l,c,u){if(u=u!==void 0?u:$r,u!==$r&&u!==mo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===$r&&(i=pr),i===void 0&&u===mo&&(i=Yr),super(null,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:cn,this.minFilter=l!==void 0?l:cn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const bv=new xn,Rv=new Av(1,1);Rv.compareFunction=pv;const Cv=new vv,Lv=new VM,Pv=new wv,Qm=[],eg=[],tg=new Float32Array(16),ng=new Float32Array(9),ig=new Float32Array(4);function bo(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Qm[r];if(s===void 0&&(s=new Float32Array(r),Qm[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function tn(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function nn(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function tu(t,e){let n=eg[e];n===void 0&&(n=new Int32Array(e),eg[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function s1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function o1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(tn(n,e))return;t.uniform2fv(this.addr,e),nn(n,e)}}function a1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(tn(n,e))return;t.uniform3fv(this.addr,e),nn(n,e)}}function l1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(tn(n,e))return;t.uniform4fv(this.addr,e),nn(n,e)}}function c1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(tn(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),nn(n,e)}else{if(tn(n,i))return;ig.set(i),t.uniformMatrix2fv(this.addr,!1,ig),nn(n,i)}}function u1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(tn(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),nn(n,e)}else{if(tn(n,i))return;ng.set(i),t.uniformMatrix3fv(this.addr,!1,ng),nn(n,i)}}function f1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(tn(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),nn(n,e)}else{if(tn(n,i))return;tg.set(i),t.uniformMatrix4fv(this.addr,!1,tg),nn(n,i)}}function d1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function h1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(tn(n,e))return;t.uniform2iv(this.addr,e),nn(n,e)}}function p1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(tn(n,e))return;t.uniform3iv(this.addr,e),nn(n,e)}}function m1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(tn(n,e))return;t.uniform4iv(this.addr,e),nn(n,e)}}function g1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function _1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(tn(n,e))return;t.uniform2uiv(this.addr,e),nn(n,e)}}function v1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(tn(n,e))return;t.uniform3uiv(this.addr,e),nn(n,e)}}function y1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(tn(n,e))return;t.uniform4uiv(this.addr,e),nn(n,e)}}function x1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);const s=this.type===t.SAMPLER_2D_SHADOW?Rv:bv;n.setTexture2D(e||s,r)}function S1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Lv,r)}function M1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Pv,r)}function E1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||Cv,r)}function w1(t){switch(t){case 5126:return s1;case 35664:return o1;case 35665:return a1;case 35666:return l1;case 35674:return c1;case 35675:return u1;case 35676:return f1;case 5124:case 35670:return d1;case 35667:case 35671:return h1;case 35668:case 35672:return p1;case 35669:case 35673:return m1;case 5125:return g1;case 36294:return _1;case 36295:return v1;case 36296:return y1;case 35678:case 36198:case 36298:case 36306:case 35682:return x1;case 35679:case 36299:case 36307:return S1;case 35680:case 36300:case 36308:case 36293:return M1;case 36289:case 36303:case 36311:case 36292:return E1}}function T1(t,e){t.uniform1fv(this.addr,e)}function A1(t,e){const n=bo(e,this.size,2);t.uniform2fv(this.addr,n)}function b1(t,e){const n=bo(e,this.size,3);t.uniform3fv(this.addr,n)}function R1(t,e){const n=bo(e,this.size,4);t.uniform4fv(this.addr,n)}function C1(t,e){const n=bo(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function L1(t,e){const n=bo(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function P1(t,e){const n=bo(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function N1(t,e){t.uniform1iv(this.addr,e)}function D1(t,e){t.uniform2iv(this.addr,e)}function I1(t,e){t.uniform3iv(this.addr,e)}function U1(t,e){t.uniform4iv(this.addr,e)}function F1(t,e){t.uniform1uiv(this.addr,e)}function O1(t,e){t.uniform2uiv(this.addr,e)}function k1(t,e){t.uniform3uiv(this.addr,e)}function z1(t,e){t.uniform4uiv(this.addr,e)}function B1(t,e,n){const i=this.cache,r=e.length,s=tu(n,r);tn(i,s)||(t.uniform1iv(this.addr,s),nn(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||bv,s[o])}function H1(t,e,n){const i=this.cache,r=e.length,s=tu(n,r);tn(i,s)||(t.uniform1iv(this.addr,s),nn(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||Lv,s[o])}function V1(t,e,n){const i=this.cache,r=e.length,s=tu(n,r);tn(i,s)||(t.uniform1iv(this.addr,s),nn(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||Pv,s[o])}function G1(t,e,n){const i=this.cache,r=e.length,s=tu(n,r);tn(i,s)||(t.uniform1iv(this.addr,s),nn(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||Cv,s[o])}function W1(t){switch(t){case 5126:return T1;case 35664:return A1;case 35665:return b1;case 35666:return R1;case 35674:return C1;case 35675:return L1;case 35676:return P1;case 5124:case 35670:return N1;case 35667:case 35671:return D1;case 35668:case 35672:return I1;case 35669:case 35673:return U1;case 5125:return F1;case 36294:return O1;case 36295:return k1;case 36296:return z1;case 35678:case 36198:case 36298:case 36306:case 35682:return B1;case 35679:case 36299:case 36307:return H1;case 35680:case 36300:case 36308:case 36293:return V1;case 36289:case 36303:case 36311:case 36292:return G1}}class X1{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=w1(n.type)}}class j1{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=W1(n.type)}}class q1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const ff=/(\w+)(\])?(\[|\.)?/g;function rg(t,e){t.seq.push(e),t.map[e.id]=e}function Y1(t,e,n){const i=t.name,r=i.length;for(ff.lastIndex=0;;){const s=ff.exec(i),o=ff.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){rg(n,c===void 0?new X1(a,t,e):new j1(a,t,e));break}else{let h=n.map[a];h===void 0&&(h=new q1(a),rg(n,h)),n=h}}}class Ql{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);Y1(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function sg(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const $1=37297;let K1=0;function Z1(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}function J1(t){const e=bt.getPrimaries(bt.workingColorSpace),n=bt.getPrimaries(t);let i;switch(e===n?i="":e===Cc&&n===Rc?i="LinearDisplayP3ToLinearSRGB":e===Rc&&n===Cc&&(i="LinearSRGBToLinearDisplayP3"),t){case Ji:case eu:return[i,"LinearTransferOETF"];case Xt:case xh:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function og(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+Z1(t.getShaderSource(e),o)}else return r}function Q1(t,e){const n=J1(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function eA(t,e){let n;switch(e){case KS:n="Linear";break;case ZS:n="Reinhard";break;case JS:n="OptimizedCineon";break;case QS:n="ACESFilmic";break;case tM:n="AgX";break;case eM:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function tA(t){return[t.extensionDerivatives||t.envMapCubeUVHeight||t.bumpMap||t.normalMapTangentSpace||t.clearcoatNormalMap||t.flatShading||t.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(t.extensionFragDepth||t.logarithmicDepthBuffer)&&t.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",t.extensionDrawBuffers&&t.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(t.extensionShaderTextureLOD||t.envMap||t.transmission)&&t.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ks).join(`
`)}function nA(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ks).join(`
`)}function iA(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function rA(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function Ks(t){return t!==""}function ag(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function lg(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const sA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sd(t){return t.replace(sA,aA)}const oA=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function aA(t,e){let n=ht[e];if(n===void 0){const i=oA.get(e);if(i!==void 0)n=ht[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Sd(n)}const lA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cg(t){return t.replace(lA,cA)}function cA(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function ug(t){let e="precision "+t.precision+` float;
precision `+t.precision+" int;";return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function uA(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===rv?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===wS?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===Oi&&(e="SHADOWMAP_TYPE_VSM"),e}function fA(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case ho:case po:e="ENVMAP_TYPE_CUBE";break;case Jc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function dA(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case po:e="ENVMAP_MODE_REFRACTION";break}return e}function hA(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case Zc:e="ENVMAP_BLENDING_MULTIPLY";break;case YS:e="ENVMAP_BLENDING_MIX";break;case $S:e="ENVMAP_BLENDING_ADD";break}return e}function pA(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function mA(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=uA(n),c=fA(n),u=dA(n),h=hA(n),d=pA(n),p=n.isWebGL2?"":tA(n),v=nA(n),y=iA(s),m=r.createProgram();let f,_,g=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y].filter(Ks).join(`
`),f.length>0&&(f+=`
`),_=[p,"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y].filter(Ks).join(`
`),_.length>0&&(_+=`
`)):(f=[ug(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors&&n.isWebGL2?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ks).join(`
`),_=[p,ug(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==wr?"#define TONE_MAPPING":"",n.toneMapping!==wr?ht.tonemapping_pars_fragment:"",n.toneMapping!==wr?eA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,Q1("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ks).join(`
`)),o=Sd(o),o=ag(o,n),o=lg(o,n),a=Sd(a),a=ag(a,n),a=lg(a,n),o=cg(o),a=cg(a),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,f=[v,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,_=["precision mediump sampler2DArray;","#define varying in",n.glslVersion===Rm?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Rm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const E=g+f+o,P=g+_+a,C=sg(r,r.VERTEX_SHADER,E),b=sg(r,r.FRAGMENT_SHADER,P);r.attachShader(m,C),r.attachShader(m,b),n.index0AttributeName!==void 0?r.bindAttribLocation(m,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function U(V){if(t.debug.checkShaderErrors){const ie=r.getProgramInfoLog(m).trim(),k=r.getShaderInfoLog(C).trim(),X=r.getShaderInfoLog(b).trim();let z=!0,ne=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(z=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,m,C,b);else{const O=og(r,C,"vertex"),G=og(r,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+ie+`
`+O+`
`+G)}else ie!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ie):(k===""||X==="")&&(ne=!1);ne&&(V.diagnostics={runnable:z,programLog:ie,vertexShader:{log:k,prefix:f},fragmentShader:{log:X,prefix:_}})}r.deleteShader(C),r.deleteShader(b),M=new Ql(r,m),T=rA(r,m)}let M;this.getUniforms=function(){return M===void 0&&U(this),M};let T;this.getAttributes=function(){return T===void 0&&U(this),T};let H=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return H===!1&&(H=r.getProgramParameter(m,$1)),H},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=K1++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=C,this.fragmentShader=b,this}let gA=0;class _A{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new vA(e),n.set(e,i)),i}}class vA{constructor(e){this.id=gA++,this.code=e,this.usedTimes=0}}function yA(t,e,n,i,r,s,o){const a=new Mh,l=new _A,c=[],u=r.isWebGL2,h=r.logarithmicDepthBuffer,d=r.vertexTextures;let p=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(M){return M===0?"uv":`uv${M}`}function m(M,T,H,V,ie){const k=V.fog,X=ie.geometry,z=M.isMeshStandardMaterial?V.environment:null,ne=(M.isMeshStandardMaterial?n:e).get(M.envMap||z),O=ne&&ne.mapping===Jc?ne.image.height:null,G=v[M.type];M.precision!==null&&(p=r.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));const j=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,re=j!==void 0?j.length:0;let oe=0;X.morphAttributes.position!==void 0&&(oe=1),X.morphAttributes.normal!==void 0&&(oe=2),X.morphAttributes.color!==void 0&&(oe=3);let W,$,le,ae;if(G){const Ct=Si[G];W=Ct.vertexShader,$=Ct.fragmentShader}else W=M.vertexShader,$=M.fragmentShader,l.update(M),le=l.getVertexShaderID(M),ae=l.getFragmentShaderID(M);const fe=t.getRenderTarget(),Te=ie.isInstancedMesh===!0,Ve=ie.isBatchedMesh===!0,ke=!!M.map,pt=!!M.matcap,K=!!ne,_t=!!M.aoMap,Ge=!!M.lightMap,et=!!M.bumpMap,Ie=!!M.normalMap,Mt=!!M.displacementMap,st=!!M.emissiveMap,D=!!M.metalnessMap,A=!!M.roughnessMap,Z=M.anisotropy>0,_e=M.clearcoat>0,pe=M.iridescence>0,ve=M.sheen>0,ze=M.transmission>0,we=Z&&!!M.anisotropyMap,Y=_e&&!!M.clearcoatMap,de=_e&&!!M.clearcoatNormalMap,Se=_e&&!!M.clearcoatRoughnessMap,J=pe&&!!M.iridescenceMap,Ce=pe&&!!M.iridescenceThicknessMap,I=ve&&!!M.sheenColorMap,ce=ve&&!!M.sheenRoughnessMap,me=!!M.specularMap,he=!!M.specularColorMap,be=!!M.specularIntensityMap,tt=ze&&!!M.transmissionMap,Ze=ze&&!!M.thicknessMap,je=!!M.gradientMap,ye=!!M.alphaMap,F=M.alphaTest>0,Me=!!M.alphaHash,Ee=!!M.extensions,qe=!!X.attributes.uv1,Be=!!X.attributes.uv2,Xe=!!X.attributes.uv3;let Je=wr;return M.toneMapped&&(fe===null||fe.isXRRenderTarget===!0)&&(Je=t.toneMapping),{isWebGL2:u,shaderID:G,shaderType:M.type,shaderName:M.name,vertexShader:W,fragmentShader:$,defines:M.defines,customVertexShaderID:le,customFragmentShaderID:ae,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Ve,instancing:Te,instancingColor:Te&&ie.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:fe===null?t.outputColorSpace:fe.isXRRenderTarget===!0?fe.texture.colorSpace:Ji,map:ke,matcap:pt,envMap:K,envMapMode:K&&ne.mapping,envMapCubeUVHeight:O,aoMap:_t,lightMap:Ge,bumpMap:et,normalMap:Ie,displacementMap:d&&Mt,emissiveMap:st,normalMapObjectSpace:Ie&&M.normalMapType===mM,normalMapTangentSpace:Ie&&M.normalMapType===Qc,metalnessMap:D,roughnessMap:A,anisotropy:Z,anisotropyMap:we,clearcoat:_e,clearcoatMap:Y,clearcoatNormalMap:de,clearcoatRoughnessMap:Se,iridescence:pe,iridescenceMap:J,iridescenceThicknessMap:Ce,sheen:ve,sheenColorMap:I,sheenRoughnessMap:ce,specularMap:me,specularColorMap:he,specularIntensityMap:be,transmission:ze,transmissionMap:tt,thicknessMap:Ze,gradientMap:je,opaque:M.transparent===!1&&M.blending===io,alphaMap:ye,alphaTest:F,alphaHash:Me,combine:M.combine,mapUv:ke&&y(M.map.channel),aoMapUv:_t&&y(M.aoMap.channel),lightMapUv:Ge&&y(M.lightMap.channel),bumpMapUv:et&&y(M.bumpMap.channel),normalMapUv:Ie&&y(M.normalMap.channel),displacementMapUv:Mt&&y(M.displacementMap.channel),emissiveMapUv:st&&y(M.emissiveMap.channel),metalnessMapUv:D&&y(M.metalnessMap.channel),roughnessMapUv:A&&y(M.roughnessMap.channel),anisotropyMapUv:we&&y(M.anisotropyMap.channel),clearcoatMapUv:Y&&y(M.clearcoatMap.channel),clearcoatNormalMapUv:de&&y(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&y(M.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&y(M.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&y(M.iridescenceThicknessMap.channel),sheenColorMapUv:I&&y(M.sheenColorMap.channel),sheenRoughnessMapUv:ce&&y(M.sheenRoughnessMap.channel),specularMapUv:me&&y(M.specularMap.channel),specularColorMapUv:he&&y(M.specularColorMap.channel),specularIntensityMapUv:be&&y(M.specularIntensityMap.channel),transmissionMapUv:tt&&y(M.transmissionMap.channel),thicknessMapUv:Ze&&y(M.thicknessMap.channel),alphaMapUv:ye&&y(M.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Ie||Z),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,vertexUv1s:qe,vertexUv2s:Be,vertexUv3s:Xe,pointsUvs:ie.isPoints===!0&&!!X.attributes.uv&&(ke||ye),fog:!!k,useFog:M.fog===!0,fogExp2:k&&k.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:ie.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:oe,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:t.shadowMap.enabled&&H.length>0,shadowMapType:t.shadowMap.type,toneMapping:Je,useLegacyLights:t._useLegacyLights,decodeVideoTexture:ke&&M.map.isVideoTexture===!0&&bt.getTransfer(M.map.colorSpace)===It,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===di,flipSided:M.side===zn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:Ee&&M.extensions.derivatives===!0,extensionFragDepth:Ee&&M.extensions.fragDepth===!0,extensionDrawBuffers:Ee&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:Ee&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Ee&&M.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function f(M){const T=[];if(M.shaderID?T.push(M.shaderID):(T.push(M.customVertexShaderID),T.push(M.customFragmentShaderID)),M.defines!==void 0)for(const H in M.defines)T.push(H),T.push(M.defines[H]);return M.isRawShaderMaterial===!1&&(_(T,M),g(T,M),T.push(t.outputColorSpace)),T.push(M.customProgramCacheKey),T.join()}function _(M,T){M.push(T.precision),M.push(T.outputColorSpace),M.push(T.envMapMode),M.push(T.envMapCubeUVHeight),M.push(T.mapUv),M.push(T.alphaMapUv),M.push(T.lightMapUv),M.push(T.aoMapUv),M.push(T.bumpMapUv),M.push(T.normalMapUv),M.push(T.displacementMapUv),M.push(T.emissiveMapUv),M.push(T.metalnessMapUv),M.push(T.roughnessMapUv),M.push(T.anisotropyMapUv),M.push(T.clearcoatMapUv),M.push(T.clearcoatNormalMapUv),M.push(T.clearcoatRoughnessMapUv),M.push(T.iridescenceMapUv),M.push(T.iridescenceThicknessMapUv),M.push(T.sheenColorMapUv),M.push(T.sheenRoughnessMapUv),M.push(T.specularMapUv),M.push(T.specularColorMapUv),M.push(T.specularIntensityMapUv),M.push(T.transmissionMapUv),M.push(T.thicknessMapUv),M.push(T.combine),M.push(T.fogExp2),M.push(T.sizeAttenuation),M.push(T.morphTargetsCount),M.push(T.morphAttributeCount),M.push(T.numDirLights),M.push(T.numPointLights),M.push(T.numSpotLights),M.push(T.numSpotLightMaps),M.push(T.numHemiLights),M.push(T.numRectAreaLights),M.push(T.numDirLightShadows),M.push(T.numPointLightShadows),M.push(T.numSpotLightShadows),M.push(T.numSpotLightShadowsWithMaps),M.push(T.numLightProbes),M.push(T.shadowMapType),M.push(T.toneMapping),M.push(T.numClippingPlanes),M.push(T.numClipIntersection),M.push(T.depthPacking)}function g(M,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),M.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),M.push(a.mask)}function E(M){const T=v[M.type];let H;if(T){const V=Si[T];H=tE.clone(V.uniforms)}else H=M.uniforms;return H}function P(M,T){let H;for(let V=0,ie=c.length;V<ie;V++){const k=c[V];if(k.cacheKey===T){H=k,++H.usedTimes;break}}return H===void 0&&(H=new mA(t,T,M,s),c.push(H)),H}function C(M){if(--M.usedTimes===0){const T=c.indexOf(M);c[T]=c[c.length-1],c.pop(),M.destroy()}}function b(M){l.remove(M)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:E,acquireProgram:P,releaseProgram:C,releaseShaderCache:b,programs:c,dispose:U}}function xA(){let t=new WeakMap;function e(s){let o=t.get(s);return o===void 0&&(o={},t.set(s,o)),o}function n(s){t.delete(s)}function i(s,o,a){t.get(s)[o]=a}function r(){t=new WeakMap}return{get:e,remove:n,update:i,dispose:r}}function SA(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function fg(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function dg(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(h,d,p,v,y,m){let f=t[e];return f===void 0?(f={id:h.id,object:h,geometry:d,material:p,groupOrder:v,renderOrder:h.renderOrder,z:y,group:m},t[e]=f):(f.id=h.id,f.object=h,f.geometry=d,f.material=p,f.groupOrder=v,f.renderOrder=h.renderOrder,f.z=y,f.group=m),e++,f}function a(h,d,p,v,y,m){const f=o(h,d,p,v,y,m);p.transmission>0?i.push(f):p.transparent===!0?r.push(f):n.push(f)}function l(h,d,p,v,y,m){const f=o(h,d,p,v,y,m);p.transmission>0?i.unshift(f):p.transparent===!0?r.unshift(f):n.unshift(f)}function c(h,d){n.length>1&&n.sort(h||SA),i.length>1&&i.sort(d||fg),r.length>1&&r.sort(d||fg)}function u(){for(let h=e,d=t.length;h<d;h++){const p=t[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function MA(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new dg,t.set(i,[o])):r>=s.length?(o=new dg,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function EA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new B,color:new ot};break;case"SpotLight":n={position:new B,direction:new B,color:new ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new B,color:new ot,distance:0,decay:0};break;case"HemisphereLight":n={direction:new B,skyColor:new ot,groundColor:new ot};break;case"RectAreaLight":n={color:new ot,position:new B,halfWidth:new B,halfHeight:new B};break}return t[e.id]=n,n}}}function wA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let TA=0;function AA(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function bA(t,e){const n=new EA,i=wA(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new B);const s=new B,o=new dt,a=new dt;function l(u,h){let d=0,p=0,v=0;for(let V=0;V<9;V++)r.probe[V].set(0,0,0);let y=0,m=0,f=0,_=0,g=0,E=0,P=0,C=0,b=0,U=0,M=0;u.sort(AA);const T=h===!0?Math.PI:1;for(let V=0,ie=u.length;V<ie;V++){const k=u[V],X=k.color,z=k.intensity,ne=k.distance,O=k.shadow&&k.shadow.map?k.shadow.map.texture:null;if(k.isAmbientLight)d+=X.r*z*T,p+=X.g*z*T,v+=X.b*z*T;else if(k.isLightProbe){for(let G=0;G<9;G++)r.probe[G].addScaledVector(k.sh.coefficients[G],z);M++}else if(k.isDirectionalLight){const G=n.get(k);if(G.color.copy(k.color).multiplyScalar(k.intensity*T),k.castShadow){const j=k.shadow,re=i.get(k);re.shadowBias=j.bias,re.shadowNormalBias=j.normalBias,re.shadowRadius=j.radius,re.shadowMapSize=j.mapSize,r.directionalShadow[y]=re,r.directionalShadowMap[y]=O,r.directionalShadowMatrix[y]=k.shadow.matrix,E++}r.directional[y]=G,y++}else if(k.isSpotLight){const G=n.get(k);G.position.setFromMatrixPosition(k.matrixWorld),G.color.copy(X).multiplyScalar(z*T),G.distance=ne,G.coneCos=Math.cos(k.angle),G.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),G.decay=k.decay,r.spot[f]=G;const j=k.shadow;if(k.map&&(r.spotLightMap[b]=k.map,b++,j.updateMatrices(k),k.castShadow&&U++),r.spotLightMatrix[f]=j.matrix,k.castShadow){const re=i.get(k);re.shadowBias=j.bias,re.shadowNormalBias=j.normalBias,re.shadowRadius=j.radius,re.shadowMapSize=j.mapSize,r.spotShadow[f]=re,r.spotShadowMap[f]=O,C++}f++}else if(k.isRectAreaLight){const G=n.get(k);G.color.copy(X).multiplyScalar(z),G.halfWidth.set(k.width*.5,0,0),G.halfHeight.set(0,k.height*.5,0),r.rectArea[_]=G,_++}else if(k.isPointLight){const G=n.get(k);if(G.color.copy(k.color).multiplyScalar(k.intensity*T),G.distance=k.distance,G.decay=k.decay,k.castShadow){const j=k.shadow,re=i.get(k);re.shadowBias=j.bias,re.shadowNormalBias=j.normalBias,re.shadowRadius=j.radius,re.shadowMapSize=j.mapSize,re.shadowCameraNear=j.camera.near,re.shadowCameraFar=j.camera.far,r.pointShadow[m]=re,r.pointShadowMap[m]=O,r.pointShadowMatrix[m]=k.shadow.matrix,P++}r.point[m]=G,m++}else if(k.isHemisphereLight){const G=n.get(k);G.skyColor.copy(k.color).multiplyScalar(z*T),G.groundColor.copy(k.groundColor).multiplyScalar(z*T),r.hemi[g]=G,g++}}_>0&&(e.isWebGL2?t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Re.LTC_FLOAT_1,r.rectAreaLTC2=Re.LTC_FLOAT_2):(r.rectAreaLTC1=Re.LTC_HALF_1,r.rectAreaLTC2=Re.LTC_HALF_2):t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Re.LTC_FLOAT_1,r.rectAreaLTC2=Re.LTC_FLOAT_2):t.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=Re.LTC_HALF_1,r.rectAreaLTC2=Re.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=p,r.ambient[2]=v;const H=r.hash;(H.directionalLength!==y||H.pointLength!==m||H.spotLength!==f||H.rectAreaLength!==_||H.hemiLength!==g||H.numDirectionalShadows!==E||H.numPointShadows!==P||H.numSpotShadows!==C||H.numSpotMaps!==b||H.numLightProbes!==M)&&(r.directional.length=y,r.spot.length=f,r.rectArea.length=_,r.point.length=m,r.hemi.length=g,r.directionalShadow.length=E,r.directionalShadowMap.length=E,r.pointShadow.length=P,r.pointShadowMap.length=P,r.spotShadow.length=C,r.spotShadowMap.length=C,r.directionalShadowMatrix.length=E,r.pointShadowMatrix.length=P,r.spotLightMatrix.length=C+b-U,r.spotLightMap.length=b,r.numSpotLightShadowsWithMaps=U,r.numLightProbes=M,H.directionalLength=y,H.pointLength=m,H.spotLength=f,H.rectAreaLength=_,H.hemiLength=g,H.numDirectionalShadows=E,H.numPointShadows=P,H.numSpotShadows=C,H.numSpotMaps=b,H.numLightProbes=M,r.version=TA++)}function c(u,h){let d=0,p=0,v=0,y=0,m=0;const f=h.matrixWorldInverse;for(let _=0,g=u.length;_<g;_++){const E=u[_];if(E.isDirectionalLight){const P=r.directional[d];P.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(f),d++}else if(E.isSpotLight){const P=r.spot[v];P.position.setFromMatrixPosition(E.matrixWorld),P.position.applyMatrix4(f),P.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(f),v++}else if(E.isRectAreaLight){const P=r.rectArea[y];P.position.setFromMatrixPosition(E.matrixWorld),P.position.applyMatrix4(f),a.identity(),o.copy(E.matrixWorld),o.premultiply(f),a.extractRotation(o),P.halfWidth.set(E.width*.5,0,0),P.halfHeight.set(0,E.height*.5,0),P.halfWidth.applyMatrix4(a),P.halfHeight.applyMatrix4(a),y++}else if(E.isPointLight){const P=r.point[p];P.position.setFromMatrixPosition(E.matrixWorld),P.position.applyMatrix4(f),p++}else if(E.isHemisphereLight){const P=r.hemi[m];P.direction.setFromMatrixPosition(E.matrixWorld),P.direction.transformDirection(f),m++}}}return{setup:l,setupView:c,state:r}}function hg(t,e){const n=new bA(t,e),i=[],r=[];function s(){i.length=0,r.length=0}function o(h){i.push(h)}function a(h){r.push(h)}function l(h){n.setup(i,h)}function c(h){n.setupView(i,h)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:n},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function RA(t,e){let n=new WeakMap;function i(s,o=0){const a=n.get(s);let l;return a===void 0?(l=new hg(t,e),n.set(s,[l])):o>=a.length?(l=new hg(t,e),a.push(l)):l=a[o],l}function r(){n=new WeakMap}return{get:i,dispose:r}}class CA extends Ai{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class LA extends Ai{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const PA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,NA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function DA(t,e,n){let i=new Eh;const r=new Ke,s=new Ke,o=new Rt,a=new CA({depthPacking:pM}),l=new LA,c={},u=n.maxTextureSize,h={[Zi]:zn,[zn]:Zi,[di]:di},d=new rs({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ke},radius:{value:4}},vertexShader:PA,fragmentShader:NA}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const v=new Kt;v.setAttribute("position",new Sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Qt(v,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=rv;let f=this.type;this.render=function(C,b,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const M=t.getRenderTarget(),T=t.getActiveCubeFace(),H=t.getActiveMipmapLevel(),V=t.state;V.setBlending(Er),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const ie=f!==Oi&&this.type===Oi,k=f===Oi&&this.type!==Oi;for(let X=0,z=C.length;X<z;X++){const ne=C[X],O=ne.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;r.copy(O.mapSize);const G=O.getFrameExtents();if(r.multiply(G),s.copy(O.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/G.x),r.x=s.x*G.x,O.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/G.y),r.y=s.y*G.y,O.mapSize.y=s.y)),O.map===null||ie===!0||k===!0){const re=this.type!==Oi?{minFilter:cn,magFilter:cn}:{};O.map!==null&&O.map.dispose(),O.map=new is(r.x,r.y,re),O.map.texture.name=ne.name+".shadowMap",O.camera.updateProjectionMatrix()}t.setRenderTarget(O.map),t.clear();const j=O.getViewportCount();for(let re=0;re<j;re++){const oe=O.getViewport(re);o.set(s.x*oe.x,s.y*oe.y,s.x*oe.z,s.y*oe.w),V.viewport(o),O.updateMatrices(ne,re),i=O.getFrustum(),E(b,U,O.camera,ne,this.type)}O.isPointLightShadow!==!0&&this.type===Oi&&_(O,U),O.needsUpdate=!1}f=this.type,m.needsUpdate=!1,t.setRenderTarget(M,T,H)};function _(C,b){const U=e.update(y);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new is(r.x,r.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,t.setRenderTarget(C.mapPass),t.clear(),t.renderBufferDirect(b,null,U,d,y,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,t.setRenderTarget(C.map),t.clear(),t.renderBufferDirect(b,null,U,p,y,null)}function g(C,b,U,M){let T=null;const H=U.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(H!==void 0)T=H;else if(T=U.isPointLight===!0?l:a,t.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const V=T.uuid,ie=b.uuid;let k=c[V];k===void 0&&(k={},c[V]=k);let X=k[ie];X===void 0&&(X=T.clone(),k[ie]=X,b.addEventListener("dispose",P)),T=X}if(T.visible=b.visible,T.wireframe=b.wireframe,M===Oi?T.side=b.shadowSide!==null?b.shadowSide:b.side:T.side=b.shadowSide!==null?b.shadowSide:h[b.side],T.alphaMap=b.alphaMap,T.alphaTest=b.alphaTest,T.map=b.map,T.clipShadows=b.clipShadows,T.clippingPlanes=b.clippingPlanes,T.clipIntersection=b.clipIntersection,T.displacementMap=b.displacementMap,T.displacementScale=b.displacementScale,T.displacementBias=b.displacementBias,T.wireframeLinewidth=b.wireframeLinewidth,T.linewidth=b.linewidth,U.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const V=t.properties.get(T);V.light=U}return T}function E(C,b,U,M,T){if(C.visible===!1)return;if(C.layers.test(b.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&T===Oi)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,C.matrixWorld);const ie=e.update(C),k=C.material;if(Array.isArray(k)){const X=ie.groups;for(let z=0,ne=X.length;z<ne;z++){const O=X[z],G=k[O.materialIndex];if(G&&G.visible){const j=g(C,G,M,T);C.onBeforeShadow(t,C,b,U,ie,j,O),t.renderBufferDirect(U,null,ie,j,C,O),C.onAfterShadow(t,C,b,U,ie,j,O)}}}else if(k.visible){const X=g(C,k,M,T);C.onBeforeShadow(t,C,b,U,ie,X,null),t.renderBufferDirect(U,null,ie,X,C,null),C.onAfterShadow(t,C,b,U,ie,X,null)}}const V=C.children;for(let ie=0,k=V.length;ie<k;ie++)E(V[ie],b,U,M,T)}function P(C){C.target.removeEventListener("dispose",P);for(const U in c){const M=c[U],T=C.target.uuid;T in M&&(M[T].dispose(),delete M[T])}}}function IA(t,e,n){const i=n.isWebGL2;function r(){let F=!1;const Me=new Rt;let Ee=null;const qe=new Rt(0,0,0,0);return{setMask:function(Be){Ee!==Be&&!F&&(t.colorMask(Be,Be,Be,Be),Ee=Be)},setLocked:function(Be){F=Be},setClear:function(Be,Xe,Je,ut,Ct){Ct===!0&&(Be*=ut,Xe*=ut,Je*=ut),Me.set(Be,Xe,Je,ut),qe.equals(Me)===!1&&(t.clearColor(Be,Xe,Je,ut),qe.copy(Me))},reset:function(){F=!1,Ee=null,qe.set(-1,0,0,0)}}}function s(){let F=!1,Me=null,Ee=null,qe=null;return{setTest:function(Be){Be?Ve(t.DEPTH_TEST):ke(t.DEPTH_TEST)},setMask:function(Be){Me!==Be&&!F&&(t.depthMask(Be),Me=Be)},setFunc:function(Be){if(Ee!==Be){switch(Be){case HS:t.depthFunc(t.NEVER);break;case VS:t.depthFunc(t.ALWAYS);break;case GS:t.depthFunc(t.LESS);break;case wc:t.depthFunc(t.LEQUAL);break;case WS:t.depthFunc(t.EQUAL);break;case XS:t.depthFunc(t.GEQUAL);break;case jS:t.depthFunc(t.GREATER);break;case qS:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}Ee=Be}},setLocked:function(Be){F=Be},setClear:function(Be){qe!==Be&&(t.clearDepth(Be),qe=Be)},reset:function(){F=!1,Me=null,Ee=null,qe=null}}}function o(){let F=!1,Me=null,Ee=null,qe=null,Be=null,Xe=null,Je=null,ut=null,Ct=null;return{setTest:function(Et){F||(Et?Ve(t.STENCIL_TEST):ke(t.STENCIL_TEST))},setMask:function(Et){Me!==Et&&!F&&(t.stencilMask(Et),Me=Et)},setFunc:function(Et,Zt,Nn){(Ee!==Et||qe!==Zt||Be!==Nn)&&(t.stencilFunc(Et,Zt,Nn),Ee=Et,qe=Zt,Be=Nn)},setOp:function(Et,Zt,Nn){(Xe!==Et||Je!==Zt||ut!==Nn)&&(t.stencilOp(Et,Zt,Nn),Xe=Et,Je=Zt,ut=Nn)},setLocked:function(Et){F=Et},setClear:function(Et){Ct!==Et&&(t.clearStencil(Et),Ct=Et)},reset:function(){F=!1,Me=null,Ee=null,qe=null,Be=null,Xe=null,Je=null,ut=null,Ct=null}}}const a=new r,l=new s,c=new o,u=new WeakMap,h=new WeakMap;let d={},p={},v=new WeakMap,y=[],m=null,f=!1,_=null,g=null,E=null,P=null,C=null,b=null,U=null,M=new ot(0,0,0),T=0,H=!1,V=null,ie=null,k=null,X=null,z=null;const ne=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,G=0;const j=t.getParameter(t.VERSION);j.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(j)[1]),O=G>=1):j.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),O=G>=2);let re=null,oe={};const W=t.getParameter(t.SCISSOR_BOX),$=t.getParameter(t.VIEWPORT),le=new Rt().fromArray(W),ae=new Rt().fromArray($);function fe(F,Me,Ee,qe){const Be=new Uint8Array(4),Xe=t.createTexture();t.bindTexture(F,Xe),t.texParameteri(F,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(F,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Je=0;Je<Ee;Je++)i&&(F===t.TEXTURE_3D||F===t.TEXTURE_2D_ARRAY)?t.texImage3D(Me,0,t.RGBA,1,1,qe,0,t.RGBA,t.UNSIGNED_BYTE,Be):t.texImage2D(Me+Je,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,Be);return Xe}const Te={};Te[t.TEXTURE_2D]=fe(t.TEXTURE_2D,t.TEXTURE_2D,1),Te[t.TEXTURE_CUBE_MAP]=fe(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Te[t.TEXTURE_2D_ARRAY]=fe(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),Te[t.TEXTURE_3D]=fe(t.TEXTURE_3D,t.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ve(t.DEPTH_TEST),l.setFunc(wc),st(!1),D(Xp),Ve(t.CULL_FACE),Ie(Er);function Ve(F){d[F]!==!0&&(t.enable(F),d[F]=!0)}function ke(F){d[F]!==!1&&(t.disable(F),d[F]=!1)}function pt(F,Me){return p[F]!==Me?(t.bindFramebuffer(F,Me),p[F]=Me,i&&(F===t.DRAW_FRAMEBUFFER&&(p[t.FRAMEBUFFER]=Me),F===t.FRAMEBUFFER&&(p[t.DRAW_FRAMEBUFFER]=Me)),!0):!1}function K(F,Me){let Ee=y,qe=!1;if(F)if(Ee=v.get(Me),Ee===void 0&&(Ee=[],v.set(Me,Ee)),F.isWebGLMultipleRenderTargets){const Be=F.texture;if(Ee.length!==Be.length||Ee[0]!==t.COLOR_ATTACHMENT0){for(let Xe=0,Je=Be.length;Xe<Je;Xe++)Ee[Xe]=t.COLOR_ATTACHMENT0+Xe;Ee.length=Be.length,qe=!0}}else Ee[0]!==t.COLOR_ATTACHMENT0&&(Ee[0]=t.COLOR_ATTACHMENT0,qe=!0);else Ee[0]!==t.BACK&&(Ee[0]=t.BACK,qe=!0);qe&&(n.isWebGL2?t.drawBuffers(Ee):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Ee))}function _t(F){return m!==F?(t.useProgram(F),m=F,!0):!1}const Ge={[Br]:t.FUNC_ADD,[AS]:t.FUNC_SUBTRACT,[bS]:t.FUNC_REVERSE_SUBTRACT};if(i)Ge[$p]=t.MIN,Ge[Kp]=t.MAX;else{const F=e.get("EXT_blend_minmax");F!==null&&(Ge[$p]=F.MIN_EXT,Ge[Kp]=F.MAX_EXT)}const et={[RS]:t.ZERO,[CS]:t.ONE,[LS]:t.SRC_COLOR,[hd]:t.SRC_ALPHA,[FS]:t.SRC_ALPHA_SATURATE,[IS]:t.DST_COLOR,[NS]:t.DST_ALPHA,[PS]:t.ONE_MINUS_SRC_COLOR,[pd]:t.ONE_MINUS_SRC_ALPHA,[US]:t.ONE_MINUS_DST_COLOR,[DS]:t.ONE_MINUS_DST_ALPHA,[OS]:t.CONSTANT_COLOR,[kS]:t.ONE_MINUS_CONSTANT_COLOR,[zS]:t.CONSTANT_ALPHA,[BS]:t.ONE_MINUS_CONSTANT_ALPHA};function Ie(F,Me,Ee,qe,Be,Xe,Je,ut,Ct,Et){if(F===Er){f===!0&&(ke(t.BLEND),f=!1);return}if(f===!1&&(Ve(t.BLEND),f=!0),F!==TS){if(F!==_||Et!==H){if((g!==Br||C!==Br)&&(t.blendEquation(t.FUNC_ADD),g=Br,C=Br),Et)switch(F){case io:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case jp:t.blendFunc(t.ONE,t.ONE);break;case qp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Yp:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case io:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case jp:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case qp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Yp:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}E=null,P=null,b=null,U=null,M.set(0,0,0),T=0,_=F,H=Et}return}Be=Be||Me,Xe=Xe||Ee,Je=Je||qe,(Me!==g||Be!==C)&&(t.blendEquationSeparate(Ge[Me],Ge[Be]),g=Me,C=Be),(Ee!==E||qe!==P||Xe!==b||Je!==U)&&(t.blendFuncSeparate(et[Ee],et[qe],et[Xe],et[Je]),E=Ee,P=qe,b=Xe,U=Je),(ut.equals(M)===!1||Ct!==T)&&(t.blendColor(ut.r,ut.g,ut.b,Ct),M.copy(ut),T=Ct),_=F,H=!1}function Mt(F,Me){F.side===di?ke(t.CULL_FACE):Ve(t.CULL_FACE);let Ee=F.side===zn;Me&&(Ee=!Ee),st(Ee),F.blending===io&&F.transparent===!1?Ie(Er):Ie(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),l.setFunc(F.depthFunc),l.setTest(F.depthTest),l.setMask(F.depthWrite),a.setMask(F.colorWrite);const qe=F.stencilWrite;c.setTest(qe),qe&&(c.setMask(F.stencilWriteMask),c.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),c.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Z(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?Ve(t.SAMPLE_ALPHA_TO_COVERAGE):ke(t.SAMPLE_ALPHA_TO_COVERAGE)}function st(F){V!==F&&(F?t.frontFace(t.CW):t.frontFace(t.CCW),V=F)}function D(F){F!==MS?(Ve(t.CULL_FACE),F!==ie&&(F===Xp?t.cullFace(t.BACK):F===ES?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):ke(t.CULL_FACE),ie=F}function A(F){F!==k&&(O&&t.lineWidth(F),k=F)}function Z(F,Me,Ee){F?(Ve(t.POLYGON_OFFSET_FILL),(X!==Me||z!==Ee)&&(t.polygonOffset(Me,Ee),X=Me,z=Ee)):ke(t.POLYGON_OFFSET_FILL)}function _e(F){F?Ve(t.SCISSOR_TEST):ke(t.SCISSOR_TEST)}function pe(F){F===void 0&&(F=t.TEXTURE0+ne-1),re!==F&&(t.activeTexture(F),re=F)}function ve(F,Me,Ee){Ee===void 0&&(re===null?Ee=t.TEXTURE0+ne-1:Ee=re);let qe=oe[Ee];qe===void 0&&(qe={type:void 0,texture:void 0},oe[Ee]=qe),(qe.type!==F||qe.texture!==Me)&&(re!==Ee&&(t.activeTexture(Ee),re=Ee),t.bindTexture(F,Me||Te[F]),qe.type=F,qe.texture=Me)}function ze(){const F=oe[re];F!==void 0&&F.type!==void 0&&(t.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function we(){try{t.compressedTexImage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Y(){try{t.compressedTexImage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function de(){try{t.texSubImage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Se(){try{t.texSubImage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function J(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ce(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function I(){try{t.texStorage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ce(){try{t.texStorage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function me(){try{t.texImage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function he(){try{t.texImage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function be(F){le.equals(F)===!1&&(t.scissor(F.x,F.y,F.z,F.w),le.copy(F))}function tt(F){ae.equals(F)===!1&&(t.viewport(F.x,F.y,F.z,F.w),ae.copy(F))}function Ze(F,Me){let Ee=h.get(Me);Ee===void 0&&(Ee=new WeakMap,h.set(Me,Ee));let qe=Ee.get(F);qe===void 0&&(qe=t.getUniformBlockIndex(Me,F.name),Ee.set(F,qe))}function je(F,Me){const qe=h.get(Me).get(F);u.get(Me)!==qe&&(t.uniformBlockBinding(Me,qe,F.__bindingPointIndex),u.set(Me,qe))}function ye(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),i===!0&&(t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null)),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),d={},re=null,oe={},p={},v=new WeakMap,y=[],m=null,f=!1,_=null,g=null,E=null,P=null,C=null,b=null,U=null,M=new ot(0,0,0),T=0,H=!1,V=null,ie=null,k=null,X=null,z=null,le.set(0,0,t.canvas.width,t.canvas.height),ae.set(0,0,t.canvas.width,t.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Ve,disable:ke,bindFramebuffer:pt,drawBuffers:K,useProgram:_t,setBlending:Ie,setMaterial:Mt,setFlipSided:st,setCullFace:D,setLineWidth:A,setPolygonOffset:Z,setScissorTest:_e,activeTexture:pe,bindTexture:ve,unbindTexture:ze,compressedTexImage2D:we,compressedTexImage3D:Y,texImage2D:me,texImage3D:he,updateUBOMapping:Ze,uniformBlockBinding:je,texStorage2D:I,texStorage3D:ce,texSubImage2D:de,texSubImage3D:Se,compressedTexSubImage2D:J,compressedTexSubImage3D:Ce,scissor:be,viewport:tt,reset:ye}}function UA(t,e,n,i,r,s,o){const a=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(D,A){return p?new OffscreenCanvas(D,A):Ua("canvas")}function y(D,A,Z,_e){let pe=1;if((D.width>_e||D.height>_e)&&(pe=_e/Math.max(D.width,D.height)),pe<1||A===!0)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap){const ve=A?Pc:Math.floor,ze=ve(pe*D.width),we=ve(pe*D.height);h===void 0&&(h=v(ze,we));const Y=Z?v(ze,we):h;return Y.width=ze,Y.height=we,Y.getContext("2d").drawImage(D,0,0,ze,we),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+D.width+"x"+D.height+") to ("+ze+"x"+we+")."),Y}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+D.width+"x"+D.height+")."),D;return D}function m(D){return xd(D.width)&&xd(D.height)}function f(D){return a?!1:D.wrapS!==Rn||D.wrapT!==Rn||D.minFilter!==cn&&D.minFilter!==bn}function _(D,A){return D.generateMipmaps&&A&&D.minFilter!==cn&&D.minFilter!==bn}function g(D){t.generateMipmap(D)}function E(D,A,Z,_e,pe=!1){if(a===!1)return A;if(D!==null){if(t[D]!==void 0)return t[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let ve=A;if(A===t.RED&&(Z===t.FLOAT&&(ve=t.R32F),Z===t.HALF_FLOAT&&(ve=t.R16F),Z===t.UNSIGNED_BYTE&&(ve=t.R8)),A===t.RED_INTEGER&&(Z===t.UNSIGNED_BYTE&&(ve=t.R8UI),Z===t.UNSIGNED_SHORT&&(ve=t.R16UI),Z===t.UNSIGNED_INT&&(ve=t.R32UI),Z===t.BYTE&&(ve=t.R8I),Z===t.SHORT&&(ve=t.R16I),Z===t.INT&&(ve=t.R32I)),A===t.RG&&(Z===t.FLOAT&&(ve=t.RG32F),Z===t.HALF_FLOAT&&(ve=t.RG16F),Z===t.UNSIGNED_BYTE&&(ve=t.RG8)),A===t.RGBA){const ze=pe?bc:bt.getTransfer(_e);Z===t.FLOAT&&(ve=t.RGBA32F),Z===t.HALF_FLOAT&&(ve=t.RGBA16F),Z===t.UNSIGNED_BYTE&&(ve=ze===It?t.SRGB8_ALPHA8:t.RGBA8),Z===t.UNSIGNED_SHORT_4_4_4_4&&(ve=t.RGBA4),Z===t.UNSIGNED_SHORT_5_5_5_1&&(ve=t.RGB5_A1)}return(ve===t.R16F||ve===t.R32F||ve===t.RG16F||ve===t.RG32F||ve===t.RGBA16F||ve===t.RGBA32F)&&e.get("EXT_color_buffer_float"),ve}function P(D,A,Z){return _(D,Z)===!0||D.isFramebufferTexture&&D.minFilter!==cn&&D.minFilter!==bn?Math.log2(Math.max(A.width,A.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?A.mipmaps.length:1}function C(D){return D===cn||D===Jp||D===Fu?t.NEAREST:t.LINEAR}function b(D){const A=D.target;A.removeEventListener("dispose",b),M(A),A.isVideoTexture&&u.delete(A)}function U(D){const A=D.target;A.removeEventListener("dispose",U),H(A)}function M(D){const A=i.get(D);if(A.__webglInit===void 0)return;const Z=D.source,_e=d.get(Z);if(_e){const pe=_e[A.__cacheKey];pe.usedTimes--,pe.usedTimes===0&&T(D),Object.keys(_e).length===0&&d.delete(Z)}i.remove(D)}function T(D){const A=i.get(D);t.deleteTexture(A.__webglTexture);const Z=D.source,_e=d.get(Z);delete _e[A.__cacheKey],o.memory.textures--}function H(D){const A=D.texture,Z=i.get(D),_e=i.get(A);if(_e.__webglTexture!==void 0&&(t.deleteTexture(_e.__webglTexture),o.memory.textures--),D.depthTexture&&D.depthTexture.dispose(),D.isWebGLCubeRenderTarget)for(let pe=0;pe<6;pe++){if(Array.isArray(Z.__webglFramebuffer[pe]))for(let ve=0;ve<Z.__webglFramebuffer[pe].length;ve++)t.deleteFramebuffer(Z.__webglFramebuffer[pe][ve]);else t.deleteFramebuffer(Z.__webglFramebuffer[pe]);Z.__webglDepthbuffer&&t.deleteRenderbuffer(Z.__webglDepthbuffer[pe])}else{if(Array.isArray(Z.__webglFramebuffer))for(let pe=0;pe<Z.__webglFramebuffer.length;pe++)t.deleteFramebuffer(Z.__webglFramebuffer[pe]);else t.deleteFramebuffer(Z.__webglFramebuffer);if(Z.__webglDepthbuffer&&t.deleteRenderbuffer(Z.__webglDepthbuffer),Z.__webglMultisampledFramebuffer&&t.deleteFramebuffer(Z.__webglMultisampledFramebuffer),Z.__webglColorRenderbuffer)for(let pe=0;pe<Z.__webglColorRenderbuffer.length;pe++)Z.__webglColorRenderbuffer[pe]&&t.deleteRenderbuffer(Z.__webglColorRenderbuffer[pe]);Z.__webglDepthRenderbuffer&&t.deleteRenderbuffer(Z.__webglDepthRenderbuffer)}if(D.isWebGLMultipleRenderTargets)for(let pe=0,ve=A.length;pe<ve;pe++){const ze=i.get(A[pe]);ze.__webglTexture&&(t.deleteTexture(ze.__webglTexture),o.memory.textures--),i.remove(A[pe])}i.remove(A),i.remove(D)}let V=0;function ie(){V=0}function k(){const D=V;return D>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+r.maxTextures),V+=1,D}function X(D){const A=[];return A.push(D.wrapS),A.push(D.wrapT),A.push(D.wrapR||0),A.push(D.magFilter),A.push(D.minFilter),A.push(D.anisotropy),A.push(D.internalFormat),A.push(D.format),A.push(D.type),A.push(D.generateMipmaps),A.push(D.premultiplyAlpha),A.push(D.flipY),A.push(D.unpackAlignment),A.push(D.colorSpace),A.join()}function z(D,A){const Z=i.get(D);if(D.isVideoTexture&&Mt(D),D.isRenderTargetTexture===!1&&D.version>0&&Z.__version!==D.version){const _e=D.image;if(_e===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(_e.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le(Z,D,A);return}}n.bindTexture(t.TEXTURE_2D,Z.__webglTexture,t.TEXTURE0+A)}function ne(D,A){const Z=i.get(D);if(D.version>0&&Z.__version!==D.version){le(Z,D,A);return}n.bindTexture(t.TEXTURE_2D_ARRAY,Z.__webglTexture,t.TEXTURE0+A)}function O(D,A){const Z=i.get(D);if(D.version>0&&Z.__version!==D.version){le(Z,D,A);return}n.bindTexture(t.TEXTURE_3D,Z.__webglTexture,t.TEXTURE0+A)}function G(D,A){const Z=i.get(D);if(D.version>0&&Z.__version!==D.version){ae(Z,D,A);return}n.bindTexture(t.TEXTURE_CUBE_MAP,Z.__webglTexture,t.TEXTURE0+A)}const j={[Xr]:t.REPEAT,[Rn]:t.CLAMP_TO_EDGE,[_d]:t.MIRRORED_REPEAT},re={[cn]:t.NEAREST,[Jp]:t.NEAREST_MIPMAP_NEAREST,[Fu]:t.NEAREST_MIPMAP_LINEAR,[bn]:t.LINEAR,[iM]:t.LINEAR_MIPMAP_NEAREST,[ns]:t.LINEAR_MIPMAP_LINEAR},oe={[gM]:t.NEVER,[MM]:t.ALWAYS,[_M]:t.LESS,[pv]:t.LEQUAL,[vM]:t.EQUAL,[SM]:t.GEQUAL,[yM]:t.GREATER,[xM]:t.NOTEQUAL};function W(D,A,Z){if(Z?(t.texParameteri(D,t.TEXTURE_WRAP_S,j[A.wrapS]),t.texParameteri(D,t.TEXTURE_WRAP_T,j[A.wrapT]),(D===t.TEXTURE_3D||D===t.TEXTURE_2D_ARRAY)&&t.texParameteri(D,t.TEXTURE_WRAP_R,j[A.wrapR]),t.texParameteri(D,t.TEXTURE_MAG_FILTER,re[A.magFilter]),t.texParameteri(D,t.TEXTURE_MIN_FILTER,re[A.minFilter])):(t.texParameteri(D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),(D===t.TEXTURE_3D||D===t.TEXTURE_2D_ARRAY)&&t.texParameteri(D,t.TEXTURE_WRAP_R,t.CLAMP_TO_EDGE),(A.wrapS!==Rn||A.wrapT!==Rn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),t.texParameteri(D,t.TEXTURE_MAG_FILTER,C(A.magFilter)),t.texParameteri(D,t.TEXTURE_MIN_FILTER,C(A.minFilter)),A.minFilter!==cn&&A.minFilter!==bn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),A.compareFunction&&(t.texParameteri(D,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(D,t.TEXTURE_COMPARE_FUNC,oe[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const _e=e.get("EXT_texture_filter_anisotropic");if(A.magFilter===cn||A.minFilter!==Fu&&A.minFilter!==ns||A.type===Gi&&e.has("OES_texture_float_linear")===!1||a===!1&&A.type===Ia&&e.has("OES_texture_half_float_linear")===!1)return;(A.anisotropy>1||i.get(A).__currentAnisotropy)&&(t.texParameterf(D,_e.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,r.getMaxAnisotropy())),i.get(A).__currentAnisotropy=A.anisotropy)}}function $(D,A){let Z=!1;D.__webglInit===void 0&&(D.__webglInit=!0,A.addEventListener("dispose",b));const _e=A.source;let pe=d.get(_e);pe===void 0&&(pe={},d.set(_e,pe));const ve=X(A);if(ve!==D.__cacheKey){pe[ve]===void 0&&(pe[ve]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,Z=!0),pe[ve].usedTimes++;const ze=pe[D.__cacheKey];ze!==void 0&&(pe[D.__cacheKey].usedTimes--,ze.usedTimes===0&&T(A)),D.__cacheKey=ve,D.__webglTexture=pe[ve].texture}return Z}function le(D,A,Z){let _e=t.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(_e=t.TEXTURE_2D_ARRAY),A.isData3DTexture&&(_e=t.TEXTURE_3D);const pe=$(D,A),ve=A.source;n.bindTexture(_e,D.__webglTexture,t.TEXTURE0+Z);const ze=i.get(ve);if(ve.version!==ze.__version||pe===!0){n.activeTexture(t.TEXTURE0+Z);const we=bt.getPrimaries(bt.workingColorSpace),Y=A.colorSpace===ei?null:bt.getPrimaries(A.colorSpace),de=A.colorSpace===ei||we===Y?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,A.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,A.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const Se=f(A)&&m(A.image)===!1;let J=y(A.image,Se,!1,r.maxTextureSize);J=st(A,J);const Ce=m(J)||a,I=s.convert(A.format,A.colorSpace);let ce=s.convert(A.type),me=E(A.internalFormat,I,ce,A.colorSpace,A.isVideoTexture);W(_e,A,Ce);let he;const be=A.mipmaps,tt=a&&A.isVideoTexture!==!0&&me!==dv,Ze=ze.__version===void 0||pe===!0,je=P(A,J,Ce);if(A.isDepthTexture)me=t.DEPTH_COMPONENT,a?A.type===Gi?me=t.DEPTH_COMPONENT32F:A.type===pr?me=t.DEPTH_COMPONENT24:A.type===Yr?me=t.DEPTH24_STENCIL8:me=t.DEPTH_COMPONENT16:A.type===Gi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===$r&&me===t.DEPTH_COMPONENT&&A.type!==yh&&A.type!==pr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=pr,ce=s.convert(A.type)),A.format===mo&&me===t.DEPTH_COMPONENT&&(me=t.DEPTH_STENCIL,A.type!==Yr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=Yr,ce=s.convert(A.type))),Ze&&(tt?n.texStorage2D(t.TEXTURE_2D,1,me,J.width,J.height):n.texImage2D(t.TEXTURE_2D,0,me,J.width,J.height,0,I,ce,null));else if(A.isDataTexture)if(be.length>0&&Ce){tt&&Ze&&n.texStorage2D(t.TEXTURE_2D,je,me,be[0].width,be[0].height);for(let ye=0,F=be.length;ye<F;ye++)he=be[ye],tt?n.texSubImage2D(t.TEXTURE_2D,ye,0,0,he.width,he.height,I,ce,he.data):n.texImage2D(t.TEXTURE_2D,ye,me,he.width,he.height,0,I,ce,he.data);A.generateMipmaps=!1}else tt?(Ze&&n.texStorage2D(t.TEXTURE_2D,je,me,J.width,J.height),n.texSubImage2D(t.TEXTURE_2D,0,0,0,J.width,J.height,I,ce,J.data)):n.texImage2D(t.TEXTURE_2D,0,me,J.width,J.height,0,I,ce,J.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){tt&&Ze&&n.texStorage3D(t.TEXTURE_2D_ARRAY,je,me,be[0].width,be[0].height,J.depth);for(let ye=0,F=be.length;ye<F;ye++)he=be[ye],A.format!==Qn?I!==null?tt?n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ye,0,0,0,he.width,he.height,J.depth,I,he.data,0,0):n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,ye,me,he.width,he.height,J.depth,0,he.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):tt?n.texSubImage3D(t.TEXTURE_2D_ARRAY,ye,0,0,0,he.width,he.height,J.depth,I,ce,he.data):n.texImage3D(t.TEXTURE_2D_ARRAY,ye,me,he.width,he.height,J.depth,0,I,ce,he.data)}else{tt&&Ze&&n.texStorage2D(t.TEXTURE_2D,je,me,be[0].width,be[0].height);for(let ye=0,F=be.length;ye<F;ye++)he=be[ye],A.format!==Qn?I!==null?tt?n.compressedTexSubImage2D(t.TEXTURE_2D,ye,0,0,he.width,he.height,I,he.data):n.compressedTexImage2D(t.TEXTURE_2D,ye,me,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):tt?n.texSubImage2D(t.TEXTURE_2D,ye,0,0,he.width,he.height,I,ce,he.data):n.texImage2D(t.TEXTURE_2D,ye,me,he.width,he.height,0,I,ce,he.data)}else if(A.isDataArrayTexture)tt?(Ze&&n.texStorage3D(t.TEXTURE_2D_ARRAY,je,me,J.width,J.height,J.depth),n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,I,ce,J.data)):n.texImage3D(t.TEXTURE_2D_ARRAY,0,me,J.width,J.height,J.depth,0,I,ce,J.data);else if(A.isData3DTexture)tt?(Ze&&n.texStorage3D(t.TEXTURE_3D,je,me,J.width,J.height,J.depth),n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,I,ce,J.data)):n.texImage3D(t.TEXTURE_3D,0,me,J.width,J.height,J.depth,0,I,ce,J.data);else if(A.isFramebufferTexture){if(Ze)if(tt)n.texStorage2D(t.TEXTURE_2D,je,me,J.width,J.height);else{let ye=J.width,F=J.height;for(let Me=0;Me<je;Me++)n.texImage2D(t.TEXTURE_2D,Me,me,ye,F,0,I,ce,null),ye>>=1,F>>=1}}else if(be.length>0&&Ce){tt&&Ze&&n.texStorage2D(t.TEXTURE_2D,je,me,be[0].width,be[0].height);for(let ye=0,F=be.length;ye<F;ye++)he=be[ye],tt?n.texSubImage2D(t.TEXTURE_2D,ye,0,0,I,ce,he):n.texImage2D(t.TEXTURE_2D,ye,me,I,ce,he);A.generateMipmaps=!1}else tt?(Ze&&n.texStorage2D(t.TEXTURE_2D,je,me,J.width,J.height),n.texSubImage2D(t.TEXTURE_2D,0,0,0,I,ce,J)):n.texImage2D(t.TEXTURE_2D,0,me,I,ce,J);_(A,Ce)&&g(_e),ze.__version=ve.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function ae(D,A,Z){if(A.image.length!==6)return;const _e=$(D,A),pe=A.source;n.bindTexture(t.TEXTURE_CUBE_MAP,D.__webglTexture,t.TEXTURE0+Z);const ve=i.get(pe);if(pe.version!==ve.__version||_e===!0){n.activeTexture(t.TEXTURE0+Z);const ze=bt.getPrimaries(bt.workingColorSpace),we=A.colorSpace===ei?null:bt.getPrimaries(A.colorSpace),Y=A.colorSpace===ei||ze===we?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,A.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,A.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Y);const de=A.isCompressedTexture||A.image[0].isCompressedTexture,Se=A.image[0]&&A.image[0].isDataTexture,J=[];for(let ye=0;ye<6;ye++)!de&&!Se?J[ye]=y(A.image[ye],!1,!0,r.maxCubemapSize):J[ye]=Se?A.image[ye].image:A.image[ye],J[ye]=st(A,J[ye]);const Ce=J[0],I=m(Ce)||a,ce=s.convert(A.format,A.colorSpace),me=s.convert(A.type),he=E(A.internalFormat,ce,me,A.colorSpace),be=a&&A.isVideoTexture!==!0,tt=ve.__version===void 0||_e===!0;let Ze=P(A,Ce,I);W(t.TEXTURE_CUBE_MAP,A,I);let je;if(de){be&&tt&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Ze,he,Ce.width,Ce.height);for(let ye=0;ye<6;ye++){je=J[ye].mipmaps;for(let F=0;F<je.length;F++){const Me=je[F];A.format!==Qn?ce!==null?be?n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,F,0,0,Me.width,Me.height,ce,Me.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,F,he,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):be?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,F,0,0,Me.width,Me.height,ce,me,Me.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,F,he,Me.width,Me.height,0,ce,me,Me.data)}}}else{je=A.mipmaps,be&&tt&&(je.length>0&&Ze++,n.texStorage2D(t.TEXTURE_CUBE_MAP,Ze,he,J[0].width,J[0].height));for(let ye=0;ye<6;ye++)if(Se){be?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,0,0,J[ye].width,J[ye].height,ce,me,J[ye].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,he,J[ye].width,J[ye].height,0,ce,me,J[ye].data);for(let F=0;F<je.length;F++){const Ee=je[F].image[ye].image;be?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,F+1,0,0,Ee.width,Ee.height,ce,me,Ee.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,F+1,he,Ee.width,Ee.height,0,ce,me,Ee.data)}}else{be?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,0,0,ce,me,J[ye]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,he,ce,me,J[ye]);for(let F=0;F<je.length;F++){const Me=je[F];be?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,F+1,0,0,ce,me,Me.image[ye]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,F+1,he,ce,me,Me.image[ye])}}}_(A,I)&&g(t.TEXTURE_CUBE_MAP),ve.__version=pe.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function fe(D,A,Z,_e,pe,ve){const ze=s.convert(Z.format,Z.colorSpace),we=s.convert(Z.type),Y=E(Z.internalFormat,ze,we,Z.colorSpace);if(!i.get(A).__hasExternalTextures){const Se=Math.max(1,A.width>>ve),J=Math.max(1,A.height>>ve);pe===t.TEXTURE_3D||pe===t.TEXTURE_2D_ARRAY?n.texImage3D(pe,ve,Y,Se,J,A.depth,0,ze,we,null):n.texImage2D(pe,ve,Y,Se,J,0,ze,we,null)}n.bindFramebuffer(t.FRAMEBUFFER,D),Ie(A)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,_e,pe,i.get(Z).__webglTexture,0,et(A)):(pe===t.TEXTURE_2D||pe>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&pe<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,_e,pe,i.get(Z).__webglTexture,ve),n.bindFramebuffer(t.FRAMEBUFFER,null)}function Te(D,A,Z){if(t.bindRenderbuffer(t.RENDERBUFFER,D),A.depthBuffer&&!A.stencilBuffer){let _e=a===!0?t.DEPTH_COMPONENT24:t.DEPTH_COMPONENT16;if(Z||Ie(A)){const pe=A.depthTexture;pe&&pe.isDepthTexture&&(pe.type===Gi?_e=t.DEPTH_COMPONENT32F:pe.type===pr&&(_e=t.DEPTH_COMPONENT24));const ve=et(A);Ie(A)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ve,_e,A.width,A.height):t.renderbufferStorageMultisample(t.RENDERBUFFER,ve,_e,A.width,A.height)}else t.renderbufferStorage(t.RENDERBUFFER,_e,A.width,A.height);t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,D)}else if(A.depthBuffer&&A.stencilBuffer){const _e=et(A);Z&&Ie(A)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,_e,t.DEPTH24_STENCIL8,A.width,A.height):Ie(A)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,_e,t.DEPTH24_STENCIL8,A.width,A.height):t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_STENCIL,A.width,A.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,D)}else{const _e=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let pe=0;pe<_e.length;pe++){const ve=_e[pe],ze=s.convert(ve.format,ve.colorSpace),we=s.convert(ve.type),Y=E(ve.internalFormat,ze,we,ve.colorSpace),de=et(A);Z&&Ie(A)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,de,Y,A.width,A.height):Ie(A)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,de,Y,A.width,A.height):t.renderbufferStorage(t.RENDERBUFFER,Y,A.width,A.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Ve(D,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,D),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),z(A.depthTexture,0);const _e=i.get(A.depthTexture).__webglTexture,pe=et(A);if(A.depthTexture.format===$r)Ie(A)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,_e,0,pe):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,_e,0);else if(A.depthTexture.format===mo)Ie(A)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,_e,0,pe):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,_e,0);else throw new Error("Unknown depthTexture format")}function ke(D){const A=i.get(D),Z=D.isWebGLCubeRenderTarget===!0;if(D.depthTexture&&!A.__autoAllocateDepthBuffer){if(Z)throw new Error("target.depthTexture not supported in Cube render targets");Ve(A.__webglFramebuffer,D)}else if(Z){A.__webglDepthbuffer=[];for(let _e=0;_e<6;_e++)n.bindFramebuffer(t.FRAMEBUFFER,A.__webglFramebuffer[_e]),A.__webglDepthbuffer[_e]=t.createRenderbuffer(),Te(A.__webglDepthbuffer[_e],D,!1)}else n.bindFramebuffer(t.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer=t.createRenderbuffer(),Te(A.__webglDepthbuffer,D,!1);n.bindFramebuffer(t.FRAMEBUFFER,null)}function pt(D,A,Z){const _e=i.get(D);A!==void 0&&fe(_e.__webglFramebuffer,D,D.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),Z!==void 0&&ke(D)}function K(D){const A=D.texture,Z=i.get(D),_e=i.get(A);D.addEventListener("dispose",U),D.isWebGLMultipleRenderTargets!==!0&&(_e.__webglTexture===void 0&&(_e.__webglTexture=t.createTexture()),_e.__version=A.version,o.memory.textures++);const pe=D.isWebGLCubeRenderTarget===!0,ve=D.isWebGLMultipleRenderTargets===!0,ze=m(D)||a;if(pe){Z.__webglFramebuffer=[];for(let we=0;we<6;we++)if(a&&A.mipmaps&&A.mipmaps.length>0){Z.__webglFramebuffer[we]=[];for(let Y=0;Y<A.mipmaps.length;Y++)Z.__webglFramebuffer[we][Y]=t.createFramebuffer()}else Z.__webglFramebuffer[we]=t.createFramebuffer()}else{if(a&&A.mipmaps&&A.mipmaps.length>0){Z.__webglFramebuffer=[];for(let we=0;we<A.mipmaps.length;we++)Z.__webglFramebuffer[we]=t.createFramebuffer()}else Z.__webglFramebuffer=t.createFramebuffer();if(ve)if(r.drawBuffers){const we=D.texture;for(let Y=0,de=we.length;Y<de;Y++){const Se=i.get(we[Y]);Se.__webglTexture===void 0&&(Se.__webglTexture=t.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&D.samples>0&&Ie(D)===!1){const we=ve?A:[A];Z.__webglMultisampledFramebuffer=t.createFramebuffer(),Z.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,Z.__webglMultisampledFramebuffer);for(let Y=0;Y<we.length;Y++){const de=we[Y];Z.__webglColorRenderbuffer[Y]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,Z.__webglColorRenderbuffer[Y]);const Se=s.convert(de.format,de.colorSpace),J=s.convert(de.type),Ce=E(de.internalFormat,Se,J,de.colorSpace,D.isXRRenderTarget===!0),I=et(D);t.renderbufferStorageMultisample(t.RENDERBUFFER,I,Ce,D.width,D.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Y,t.RENDERBUFFER,Z.__webglColorRenderbuffer[Y])}t.bindRenderbuffer(t.RENDERBUFFER,null),D.depthBuffer&&(Z.__webglDepthRenderbuffer=t.createRenderbuffer(),Te(Z.__webglDepthRenderbuffer,D,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(pe){n.bindTexture(t.TEXTURE_CUBE_MAP,_e.__webglTexture),W(t.TEXTURE_CUBE_MAP,A,ze);for(let we=0;we<6;we++)if(a&&A.mipmaps&&A.mipmaps.length>0)for(let Y=0;Y<A.mipmaps.length;Y++)fe(Z.__webglFramebuffer[we][Y],D,A,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+we,Y);else fe(Z.__webglFramebuffer[we],D,A,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+we,0);_(A,ze)&&g(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ve){const we=D.texture;for(let Y=0,de=we.length;Y<de;Y++){const Se=we[Y],J=i.get(Se);n.bindTexture(t.TEXTURE_2D,J.__webglTexture),W(t.TEXTURE_2D,Se,ze),fe(Z.__webglFramebuffer,D,Se,t.COLOR_ATTACHMENT0+Y,t.TEXTURE_2D,0),_(Se,ze)&&g(t.TEXTURE_2D)}n.unbindTexture()}else{let we=t.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(a?we=D.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),n.bindTexture(we,_e.__webglTexture),W(we,A,ze),a&&A.mipmaps&&A.mipmaps.length>0)for(let Y=0;Y<A.mipmaps.length;Y++)fe(Z.__webglFramebuffer[Y],D,A,t.COLOR_ATTACHMENT0,we,Y);else fe(Z.__webglFramebuffer,D,A,t.COLOR_ATTACHMENT0,we,0);_(A,ze)&&g(we),n.unbindTexture()}D.depthBuffer&&ke(D)}function _t(D){const A=m(D)||a,Z=D.isWebGLMultipleRenderTargets===!0?D.texture:[D.texture];for(let _e=0,pe=Z.length;_e<pe;_e++){const ve=Z[_e];if(_(ve,A)){const ze=D.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,we=i.get(ve).__webglTexture;n.bindTexture(ze,we),g(ze),n.unbindTexture()}}}function Ge(D){if(a&&D.samples>0&&Ie(D)===!1){const A=D.isWebGLMultipleRenderTargets?D.texture:[D.texture],Z=D.width,_e=D.height;let pe=t.COLOR_BUFFER_BIT;const ve=[],ze=D.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,we=i.get(D),Y=D.isWebGLMultipleRenderTargets===!0;if(Y)for(let de=0;de<A.length;de++)n.bindFramebuffer(t.FRAMEBUFFER,we.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+de,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,we.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+de,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let de=0;de<A.length;de++){ve.push(t.COLOR_ATTACHMENT0+de),D.depthBuffer&&ve.push(ze);const Se=we.__ignoreDepthValues!==void 0?we.__ignoreDepthValues:!1;if(Se===!1&&(D.depthBuffer&&(pe|=t.DEPTH_BUFFER_BIT),D.stencilBuffer&&(pe|=t.STENCIL_BUFFER_BIT)),Y&&t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,we.__webglColorRenderbuffer[de]),Se===!0&&(t.invalidateFramebuffer(t.READ_FRAMEBUFFER,[ze]),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[ze])),Y){const J=i.get(A[de]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,J,0)}t.blitFramebuffer(0,0,Z,_e,0,0,Z,_e,pe,t.NEAREST),c&&t.invalidateFramebuffer(t.READ_FRAMEBUFFER,ve)}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),Y)for(let de=0;de<A.length;de++){n.bindFramebuffer(t.FRAMEBUFFER,we.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+de,t.RENDERBUFFER,we.__webglColorRenderbuffer[de]);const Se=i.get(A[de]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,we.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+de,t.TEXTURE_2D,Se,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}}function et(D){return Math.min(r.maxSamples,D.samples)}function Ie(D){const A=i.get(D);return a&&D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Mt(D){const A=o.render.frame;u.get(D)!==A&&(u.set(D,A),D.update())}function st(D,A){const Z=D.colorSpace,_e=D.format,pe=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||D.format===yd||Z!==Ji&&Z!==ei&&(bt.getTransfer(Z)===It?a===!1?e.has("EXT_sRGB")===!0&&_e===Qn?(D.format=yd,D.minFilter=bn,D.generateMipmaps=!1):A=gv.sRGBToLinear(A):(_e!==Qn||pe!==Tr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Z)),A}this.allocateTextureUnit=k,this.resetTextureUnits=ie,this.setTexture2D=z,this.setTexture2DArray=ne,this.setTexture3D=O,this.setTextureCube=G,this.rebindTextures=pt,this.setupRenderTarget=K,this.updateRenderTargetMipmap=_t,this.updateMultisampleRenderTarget=Ge,this.setupDepthRenderbuffer=ke,this.setupFrameBufferTexture=fe,this.useMultisampledRTT=Ie}function FA(t,e,n){const i=n.isWebGL2;function r(s,o=ei){let a;const l=bt.getTransfer(o);if(s===Tr)return t.UNSIGNED_BYTE;if(s===av)return t.UNSIGNED_SHORT_4_4_4_4;if(s===lv)return t.UNSIGNED_SHORT_5_5_5_1;if(s===rM)return t.BYTE;if(s===sM)return t.SHORT;if(s===yh)return t.UNSIGNED_SHORT;if(s===ov)return t.INT;if(s===pr)return t.UNSIGNED_INT;if(s===Gi)return t.FLOAT;if(s===Ia)return i?t.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===oM)return t.ALPHA;if(s===Qn)return t.RGBA;if(s===aM)return t.LUMINANCE;if(s===lM)return t.LUMINANCE_ALPHA;if(s===$r)return t.DEPTH_COMPONENT;if(s===mo)return t.DEPTH_STENCIL;if(s===yd)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===cM)return t.RED;if(s===cv)return t.RED_INTEGER;if(s===uM)return t.RG;if(s===uv)return t.RG_INTEGER;if(s===fv)return t.RGBA_INTEGER;if(s===Ou||s===ku||s===zu||s===Bu)if(l===It)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Ou)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===ku)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===zu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Bu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Ou)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===ku)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===zu)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Bu)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Qp||s===em||s===tm||s===nm)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Qp)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===em)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===tm)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===nm)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===dv)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===im||s===rm)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===im)return l===It?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===rm)return l===It?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===sm||s===om||s===am||s===lm||s===cm||s===um||s===fm||s===dm||s===hm||s===pm||s===mm||s===gm||s===_m||s===vm)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===sm)return l===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===om)return l===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===am)return l===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===lm)return l===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===cm)return l===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===um)return l===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===fm)return l===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===dm)return l===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===hm)return l===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===pm)return l===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===mm)return l===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===gm)return l===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===_m)return l===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===vm)return l===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Hu||s===ym||s===xm)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===Hu)return l===It?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===ym)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===xm)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===fM||s===Sm||s===Mm||s===Em)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===Hu)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Sm)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Mm)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Em)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Yr?i?t.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):t[s]!==void 0?t[s]:null}return{convert:r}}class OA extends yn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Xi extends Ot{constructor(){super(),this.isGroup=!0,this.type="Group"}}const kA={type:"move"};class df{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const y of e.hand.values()){const m=n.getJointPose(y,i),f=this._getHandJoint(c,y);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),p=.02,v=.005;c.inputState.pinching&&d>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(kA)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Xi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}class zA extends as{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,d=null,p=null,v=null;const y=n.getContextAttributes();let m=null,f=null;const _=[],g=[],E=new Ke;let P=null;const C=new yn;C.layers.enable(1),C.viewport=new Rt;const b=new yn;b.layers.enable(2),b.viewport=new Rt;const U=[C,b],M=new OA;M.layers.enable(1),M.layers.enable(2);let T=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let $=_[W];return $===void 0&&($=new df,_[W]=$),$.getTargetRaySpace()},this.getControllerGrip=function(W){let $=_[W];return $===void 0&&($=new df,_[W]=$),$.getGripSpace()},this.getHand=function(W){let $=_[W];return $===void 0&&($=new df,_[W]=$),$.getHandSpace()};function V(W){const $=g.indexOf(W.inputSource);if($===-1)return;const le=_[$];le!==void 0&&(le.update(W.inputSource,W.frame,c||o),le.dispatchEvent({type:W.type,data:W.inputSource}))}function ie(){r.removeEventListener("select",V),r.removeEventListener("selectstart",V),r.removeEventListener("selectend",V),r.removeEventListener("squeeze",V),r.removeEventListener("squeezestart",V),r.removeEventListener("squeezeend",V),r.removeEventListener("end",ie),r.removeEventListener("inputsourceschange",k);for(let W=0;W<_.length;W++){const $=g[W];$!==null&&(g[W]=null,_[W].disconnect($))}T=null,H=null,e.setRenderTarget(m),p=null,d=null,h=null,r=null,f=null,oe.stop(),i.isPresenting=!1,e.setPixelRatio(P),e.setSize(E.width,E.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(W){if(r=W,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",V),r.addEventListener("selectstart",V),r.addEventListener("selectend",V),r.addEventListener("squeeze",V),r.addEventListener("squeezestart",V),r.addEventListener("squeezeend",V),r.addEventListener("end",ie),r.addEventListener("inputsourceschange",k),y.xrCompatible!==!0&&await n.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(E),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const $={antialias:r.renderState.layers===void 0?y.antialias:!0,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,$),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),f=new is(p.framebufferWidth,p.framebufferHeight,{format:Qn,type:Tr,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil})}else{let $=null,le=null,ae=null;y.depth&&(ae=y.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,$=y.stencil?mo:$r,le=y.stencil?Yr:pr);const fe={colorFormat:n.RGBA8,depthFormat:ae,scaleFactor:s};h=new XRWebGLBinding(r,n),d=h.createProjectionLayer(fe),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),f=new is(d.textureWidth,d.textureHeight,{format:Qn,type:Tr,depthTexture:new Av(d.textureWidth,d.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0});const Te=e.properties.get(f);Te.__ignoreDepthValues=d.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),oe.setContext(r),oe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function k(W){for(let $=0;$<W.removed.length;$++){const le=W.removed[$],ae=g.indexOf(le);ae>=0&&(g[ae]=null,_[ae].disconnect(le))}for(let $=0;$<W.added.length;$++){const le=W.added[$];let ae=g.indexOf(le);if(ae===-1){for(let Te=0;Te<_.length;Te++)if(Te>=g.length){g.push(le),ae=Te;break}else if(g[Te]===null){g[Te]=le,ae=Te;break}if(ae===-1)break}const fe=_[ae];fe&&fe.connect(le)}}const X=new B,z=new B;function ne(W,$,le){X.setFromMatrixPosition($.matrixWorld),z.setFromMatrixPosition(le.matrixWorld);const ae=X.distanceTo(z),fe=$.projectionMatrix.elements,Te=le.projectionMatrix.elements,Ve=fe[14]/(fe[10]-1),ke=fe[14]/(fe[10]+1),pt=(fe[9]+1)/fe[5],K=(fe[9]-1)/fe[5],_t=(fe[8]-1)/fe[0],Ge=(Te[8]+1)/Te[0],et=Ve*_t,Ie=Ve*Ge,Mt=ae/(-_t+Ge),st=Mt*-_t;$.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(st),W.translateZ(Mt),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();const D=Ve+Mt,A=ke+Mt,Z=et-st,_e=Ie+(ae-st),pe=pt*ke/A*D,ve=K*ke/A*D;W.projectionMatrix.makePerspective(Z,_e,pe,ve,D,A),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function O(W,$){$===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices($.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(r===null)return;M.near=b.near=C.near=W.near,M.far=b.far=C.far=W.far,(T!==M.near||H!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),T=M.near,H=M.far);const $=W.parent,le=M.cameras;O(M,$);for(let ae=0;ae<le.length;ae++)O(le[ae],$);le.length===2?ne(M,C,b):M.projectionMatrix.copy(C.projectionMatrix),G(W,M,$)};function G(W,$,le){le===null?W.matrix.copy($.matrixWorld):(W.matrix.copy(le.matrixWorld),W.matrix.invert(),W.matrix.multiply($.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy($.projectionMatrix),W.projectionMatrixInverse.copy($.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=go*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(W){l=W,d!==null&&(d.fixedFoveation=W),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=W)};let j=null;function re(W,$){if(u=$.getViewerPose(c||o),v=$,u!==null){const le=u.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let ae=!1;le.length!==M.cameras.length&&(M.cameras.length=0,ae=!0);for(let fe=0;fe<le.length;fe++){const Te=le[fe];let Ve=null;if(p!==null)Ve=p.getViewport(Te);else{const pt=h.getViewSubImage(d,Te);Ve=pt.viewport,fe===0&&(e.setRenderTargetTextures(f,pt.colorTexture,d.ignoreDepthValues?void 0:pt.depthStencilTexture),e.setRenderTarget(f))}let ke=U[fe];ke===void 0&&(ke=new yn,ke.layers.enable(fe),ke.viewport=new Rt,U[fe]=ke),ke.matrix.fromArray(Te.transform.matrix),ke.matrix.decompose(ke.position,ke.quaternion,ke.scale),ke.projectionMatrix.fromArray(Te.projectionMatrix),ke.projectionMatrixInverse.copy(ke.projectionMatrix).invert(),ke.viewport.set(Ve.x,Ve.y,Ve.width,Ve.height),fe===0&&(M.matrix.copy(ke.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ae===!0&&M.cameras.push(ke)}}for(let le=0;le<_.length;le++){const ae=g[le],fe=_[le];ae!==null&&fe!==void 0&&fe.update(ae,$,c||o)}j&&j(W,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),v=null}const oe=new Tv;oe.setAnimationLoop(re),this.setAnimationLoop=function(W){j=W},this.dispose=function(){}}}function BA(t,e){function n(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Mv(t)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,_,g,E){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),h(m,f)):f.isMeshPhongMaterial?(s(m,f),u(m,f)):f.isMeshStandardMaterial?(s(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,E)):f.isMeshMatcapMaterial?(s(m,f),v(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),y(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,_,g):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,n(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,n(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===zn&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,n(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===zn&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,n(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,n(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,n(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const _=e.get(f).envMap;if(_&&(m.envMap.value=_,m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;const g=t._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*g,n(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,n(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,n(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,_,g){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*_,m.scale.value=g*.5,f.map&&(m.map.value=f.map,n(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,n(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,n(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,n(f.roughnessMap,m.roughnessMapTransform)),e.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,_){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,n(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,n(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,n(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,n(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,n(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===zn&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,n(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,n(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,n(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,n(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,n(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,n(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,n(f.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,f){f.matcap&&(m.matcap.value=f.matcap)}function y(m,f){const _=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function HA(t,e,n,i){let r={},s={},o=[];const a=n.isWebGL2?t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(_,g){const E=g.program;i.uniformBlockBinding(_,E)}function c(_,g){let E=r[_.id];E===void 0&&(v(_),E=u(_),r[_.id]=E,_.addEventListener("dispose",m));const P=g.program;i.updateUBOMapping(_,P);const C=e.render.frame;s[_.id]!==C&&(d(_),s[_.id]=C)}function u(_){const g=h();_.__bindingPointIndex=g;const E=t.createBuffer(),P=_.__size,C=_.usage;return t.bindBuffer(t.UNIFORM_BUFFER,E),t.bufferData(t.UNIFORM_BUFFER,P,C),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,g,E),E}function h(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){const g=r[_.id],E=_.uniforms,P=_.__cache;t.bindBuffer(t.UNIFORM_BUFFER,g);for(let C=0,b=E.length;C<b;C++){const U=Array.isArray(E[C])?E[C]:[E[C]];for(let M=0,T=U.length;M<T;M++){const H=U[M];if(p(H,C,M,P)===!0){const V=H.__offset,ie=Array.isArray(H.value)?H.value:[H.value];let k=0;for(let X=0;X<ie.length;X++){const z=ie[X],ne=y(z);typeof z=="number"||typeof z=="boolean"?(H.__data[0]=z,t.bufferSubData(t.UNIFORM_BUFFER,V+k,H.__data)):z.isMatrix3?(H.__data[0]=z.elements[0],H.__data[1]=z.elements[1],H.__data[2]=z.elements[2],H.__data[3]=0,H.__data[4]=z.elements[3],H.__data[5]=z.elements[4],H.__data[6]=z.elements[5],H.__data[7]=0,H.__data[8]=z.elements[6],H.__data[9]=z.elements[7],H.__data[10]=z.elements[8],H.__data[11]=0):(z.toArray(H.__data,k),k+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,V,H.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(_,g,E,P){const C=_.value,b=g+"_"+E;if(P[b]===void 0)return typeof C=="number"||typeof C=="boolean"?P[b]=C:P[b]=C.clone(),!0;{const U=P[b];if(typeof C=="number"||typeof C=="boolean"){if(U!==C)return P[b]=C,!0}else if(U.equals(C)===!1)return U.copy(C),!0}return!1}function v(_){const g=_.uniforms;let E=0;const P=16;for(let b=0,U=g.length;b<U;b++){const M=Array.isArray(g[b])?g[b]:[g[b]];for(let T=0,H=M.length;T<H;T++){const V=M[T],ie=Array.isArray(V.value)?V.value:[V.value];for(let k=0,X=ie.length;k<X;k++){const z=ie[k],ne=y(z),O=E%P;O!==0&&P-O<ne.boundary&&(E+=P-O),V.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=E,E+=ne.storage}}}const C=E%P;return C>0&&(E+=P-C),_.__size=E,_.__cache={},this}function y(_){const g={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(g.boundary=4,g.storage=4):_.isVector2?(g.boundary=8,g.storage=8):_.isVector3||_.isColor?(g.boundary=16,g.storage=12):_.isVector4?(g.boundary=16,g.storage=16):_.isMatrix3?(g.boundary=48,g.storage=48):_.isMatrix4?(g.boundary=64,g.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),g}function m(_){const g=_.target;g.removeEventListener("dispose",m);const E=o.indexOf(g.__bindingPointIndex);o.splice(E,1),t.deleteBuffer(r[g.id]),delete r[g.id],delete s[g.id]}function f(){for(const _ in r)t.deleteBuffer(r[_]);o=[],r={},s={}}return{bind:l,update:c,dispose:f}}class Nv{constructor(e={}){const{canvas:n=OM(),context:i=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=o;const p=new Uint32Array(4),v=new Int32Array(4);let y=null,m=null;const f=[],_=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Xt,this._useLegacyLights=!1,this.toneMapping=wr,this.toneMappingExposure=1;const g=this;let E=!1,P=0,C=0,b=null,U=-1,M=null;const T=new Rt,H=new Rt;let V=null;const ie=new ot(0);let k=0,X=n.width,z=n.height,ne=1,O=null,G=null;const j=new Rt(0,0,X,z),re=new Rt(0,0,X,z);let oe=!1;const W=new Eh;let $=!1,le=!1,ae=null;const fe=new dt,Te=new Ke,Ve=new B,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function pt(){return b===null?ne:1}let K=i;function _t(N,q){for(let ee=0;ee<N.length;ee++){const se=N[ee],Q=n.getContext(se,q);if(Q!==null)return Q}return null}try{const N={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${vh}`),n.addEventListener("webglcontextlost",ye,!1),n.addEventListener("webglcontextrestored",F,!1),n.addEventListener("webglcontextcreationerror",Me,!1),K===null){const q=["webgl2","webgl","experimental-webgl"];if(g.isWebGL1Renderer===!0&&q.shift(),K=_t(q,N),K===null)throw _t(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&K instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),K.getShaderPrecisionFormat===void 0&&(K.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(N){throw console.error("THREE.WebGLRenderer: "+N.message),N}let Ge,et,Ie,Mt,st,D,A,Z,_e,pe,ve,ze,we,Y,de,Se,J,Ce,I,ce,me,he,be,tt;function Ze(){Ge=new ZT(K),et=new XT(K,Ge,e),Ge.init(et),he=new FA(K,Ge,et),Ie=new IA(K,Ge,et),Mt=new e1(K),st=new xA,D=new UA(K,Ge,Ie,st,et,he,Mt),A=new qT(g),Z=new KT(g),_e=new lE(K,et),be=new GT(K,Ge,_e,et),pe=new JT(K,_e,Mt,be),ve=new r1(K,pe,_e,Mt),I=new i1(K,et,D),Se=new jT(st),ze=new yA(g,A,Z,Ge,et,be,Se),we=new BA(g,st),Y=new MA,de=new RA(Ge,et),Ce=new VT(g,A,Z,Ie,ve,d,l),J=new DA(g,ve,et),tt=new HA(K,Mt,et,Ie),ce=new WT(K,Ge,Mt,et),me=new QT(K,Ge,Mt,et),Mt.programs=ze.programs,g.capabilities=et,g.extensions=Ge,g.properties=st,g.renderLists=Y,g.shadowMap=J,g.state=Ie,g.info=Mt}Ze();const je=new zA(g,K);this.xr=je,this.getContext=function(){return K},this.getContextAttributes=function(){return K.getContextAttributes()},this.forceContextLoss=function(){const N=Ge.get("WEBGL_lose_context");N&&N.loseContext()},this.forceContextRestore=function(){const N=Ge.get("WEBGL_lose_context");N&&N.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(N){N!==void 0&&(ne=N,this.setSize(X,z,!1))},this.getSize=function(N){return N.set(X,z)},this.setSize=function(N,q,ee=!0){if(je.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=N,z=q,n.width=Math.floor(N*ne),n.height=Math.floor(q*ne),ee===!0&&(n.style.width=N+"px",n.style.height=q+"px"),this.setViewport(0,0,N,q)},this.getDrawingBufferSize=function(N){return N.set(X*ne,z*ne).floor()},this.setDrawingBufferSize=function(N,q,ee){X=N,z=q,ne=ee,n.width=Math.floor(N*ee),n.height=Math.floor(q*ee),this.setViewport(0,0,N,q)},this.getCurrentViewport=function(N){return N.copy(T)},this.getViewport=function(N){return N.copy(j)},this.setViewport=function(N,q,ee,se){N.isVector4?j.set(N.x,N.y,N.z,N.w):j.set(N,q,ee,se),Ie.viewport(T.copy(j).multiplyScalar(ne).floor())},this.getScissor=function(N){return N.copy(re)},this.setScissor=function(N,q,ee,se){N.isVector4?re.set(N.x,N.y,N.z,N.w):re.set(N,q,ee,se),Ie.scissor(H.copy(re).multiplyScalar(ne).floor())},this.getScissorTest=function(){return oe},this.setScissorTest=function(N){Ie.setScissorTest(oe=N)},this.setOpaqueSort=function(N){O=N},this.setTransparentSort=function(N){G=N},this.getClearColor=function(N){return N.copy(Ce.getClearColor())},this.setClearColor=function(){Ce.setClearColor.apply(Ce,arguments)},this.getClearAlpha=function(){return Ce.getClearAlpha()},this.setClearAlpha=function(){Ce.setClearAlpha.apply(Ce,arguments)},this.clear=function(N=!0,q=!0,ee=!0){let se=0;if(N){let Q=!1;if(b!==null){const Ne=b.texture.format;Q=Ne===fv||Ne===uv||Ne===cv}if(Q){const Ne=b.texture.type,De=Ne===Tr||Ne===pr||Ne===yh||Ne===Yr||Ne===av||Ne===lv,Ye=Ce.getClearColor(),nt=Ce.getClearAlpha(),ft=Ye.r,lt=Ye.g,ct=Ye.b;De?(p[0]=ft,p[1]=lt,p[2]=ct,p[3]=nt,K.clearBufferuiv(K.COLOR,0,p)):(v[0]=ft,v[1]=lt,v[2]=ct,v[3]=nt,K.clearBufferiv(K.COLOR,0,v))}else se|=K.COLOR_BUFFER_BIT}q&&(se|=K.DEPTH_BUFFER_BIT),ee&&(se|=K.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K.clear(se)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",ye,!1),n.removeEventListener("webglcontextrestored",F,!1),n.removeEventListener("webglcontextcreationerror",Me,!1),Y.dispose(),de.dispose(),st.dispose(),A.dispose(),Z.dispose(),ve.dispose(),be.dispose(),tt.dispose(),ze.dispose(),je.dispose(),je.removeEventListener("sessionstart",Ct),je.removeEventListener("sessionend",Et),ae&&(ae.dispose(),ae=null),Zt.stop()};function ye(N){N.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function F(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const N=Mt.autoReset,q=J.enabled,ee=J.autoUpdate,se=J.needsUpdate,Q=J.type;Ze(),Mt.autoReset=N,J.enabled=q,J.autoUpdate=ee,J.needsUpdate=se,J.type=Q}function Me(N){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",N.statusMessage)}function Ee(N){const q=N.target;q.removeEventListener("dispose",Ee),qe(q)}function qe(N){Be(N),st.remove(N)}function Be(N){const q=st.get(N).programs;q!==void 0&&(q.forEach(function(ee){ze.releaseProgram(ee)}),N.isShaderMaterial&&ze.releaseShaderCache(N))}this.renderBufferDirect=function(N,q,ee,se,Q,Ne){q===null&&(q=ke);const De=Q.isMesh&&Q.matrixWorld.determinant()<0,Ye=ou(N,q,ee,se,Q);Ie.setMaterial(se,De);let nt=ee.index,ft=1;if(se.wireframe===!0){if(nt=pe.getWireframeAttribute(ee),nt===void 0)return;ft=2}const lt=ee.drawRange,ct=ee.attributes.position;let kt=lt.start*ft,En=(lt.start+lt.count)*ft;Ne!==null&&(kt=Math.max(kt,Ne.start*ft),En=Math.min(En,(Ne.start+Ne.count)*ft)),nt!==null?(kt=Math.max(kt,0),En=Math.min(En,nt.count)):ct!=null&&(kt=Math.max(kt,0),En=Math.min(En,ct.count));const qt=En-kt;if(qt<0||qt===1/0)return;be.setup(Q,se,Ye,ee,nt);let Yn,Lt=ce;if(nt!==null&&(Yn=_e.get(nt),Lt=me,Lt.setIndex(Yn)),Q.isMesh)se.wireframe===!0?(Ie.setLineWidth(se.wireframeLinewidth*pt()),Lt.setMode(K.LINES)):Lt.setMode(K.TRIANGLES);else if(Q.isLine){let at=se.linewidth;at===void 0&&(at=1),Ie.setLineWidth(at*pt()),Q.isLineSegments?Lt.setMode(K.LINES):Q.isLineLoop?Lt.setMode(K.LINE_LOOP):Lt.setMode(K.LINE_STRIP)}else Q.isPoints?Lt.setMode(K.POINTS):Q.isSprite&&Lt.setMode(K.TRIANGLES);if(Q.isBatchedMesh)Lt.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else if(Q.isInstancedMesh)Lt.renderInstances(kt,qt,Q.count);else if(ee.isInstancedBufferGeometry){const at=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,Do=Math.min(ee.instanceCount,at);Lt.renderInstances(kt,qt,Do)}else Lt.render(kt,qt)};function Xe(N,q,ee){N.transparent===!0&&N.side===di&&N.forceSinglePass===!1?(N.side=zn,N.needsUpdate=!0,us(N,q,ee),N.side=Zi,N.needsUpdate=!0,us(N,q,ee),N.side=di):us(N,q,ee)}this.compile=function(N,q,ee=null){ee===null&&(ee=N),m=de.get(ee),m.init(),_.push(m),ee.traverseVisible(function(Q){Q.isLight&&Q.layers.test(q.layers)&&(m.pushLight(Q),Q.castShadow&&m.pushShadow(Q))}),N!==ee&&N.traverseVisible(function(Q){Q.isLight&&Q.layers.test(q.layers)&&(m.pushLight(Q),Q.castShadow&&m.pushShadow(Q))}),m.setupLights(g._useLegacyLights);const se=new Set;return N.traverse(function(Q){const Ne=Q.material;if(Ne)if(Array.isArray(Ne))for(let De=0;De<Ne.length;De++){const Ye=Ne[De];Xe(Ye,ee,Q),se.add(Ye)}else Xe(Ne,ee,Q),se.add(Ne)}),_.pop(),m=null,se},this.compileAsync=function(N,q,ee=null){const se=this.compile(N,q,ee);return new Promise(Q=>{function Ne(){if(se.forEach(function(De){st.get(De).currentProgram.isReady()&&se.delete(De)}),se.size===0){Q(N);return}setTimeout(Ne,10)}Ge.get("KHR_parallel_shader_compile")!==null?Ne():setTimeout(Ne,10)})};let Je=null;function ut(N){Je&&Je(N)}function Ct(){Zt.stop()}function Et(){Zt.start()}const Zt=new Tv;Zt.setAnimationLoop(ut),typeof self<"u"&&Zt.setContext(self),this.setAnimationLoop=function(N){Je=N,je.setAnimationLoop(N),N===null?Zt.stop():Zt.start()},je.addEventListener("sessionstart",Ct),je.addEventListener("sessionend",Et),this.render=function(N,q){if(q!==void 0&&q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),je.enabled===!0&&je.isPresenting===!0&&(je.cameraAutoUpdate===!0&&je.updateCamera(q),q=je.getCamera()),N.isScene===!0&&N.onBeforeRender(g,N,q,b),m=de.get(N,_.length),m.init(),_.push(m),fe.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),W.setFromProjectionMatrix(fe),le=this.localClippingEnabled,$=Se.init(this.clippingPlanes,le),y=Y.get(N,f.length),y.init(),f.push(y),Nn(N,q,0,g.sortObjects),y.finish(),g.sortObjects===!0&&y.sort(O,G),this.info.render.frame++,$===!0&&Se.beginShadows();const ee=m.state.shadowsArray;if(J.render(ee,N,q),$===!0&&Se.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ce.render(y,N),m.setupLights(g._useLegacyLights),q.isArrayCamera){const se=q.cameras;for(let Q=0,Ne=se.length;Q<Ne;Q++){const De=se[Q];er(y,N,De,De.viewport)}}else er(y,N,q);b!==null&&(D.updateMultisampleRenderTarget(b),D.updateRenderTargetMipmap(b)),N.isScene===!0&&N.onAfterRender(g,N,q),be.resetDefaultState(),U=-1,M=null,_.pop(),_.length>0?m=_[_.length-1]:m=null,f.pop(),f.length>0?y=f[f.length-1]:y=null};function Nn(N,q,ee,se){if(N.visible===!1)return;if(N.layers.test(q.layers)){if(N.isGroup)ee=N.renderOrder;else if(N.isLOD)N.autoUpdate===!0&&N.update(q);else if(N.isLight)m.pushLight(N),N.castShadow&&m.pushShadow(N);else if(N.isSprite){if(!N.frustumCulled||W.intersectsSprite(N)){se&&Ve.setFromMatrixPosition(N.matrixWorld).applyMatrix4(fe);const De=ve.update(N),Ye=N.material;Ye.visible&&y.push(N,De,Ye,ee,Ve.z,null)}}else if((N.isMesh||N.isLine||N.isPoints)&&(!N.frustumCulled||W.intersectsObject(N))){const De=ve.update(N),Ye=N.material;if(se&&(N.boundingSphere!==void 0?(N.boundingSphere===null&&N.computeBoundingSphere(),Ve.copy(N.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),Ve.copy(De.boundingSphere.center)),Ve.applyMatrix4(N.matrixWorld).applyMatrix4(fe)),Array.isArray(Ye)){const nt=De.groups;for(let ft=0,lt=nt.length;ft<lt;ft++){const ct=nt[ft],kt=Ye[ct.materialIndex];kt&&kt.visible&&y.push(N,De,kt,ee,Ve.z,ct)}}else Ye.visible&&y.push(N,De,Ye,ee,Ve.z,null)}}const Ne=N.children;for(let De=0,Ye=Ne.length;De<Ye;De++)Nn(Ne[De],q,ee,se)}function er(N,q,ee,se){const Q=N.opaque,Ne=N.transmissive,De=N.transparent;m.setupLightsView(ee),$===!0&&Se.setGlobalState(g.clippingPlanes,ee),Ne.length>0&&tr(Q,Ne,q,ee),se&&Ie.viewport(T.copy(se)),Q.length>0&&Ri(Q,q,ee),Ne.length>0&&Ri(Ne,q,ee),De.length>0&&Ri(De,q,ee),Ie.buffers.depth.setTest(!0),Ie.buffers.depth.setMask(!0),Ie.buffers.color.setMask(!0),Ie.setPolygonOffset(!1)}function tr(N,q,ee,se){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;const Ne=et.isWebGL2;ae===null&&(ae=new is(1,1,{generateMipmaps:!0,type:Ge.has("EXT_color_buffer_half_float")?Ia:Tr,minFilter:ns,samples:Ne?4:0})),g.getDrawingBufferSize(Te),Ne?ae.setSize(Te.x,Te.y):ae.setSize(Pc(Te.x),Pc(Te.y));const De=g.getRenderTarget();g.setRenderTarget(ae),g.getClearColor(ie),k=g.getClearAlpha(),k<1&&g.setClearColor(16777215,.5),g.clear();const Ye=g.toneMapping;g.toneMapping=wr,Ri(N,ee,se),D.updateMultisampleRenderTarget(ae),D.updateRenderTargetMipmap(ae);let nt=!1;for(let ft=0,lt=q.length;ft<lt;ft++){const ct=q[ft],kt=ct.object,En=ct.geometry,qt=ct.material,Yn=ct.group;if(qt.side===di&&kt.layers.test(se.layers)){const Lt=qt.side;qt.side=zn,qt.needsUpdate=!0,Po(kt,ee,se,En,qt,Yn),qt.side=Lt,qt.needsUpdate=!0,nt=!0}}nt===!0&&(D.updateMultisampleRenderTarget(ae),D.updateRenderTargetMipmap(ae)),g.setRenderTarget(De),g.setClearColor(ie,k),g.toneMapping=Ye}function Ri(N,q,ee){const se=q.isScene===!0?q.overrideMaterial:null;for(let Q=0,Ne=N.length;Q<Ne;Q++){const De=N[Q],Ye=De.object,nt=De.geometry,ft=se===null?De.material:se,lt=De.group;Ye.layers.test(ee.layers)&&Po(Ye,q,ee,nt,ft,lt)}}function Po(N,q,ee,se,Q,Ne){N.onBeforeRender(g,q,ee,se,Q,Ne),N.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,N.matrixWorld),N.normalMatrix.getNormalMatrix(N.modelViewMatrix),Q.onBeforeRender(g,q,ee,se,N,Ne),Q.transparent===!0&&Q.side===di&&Q.forceSinglePass===!1?(Q.side=zn,Q.needsUpdate=!0,g.renderBufferDirect(ee,q,se,Q,N,Ne),Q.side=Zi,Q.needsUpdate=!0,g.renderBufferDirect(ee,q,se,Q,N,Ne),Q.side=di):g.renderBufferDirect(ee,q,se,Q,N,Ne),N.onAfterRender(g,q,ee,se,Q,Ne)}function us(N,q,ee){q.isScene!==!0&&(q=ke);const se=st.get(N),Q=m.state.lights,Ne=m.state.shadowsArray,De=Q.state.version,Ye=ze.getParameters(N,Q.state,Ne,q,ee),nt=ze.getProgramCacheKey(Ye);let ft=se.programs;se.environment=N.isMeshStandardMaterial?q.environment:null,se.fog=q.fog,se.envMap=(N.isMeshStandardMaterial?Z:A).get(N.envMap||se.environment),ft===void 0&&(N.addEventListener("dispose",Ee),ft=new Map,se.programs=ft);let lt=ft.get(nt);if(lt!==void 0){if(se.currentProgram===lt&&se.lightsStateVersion===De)return Va(N,Ye),lt}else Ye.uniforms=ze.getUniforms(N),N.onBuild(ee,Ye,g),N.onBeforeCompile(Ye,g),lt=ze.acquireProgram(Ye,nt),ft.set(nt,lt),se.uniforms=Ye.uniforms;const ct=se.uniforms;return(!N.isShaderMaterial&&!N.isRawShaderMaterial||N.clipping===!0)&&(ct.clippingPlanes=Se.uniform),Va(N,Ye),se.needsLights=lu(N),se.lightsStateVersion=De,se.needsLights&&(ct.ambientLightColor.value=Q.state.ambient,ct.lightProbe.value=Q.state.probe,ct.directionalLights.value=Q.state.directional,ct.directionalLightShadows.value=Q.state.directionalShadow,ct.spotLights.value=Q.state.spot,ct.spotLightShadows.value=Q.state.spotShadow,ct.rectAreaLights.value=Q.state.rectArea,ct.ltc_1.value=Q.state.rectAreaLTC1,ct.ltc_2.value=Q.state.rectAreaLTC2,ct.pointLights.value=Q.state.point,ct.pointLightShadows.value=Q.state.pointShadow,ct.hemisphereLights.value=Q.state.hemi,ct.directionalShadowMap.value=Q.state.directionalShadowMap,ct.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,ct.spotShadowMap.value=Q.state.spotShadowMap,ct.spotLightMatrix.value=Q.state.spotLightMatrix,ct.spotLightMap.value=Q.state.spotLightMap,ct.pointShadowMap.value=Q.state.pointShadowMap,ct.pointShadowMatrix.value=Q.state.pointShadowMatrix),se.currentProgram=lt,se.uniformsList=null,lt}function No(N){if(N.uniformsList===null){const q=N.currentProgram.getUniforms();N.uniformsList=Ql.seqWithValue(q.seq,N.uniforms)}return N.uniformsList}function Va(N,q){const ee=st.get(N);ee.outputColorSpace=q.outputColorSpace,ee.batching=q.batching,ee.instancing=q.instancing,ee.instancingColor=q.instancingColor,ee.skinning=q.skinning,ee.morphTargets=q.morphTargets,ee.morphNormals=q.morphNormals,ee.morphColors=q.morphColors,ee.morphTargetsCount=q.morphTargetsCount,ee.numClippingPlanes=q.numClippingPlanes,ee.numIntersection=q.numClipIntersection,ee.vertexAlphas=q.vertexAlphas,ee.vertexTangents=q.vertexTangents,ee.toneMapping=q.toneMapping}function ou(N,q,ee,se,Q){q.isScene!==!0&&(q=ke),D.resetTextureUnits();const Ne=q.fog,De=se.isMeshStandardMaterial?q.environment:null,Ye=b===null?g.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:Ji,nt=(se.isMeshStandardMaterial?Z:A).get(se.envMap||De),ft=se.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,lt=!!ee.attributes.tangent&&(!!se.normalMap||se.anisotropy>0),ct=!!ee.morphAttributes.position,kt=!!ee.morphAttributes.normal,En=!!ee.morphAttributes.color;let qt=wr;se.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(qt=g.toneMapping);const Yn=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,Lt=Yn!==void 0?Yn.length:0,at=st.get(se),Do=m.state.lights;if($===!0&&(le===!0||N!==M)){const dn=N===M&&se.id===U;Se.setState(se,N,dn)}let Nt=!1;se.version===at.__version?(at.needsLights&&at.lightsStateVersion!==Do.state.version||at.outputColorSpace!==Ye||Q.isBatchedMesh&&at.batching===!1||!Q.isBatchedMesh&&at.batching===!0||Q.isInstancedMesh&&at.instancing===!1||!Q.isInstancedMesh&&at.instancing===!0||Q.isSkinnedMesh&&at.skinning===!1||!Q.isSkinnedMesh&&at.skinning===!0||Q.isInstancedMesh&&at.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&at.instancingColor===!1&&Q.instanceColor!==null||at.envMap!==nt||se.fog===!0&&at.fog!==Ne||at.numClippingPlanes!==void 0&&(at.numClippingPlanes!==Se.numPlanes||at.numIntersection!==Se.numIntersection)||at.vertexAlphas!==ft||at.vertexTangents!==lt||at.morphTargets!==ct||at.morphNormals!==kt||at.morphColors!==En||at.toneMapping!==qt||et.isWebGL2===!0&&at.morphTargetsCount!==Lt)&&(Nt=!0):(Nt=!0,at.__version=se.version);let Ci=at.currentProgram;Nt===!0&&(Ci=us(se,q,Q));let Io=!1,Nr=!1,Uo=!1;const rn=Ci.getUniforms(),vi=at.uniforms;if(Ie.useProgram(Ci.program)&&(Io=!0,Nr=!0,Uo=!0),se.id!==U&&(U=se.id,Nr=!0),Io||M!==N){rn.setValue(K,"projectionMatrix",N.projectionMatrix),rn.setValue(K,"viewMatrix",N.matrixWorldInverse);const dn=rn.map.cameraPosition;dn!==void 0&&dn.setValue(K,Ve.setFromMatrixPosition(N.matrixWorld)),et.logarithmicDepthBuffer&&rn.setValue(K,"logDepthBufFC",2/(Math.log(N.far+1)/Math.LN2)),(se.isMeshPhongMaterial||se.isMeshToonMaterial||se.isMeshLambertMaterial||se.isMeshBasicMaterial||se.isMeshStandardMaterial||se.isShaderMaterial)&&rn.setValue(K,"isOrthographic",N.isOrthographicCamera===!0),M!==N&&(M=N,Nr=!0,Uo=!0)}if(Q.isSkinnedMesh){rn.setOptional(K,Q,"bindMatrix"),rn.setOptional(K,Q,"bindMatrixInverse");const dn=Q.skeleton;dn&&(et.floatVertexTextures?(dn.boneTexture===null&&dn.computeBoneTexture(),rn.setValue(K,"boneTexture",dn.boneTexture,D)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}Q.isBatchedMesh&&(rn.setOptional(K,Q,"batchingTexture"),rn.setValue(K,"batchingTexture",Q._matricesTexture,D));const zt=ee.morphAttributes;if((zt.position!==void 0||zt.normal!==void 0||zt.color!==void 0&&et.isWebGL2===!0)&&I.update(Q,ee,Ci),(Nr||at.receiveShadow!==Q.receiveShadow)&&(at.receiveShadow=Q.receiveShadow,rn.setValue(K,"receiveShadow",Q.receiveShadow)),se.isMeshGouraudMaterial&&se.envMap!==null&&(vi.envMap.value=nt,vi.flipEnvMap.value=nt.isCubeTexture&&nt.isRenderTargetTexture===!1?-1:1),Nr&&(rn.setValue(K,"toneMappingExposure",g.toneMappingExposure),at.needsLights&&au(vi,Uo),Ne&&se.fog===!0&&we.refreshFogUniforms(vi,Ne),we.refreshMaterialUniforms(vi,se,ne,z,ae),Ql.upload(K,No(at),vi,D)),se.isShaderMaterial&&se.uniformsNeedUpdate===!0&&(Ql.upload(K,No(at),vi,D),se.uniformsNeedUpdate=!1),se.isSpriteMaterial&&rn.setValue(K,"center",Q.center),rn.setValue(K,"modelViewMatrix",Q.modelViewMatrix),rn.setValue(K,"normalMatrix",Q.normalMatrix),rn.setValue(K,"modelMatrix",Q.matrixWorld),se.isShaderMaterial||se.isRawShaderMaterial){const dn=se.uniformsGroups;for(let Fo=0,Ga=dn.length;Fo<Ga;Fo++)if(et.isWebGL2){const Oo=dn[Fo];tt.update(Oo,Ci),tt.bind(Oo,Ci)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ci}function au(N,q){N.ambientLightColor.needsUpdate=q,N.lightProbe.needsUpdate=q,N.directionalLights.needsUpdate=q,N.directionalLightShadows.needsUpdate=q,N.pointLights.needsUpdate=q,N.pointLightShadows.needsUpdate=q,N.spotLights.needsUpdate=q,N.spotLightShadows.needsUpdate=q,N.rectAreaLights.needsUpdate=q,N.hemisphereLights.needsUpdate=q}function lu(N){return N.isMeshLambertMaterial||N.isMeshToonMaterial||N.isMeshPhongMaterial||N.isMeshStandardMaterial||N.isShadowMaterial||N.isShaderMaterial&&N.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(N,q,ee){st.get(N.texture).__webglTexture=q,st.get(N.depthTexture).__webglTexture=ee;const se=st.get(N);se.__hasExternalTextures=!0,se.__hasExternalTextures&&(se.__autoAllocateDepthBuffer=ee===void 0,se.__autoAllocateDepthBuffer||Ge.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),se.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(N,q){const ee=st.get(N);ee.__webglFramebuffer=q,ee.__useDefaultFramebuffer=q===void 0},this.setRenderTarget=function(N,q=0,ee=0){b=N,P=q,C=ee;let se=!0,Q=null,Ne=!1,De=!1;if(N){const nt=st.get(N);nt.__useDefaultFramebuffer!==void 0?(Ie.bindFramebuffer(K.FRAMEBUFFER,null),se=!1):nt.__webglFramebuffer===void 0?D.setupRenderTarget(N):nt.__hasExternalTextures&&D.rebindTextures(N,st.get(N.texture).__webglTexture,st.get(N.depthTexture).__webglTexture);const ft=N.texture;(ft.isData3DTexture||ft.isDataArrayTexture||ft.isCompressedArrayTexture)&&(De=!0);const lt=st.get(N).__webglFramebuffer;N.isWebGLCubeRenderTarget?(Array.isArray(lt[q])?Q=lt[q][ee]:Q=lt[q],Ne=!0):et.isWebGL2&&N.samples>0&&D.useMultisampledRTT(N)===!1?Q=st.get(N).__webglMultisampledFramebuffer:Array.isArray(lt)?Q=lt[ee]:Q=lt,T.copy(N.viewport),H.copy(N.scissor),V=N.scissorTest}else T.copy(j).multiplyScalar(ne).floor(),H.copy(re).multiplyScalar(ne).floor(),V=oe;if(Ie.bindFramebuffer(K.FRAMEBUFFER,Q)&&et.drawBuffers&&se&&Ie.drawBuffers(N,Q),Ie.viewport(T),Ie.scissor(H),Ie.setScissorTest(V),Ne){const nt=st.get(N.texture);K.framebufferTexture2D(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,K.TEXTURE_CUBE_MAP_POSITIVE_X+q,nt.__webglTexture,ee)}else if(De){const nt=st.get(N.texture),ft=q||0;K.framebufferTextureLayer(K.FRAMEBUFFER,K.COLOR_ATTACHMENT0,nt.__webglTexture,ee||0,ft)}U=-1},this.readRenderTargetPixels=function(N,q,ee,se,Q,Ne,De){if(!(N&&N.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ye=st.get(N).__webglFramebuffer;if(N.isWebGLCubeRenderTarget&&De!==void 0&&(Ye=Ye[De]),Ye){Ie.bindFramebuffer(K.FRAMEBUFFER,Ye);try{const nt=N.texture,ft=nt.format,lt=nt.type;if(ft!==Qn&&he.convert(ft)!==K.getParameter(K.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const ct=lt===Ia&&(Ge.has("EXT_color_buffer_half_float")||et.isWebGL2&&Ge.has("EXT_color_buffer_float"));if(lt!==Tr&&he.convert(lt)!==K.getParameter(K.IMPLEMENTATION_COLOR_READ_TYPE)&&!(lt===Gi&&(et.isWebGL2||Ge.has("OES_texture_float")||Ge.has("WEBGL_color_buffer_float")))&&!ct){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=N.width-se&&ee>=0&&ee<=N.height-Q&&K.readPixels(q,ee,se,Q,he.convert(ft),he.convert(lt),Ne)}finally{const nt=b!==null?st.get(b).__webglFramebuffer:null;Ie.bindFramebuffer(K.FRAMEBUFFER,nt)}}},this.copyFramebufferToTexture=function(N,q,ee=0){const se=Math.pow(2,-ee),Q=Math.floor(q.image.width*se),Ne=Math.floor(q.image.height*se);D.setTexture2D(q,0),K.copyTexSubImage2D(K.TEXTURE_2D,ee,0,0,N.x,N.y,Q,Ne),Ie.unbindTexture()},this.copyTextureToTexture=function(N,q,ee,se=0){const Q=q.image.width,Ne=q.image.height,De=he.convert(ee.format),Ye=he.convert(ee.type);D.setTexture2D(ee,0),K.pixelStorei(K.UNPACK_FLIP_Y_WEBGL,ee.flipY),K.pixelStorei(K.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ee.premultiplyAlpha),K.pixelStorei(K.UNPACK_ALIGNMENT,ee.unpackAlignment),q.isDataTexture?K.texSubImage2D(K.TEXTURE_2D,se,N.x,N.y,Q,Ne,De,Ye,q.image.data):q.isCompressedTexture?K.compressedTexSubImage2D(K.TEXTURE_2D,se,N.x,N.y,q.mipmaps[0].width,q.mipmaps[0].height,De,q.mipmaps[0].data):K.texSubImage2D(K.TEXTURE_2D,se,N.x,N.y,De,Ye,q.image),se===0&&ee.generateMipmaps&&K.generateMipmap(K.TEXTURE_2D),Ie.unbindTexture()},this.copyTextureToTexture3D=function(N,q,ee,se,Q=0){if(g.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Ne=N.max.x-N.min.x+1,De=N.max.y-N.min.y+1,Ye=N.max.z-N.min.z+1,nt=he.convert(se.format),ft=he.convert(se.type);let lt;if(se.isData3DTexture)D.setTexture3D(se,0),lt=K.TEXTURE_3D;else if(se.isDataArrayTexture||se.isCompressedArrayTexture)D.setTexture2DArray(se,0),lt=K.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}K.pixelStorei(K.UNPACK_FLIP_Y_WEBGL,se.flipY),K.pixelStorei(K.UNPACK_PREMULTIPLY_ALPHA_WEBGL,se.premultiplyAlpha),K.pixelStorei(K.UNPACK_ALIGNMENT,se.unpackAlignment);const ct=K.getParameter(K.UNPACK_ROW_LENGTH),kt=K.getParameter(K.UNPACK_IMAGE_HEIGHT),En=K.getParameter(K.UNPACK_SKIP_PIXELS),qt=K.getParameter(K.UNPACK_SKIP_ROWS),Yn=K.getParameter(K.UNPACK_SKIP_IMAGES),Lt=ee.isCompressedTexture?ee.mipmaps[Q]:ee.image;K.pixelStorei(K.UNPACK_ROW_LENGTH,Lt.width),K.pixelStorei(K.UNPACK_IMAGE_HEIGHT,Lt.height),K.pixelStorei(K.UNPACK_SKIP_PIXELS,N.min.x),K.pixelStorei(K.UNPACK_SKIP_ROWS,N.min.y),K.pixelStorei(K.UNPACK_SKIP_IMAGES,N.min.z),ee.isDataTexture||ee.isData3DTexture?K.texSubImage3D(lt,Q,q.x,q.y,q.z,Ne,De,Ye,nt,ft,Lt.data):ee.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),K.compressedTexSubImage3D(lt,Q,q.x,q.y,q.z,Ne,De,Ye,nt,Lt.data)):K.texSubImage3D(lt,Q,q.x,q.y,q.z,Ne,De,Ye,nt,ft,Lt),K.pixelStorei(K.UNPACK_ROW_LENGTH,ct),K.pixelStorei(K.UNPACK_IMAGE_HEIGHT,kt),K.pixelStorei(K.UNPACK_SKIP_PIXELS,En),K.pixelStorei(K.UNPACK_SKIP_ROWS,qt),K.pixelStorei(K.UNPACK_SKIP_IMAGES,Yn),Q===0&&se.generateMipmaps&&K.generateMipmap(lt),Ie.unbindTexture()},this.initTexture=function(N){N.isCubeTexture?D.setTextureCube(N,0):N.isData3DTexture?D.setTexture3D(N,0):N.isDataArrayTexture||N.isCompressedArrayTexture?D.setTexture2DArray(N,0):D.setTexture2D(N,0),Ie.unbindTexture()},this.resetState=function(){P=0,C=0,b=null,Ie.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===xh?"display-p3":"srgb",n.unpackColorSpace=bt.workingColorSpace===eu?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Xt?Kr:hv}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Kr?Xt:Ji}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class VA extends Nv{}VA.prototype.isWebGL1Renderer=!0;class Dv extends Ot{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n}}class GA{constructor(e,n){this.isInterleavedBuffer=!0,this.array=e,this.stride=n,this.count=e!==void 0?e.length/n:0,this.usage=vd,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=mi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,n,i){e*=this.stride,i*=n.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=n.array[i+r];return this}set(e,n=0){return this.array.set(e,n),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const n=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const wn=new B;class Nc{constructor(e,n,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=n,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let n=0,i=this.data.count;n<i;n++)wn.fromBufferAttribute(this,n),wn.applyMatrix4(e),this.setXYZ(n,wn.x,wn.y,wn.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)wn.fromBufferAttribute(this,n),wn.applyNormalMatrix(e),this.setXYZ(n,wn.x,wn.y,wn.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)wn.fromBufferAttribute(this,n),wn.transformDirection(e),this.setXYZ(n,wn.x,wn.y,wn.z);return this}setX(e,n){return this.normalized&&(n=At(n,this.array)),this.data.array[e*this.data.stride+this.offset]=n,this}setY(e,n){return this.normalized&&(n=At(n,this.array)),this.data.array[e*this.data.stride+this.offset+1]=n,this}setZ(e,n){return this.normalized&&(n=At(n,this.array)),this.data.array[e*this.data.stride+this.offset+2]=n,this}setW(e,n){return this.normalized&&(n=At(n,this.array)),this.data.array[e*this.data.stride+this.offset+3]=n,this}getX(e){let n=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(n=Ei(n,this.array)),n}getY(e){let n=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(n=Ei(n,this.array)),n}getZ(e){let n=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(n=Ei(n,this.array)),n}getW(e){let n=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(n=Ei(n,this.array)),n}setXY(e,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(n=At(n,this.array),i=At(i,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this}setXYZ(e,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(n=At(n,this.array),i=At(i,this.array),r=At(r,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(n=At(n,this.array),i=At(i,this.array),r=At(r,this.array),s=At(s,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return new Sn(new this.array.constructor(n),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Nc(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Iv extends Ai{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ot(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ps;const Ko=new B,Ns=new B,Ds=new B,Is=new Ke,Zo=new Ke,Uv=new dt,Nl=new B,Jo=new B,Dl=new B,pg=new Ke,hf=new Ke,mg=new Ke;class WA extends Ot{constructor(e=new Iv){if(super(),this.isSprite=!0,this.type="Sprite",Ps===void 0){Ps=new Kt;const n=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new GA(n,5);Ps.setIndex([0,1,2,0,2,3]),Ps.setAttribute("position",new Nc(i,3,0,!1)),Ps.setAttribute("uv",new Nc(i,2,3,!1))}this.geometry=Ps,this.material=e,this.center=new Ke(.5,.5)}raycast(e,n){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ns.setFromMatrixScale(this.matrixWorld),Uv.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ds.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ns.multiplyScalar(-Ds.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const o=this.center;Il(Nl.set(-.5,-.5,0),Ds,o,Ns,r,s),Il(Jo.set(.5,-.5,0),Ds,o,Ns,r,s),Il(Dl.set(.5,.5,0),Ds,o,Ns,r,s),pg.set(0,0),hf.set(1,0),mg.set(1,1);let a=e.ray.intersectTriangle(Nl,Jo,Dl,!1,Ko);if(a===null&&(Il(Jo.set(-.5,.5,0),Ds,o,Ns,r,s),hf.set(0,1),a=e.ray.intersectTriangle(Nl,Dl,Jo,!1,Ko),a===null))return;const l=e.ray.origin.distanceTo(Ko);l<e.near||l>e.far||n.push({distance:l,point:Ko.clone(),uv:Jn.getInterpolation(Ko,Nl,Jo,Dl,pg,hf,mg,new Ke),face:null,object:this})}copy(e,n){return super.copy(e,n),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Il(t,e,n,i,r,s){Is.subVectors(t,n).addScalar(.5).multiply(i),r!==void 0?(Zo.x=s*Is.x-r*Is.y,Zo.y=r*Is.x+s*Is.y):Zo.copy(Is),t.copy(e),t.x+=Zo.x,t.y+=Zo.y,t.applyMatrix4(Uv)}const gg=new B,_g=new Rt,vg=new Rt,XA=new B,yg=new dt,Ul=new B,pf=new ls,xg=new dt,mf=new To;class jA extends Qt{constructor(e,n){super(e,n),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Zp,this.bindMatrix=new dt,this.bindMatrixInverse=new dt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new wo),this.boundingBox.makeEmpty();const n=e.getAttribute("position");for(let i=0;i<n.count;i++)this.getVertexPosition(i,Ul),this.boundingBox.expandByPoint(Ul)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ls),this.boundingSphere.makeEmpty();const n=e.getAttribute("position");for(let i=0;i<n.count;i++)this.getVertexPosition(i,Ul),this.boundingSphere.expandByPoint(Ul)}copy(e,n){return super.copy(e,n),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,n){const i=this.material,r=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),pf.copy(this.boundingSphere),pf.applyMatrix4(r),e.ray.intersectsSphere(pf)!==!1&&(xg.copy(r).invert(),mf.copy(e.ray).applyMatrix4(xg),!(this.boundingBox!==null&&mf.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,n,mf)))}getVertexPosition(e,n){return super.getVertexPosition(e,n),this.applyBoneTransform(e,n),n}bind(e,n){this.skeleton=e,n===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),n=this.matrixWorld),this.bindMatrix.copy(n),this.bindMatrixInverse.copy(n).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Rt,n=this.geometry.attributes.skinWeight;for(let i=0,r=n.count;i<r;i++){e.fromBufferAttribute(n,i);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),n.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Zp?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===nM?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,n){const i=this.skeleton,r=this.geometry;_g.fromBufferAttribute(r.attributes.skinIndex,e),vg.fromBufferAttribute(r.attributes.skinWeight,e),gg.copy(n).applyMatrix4(this.bindMatrix),n.set(0,0,0);for(let s=0;s<4;s++){const o=vg.getComponent(s);if(o!==0){const a=_g.getComponent(s);yg.multiplyMatrices(i.bones[a].matrixWorld,i.boneInverses[a]),n.addScaledVector(XA.copy(gg).applyMatrix4(yg),o)}}return n.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,n){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,n)}}class Fv extends Ot{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Ov extends xn{constructor(e=null,n=1,i=1,r,s,o,a,l,c=cn,u=cn,h,d){super(null,o,a,l,c,u,r,s,h,d),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Sg=new dt,qA=new dt;class bh{constructor(e=[],n=[]){this.uuid=mi(),this.bones=e.slice(0),this.boneInverses=n,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,n=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),n.length===0)this.calculateInverses();else if(e.length!==n.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,r=this.bones.length;i<r;i++)this.boneInverses.push(new dt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,n=this.bones.length;e<n;e++){const i=new dt;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,n=this.bones.length;e<n;e++){const i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,n=this.bones.length;e<n;e++){const i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const e=this.bones,n=this.boneInverses,i=this.boneMatrices,r=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:qA;Sg.multiplyMatrices(a,n[s]),Sg.toArray(i,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new bh(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const n=new Float32Array(e*e*4);n.set(this.boneMatrices);const i=new Ov(n,e,e,Qn,Gi);return i.needsUpdate=!0,this.boneMatrices=n,this.boneTexture=i,this}getBoneByName(e){for(let n=0,i=this.bones.length;n<i;n++){const r=this.bones[n];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,n){this.uuid=e.uuid;for(let i=0,r=e.bones.length;i<r;i++){const s=e.bones[i];let o=n[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new Fv),this.bones.push(o),this.boneInverses.push(new dt().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const n=this.bones,i=this.boneInverses;for(let r=0,s=n.length;r<s;r++){const o=n[r];e.bones.push(o.uuid);const a=i[r];e.boneInverses.push(a.toArray())}return e}}class yo extends Ai{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ot(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Mg=new B,Eg=new B,wg=new dt,gf=new To,Fl=new ls;class Rh extends Ot{constructor(e=new Kt,n=new yo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)Mg.fromBufferAttribute(n,r-1),Eg.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=Mg.distanceTo(Eg);e.setAttribute("lineDistance",new St(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Fl.copy(i.boundingSphere),Fl.applyMatrix4(r),Fl.radius+=s,e.ray.intersectsSphere(Fl)===!1)return;wg.copy(r).invert(),gf.copy(e.ray).applyMatrix4(wg);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new B,u=new B,h=new B,d=new B,p=this.isLineSegments?2:1,v=i.index,m=i.attributes.position;if(v!==null){const f=Math.max(0,o.start),_=Math.min(v.count,o.start+o.count);for(let g=f,E=_-1;g<E;g+=p){const P=v.getX(g),C=v.getX(g+1);if(c.fromBufferAttribute(m,P),u.fromBufferAttribute(m,C),gf.distanceSqToSegment(c,u,d,h)>l)continue;d.applyMatrix4(this.matrixWorld);const U=e.ray.origin.distanceTo(d);U<e.near||U>e.far||n.push({distance:U,point:h.clone().applyMatrix4(this.matrixWorld),index:g,face:null,faceIndex:null,object:this})}}else{const f=Math.max(0,o.start),_=Math.min(m.count,o.start+o.count);for(let g=f,E=_-1;g<E;g+=p){if(c.fromBufferAttribute(m,g),u.fromBufferAttribute(m,g+1),gf.distanceSqToSegment(c,u,d,h)>l)continue;d.applyMatrix4(this.matrixWorld);const C=e.ray.origin.distanceTo(d);C<e.near||C>e.far||n.push({distance:C,point:h.clone().applyMatrix4(this.matrixWorld),index:g,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const Tg=new B,Ag=new B;class Ch extends Rh{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)Tg.fromBufferAttribute(n,r),Ag.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Tg.distanceTo(Ag);e.setAttribute("lineDistance",new St(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class kv extends Ai{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ot(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const bg=new dt,Md=new To,Ol=new ls,kl=new B;class YA extends Ot{constructor(e=new Kt,n=new kv){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ol.copy(i.boundingSphere),Ol.applyMatrix4(r),Ol.radius+=s,e.ray.intersectsSphere(Ol)===!1)return;bg.copy(r).invert(),Md.copy(e.ray).applyMatrix4(bg);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,h=i.attributes.position;if(c!==null){const d=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let v=d,y=p;v<y;v++){const m=c.getX(v);kl.fromBufferAttribute(h,m),Rg(kl,m,l,r,e,n,this)}}else{const d=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let v=d,y=p;v<y;v++)kl.fromBufferAttribute(h,v),Rg(kl,v,l,r,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Rg(t,e,n,i,r,s,o){const a=Md.distanceSqToPoint(t);if(a<n){const l=new B;Md.closestPointToPoint(t,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class $A extends xn{constructor(e,n,i,r,s,o,a,l,c){super(e,n,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class nu extends Kt{constructor(e=1,n=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],d=[],p=[];let v=0;const y=[],m=i/2;let f=0;_(),o===!1&&(e>0&&g(!0),n>0&&g(!1)),this.setIndex(u),this.setAttribute("position",new St(h,3)),this.setAttribute("normal",new St(d,3)),this.setAttribute("uv",new St(p,2));function _(){const E=new B,P=new B;let C=0;const b=(n-e)/i;for(let U=0;U<=s;U++){const M=[],T=U/s,H=T*(n-e)+e;for(let V=0;V<=r;V++){const ie=V/r,k=ie*l+a,X=Math.sin(k),z=Math.cos(k);P.x=H*X,P.y=-T*i+m,P.z=H*z,h.push(P.x,P.y,P.z),E.set(X,b,z).normalize(),d.push(E.x,E.y,E.z),p.push(ie,1-T),M.push(v++)}y.push(M)}for(let U=0;U<r;U++)for(let M=0;M<s;M++){const T=y[M][U],H=y[M+1][U],V=y[M+1][U+1],ie=y[M][U+1];u.push(T,H,ie),u.push(H,V,ie),C+=6}c.addGroup(f,C,0),f+=C}function g(E){const P=v,C=new Ke,b=new B;let U=0;const M=E===!0?e:n,T=E===!0?1:-1;for(let V=1;V<=r;V++)h.push(0,m*T,0),d.push(0,T,0),p.push(.5,.5),v++;const H=v;for(let V=0;V<=r;V++){const k=V/r*l+a,X=Math.cos(k),z=Math.sin(k);b.x=M*z,b.y=m*T,b.z=M*X,h.push(b.x,b.y,b.z),d.push(0,T,0),C.x=X*.5+.5,C.y=z*.5*T+.5,p.push(C.x,C.y),v++}for(let V=0;V<r;V++){const ie=P+V,k=H+V;E===!0?u.push(k,k+1,ie):u.push(k+1,k,ie),U+=3}c.addGroup(f,U,E===!0?1:2),f+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nu(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class iu extends nu{constructor(e=1,n=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,n,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:n,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new iu(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Lh extends Kt{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new B,d=new B,p=[],v=[],y=[],m=[];for(let f=0;f<=i;f++){const _=[],g=f/i;let E=0;f===0&&o===0?E=.5/n:f===i&&l===Math.PI&&(E=-.5/n);for(let P=0;P<=n;P++){const C=P/n;h.x=-e*Math.cos(r+C*s)*Math.sin(o+g*a),h.y=e*Math.cos(o+g*a),h.z=e*Math.sin(r+C*s)*Math.sin(o+g*a),v.push(h.x,h.y,h.z),d.copy(h).normalize(),y.push(d.x,d.y,d.z),m.push(C+E,1-g),_.push(c++)}u.push(_)}for(let f=0;f<i;f++)for(let _=0;_<n;_++){const g=u[f][_+1],E=u[f][_],P=u[f+1][_],C=u[f+1][_+1];(f!==0||o>0)&&p.push(g,E,C),(f!==i-1||l<Math.PI)&&p.push(E,P,C)}this.setIndex(p),this.setAttribute("position",new St(v,3)),this.setAttribute("normal",new St(y,3)),this.setAttribute("uv",new St(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lh(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ph extends Kt{constructor(e=1,n=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:n,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const o=[],a=[],l=[],c=[],u=new B,h=new B,d=new B;for(let p=0;p<=i;p++)for(let v=0;v<=r;v++){const y=v/r*s,m=p/i*Math.PI*2;h.x=(e+n*Math.cos(m))*Math.cos(y),h.y=(e+n*Math.cos(m))*Math.sin(y),h.z=n*Math.sin(m),a.push(h.x,h.y,h.z),u.x=e*Math.cos(y),u.y=e*Math.sin(y),d.subVectors(h,u).normalize(),l.push(d.x,d.y,d.z),c.push(v/r),c.push(p/i)}for(let p=1;p<=i;p++)for(let v=1;v<=r;v++){const y=(r+1)*p+v-1,m=(r+1)*(p-1)+v-1,f=(r+1)*(p-1)+v,_=(r+1)*p+v;o.push(y,m,_),o.push(m,f,_)}this.setIndex(o),this.setAttribute("position",new St(a,3)),this.setAttribute("normal",new St(l,3)),this.setAttribute("uv",new St(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ph(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Cg extends Ai{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ot(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qc,this.normalScale=new Ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ga extends Ai{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new ot(16777215),this.specular=new ot(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qc,this.normalScale=new Ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Zc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class KA extends Ai{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qc,this.normalScale=new Ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Zc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function zl(t,e,n){return!t||!n&&t.constructor===e?t:typeof e.BYTES_PER_ELEMENT=="number"?new e(t):Array.prototype.slice.call(t)}function ZA(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function JA(t){function e(r,s){return t[r]-t[s]}const n=t.length,i=new Array(n);for(let r=0;r!==n;++r)i[r]=r;return i.sort(e),i}function Lg(t,e,n){const i=t.length,r=new t.constructor(i);for(let s=0,o=0;o!==i;++s){const a=n[s]*e;for(let l=0;l!==e;++l)r[o++]=t[a+l]}return r}function zv(t,e,n,i){let r=1,s=t[0];for(;s!==void 0&&s[i]===void 0;)s=t[r++];if(s===void 0)return;let o=s[i];if(o!==void 0)if(Array.isArray(o))do o=s[i],o!==void 0&&(e.push(s.time),n.push.apply(n,o)),s=t[r++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[i],o!==void 0&&(e.push(s.time),o.toArray(n,n.length)),s=t[r++];while(s!==void 0);else do o=s[i],o!==void 0&&(e.push(s.time),n.push(o)),s=t[r++];while(s!==void 0)}class ru{constructor(e,n,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){const n=this.parameterPositions;let i=this._cachedIndex,r=n[i],s=n[i-1];e:{t:{let o;n:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<s)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=n[++i],e<r)break t}o=n.length;break n}if(!(e>=s)){const a=n[1];e<a&&(i=2,s=a);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=s,s=n[--i-1],e>=s)break t}o=i,i=0;break n}break e}for(;i<o;){const a=i+o>>>1;e<n[a]?o=a:i=a+1}if(r=n[i],s=n[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const n=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)n[o]=i[s+o];return n}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class QA extends ru{constructor(e,n,i,r){super(e,n,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wm,endingEnd:wm}}intervalChanged_(e,n,i){const r=this.parameterPositions;let s=e-2,o=e+1,a=r[s],l=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case Tm:s=e,a=2*n-i;break;case Am:s=r.length-2,a=n+r[s]-r[s+1];break;default:s=e,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Tm:o=e,l=2*i-n;break;case Am:o=1,l=i+r[1]-r[0];break;default:o=e-1,l=n}const c=(i-n)*.5,u=this.valueSize;this._weightPrev=c/(n-a),this._weightNext=c/(l-i),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,n,i,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,p=this._weightNext,v=(i-n)/(r-n),y=v*v,m=y*v,f=-d*m+2*d*y-d*v,_=(1+d)*m+(-1.5-2*d)*y+(-.5+d)*v+1,g=(-1-p)*m+(1.5+p)*y+.5*v,E=p*m-p*y;for(let P=0;P!==a;++P)s[P]=f*o[u+P]+_*o[c+P]+g*o[l+P]+E*o[h+P];return s}}class eb extends ru{constructor(e,n,i,r){super(e,n,i,r)}interpolate_(e,n,i,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(i-n)/(r-n),h=1-u;for(let d=0;d!==a;++d)s[d]=o[c+d]*h+o[l+d]*u;return s}}class tb extends ru{constructor(e,n,i,r){super(e,n,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}}class bi{constructor(e,n,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=zl(n,this.TimeBufferType),this.values=zl(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){const n=e.constructor;let i;if(n.toJSON!==this.toJSON)i=n.toJSON(e);else{i={name:e.name,times:zl(e.times,Array),values:zl(e.values,Array)};const r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new tb(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new eb(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new QA(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let n;switch(e){case Tc:n=this.InterpolantFactoryMethodDiscrete;break;case Ac:n=this.InterpolantFactoryMethodLinear;break;case Vu:n=this.InterpolantFactoryMethodSmooth;break}if(n===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Tc;case this.InterpolantFactoryMethodLinear:return Ac;case this.InterpolantFactoryMethodSmooth:return Vu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const n=this.times;for(let i=0,r=n.length;i!==r;++i)n[i]+=e}return this}scale(e){if(e!==1){const n=this.times;for(let i=0,r=n.length;i!==r;++i)n[i]*=e}return this}trim(e,n){const i=this.times,r=i.length;let s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>n;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const n=this.getValueSize();n-Math.floor(n)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const i=this.times,r=this.values,s=i.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(r!==void 0&&ZA(r))for(let a=0,l=r.length;a!==l;++a){const c=r[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Vu,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(r)l=!0;else{const h=a*i,d=h-i,p=h+i;for(let v=0;v!==i;++v){const y=n[h+v];if(y!==n[d+v]||y!==n[p+v]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const h=a*i,d=o*i;for(let p=0;p!==i;++p)n[d+p]=n[h+p]}++o}}if(s>0){e[o]=e[s];for(let a=s*i,l=o*i,c=0;c!==i;++c)n[l+c]=n[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=n.slice(0,o*i)):(this.times=e,this.values=n),this}clone(){const e=this.times.slice(),n=this.values.slice(),i=this.constructor,r=new i(this.name,e,n);return r.createInterpolant=this.createInterpolant,r}}bi.prototype.TimeBufferType=Float32Array;bi.prototype.ValueBufferType=Float32Array;bi.prototype.DefaultInterpolation=Ac;class Ro extends bi{}Ro.prototype.ValueTypeName="bool";Ro.prototype.ValueBufferType=Array;Ro.prototype.DefaultInterpolation=Tc;Ro.prototype.InterpolantFactoryMethodLinear=void 0;Ro.prototype.InterpolantFactoryMethodSmooth=void 0;class Bv extends bi{}Bv.prototype.ValueTypeName="color";class Dc extends bi{}Dc.prototype.ValueTypeName="number";class nb extends ru{constructor(e,n,i,r){super(e,n,i,r)}interpolate_(e,n,i,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-n)/(r-n);let c=e*a;for(let u=c+a;c!==u;c+=4)_i.slerpFlat(s,0,o,c-a,o,c,l);return s}}class Co extends bi{InterpolantFactoryMethodLinear(e){return new nb(this.times,this.values,this.getValueSize(),e)}}Co.prototype.ValueTypeName="quaternion";Co.prototype.DefaultInterpolation=Ac;Co.prototype.InterpolantFactoryMethodSmooth=void 0;class Lo extends bi{}Lo.prototype.ValueTypeName="string";Lo.prototype.ValueBufferType=Array;Lo.prototype.DefaultInterpolation=Tc;Lo.prototype.InterpolantFactoryMethodLinear=void 0;Lo.prototype.InterpolantFactoryMethodSmooth=void 0;class xo extends bi{}xo.prototype.ValueTypeName="vector";class Pg{constructor(e,n=-1,i,r=dM){this.name=e,this.tracks=i,this.duration=n,this.blendMode=r,this.uuid=mi(),this.duration<0&&this.resetDuration()}static parse(e){const n=[],i=e.tracks,r=1/(e.fps||1);for(let o=0,a=i.length;o!==a;++o)n.push(rb(i[o]).scale(r));const s=new this(e.name,e.duration,n,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const n=[],i=e.tracks,r={name:e.name,duration:e.duration,tracks:n,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=i.length;s!==o;++s)n.push(bi.toJSON(i[s]));return r}static CreateFromMorphTargetSequence(e,n,i,r){const s=n.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const u=JA(l);l=Lg(l,1,u),c=Lg(c,1,u),!r&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new Dc(".morphTargetInfluences["+n[a].name+"]",l,c).scale(1/i))}return new this(e,-1,o)}static findByName(e,n){let i=e;if(!Array.isArray(e)){const r=e;i=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<i.length;r++)if(i[r].name===n)return i[r];return null}static CreateClipsFromMorphTargetSequences(e,n,i){const r={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(s);if(u&&u.length>1){const h=u[1];let d=r[h];d||(r[h]=d=[]),d.push(c)}}const o=[];for(const a in r)o.push(this.CreateFromMorphTargetSequence(a,r[a],n,i));return o}static parseAnimation(e,n){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const i=function(h,d,p,v,y){if(p.length!==0){const m=[],f=[];zv(p,m,f,v),m.length!==0&&y.push(new h(d,m,f))}},r=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const p={};let v;for(v=0;v<d.length;v++)if(d[v].morphTargets)for(let y=0;y<d[v].morphTargets.length;y++)p[d[v].morphTargets[y]]=-1;for(const y in p){const m=[],f=[];for(let _=0;_!==d[v].morphTargets.length;++_){const g=d[v];m.push(g.time),f.push(g.morphTarget===y?1:0)}r.push(new Dc(".morphTargetInfluence["+y+"]",m,f))}l=p.length*o}else{const p=".bones["+n[h].name+"]";i(xo,p+".position",d,"pos",r),i(Co,p+".quaternion",d,"rot",r),i(xo,p+".scale",d,"scl",r)}}return r.length===0?null:new this(s,l,r,a)}resetDuration(){const e=this.tracks;let n=0;for(let i=0,r=e.length;i!==r;++i){const s=this.tracks[i];n=Math.max(n,s.times[s.times.length-1])}return this.duration=n,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let n=0;n<this.tracks.length;n++)e=e&&this.tracks[n].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function ib(t){switch(t.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Dc;case"vector":case"vector2":case"vector3":case"vector4":return xo;case"color":return Bv;case"quaternion":return Co;case"bool":case"boolean":return Ro;case"string":return Lo}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+t)}function rb(t){if(t.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=ib(t.type);if(t.times===void 0){const n=[],i=[];zv(t.keys,n,i,"value"),t.times=n,t.values=i}return e.parse!==void 0?e.parse(t):new e(t.name,t.times,t.values,t.interpolation)}const Ic={enabled:!1,files:{},add:function(t,e){this.enabled!==!1&&(this.files[t]=e)},get:function(t){if(this.enabled!==!1)return this.files[t]},remove:function(t){delete this.files[t]},clear:function(){this.files={}}};class Hv{constructor(e,n,i){const r=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=n,this.onError=i,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const p=c[h],v=c[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return v}return null}}}const Vv=new Hv;class Rr{constructor(e){this.manager=e!==void 0?e:Vv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,n){const i=this;return new Promise(function(r,s){i.load(e,r,n,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Rr.DEFAULT_MATERIAL_NAME="__DEFAULT";const Fi={};class sb extends Error{constructor(e,n){super(e),this.response=n}}class Nh extends Rr{constructor(e){super(e)}load(e,n,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Ic.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{n&&n(s),this.manager.itemEnd(e)},0),s;if(Fi[e]!==void 0){Fi[e].push({onLoad:n,onProgress:i,onError:r});return}Fi[e]=[],Fi[e].push({onLoad:n,onProgress:i,onError:r});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Fi[e],h=c.body.getReader(),d=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),p=d?parseInt(d):0,v=p!==0;let y=0;const m=new ReadableStream({start(f){_();function _(){h.read().then(({done:g,value:E})=>{if(g)f.close();else{y+=E.byteLength;const P=new ProgressEvent("progress",{lengthComputable:v,loaded:y,total:p});for(let C=0,b=u.length;C<b;C++){const U=u[C];U.onProgress&&U.onProgress(P)}f.enqueue(E),_()}})}}});return new Response(m)}else throw new sb(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),d=h&&h[1]?h[1].toLowerCase():void 0,p=new TextDecoder(d);return c.arrayBuffer().then(v=>p.decode(v))}}}).then(c=>{Ic.add(e,c);const u=Fi[e];delete Fi[e];for(let h=0,d=u.length;h<d;h++){const p=u[h];p.onLoad&&p.onLoad(c)}}).catch(c=>{const u=Fi[e];if(u===void 0)throw this.manager.itemError(e),c;delete Fi[e];for(let h=0,d=u.length;h<d;h++){const p=u[h];p.onError&&p.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class ob extends Rr{constructor(e){super(e)}load(e,n,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Ic.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){n&&n(o),s.manager.itemEnd(e)},0),o;const a=Ua("img");function l(){u(),Ic.add(e,this),n&&n(this),s.manager.itemEnd(e)}function c(h){u(),r&&r(h),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class ab extends Rr{constructor(e){super(e)}load(e,n,i,r){const s=this,o=new Ov,a=new Nh(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(s.withCredentials),a.load(e,function(l){let c;try{c=s.parse(l)}catch(u){if(r!==void 0)r(u);else{console.error(u);return}}c.image!==void 0?o.image=c.image:c.data!==void 0&&(o.image.width=c.width,o.image.height=c.height,o.image.data=c.data),o.wrapS=c.wrapS!==void 0?c.wrapS:Rn,o.wrapT=c.wrapT!==void 0?c.wrapT:Rn,o.magFilter=c.magFilter!==void 0?c.magFilter:bn,o.minFilter=c.minFilter!==void 0?c.minFilter:bn,o.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0?o.colorSpace=c.colorSpace:c.encoding!==void 0&&(o.encoding=c.encoding),c.flipY!==void 0&&(o.flipY=c.flipY),c.format!==void 0&&(o.format=c.format),c.type!==void 0&&(o.type=c.type),c.mipmaps!==void 0&&(o.mipmaps=c.mipmaps,o.minFilter=ns),c.mipmapCount===1&&(o.minFilter=bn),c.generateMipmaps!==void 0&&(o.generateMipmaps=c.generateMipmaps),o.needsUpdate=!0,n&&n(o,c)},i,r),o}}class Gv extends Rr{constructor(e){super(e)}load(e,n,i,r){const s=new xn,o=new ob(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,n!==void 0&&n(s)},i,r),s}}class Ha extends Ot{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new ot(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),n}}class lb extends Ha{constructor(e,n,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ot.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ot(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}}const _f=new dt,Ng=new B,Dg=new B;class Dh{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ke(512,512),this.map=null,this.mapPass=null,this.matrix=new dt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Eh,this._frameExtents=new Ke(1,1),this._viewportCount=1,this._viewports=[new Rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;Ng.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ng),Dg.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Dg),n.updateMatrixWorld(),_f.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_f),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(_f)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class cb extends Dh{constructor(){super(new yn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const n=this.camera,i=go*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,s=e.distance||n.far;(i!==n.fov||r!==n.aspect||s!==n.far)&&(n.fov=i,n.aspect=r,n.far=s,n.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class ub extends Ha{constructor(e,n,i=0,r=Math.PI/3,s=0,o=2){super(e,n),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ot.DEFAULT_UP),this.updateMatrix(),this.target=new Ot,this.distance=i,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new cb}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Ig=new dt,Qo=new B,vf=new B;class fb extends Dh{constructor(){super(new yn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ke(4,2),this._viewportCount=6,this._viewports=[new Rt(2,1,1,1),new Rt(0,1,1,1),new Rt(3,1,1,1),new Rt(1,1,1,1),new Rt(3,0,1,1),new Rt(1,0,1,1)],this._cubeDirections=[new B(1,0,0),new B(-1,0,0),new B(0,0,1),new B(0,0,-1),new B(0,1,0),new B(0,-1,0)],this._cubeUps=[new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,0,1),new B(0,0,-1)]}updateMatrices(e,n=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),Qo.setFromMatrixPosition(e.matrixWorld),i.position.copy(Qo),vf.copy(i.position),vf.add(this._cubeDirections[n]),i.up.copy(this._cubeUps[n]),i.lookAt(vf),i.updateMatrixWorld(),r.makeTranslation(-Qo.x,-Qo.y,-Qo.z),Ig.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ig)}}class db extends Ha{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new fb}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class hb extends Dh{constructor(){super(new Th(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Wv extends Ha{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ot.DEFAULT_UP),this.updateMatrix(),this.target=new Ot,this.shadow=new hb}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class pb extends Ha{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class Xv{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let n="";for(let i=0,r=e.length;i<r;i++)n+=String.fromCharCode(e[i]);try{return decodeURIComponent(escape(n))}catch{return n}}static extractUrlBase(e){const n=e.lastIndexOf("/");return n===-1?"./":e.slice(0,n+1)}static resolveURL(e,n){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(n)&&/^\//.test(e)&&(n=n.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:n+e)}}class mb{constructor(e,n,i=0,r=1/0){this.ray=new To(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new Mh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}intersectObject(e,n=!0,i=[]){return Ed(e,this,i,n),i.sort(Ug),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Ed(e[r],this,i,n);return i.sort(Ug),i}}function Ug(t,e){return t.distance-e.distance}function Ed(t,e,n,i){if(t.layers.test(e.layers)&&t.raycast(e,n),i===!0){const r=t.children;for(let s=0,o=r.length;s<o;s++)Ed(r[s],e,n,!0)}}class Fg{constructor(e=1,n=0,i=0){return this.radius=e,this.phi=n,this.theta=i,this}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(vn(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class gb extends Ch{constructor(e=10,n=10,i=4473924,r=8947848){i=new ot(i),r=new ot(r);const s=n/2,o=e/n,a=e/2,l=[],c=[];for(let d=0,p=0,v=-a;d<=n;d++,v+=o){l.push(-a,0,v,a,0,v),l.push(v,0,-a,v,0,a);const y=d===s?i:r;y.toArray(c,p),p+=3,y.toArray(c,p),p+=3,y.toArray(c,p),p+=3,y.toArray(c,p),p+=3}const u=new Kt;u.setAttribute("position",new St(l,3)),u.setAttribute("color",new St(c,3));const h=new yo({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class _b extends Ch{constructor(e=1){const n=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],i=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],r=new Kt;r.setAttribute("position",new St(n,3)),r.setAttribute("color",new St(i,3));const s=new yo({vertexColors:!0,toneMapped:!1});super(r,s),this.type="AxesHelper"}setColors(e,n,i){const r=new ot,s=this.geometry.attributes.color.array;return r.set(e),r.toArray(s,0),r.toArray(s,3),r.set(n),r.toArray(s,6),r.toArray(s,9),r.set(i),r.toArray(s,12),r.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:vh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=vh);const Og={type:"change"},yf={type:"start"},kg={type:"end"},Bl=new To,zg=new Bi,vb=Math.cos(70*Fs.DEG2RAD);class yb extends as{constructor(e,n){super(),this.object=e,this.domElement=n,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:hs.ROTATE,MIDDLE:hs.DOLLY,RIGHT:hs.PAN},this.touches={ONE:ps.ROTATE,TWO:ps.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(I){I.addEventListener("keydown",ve),this._domElementKeyEvents=I},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",ve),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(Og),i.update(),s=r.NONE},this.update=function(){const I=new B,ce=new _i().setFromUnitVectors(e.up,new B(0,1,0)),me=ce.clone().invert(),he=new B,be=new _i,tt=new B,Ze=2*Math.PI;return function(ye=null){const F=i.object.position;I.copy(F).sub(i.target),I.applyQuaternion(ce),a.setFromVector3(I),i.autoRotate&&s===r.NONE&&H(M(ye)),i.enableDamping?(a.theta+=l.theta*i.dampingFactor,a.phi+=l.phi*i.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let Me=i.minAzimuthAngle,Ee=i.maxAzimuthAngle;isFinite(Me)&&isFinite(Ee)&&(Me<-Math.PI?Me+=Ze:Me>Math.PI&&(Me-=Ze),Ee<-Math.PI?Ee+=Ze:Ee>Math.PI&&(Ee-=Ze),Me<=Ee?a.theta=Math.max(Me,Math.min(Ee,a.theta)):a.theta=a.theta>(Me+Ee)/2?Math.max(Me,a.theta):Math.min(Ee,a.theta)),a.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,a.phi)),a.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(u,i.dampingFactor):i.target.add(u),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor),i.zoomToCursor&&C||i.object.isOrthographicCamera?a.radius=G(a.radius):a.radius=G(a.radius*c),I.setFromSpherical(a),I.applyQuaternion(me),F.copy(i.target).add(I),i.object.lookAt(i.target),i.enableDamping===!0?(l.theta*=1-i.dampingFactor,l.phi*=1-i.dampingFactor,u.multiplyScalar(1-i.dampingFactor)):(l.set(0,0,0),u.set(0,0,0));let qe=!1;if(i.zoomToCursor&&C){let Be=null;if(i.object.isPerspectiveCamera){const Xe=I.length();Be=G(Xe*c);const Je=Xe-Be;i.object.position.addScaledVector(E,Je),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){const Xe=new B(P.x,P.y,0);Xe.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),qe=!0;const Je=new B(P.x,P.y,0);Je.unproject(i.object),i.object.position.sub(Je).add(Xe),i.object.updateMatrixWorld(),Be=I.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;Be!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(Be).add(i.object.position):(Bl.origin.copy(i.object.position),Bl.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(Bl.direction))<vb?e.lookAt(i.target):(zg.setFromNormalAndCoplanarPoint(i.object.up,i.target),Bl.intersectPlane(zg,i.target))))}else i.object.isOrthographicCamera&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),qe=!0);return c=1,C=!1,qe||he.distanceToSquared(i.object.position)>o||8*(1-be.dot(i.object.quaternion))>o||tt.distanceToSquared(i.target)>0?(i.dispatchEvent(Og),he.copy(i.object.position),be.copy(i.object.quaternion),tt.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",Y),i.domElement.removeEventListener("pointerdown",st),i.domElement.removeEventListener("pointercancel",A),i.domElement.removeEventListener("wheel",pe),i.domElement.removeEventListener("pointermove",D),i.domElement.removeEventListener("pointerup",A),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",ve),i._domElementKeyEvents=null)};const i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const o=1e-6,a=new Fg,l=new Fg;let c=1;const u=new B,h=new Ke,d=new Ke,p=new Ke,v=new Ke,y=new Ke,m=new Ke,f=new Ke,_=new Ke,g=new Ke,E=new B,P=new Ke;let C=!1;const b=[],U={};function M(I){return I!==null?2*Math.PI/60*i.autoRotateSpeed*I:2*Math.PI/60/60*i.autoRotateSpeed}function T(I){const ce=Math.abs(I)/(100*(window.devicePixelRatio|0));return Math.pow(.95,i.zoomSpeed*ce)}function H(I){l.theta-=I}function V(I){l.phi-=I}const ie=function(){const I=new B;return function(me,he){I.setFromMatrixColumn(he,0),I.multiplyScalar(-me),u.add(I)}}(),k=function(){const I=new B;return function(me,he){i.screenSpacePanning===!0?I.setFromMatrixColumn(he,1):(I.setFromMatrixColumn(he,0),I.crossVectors(i.object.up,I)),I.multiplyScalar(me),u.add(I)}}(),X=function(){const I=new B;return function(me,he){const be=i.domElement;if(i.object.isPerspectiveCamera){const tt=i.object.position;I.copy(tt).sub(i.target);let Ze=I.length();Ze*=Math.tan(i.object.fov/2*Math.PI/180),ie(2*me*Ze/be.clientHeight,i.object.matrix),k(2*he*Ze/be.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(ie(me*(i.object.right-i.object.left)/i.object.zoom/be.clientWidth,i.object.matrix),k(he*(i.object.top-i.object.bottom)/i.object.zoom/be.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function z(I){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c/=I:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function ne(I){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c*=I:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function O(I,ce){if(!i.zoomToCursor)return;C=!0;const me=i.domElement.getBoundingClientRect(),he=I-me.left,be=ce-me.top,tt=me.width,Ze=me.height;P.x=he/tt*2-1,P.y=-(be/Ze)*2+1,E.set(P.x,P.y,1).unproject(i.object).sub(i.object.position).normalize()}function G(I){return Math.max(i.minDistance,Math.min(i.maxDistance,I))}function j(I){h.set(I.clientX,I.clientY)}function re(I){O(I.clientX,I.clientX),f.set(I.clientX,I.clientY)}function oe(I){v.set(I.clientX,I.clientY)}function W(I){d.set(I.clientX,I.clientY),p.subVectors(d,h).multiplyScalar(i.rotateSpeed);const ce=i.domElement;H(2*Math.PI*p.x/ce.clientHeight),V(2*Math.PI*p.y/ce.clientHeight),h.copy(d),i.update()}function $(I){_.set(I.clientX,I.clientY),g.subVectors(_,f),g.y>0?z(T(g.y)):g.y<0&&ne(T(g.y)),f.copy(_),i.update()}function le(I){y.set(I.clientX,I.clientY),m.subVectors(y,v).multiplyScalar(i.panSpeed),X(m.x,m.y),v.copy(y),i.update()}function ae(I){O(I.clientX,I.clientY),I.deltaY<0?ne(T(I.deltaY)):I.deltaY>0&&z(T(I.deltaY)),i.update()}function fe(I){let ce=!1;switch(I.code){case i.keys.UP:I.ctrlKey||I.metaKey||I.shiftKey?V(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):X(0,i.keyPanSpeed),ce=!0;break;case i.keys.BOTTOM:I.ctrlKey||I.metaKey||I.shiftKey?V(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):X(0,-i.keyPanSpeed),ce=!0;break;case i.keys.LEFT:I.ctrlKey||I.metaKey||I.shiftKey?H(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):X(i.keyPanSpeed,0),ce=!0;break;case i.keys.RIGHT:I.ctrlKey||I.metaKey||I.shiftKey?H(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):X(-i.keyPanSpeed,0),ce=!0;break}ce&&(I.preventDefault(),i.update())}function Te(I){if(b.length===1)h.set(I.pageX,I.pageY);else{const ce=Ce(I),me=.5*(I.pageX+ce.x),he=.5*(I.pageY+ce.y);h.set(me,he)}}function Ve(I){if(b.length===1)v.set(I.pageX,I.pageY);else{const ce=Ce(I),me=.5*(I.pageX+ce.x),he=.5*(I.pageY+ce.y);v.set(me,he)}}function ke(I){const ce=Ce(I),me=I.pageX-ce.x,he=I.pageY-ce.y,be=Math.sqrt(me*me+he*he);f.set(0,be)}function pt(I){i.enableZoom&&ke(I),i.enablePan&&Ve(I)}function K(I){i.enableZoom&&ke(I),i.enableRotate&&Te(I)}function _t(I){if(b.length==1)d.set(I.pageX,I.pageY);else{const me=Ce(I),he=.5*(I.pageX+me.x),be=.5*(I.pageY+me.y);d.set(he,be)}p.subVectors(d,h).multiplyScalar(i.rotateSpeed);const ce=i.domElement;H(2*Math.PI*p.x/ce.clientHeight),V(2*Math.PI*p.y/ce.clientHeight),h.copy(d)}function Ge(I){if(b.length===1)y.set(I.pageX,I.pageY);else{const ce=Ce(I),me=.5*(I.pageX+ce.x),he=.5*(I.pageY+ce.y);y.set(me,he)}m.subVectors(y,v).multiplyScalar(i.panSpeed),X(m.x,m.y),v.copy(y)}function et(I){const ce=Ce(I),me=I.pageX-ce.x,he=I.pageY-ce.y,be=Math.sqrt(me*me+he*he);_.set(0,be),g.set(0,Math.pow(_.y/f.y,i.zoomSpeed)),z(g.y),f.copy(_);const tt=(I.pageX+ce.x)*.5,Ze=(I.pageY+ce.y)*.5;O(tt,Ze)}function Ie(I){i.enableZoom&&et(I),i.enablePan&&Ge(I)}function Mt(I){i.enableZoom&&et(I),i.enableRotate&&_t(I)}function st(I){i.enabled!==!1&&(b.length===0&&(i.domElement.setPointerCapture(I.pointerId),i.domElement.addEventListener("pointermove",D),i.domElement.addEventListener("pointerup",A)),de(I),I.pointerType==="touch"?ze(I):Z(I))}function D(I){i.enabled!==!1&&(I.pointerType==="touch"?we(I):_e(I))}function A(I){Se(I),b.length===0&&(i.domElement.releasePointerCapture(I.pointerId),i.domElement.removeEventListener("pointermove",D),i.domElement.removeEventListener("pointerup",A)),i.dispatchEvent(kg),s=r.NONE}function Z(I){let ce;switch(I.button){case 0:ce=i.mouseButtons.LEFT;break;case 1:ce=i.mouseButtons.MIDDLE;break;case 2:ce=i.mouseButtons.RIGHT;break;default:ce=-1}switch(ce){case hs.DOLLY:if(i.enableZoom===!1)return;re(I),s=r.DOLLY;break;case hs.ROTATE:if(I.ctrlKey||I.metaKey||I.shiftKey){if(i.enablePan===!1)return;oe(I),s=r.PAN}else{if(i.enableRotate===!1)return;j(I),s=r.ROTATE}break;case hs.PAN:if(I.ctrlKey||I.metaKey||I.shiftKey){if(i.enableRotate===!1)return;j(I),s=r.ROTATE}else{if(i.enablePan===!1)return;oe(I),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(yf)}function _e(I){switch(s){case r.ROTATE:if(i.enableRotate===!1)return;W(I);break;case r.DOLLY:if(i.enableZoom===!1)return;$(I);break;case r.PAN:if(i.enablePan===!1)return;le(I);break}}function pe(I){i.enabled===!1||i.enableZoom===!1||s!==r.NONE||(I.preventDefault(),i.dispatchEvent(yf),ae(I),i.dispatchEvent(kg))}function ve(I){i.enabled===!1||i.enablePan===!1||fe(I)}function ze(I){switch(J(I),b.length){case 1:switch(i.touches.ONE){case ps.ROTATE:if(i.enableRotate===!1)return;Te(I),s=r.TOUCH_ROTATE;break;case ps.PAN:if(i.enablePan===!1)return;Ve(I),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(i.touches.TWO){case ps.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;pt(I),s=r.TOUCH_DOLLY_PAN;break;case ps.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;K(I),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(yf)}function we(I){switch(J(I),s){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;_t(I),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;Ge(I),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Ie(I),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Mt(I),i.update();break;default:s=r.NONE}}function Y(I){i.enabled!==!1&&I.preventDefault()}function de(I){b.push(I.pointerId)}function Se(I){delete U[I.pointerId];for(let ce=0;ce<b.length;ce++)if(b[ce]==I.pointerId){b.splice(ce,1);return}}function J(I){let ce=U[I.pointerId];ce===void 0&&(ce=new Ke,U[I.pointerId]=ce),ce.set(I.pageX,I.pageY)}function Ce(I){const ce=I.pointerId===b[0]?b[1]:b[0];return U[ce]}i.domElement.addEventListener("contextmenu",Y),i.domElement.addEventListener("pointerdown",st),i.domElement.addEventListener("pointercancel",A),i.domElement.addEventListener("wheel",pe,{passive:!1}),this.update()}}class xb extends Rr{constructor(e){super(e)}load(e,n,i,r){const s=this,o=new Nh(this.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){try{n(s.parse(a))}catch(l){r?r(l):console.error(l),s.manager.itemError(e)}},i,r)}parse(e){function n(c){const u=new DataView(c),h=32/8*3+32/8*3*3+16/8,d=u.getUint32(80,!0);if(80+32/8+d*h===u.byteLength)return!0;const v=[115,111,108,105,100];for(let y=0;y<5;y++)if(i(v,u,y))return!1;return!0}function i(c,u,h){for(let d=0,p=c.length;d<p;d++)if(c[d]!==u.getUint8(h+d))return!1;return!0}function r(c){const u=new DataView(c),h=u.getUint32(80,!0);let d,p,v,y=!1,m,f,_,g,E;for(let H=0;H<70;H++)u.getUint32(H,!1)==1129270351&&u.getUint8(H+4)==82&&u.getUint8(H+5)==61&&(y=!0,m=new Float32Array(h*3*3),f=u.getUint8(H+6)/255,_=u.getUint8(H+7)/255,g=u.getUint8(H+8)/255,E=u.getUint8(H+9)/255);const P=84,C=12*4+2,b=new Kt,U=new Float32Array(h*3*3),M=new Float32Array(h*3*3),T=new ot;for(let H=0;H<h;H++){const V=P+H*C,ie=u.getFloat32(V,!0),k=u.getFloat32(V+4,!0),X=u.getFloat32(V+8,!0);if(y){const z=u.getUint16(V+48,!0);z&32768?(d=f,p=_,v=g):(d=(z&31)/31,p=(z>>5&31)/31,v=(z>>10&31)/31)}for(let z=1;z<=3;z++){const ne=V+z*12,O=H*3*3+(z-1)*3;U[O]=u.getFloat32(ne,!0),U[O+1]=u.getFloat32(ne+4,!0),U[O+2]=u.getFloat32(ne+8,!0),M[O]=ie,M[O+1]=k,M[O+2]=X,y&&(T.set(d,p,v).convertSRGBToLinear(),m[O]=T.r,m[O+1]=T.g,m[O+2]=T.b)}}return b.setAttribute("position",new Sn(U,3)),b.setAttribute("normal",new Sn(M,3)),y&&(b.setAttribute("color",new Sn(m,3)),b.hasColors=!0,b.alpha=E),b}function s(c){const u=new Kt,h=/solid([\s\S]*?)endsolid/g,d=/facet([\s\S]*?)endfacet/g,p=/solid\s(.+)/;let v=0;const y=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,m=new RegExp("vertex"+y+y+y,"g"),f=new RegExp("normal"+y+y+y,"g"),_=[],g=[],E=[],P=new B;let C,b=0,U=0,M=0;for(;(C=h.exec(c))!==null;){U=M;const T=C[0],H=(C=p.exec(T))!==null?C[1]:"";for(E.push(H);(C=d.exec(T))!==null;){let k=0,X=0;const z=C[0];for(;(C=f.exec(z))!==null;)P.x=parseFloat(C[1]),P.y=parseFloat(C[2]),P.z=parseFloat(C[3]),X++;for(;(C=m.exec(z))!==null;)_.push(parseFloat(C[1]),parseFloat(C[2]),parseFloat(C[3])),g.push(P.x,P.y,P.z),k++,M++;X!==1&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+v),k!==3&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+v),v++}const V=U,ie=M-U;u.userData.groupNames=E,u.addGroup(V,ie,b),b++}return u.setAttribute("position",new St(_,3)),u.setAttribute("normal",new St(g,3)),u}function o(c){return typeof c!="string"?new TextDecoder().decode(c):c}function a(c){if(typeof c=="string"){const u=new Uint8Array(c.length);for(let h=0;h<c.length;h++)u[h]=c.charCodeAt(h)&255;return u.buffer||u}else return c}const l=a(e);return n(l)?r(l):s(o(e))}}class Bg extends ab{constructor(e){super(e)}parse(e){function n(z){switch(z.image_type){case d:case y:if(z.colormap_length>256||z.colormap_size!==24||z.colormap_type!==1)throw new Error("THREE.TGALoader: Invalid type colormap data for indexed type.");break;case p:case v:case m:case f:if(z.colormap_type)throw new Error("THREE.TGALoader: Invalid type colormap data for colormap type.");break;case h:throw new Error("THREE.TGALoader: No data.");default:throw new Error("THREE.TGALoader: Invalid type "+z.image_type)}if(z.width<=0||z.height<=0)throw new Error("THREE.TGALoader: Invalid image size.");if(z.pixel_size!==8&&z.pixel_size!==16&&z.pixel_size!==24&&z.pixel_size!==32)throw new Error("THREE.TGALoader: Invalid pixel size "+z.pixel_size)}function i(z,ne,O,G,j){let re,oe;const W=O.pixel_size>>3,$=O.width*O.height*W;if(ne&&(oe=j.subarray(G,G+=O.colormap_length*(O.colormap_size>>3))),z){re=new Uint8Array($);let le,ae,fe,Te=0;const Ve=new Uint8Array(W);for(;Te<$;)if(le=j[G++],ae=(le&127)+1,le&128){for(fe=0;fe<W;++fe)Ve[fe]=j[G++];for(fe=0;fe<ae;++fe)re.set(Ve,Te+fe*W);Te+=W*ae}else{for(ae*=W,fe=0;fe<ae;++fe)re[Te+fe]=j[G++];Te+=ae}}else re=j.subarray(G,G+=ne?O.width*O.height:$);return{pixel_data:re,palettes:oe}}function r(z,ne,O,G,j,re,oe,W,$){const le=$;let ae,fe=0,Te,Ve;const ke=T.width;for(Ve=ne;Ve!==G;Ve+=O)for(Te=j;Te!==oe;Te+=re,fe++)ae=W[fe],z[(Te+ke*Ve)*4+3]=255,z[(Te+ke*Ve)*4+2]=le[ae*3+0],z[(Te+ke*Ve)*4+1]=le[ae*3+1],z[(Te+ke*Ve)*4+0]=le[ae*3+2];return z}function s(z,ne,O,G,j,re,oe,W){let $,le=0,ae,fe;const Te=T.width;for(fe=ne;fe!==G;fe+=O)for(ae=j;ae!==oe;ae+=re,le+=2)$=W[le+0]+(W[le+1]<<8),z[(ae+Te*fe)*4+0]=($&31744)>>7,z[(ae+Te*fe)*4+1]=($&992)>>2,z[(ae+Te*fe)*4+2]=($&31)<<3,z[(ae+Te*fe)*4+3]=$&32768?0:255;return z}function o(z,ne,O,G,j,re,oe,W){let $=0,le,ae;const fe=T.width;for(ae=ne;ae!==G;ae+=O)for(le=j;le!==oe;le+=re,$+=3)z[(le+fe*ae)*4+3]=255,z[(le+fe*ae)*4+2]=W[$+0],z[(le+fe*ae)*4+1]=W[$+1],z[(le+fe*ae)*4+0]=W[$+2];return z}function a(z,ne,O,G,j,re,oe,W){let $=0,le,ae;const fe=T.width;for(ae=ne;ae!==G;ae+=O)for(le=j;le!==oe;le+=re,$+=4)z[(le+fe*ae)*4+2]=W[$+0],z[(le+fe*ae)*4+1]=W[$+1],z[(le+fe*ae)*4+0]=W[$+2],z[(le+fe*ae)*4+3]=W[$+3];return z}function l(z,ne,O,G,j,re,oe,W){let $,le=0,ae,fe;const Te=T.width;for(fe=ne;fe!==G;fe+=O)for(ae=j;ae!==oe;ae+=re,le++)$=W[le],z[(ae+Te*fe)*4+0]=$,z[(ae+Te*fe)*4+1]=$,z[(ae+Te*fe)*4+2]=$,z[(ae+Te*fe)*4+3]=255;return z}function c(z,ne,O,G,j,re,oe,W){let $=0,le,ae;const fe=T.width;for(ae=ne;ae!==G;ae+=O)for(le=j;le!==oe;le+=re,$+=2)z[(le+fe*ae)*4+0]=W[$+0],z[(le+fe*ae)*4+1]=W[$+0],z[(le+fe*ae)*4+2]=W[$+0],z[(le+fe*ae)*4+3]=W[$+1];return z}function u(z,ne,O,G,j){let re,oe,W,$,le,ae;switch((T.flags&_)>>g){default:case C:re=0,W=1,le=ne,oe=0,$=1,ae=O;break;case E:re=0,W=1,le=ne,oe=O-1,$=-1,ae=-1;break;case b:re=ne-1,W=-1,le=-1,oe=0,$=1,ae=O;break;case P:re=ne-1,W=-1,le=-1,oe=O-1,$=-1,ae=-1;break}if(ie)switch(T.pixel_size){case 8:l(z,oe,$,ae,re,W,le,G);break;case 16:c(z,oe,$,ae,re,W,le,G);break;default:throw new Error("THREE.TGALoader: Format not supported.")}else switch(T.pixel_size){case 8:r(z,oe,$,ae,re,W,le,G,j);break;case 16:s(z,oe,$,ae,re,W,le,G);break;case 24:o(z,oe,$,ae,re,W,le,G);break;case 32:a(z,oe,$,ae,re,W,le,G);break;default:throw new Error("THREE.TGALoader: Format not supported.")}return z}const h=0,d=1,p=2,v=3,y=9,m=10,f=11,_=48,g=4,E=0,P=1,C=2,b=3;if(e.length<19)throw new Error("THREE.TGALoader: Not enough data to contain header.");let U=0;const M=new Uint8Array(e),T={id_length:M[U++],colormap_type:M[U++],image_type:M[U++],colormap_index:M[U++]|M[U++]<<8,colormap_length:M[U++]|M[U++]<<8,colormap_size:M[U++],origin:[M[U++]|M[U++]<<8,M[U++]|M[U++]<<8],width:M[U++]|M[U++]<<8,height:M[U++]|M[U++]<<8,pixel_size:M[U++],flags:M[U++]};if(n(T),T.id_length+U>e.length)throw new Error("THREE.TGALoader: No data.");U+=T.id_length;let H=!1,V=!1,ie=!1;switch(T.image_type){case y:H=!0,V=!0;break;case d:V=!0;break;case m:H=!0;break;case p:break;case f:H=!0,ie=!0;break;case v:ie=!0;break}const k=new Uint8Array(T.width*T.height*4),X=i(H,V,T,U,M);return u(k,T.width,T.height,X.pixel_data,X.palettes),{data:k,width:T.width,height:T.height,flipY:!0,generateMipmaps:!0,minFilter:ns}}}class Sb extends Rr{load(e,n,i,r){const s=this,o=s.path===""?Xv.extractUrlBase(e):s.path,a=new Nh(s.manager);a.setPath(s.path),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(e,function(l){try{n(s.parse(l,o))}catch(c){r?r(c):console.error(c),s.manager.itemError(e)}},i,r)}parse(e,n){function i(S,x){const R=[],w=S.childNodes;for(let L=0,te=w.length;L<te;L++){const ue=w[L];ue.nodeName===x&&R.push(ue)}return R}function r(S){if(S.length===0)return[];const x=S.trim().split(/\s+/),R=new Array(x.length);for(let w=0,L=x.length;w<L;w++)R[w]=x[w];return R}function s(S){if(S.length===0)return[];const x=S.trim().split(/\s+/),R=new Array(x.length);for(let w=0,L=x.length;w<L;w++)R[w]=parseFloat(x[w]);return R}function o(S){if(S.length===0)return[];const x=S.trim().split(/\s+/),R=new Array(x.length);for(let w=0,L=x.length;w<L;w++)R[w]=parseInt(x[w]);return R}function a(S){return S.substring(1)}function l(){return"three_default_"+Yv++}function c(S){return Object.keys(S).length===0}function u(S){return{unit:h(i(S,"unit")[0]),upAxis:d(i(S,"up_axis")[0])}}function h(S){return S!==void 0&&S.hasAttribute("meter")===!0?parseFloat(S.getAttribute("meter")):1}function d(S){return S!==void 0?S.textContent:"Y_UP"}function p(S,x,R,w){const L=i(S,x)[0];if(L!==void 0){const te=i(L,R);for(let ue=0;ue<te.length;ue++)w(te[ue])}}function v(S,x){for(const R in S){const w=S[R];w.build=x(S[R])}}function y(S,x){return S.build!==void 0||(S.build=x(S)),S.build}function m(S){const x={sources:{},samplers:{},channels:{}};let R=!1;for(let w=0,L=S.childNodes.length;w<L;w++){const te=S.childNodes[w];if(te.nodeType!==1)continue;let ue;switch(te.nodeName){case"source":ue=te.getAttribute("id"),x.sources[ue]=F(te);break;case"sampler":ue=te.getAttribute("id"),x.samplers[ue]=f(te);break;case"channel":ue=te.getAttribute("target"),x.channels[ue]=_(te);break;case"animation":m(te),R=!0;break;default:console.log(te)}}R===!1&&(it.animations[S.getAttribute("id")||Fs.generateUUID()]=x)}function f(S){const x={inputs:{}};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"input":const te=a(L.getAttribute("source")),ue=L.getAttribute("semantic");x.inputs[ue]=te;break}}return x}function _(S){const x={};let w=S.getAttribute("target").split("/");const L=w.shift();let te=w.shift();const ue=te.indexOf("(")!==-1,Ue=te.indexOf(".")!==-1;if(Ue)w=te.split("."),te=w.shift(),x.member=w.shift();else if(ue){const Ae=te.split("(");te=Ae.shift();for(let Pe=0;Pe<Ae.length;Pe++)Ae[Pe]=parseInt(Ae[Pe].replace(/\)/,""));x.indices=Ae}return x.id=L,x.sid=te,x.arraySyntax=ue,x.memberSyntax=Ue,x.sampler=a(S.getAttribute("source")),x}function g(S){const x=[],R=S.channels,w=S.samplers,L=S.sources;for(const te in R)if(R.hasOwnProperty(te)){const ue=R[te],Ue=w[ue.sampler],Ae=Ue.inputs.INPUT,Pe=Ue.inputs.OUTPUT,We=L[Ae],ge=L[Pe],He=P(ue,We,ge);T(He,x)}return x}function E(S){return y(it.animations[S],g)}function P(S,x,R){const w=it.nodes[S.id],L=at(w.id),te=w.transforms[S.sid],ue=w.matrix.clone().transpose();let Ue,Ae,Pe,We,ge,He;const Oe={};switch(te){case"matrix":for(Pe=0,We=x.array.length;Pe<We;Pe++)if(Ue=x.array[Pe],Ae=Pe*R.stride,Oe[Ue]===void 0&&(Oe[Ue]={}),S.arraySyntax===!0){const Bt=R.array[Ae],wt=S.indices[0]+4*S.indices[1];Oe[Ue][wt]=Bt}else for(ge=0,He=R.stride;ge<He;ge++)Oe[Ue][ge]=R.array[Ae+ge];break;case"translate":console.warn('THREE.ColladaLoader: Animation transform type "%s" not yet implemented.',te);break;case"rotate":console.warn('THREE.ColladaLoader: Animation transform type "%s" not yet implemented.',te);break;case"scale":console.warn('THREE.ColladaLoader: Animation transform type "%s" not yet implemented.',te);break}const Qe=C(Oe,ue);return{name:L.uuid,keyframes:Qe}}function C(S,x){const R=[];for(const L in S)R.push({time:parseFloat(L),value:S[L]});R.sort(w);for(let L=0;L<16;L++)H(R,L,x.elements[L]);return R;function w(L,te){return L.time-te.time}}const b=new B,U=new B,M=new _i;function T(S,x){const R=S.keyframes,w=S.name,L=[],te=[],ue=[],Ue=[];for(let Ae=0,Pe=R.length;Ae<Pe;Ae++){const We=R[Ae],ge=We.time,He=We.value;De.fromArray(He).transpose(),De.decompose(b,M,U),L.push(ge),te.push(b.x,b.y,b.z),ue.push(M.x,M.y,M.z,M.w),Ue.push(U.x,U.y,U.z)}return te.length>0&&x.push(new xo(w+".position",L,te)),ue.length>0&&x.push(new Co(w+".quaternion",L,ue)),Ue.length>0&&x.push(new xo(w+".scale",L,Ue)),x}function H(S,x,R){let w,L=!0,te,ue;for(te=0,ue=S.length;te<ue;te++)w=S[te],w.value[x]===void 0?w.value[x]=null:L=!1;if(L===!0)for(te=0,ue=S.length;te<ue;te++)w=S[te],w.value[x]=R;else V(S,x)}function V(S,x){let R,w;for(let L=0,te=S.length;L<te;L++){const ue=S[L];if(ue.value[x]===null){if(R=ie(S,L,x),w=k(S,L,x),R===null){ue.value[x]=w.value[x];continue}if(w===null){ue.value[x]=R.value[x];continue}X(ue,R,w,x)}}}function ie(S,x,R){for(;x>=0;){const w=S[x];if(w.value[R]!==null)return w;x--}return null}function k(S,x,R){for(;x<S.length;){const w=S[x];if(w.value[R]!==null)return w;x++}return null}function X(S,x,R,w){if(R.time-x.time===0){S.value[w]=x.value[w];return}S.value[w]=(S.time-x.time)*(R.value[w]-x.value[w])/(R.time-x.time)+x.value[w]}function z(S){const x={name:S.getAttribute("id")||"default",start:parseFloat(S.getAttribute("start")||0),end:parseFloat(S.getAttribute("end")||0),animations:[]};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"instance_animation":x.animations.push(a(L.getAttribute("url")));break}}it.clips[S.getAttribute("id")]=x}function ne(S){const x=[],R=S.name,w=S.end-S.start||-1,L=S.animations;for(let te=0,ue=L.length;te<ue;te++){const Ue=E(L[te]);for(let Ae=0,Pe=Ue.length;Ae<Pe;Ae++)x.push(Ue[Ae])}return new Pg(R,w,x)}function O(S){return y(it.clips[S],ne)}function G(S){const x={};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"skin":x.id=a(L.getAttribute("source")),x.skin=j(L);break;case"morph":x.id=a(L.getAttribute("source")),console.warn("THREE.ColladaLoader: Morph target animation not supported yet.");break}}it.controllers[S.getAttribute("id")]=x}function j(S){const x={sources:{}};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"bind_shape_matrix":x.bindShapeMatrix=s(L.textContent);break;case"source":const te=L.getAttribute("id");x.sources[te]=F(L);break;case"joints":x.joints=re(L);break;case"vertex_weights":x.vertexWeights=oe(L);break}}return x}function re(S){const x={inputs:{}};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"input":const te=L.getAttribute("semantic"),ue=a(L.getAttribute("source"));x.inputs[te]=ue;break}}return x}function oe(S){const x={inputs:{}};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"input":const te=L.getAttribute("semantic"),ue=a(L.getAttribute("source")),Ue=parseInt(L.getAttribute("offset"));x.inputs[te]={id:ue,offset:Ue};break;case"vcount":x.vcount=o(L.textContent);break;case"v":x.v=o(L.textContent);break}}return x}function W(S){const x={id:S.id},R=it.geometries[x.id];return S.skin!==void 0&&(x.skin=$(S.skin),R.sources.skinIndices=x.skin.indices,R.sources.skinWeights=x.skin.weights),x}function $(S){const R={joints:[],indices:{array:[],stride:4},weights:{array:[],stride:4}},w=S.sources,L=S.vertexWeights,te=L.vcount,ue=L.v,Ue=L.inputs.JOINT.offset,Ae=L.inputs.WEIGHT.offset,Pe=S.sources[S.joints.inputs.JOINT],We=S.sources[S.joints.inputs.INV_BIND_MATRIX],ge=w[L.inputs.WEIGHT.id].array;let He=0,Oe,Qe,$e;for(Oe=0,$e=te.length;Oe<$e;Oe++){const wt=te[Oe],yt=[];for(Qe=0;Qe<wt;Qe++){const xt=ue[He+Ue],Li=ue[He+Ae],Dn=ge[Li];yt.push({index:xt,weight:Dn}),He+=2}for(yt.sort(Bt),Qe=0;Qe<4;Qe++){const xt=yt[Qe];xt!==void 0?(R.indices.array.push(xt.index),R.weights.array.push(xt.weight)):(R.indices.array.push(0),R.weights.array.push(0))}}for(S.bindShapeMatrix?R.bindMatrix=new dt().fromArray(S.bindShapeMatrix).transpose():R.bindMatrix=new dt().identity(),Oe=0,$e=Pe.array.length;Oe<$e;Oe++){const wt=Pe.array[Oe],yt=new dt().fromArray(We.array,Oe*We.stride).transpose();R.joints.push({name:wt,boneInverse:yt})}return R;function Bt(wt,yt){return yt.weight-wt.weight}}function le(S){return y(it.controllers[S],W)}function ae(S){const x={init_from:i(S,"init_from")[0].textContent};it.images[S.getAttribute("id")]=x}function fe(S){return S.build!==void 0?S.build:S.init_from}function Te(S){const x=it.images[S];return x!==void 0?y(x,fe):(console.warn("THREE.ColladaLoader: Couldn't find image with ID:",S),null)}function Ve(S){const x={};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"profile_COMMON":x.profile=ke(L);break}}it.effects[S.getAttribute("id")]=x}function ke(S){const x={surfaces:{},samplers:{}};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"newparam":pt(L,x);break;case"technique":x.technique=Ge(L);break;case"extra":x.extra=A(L);break}}return x}function pt(S,x){const R=S.getAttribute("sid");for(let w=0,L=S.childNodes.length;w<L;w++){const te=S.childNodes[w];if(te.nodeType===1)switch(te.nodeName){case"surface":x.surfaces[R]=K(te);break;case"sampler2D":x.samplers[R]=_t(te);break}}}function K(S){const x={};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"init_from":x.init_from=L.textContent;break}}return x}function _t(S){const x={};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"source":x.source=L.textContent;break}}return x}function Ge(S){const x={};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"constant":case"lambert":case"blinn":case"phong":x.type=L.nodeName,x.parameters=et(L);break;case"extra":x.extra=A(L);break}}return x}function et(S){const x={};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"emission":case"diffuse":case"specular":case"bump":case"ambient":case"shininess":case"transparency":x[L.nodeName]=Ie(L);break;case"transparent":x[L.nodeName]={opaque:L.hasAttribute("opaque")?L.getAttribute("opaque"):"A_ONE",data:Ie(L)};break}}return x}function Ie(S){const x={};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"color":x[L.nodeName]=s(L.textContent);break;case"float":x[L.nodeName]=parseFloat(L.textContent);break;case"texture":x[L.nodeName]={id:L.getAttribute("texture"),extra:Mt(L)};break}}return x}function Mt(S){const x={technique:{}};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"extra":st(L,x);break}}return x}function st(S,x){for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"technique":D(L,x);break}}}function D(S,x){for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"repeatU":case"repeatV":case"offsetU":case"offsetV":x.technique[L.nodeName]=parseFloat(L.textContent);break;case"wrapU":case"wrapV":L.textContent.toUpperCase()==="TRUE"?x.technique[L.nodeName]=1:L.textContent.toUpperCase()==="FALSE"?x.technique[L.nodeName]=0:x.technique[L.nodeName]=parseInt(L.textContent);break;case"bump":x[L.nodeName]=_e(L);break}}}function A(S){const x={};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"technique":x.technique=Z(L);break}}return x}function Z(S){const x={};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"double_sided":x[L.nodeName]=parseInt(L.textContent);break;case"bump":x[L.nodeName]=_e(L);break}}return x}function _e(S){const x={};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"texture":x[L.nodeName]={id:L.getAttribute("texture"),texcoord:L.getAttribute("texcoord"),extra:Mt(L)};break}}return x}function pe(S){return S}function ve(S){return y(it.effects[S],pe)}function ze(S){const x={name:S.getAttribute("name")};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"instance_effect":x.url=a(L.getAttribute("url"));break}}it.materials[S.getAttribute("id")]=x}function we(S){let x,R=S.slice((S.lastIndexOf(".")-1>>>0)+2);switch(R=R.toLowerCase(),R){case"tga":x=cu;break;default:x=Oo}return x}function Y(S){const x=ve(S.url),R=x.profile.technique;let w;switch(R.type){case"phong":case"blinn":w=new ga;break;case"lambert":w=new KA;break;default:w=new _o;break}w.name=S.name||"";function L(Ae,Pe=null){const We=x.profile.samplers[Ae.id];let ge=null;if(We!==void 0){const He=x.profile.surfaces[We.source];ge=Te(He.init_from)}else console.warn("THREE.ColladaLoader: Undefined sampler. Access image directly (see #12530)."),ge=Te(Ae.id);if(ge!==null){const He=we(ge);if(He!==void 0){const Oe=He.load(ge),Qe=Ae.extra;if(Qe!==void 0&&Qe.technique!==void 0&&c(Qe.technique)===!1){const $e=Qe.technique;Oe.wrapS=$e.wrapU?Xr:Rn,Oe.wrapT=$e.wrapV?Xr:Rn,Oe.offset.set($e.offsetU||0,$e.offsetV||0),Oe.repeat.set($e.repeatU||1,$e.repeatV||1)}else Oe.wrapS=Xr,Oe.wrapT=Xr;return Pe!==null&&(Oe.colorSpace=Pe),Oe}else return console.warn("THREE.ColladaLoader: Loader for texture %s not found.",ge),null}else return console.warn("THREE.ColladaLoader: Couldn't create texture with ID:",Ae.id),null}const te=R.parameters;for(const Ae in te){const Pe=te[Ae];switch(Ae){case"diffuse":Pe.color&&w.color.fromArray(Pe.color),Pe.texture&&(w.map=L(Pe.texture,Xt));break;case"specular":Pe.color&&w.specular&&w.specular.fromArray(Pe.color),Pe.texture&&(w.specularMap=L(Pe.texture));break;case"bump":Pe.texture&&(w.normalMap=L(Pe.texture));break;case"ambient":Pe.texture&&(w.lightMap=L(Pe.texture,Xt));break;case"shininess":Pe.float&&w.shininess&&(w.shininess=Pe.float);break;case"emission":Pe.color&&w.emissive&&w.emissive.fromArray(Pe.color),Pe.texture&&(w.emissiveMap=L(Pe.texture,Xt));break}}w.color.convertSRGBToLinear(),w.specular&&w.specular.convertSRGBToLinear(),w.emissive&&w.emissive.convertSRGBToLinear();let ue=te.transparent,Ue=te.transparency;if(Ue===void 0&&ue&&(Ue={float:1}),ue===void 0&&Ue&&(ue={opaque:"A_ONE",data:{color:[1,1,1,1]}}),ue&&Ue)if(ue.data.texture)w.transparent=!0;else{const Ae=ue.data.color;switch(ue.opaque){case"A_ONE":w.opacity=Ae[3]*Ue.float;break;case"RGB_ZERO":w.opacity=1-Ae[0]*Ue.float;break;case"A_ZERO":w.opacity=1-Ae[3]*Ue.float;break;case"RGB_ONE":w.opacity=Ae[0]*Ue.float;break;default:console.warn('THREE.ColladaLoader: Invalid opaque type "%s" of transparent tag.',ue.opaque)}w.opacity<1&&(w.transparent=!0)}if(R.extra!==void 0&&R.extra.technique!==void 0){const Ae=R.extra.technique;for(const Pe in Ae){const We=Ae[Pe];switch(Pe){case"double_sided":w.side=We===1?di:Zi;break;case"bump":w.normalMap=L(We.texture),w.normalScale=new Ke(1,1);break}}}return w}function de(S){return y(it.materials[S],Y)}function Se(S){const x={name:S.getAttribute("name")};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"optics":x.optics=J(L);break}}it.cameras[S.getAttribute("id")]=x}function J(S){for(let x=0;x<S.childNodes.length;x++){const R=S.childNodes[x];switch(R.nodeName){case"technique_common":return Ce(R)}}return{}}function Ce(S){const x={};for(let R=0;R<S.childNodes.length;R++){const w=S.childNodes[R];switch(w.nodeName){case"perspective":case"orthographic":x.technique=w.nodeName,x.parameters=I(w);break}}return x}function I(S){const x={};for(let R=0;R<S.childNodes.length;R++){const w=S.childNodes[R];switch(w.nodeName){case"xfov":case"yfov":case"xmag":case"ymag":case"znear":case"zfar":case"aspect_ratio":x[w.nodeName]=parseFloat(w.textContent);break}}return x}function ce(S){let x;switch(S.optics.technique){case"perspective":x=new yn(S.optics.parameters.yfov,S.optics.parameters.aspect_ratio,S.optics.parameters.znear,S.optics.parameters.zfar);break;case"orthographic":let R=S.optics.parameters.ymag,w=S.optics.parameters.xmag;const L=S.optics.parameters.aspect_ratio;w=w===void 0?R*L:w,R=R===void 0?w/L:R,w*=.5,R*=.5,x=new Th(-w,w,R,-R,S.optics.parameters.znear,S.optics.parameters.zfar);break;default:x=new yn;break}return x.name=S.name||"",x}function me(S){const x=it.cameras[S];return x!==void 0?y(x,ce):(console.warn("THREE.ColladaLoader: Couldn't find camera with ID:",S),null)}function he(S){let x={};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"technique_common":x=be(L);break}}it.lights[S.getAttribute("id")]=x}function be(S){const x={};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"directional":case"point":case"spot":case"ambient":x.technique=L.nodeName,x.parameters=tt(L)}}return x}function tt(S){const x={};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"color":const te=s(L.textContent);x.color=new ot().fromArray(te).convertSRGBToLinear();break;case"falloff_angle":x.falloffAngle=parseFloat(L.textContent);break;case"quadratic_attenuation":const ue=parseFloat(L.textContent);x.distance=ue?Math.sqrt(1/ue):0;break}}return x}function Ze(S){let x;switch(S.technique){case"directional":x=new Wv;break;case"point":x=new db;break;case"spot":x=new ub;break;case"ambient":x=new pb;break}return S.parameters.color&&x.color.copy(S.parameters.color),S.parameters.distance&&(x.distance=S.parameters.distance),x}function je(S){const x=it.lights[S];return x!==void 0?y(x,Ze):(console.warn("THREE.ColladaLoader: Couldn't find light with ID:",S),null)}function ye(S){const x={name:S.getAttribute("name"),sources:{},vertices:{},primitives:[]},R=i(S,"mesh")[0];if(R!==void 0){for(let w=0;w<R.childNodes.length;w++){const L=R.childNodes[w];if(L.nodeType!==1)continue;const te=L.getAttribute("id");switch(L.nodeName){case"source":x.sources[te]=F(L);break;case"vertices":x.vertices=Me(L);break;case"polygons":console.warn("THREE.ColladaLoader: Unsupported primitive type: ",L.nodeName);break;case"lines":case"linestrips":case"polylist":case"triangles":x.primitives.push(Ee(L));break;default:console.log(L)}}it.geometries[S.getAttribute("id")]=x}}function F(S){const x={array:[],stride:3};for(let R=0;R<S.childNodes.length;R++){const w=S.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"float_array":x.array=s(w.textContent);break;case"Name_array":x.array=r(w.textContent);break;case"technique_common":const L=i(w,"accessor")[0];L!==void 0&&(x.stride=parseInt(L.getAttribute("stride")));break}}return x}function Me(S){const x={};for(let R=0;R<S.childNodes.length;R++){const w=S.childNodes[R];w.nodeType===1&&(x[w.getAttribute("semantic")]=a(w.getAttribute("source")))}return x}function Ee(S){const x={type:S.nodeName,material:S.getAttribute("material"),count:parseInt(S.getAttribute("count")),inputs:{},stride:0,hasUV:!1};for(let R=0,w=S.childNodes.length;R<w;R++){const L=S.childNodes[R];if(L.nodeType===1)switch(L.nodeName){case"input":const te=a(L.getAttribute("source")),ue=L.getAttribute("semantic"),Ue=parseInt(L.getAttribute("offset")),Ae=parseInt(L.getAttribute("set")),Pe=Ae>0?ue+Ae:ue;x.inputs[Pe]={id:te,offset:Ue},x.stride=Math.max(x.stride,Ue+1),ue==="TEXCOORD"&&(x.hasUV=!0);break;case"vcount":x.vcount=o(L.textContent);break;case"p":x.p=o(L.textContent);break}}return x}function qe(S){const x={};for(let R=0;R<S.length;R++){const w=S[R];x[w.type]===void 0&&(x[w.type]=[]),x[w.type].push(w)}return x}function Be(S){let x=0;for(let R=0,w=S.length;R<w;R++)S[R].hasUV===!0&&x++;x>0&&x<S.length&&(S.uvsNeedsFix=!0)}function Xe(S){const x={},R=S.sources,w=S.vertices,L=S.primitives;if(L.length===0)return{};const te=qe(L);for(const ue in te){const Ue=te[ue];Be(Ue),x[ue]=Je(Ue,R,w)}return x}function Je(S,x,R){const w={},L={array:[],stride:0},te={array:[],stride:0},ue={array:[],stride:0},Ue={array:[],stride:0},Ae={array:[],stride:0},Pe={array:[],stride:4},We={array:[],stride:4},ge=new Kt,He=[];let Oe=0;for(let Qe=0;Qe<S.length;Qe++){const $e=S[Qe],Bt=$e.inputs;let wt=0;switch($e.type){case"lines":case"linestrips":wt=$e.count*2;break;case"triangles":wt=$e.count*3;break;case"polylist":for(let yt=0;yt<$e.count;yt++){const xt=$e.vcount[yt];switch(xt){case 3:wt+=3;break;case 4:wt+=6;break;default:wt+=(xt-2)*3;break}}break;default:console.warn("THREE.ColladaLoader: Unknow primitive type:",$e.type)}ge.addGroup(Oe,wt,Qe),Oe+=wt,$e.material&&He.push($e.material);for(const yt in Bt){const xt=Bt[yt];switch(yt){case"VERTEX":for(const Li in R){const Dn=R[Li];switch(Li){case"POSITION":const fs=L.array.length;if(ut($e,x[Dn],xt.offset,L.array),L.stride=x[Dn].stride,x.skinWeights&&x.skinIndices&&(ut($e,x.skinIndices,xt.offset,Pe.array),ut($e,x.skinWeights,xt.offset,We.array)),$e.hasUV===!1&&S.uvsNeedsFix===!0){const $v=(L.array.length-fs)/L.stride;for(let Uh=0;Uh<$v;Uh++)ue.array.push(0,0)}break;case"NORMAL":ut($e,x[Dn],xt.offset,te.array),te.stride=x[Dn].stride;break;case"COLOR":ut($e,x[Dn],xt.offset,Ae.array),Ae.stride=x[Dn].stride;break;case"TEXCOORD":ut($e,x[Dn],xt.offset,ue.array),ue.stride=x[Dn].stride;break;case"TEXCOORD1":ut($e,x[Dn],xt.offset,Ue.array),ue.stride=x[Dn].stride;break;default:console.warn('THREE.ColladaLoader: Semantic "%s" not handled in geometry build process.',Li)}}break;case"NORMAL":ut($e,x[xt.id],xt.offset,te.array),te.stride=x[xt.id].stride;break;case"COLOR":ut($e,x[xt.id],xt.offset,Ae.array,!0),Ae.stride=x[xt.id].stride;break;case"TEXCOORD":ut($e,x[xt.id],xt.offset,ue.array),ue.stride=x[xt.id].stride;break;case"TEXCOORD1":ut($e,x[xt.id],xt.offset,Ue.array),Ue.stride=x[xt.id].stride;break}}}return L.array.length>0&&ge.setAttribute("position",new St(L.array,L.stride)),te.array.length>0&&ge.setAttribute("normal",new St(te.array,te.stride)),Ae.array.length>0&&ge.setAttribute("color",new St(Ae.array,Ae.stride)),ue.array.length>0&&ge.setAttribute("uv",new St(ue.array,ue.stride)),Ue.array.length>0&&ge.setAttribute("uv1",new St(Ue.array,Ue.stride)),Pe.array.length>0&&ge.setAttribute("skinIndex",new St(Pe.array,Pe.stride)),We.array.length>0&&ge.setAttribute("skinWeight",new St(We.array,We.stride)),w.data=ge,w.type=S[0].type,w.materialKeys=He,w}function ut(S,x,R,w,L=!1){const te=S.p,ue=S.stride,Ue=S.vcount;function Ae(ge){let He=te[ge+R]*We;const Oe=He+We;for(;He<Oe;He++)w.push(Pe[He]);if(L){const Qe=w.length-We-1;Wa.setRGB(w[Qe+0],w[Qe+1],w[Qe+2]).convertSRGBToLinear(),w[Qe+0]=Wa.r,w[Qe+1]=Wa.g,w[Qe+2]=Wa.b}}const Pe=x.array,We=x.stride;if(S.vcount!==void 0){let ge=0;for(let He=0,Oe=Ue.length;He<Oe;He++){const Qe=Ue[He];if(Qe===4){const $e=ge+ue*0,Bt=ge+ue*1,wt=ge+ue*2,yt=ge+ue*3;Ae($e),Ae(Bt),Ae(yt),Ae(Bt),Ae(wt),Ae(yt)}else if(Qe===3){const $e=ge+ue*0,Bt=ge+ue*1,wt=ge+ue*2;Ae($e),Ae(Bt),Ae(wt)}else if(Qe>4)for(let $e=1,Bt=Qe-2;$e<=Bt;$e++){const wt=ge+ue*0,yt=ge+ue*$e,xt=ge+ue*($e+1);Ae(wt),Ae(yt),Ae(xt)}ge+=ue*Qe}}else for(let ge=0,He=te.length;ge<He;ge+=ue)Ae(ge)}function Ct(S){return y(it.geometries[S],Xe)}function Et(S){const x={name:S.getAttribute("name")||"",joints:{},links:[]};for(let R=0;R<S.childNodes.length;R++){const w=S.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"technique_common":er(w,x);break}}it.kinematicsModels[S.getAttribute("id")]=x}function Zt(S){return S.build!==void 0?S.build:S}function Nn(S){return y(it.kinematicsModels[S],Zt)}function er(S,x){for(let R=0;R<S.childNodes.length;R++){const w=S.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"joint":x.joints[w.getAttribute("sid")]=tr(w);break;case"link":x.links.push(Po(w));break}}}function tr(S){let x;for(let R=0;R<S.childNodes.length;R++){const w=S.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"prismatic":case"revolute":x=Ri(w);break}}return x}function Ri(S){const x={sid:S.getAttribute("sid"),name:S.getAttribute("name")||"",axis:new B,limits:{min:0,max:0},type:S.nodeName,static:!1,zeroPosition:0,middlePosition:0};for(let R=0;R<S.childNodes.length;R++){const w=S.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"axis":const L=s(w.textContent);x.axis.fromArray(L);break;case"limits":const te=w.getElementsByTagName("max")[0],ue=w.getElementsByTagName("min")[0];x.limits.max=parseFloat(te.textContent),x.limits.min=parseFloat(ue.textContent);break}}return x.limits.min>=x.limits.max&&(x.static=!0),x.middlePosition=(x.limits.min+x.limits.max)/2,x}function Po(S){const x={sid:S.getAttribute("sid"),name:S.getAttribute("name")||"",attachments:[],transforms:[]};for(let R=0;R<S.childNodes.length;R++){const w=S.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"attachment_full":x.attachments.push(us(w));break;case"matrix":case"translate":case"rotate":x.transforms.push(No(w));break}}return x}function us(S){const x={joint:S.getAttribute("joint").split("/").pop(),transforms:[],links:[]};for(let R=0;R<S.childNodes.length;R++){const w=S.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"link":x.links.push(Po(w));break;case"matrix":case"translate":case"rotate":x.transforms.push(No(w));break}}return x}function No(S){const x={type:S.nodeName},R=s(S.textContent);switch(x.type){case"matrix":x.obj=new dt,x.obj.fromArray(R).transpose();break;case"translate":x.obj=new B,x.obj.fromArray(R);break;case"rotate":x.obj=new B,x.obj.fromArray(R),x.angle=Fs.degToRad(R[3]);break}return x}function Va(S){const x={name:S.getAttribute("name")||"",rigidBodies:{}};for(let R=0;R<S.childNodes.length;R++){const w=S.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"rigid_body":x.rigidBodies[w.getAttribute("name")]={},ou(w,x.rigidBodies[w.getAttribute("name")]);break}}it.physicsModels[S.getAttribute("id")]=x}function ou(S,x){for(let R=0;R<S.childNodes.length;R++){const w=S.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"technique_common":au(w,x);break}}}function au(S,x){for(let R=0;R<S.childNodes.length;R++){const w=S.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"inertia":x.inertia=s(w.textContent);break;case"mass":x.mass=s(w.textContent)[0];break}}}function lu(S){const x={bindJointAxis:[]};for(let R=0;R<S.childNodes.length;R++){const w=S.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"bind_joint_axis":x.bindJointAxis.push(N(w));break}}it.kinematicsScenes[a(S.getAttribute("url"))]=x}function N(S){const x={target:S.getAttribute("target").split("/").pop()};for(let R=0;R<S.childNodes.length;R++){const w=S.childNodes[R];if(w.nodeType===1)switch(w.nodeName){case"axis":const L=w.getElementsByTagName("param")[0];x.axis=L.textContent;const te=x.axis.split("inst_").pop().split("axis")[0];x.jointIndex=te.substring(0,te.length-1);break}}return x}function q(S){return S.build!==void 0?S.build:S}function ee(S){return y(it.kinematicsScenes[S],q)}function se(){const S=Object.keys(it.kinematicsModels)[0],x=Object.keys(it.kinematicsScenes)[0],R=Object.keys(it.visualScenes)[0];if(S===void 0||x===void 0)return;const w=Nn(S),L=ee(x),te=Io(R),ue=L.bindJointAxis,Ue={};for(let We=0,ge=ue.length;We<ge;We++){const He=ue[We],Oe=zt.querySelector('[sid="'+He.target+'"]');if(Oe){const Qe=Oe.parentElement;Ae(He.jointIndex,Qe)}}function Ae(We,ge){const He=ge.getAttribute("name"),Oe=w.joints[We];te.traverse(function(Qe){Qe.name===He&&(Ue[We]={object:Qe,transforms:Q(ge),joint:Oe,position:Oe.zeroPosition})})}const Pe=new dt;Ih={joints:w&&w.joints,getJointValue:function(We){const ge=Ue[We];if(ge)return ge.position;console.warn("THREE.ColladaLoader: Joint "+We+" doesn't exist.")},setJointValue:function(We,ge){const He=Ue[We];if(He){const Oe=He.joint;if(ge>Oe.limits.max||ge<Oe.limits.min)console.warn("THREE.ColladaLoader: Joint "+We+" value "+ge+" outside of limits (min: "+Oe.limits.min+", max: "+Oe.limits.max+").");else if(Oe.static)console.warn("THREE.ColladaLoader: Joint "+We+" is static.");else{const Qe=He.object,$e=Oe.axis,Bt=He.transforms;De.identity();for(let wt=0;wt<Bt.length;wt++){const yt=Bt[wt];if(yt.sid&&yt.sid.indexOf(We)!==-1)switch(Oe.type){case"revolute":De.multiply(Pe.makeRotationAxis($e,Fs.degToRad(ge)));break;case"prismatic":De.multiply(Pe.makeTranslation($e.x*ge,$e.y*ge,$e.z*ge));break;default:console.warn("THREE.ColladaLoader: Unknown joint type: "+Oe.type);break}else switch(yt.type){case"matrix":De.multiply(yt.obj);break;case"translate":De.multiply(Pe.makeTranslation(yt.obj.x,yt.obj.y,yt.obj.z));break;case"scale":De.scale(yt.obj);break;case"rotate":De.multiply(Pe.makeRotationAxis(yt.obj,yt.angle));break}}Qe.matrix.copy(De),Qe.matrix.decompose(Qe.position,Qe.quaternion,Qe.scale),Ue[We].position=ge}}else console.log("THREE.ColladaLoader: "+We+" does not exist.")}}}function Q(S){const x=[],R=zt.querySelector('[id="'+S.id+'"]');for(let w=0;w<R.childNodes.length;w++){const L=R.childNodes[w];if(L.nodeType!==1)continue;let te,ue;switch(L.nodeName){case"matrix":te=s(L.textContent);const Ue=new dt().fromArray(te).transpose();x.push({sid:L.getAttribute("sid"),type:L.nodeName,obj:Ue});break;case"translate":case"scale":te=s(L.textContent),ue=new B().fromArray(te),x.push({sid:L.getAttribute("sid"),type:L.nodeName,obj:ue});break;case"rotate":te=s(L.textContent),ue=new B().fromArray(te);const Ae=Fs.degToRad(te[3]);x.push({sid:L.getAttribute("sid"),type:L.nodeName,obj:ue,angle:Ae});break}}return x}function Ne(S){const x=S.getElementsByTagName("node");for(let R=0;R<x.length;R++){const w=x[R];w.hasAttribute("id")===!1&&w.setAttribute("id",l())}}const De=new dt,Ye=new B;function nt(S){const x={name:S.getAttribute("name")||"",type:S.getAttribute("type"),id:S.getAttribute("id"),sid:S.getAttribute("sid"),matrix:new dt,nodes:[],instanceCameras:[],instanceControllers:[],instanceLights:[],instanceGeometries:[],instanceNodes:[],transforms:{}};for(let R=0;R<S.childNodes.length;R++){const w=S.childNodes[R];if(w.nodeType!==1)continue;let L;switch(w.nodeName){case"node":x.nodes.push(w.getAttribute("id")),nt(w);break;case"instance_camera":x.instanceCameras.push(a(w.getAttribute("url")));break;case"instance_controller":x.instanceControllers.push(ft(w));break;case"instance_light":x.instanceLights.push(a(w.getAttribute("url")));break;case"instance_geometry":x.instanceGeometries.push(ft(w));break;case"instance_node":x.instanceNodes.push(a(w.getAttribute("url")));break;case"matrix":L=s(w.textContent),x.matrix.multiply(De.fromArray(L).transpose()),x.transforms[w.getAttribute("sid")]=w.nodeName;break;case"translate":L=s(w.textContent),Ye.fromArray(L),x.matrix.multiply(De.makeTranslation(Ye.x,Ye.y,Ye.z)),x.transforms[w.getAttribute("sid")]=w.nodeName;break;case"rotate":L=s(w.textContent);const te=Fs.degToRad(L[3]);x.matrix.multiply(De.makeRotationAxis(Ye.fromArray(L),te)),x.transforms[w.getAttribute("sid")]=w.nodeName;break;case"scale":L=s(w.textContent),x.matrix.scale(Ye.fromArray(L)),x.transforms[w.getAttribute("sid")]=w.nodeName;break;case"extra":break;default:console.log(w)}}return Lt(x.id)?console.warn("THREE.ColladaLoader: There is already a node with ID %s. Exclude current node from further processing.",x.id):it.nodes[x.id]=x,x}function ft(S){const x={id:a(S.getAttribute("url")),materials:{},skeletons:[]};for(let R=0;R<S.childNodes.length;R++){const w=S.childNodes[R];switch(w.nodeName){case"bind_material":const L=w.getElementsByTagName("instance_material");for(let te=0;te<L.length;te++){const ue=L[te],Ue=ue.getAttribute("symbol"),Ae=ue.getAttribute("target");x.materials[Ue]=a(Ae)}break;case"skeleton":x.skeletons.push(a(w.textContent));break}}return x}function lt(S,x){const R=[],w=[];let L,te,ue;for(L=0;L<S.length;L++){const Pe=S[L];let We;if(Lt(Pe))We=at(Pe),ct(We,x,R);else if(Ci(Pe)){const He=it.visualScenes[Pe].children;for(let Oe=0;Oe<He.length;Oe++){const Qe=He[Oe];if(Qe.type==="JOINT"){const $e=at(Qe.id);ct($e,x,R)}}}else console.error("THREE.ColladaLoader: Unable to find root bone of skeleton with ID:",Pe)}for(L=0;L<x.length;L++)for(te=0;te<R.length;te++)if(ue=R[te],ue.bone.name===x[L].name){w[L]=ue,ue.processed=!0;break}for(L=0;L<R.length;L++)ue=R[L],ue.processed===!1&&(w.push(ue),ue.processed=!0);const Ue=[],Ae=[];for(L=0;L<w.length;L++)ue=w[L],Ue.push(ue.bone),Ae.push(ue.boneInverse);return new bh(Ue,Ae)}function ct(S,x,R){S.traverse(function(w){if(w.isBone===!0){let L;for(let te=0;te<x.length;te++){const ue=x[te];if(ue.name===w.name){L=ue.boneInverse;break}}L===void 0&&(L=new dt),R.push({bone:w,boneInverse:L,processed:!1})}})}function kt(S){const x=[],R=S.matrix,w=S.nodes,L=S.type,te=S.instanceCameras,ue=S.instanceControllers,Ue=S.instanceLights,Ae=S.instanceGeometries,Pe=S.instanceNodes;for(let ge=0,He=w.length;ge<He;ge++)x.push(at(w[ge]));for(let ge=0,He=te.length;ge<He;ge++){const Oe=me(te[ge]);Oe!==null&&x.push(Oe.clone())}for(let ge=0,He=ue.length;ge<He;ge++){const Oe=ue[ge],Qe=le(Oe.id),$e=Ct(Qe.id),Bt=Yn($e,Oe.materials),wt=Oe.skeletons,yt=Qe.skin.joints,xt=lt(wt,yt);for(let Li=0,Dn=Bt.length;Li<Dn;Li++){const fs=Bt[Li];fs.isSkinnedMesh&&(fs.bind(xt,Qe.skin.bindMatrix),fs.normalizeSkinWeights()),x.push(fs)}}for(let ge=0,He=Ue.length;ge<He;ge++){const Oe=je(Ue[ge]);Oe!==null&&x.push(Oe.clone())}for(let ge=0,He=Ae.length;ge<He;ge++){const Oe=Ae[ge],Qe=Ct(Oe.id),$e=Yn(Qe,Oe.materials);for(let Bt=0,wt=$e.length;Bt<wt;Bt++)x.push($e[Bt])}for(let ge=0,He=Pe.length;ge<He;ge++)x.push(at(Pe[ge]).clone());let We;if(w.length===0&&x.length===1)We=x[0];else{We=L==="JOINT"?new Fv:new Xi;for(let ge=0;ge<x.length;ge++)We.add(x[ge])}return We.name=L==="JOINT"?S.sid:S.name,We.matrix.copy(R),We.matrix.decompose(We.position,We.quaternion,We.scale),We}const En=new _o({name:Rr.DEFAULT_MATERIAL_NAME,color:16711935});function qt(S,x){const R=[];for(let w=0,L=S.length;w<L;w++){const te=x[S[w]];te===void 0?(console.warn("THREE.ColladaLoader: Material with key %s not found. Apply fallback material.",S[w]),R.push(En)):R.push(de(te))}return R}function Yn(S,x){const R=[];for(const w in S){const L=S[w],te=qt(L.materialKeys,x);if(te.length===0&&(w==="lines"||w==="linestrips"?te.push(new yo):te.push(new ga)),w==="lines"||w==="linestrips")for(let Pe=0,We=te.length;Pe<We;Pe++){const ge=te[Pe];if(ge.isMeshPhongMaterial===!0||ge.isMeshLambertMaterial===!0){const He=new yo;He.color.copy(ge.color),He.opacity=ge.opacity,He.transparent=ge.transparent,te[Pe]=He}}const ue=L.data.attributes.skinIndex!==void 0,Ue=te.length===1?te[0]:te;let Ae;switch(w){case"lines":Ae=new Ch(L.data,Ue);break;case"linestrips":Ae=new Rh(L.data,Ue);break;case"triangles":case"polylist":ue?Ae=new jA(L.data,Ue):Ae=new Qt(L.data,Ue);break}R.push(Ae)}return R}function Lt(S){return it.nodes[S]!==void 0}function at(S){return y(it.nodes[S],kt)}function Do(S){const x={name:S.getAttribute("name"),children:[]};Ne(S);const R=i(S,"node");for(let w=0;w<R.length;w++)x.children.push(nt(R[w]));it.visualScenes[S.getAttribute("id")]=x}function Nt(S){const x=new Xi;x.name=S.name;const R=S.children;for(let w=0;w<R.length;w++){const L=R[w];x.add(at(L.id))}return x}function Ci(S){return it.visualScenes[S]!==void 0}function Io(S){return y(it.visualScenes[S],Nt)}function Nr(S){const x=i(S,"instance_visual_scene")[0];return Io(a(x.getAttribute("url")))}function Uo(){const S=it.clips;if(c(S)===!0){if(c(it.animations)===!1){const x=[];for(const R in it.animations){const w=E(R);for(let L=0,te=w.length;L<te;L++)x.push(w[L])}Xa.push(new Pg("default",-1,x))}}else for(const x in S)Xa.push(O(x))}function rn(S){let x="";const R=[S];for(;R.length;){const w=R.shift();w.nodeType===Node.TEXT_NODE?x+=w.textContent:(x+=`
`,R.push.apply(R,w.childNodes))}return x.trim()}if(e.length===0)return{scene:new Dv};const vi=new DOMParser().parseFromString(e,"application/xml"),zt=i(vi,"COLLADA")[0],dn=vi.getElementsByTagName("parsererror")[0];if(dn!==void 0){const S=i(dn,"div")[0];let x;return S?x=S.textContent:x=rn(dn),console.error(`THREE.ColladaLoader: Failed to parse collada file.
`,x),null}const Fo=zt.getAttribute("version");console.debug("THREE.ColladaLoader: File version",Fo);const Ga=u(i(zt,"asset")[0]),Oo=new Gv(this.manager);Oo.setPath(this.resourcePath||n).setCrossOrigin(this.crossOrigin);let cu;Bg&&(cu=new Bg(this.manager),cu.setPath(this.resourcePath||n));const Wa=new ot,Xa=[];let Ih={},Yv=0;const it={animations:{},clips:{},controllers:{},images:{},effects:{},materials:{},cameras:{},lights:{},geometries:{},nodes:{},visualScenes:{},kinematicsModels:{},physicsModels:{},kinematicsScenes:{}};p(zt,"library_animations","animation",m),p(zt,"library_animation_clips","animation_clip",z),p(zt,"library_controllers","controller",G),p(zt,"library_images","image",ae),p(zt,"library_effects","effect",Ve),p(zt,"library_materials","material",ze),p(zt,"library_cameras","camera",Se),p(zt,"library_lights","light",he),p(zt,"library_geometries","geometry",ye),p(zt,"library_nodes","node",nt),p(zt,"library_visual_scenes","visual_scene",Do),p(zt,"library_kinematics_models","kinematics_model",Et),p(zt,"library_physics_models","physics_model",Va),p(zt,"scene","instance_kinematics_scene",lu),v(it.animations,g),v(it.clips,ne),v(it.controllers,W),v(it.images,fe),v(it.effects,pe),v(it.materials,Y),v(it.cameras,ce),v(it.lights,Ze),v(it.geometries,Xe),v(it.visualScenes,Nt),Uo(),se();const ja=Nr(i(zt,"scene")[0]);return ja.animations=Xa,Ga.upAxis==="Z_UP"&&(console.warn("THREE.ColladaLoader: You are loading an asset with a Z-UP coordinate system. The loader just rotates the asset to transform it into Y-UP. The vertex data are not converted, see #24289."),ja.rotation.set(-Math.PI/2,0,0)),ja.scale.multiplyScalar(Ga.unit),{get animations(){return console.warn("THREE.ColladaLoader: Please access animations over scene.animations now."),Xa},kinematics:Ih,library:it,scene:ja}}}const Hg=new B;class su extends Ot{constructor(...e){super(...e),this.urdfNode=null,this.urdfName=""}copy(e,n){return super.copy(e,n),this.urdfNode=e.urdfNode,this.urdfName=e.urdfName,this}}class Mb extends su{constructor(...e){super(...e),this.isURDFCollider=!0,this.type="URDFCollider"}}class Eb extends su{constructor(...e){super(...e),this.isURDFVisual=!0,this.type="URDFVisual"}}class jv extends su{constructor(...e){super(...e),this.isURDFLink=!0,this.type="URDFLink"}}class qv extends su{get jointType(){return this._jointType}set jointType(e){if(this.jointType!==e)switch(this._jointType=e,this.matrixWorldNeedsUpdate=!0,e){case"fixed":this.jointValue=[];break;case"continuous":case"revolute":case"prismatic":this.jointValue=new Array(1).fill(0);break;case"planar":this.jointValue=new Array(2).fill(0);break;case"floating":this.jointValue=new Array(6).fill(0);break}}get angle(){return this.jointValue[0]}constructor(...e){super(...e),this.isURDFJoint=!0,this.type="URDFJoint",this.jointValue=null,this.jointType="fixed",this.axis=new B(1,0,0),this.limit={lower:0,upper:0},this.ignoreLimits=!1,this.origPosition=null,this.origQuaternion=null,this.mimicJoints=[]}copy(e,n){return super.copy(e,n),this.jointType=e.jointType,this.axis=e.axis.clone(),this.limit.lower=e.limit.lower,this.limit.upper=e.limit.upper,this.ignoreLimits=!1,this.jointValue=[...e.jointValue],this.origPosition=e.origPosition?e.origPosition.clone():null,this.origQuaternion=e.origQuaternion?e.origQuaternion.clone():null,this.mimicJoints=[...e.mimicJoints],this}setJointValue(...e){e=e.map(i=>parseFloat(i)),(!this.origPosition||!this.origQuaternion)&&(this.origPosition=this.position.clone(),this.origQuaternion=this.quaternion.clone());let n=!1;switch(this.mimicJoints.forEach(i=>{n=i.updateFromMimickedJoint(...e)||n}),this.jointType){case"fixed":return n;case"continuous":case"revolute":{let i=e[0];return i==null||i===this.jointValue[0]?n:(!this.ignoreLimits&&this.jointType==="revolute"&&(i=Math.min(this.limit.upper,i),i=Math.max(this.limit.lower,i)),this.quaternion.setFromAxisAngle(this.axis,i).premultiply(this.origQuaternion),this.jointValue[0]!==i?(this.jointValue[0]=i,this.matrixWorldNeedsUpdate=!0,!0):n)}case"prismatic":{let i=e[0];return i==null||i===this.jointValue[0]?n:(this.ignoreLimits||(i=Math.min(this.limit.upper,i),i=Math.max(this.limit.lower,i)),this.position.copy(this.origPosition),Hg.copy(this.axis).applyEuler(this.rotation),this.position.addScaledVector(Hg,i),this.jointValue[0]!==i?(this.jointValue[0]=i,this.matrixWorldNeedsUpdate=!0,!0):n)}case"floating":case"planar":console.warn(`'${this.jointType}' joint not yet supported`)}return n}}class Vg extends qv{constructor(...e){super(...e),this.type="URDFMimicJoint",this.mimicJoint=null,this.offset=0,this.multiplier=1}updateFromMimickedJoint(...e){const n=e.map(i=>i*this.multiplier+this.offset);return super.setJointValue(...n)}copy(e,n){return super.copy(e,n),this.mimicJoint=e.mimicJoint,this.offset=e.offset,this.multiplier=e.multiplier,this}}class wb extends jv{constructor(...e){super(...e),this.isURDFRobot=!0,this.urdfNode=null,this.urdfRobotNode=null,this.robotName=null,this.links=null,this.joints=null,this.colliders=null,this.visual=null,this.frames=null}copy(e,n){return super.copy(e,n),this.urdfRobotNode=e.urdfRobotNode,this.robotName=e.robotName,this.links={},this.joints={},this.colliders={},this.visual={},this.traverse(i=>{i.isURDFJoint&&i.urdfName in e.joints&&(this.joints[i.urdfName]=i),i.isURDFLink&&i.urdfName in e.links&&(this.links[i.urdfName]=i),i.isURDFCollider&&i.urdfName in e.colliders&&(this.colliders[i.urdfName]=i),i.isURDFVisual&&i.urdfName in e.visual&&(this.visual[i.urdfName]=i)}),this.frames={...this.colliders,...this.visual,...this.links,...this.joints},this}getFrame(e){return this.frames[e]}setJointValue(e,...n){const i=this.joints[e];return i?i.setJointValue(...n):!1}setJointValues(e){let n=!1;for(const i in e){const r=e[i];Array.isArray(r)?n=this.setJointValue(i,...r)||n:n=this.setJointValue(i,r)||n}return n}}const xf=new _i,Gg=new Ao;function Us(t){return t?t.trim().split(/\s+/g).map(e=>parseFloat(e)):[0,0,0]}function Wg(t,e,n=!1){n||t.rotation.set(0,0,0),Gg.set(e[0],e[1],e[2],"ZYX"),xf.setFromEuler(Gg),xf.multiply(t.quaternion),t.quaternion.copy(xf)}class Tb{constructor(e){this.manager=e||Vv,this.loadMeshCb=this.defaultMeshLoader.bind(this),this.parseVisual=!0,this.parseCollision=!1,this.packages="",this.workingPath="",this.fetchOptions={}}loadAsync(e){return new Promise((n,i)=>{this.load(e,n,null,i)})}load(e,n,i,r){const s=this.manager,o=Xv.extractUrlBase(e),a=this.manager.resolveURL(e);s.itemStart(a),fetch(a,this.fetchOptions).then(l=>{if(l.ok)return i&&i(null),l.text();throw new Error(`URDFLoader: Failed to load url '${a}' with error code ${l.status} : ${l.statusText}.`)}).then(l=>{this.workingPath===""&&(this.workingPath=o);const c=this.parse(l);n(c),s.itemEnd(a)}).catch(l=>{r?r(l):console.error("URDFLoader: Error loading file.",l),s.itemError(a),s.itemEnd(a)})}parse(e){const n=this.packages,i=this.loadMeshCb,r=this.parseVisual,s=this.parseCollision,o=this.workingPath,a=this.manager,l={},c={},u={};function h(_){if(!/^package:\/\//.test(_))return o?o+_:_;const[g,E]=_.replace(/^package:\/\//,"").split(/\/(.+)/);if(typeof n=="string")return n.endsWith(g)?n+"/"+E:n+"/"+g+"/"+E;if(n instanceof Function)return n(g)+"/"+E;if(typeof n=="object")return g in n?n[g]+"/"+E:(console.error(`URDFLoader : ${g} not found in provided package list.`),null)}function d(_){let g;_ instanceof Document?g=[..._.children]:_ instanceof Element?g=[_]:g=[...new DOMParser().parseFromString(_,"text/xml").children];const E=g.filter(P=>P.nodeName==="robot").pop();return p(E)}function p(_){const g=[..._.children],E=g.filter(H=>H.nodeName.toLowerCase()==="link"),P=g.filter(H=>H.nodeName.toLowerCase()==="joint"),C=g.filter(H=>H.nodeName.toLowerCase()==="material"),b=new wb;b.robotName=_.getAttribute("name"),b.urdfRobotNode=_,C.forEach(H=>{const V=H.getAttribute("name");u[V]=m(H)});const U={},M={};E.forEach(H=>{const V=H.getAttribute("name"),ie=_.querySelector(`child[link="${V}"]`)===null;l[V]=y(H,U,M,ie?b:null)}),P.forEach(H=>{const V=H.getAttribute("name");c[V]=v(H)}),b.joints=c,b.links=l,b.colliders=M,b.visual=U;const T=Object.values(c);return T.forEach(H=>{H instanceof Vg&&c[H.mimicJoint].mimicJoints.push(H)}),T.forEach(H=>{const V=new Set,ie=k=>{if(V.has(k))throw new Error("URDFLoader: Detected an infinite loop of mimic joints.");V.add(k),k.mimicJoints.forEach(X=>{ie(X)})};ie(H)}),b.frames={...M,...U,...l,...c},b}function v(_){const g=[..._.children],E=_.getAttribute("type");let P;const C=g.find(V=>V.nodeName.toLowerCase()==="mimic");C?(P=new Vg,P.mimicJoint=C.getAttribute("joint"),P.multiplier=parseFloat(C.getAttribute("multiplier")||1),P.offset=parseFloat(C.getAttribute("offset")||0)):P=new qv,P.urdfNode=_,P.name=_.getAttribute("name"),P.urdfName=P.name,P.jointType=E;let b=null,U=null,M=[0,0,0],T=[0,0,0];g.forEach(V=>{const ie=V.nodeName.toLowerCase();ie==="origin"?(M=Us(V.getAttribute("xyz")),T=Us(V.getAttribute("rpy"))):ie==="child"?U=l[V.getAttribute("link")]:ie==="parent"?b=l[V.getAttribute("link")]:ie==="limit"&&(P.limit.lower=parseFloat(V.getAttribute("lower")||P.limit.lower),P.limit.upper=parseFloat(V.getAttribute("upper")||P.limit.upper))}),b.add(P),P.add(U),Wg(P,T),P.position.set(M[0],M[1],M[2]);const H=g.filter(V=>V.nodeName.toLowerCase()==="axis")[0];if(H){const V=H.getAttribute("xyz").split(/\s+/g).map(ie=>parseFloat(ie));P.axis=new B(V[0],V[1],V[2]),P.axis.normalize()}return P}function y(_,g,E,P=null){P===null&&(P=new jv);const C=[..._.children];return P.name=_.getAttribute("name"),P.urdfName=P.name,P.urdfNode=_,r&&C.filter(U=>U.nodeName.toLowerCase()==="visual").forEach(U=>{const M=f(U,u);if(P.add(M),U.hasAttribute("name")){const T=U.getAttribute("name");M.name=T,M.urdfName=T,g[T]=M}}),s&&C.filter(U=>U.nodeName.toLowerCase()==="collision").forEach(U=>{const M=f(U);if(P.add(M),U.hasAttribute("name")){const T=U.getAttribute("name");M.name=T,M.urdfName=T,E[T]=M}}),P}function m(_){const g=[..._.children],E=new ga;return E.name=_.getAttribute("name")||"",g.forEach(P=>{const C=P.nodeName.toLowerCase();if(C==="color"){const b=P.getAttribute("rgba").split(/\s/g).map(U=>parseFloat(U));E.color.setRGB(b[0],b[1],b[2]),E.opacity=b[3],E.transparent=b[3]<1,E.depthWrite=!E.transparent}else if(C==="texture"){const b=P.getAttribute("filename");if(b){const U=new Gv(a),M=h(b);E.map=U.load(M),E.map.colorSpace=Xt}}}),E}function f(_,g={}){const E=_.nodeName.toLowerCase()==="collision",P=[..._.children];let C=null;const b=P.filter(M=>M.nodeName.toLowerCase()==="material")[0];if(b){const M=b.getAttribute("name");M&&M in g?C=g[M]:C=m(b)}else C=new ga;const U=E?new Mb:new Eb;return U.urdfNode=_,P.forEach(M=>{const T=M.nodeName.toLowerCase();if(T==="geometry"){const H=M.children[0].nodeName.toLowerCase();if(H==="mesh"){const V=M.children[0].getAttribute("filename"),ie=h(V);if(ie!==null){const k=M.children[0].getAttribute("scale");if(k){const X=Us(k);U.scale.set(X[0],X[1],X[2])}i(ie,a,(X,z)=>{z?console.error("URDFLoader: Error loading mesh.",z):X&&(X instanceof Qt&&(X.material=C),X.position.set(0,0,0),X.quaternion.identity(),U.add(X))})}}else if(H==="box"){const V=new Qt;V.geometry=new cs(1,1,1),V.material=C;const ie=Us(M.children[0].getAttribute("size"));V.scale.set(ie[0],ie[1],ie[2]),U.add(V)}else if(H==="sphere"){const V=new Qt;V.geometry=new Lh(1,30,30),V.material=C;const ie=parseFloat(M.children[0].getAttribute("radius"))||0;V.scale.set(ie,ie,ie),U.add(V)}else if(H==="cylinder"){const V=new Qt;V.geometry=new nu(1,1,1,30),V.material=C;const ie=parseFloat(M.children[0].getAttribute("radius"))||0,k=parseFloat(M.children[0].getAttribute("length"))||0;V.scale.set(ie,k,ie),V.rotation.set(Math.PI/2,0,0),U.add(V)}}else if(T==="origin"){const H=Us(M.getAttribute("xyz")),V=Us(M.getAttribute("rpy"));U.position.set(H[0],H[1],H[2]),U.rotation.set(0,0,0),Wg(U,V)}}),U}return d(e)}defaultMeshLoader(e,n,i){/\.stl$/i.test(e)?new xb(n).load(e,s=>{const o=new Qt(s,new ga);i(o)}):/\.dae$/i.test(e)?new Sb(n).load(e,s=>i(s.scene)):console.warn(`URDFLoader: Could not load model at ${e}.
No loader available`)}}const Ab=window.location.origin,bb=`${window.location.protocol==="https:"?"wss":"ws"}://${window.location.host}`;function Rb(t){return new _i().setFromEuler(new Ao(0,0,t,"XYZ"))}function Cb(t,e,n,i){const r=new Xi,s=new Qt(new iu(.18,.45,24),new _o({color:16763904}));s.rotation.x=Math.PI/2,s.position.x=.22,r.add(s);const o=new Qt(new Ph(.28,.025,8,32),new _o({color:16763904}));r.add(o);const a=document.createElement("canvas");a.width=128,a.height=128;const l=a.getContext("2d");l.fillStyle="rgba(20,20,20,0.8)",l.beginPath(),l.arc(64,64,42,0,Math.PI*2),l.fill(),l.fillStyle="white",l.font="bold 54px sans-serif",l.textAlign="center",l.textBaseline="middle",l.fillText(String(t+1),64,68);const c=new $A(a),u=new WA(new Iv({map:c,depthTest:!1}));return u.scale.set(.55,.55,.55),u.position.set(0,0,.55),r.add(u),r.position.set(e,n,.05),r.quaternion.copy(Rb(i)),r}function Lb(t,e){const n=new Set,i=/package:\/\/([^/]+)\//g;let r=i.exec(t);for(;r;)n.add(r[1]),r=i.exec(t);const s={};return n.forEach(o=>{s[o]=`${e.replace(/\/$/,"")}/api/pkg/${o}/`}),s}function Pb(t,e){if(!(!(t!=null&&t.joints)||!e||typeof e!="object"))for(const[n,i]of Object.entries(e)){const r=t.joints[n];r!=null&&r.setJointValue&&r.setJointValue(Number(i))}}function Nb(t){t&&t.traverse(e=>{var i,r,s;e.geometry&&((r=(i=e.geometry).dispose)==null||r.call(i));const n=e.material;n&&(Array.isArray(n)?n.forEach(o=>{var a;return(a=o.dispose)==null?void 0:a.call(o)}):(s=n.dispose)==null||s.call(n))})}const Db=12;function Ib(){const t=rt.useRef(null),e=rt.useRef(null),n=rt.useRef(null),i=rt.useRef(null),r=rt.useRef(null),s=rt.useRef(null),o=rt.useRef(null),a=rt.useRef(null),l=rt.useRef(null),c=rt.useRef(new mb),u=rt.useRef(new Ke),h=rt.useRef(new Bi(new B(0,0,1),0)),d=rt.useRef(null),p=rt.useRef(null),v=rt.useRef(!0),y=rt.useRef("top"),m=rt.useRef([]),f=rt.useRef(0),_=rt.useRef(null),[g,E]=rt.useState(Ab),[P,C]=rt.useState(bb),[b,U]=rt.useState(!1),[M,T]=rt.useState(null),[H,V]=rt.useState(null),[ie,k]=rt.useState([]),[X,z]=rt.useState(1),[ne,O]=rt.useState("top"),[G,j]=rt.useState(!0),[re,oe]=rt.useState(0),[W,$]=rt.useState(null),[le,ae]=rt.useState(""),[fe,Te]=rt.useState(""),[Ve,ke]=rt.useState("loading…"),[pt,K]=rt.useState(0),[_t,Ge]=rt.useState(null),et=rt.useRef({}),Ie=rt.useRef(null);rt.useEffect(()=>{v.current=G},[G]),rt.useEffect(()=>{y.current=ne},[ne]),rt.useEffect(()=>{m.current=ie},[ie]),rt.useEffect(()=>{const Y=t.current,de=new Dv;de.background=new ot(1053720),e.current=de;const Se=Y.clientWidth,J=Y.clientHeight,Ce=new yn(60,Se/J,.05,1e3);Ce.position.set(0,-12,14),Ce.up.set(0,0,1),Ce.lookAt(0,0,0),n.current=Ce;const I=new Nv({antialias:!0});I.setSize(Se,J),I.setPixelRatio(Math.min(window.devicePixelRatio,2)),Y.appendChild(I.domElement),i.current=I;const ce=new yb(Ce,I.domElement);ce.enableDamping=!0,ce.dampingFactor=.1,ce.screenSpacePanning=!0,ce.target.set(0,0,0),r.current=ce;const me=new gb(40,40,4478310,2241348);me.rotation.x=Math.PI/2,de.add(me);const he=new _b(1.5);de.add(he);const be=new lb(16777215,2236962,1.2);de.add(be);const tt=new Wv(16777215,.35);tt.position.set(5,5,20),de.add(tt);const Ze=new Xi;o.current=Ze;const je=new Qt(new cs(1.1,.55,.35),new Cg({color:5032432,roughness:.35}));je.position.z=.35,je.name="placeholder_body",Ze.add(je);const ye=new Qt(new iu(.18,.35,16),new Cg({color:16777215}));ye.rotation.z=-Math.PI/2,ye.position.set(.72,0,.35),ye.name="placeholder_nose",Ze.add(ye),de.add(Ze);const F=new Xi;de.add(F),l.current=F;const Me=()=>{ce.update(),I.render(de,Ce),requestAnimationFrame(Me)};Me();const Ee=()=>{const Xe=Y.clientWidth,Je=Y.clientHeight;Ce.aspect=Xe/Je,Ce.updateProjectionMatrix(),I.setSize(Xe,Je)};window.addEventListener("resize",Ee);const qe=Xe=>{if(!v.current||Xe.button!==void 0&&Xe.button!==0)return;const Je=I.domElement.getBoundingClientRect();p.current={x:Xe.clientX,y:Xe.clientY},u.current.x=(Xe.clientX-Je.left)/Je.width*2-1,u.current.y=-((Xe.clientY-Je.top)/Je.height)*2+1,c.current.setFromCamera(u.current,Ce);const ut=new B;c.current.ray.intersectPlane(h.current,ut)&&(d.current={x:ut.x,y:ut.y,z:0,yaw:0})},Be=Xe=>{if(!v.current||!d.current)return;const Je=p.current;p.current=null;const ut=d.current;d.current=null;const Ct=I.domElement.getBoundingClientRect(),Et=Je?Xe.clientX-Je.x:0,Zt=Je?Xe.clientY-Je.y:0,Nn=Math.hypot(Et,Zt);if(y.current==="3d"&&Nn>Db)return;u.current.x=(Xe.clientX-Ct.left)/Ct.width*2-1,u.current.y=-((Xe.clientY-Ct.top)/Ct.height)*2+1,c.current.setFromCamera(u.current,Ce);const er=new B;if(c.current.ray.intersectPlane(h.current,er)){const tr=er.x-ut.x,Ri=er.y-ut.y;Math.hypot(tr,Ri)>.08&&(ut.yaw=Math.atan2(Ri,tr))}k(tr=>[...tr,ut])};return I.domElement.addEventListener("pointerdown",qe),I.domElement.addEventListener("pointerup",Be),()=>{var ut,Ct;window.removeEventListener("resize",Ee),I.domElement.removeEventListener("pointerdown",qe),I.domElement.removeEventListener("pointerup",Be);const Xe=s.current;Xe&&((ut=Xe.parent)==null||ut.remove(Xe),Xe.geometry.dispose(),Xe.material.dispose(),s.current=null);const Je=_.current;Je&&((Ct=Je.parent)==null||Ct.remove(Je),Je.geometry.dispose(),Je.material.dispose(),_.current=null),ce.dispose(),Nb(de),Y.removeChild(I.domElement),I.dispose()}},[]),rt.useEffect(()=>{if(!n.current||!r.current)return;const Y=n.current,de=r.current;ne==="top"?(Y.position.set(0,0,22),Y.up.set(0,1,0),Y.lookAt(0,0,0),de.target.set(0,0,0),de.enableRotate=!1):(Y.position.set(10,-14,9),Y.up.set(0,0,1),Y.lookAt(0,0,0),de.target.set(0,0,0),de.enableRotate=!0),de.update()},[ne]),rt.useEffect(()=>{const Y=l.current;if(Y){for(;Y.children.length;)Y.remove(Y.children[0]);ie.forEach((de,Se)=>Y.add(Cb(Se,de.x,de.y,de.yaw||0)))}},[ie]),rt.useEffect(()=>{let Y=!1;async function de(){ke("fetching…");try{const Se=await fetch(`${g.replace(/\/$/,"")}/api/robot_description`);if(!Se.ok){ke(`HTTP ${Se.status}`),Te(`URDF fetch failed: HTTP ${Se.status}`);return}const J=await Se.json(),Ce=J.robot_description||"",I=Number(J.urdf_version)||0;if(I&&(f.current=I),Y||!Ce||Ce.length<80){ke(Ce?"empty":"no URDF (run robot_state_publisher)");return}const ce=e.current,me=o.current;if(!ce||!me)return;a.current=null;const he=new Hv;he.onError=Ze=>console.warn("URDF asset error:",Ze);let be;he.onLoad=()=>{let Ze=0;be.updateMatrixWorld(!0),be.traverse(je=>{je.isMesh&&(Ze+=1,je.frustumCulled=!1,(Array.isArray(je.material)?je.material:[je.material]).forEach(F=>{F&&(F.side=di,"emissive"in F&&F.emissive&&F.emissive.setHex(2763306),"needsUpdate"in F&&(F.needsUpdate=!0))}))}),ke(Ze>0?`OK (${Ze} meshes)`:"OK (0 meshes — check browser console /api/pkg/*.dae)")};const tt=new Tb(he);for(tt.packages=Lb(Ce,g.replace(/\/$/,"")),be=tt.parse(Ce);me.children.length;){const Ze=me.children[0];me.remove(Ze),Ze.traverse(je=>{je.geometry&&je.geometry.dispose();const ye=je.material;ye&&(Array.isArray(ye)?ye.forEach(F=>F.dispose()):ye.dispose())})}me.add(be),a.current=be}catch(Se){console.warn(Se),ke(`failed: ${Se.message}`)}}return de(),()=>{Y=!0}},[g,pt]),rt.useEffect(()=>{const Y=new WebSocket(`${P.replace(/\/$/,"")}/ws/status`);Y.onopen=()=>{U(!0),Y.send("ping")},Y.onclose=()=>U(!1),Y.onerror=()=>U(!1),Y.onmessage=Se=>{try{const J=JSON.parse(Se.data);if(J.pose){T(J.pose);const Ce=o.current;Ce&&(Ce.position.set(J.pose.x,J.pose.y,J.pose.z||0),Ce.quaternion.set(J.pose.qx,J.pose.qy,J.pose.qz,J.pose.qw))}J.joint_positions&&Pb(a.current,J.joint_positions),J.nav_feedback&&V(J.nav_feedback),typeof J.urdf_version=="number"&&J.urdf_version!==f.current&&(f.current=J.urdf_version,K(Ce=>Ce+1)),"nav_plan"in J&&(D(J.nav_plan),$(J.nav_plan?{count:J.nav_plan.count,frame:J.nav_plan.frame_id}:null))}catch{}};const de=new WebSocket(`${P.replace(/\/$/,"")}/ws/pointcloud`);return de.binaryType="arraybuffer",de.onopen=()=>de.send("ping"),de.onmessage=Se=>{if(!(Se.data instanceof ArrayBuffer))return;const J=new Uint8Array(Se.data);let Ce=-1;for(let be=0;be<J.length;be++)if(J[be]===10){Ce=be;break}if(Ce<0)return;const I=new TextDecoder().decode(J.slice(0,Ce)),ce=JSON.parse(I),me=Se.data.slice(Ce+1),he=new Float32Array(me);Mt(he,ce.count,ce),oe(ce.count)},()=>{Y.close(),de.close()}},[P]);function Mt(Y,de,Se){var tt;const J=e.current,Ce=o.current;if(!J||!Ce)return;const I=Se&&Se.in_robot_frame===!0,ce=s.current;ce&&((tt=ce.parent)==null||tt.remove(ce),ce.geometry.dispose(),ce.material.dispose(),s.current=null);const me=new Kt;me.setAttribute("position",new Sn(Y.slice(0,de*3),3));const he=new kv({size:.045,color:11006928,sizeAttenuation:!0}),be=new YA(me,he);s.current=be,I?Ce.add(be):J.add(be)}function st(){const Y=e.current,de=_.current;de&&(Y&&Y.remove(de),de.geometry.dispose(),de.material.dispose(),_.current=null)}function D(Y){const de=e.current;if(!de)return;const Se=Y==null?void 0:Y.points;if(!Se||Se.length<2){st();return}const J=new Float32Array(Se.length*3);for(let he=0;he<Se.length;he++){const be=Se[he];J[he*3]=be.x,J[he*3+1]=be.y,J[he*3+2]=(be.z??0)+.04}const Ce=_.current;if(Ce&&Ce.geometry.attributes.position.array.length===J.length){Ce.geometry.attributes.position.array.set(J),Ce.geometry.attributes.position.needsUpdate=!0,Ce.geometry.computeBoundingSphere();return}st();const I=new Kt;I.setAttribute("position",new Sn(J,3));const ce=new yo({color:2282478,transparent:!0,opacity:.95}),me=new Rh(I,ce);me.frustumCulled=!1,me.renderOrder=2,de.add(me),_.current=me}function A(Y){try{const de=new URL(Y),Se=de.protocol==="https:"?"wss":"ws";C(`${Se}://${de.hostname}:${de.port||"8080"}`)}catch{}}async function Z(Y){const de=m.current,Se=await fetch(`${g.replace(/\/$/,"")}/api/waypoints`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({waypoints:de})});if(!Se.ok)throw new Error(await Se.text())}async function _e(){try{await Z();const Y=Number.parseInt(String(X),10),de=Number.isFinite(Y)?Y:1,Se=await fetch(`${g.replace(/\/$/,"")}/api/navigation/start`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({repeat_count:de})});if(!Se.ok)throw new Error(await Se.text());ae("Navigation started"),Te("")}catch(Y){Te(`Start failed: ${Y.message}`)}}async function pe(){try{const Y=await fetch(`${g.replace(/\/$/,"")}/api/navigation/cancel`,{method:"POST"});if(!Y.ok)throw new Error(`HTTP ${Y.status}`);ae("Cancel requested"),Te("")}catch(Y){Te(`Cancel failed: ${Y.message}`)}}async function ve(){k([]),await fetch(`${g.replace(/\/$/,"")}/api/navigation/clear`,{method:"POST"})}function ze(){k(Y=>Y.slice(0,-1))}rt.useEffect(()=>{let Y=!1;async function de(){try{const Se=await fetch(`${g.replace(/\/$/,"")}/api/config`);if(!Se.ok)throw new Error(`HTTP ${Se.status}`);const J=await Se.json();Y||Ge(J)}catch(Se){Y||Te(`Config load failed: ${Se.message}`)}}return de(),()=>{Y=!0}},[g]);function we(Y){Ge(de=>de&&{...de,...Y}),Object.assign(et.current,Y),Ie.current&&clearTimeout(Ie.current),Ie.current=setTimeout(async()=>{const de=et.current;et.current={};try{const Se=await fetch(`${g.replace(/\/$/,"")}/api/config`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(de)});if(!Se.ok){let Ce=`HTTP ${Se.status}`;try{const I=await Se.json();I!=null&&I.detail&&(Ce=typeof I.detail=="string"?I.detail:JSON.stringify(I.detail))}catch{}throw new Error(Ce)}const J=await Se.json();Ge(J),Te("")}catch(Se){Te(`Config: ${Se.message}`)}},250)}return rt.useEffect(()=>()=>{Ie.current&&clearTimeout(Ie.current)},[]),Le.jsxs("div",{className:"app",children:[Le.jsxs("div",{className:"toolbar",children:[Le.jsx("div",{className:"brand",children:"B2 Web RViz"}),Le.jsxs("label",{children:["Backend"," ",Le.jsx("input",{value:g,onChange:Y=>{E(Y.target.value),A(Y.target.value)}})]}),Le.jsxs("label",{children:["WS"," ",Le.jsx("input",{value:P,onChange:Y=>C(Y.target.value)})]}),Le.jsx("span",{className:b?"ok":"bad",children:b?"connected":"offline"}),Le.jsx("a",{className:"brand-link",href:"/",title:"Back to dashboard",children:"≡ Dashboard"})]}),Le.jsxs("div",{className:"layout",children:[Le.jsx("div",{className:"viewer",ref:t}),Le.jsxs("div",{className:"panel",children:[Le.jsx("h2",{children:"View"}),Le.jsxs("div",{className:"row",children:[Le.jsx("button",{type:"button",onClick:()=>O("top"),className:ne==="top"?"active":"",children:"Top View"}),Le.jsx("button",{type:"button",onClick:()=>O("3d"),className:ne==="3d"?"active":"",children:"3D View"})]}),Le.jsxs("label",{className:"check",children:[Le.jsx("input",{type:"checkbox",checked:G,onChange:Y=>j(Y.target.checked)})," Add waypoint (click / touch then drag for yaw)"]}),Le.jsx("p",{className:"hint",children:"ใช้ได้ทั้ง Top และ 3D — ปักบนระนาบพื้น Z=0 เหมือน RViz 2D Pose estimate"}),Le.jsx("h2",{children:"Robot"}),Le.jsxs("div",{className:"kv",children:["Pose:"," ",M?`${M.x.toFixed(2)}, ${M.y.toFixed(2)}, yaw ${(M.yaw*180/Math.PI).toFixed(1)}°`:"-"]}),Le.jsxs("div",{className:"kv",children:["URDF: ",Ve]}),Le.jsxs("div",{className:"kv",children:["PointCloud: ",re.toLocaleString()," pts"]}),Le.jsxs("div",{className:"kv",children:["Plan:"," ",Le.jsx("span",{style:{color:W?"#22d3ee":"#94a3b8"},children:W?`${W.count} pts (${W.frame})`:"-"})]}),Le.jsxs("div",{className:"kv",children:["Nav: ",H?JSON.stringify(H):"-"]}),Le.jsx("h2",{children:"Waypoints"}),Le.jsxs("div",{className:"waypointList",children:[ie.map((Y,de)=>Le.jsxs("div",{className:"wp",children:[Le.jsx("b",{children:de+1})," x=",Y.x.toFixed(2)," y=",Y.y.toFixed(2)," yaw=",(Y.yaw*180/Math.PI).toFixed(0),"°"]},`wp-${de}-${Y.x}-${Y.y}`)),ie.length===0&&Le.jsx("div",{className:"hint",children:"คลิกแล้วลากบนแผนที่เพื่อปัก waypoint + ทิศ"})]}),Le.jsxs("label",{children:["Repeat rounds"," ",Le.jsx("input",{type:"number",value:X,onChange:Y=>z(Y.target.value)})]}),Le.jsx("div",{className:"hint",children:"ใช้ -1 = วนซ้ำไม่จำกัดจนกด Cancel"}),Le.jsxs("div",{className:"actions",children:[Le.jsx("button",{type:"button",className:"primary",onClick:_e,children:"Start Navigate Waypoints"}),Le.jsx("button",{type:"button",onClick:pe,children:"Cancel"}),Le.jsx("button",{type:"button",onClick:ze,children:"Undo"}),Le.jsx("button",{type:"button",onClick:ve,children:"Clear"})]}),le&&Le.jsx("div",{className:"message",children:le}),fe&&Le.jsx("div",{className:"message error",role:"alert",children:fe}),Le.jsx("h2",{children:"Stream settings"}),_t?Le.jsxs(Le.Fragment,{children:[Le.jsxs("label",{children:["Pointcloud rate: ",Le.jsxs("b",{children:[Number(_t.pointcloud_rate_hz??0).toFixed(1)," Hz"]}),Le.jsx("input",{type:"range",min:"0.5",max:"20",step:"0.5",value:_t.pointcloud_rate_hz??5,onChange:Y=>we({pointcloud_rate_hz:Number(Y.target.value)})})]}),Le.jsxs("label",{children:["Max points: ",Le.jsx("b",{children:(_t.max_points??0).toLocaleString()}),Le.jsx("input",{type:"range",min:"5000",max:"200000",step:"5000",value:_t.max_points??8e4,onChange:Y=>we({max_points:Number(Y.target.value)})})]}),Le.jsxs("label",{children:["Range limit: ",Le.jsxs("b",{children:[Number(_t.pointcloud_range_limit??0).toFixed(1)," m"]}),Le.jsx("input",{type:"range",min:"1",max:"100",step:"1",value:_t.pointcloud_range_limit??40,onChange:Y=>we({pointcloud_range_limit:Number(Y.target.value)})})]}),Le.jsxs("div",{className:"row",children:[Le.jsxs("label",{style:{flex:1},children:["Z min (m)",Le.jsx("input",{type:"number",step:"0.1",value:_t.pointcloud_z_min??-3,onChange:Y=>we({pointcloud_z_min:Number(Y.target.value)})})]}),Le.jsxs("label",{style:{flex:1},children:["Z max (m)",Le.jsx("input",{type:"number",step:"0.1",value:_t.pointcloud_z_max??3,onChange:Y=>we({pointcloud_z_max:Number(Y.target.value)})})]})]}),Le.jsxs("label",{className:"check",children:[Le.jsx("input",{type:"checkbox",checked:!!_t.pointcloud_in_robot_frame,onChange:Y=>we({pointcloud_in_robot_frame:Y.target.checked})})," ","Cloud in robot frame (FAST-LIO body)"]}),Le.jsxs("label",{className:"check",children:[Le.jsx("input",{type:"checkbox",checked:!!_t.transform_pointcloud,onChange:Y=>we({transform_pointcloud:Y.target.checked})})," ","Apply TF to cloud (when not in robot frame)"]}),Le.jsxs("label",{children:["TF time mode",Le.jsxs("select",{value:_t.pointcloud_tf_time??"latest",onChange:Y=>we({pointcloud_tf_time:Y.target.value}),children:[Le.jsx("option",{value:"latest",children:"latest (recommended)"}),Le.jsx("option",{value:"message_stamp",children:"message_stamp"}),Le.jsx("option",{value:"now",children:"now"})]})]}),Le.jsx("p",{className:"hint",children:"เปลี่ยนค่าแล้วถูกส่งให้ ROS แบบ live (debounce 0.25s); ปรับ topic / frame ต้องรีสตาร์ท node"})]}):Le.jsx("div",{className:"hint",children:"loading…"}),Le.jsx("h2",{children:"Notes"}),Le.jsxs("p",{children:["Gateway แปลงเมฆเข้า ",Le.jsx("code",{children:"fixed_frame"})," ให้อัตโนมัติ (ถ้า TF พร้อม) และส่งแม่แบบหุ่นผ่าน"," ",Le.jsx("code",{children:"/api/robot_description"})," + ",Le.jsx("code",{children:"/api/pkg/<pkg>/…"})," สำหรับ mesh"]})]})]})]})}iv(document.getElementById("root")).render(Le.jsx(Ib,{}));
