
/* ================= SPACE STATION theme: props, rooms decor, lot ================= */
/* Everything here only runs when SP (space theme) is on. Layout, slots, doorways and walking nodes are
   identical to the legacy house, so only looks change. Keep furniture out of doorways (see TECHNICAL.md). */
if(SP){
var HULL=0xdbe3ee,HULL2=0xaab6c8,PANEL=0x6f7e98,MET=0x2b3446,MET2=0x3d4963,MET3=0x1a2030,AMB=0xffb347,GRN=0x56e39f,MAG=0xc06bff,BLU=0x3a8bff,ORG=0xff7a3c,SOFA=0x2c4a88;
function sg(c,k){return GLOW(c,k||.8)}

function spChair(g,x,z,c,ry){var s=new T.Group();box(.95,.16,.95,MET2,0,.9,0,s);box(.95,.95,.14,MET2,0,1.4,-.43,s);box(.75,.06,.06,sg(c,.9),0,1.5,-.35,s,true);cyl(.07,.07,.8,PANEL,0,.45,0,s,6);cyl(.45,.45,.06,MET3,0,.04,0,s,10);s.position.set(x,0,z);s.rotation.y=ry||0;g.add(s)}
function spDesk(g,w){box(w,.14,1.5,MET,0,1.0,0,g);box(w-.2,.05,.05,sg(CYAN,.9),0,1.0,.74,g,true);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(p){box(.12,.95,.12,MET3,p[0]*(w/2-.15),.5,p[1]*.6,g,true)})}
function spMonitor(g,x,y,z,w,h,c,ry){var m=new T.Group();box(w,h,.08,MET3,0,0,0,m);box(w-.16,h-.14,.03,sg(c,.75),0,0,.05,m,true);box(.1,.5,.1,PANEL,0,-h/2-.2,-.05,m,true);m.position.set(x,y,z);m.rotation.y=ry||0;g.add(m)}
function spPot(g,x,z,s,c){var p=new T.Group();cyl(.55,.4,.8,HULL,0,.4,0,p,12);cyl(.58,.58,.08,sg(CYAN,.8),0,.78,0,p,12);ball(.75,0x3fd17f,0,1.5,0,p);ball(.5,0x86e6b0,.4,2.0,.1,p);ball(.38,0x2fbf7a,-.4,1.9,-.1,p);p.position.set(x,0,z);p.scale.setScalar(s||1);g.add(p)}
function spHolo(g,x,y,z,w,h,c,ry){var m=new T.Group();box(w,h,.06,MET3,0,0,0,m);box(w-.2,h-.2,.03,sg(c,.42),0,0,.05,m,true);m.position.set(x,y,z);m.rotation.y=ry||0;g.add(m)}

/* ---------- project props (same keys as legacy PROPS) ---------- */
PROPS.deskMonitor=function(g,c){spDesk(g,3.0);spMonitor(g,0,1.95,-.3,1.5,.9,c);spMonitor(g,-1.35,1.9,-.12,1.0,.75,BLU,.5);spMonitor(g,1.35,1.9,-.12,1.0,.75,MAG,-.5);
  box(.9,.05,.3,MET2,0,1.1,.35,g,true);box(.8,.02,.2,sg(CYAN,.5),0,1.13,.35,g,true);cyl(.16,.13,.28,HULL,1.15,1.2,.3,g,10);spChair(g,0,1.5,c,PI);return 2.8};
PROPS.laptopDesk=function(g,c){spDesk(g,2.8);box(1.1,.06,.8,PANEL,0,1.07,.1,g,true);var lid=box(1.1,.7,.05,MET3,0,1.45,-.3,g);lid.rotation.x=-.3;var sc2=box(.96,.56,.02,sg(c,.75),0,1.46,-.27,g,true);sc2.rotation.x=-.3;
  cyl(.14,.12,.25,HULL,1.0,1.2,.2,g,10);ball(.18,sg(AMB,.9),-.9,1.3,.2,g);spChair(g,0,1.5,c,PI);return 2.2};
PROPS.tradingDesk=function(g,c){spDesk(g,3.2);[[-1,0x3ddc97],[0,0xff6b6b],[1,c]].forEach(function(m){spMonitor(g,m[0]*1.0,1.8,-.35,.95,.65,m[1],-m[0]*.18)});spChair(g,0,1.5,c,PI);return 2.5};
PROPS.whiteboard=function(g,c){box(2.8,1.7,.1,MET3,0,2.3,0,g);box(2.6,1.5,.04,sg(BLU,.32),0,2.3,.06,g,true);box(2.9,.1,.14,PANEL,0,1.43,0,g,true);cyl(.06,.06,1.5,PANEL,-1.1,.75,-.1,g,6);cyl(.06,.06,1.5,PANEL,1.1,.75,-.1,g,6);
  [[-.8,2.7,0xffd23f],[-.2,2.5,c],[.5,2.7,0xff8fa3],[.9,2.2,0x7cf0b0]].forEach(function(n){box(.5,.5,.03,sg(n[2],.9),n[0],n[1],.09,g,true)});box(1.6,.05,.02,sg(CYAN,.9),0,1.9,.08,g,true);return 3.3};
PROPS.bookshelf=function(g,c){box(.12,3.2,.8,MET2,-1.25,1.7,0,g);box(.12,3.2,.8,MET2,1.25,1.7,0,g);box(2.6,.12,.8,MET2,0,.15,0,g);box(2.6,.12,.8,MET2,0,3.3,0,g);box(2.5,3.1,.06,MET3,0,1.7,-.37,g,true);
  var cols=[c,0xf5b82e,0x3b8bff,0xe0507a,0x56e39f,0xffffff,0x14c7b8];
  [.55,1.45,2.35].forEach(function(y,r){box(2.4,.08,.78,MET2,0,y-.08,0,g,true);box(2.4,.03,.04,sg(CYAN,.6),0,y-.02,.38,g,true);for(var i=0;i<8;i++){var h=.5+((i*7+r*3)%4)*.08;box(.18,h,.5,sg(cols[(i+r*2)%cols.length],.4),-1.0+i*.29,y-.04+h/2,0,g,true)}});return 3.5};
PROPS.globe=function(g,c){cyl(.9,.9,.1,MET2,0,.8,0,g,16);cyl(.12,.12,.8,PANEL,0,.4,0,g,6);box(1.8,.12,1.2,MET,0,.76,0,g);cyl(.55,.55,.1,MET3,0,.04,0,g,16);
  ball(.75,sg(BLU,.42),0,1.8,0,g);ball(.28,sg(GRN,.55),.3,1.95,.5,g);ball(.2,sg(GRN,.55),-.45,1.6,.4,g);
  var r1=new T.Mesh(new T.TorusGeometry(.9,.03,6,28),sg(CYAN,.9));r1.position.set(0,1.8,0);r1.rotation.y=PI/2;g.add(r1);var r2=new T.Mesh(new T.TorusGeometry(.9,.03,6,28),sg(CYAN,.9));r2.position.set(0,1.8,0);r2.rotation.x=PI/2.6;g.add(r2);return 2.9};
PROPS.armchair=function(g,c){box(1.7,.6,1.6,c,0,.6,0,g);box(1.7,1.2,.4,c,0,1.2,-.62,g);box(.35,.9,1.6,MET2,-.9,.95,0,g);box(.35,.9,1.6,MET2,.9,.95,0,g);box(1.2,.25,1.2,0xe6edf8,0,1.0,.1,g,true);box(1.5,.05,.05,sg(CYAN,.9),0,.35,.82,g,true);[[-.7,-.6],[.7,-.6],[-.7,.6],[.7,.6]].forEach(function(p){box(.1,.3,.1,MET3,p[0],.15,p[1],g,true)});return 2.0};
PROPS.easel=function(g,c){var l=box(.1,3,.1,PANEL,-.8,1.5,0,g);l.rotation.z=-.12;var r=box(.1,3,.1,PANEL,.8,1.5,0,g);r.rotation.z=.12;var b=box(.1,2.4,.1,PANEL,0,1.2,-.7,g);b.rotation.x=.3;
  box(1.8,1.3,.08,MET3,0,2.0,.05,g);box(1.64,1.14,.04,sg(c,.35),0,2.0,.09,g,true);box(.8,.5,.02,sg(c,.9),-.3,2.15,.12,g,true);box(.5,.5,.02,sg(0xf5b82e,.9),.4,1.8,.12,g,true);box(2,.08,.3,MET2,0,1.25,.1,g,true);return 3.2};
PROPS.workbench=function(g,c){box(2.9,.2,1.5,MET2,0,1.0,0,g);box(2.9,.04,.3,0xe7c24a,0,1.12,.55,g,true);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(p){box(.14,.95,.14,MET3,p[0]*1.25,.5,p[1]*.6,g,true)});
  box(2.8,1.4,.1,MET3,0,2.1,-.7,g);[[-1,0xff6b4a],[-.4,0xf5b82e],[.2,c],[.8,0x56e39f]].forEach(function(t){box(.18,.7,.08,sg(t[1],.7),t[0],2.1,-.62,g,true)});box(.5,.35,.4,PANEL,1.0,1.28,.2,g,true);box(.5,.3,.5,sg(ORG,.6),-.8,1.25,.2,g,true);return 2.9};
PROPS.machine=function(g,c){box(2.4,.4,1.8,MET,0,.35,0,g);cyl(.5,.5,1.8,sg(c,.55),0,1.4,0,g,14);[.7,1.4,2.1].forEach(function(y){cyl(.66,.66,.12,MET2,0,y,0,g,14)});cyl(.18,.18,2.2,PANEL,-.95,1.6,-.4,g,10);
  box(.9,.6,.1,MET3,.7,.95,.95,g,true);ball(.1,sg(0x3ddc97,.9),.45,.95,1.02,g);ball(.1,sg(0xff6b6b,.9),.85,.95,1.02,g);box(2.5,.12,1.9,MET3,0,.1,0,g,true);return 2.7};
PROPS.conveyor=function(g,c){box(3.4,.4,1.1,MET,0,.95,0,g);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(p){box(.12,.9,.12,PANEL,p[0]*1.5,.45,p[1]*.45,g,true)});for(var i=0;i<6;i++)cyl(.1,.1,1.0,PANEL,-1.4+i*.56,1.17,0,g,8).rotation.x=PI/2;
  box(.9,.6,.8,0xe0742f,-.9,1.5,0,g);box(.8,.5,.7,0xdbe3ee,.7,1.45,0,g);box(.92,.08,.82,0x1a2030,-.9,1.62,0,g,true);box(3.4,.2,.08,sg(c,.8),0,1.3,.58,g,true);return 2.2};
PROPS.cabinet=function(g,c){box(2.4,2.6,.9,0x56647f,0,1.6,0,g);box(.05,2.5,.02,MET3,0,1.6,.46,g,true);box(.1,.4,.06,sg(CYAN,.9),-.2,1.6,.48,g,true);box(.1,.4,.06,sg(CYAN,.9),.2,1.6,.48,g,true);box(2.45,.12,.95,c,0,2.95,0,g,true);box(.8,.5,.6,0xe0742f,-.6,3.25,0,g);box(.7,.4,.6,HULL,.5,3.2,0,g);return 3.5};
PROPS.plant=function(g,c){spPot(g,0,0,1);return 2.6};
PROPS.planter=function(g,c){box(2.8,.7,1.4,MET2,0,.35,0,g);box(2.5,.12,1.1,0x1c3b44,0,.72,0,g,true);box(2.5,.06,.1,sg(CYAN,.7),0,.5,.72,g,true);var cols=[c,0xf5b82e,0xffffff,0xff9ac6,0xb08cff];
  for(var i=0;i<9;i++){var x=-1.1+(i%5)*.55,z=(i<5?-.25:.25);cyl(.03,.03,.5,0x3fd17f,x,.95,z,g,5);ball(.2,sg(cols[i%cols.length],.55),x,1.25,z,g)}
  cyl(.05,.05,2.0,PANEL,-1.3,1.5,-.6,g,6);cyl(.05,.05,2.0,PANEL,1.3,1.5,-.6,g,6);box(2.8,.08,.3,sg(0xff6bd0,.9),0,2.5,-.6,g,true);return 2.7};
PROPS.bench=function(g,c){box(2.8,.18,1.0,HULL2,0,.95,0,g);box(2.8,.9,.14,HULL2,0,1.5,-.45,g);[-1.2,1.2].forEach(function(x){box(.14,.9,.9,MET3,x,.45,0,g,true)});box(.7,.25,.5,c,-.7,1.2,.1,g,true);box(2.6,.05,.05,sg(CYAN,.8),0,.8,.5,g,true);return 2.4};
PROPS.birdbath=function(g,c){cyl(.35,.5,1.1,MET2,0,.55,0,g,10);cyl(1.0,.3,.3,MET2,0,1.25,0,g,14);cyl(.8,.8,.05,sg(0x3bd0ff,.6),0,1.42,0,g,14);ball(.5,sg(CYAN,.55),0,2.1,0,g);var rg=new T.Mesh(new T.TorusGeometry(.7,.03,6,24),sg(CYAN,.9));rg.position.set(0,2.1,0);rg.rotation.x=PI/2;g.add(rg);ball(.16,c,.5,2.5,.1,g);return 2.9};
PROPS.gardenTree=function(g,c){cyl(.25,.34,1.6,0x3a2f4a,0,.8,0,g,6);ball(1.4,sg(0x2fd9a0,.32),0,2.6,0,g);ball(1.0,sg(0x3fe6b8,.32),.7,3.4,.2,g);ball(.5,sg(c,.9),.9,2.2,1.1,g);ball(.4,sg(c,.9),-.8,2.9,.9,g);return 4.2};
PROPS.tableLaptop=function(g,c){
  box(3.2,.14,1.8,0xe4ebf4,0,1.0,0,g);box(3.0,.05,.05,sg(CYAN,.7),0,.95,.9,g,true);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(p){box(.14,.95,.14,MET3,p[0]*1.4,.5,p[1]*.75,g,true)});
  box(1.1,.06,.8,PANEL,-.4,1.07,.15,g,true);var lid=box(1.1,.7,.05,MET3,-.4,1.45,-.25,g);lid.rotation.x=-.3;var sc3=box(.96,.56,.02,sg(c,.75),-.4,1.46,-.22,g,true);sc3.rotation.x=-.3;
  cyl(.14,.12,.25,HULL,.7,1.2,.3,g,10);cyl(.4,.28,.22,0xe0742f,1.1,1.15,-.3,g,12);ball(.15,sg(0xff5a5a,.5),1.0,1.35,-.3,g);ball(.15,sg(AMB,.6),1.25,1.33,-.25,g);
  spChair(g,0,1.6,c,PI);spChair(g,0,-1.6,c,0);return 2.4};
PROPS.barLaptop=function(g,c){
  box(3.4,.18,1.3,0xe4ebf4,0,1.75,0,g);box(3.2,1.7,.2,MET2,0,.9,-.5,g);[-1.5,1.5].forEach(function(x){box(.16,1.7,1.0,MET2,x,.9,0,g,true)});box(3.0,.06,.06,sg(CYAN,.85),0,1.6,.62,g,true);
  box(1.1,.06,.8,PANEL,-.4,1.87,.05,g,true);var lid=box(1.1,.7,.05,MET3,-.4,2.25,-.3,g);lid.rotation.x=-.3;var sc4=box(.96,.56,.02,sg(c,.75),-.4,2.26,-.27,g,true);sc4.rotation.x=-.3;cyl(.14,.12,.2,HULL,.9,2.0,.1,g,10);
  [-.9,.9].forEach(function(x){var st2=new T.Group();cyl(.4,.4,.14,c,0,1.25,0,st2,12);cyl(.07,.07,1.1,PANEL,0,.6,0,st2,6);cyl(.3,.3,.06,PANEL,0,.05,0,st2,10);st2.position.set(x,0,1.6);g.add(st2)});return 3.0};
PROPS.ideaBoard=function(g,c){
  box(2.9,1.9,.12,MET3,0,2.4,0,g);box(2.6,1.6,.06,sg(BLU,.3),0,2.4,.08,g,true);cyl(.06,.06,1.5,PANEL,-1.1,.75,-.1,g,6);cyl(.06,.06,1.5,PANEL,1.1,.75,-.1,g,6);
  [[-.8,2.9,0xffd23f],[-.2,2.6,c],[.5,2.9,0xff8fa3],[.9,2.4,0x7cf0b0],[-.7,2.2,0xffffff],[.1,2.2,0xffd23f]].forEach(function(n){box(.5,.5,.03,sg(n[2],.85),n[0],n[1],.11,g,true)});
  box(1.6,.04,.02,sg(CYAN,.9),0,2.7,.1,g,true);ball(.2,lampMat,0,3.65,0,g);box(.3,.2,.3,PANEL,0,3.4,0,g,true);return 3.9};
PROPS.gymHub=function(g,c){box(3.4,.1,1.6,c,0,.06,0,g,true);box(3.2,.06,1.4,0x3d4963,0,.14,0,g,true);cyl(.22,.22,1.2,MET3,-1.2,.3,.1,g,8).rotation.z=PI/2;ball(.3,MET3,.8,.4,.1,g);box(.1,.12,.5,PANEL,.8,.76,.1,g,true);cyl(.3,.3,.12,sg(0xff5a5a,.5),1.3,.3,-.1,g,10);
  box(1.5,.7,.1,MET3,0,2.2,-.7,g);box(1.2,.45,.12,sg(c,.8),0,2.25,-.65,g,true);return 2.8};
PROPS.bathHub=function(g,c){cyl(1.6,1.6,.1,MET2,0,.07,0,g,24);cyl(1.45,1.45,.04,sg(CYAN,.6),0,.15,0,g,24);cyl(.85,.9,.45,c,0,.32,0,g,18);cyl(.6,.65,.16,HULL,0,.62,0,g,16);
  ball(.3,sg(CYAN,.8),0,1.5,0,g);[[-1.2,.5],[1.3,.2],[.2,-1.3]].forEach(function(q){cyl(.12,.12,.34,HULL,q[0],.27,q[1],g,8);var fl=ball(.09,sg(AMB,.95),q[0],.5,q[1],g);fl.castShadow=false});return 1.9};
PROPS.poolHub=function(g,c){return 0.2};
ROOMPROPS.work=['workbench','machine','conveyor','cabinet','workbench','machine'];

/* ---------- lounge (living room) + TV dashboard ---------- */
function spaceLiving(){
  var g=livingStatic;
  box(9.2,.06,5.6,0x1b2640,11,.62,5.4,g,true);box(8.2,.07,4.6,0x24365e,11,.64,5.4,g,true);
  [[0,-2.3,8.2,.1],[0,2.3,8.2,.1],[-4.1,0,.1,4.6],[4.1,0,.1,4.6]].forEach(function(a){box(a[2],.03,a[3],sg(CYAN,.6),11+a[0],.7,5.4+a[1],g,true)});
  var sofa=new T.Group();box(4.2,.8,1.7,SOFA,0,.65,0,sofa);box(4.2,1.2,.45,SOFA,0,1.5,-.62,sofa);box(.5,1.1,1.7,0x233b6e,-2.1,1.1,0,sofa);box(.5,1.1,1.7,0x233b6e,2.1,1.1,0,sofa);
  box(1.8,.32,1.3,0x4b72c4,-.95,1.2,.1,sofa,true);box(1.8,.32,1.3,0x4b72c4,.95,1.2,.1,sofa,true);box(.7,.7,.25,AMB,-1.6,1.55,-.2,sofa,true);box(.7,.7,.25,0x5fe0ff,1.5,1.5,-.2,sofa,true);box(4.0,.05,.05,sg(CYAN,.8),0,.3,.85,sofa,true);
  sofa.position.set(11,.55,7.9);sofa.rotation.y=PI;g.add(sofa);
  var tb=new T.Group();box(2.6,.14,1.4,0x1c2438,0,.9,0,tb);box(2.4,.04,1.2,sg(CYAN,.65),0,.82,0,tb,true);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(p){box(.12,.85,.12,MET3,p[0]*1.1,.45,p[1]*.55,tb,true)});box(.7,.12,.5,0x56e39f,-.4,1.02,0,tb,true);cyl(.18,.14,.3,HULL,.6,1.1,.1,tb,10);tb.position.set(11,.55,4.3);g.add(tb);
  var ac=new T.Group();PROPS.armchair(ac,0xd9822b);ac.position.set(6.2,.55,6.4);ac.rotation.y=PI/2*1.2;g.add(ac);
  spPot(g,21,11.8,1);spPot(g,1.4,1.4,.9);floorLamp(g,16.4,10.6,1);floorLamp(g,5.5,1.2,.9);
  var db=new T.Group();cyl(1.4,1.5,.4,MET2,0,.2,0,db,18);cyl(1.15,1.15,.3,0x5b4a8a,0,.42,0,db,18);cyl(1.55,1.55,.05,sg(CYAN,.7),0,.06,0,db,18);db.position.set(3.4,.55,10.2);g.add(db);
  /* tv console + glowing amber wall display behind */
  var tvg=new T.Group();box(5.4,.95,1.4,MET2,0,.5,0,tvg);box(5.2,.1,1.5,MET3,0,1.0,0,tvg,true);[[-1.8],[0],[1.8]].forEach(function(a){box(1.5,.6,.06,MET,a[0],.55,.72,tvg,true);box(.9,.05,.06,sg(CYAN,.8),a[0],.7,.76,tvg,true)});
  box(6.4,3.4,.08,MET3,0,2.6,-.82,tvg,true);box(6.0,3.0,.04,sg(AMB,.42),0,2.6,-.78,tvg,true);
  box(4.2,2.4,.2,MET3,0,2.45,0,tvg);box(.5,.45,.5,PANEL,0,1.25,0,tvg,true);
  var scr=new T.Mesh(new T.PlaneGeometry(3.9,2.1),tvMat);scr.position.set(0,2.45,.11);scr.userData.keep=true;tvg.add(scr);
  box(.9,1.6,.9,MET2,-3.1,1.1,0,tvg);box(.9,1.6,.9,MET2,3.1,1.1,0,tvg);ball(.28,sg(CYAN,.9),-3.1,2.3,0,tvg);ball(.28,sg(CYAN,.9),3.1,2.3,0,tvg);
  tvg.position.set(11,.55,1.2);tvg.userData.sel='__tv';mergeStatic(tvg);
  var hitTv=new T.Mesh(G(7.4,4.4,2.6),new T.MeshBasicMaterial({visible:false}));hitTv.position.set(0,2.4,.4);hitTv.userData.keep=true;tvg.add(hitTv);
  scene.add(tvg);tvPick=tvg;
  /* clock tower */
  var cg=new T.Group();box(1.5,5.0,1.0,MET2,0,2.5,0,cg);box(1.7,.3,1.2,PANEL,0,5.1,0,cg,true);box(1.7,.3,1.2,PANEL,0,.1,0,cg,true);
  var face=cyl(.6,.6,.1,0x0c1224,0,3.9,.52,cg,24);face.rotation.x=PI/2;
  for(var i=0;i<12;i++){var a=i/12*PI*2;box(.06,.12,.04,sg(CYAN,.9),Math.sin(a)*.48,3.9+Math.cos(a)*.48,.6,cg,true).rotation.z=-a}
  box(.7,1.3,.06,MET3,0,2.1,.52,cg,true);box(.5,.1,.04,sg(AMB,.9),0,2.5,.56,cg,true);box(.5,.1,.04,sg(CYAN,.9),0,2.1,.56,cg,true);box(.5,.1,.04,sg(GRN,.9),0,1.7,.56,cg,true);
  mergeStatic(cg);
  var hr=new T.Group(),mn=new T.Group();hr.position.set(0,3.9,.62);mn.position.set(0,3.9,.64);
  var hm=box(.1,.3,.04,sg(0xffffff,.95),0,.15,0,hr,true);hm.userData.keep=true;
  var mm2=box(.07,.46,.04,sg(0xffffff,.95),0,.23,0,mn,true);mm2.userData.keep=true;cg.add(hr);cg.add(mn);clockHands={hr:hr,mn:mn};
  cg.position.set(20.8,.55,1.6);scene.add(cg);
  mergeStatic(g);
}

/* ---------- other rooms ---------- */
function spaceOther(){
  var g=new T.Group();scene.add(g);
  /* ---- crew quarters ---- */
  var bd=new T.Group();box(4.8,.7,6.4,MET3,0,.45,0,bd);box(4.5,.55,6.0,0xe6edf8,0,.95,0,bd,true);box(4.8,2.2,.3,MET2,0,1.55,-3.1,bd);box(4.0,1.2,.06,sg(AMB,.62),0,1.9,-2.93,bd,true);
  box(4.5,.3,3.8,0x2b5fa8,0,1.28,1.0,bd,true);box(1.8,.35,1.0,0xffffff,-1.1,1.4,-2.3,bd,true);box(1.8,.35,1.0,0xffffff,1.1,1.4,-2.3,bd,true);box(4.5,.1,.5,0x6fb2ff,0,1.46,-.7,bd,true);box(4.6,.06,6.2,sg(CYAN,.55),0,.1,0,bd,true);
  bd.position.set(7.8,.55,-9.7);g.add(bd);
  var ns=new T.Group();box(1.3,1.1,1.1,MET2,0,.55,0,ns);box(1.1,.05,.05,sg(CYAN,.8),0,.9,.56,ns,true);cyl(.3,.3,.7,lampMat,0,1.6,0,ns,10);ns.position.set(10.3,.55,-11.9);g.add(ns);
  var rg=cyl(2.2,2.2,.05,0x2a3452,0,.6,0,g,24);rg.position.set(4,.62,-6.5);rg.scale.set(1,1,.8);var rg2=cyl(1.7,1.7,.055,0x35456f,0,.6,0,g,24);rg2.position.set(4,.64,-6.5);rg2.scale.set(1,1,.8);
  var wd=new T.Group();box(2.6,4.4,1.2,0xc3cfde,0,2.2,0,wd);box(.06,4.2,.04,sg(CYAN,.85),0,2.2,.62,wd,true);box(.14,.5,.08,PANEL,-.3,2.2,.66,wd,true);box(.14,.5,.08,PANEL,.3,2.2,.66,wd,true);wd.position.set(9.6,.55,-1.1);g.add(wd);
  /* ---- galley (kitchen) ---- */
  var CT=0xdfe7f1;
  function counter(z,len,sink){var k=new T.Group();box(1.5,1.8,len,CT,0,.9,0,k);box(1.7,.14,len+.1,0xf6f9fd,0,1.82,0,k,true);box(.1,.7,len-.3,MET3,.78,.55,0,k,true);
    for(var d=-1;d<=1;d+=2){box(.04,.9,len/2-.3,0x9fb0c8,.78,1.2,d*len/4,k,true);box(.03,.08,len/2-.6,sg(CYAN,.8),.8,1.55,d*len/4,k,true)}
    if(sink){box(1.0,.1,1.6,0x8795ad,.1,1.9,0,k,true);cyl(.05,.05,.7,PANEL,-.45,2.25,0,k,6);box(.3,.05,.3,PANEL,-.2,2.62,0,k,true);cyl(.22,.22,.1,HULL,.2,1.96,1.2,k,10);box(.8,.5,.5,0xc3cfde,.1,2.1,-1.1,k,true)}
    else{[-.8,.8].forEach(function(zz){[-.3,.4].forEach(function(xx){var cc=cyl(.28,.28,.06,sg(0xff6b4a,.55),xx,1.92,zz,k,12);cc.castShadow=false})});cyl(.4,.4,.5,PANEL,-.3,2.2,-.8,k,12);cyl(.42,.42,.08,MET2,-.3,2.5,-.8,k,12);box(.5,.1,.14,MET3,.95,2.0,.8,k,true);cyl(.34,.3,.4,0xe0742f,.4,2.1,.8,k,12);box(.9,.5,.1,MET3,.76,1.3,0,k,true);box(.1,.7,.2,PANEL,.76,1.5,-.9,k,true)}
    k.position.set(-9.0,.55,z);return k}
  g.add(counter(2.8,3.4,true));g.add(counter(9.2,3.2,false));
  var fr=new T.Group();box(1.8,4.6,1.7,0xcfd8e4,0,2.3,0,fr);box(1.82,.06,1.72,PANEL,0,3.0,0,fr,true);box(.1,.9,.1,PANEL,.7,3.8,.9,fr,true);box(.1,1.1,.1,PANEL,.7,1.7,.9,fr,true);box(.04,.7,.5,sg(CYAN,.9),.9,3.9,0,fr,true);box(.04,.4,.3,sg(GRN,.9),.9,3.1,.2,fr,true);fr.position.set(-9.0,.55,12.0);g.add(fr);
  var is=new T.Group();box(4.0,1.9,1.7,CT,0,.95,0,is);box(4.4,.16,2.0,0xf6f9fd,0,1.95,0,is,true);box(3.8,.8,.1,MET2,0,.55,.88,is,true);box(3.6,.05,.05,sg(CYAN,.8),0,1.2,.92,is,true);
  [-1.2,1.2].forEach(function(x){var st2=new T.Group();cyl(.4,.4,.14,AMB,0,1.25,0,st2,12);cyl(.07,.07,1.1,PANEL,0,.6,0,st2,6);cyl(.3,.3,.06,PANEL,0,.05,0,st2,10);st2.position.set(x,0,1.7);is.add(st2)});
  cyl(.5,.4,.3,0xc3cfde,-.9,2.2,0,is,12);ball(.2,sg(0xff5a5a,.5),-1.0,2.45,0,is);ball(.2,sg(AMB,.6),-.75,2.42,.1,is);cyl(.3,.4,.3,HULL,1.0,2.12,.1,is,10);box(.9,.1,.5,MET2,.2,2.08,-.4,is,true);box(.6,.1,.5,0xe7eef0,.2,2.12,.1,is,true);
  is.position.set(-4.6,.55,6.7);g.add(is);
  var bc=new T.Group();box(2.4,1.8,1.4,CT,0,.9,0,bc);box(2.6,.14,1.5,0xf6f9fd,0,1.82,0,bc,true);box(.9,.5,.7,0xe8e8ee,-.6,2.15,0,bc,true);box(.5,.8,.5,MET3,.6,2.3,-.1,bc,true);box(.1,.12,.5,sg(0xff5a5a,.8),.6,2.5,.2,bc,true);cyl(.15,.12,.2,HULL,.2,2.0,.4,bc,8);bc.position.set(-1.7,.55,1.0);g.add(bc);
  var pn=new T.Group();box(1.8,4.4,1.1,0xc3cfde,0,2.2,0,pn);box(.04,4.0,.04,sg(CYAN,.8),0,2.2,.57,pn,true);box(.1,.5,.06,PANEL,-.2,2.2,.6,pn,true);box(.1,.5,.06,PANEL,.2,2.2,.6,pn,true);pn.position.set(-1.0,.55,12.0);g.add(pn);
  box(6.4,.05,3.8,0x8fa0b8,-4.6,.62,7.6,g,true);spPot(g,-9.0,.9,.8);
  /* ---- hangar ---- */
  var tw=new T.Group();box(.2,2.6,4.2,MET3,0,3.3,0,tw);[[-1.4,ORG],[-.5,AMB],[.4,BLU],[1.3,GRN]].forEach(function(t){box(.1,1.3,.2,sg(t[1],.65),.16,3.4,t[0],tw,true)});tw.position.set(-21.6,.55,2.8);g.add(tw);
  [[-12.6,10.8],[-11.6,11.6]].forEach(function(p){cyl(.55,.55,1.5,HULL,p[0],1.3,p[1],g,10);cyl(.57,.57,.3,ORG,p[0],1.55,p[1],g,10)});
  /* ---- computer bay: rec corner (TV + PS5 + sofa) ---- */
  box(6.4,.05,4.2,0x2a3a5c,-5,.62,-9.4,g,true);box(5.6,.06,3.4,0x3a5088,-5,.64,-9.4,g,true);
  var tu=new T.Group();box(5.0,.95,1.3,MET2,0,.5,0,tu);box(4.8,.1,1.4,MET3,0,1.0,0,tu,true);[-1.6,0,1.6].forEach(function(a2){box(1.3,.6,.06,MET,a2,.55,.67,tu,true)});
  box(3.8,2.1,.16,MET3,-.35,2.3,0,tu);box(3.5,1.8,.06,sg(BLU,.7),-.35,2.3,.09,tu,true);box(1.4,.5,.04,sg(0xff5ca8,.8),-.9,2.6,.13,tu,true);box(1.0,.9,.04,sg(0x3ddc97,.8),.5,2.2,.13,tu,true);box(.5,.4,.4,PANEL,-.35,1.2,0,tu,true);
  var ps=new T.Group();box(.18,1.5,1.0,0xffffff,-.2,0,0,ps,true);box(.18,1.5,1.0,0xffffff,.2,0,0,ps,true);box(.24,1.4,.9,0x1b1d28,0,0,0,ps,true);box(.04,1.2,.04,sg(BLU,.9),0,0,.5,ps,true);box(.5,.14,1.1,0xd8dce6,0,-.8,0,ps,true);ps.position.set(1.95,1.85,.1);tu.add(ps);
  box(.3,.2,.14,0xffffff,1.0,1.1,.4,tu,true);box(.12,.05,.1,BLU,1.0,1.21,.4,tu,true);tu.position.set(-5,.55,-11.9);g.add(tu);
  var sf=new T.Group();box(4.0,.8,1.7,0x5a4a9c,0,.65,0,sf);box(4.0,1.2,.45,0x5a4a9c,0,1.5,-.62,sf);box(.5,1.1,1.7,0x463a82,-2.0,1.1,0,sf);box(.5,1.1,1.7,0x463a82,2.0,1.1,0,sf);box(1.7,.32,1.3,0x7d6ccc,-.9,1.2,.1,sf,true);box(1.7,.32,1.3,0x7d6ccc,.9,1.2,.1,sf,true);box(.7,.7,.25,AMB,-1.5,1.55,-.2,sf,true);box(.7,.7,.25,0x5fe0ff,1.5,1.5,-.2,sf,true);sf.position.set(-5,.55,-7.2);sf.rotation.y=PI;g.add(sf);
  var ct=new T.Group();box(2.4,.14,1.2,0x1c2438,0,.8,0,ct);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(q){box(.12,.75,.12,MET3,q[0]*1.0,.4,q[1]*.45,ct,true)});box(.45,.12,.3,0xffffff,-.4,.92,0,ct,true);box(.3,.1,.2,0x1b1d28,.3,.92,.1,ct,true);box(.25,.25,.25,sg(0xff5a5a,.5),.9,.98,-.2,ct,true);ct.position.set(-5,.55,-9.6);g.add(ct);
  spPot(g,-9.0,-0.9,.9);floorLamp(g,-1.3,-11.8,1);
  /* ---- gym ---- */
  var tm=new T.Group();box(2.2,.35,4.2,MET3,0,.4,0);box(1.7,.12,3.6,0x4c556b,0,.64,.1,tm,true);cyl(.08,.08,2.6,PANEL,-.85,1.8,-1.7,tm,6);cyl(.08,.08,2.6,PANEL,.85,1.8,-1.7,tm,6);box(1.9,.6,.5,MET3,0,3.2,-1.7,tm);box(1.5,.35,.06,sg(0x3f9fff,.85),0,3.2,-1.43,tm,true);
  tm.add(box(2.2,.35,4.2,MET3,0,.4,0));tm.position.set(-19.8,.55,-9.4);g.add(tm);
  var bp=new T.Group();box(1.2,.5,3.2,MET3,0,.9,0.4,bp);box(1.0,.15,2.8,0xd9433f,0,1.2,.4,bp,true);[-1.2,1.2].forEach(function(x){box(.14,2.2,.14,PANEL,x,1.4,-.9,bp,true)});box(3.6,.1,.1,PANEL,0,2.5,-.9,bp,true);[-1.4,-1.1,1.1,1.4].forEach(function(x){cyl(.5,.5,.14,MET3,x,2.5,-.9,bp,12).rotation.z=PI/2});bp.position.set(-14.8,.55,-10.2);g.add(bp);
  var dr=new T.Group();box(3.4,.18,1.0,MET3,0,1.6,0,dr);box(3.4,.18,1.0,MET3,0,.9,0,dr);[-1.6,1.6].forEach(function(x){box(.14,1.6,.9,PANEL,x,.85,0,dr,true)});
  for(var i=0;i<5;i++){cyl(.18,.18,.5,i%2?0x3f7fd9:0xd9433f,-1.3+i*.65,1.95,0,dr,8).rotation.z=PI/2;cyl(.16,.16,.5,0x555d73,-1.3+i*.65,1.25,0,dr,8).rotation.z=PI/2}
  dr.position.set(-11.4,.55,-11.9);g.add(dr);
  var mr=new T.Group();box(.12,3.6,4.4,winMat,0,0,0,mr,true);box(.16,3.8,.2,PANEL,-.02,0,-2.3,mr,true);box(.16,3.8,.2,PANEL,-.02,0,2.3,mr,true);box(.16,.2,4.6,PANEL,-.02,1.9,0,mr,true);box(.16,.2,4.6,PANEL,-.02,-1.9,0,mr,true);mr.position.set(-21.55,3.3,-2.2);g.add(mr);
  spPot(g,-20.8,-0.9,.9);
  /* ---- hygiene + meditation ---- */
  var bt=new T.Group();box(5.0,1.5,2.4,0xe7eef6,0,.75,0);box(4.5,.4,1.9,0x5fd0ff,0,1.55,0,bt,true);box(5.2,.2,2.6,0xcfd8e4,0,1.55,0,bt,true);cyl(.08,.08,.7,PANEL,-2.1,2.0,0,bt,6);box(4.6,.05,.05,sg(CYAN,.85),0,1.2,1.22,bt,true);bt.position.set(15,.55,-11.4);g.add(bt);
  var vn=new T.Group();box(2.6,1.7,1.3,MET2,0,.85,0,vn);box(2.8,.14,1.4,0xf6f9fd,0,1.75,0,vn,true);cyl(.5,.4,.2,0xe7eef0,0,1.85,0,vn,14);cyl(.05,.05,.5,PANEL,0,2.2,-.3,vn,6);vn.position.set(19.6,.55,-11.9);g.add(vn);
  box(1.8,1.5,.1,winMat,19.6,4.3,-12.62,g,true);box(2.0,.12,.14,PANEL,19.6,5.1,-12.62,g,true);box(2.0,.12,.14,PANEL,19.6,3.5,-12.62,g,true);
  var tl=new T.Group();box(1.1,.8,1.5,0xf6f9fd,0,.4,0,tl);box(1.2,1.4,.5,0xf6f9fd,0,1.3,-.8,tl);tl.position.set(20.7,.55,-8.9);tl.rotation.y=-PI/2;g.add(tl);
  box(1.0,.06,.6,0x2b5fa8,12.4,.62,-1.8,g,true);spPot(g,20.6,-1.7,1);
  /* ---- spa pool ---- */
  var px=33,pz=3,pw=15,pd=9.4;
  box(pw+1.2,.4,pd+1.2,0xdbe3ee,px,.7,pz,g);box(pw-.6,.1,pd-.6,0x8fe6ff,px,.82,pz,g,true);
  var water=new T.Mesh(G(pw-.4,.12,pd-.4),new T.MeshLambertMaterial({color:0x38c8ff,emissive:0x1e9fe0,emissiveIntensity:.6,transparent:true,opacity:.82}));water.position.set(px,.9,pz);water.receiveShadow=true;g.add(water);
  [[0,-pd/2],[0,pd/2]].forEach(function(a){box(pw+1.2,.2,.7,HULL2,px,.98,pz+a[1],g,true)});[[-pw/2,0],[pw/2,0]].forEach(function(a){box(.7,.2,pd,HULL2,px+a[0],.98,pz,g,true)});
  box(pw+1.2,.06,.1,sg(CYAN,.9),px,.92,pz-pd/2-.62,g,true);box(pw+1.2,.06,.1,sg(CYAN,.9),px,.92,pz+pd/2+.62,g,true);
  for(var l=1;l<5;l++)box(.1,.02,pd-1,0xffffff,px-pw/2+l*(pw/5),.97,pz,g,true);
  var ring2=new T.Mesh(new T.TorusGeometry(.7,.28,8,16),M(0xf06a8a));ring2.rotation.x=PI/2;ring2.position.set(px+3.5,1.05,pz-1.4);g.add(ring2);
  [-1,1].forEach(function(s){cyl(.06,.06,1.6,PANEL,px-pw/2-.1,1.3,pz+s*1.0,g,6);var cc=cyl(.06,.06,.9,PANEL,px-pw/2+.5,2.0,pz+s*1.0,g,6);cc.rotation.z=PI/2});
  for(var kk=0;kk<2;kk++){var lg=new T.Group();box(1.5,.3,3.4,0xdbe3ee,0,.55,0,lg);box(1.4,.2,1.2,0x2fd0d0,0,.78,-1.2,lg,true);var bk=box(1.4,.2,1.4,0x2fd0d0,0,1.2,1.4,lg,true);bk.rotation.x=-.55;[[-.6,-1.4],[.6,-1.4],[-.6,1.4],[.6,1.4]].forEach(function(p){box(.12,.4,.12,PANEL,p[0],.25,p[1],lg,true)});lg.position.set(px-5.5+kk*3.0,.5,pz+pd/2+2.6);lg.rotation.y=PI;g.add(lg)}
  var pa=new T.Group();cyl(.07,.07,3.6,PANEL,0,1.8,0,pa,6);var cn=new T.Mesh(new T.ConeGeometry(2.4,.9,10),M(HULL2));cn.position.y=3.9;cn.castShadow=true;pa.add(cn);cyl(2.2,2.2,.1,sg(AMB,.75),0,3.35,0,pa,10);pa.position.set(px+4.6,.5,pz+pd/2+2.6);g.add(pa);
  /* ---- hydroponic deck + outer station ---- */
  function tank(x,z,s){var t=new T.Group();cyl(1.5*s,1.5*s,3.6*s,HULL,0,1.8*s,0,t,16);cyl(1.56*s,1.56*s,.4*s,ORG,0,1.2*s,0,t,16);cyl(1.56*s,1.56*s,.18*s,sg(CYAN,.8),0,3.0*s,0,t,16);ball(1.3*s,HULL2,0,3.6*s,0,t);t.position.set(x,0,z);g.add(t)}
  function mast(x,z,s){var t=new T.Group();cyl(.2*s,.28*s,6*s,PANEL,0,3*s,0,t,8);var pnl=box(6*s,.15,3.4*s,0x1a3a78,0,6.2*s,0,t);pnl.rotation.z=.3;for(var q=-2;q<=2;q++)box(.06,.18,3.4*s,0x6fb2ff,q*1.1*s,6.2*s+q*-.33*s,0,t,true).rotation.z=.3;ball(.3*s,sg(0xff5a5a,.95),0,6.2*s+.9*s,0,t);t.position.set(x,0,z);g.add(t)}
  function dish(x,z,s){var t=new T.Group();cyl(.25*s,.3*s,2.2*s,PANEL,0,1.1*s,0,t,8);var d=new T.Mesh(new T.SphereGeometry(1.5*s,16,8,0,PI*2,0,PI/2.6),M(HULL));d.position.y=2.6*s;d.rotation.x=PI/3;d.castShadow=true;t.add(d);cyl(.05*s,.05*s,1.4*s,PANEL,0,3.2*s,.9*s,t,6).rotation.x=PI/3;ball(.16*s,sg(CYAN,.95),0,3.7*s,1.4*s,t);t.position.set(x,0,z);g.add(t)}
  [[-30,-14,0],[-31,6,1],[-30,30,2],[-8,-19,3],[10,-19.5,0],[28,-17,1],[42,-12,2],[44,22,3],[40,32,0],[-24,35,1],[25,35,2],[-34,-4,3]].forEach(function(a,i){var k=a[2];if(k===0)mast(a[0],a[1],1.2);else if(k===1)tank(a[0],a[1],1.0);else if(k===2)dish(a[0],a[1],1.2);else tank(a[0],a[1],.8)});
  function planterBox(x,z,s){box(2.2*s,.8,1.3*s,HULL2,x,.4,z,g);box(2.0*s,.06,1.1*s,sg(CYAN,.55),x,.82,z,g,true);ball(.55*s,sg(0x2fd9a0,.3),x,1.15,z,g);ball(.42*s,sg(0x56e39f,.3),x+.8*s,1.0,z+.2,g);ball(.38*s,sg(0x3fe6b8,.3),x-.7*s,.95,z+.1,g)}
  [-19,-9.5,-4,1,5,11,16,20].forEach(function(x,i){planterBox(x,14.5+(i%2)*.2,.9)});planterBox(-24,8,1);planterBox(-24,-4,1);planterBox(24,-14.8,1);planterBox(-4,-14.8,1);
  var rs=(function(){var s=7;return function(){s=(s*9301+49297)%233280;return s/233280}})();
  function flowers(x,z,w,d,c1,c2){box(w,.45,d,MET2,x,.25,z,g);box(w-.2,.06,d-.2,0x1c3b44,x,.5,z,g,true);for(var i=0;i<Math.floor(w*d*1.1);i++){var fx=x+(rs()-.5)*(w-.4),fz=z+(rs()-.5)*(d-.4);ball(.2,sg([c1,c2,0xffffff,0xf5b82e][i%4],.55),fx,.75+rs()*.2,fz,g)}}
  flowers(2.5,16.4,5,2.2,0xff5fa0,0xff9a3c);flowers(14.5,16.4,6,2.2,0xb08cff,0x3bd0ff);flowers(-5,16.4,5.4,2.2,0xf5b82e,0x3fe6b8);
  /* safety rail around the deck (gates left open at the landing pad and the path) */
  for(var fx2=-33;fx2<=45;fx2+=1.6){if((fx2>-21&&fx2<-11)||(fx2>6.5&&fx2<10.5))continue;box(.22,1.5,.22,HULL2,fx2,.75,38.4,g,true)}
  box(24,.12,.14,sg(CYAN,.8),-27,1.15,38.4,g,true);box(16,.12,.14,sg(CYAN,.8),-1.2,1.15,38.4,g,true);box(34.5,.12,.14,sg(CYAN,.8),28.3,1.15,38.4,g,true);box(34.5,.12,.14,sg(CYAN,.45),28.3,.6,38.4,g,true);
  var mb=new T.Group();cyl(.1,.1,2.2,PANEL,0,1.1,0,mb,6);box(.9,.5,.5,MET2,0,2.1,0,mb);ball(.22,sg(0xff5a5a,.95),0,2.6,0,mb);mb.position.set(12,0,36.6);g.add(mb);
  [[5.2,19],[11.2,19],[5.2,30],[11.2,30],[-8,36.5]].forEach(function(p){var lp=new T.Group();cyl(.14,.14,1.8,MET2,0,.9,0,lp,6);ball(.34,lanternMat,0,2.0,0,lp).castShadow=false;lp.position.set(p[0],0,p[1]);g.add(lp)});
  /* rover on the landing pad */
  var car=new T.Group();box(5.4,1.0,3.0,0xe9eff7,0,1.5,0,car);box(2.6,1.0,2.6,0xe9eff7,.3,2.5,0,car);box(2.4,.8,2.62,winMat,.3,2.55,0,car,true);box(5.4,.15,3.04,ORG,0,1.15,0,car,true);box(5.5,.08,3.1,sg(CYAN,.8),0,.95,0,car,true);
  [[-2,-1.7],[0,-1.7],[2,-1.7],[-2,1.7],[0,1.7],[2,1.7]].forEach(function(w){var wh=cyl(.75,.75,.5,0x20263a,w[0],.75,w[1],car,14);wh.rotation.x=PI/2;var hb=cyl(.3,.3,.52,PANEL,w[0],.75,w[1],car,8);hb.rotation.x=PI/2});
  cyl(.04,.04,1.6,PANEL,-1.8,3.2,-.6,car,5);ball(.12,sg(0xff5a5a,.95),-1.8,4.0,-.6,car);ball(.22,lanternMat,2.75,1.5,-1.0,car);ball(.22,lanternMat,2.75,1.5,1.0,car);
  car.position.set(-16,0,22);car.rotation.y=-PI/2;g.add(car);
  box(2.2,1.4,1.2,0x7d8aa3,26,.7,-14.6,g);box(1.8,.12,.9,sg(CYAN,.7),26,1.45,-14.6,g,true);
  mergeStatic(g);
}

/* ---------- lot: floating station deck + space equipment ---------- */
function spaceLot(){
  var w=LOT.x1-LOT.x0,d=LOT.z1-LOT.z0,cx=(LOT.x0+LOT.x1)/2,cz=(LOT.z0+LOT.z1)/2;
  box(w,.7,d,0x3e4a63,cx,-.35,cz,lotG);box(w-.3,3.2,d-.3,0x2a3347,cx,-2.3,cz,lotG);box(w-1.2,1.6,d-1.2,0x1c2335,cx,-4.7,cz,lotG);
  box(w,.1,.25,sg(CYAN,.85),cx,.04,LOT.z0+.15,lotG,true);box(w,.1,.25,sg(CYAN,.85),cx,.04,LOT.z1-.15,lotG,true);box(.25,.1,d,sg(CYAN,.85),LOT.x0+.15,.04,cz,lotG,true);box(.25,.1,d,sg(CYAN,.85),LOT.x1-.15,.04,cz,lotG,true);
  box(w-.6,.1,.18,sg(AMB,.6),cx,-1.2,LOT.z1-.1,lotG,true);box(w-.6,.1,.18,sg(AMB,.6),cx,-1.2,LOT.z0+.1,lotG,true);
  box(45.4,.5,26.9,0x8fa0b8,0,.25,0,lotG);box(22.4,.5,20.6,0x7f90aa,33.2,.25,4,lotG);
  /* landing pad */
  box(9,.12,28,0x2a3347,-16,.06,27,lotG,true);for(var i=0;i<6;i++)box(8,.02,.45,i%2?0x1a1f2c:0xe7c24a,-16,.13,15+i*4.6,lotG,true);box(.25,.02,27,sg(CYAN,.6),-20.4,.13,27,lotG,true);box(.25,.02,27,sg(CYAN,.6),-11.6,.13,27,lotG,true);
  /* lit path to the front door */
  for(var s2=0;s2<8;s2++)box(2.6,.14,1.7,sg(CYAN,.3),8.2+(s2%2?.25:-.25),.07,15.5+s2*2.6,lotG,true);
  /* deck seams */
  for(var sx=LOT.x0+6;sx<LOT.x1-2;sx+=6)box(.08,.03,d-2,0x2c3650,sx,.03,cz,lotG,true);
  for(var sz=LOT.z0+6;sz<LOT.z1-2;sz+=6)box(w-2,.03,.08,0x2c3650,cx,.03,sz,lotG,true);
  /* thrusters */
  [[LOT.x0+4,LOT.z0+4],[LOT.x1-4,LOT.z0+4],[LOT.x0+4,LOT.z1-4],[LOT.x1-4,LOT.z1-4]].forEach(function(p){cyl(1.8,2.4,2.2,0x2a3347,p[0],-6.6,p[1],lotG,12);cyl(1.5,1.5,.2,sg(CYAN,.95),p[0],-7.8,p[1],lotG,12)});
  mergeStatic(lotG);
}

/* ---------- backdrop: stars + planets (css) ---------- */
(function(){
  var rs=(function(){var s=11;return function(){s=(s*9301+49297)%233280;return s/233280}})(),sh=[],i;
  for(i=0;i<150;i++){var c=i%9===0?'#bfe3ff':i%7===0?'#ffe7b8':'#fff';sh.push((rs()*100).toFixed(1)+'vw '+(rs()*100).toFixed(1)+'vh 0 '+(rs()<.15?'1px':'0')+' '+c)}
  var el=document.createElement('div');el.className='starfield';el.style.boxShadow=sh.join(',');var sk=$('#sky');if(sk)sk.insertBefore(el,sk.firstChild);
})();

spaceLot();spaceLiving();buildTrophyShelf();spaceOther();
}
