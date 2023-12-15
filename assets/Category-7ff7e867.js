import{r as l,o as ne,g as n,j as i,k as e,D as _,E as $,G as H,m as p,t as c,x as ie,B as y,F as E,v as G,I as J,J as de,f as re,A as j}from"./index-48699524.js";import{s as ce}from"./vue3-pagination-6087cace.js";import{u as ue}from"./tokenStore-a3ec96d9.js";import{i as L,g as me}from"./axios-instance-98f3073b.js";import{a as he,s as m,i as ge,j as fe,k as pe}from"./API-2a418714.js";import{r as ve}from"./MagnifyingGlassIcon-c0dc9279.js";import{r as xe,a as X}from"./PlusIcon-457a9cb7.js";import{r as _e}from"./PencilSquareIcon-f4c4e3fb.js";const ye={class:"px-4 sm:px-6 lg:px-8"},be={class:"-mt-2 bg-white border-b border-gray-200",style:{position:"fixed",top:"70px",right:"0px",left:"0px"}},we={class:"lg:ml-72 px-4"},ke={class:"flex justify-center gap-x-2 items-center border-gray-300 py-4"},Ce={class:"flex items-center justify-between border border-gray-400 border-r-0 rounded-md shadow-sm md:w-8/12 sm:w-6/12"},Te=e("option",{value:"id"},"ID",-1),Se=e("option",{value:"name"},"Tên",-1),je=[Te,Se],Le={key:1,class:"opacity-0 px-3 py-2"},De={class:"mt-8 flow-root"},Ie={class:"-mx-4 -my-2 overflow-x-auto sm:-mx-4 lg:-mx-6"},Me={class:"inline-block min-w-full py-2 align-middle sm:px-4 lg:px-6"},Pe={class:"min-w-full divide-y divide-gray-300"},Ve=e("th",{scope:"col",class:"py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"}," ID ",-1),Ne=e("th",{scope:"col",class:"py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-4"}," Ảnh ",-1),Ue=e("th",{scope:"col",class:"py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"}," Tên Sản Phẩm ",-1),$e=e("th",{scope:"col",class:"py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"}," Trang thái ",-1),Ee={key:0,scope:"col",class:"py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"},Fe={class:"divide-y divide-gray-200 bg-white"},Ae={class:"whitespace-nowrap px-3 py-5 text-sm text-gray-500"},Oe={class:"font-medium text-gray-900"},ze={class:"whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0"},Be={class:"flex items-center"},Re={class:"h-20 w-20 flex-shrink-0"},He=["src"],Ge={class:"whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0"},Je={class:"whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0"},Xe=["onUpdate:modelValue","onChange"],qe=["value"],Ke={key:0},Qe={class:"mx-4 space-x-3"},We=["onClick"],Ye={class:"sr-only"},Ze={key:0,class:"flex justify-end t-5"},et={key:1,class:"fixed inset-0 overflow-y-auto"},tt={class:"flex items-center justify-center min-h-screen"},st=e("div",{class:"fixed inset-0 bg-gray-500 bg-opacity-75"},null,-1),ot={class:"relative bg-white p-8 rounded-lg w-96 lg:ml-64 mt-10"},at=e("h3",{class:"text-lg font-semibold mb-4 text-center"}," Thêm danh mục ",-1),lt=["onSubmit"],nt={class:"mb-4"},it=e("label",{for:"newProductName",class:"block text-sm font-medium text-gray-700"}," Tên sản phẩm ",-1),dt={class:"mb-4"},rt=e("label",{for:"cover-photo",class:"block text-sm font-medium leading-6 text-gray-900"},"Ảnh sản phẩm",-1),ct={class:"flex items-center flex-row mt-1",id:"cover-photo"},ut=["src"],mt={key:1,class:"p-5 rounded-lg border border-dashed mr-5 border-gray-900/25"},ht=e("label",{for:"image-upload",class:"text-sm flex flex-col"},[e("span",{type:"submit",class:"rounded-md bg-indigo-600 mt-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 text-center w-20"}," Chọn ảnh ")],-1),gt=e("button",{type:"submit",class:"bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"}," Thêm ",-1),ft={key:2,class:"fixed inset-0 overflow-y-auto"},pt={class:"flex items-center justify-center min-h-screen"},vt=e("div",{class:"fixed inset-0 bg-gray-500 bg-opacity-75"},null,-1),xt={class:"relative bg-white p-8 rounded-lg w-96 lg:ml-64 mt-10"},_t=e("h3",{class:"text-lg font-semibold mb-4 text-center"},"Chỉnh sửa",-1),yt=["onSubmit"],bt={class:"mb-4"},wt=e("label",{for:"editedName",class:"block text-sm font-medium text-gray-700"}," Tên Sản Phẩm ",-1),kt={class:"mb-4"},Ct=e("label",{for:"cover-photo",class:"block text-sm font-medium leading-6 text-gray-900"},"Ảnh sản phẩm",-1),Tt={class:"flex items-center flex-row mt-1",id:"cover-photo"},St=["src"],jt={key:1,class:"p-5 rounded-lg border border-dashed mr-5 border-gray-900/25"},Lt=e("label",{for:"image-upload",class:"text-sm flex flex-col"},[e("span",{type:"submit",class:"rounded-md bg-indigo-600 mt-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 text-center w-20"}," Chọn ảnh ")],-1),Dt=e("button",{type:"submit",class:"bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"}," Lưu ",-1),It=e("div",{class:"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"},null,-1),Mt={class:"fixed inset-0 z-10 w-screen"},Pt={class:"flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"},Vt={class:"relative lg:ml-64 mt-10 transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"},Nt={class:"bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4"},Ut={class:"sm:flex sm:items-start"},$t=e("div",{class:"mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"},[e("svg",{class:"h-6 w-6 text-red-600",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor","aria-hidden":"true"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"})])],-1),Et={class:"mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left"},Ft=e("h3",{class:"text-base font-semibold leading-6 text-gray-900",id:"modal-title"}," Thay đổi trạng thái ",-1),At={class:"mt-2"},Ot={key:0,class:"text-sm text-gray-500"},zt={key:1,class:"text-sm text-gray-500"},Bt={key:3,class:"w-full h-full flex justify-center items-center",style:{position:"fixed",top:"0",left:"0","z-index":"100"}},Rt={class:"flex justify-center items-center"},Ht=e("div",{class:"bg-gray-500",style:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",opacity:"0.3"}},null,-1),Gt={class:"spinner-border text-white",role:"status"},ts={__name:"Category",setup(Jt){const F=l(!1),u=l([]),v=l([]),h=l([]),b=l(!1),f=l(-1),d=l({id:null,name:"",image:""}),D=l(!1),I=l(!1),M=l("id"),P=l(""),x=ue(),A=l(0),q=[{value:1,label:"Đang hoạt động"},{value:0,label:"Ngừng hoạt động"}],w=l(10),k=l(1),C=l(7);ne(()=>{x.role==1?x.onSetCurrentPage({index:2,child:0}):x.onSetCurrentPage({index:0,child:0}),T()});const T=async o=>{g(!0),await L.get(he).then(s=>{u.value=s.data.data,u.value.forEach(t=>{t.deletedAt?(t.status=0,t.status1=0):(t.status=1,t.status1=1)}),O(!1,!!o)}).catch(s=>{const t=s.response.data.message?s.response.data.message:"Lỗi";m(t,!0),console.error(t,s)}),g(!1)},V=o=>{const s=(o-1)*w.value;let t=s+w.value;s<h.value.length?(k.value=o,t>h.value.length&&(t=h.value.length),v.value=h.value.slice(s,t)):v.value=[]},K=()=>{O(!0)},O=(o,s)=>{const t=P.value.toString().toLowerCase().trim();switch(M.value.toLowerCase()){case"id":h.value=u.value.filter(a=>a.id.toString().toLowerCase().includes(t));break;case"name":h.value=u.value.filter(a=>a.name.toString().toLowerCase().includes(t));break}if(C.value=Math.ceil(h.value.length/w.value),o)V(1);else{let a=k.value;s&&a>C.value&&(a=C.value),V(a)}},S=l(null),Q=async(o,s)=>{A.value=s,f.value=o,D.value=!0,await R(100),I.value=!0},W=async()=>{g(!0);try{await L.delete(`${ge}/${f.value}`).then(o=>{u.value.findIndex(t=>t.id==f.value)!=-1?(T(!0),m("Thay đổi trang thái thành công",!1)):m("Lỗi",!0)}).catch(o=>{const s=o.response.data.message?o.response.data.message:"Lỗi";m(s,!0),console.error(s,o)}),z()}catch{}g(!1)},z=async()=>{if(f.value>=0){const o=v.value.findIndex(s=>s.id==f.value);o!=-1&&(v.value[o].status1=v.value[o].status)}I.value=!1,await R(500),D.value=!1};function Y(o){d.value={...o},f.value=u.value.indexOf(o),b.value=!0}const Z=async()=>{if(!d.value)return;const o=u.value.find(t=>t.id==d.value.id);if(!o)return;g(!0);const s=new FormData;d.value.file&&s.append("image",d.value.file),o.name!=d.value.name&&s.append("name",d.value.name),b.value=!1,await L.put(`${fe}/${d.value.id}`,s).then(t=>{let a=u.value.findIndex(U=>U.id==f);u.value.splice(a,1,t.data.data),T(),m("Cập nhật thành công",!1)}).catch(t=>{const a=t.response.data.message?t.response.data.message:"Lỗi";m(a,!0),console.error(a,t)}),g(!1)};function ee(){b.value=!1,S.value.value=null}function te(){try{const o=S.value;if(o.files.length>0){const s=o.files[0];d.value.file=s;const t=new FileReader;t.onload=a=>{a.target.result?d.value.image=a.target.result:console.error("Image loading failed.",s)},t.readAsDataURL(s)}}catch(o){console.error("Error handling image upload:",o)}}const N=l(!1),r=l(),se=()=>{r.value={id:null,name:"",image:""},N.value=!0},B=()=>{N.value=!1},oe=async()=>{if(!r.value.file||!r.value.name||r.value.name.toString().trim().length==0){m("Thông tin thiếu",!0);return}g(!0);const o=new FormData;o.append("name",r.value.name),o.append("image",r.value.file),await L.post(pe,o).then(s=>{T(),m("Thêm mới thành công",!1),B()}).catch(s=>{const t=s.response.data.message?s.response.data.message:"Lỗi";m(t,!0),console.error(t,s)}),g(!1)},ae=o=>{const t=o.target.files[0];if(t){const a=new FileReader;a.onload=U=>{r.value.image=U.target.result,r.value.file=t},a.readAsDataURL(t)}},g=o=>{F.value=o},R=o=>new Promise(s=>setTimeout(s,o)),le=(o,s)=>{let t=o.toString().trim();return t.length>s&&(t=t.substring(0,s),t+="..."),t};return(o,s)=>(n(),i(E,null,[e("div",ye,[e("div",be,[e("div",we,[e("div",ke,[e("div",Ce,[_(e("input",{type:"text",placeholder:"Tìm kiếm ...","onUpdate:modelValue":s[0]||(s[0]=t=>P.value=t),class:"rounded-md w-full rounded-r-none border-0 px-3 py-2 text-sm focus:border-gray-50 focus:border-0"},null,512),[[$,P.value]]),_(e("select",{"onUpdate:modelValue":s[1]||(s[1]=t=>M.value=t),class:"border-0 px-3 py-2 text-sm focus:outline-0"},je,512),[[H,M.value]]),e("button",{type:"button",onClick:s[2]||(s[2]=t=>K()),class:"inline-flex items-center rounded-md rounded-l-none bg-indigo-600 px-1 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"},[p(c(ve),{class:"h-7 w-7","aria-hidden":"true"})])]),c(x).role==1?(n(),i("button",{key:0,type:"button",onClick:s[3]||(s[3]=t=>se()),class:"inline-flex self-end items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"},[p(c(xe),{class:"h-5 w-5","aria-hidden":"true"}),ie(" Thêm mới ")])):(n(),i("div",Le))])])])]),e("div",De,[e("div",Ie,[e("div",Me,[e("table",Pe,[e("thead",null,[e("tr",null,[Ve,Ne,Ue,$e,c(x).role==1?(n(),i("th",Ee," Hoạt động ")):y("",!0)])]),e("tbody",Fe,[(n(!0),i(E,null,G(v.value,t=>(n(),i("tr",{key:t.id},[e("td",Ae,[e("div",Oe,j(t.id),1)]),e("td",ze,[e("div",Be,[e("div",Re,[e("img",{class:"h-20 w-24",src:t.image,alt:""},null,8,He)])])]),e("td",Ge,[e("div",null,j(le(t.name,40)),1)]),e("td",Je,[_(e("select",{"onUpdate:modelValue":a=>t.status1=a,onChange:a=>Q(t.id,t.status1),class:"rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-indigo-500"},[(n(),i(E,null,G(q,a=>e("option",{key:a.value,value:a.value},j(a.label),9,qe)),64))],40,Xe),[[H,t.status1]])]),c(x).role==1?(n(),i("td",Ke,[e("div",Qe,[e("button",{onClick:a=>Y(t),class:"text-indigo-600 hover:text-indigo-900"},[p(c(_e),{class:"h-5 w-5","aria-hidden":"true"}),e("span",Ye,j(t.id)+",",1)],8,We)])])):y("",!0)]))),128))])])])])]),h.value.length>w.value?(n(),i("nav",Ze,[p(c(ce),{modelValue:k.value,"onUpdate:modelValue":[s[4]||(s[4]=t=>k.value=t),V],pages:C.value,"range-size":1,"active-color":"#DCEDFF"},null,8,["modelValue","pages"])])):y("",!0),N.value?(n(),i("div",et,[e("div",tt,[st,e("div",ot,[at,e("form",{onSubmit:J(oe,["prevent"])},[e("div",nt,[it,_(e("input",{"onUpdate:modelValue":s[5]||(s[5]=t=>r.value.name=t),type:"text",id:"newProductName",name:"newProductName",class:"mt-1 p-2 w-full border rounded-md"},null,512),[[$,r.value.name]])]),e("div",dt,[rt,e("div",ct,[r.value.image&&r.value.image.length>0?(n(),i("img",{key:0,src:r.value.image,class:"h-32 max-w-xs object-cover mr-5 rounded-lg"},null,8,ut)):(n(),i("div",mt,[p(c(X),{class:"h-32 max-w-xs object-cover opacity-50"})])),ht,e("input",{type:"file",id:"image-upload",ref_key:"imageInputRef",ref:S,onChange:ae,accept:"image/*",class:"hidden"},null,544)])]),e("div",{class:"flex justify-end"},[e("button",{type:"button",class:"mr-2 text-gray-500 hover:text-gray-700 mx-6",onClick:B}," Hủy "),gt])],40,lt)])])])):y("",!0),b.value?(n(),i("div",ft,[e("div",pt,[vt,e("div",xt,[_t,e("form",{onSubmit:J(Z,["prevent"])},[e("div",bt,[wt,_(e("input",{"onUpdate:modelValue":s[6]||(s[6]=t=>d.value.name=t),type:"text",id:"editedName",name:"editedName",class:"mt-1 p-2 w-full border rounded-md"},null,512),[[$,d.value.name]])]),e("div",kt,[Ct,e("div",Tt,[d.value.image&&d.value.image.length>0?(n(),i("img",{key:0,src:d.value.image,class:"h-32 max-w-xs object-cover mr-5 rounded-lg"},null,8,St)):(n(),i("div",jt,[p(c(X),{class:"h-32 max-w-xs object-cover opacity-50"})])),Lt,e("input",{type:"file",id:"image-upload",ref_key:"imageInputRef",ref:S,onChange:te,accept:"image/*",class:"hidden"},null,544)])]),e("div",{class:"flex justify-end"},[e("button",{type:"button",class:"mr-2 text-gray-500 hover:text-gray-700 mx-3",onClick:ee}," Thoát "),Dt])],40,yt)])])])):y("",!0),_(e("div",null,[e("div",{class:re([{"opacity-100":I.value},"transition-opacity ease-in-out duration-500 opacity-0 relative z-10"]),"aria-labelledby":"modal-title",role:"dialog","aria-modal":"true"},[It,e("div",Mt,[e("div",Pt,[e("div",Vt,[e("div",Nt,[e("div",Ut,[$t,e("div",Et,[Ft,e("div",At,[A.value==0?(n(),i("p",Ot," Bạn có chắc chắn muốn chuyển sang trang thái ngừng hoạt động danh mục này không? Tất cả dữ tất cả dữ liệu sẽ bị ảnh hưởng ")):(n(),i("p",zt," Bạn có chắc chắn muốn chuyển sang trang thái hoạt động danh mục này không? Tất cả dữ tất cả dữ liệu sẽ bị ảnh hưởng "))])])])]),e("div",{class:"bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"},[e("button",{type:"button",onClick:W,class:"inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"}," Xác nhận "),e("button",{type:"button",onClick:z,class:"inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm sm:ml-3 sm:w-auto"}," Huỷ ")])])])])],2)],512),[[de,D.value]]),F.value?(n(),i("div",Bt,[e("div",Rt,[Ht,e("div",Gt,[p(c(me),{color:"blue",size:"12",class:"lg:ml-64 mt-10"})])])])):y("",!0)],64))}};export{ts as default};
