import{h as x,i as y,v as _,o as n,f as v,T as h,c,w as d,a,u as t,Z as V,t as B,g as p,b as r,j as C,d as f,n as $,e as N}from"./app-3eINX1Nq.js";import{_ as P}from"./GuestLayout-AStKnYv6.js";import{_ as g,a as b,b as k}from"./TextInput-Be4GAHHh.js";import{P as S}from"./PrimaryButton-DuIrUMrD.js";import"./ApplicationLogo-CIzH9dlR.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const U=["value"],q={__name:"Checkbox",props:{checked:{type:[Array,Boolean],required:!0},value:{default:null}},emits:["update:checked"],setup(l,{emit:s}){const i=s,m=l,e=x({get(){return m.checked},set(o){i("update:checked",o)}});return(o,u)=>y((n(),v("input",{type:"checkbox",value:l.value,"onUpdate:modelValue":u[0]||(u[0]=w=>e.value=w),class:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"},null,8,U)),[[_,e.value]])}},E={key:0,class:"mb-4 text-sm font-medium text-green-600"},L={class:"mt-4"},j={class:"mt-4 block"},D={class:"flex items-center"},M={class:"mt-4 flex items-center justify-end"},G={__name:"Login",props:{canResetPassword:{type:Boolean},status:{type:String}},setup(l){const s=h({email:"",password:"",remember:!1}),i=()=>{s.post(route("login"),{onFinish:()=>s.reset("password")})};return(m,e)=>(n(),c(P,null,{default:d(()=>[a(t(V),{title:"Log in"}),l.status?(n(),v("div",E,B(l.status),1)):p("",!0),r("form",{onSubmit:N(i,["prevent"])},[r("div",null,[a(g,{for:"email",value:"E-mail"}),a(b,{id:"email",type:"email",class:"mt-1 block w-full",modelValue:t(s).email,"onUpdate:modelValue":e[0]||(e[0]=o=>t(s).email=o),required:"",autofocus:"",autocomplete:"username"},null,8,["modelValue"]),a(k,{class:"mt-2",message:t(s).errors.email},null,8,["message"])]),r("div",L,[a(g,{for:"password",value:"Senha"}),a(b,{id:"password",type:"password",class:"mt-1 block w-full",modelValue:t(s).password,"onUpdate:modelValue":e[1]||(e[1]=o=>t(s).password=o),required:"",autocomplete:"current-password"},null,8,["modelValue"]),a(k,{class:"mt-2",message:t(s).errors.password},null,8,["message"])]),r("div",j,[r("label",D,[a(q,{name:"remember",checked:t(s).remember,"onUpdate:checked":e[2]||(e[2]=o=>t(s).remember=o)},null,8,["checked"]),e[3]||(e[3]=r("span",{class:"ms-2 text-sm text-gray-600"},"Lembrar",-1))])]),r("div",M,[l.canResetPassword?(n(),c(t(C),{key:0,href:m.route("register"),class:"rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"},{default:d(()=>e[4]||(e[4]=[f(" Criar conta? ")])),_:1},8,["href"])):p("",!0),a(S,{class:$(["ms-4",{"opacity-25":t(s).processing}]),disabled:t(s).processing},{default:d(()=>e[5]||(e[5]=[f(" Entrar ")])),_:1},8,["class","disabled"])])],32)]),_:1}))}};export{G as default};
