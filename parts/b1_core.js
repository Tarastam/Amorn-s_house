<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
(function(){
'use strict';
var T=window.THREE,$=function(s){return document.querySelector(s)};
var PI=Math.PI,lerp=function(a,b,t){return a+(b-a)*t},clamp=function(v,a,b){return Math.max(a,Math.min(b,v))};
var reduced=false;try{reduced=matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var DAYS=['จ.','อ.','พ.','พฤ.','ศ.','ส.','อา.'];

/* ================= theme (Space Station is the only theme; add more as bNs_<theme>.js parts) ================= */
var THEMES={space:{name:'Space Station',title:'Amorn Station',desc:'บ้านกลางวงโคจร · แสงดาวและห้องแสนอบอุ่น',accent:'#72d9ff'},cafe:{name:'Coffee Cafe',title:'Amorn Coffee House',desc:'คาเฟ่ในสวน · กาแฟอุ่นและวันสบาย ๆ',accent:'#c89146'},arcade:{name:'Retro Arcade',title:'Amorn Arcade',desc:'เมืองยามค่ำ · เกมเรโทรและแสงนีออน',accent:'#ff5caf'},wizard:{name:'Wizard Tower',title:'Amorn Wizard Tower',desc:'หอคอยเวทมนตร์ · ห้องสมุดและสวนลอยฟ้า',accent:'#d6b471'}};
var THEME='space';
try{THEME=new URLSearchParams(location.search).get('theme')||localStorage.getItem('lifehouse.theme')||'space'}catch(e){}
if(!THEMES[THEME])THEME='space';
var SP=THEME==='space';
$('#app').classList.add('theme-'+THEME);

/* ================= rooms ================= */
function R(o){o.cx=(o.x0+o.x1)/2;o.cz=(o.z0+o.z1)/2;o.c=parseInt(o.css.slice(1),16);return o}
var ROOMS=[
 R({k:'work',n:'โรงรถ',en:'Garage · งานโรงงาน',css:'#d9683a',x0:-22,x1:-10,z0:0,z1:13,node:'garage',slots:[[-19.4,2.4,0],[-12.4,2.4,0],[-20.4,6.8,PI/2],[-20.4,10.6,PI/2],[-16,10.8,0],[-11.9,8.6,-PI/2]]}),
 R({k:'apps',n:'ห้องทำงาน',en:'Office · แอปและเครื่องมือ',css:'#2f9e8f',x0:-10,x1:0,z0:-13,z1:0,node:'office',slots:[[-8.4,-3.4,PI/2],[-2.2,-3.0,0],[-1.2,-10.2,-PI/2],[-8.8,-10.4,PI/2],[-5,-3.0,0],[-8.8,-6.6,PI/2]]}),
 R({k:'growth',n:'ห้องนอน',en:'Bedroom · พัฒนาตัวเอง',css:'#7a62d6',x0:0,x1:11,z0:-13,z1:0,node:'bed',slots:[[3.2,-11.4,0],[1.9,-3.4,0],[9.2,-3.0,0],[9.8,-4.6,-PI/2],[2.0,-7.4,PI/2],[6,-6.6,0]]}),
 R({k:'income',n:'ครัว',en:'Kitchen · รายได้เสริม',css:'#e9a02a',x0:-10,x1:0,z0:0,z1:13,node:'kitchen',slots:[[-7.4,10.8,0],[-2.6,10.8,0],[-7.0,2.8,0],[-8.4,7.2,PI/2],[-1.4,6.8,-PI/2],[-4.6,2.8,0]]}),
 R({k:'life',n:'ห้องรับแขก',en:'Living · งานอดิเรก',css:'#d9487a',x0:0,x1:22,z0:0,z1:13,node:'livA',slots:[[20,2.5,0],[2.3,2.4,0],[20.3,11,0],[6.2,11.2,0],[14.6,11.2,0],[2.6,6.6,PI/2]]}),
 R({k:'garden',n:'สวนหน้าบ้าน',en:'Front garden',css:'#4fa64f',x0:-26,x1:26,z0:13,z1:34,node:'garden',outdoor:true,slots:[[-12,19,0],[14.5,19.5,0],[-19,26,0],[20,26,0],[-5.5,25,0],[5.5,30,0]]}),
 R({k:'gym',n:'ห้องออกกำลังกาย',en:'Gym · ตารางประจำสัปดาห์',css:'#3f7fd9',x0:-22,x1:-10,z0:-13,z1:0,node:'gym',routine:true,hub:[-12.6,-3.4,0]}),
 R({k:'bath',n:'ห้องน้ำ · สมาธิ',en:'Bathroom · Meditation',css:'#2aa3c4',x0:11,x1:22,z0:-13,z1:0,node:'bath',routine:true,hub:[13.4,-3.4,0]}),
 R({k:'pool',n:'สระว่ายน้ำ',en:'Pool · ตารางประจำสัปดาห์',css:'#2b8fe0',x0:22,x1:44,z0:-6,z1:14,node:'pool',routine:true,outdoor:true,hub:[34.2,10.8,0]})
];
var SPN={work:['ฮังการ์ยาน','Hangar · งานโรงงาน'],apps:['ห้องคอมพิวเตอร์','Computer bay · แอปและเครื่องมือ'],growth:['ห้องพักลูกเรือ','Crew quarters · พัฒนาตัวเอง'],income:['ครัว · โรงอาหาร','Galley · รายได้เสริม'],life:['เลานจ์','Lounge · งานอดิเรก'],garden:['สวนไฮโดรโปนิกส์','Hydroponic deck'],gym:['ห้องออกกำลังกาย','Gym · ตารางประจำสัปดาห์'],bath:['ห้องน้ำ · สมาธิ','Hygiene · Meditation'],pool:['สปา · สระ','Spa pool · ตารางประจำสัปดาห์']};
if(SP)ROOMS.forEach(function(r){var a=SPN[r.k];if(a){r.n=a[0];r.en=a[1]}});
var room=function(k){return ROOMS.filter(function(r){return r.k===k})[0]||ROOMS[0]};
/* space layout tweaks: compact hydroponic annex, rover inside the hangar, twin beds */
  var gA=room('garden');gA.x0=0;gA.x1=22;gA.z0=13;gA.z1=31;gA.cx=11;gA.cz=22;
  gA.slots=[[3.4,18.4,0],[13.6,18.4,0],[19.0,18.6,0],[3.4,26.2,0],[13.6,26.2,0],[19.0,26.0,0]];
  room('work').slots=[[-19.3,2.6,0],[-12.3,2.6,0],[-11.6,6.9,-PI/2],[-12.3,11.0,0],[-16.0,11.0,0],[-19.4,11.0,0]];
  room('growth').slots=[[1.9,-2.8,0],[9.2,-2.8,0],[1.4,-5.5,PI/2],[9.8,-5.6,-PI/2],[5.5,-11.9,0],[5.5,-8.2,PI]];
var PROJROOMS=ROOMS.filter(function(r){return !r.routine});
/* Rear galleries have real elevation; the central stair connects their walking graph. */
var GALLERY=THEME==='wizard'?14:SP?0:7;
ROOMS.forEach(function(r){r.level=r.z1<=0?GALLERY:0});
function floorHeight(r){return (r.k==='garden'?0:r.k==='pool'?.5:.55)+(r.level||0)}
if(!SP){
  room('income').slots=[[-7.5,7,0],[-2.5,6.3,0],[-7.5,10.8,0],[-2.5,10.8,0],[-8.8,5,PI/2],[-1.2,7.8,-PI/2]];
  var names=THEME==='cafe'?['เวิร์กช็อปกาแฟ','สตูดิโอชั้นลอย','ห้องนอนใต้ชายคา','เคาน์เตอร์กาแฟ','มุมนั่งเล่น','สวนคาเฟ่','โยคะบนชั้นลอย','ห้องพักใจ','สระในสวน']:THEME==='arcade'?['โซนเกมอาเขต','สตรีมมิงสตูดิโอ','ห้องพักเกมเมอร์','สแน็กบาร์','คอนโซลเลานจ์','ลานเกมกลางแจ้ง','ฟิตเนส','ห้องชาร์จพลัง','นีออนสปา']:['โรงปรุงยา','ห้องเขียนคาถา','ห้องนอนยอดหอคอย','ครัวนักเวท','ห้องโถงเวทมนตร์','สวนสมุนไพร','ลานฝึกเวท','ห้องสมาธิ','บ่อน้ำมนตรา'];
  ROOMS.forEach(function(r,i){r.n=names[i]});
}
var ROUTROOMS=ROOMS.filter(function(r){return r.routine});
var STATUS={active:{n:'กำลังทำ',cls:'good'},planning:{n:'วางแผน',cls:'blue'},paused:{n:'พักไว้',cls:'idle'},done:{n:'เสร็จแล้ว',cls:'warn'}};

/* ================= data (example values, editable on the TV) ================= */
function Q(text,done){return {id:'t'+Math.random().toString(36).slice(2,8),text:text,done:!!done}}
function defaultProjects(){return [
 {id:'p1',name:'Production Quality Improvement',dist:'work',status:'active',prog:0,hrs:6,tasks:[Q('สรุป Pareto ของเสียประจำสัปดาห์'),Q('ตั้งเป้าลดของเสียของ 1 ไลน์',1),Q('รายงานผลให้ QA')]},
 {id:'p2',name:'Line Issue Log',dist:'work',status:'active',prog:0,hrs:3,tasks:[Q('เพิ่มช่องบันทึกสาเหตุและผู้รับผิดชอบ'),Q('ให้ Line Leader ทดลองใช้',1)]},
 {id:'p3',name:'Production Daily Report',dist:'work',status:'active',prog:0,hrs:2,tasks:[Q('ตรวจสูตรสรุปยอดผลิตรายกะ'),Q('ทำหน้ารายงานพิมพ์ A4',1)]},
 {id:'p4',name:'OT Management Plan',dist:'work',status:'planning',prog:0,hrs:1.5,tasks:[Q('ร่างตาราง OT ของ 6 ไลน์'),Q('ตรวจร่างกับ Line Leader')]},
 {id:'p5',name:'Experimental Follow-up',dist:'work',status:'active',prog:0,hrs:2,tasks:[Q('อัปเดตสถานะการทดลองที่ค้างอยู่'),Q('ทำตารางติดตามผล',1)]},
 {id:'p6',name:'Tantalum Request Material',dist:'work',status:'active',prog:0,hrs:2,tasks:[Q('ทดสอบฟอร์มขอเบิกกับไลน์จริง'),Q('เชื่อมกับรายการวัตถุดิบ',1),Q('สรุปปัญหาที่เจอ')]},
 {id:'p7',name:'Project Management App',dist:'apps',status:'planning',prog:0,hrs:3,tasks:[Q('สเก็ตช์หน้าจอหลัก'),Q('ออกแบบโครงข้อมูล')]},
 {id:'p8',name:'Material Inventory App',dist:'apps',status:'active',prog:0,hrs:2,tasks:[Q('วางแผน Phase 2'),Q('ใช้งานจริงกับหน้างานหนึ่งแห่ง',1)]},
 {id:'p9',name:'PSLB Welding Dashboard',dist:'apps',status:'active',prog:0,hrs:3,tasks:[Q('ทำหน้า Power BI สำหรับหัวหน้าไลน์'),Q('ต่อข้อมูลจาก Excel',1)]},
 {id:'p10',name:'My Life House',dist:'apps',status:'done',prog:0,hrs:0,tasks:[Q('ออกแบบห้องและของในบ้าน',1),Q('ทำกระดานเควสบนทีวี',1)]},
 {id:'p11',name:'Extra Income Plan',dist:'income',status:'planning',prog:0,hrs:2,tasks:[Q('เลือกแนวทางหลักหนึ่งอย่าง'),Q('ตั้งเป้าหมายรายเดือน')]},
 {id:'p12',name:'AI Trading',dist:'income',status:'planning',prog:0,hrs:1,tasks:[Q('กำหนดกติกาการทดสอบย้อนหลัง'),Q('รวบรวมข้อมูลราคา')]},
 {id:'p13',name:'AI Agent Company',dist:'income',status:'planning',prog:0,hrs:1,tasks:[Q('ร่างแผนกและหน้าที่ของ agent')]},
 {id:'p14',name:'Baldr the Writer',dist:'income',status:'active',prog:0,hrs:2,tasks:[Q('ทดลองเขียนตอนใหม่หนึ่งตอน'),Q('ตั้งโครงเรื่องหลัก',1)]},
 {id:'p15',name:'Data Career Switch',dist:'growth',status:'active',prog:0,hrs:4,tasks:[Q('ทำงานตัวอย่างสำหรับ portfolio'),Q('รวบรวมตำแหน่งงานที่สนใจ',1),Q('ปรับ resume')]},
 {id:'p16',name:'Excel / VBA / Power BI',dist:'growth',status:'active',prog:0,hrs:3,tasks:[Q('ฝึก Power Query กับข้อมูลหน้างาน'),Q('ทำ dashboard Power BI หนึ่งชิ้น'),Q('จบบทเรียน VBA เบื้องต้น',1)]},
 {id:'p17',name:'Creative Hobbies',dist:'life',status:'paused',prog:40,hrs:1,tasks:[]},
 {id:'p18',name:'Front Garden Makeover',dist:'garden',status:'planning',prog:0,hrs:1,tasks:[Q('เลือกไม้ดอกที่ทนแดด'),Q('ทำที่รดน้ำอัตโนมัติ'),Q('จัดทางเดินหินหน้าบ้าน',1)]}
]}
function wk(plans){var ti=(new Date().getDay()+6)%7;return plans.map(function(p,i){return {plan:p,done:!!(p&&i<ti&&i%3!==1)}})}
function defaultRoutines(){return [
 {id:'gym',name:'ตารางออกกำลังกาย',days:wk(['อก + ไหล่','','ขา + ก้น','คาร์ดิโอ 30 นาที','หลัง + แขน','ยืดเหยียด',''])},
 {id:'bath',name:'นั่งสมาธิ',days:wk(['10 นาที','10 นาที','10 นาที','10 นาที','10 นาที','15 นาที','15 นาที'])},
 {id:'pool',name:'ว่ายน้ำ',days:wk(['','ว่าย 20 รอบ','','ว่าย 20 รอบ','','ว่าย 30 รอบ',''])}
]}
function weekKey(){var d=new Date();d.setHours(0,0,0,0);var w=(d.getDay()+6)%7;d.setDate(d.getDate()-w);return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
function todayIdx(){return (new Date().getDay()+6)%7}
var KEY='lifehouse.v2';
function freshState(){return {projects:defaultProjects(),routines:defaultRoutines(),week:weekKey(),last:'p1'}}
function load(){
  var s=null;try{var r=localStorage.getItem(KEY);if(r){var a=JSON.parse(r);if(a&&Array.isArray(a.projects)&&Array.isArray(a.routines))s=a}}catch(e){}
  if(!s)s=freshState();
  if(s.week!==weekKey()){s.routines.forEach(function(rt){rt.days.forEach(function(d){d.done=false})});s.week=weekKey()}
  return s;
}
var S=load();
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function proj(id){return S.projects.filter(function(p){return p.id===id})[0]}
function rout(id){return S.routines.filter(function(r){return r.id===id})[0]}
function prog(p){return p.tasks&&p.tasks.length?Math.round(p.tasks.filter(function(t){return t.done}).length/p.tasks.length*100):Math.round(p.prog||0)}
function rstat(rt){var pl=rt.days.filter(function(d){return d.plan&&d.plan.trim()}),dn=pl.filter(function(d){return d.done});return {planned:pl.length,done:dn.length,pct:pl.length?Math.round(dn.length/pl.length*100):0}}
function qstats(list){var n=0,d=0;list.forEach(function(p){(p.tasks||[]).forEach(function(t){n++;if(t.done)d++})});return {n:n,d:d}}
function pstats(list){var n=list.length,avg=n?list.reduce(function(s,p){return s+prog(p)},0)/n:0,h=list.reduce(function(s,p){return s+(+p.hrs||0)},0);return {n:n,avg:avg,h:h}}
function badgeList(){
  var q=qstats(S.projects),dp=S.projects.filter(function(p){return p.status==='done'}).length,g=rstat(rout('gym')),m=rstat(rout('bath')),p=rstat(rout('pool'));
  var rooms=PROJROOMS.filter(function(r){return S.projects.some(function(x){return x.dist===r.k&&(x.tasks||[]).some(function(t){return t.done})})}).length;
  return [
   {k:'q1',n:'เควสแรก',d:'ขีดฆ่าเควสแรก',ok:q.d>=1},
   {k:'q10',n:'สิบเควส',d:'ทำเควสครบ 10 ข้อ',ok:q.d>=10},
   {k:'q25',n:'ยี่สิบห้าเควส',d:'ทำเควสครบ 25 ข้อ',ok:q.d>=25},
   {k:'p1',n:'โปรเจกต์แรกสำเร็จ',d:'ปิดโปรเจกต์แรกได้',ok:dp>=1},
   {k:'p5',n:'ห้าโปรเจกต์',d:'ปิดโปรเจกต์ครบ 5 งาน',ok:dp>=5},
   {k:'all',n:'ทุกห้องมีผลงาน',d:'ทำเควสสำเร็จในทุกห้องโปรเจกต์',ok:rooms>=PROJROOMS.length},
   {k:'gym',n:'ครบสัปดาห์ออกกำลังกาย',d:'ทำตามตารางออกกำลังกายครบทั้งสัปดาห์',ok:g.planned>0&&g.done===g.planned},
   {k:'med',n:'สมาธิห้าวัน',d:'นั่งสมาธิครบ 5 วันในสัปดาห์',ok:m.done>=5},
   {k:'pool',n:'นักว่ายน้ำ',d:'ว่ายน้ำครบตามตาราง',ok:p.planned>0&&p.done===p.planned}
  ];
}

/* ================= three ================= */
var canvas=$('#gl');
var renderer=new T.WebGLRenderer({canvas:canvas,antialias:true,alpha:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
renderer.setClearColor(0x000000,0);
renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
var scene=new T.Scene();
var cam=new T.OrthographicCamera(-1,1,1,-1,1,1000);
var hemi=new T.HemisphereLight(0xffffff,0xc2b79d,0.9);scene.add(hemi);
var sun=new T.DirectionalLight(0xffffff,0.8);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.bias=-0.0006;
var sc=sun.shadow.camera;sc.near=1;sc.far=400;scene.add(sun);scene.add(sun.target);
var mats={},geos={},gl={};
function M(c){return mats[c]||(mats[c]=new T.MeshLambertMaterial({color:c}))}
function GLOW(c,k){var key=c+'g'+(k||0);return gl[key]||(gl[key]=new T.MeshLambertMaterial({color:c,emissive:c,emissiveIntensity:k||.65}))}
function G(w,h,d){var k=w+'|'+h+'|'+d;return geos[k]||(geos[k]=new T.BoxGeometry(w,h,d))}
function box(w,h,d,c,x,y,z,p,ns){var m=new T.Mesh(G(w,h,d),typeof c==='object'?c:M(c));m.position.set(x||0,y||0,z||0);if(!ns)m.castShadow=true;m.receiveShadow=true;if(p)p.add(m);return m}
function cyl(rt,rb,h,c,x,y,z,p,seg){var m=new T.Mesh(new T.CylinderGeometry(rt,rb,h,seg||14),typeof c==='object'?c:M(c));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;if(p)p.add(m);return m}
function ball(r,c,x,y,z,p){var m=new T.Mesh(new T.SphereGeometry(r,14,10),typeof c==='object'?c:M(c));m.position.set(x,y,z);m.castShadow=true;if(p)p.add(m);return m}

/* merge static meshes of a group by material (cuts draw calls a lot) */
function mergeStatic(root){
  root.updateMatrixWorld(true);
  var inv=new T.Matrix4().copy(root.matrixWorld).invert(),buckets={},list=[];
  root.traverse(function(o){
    if(o.isMesh&&!o.userData.keep&&o.geometry&&!Array.isArray(o.material)&&o.material.visible!==false){
      var key=o.material.uuid+(o.castShadow?'c':'')+(o.receiveShadow?'r':'');
      (buckets[key]=buckets[key]||{m:o.material,c:o.castShadow,r:o.receiveShadow,l:[]}).l.push(o);list.push(o);
    }
  });
  Object.keys(buckets).forEach(function(k){
    var b=buckets[k],pos=[],nor=[],uvs=[],idx=[],off=0;
    b.l.forEach(function(o){
      var g=o.geometry.clone();g.applyMatrix4(new T.Matrix4().multiplyMatrices(inv,o.matrixWorld));
      var p=g.attributes.position.array,n=g.attributes.normal.array;
      for(var i=0;i<p.length;i++){pos.push(p[i]);nor.push(n[i])}
      var uv=g.attributes.uv;for(var u=0;u<p.length/3;u++){uvs.push(uv?uv.getX(u):0,uv?uv.getY(u):0)}
      var ix=g.index?g.index.array:null;
      if(ix){for(var j=0;j<ix.length;j++)idx.push(ix[j]+off)}else{for(var j2=0;j2<p.length/3;j2++)idx.push(j2+off)}
      off+=p.length/3;g.dispose();
    });
    var geo=new T.BufferGeometry();
    geo.setAttribute('position',new T.Float32BufferAttribute(pos,3));geo.setAttribute('normal',new T.Float32BufferAttribute(nor,3));
    geo.setAttribute('uv',new T.Float32BufferAttribute(uvs,2));
    geo.setIndex(off>65000?new T.Uint32BufferAttribute(idx,1):new T.Uint16BufferAttribute(idx,1));
    var m=new T.Mesh(geo,b.m);m.castShadow=b.c;m.receiveShadow=b.r;root.add(m);
  });
  list.forEach(function(o){if(o.parent)o.parent.remove(o)});
}

/* ================= time of day ================= */
function C(s){return new T.Color(s)}
/* keyframe: [hour, skyTop, skyBottom, sunColour, sunIntensity, hemiSky, hemiGround, hemiIntensity, nightFactor] */
var KFSPACE=[
 [0,'#02040c','#0a1430','#9fb6ff',.34,'#5a6b9a','#151c33',.5,1],
 [5.5,'#02040c','#0a1430','#9fb6ff',.34,'#5a6b9a','#151c33',.5,1],
 [7,'#02040c','#0b1836','#e6f0ff',.78,'#9db6e0','#2a3550',.8,.35],
 [12,'#02040c','#0b1836','#f2f7ff',.88,'#b4c8ee','#2f3b58',.88,.3],
 [21.5,'#02040c','#0b1836','#e6f0ff',.78,'#9db6e0','#2a3550',.8,.35],
 [23,'#02040c','#0a1430','#9fb6ff',.34,'#5a6b9a','#151c33',.5,1],
 [24,'#02040c','#0a1430','#9fb6ff',.34,'#5a6b9a','#151c33',.5,1]
];
var KF=KFSPACE.map(function(a){return {h:a[0],top:C(a[1]),bot:C(a[2]),sun:C(a[3]),si:a[4],hs:C(a[5]),hg:C(a[6]),hi:a[7],nf:a[8]}});
var tOver=null;
function curH(){if(tOver!==null)return tOver;var d=new Date();return d.getHours()+d.getMinutes()/60+d.getSeconds()/3600}
var TM={nf:0,h:12};
var winMat=new T.MeshLambertMaterial({color:0xbfe3fb,emissive:0x8cc8f0,emissiveIntensity:.5});
var lampMat=new T.MeshLambertMaterial({color:0xfff1c2,emissive:0xffd88a,emissiveIntensity:.2});
var lanternMat=new T.MeshLambertMaterial({color:0xfff1c2,emissive:0xffd88a,emissiveIntensity:.2});
var glowDecals=[],clockHands=null,tvTexNeeds=0,SPANIM=[],spPrune=0;
var tmpA=C('#000000'),tmpB=C('#000000');
function applyTime(){
  var h=curH(),i=0;for(i=0;i<KF.length-2&&h>KF[i+1].h;i++){}
  var a=KF[i],b=KF[i+1],t=clamp((h-a.h)/(b.h-a.h),0,1);
  tmpA.copy(a.top).lerp(b.top,t);var top='#'+tmpA.getHexString();tmpB.copy(a.bot).lerp(b.bot,t);var bot='#'+tmpB.getHexString();
  $('#sky').style.background='linear-gradient('+top+','+bot+')';
  var nf=lerp(a.nf,b.nf,t);TM.nf=nf;TM.h=h;
  hemi.color.copy(a.hs).lerp(b.hs,t);hemi.groundColor.copy(a.hg).lerp(b.hg,t);hemi.intensity=lerp(a.hi,b.hi,t);
  sun.color.copy(a.sun).lerp(b.sun,t);sun.intensity=lerp(a.si,b.si,t);
  sun.userData.dir=[34,70,28];$('#stars').style.opacity=1;
  /* windows / lamps */
  winMat.color.set(0x0b1f4a);winMat.emissive.set(0x1d78d8);winMat.emissiveIntensity=.5+.3*nf;
  lampMat.emissiveIntensity=.12+.95*nf;lanternMat.emissiveIntensity=.1+1.1*nf;
  glowDecals.forEach(function(g){g.material.opacity=nf*.6});
  /* clock + labels in HTML */
  var hh=Math.floor(h),mm=Math.floor((h-hh)*60);
  $('#clkT').textContent=(hh<10?'0':'')+hh+':'+(mm<10?'0':'')+mm;
  $('#clkP').textContent=h<5||h>=19.6?'กลางคืน':h<7.8?'เช้าตรู่':h<11.5?'เช้า':h<15.5?'บ่าย':h<18?'เย็น':'ค่ำ';
  var night=nf>.55;$('#clkIco').innerHTML=night?'<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/>':'<circle cx="12" cy="12" r="4.2"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6"/>';
  if(clockHands){clockHands.hr.rotation.z=-((h%12)/12)*PI*2;clockHands.mn.rotation.z=-((h%1))*PI*2}
  tvTexNeeds=1;
}

/* ================= house ================= */
var WALLC=0xc7ced2,WALLD=0xb4c0d0,TRIM=0x8795ad,EXTH=6.3,BH=8.4,INH=1.7,FLOORY=.55;
var CYAN=0x36d6ff,CAPC=GLOW(CYAN,.6);
var extWalls={};
var houseStatic=new T.Group();scene.add(houseStatic);


/* build one straight wall run with openings; axis 'x' => along x at fixed z; 'z' => along z at fixed x */
function run(g,axis,fixed,a0,a1,gaps,h,t,col,lintelFrom){
  var segs=[],cur=a0;gaps=(gaps||[]).slice().sort(function(p,q){return p[0]-q[0]});
  gaps.forEach(function(gp){if(gp[0]>cur)segs.push([cur,gp[0]]);cur=gp[1]});if(cur<a1)segs.push([cur,a1]);
  function put(s0,s1,y0,y1){var L=s1-s0,hh=y1-y0,c=(s0+s1)/2;if(axis==='x')box(L,hh,t,col,c,y0+hh/2,fixed,g);else box(t,hh,L,col,fixed,y0+hh/2,c,g)}
  segs.forEach(function(s){put(s[0],s[1],0,h)});
  gaps.forEach(function(gp){var lf=gp[2]||lintelFrom||h-1.1;if(lf<h)put(gp[0],gp[1],lf,h)});
}
/* window: axis 'x' wall (faces +/-z by dir) or 'z' wall (faces +/-x) */
function addWin(g,axis,fixed,pos,y,w,h,dir){
  var wg=new T.Group();
  box(w,h,.7,winMat,0,0,0,wg,true);
  box(w+.5,.25,.84,TRIM,0,h/2+.1,0,wg,true);box(w+.5,.25,.84,TRIM,0,-h/2-.1,0,wg,true);
  box(.25,h,.84,TRIM,-w/2-.12,0,0,wg,true);box(.25,h,.84,TRIM,w/2+.12,0,0,wg,true);
  if(w>2.5)box(.1,h,.78,TRIM,0,0,0,wg,true);if(h>2.6)box(w,.1,.78,TRIM,0,h*.18,0,wg,true);
  box(w+.9,.2,.6,TRIM,0,-h/2-.3,.5,wg,true);
  if(axis==='x'){wg.position.set(pos,y,fixed);wg.rotation.y=dir>0?0:PI}else{wg.position.set(fixed,y,pos);wg.rotation.y=dir>0?PI/2:-PI/2}
  g.add(wg);
}
function extWall(name,nx,nz){var g=new T.Group();g.userData={nx:nx,nz:nz,s:1};extWalls[name]=g;scene.add(g);return g}

/* interior partitions */
function buildPartitions(){
  var g=houseStatic,t=.34;
  function seg(axis,fixed,a0,a1,gaps){var gg=new T.Group();run(gg,axis,fixed,a0,a1,gaps,INH,t,WALLC,INH);
    /* wooden cap */
    var cur=a0;(gaps||[]).slice().sort(function(p,q){return p[0]-q[0]}).concat([[a1,a1]]).forEach(function(gp){if(gp[0]>cur){var L=gp[0]-cur,c=(cur+gp[0])/2;if(axis==='x')box(L,.12,t+.12,CAPC,c,INH+.06,fixed,gg,true);else box(t+.12,.12,L,CAPC,fixed,INH+.06,c,gg,true)}cur=gp[1]});
    gg.position.y=.55;g.add(gg)}
  seg('z',-10,-13,0,[[-8,-5]]);seg('z',-10,0,13,[[5,8]]);
  seg('z',0,-13,0,[[-8,-5]]);seg('z',0,0,13,[[3,9]]);
  seg('z',11,-13,0,[[-8,-5]]);
  seg('x',0,-22,22,[[-17.5,-14.5],[-6.5,-3.5],[4,7],[15,18]]);
}
/* roof (mono-pitch, high at back) */
var roof=new T.Group(),roofMats=[],roofT=0,roofOpen=false;
function RM(c){var m=new T.MeshLambertMaterial({color:c,transparent:true,opacity:1});roofMats.push(m);return m}
/* roof pieces are built by spBuildStation() in b2s_space.js */

/* glow decals (warm light pools at night) */
(function(){
  var c=document.createElement('canvas');c.width=c.height=128;var x=c.getContext('2d'),g=x.createRadialGradient(64,64,4,64,64,64);
  g.addColorStop(0,'rgba(120,210,255,.85)');g.addColorStop(.55,'rgba(70,160,255,.3)');g.addColorStop(1,'rgba(40,120,255,0)');x.fillStyle=g;x.fillRect(0,0,128,128);
  var tex=new T.CanvasTexture(c);
  ['work','apps','growth','income','life','gym','bath'].forEach(function(k){var r=room(k);
    var m=new T.Mesh(new T.PlaneGeometry((r.x1-r.x0)*1.1,(r.z1-r.z0)*1.1),new T.MeshBasicMaterial({map:tex,transparent:true,opacity:0,blending:T.AdditiveBlending,depthWrite:false}));
    m.rotation.x=-PI/2;m.position.set(r.cx,.7,r.cz);m.renderOrder=2;scene.add(m);glowDecals.push(m)});
})();
