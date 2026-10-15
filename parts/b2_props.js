
/* ================= props ================= */
var DARK=0x2d3047;
var PROPS={}; /* filled by the theme part (b2s_space.js) */
var ROOMPROPS={
 work:['workbench','machine','conveyor','cabinet','workbench','machine'],
 apps:['deskMonitor','whiteboard','cabinet','bookshelf','whiteboard','cabinet'],
 growth:['bookshelf','laptopDesk','armchair','globe','bookshelf','deskMonitor'],
 income:['tableLaptop','ideaBoard','barLaptop','tableLaptop','ideaBoard','barLaptop'],
 life:['easel','armchair','plant','bookshelf','easel','plant'],
 garden:['planter','bench','birdbath','gardenTree','planter','gardenTree']
};

/* ================= trophy + tv + clock ================= */
var tvCanvas=document.createElement('canvas');tvCanvas.width=512;tvCanvas.height=288;
var tvTex=new T.CanvasTexture(tvCanvas);tvTex.anisotropy=4;
var tvMat=new T.MeshBasicMaterial({map:tvTex});
var trophyG=new T.Group();scene.add(trophyG);
var livingStatic=new T.Group();scene.add(livingStatic);
function drawTV(){
  var c=tvCanvas,x=c.getContext('2d'),W=c.width,H=c.height;
  var g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#151a2b');g.addColorStop(1,'#0e1120');x.fillStyle=g;x.fillRect(0,0,W,H);
  var q=qstats(S.projects),hh=Math.floor(TM.h),mm=Math.floor((TM.h-hh)*60);
  x.fillStyle='#f0a23c';x.font='800 22px Manrope,"Noto Sans Thai",sans-serif';x.textBaseline='middle';x.fillText('QUEST BOARD',22,28);
  x.fillStyle='#a09db4';x.font='500 20px "IBM Plex Mono",monospace';x.textAlign='right';x.fillText((hh<10?'0':'')+hh+':'+(mm<10?'0':'')+mm,W-22,28);x.textAlign='left';
  x.fillStyle='rgba(255,255,255,.12)';x.fillRect(22,50,W-44,7);x.fillStyle='#f0a23c';x.fillRect(22,50,(W-44)*(q.n?q.d/q.n:0),7);
  x.fillStyle='#eeebf6';x.font='700 44px Manrope,sans-serif';x.fillText(q.d+'/'+q.n,22,100);x.fillStyle='#a09db4';x.font='500 18px "Noto Sans Thai",sans-serif';x.fillText('เควสที่ขีดฆ่าแล้ว',150,104);
  var open=[];S.projects.forEach(function(p){(p.tasks||[]).forEach(function(t){if(!t.done&&open.length<3)open.push(t)})});
  x.font='500 21px "Noto Sans Thai",Manrope,sans-serif';
  open.forEach(function(t,i){var y=148+i*40;x.strokeStyle='#eeebf6';x.lineWidth=2.5;x.strokeRect(24,y-11,20,20);x.fillStyle='#eeebf6';var tx=t.text.length>26?t.text.slice(0,25)+'…':t.text;x.fillText(tx,58,y)});
  x.fillStyle='#6d6a80';x.font='600 15px Manrope,sans-serif';x.fillText('คลิกทีวีเพื่อเปิดแดชบอร์ด',22,H-18);
  tvTex.needsUpdate=true;
}
try{if(document.fonts&&document.fonts.ready)document.fonts.ready.then(drawTV)}catch(e){}

var tvPick=null,trophyPick=new T.Group();
function buildTrophyShelf(){
  var sh=new T.Group(),W=3.7,Dp=.8,FR=0x2c3650,BKC=0x161c2e;
  box(.12,4.0,Dp,FR,-W/2,2.0,0,sh);box(.12,4.0,Dp,FR,W/2,2.0,0,sh);box(W+.12,.14,Dp,FR,0,.15,0,sh);box(W+.3,.16,Dp+.1,FR,0,4.02,0,sh);box(W,3.9,.08,BKC,0,2.0,-Dp/2+.04,sh,true);
  [1.3,2.4,3.5].forEach(function(y){box(W,.1,Dp-.1,FR,0,y,0,sh,true);box(W-.2,.05,.06,GLOW(CYAN,.8),0,y-.02,Dp/2-.08,sh,true)});
  sh.position.set(.6,.55,11.0);sh.rotation.y=PI/2;scene.add(sh);
  mergeStatic(sh);
  var hit=new T.Mesh(G(1.8,4.4,W+.6),new T.MeshBasicMaterial({visible:false}));hit.position.set(0,2.2,0);hit.rotation.y=PI/2;hit.userData.keep=true;sh.add(hit);
  sh.userData.sel='__trophy';trophyPick=sh;
  sh.add(trophyG);trophyG.position.set(0,0,0);
}
function rebuildTrophies(){
  while(trophyG.children.length)trophyG.remove(trophyG.children[0]);
  var done=S.projects.filter(function(p){return p.status==='done'}).slice(0,8),bl=badgeList();
  done.forEach(function(p,i){var cup=new T.Group(),c=room(p.dist).c;cyl(.3,.16,.4,0xf5b82e,0,.45,0,cup,10);cyl(.16,.16,.24,0xe0a020,0,.2,0,cup,8);box(.56,.12,.4,c,0,.06,0,cup,true);
    var hnd=new T.Mesh(new T.TorusGeometry(.15,.035,6,10),M(0xf5b82e));hnd.position.set(-.33,.48,0);cup.add(hnd);var h2=hnd.clone();h2.position.x=.33;cup.add(h2);
    cup.position.set(-1.05+(i%4)*.7,(i<4?1.35:2.45),.0);trophyG.add(cup)});
  bl.forEach(function(b,i){var m=new T.Group(),col=b.ok?0xf5b82e:0x8f8aa0;cyl(.15,.15,.05,col,0,0,0,m,14).rotation.x=PI/2;cyl(.09,.09,.07,b.ok?0xfff0b8:0xb5b0c4,0,0,.02,m,14).rotation.x=PI/2;
    if(b.ok)box(.07,.24,.02,0xd9534f,0,-.24,-.02,m,true);
    m.position.set(-1.36+i*.34,3.05,-.28);trophyG.add(m)});
  mergeStatic(trophyG);
}
