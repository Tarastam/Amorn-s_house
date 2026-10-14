
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
  box(9.2,.06,5.6,0x5a4636,11,.62,5.4,g,true);box(8.2,.07,4.6,0x7b6249,11,.64,5.4,g,true);
  [[0,-2.3,8.2,.1],[0,2.3,8.2,.1],[-4.1,0,.1,4.6],[4.1,0,.1,4.6]].forEach(function(a){box(a[2],.03,a[3],sg(0xffc77a,.45),11+a[0],.7,5.4+a[1],g,true)});
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
  function mkBed(x,col){var bd=new T.Group();box(3.0,.7,5.9,MET3,0,.45,0,bd);box(2.8,.55,5.6,0xe6edf8,0,.95,0,bd,true);box(3.0,2.2,.3,MET2,0,1.55,-2.8,bd);box(2.5,1.1,.06,sg(AMB,.62),0,1.9,-2.63,bd,true);
    box(2.8,.3,3.4,col,0,1.28,.9,bd,true);box(1.2,.35,.9,0xffffff,0,1.4,-2.0,bd,true);box(2.9,.1,.5,0x6fb2ff,0,1.46,-.6,bd,true);box(3.0,.06,5.8,sg(CYAN,.55),0,.1,0,bd,true);bd.position.set(x,.55,-9.95);g.add(bd)}
  mkBed(2.2,0x2b5fa8);mkBed(8.8,0x7a4fb8);
  var rg=cyl(2.4,2.4,.05,0x6a5444,0,.6,0,g,24);rg.position.set(5.5,.62,-3.4);rg.scale.set(1.3,1,.8);var rg2=cyl(1.9,1.9,.055,0x8a7058,0,.6,0,g,24);rg2.position.set(5.5,.64,-3.4);rg2.scale.set(1.3,1,.8);
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
  box(6.4,.05,3.8,0x6b5a4c,-4.6,.62,7.6,g,true);spPot(g,-9.0,.9,.8);
  /* ---- hangar ---- */
  var tw=new T.Group();box(.2,2.6,4.2,MET3,0,3.3,0,tw);[[-1.4,ORG],[-.5,AMB],[.4,BLU],[1.3,GRN]].forEach(function(t){box(.1,1.3,.2,sg(t[1],.65),.16,3.4,t[0],tw,true)});tw.position.set(-21.6,.55,2.8);g.add(tw);
  [[-12.6,10.8],[-11.6,11.6]].forEach(function(p){cyl(.55,.55,1.5,HULL,p[0],1.3,p[1],g,10);cyl(.57,.57,.3,ORG,p[0],1.55,p[1],g,10)});
  /* ---- computer bay: rec corner (TV + PS5 + sofa) ---- */
  box(6.4,.05,4.2,0x4a3a30,-5,.62,-9.4,g,true);box(5.6,.06,3.4,0x6b5444,-5,.64,-9.4,g,true);
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
  /* rover parked inside the hangar */
  var car=new T.Group();box(5.4,1.0,3.0,0xe9eff7,0,1.5,0,car);box(2.6,1.0,2.6,0xe9eff7,.3,2.5,0,car);box(2.4,.8,2.62,winMat,.3,2.55,0,car,true);box(5.4,.15,3.04,ORG,0,1.15,0,car,true);box(5.5,.08,3.1,sg(CYAN,.8),0,.95,0,car,true);
  [[-2,-1.7],[0,-1.7],[2,-1.7],[-2,1.7],[0,1.7],[2,1.7]].forEach(function(w){var wh=cyl(.75,.75,.5,0x20263a,w[0],.75,w[1],car,14);wh.rotation.x=PI/2;var hb=cyl(.3,.3,.52,PANEL,w[0],.75,w[1],car,8);hb.rotation.x=PI/2});
  cyl(.04,.04,1.6,PANEL,-1.8,3.2,-.6,car,5);ball(.12,sg(0xff5a5a,.95),-1.8,4.0,-.6,car);ball(.22,lanternMat,2.75,1.5,-1.0,car);ball(.22,lanternMat,2.75,1.5,1.0,car);
  car.position.set(-19.8,.55,6.4);car.rotation.y=-PI/2;g.add(car);
  mergeStatic(g);
}

/* ---------- station shell: chamfered modular hull, walls, door frames, lid ---------- */
var GLASS=new T.MeshLambertMaterial({color:0x7fd0ff,emissive:0x2a7cc0,emissiveIntensity:.35,transparent:true,opacity:.26,side:T.DoubleSide,depthWrite:false});
var CC=[2.8,2.8,2,2]; /* core corner cuts: back-left, back-right, front-right, front-left */
/* chamfered rectangle outline; c = cuts at (x0,z0),(x1,z0),(x1,z1),(x0,z1) */
function chamf(x0,x1,z0,z1,c){
  var p=[];function add(x,z){var l=p[p.length-1];if(!l||l[0]!==x||l[1]!==z)p.push([x,z])}
  add(x0,z0+c[0]);add(x0+c[0],z0);add(x1-c[1],z0);add(x1,z0+c[1]);add(x1,z1-c[2]);add(x1-c[2],z1);add(x0+c[3],z1);add(x0,z1-c[3]);
  var f=p[0],l=p[p.length-1];if(f[0]===l[0]&&f[1]===l[1])p.pop();return p}
/* flat slab from an outline (x,z), rising from y0 by h */
function plate(pts,y0,h,mat,par,ns){
  var sh=new T.Shape();pts.forEach(function(q,i){if(i)sh.lineTo(q[0],-q[1]);else sh.moveTo(q[0],-q[1])});
  var m=new T.Mesh(new T.ExtrudeGeometry(sh,{depth:h,bevelEnabled:false}),typeof mat==='object'?mat:M(mat));
  m.rotation.x=-PI/2;m.position.y=y0;if(!ns)m.castShadow=true;m.receiveShadow=true;if(par)par.add(m);return m}
/* wall piece between two floor points (used for 45 degree corners) */
function wallSeg(g,x1,z1,x2,z2,h,t,col){var dx=x2-x1,dz=z2-z1,L=Math.hypot(dx,dz);var m=box(L+t*.8,h,t,col,(x1+x2)/2,h/2,(z1+z2)/2,g);m.rotation.y=Math.atan2(-dz,dx);return m}
function glassMesh(geo,x,y,z,p){var m=new T.Mesh(geo,GLASS);m.position.set(x,y,z);if(p)p.add(m);return m}

function spFloors(){
  var g=houseStatic;
  /* warm floors inside, cool hull outside (like the reference cutaway) */
  var spec={gym:[0x6c4f3a,[CC[0],0,0,0],'wood'],apps:[0x4d3d36,[0,0,0,0],'wood'],growth:[0xb88e66,[0,0,0,0],'wood'],income:[0xcfd7e0,[0,0,0,0],'tile'],
    life:[0xd8cab0,[0,0,CC[2],0],'tile'],work:[0x59657c,[0,0,0,CC[3]],'metal'],bath:[0xc9dce7,[0,CC[1],0,0],'tile']};
  Object.keys(spec).forEach(function(k){var r=room(k),a=spec[k];
    plate(chamf(r.x0,r.x1,r.z0,r.z1,a[1]),.5,.08,a[0],g,true);
    var dk=new T.Color(a[0]).multiplyScalar(.82).getHex();
    if(a[2]==='wood'){for(var z=r.z0+1.4;z<r.z1-.2;z+=1.4)box(r.x1-r.x0-.2,.02,.07,dk,r.cx,.59,z,g,true)}
    else{for(var sx=r.x0+3;sx<r.x1-.5;sx+=3)box(.07,.02,r.z1-r.z0-.2,a[2]==='metal'?0x242d42:0xaab7c4,sx,.59,r.cz,g,true);
      for(var sz=r.z0+3;sz<r.z1-.5;sz+=3)box(r.x1-r.x0-.2,.02,.07,a[2]==='metal'?0x242d42:0xaab7c4,r.cx,.59,sz,g,true)}});
  /* hangar hazard stripes along the front edge */
  for(var h2=0;h2<7;h2++)box(1.1,.015,.5,h2%2?0x1a1f2c:0xe7c24a,-22+1.6+h2*1.3,.6,12.3,g,true);
  /* glowing guide strips through the doorways */
  box(.12,.03,24,GLOW(CYAN,.5),-16,.6,0,g,true);box(.12,.03,24,GLOW(AMB,.4),5.5,.6,0,g,true);
}

function spWalls(){
  var H=EXTH,TW=.8,WL=WALLC,CAP=HULL2,gc=GLOW(CYAN,.8),ga=GLOW(AMB,.7);
  function cap(g,L,ax,fx,fz,c){if(ax==='x')box(L,.35,TW+.5,CAP,c,H+.1,fz,g,true);else box(TW+.5,.35,L,CAP,fx,H+.1,c,g,true)}
  /* ---- back wall (z=-13) ---- */
  var b=extWall('back',0,-1);run(b,'x',-13,-19.3,19.3,[],H,TW,WL);cap(b,38.8,'x',0,-13,0);
  box(38.6,1.3,.1,PANEL,0,.65,-12.55,b,true);box(38.6,.1,.08,gc,0,1.4,-12.54,b,true);box(38.6,.12,.08,ga,0,H-.55,-12.54,b,true);
  [-10,0,11].forEach(function(x){box(.8,H,.5,HULL2,x,H/2,-12.55,b,true);box(.86,.16,.56,gc,x,2.6,-12.55,b,true);box(.86,.16,.56,gc,x,H-1.3,-12.55,b,true)});
  addWin(b,'x',-13,-16,3.8,6.6,3.2,-1);addWin(b,'x',-13,5.5,4.3,6.6,2.2,-1);
  /* wall monitor array in the computer bay + art in the crew quarters */
  [-8.9,-6.6,-4.3,-2.0].forEach(function(x,i){spMonitor(b,x,4.7,-12.5,2.0,1.25,[BLU,GRN,MAG,CYAN][i]);});
  [[1.2,0xff9c4a],[10.0,0x56e39f]].forEach(function(a){box(1.3,1.0,.08,MET3,a[0],3.6,-12.55,b,true);box(1.1,.8,.04,sg(a[1],.5),a[0],3.6,-12.5,b,true)});
  /* ---- left wall (x=-22) ---- */
  var l=extWall('left',-1,0);run(l,'z',-22,-10.3,11,[],H,TW,WL);cap(l,21.3,'z',-22,0,.35);
  box(.1,1.3,21.2,PANEL,-21.55,.65,.35,l,true);box(.08,.1,21.2,gc,-21.54,1.4,.35,l,true);box(.08,.12,21.2,ga,-21.54,H-.55,.35,l,true);
  [-4.5,0,4.5].forEach(function(z){box(.5,H,.8,HULL2,-21.55,H/2,z,l,true)});
  addWin(l,'z',-22,-6.4,3.8,6.4,3.2,-1);
  /* hangar shutter art on the left wall */
  for(var s2=0;s2<4;s2++)box(.12,.1,6.0,s2%2?0x1a1f2c:0xe7c24a,-21.52,3.1+s2*.5,6.2,l,true);
  /* ---- front wall (z=13), low in the cutaway ---- */
  var f=extWall('front',0,1);run(f,'x',13,-20,20,[[-19.6,-12.4,5.3],[6.9,9.5,3.8]],H,TW,WL);cap(f,40,'x',0,13,0);
  for(var fx=-18;fx<=19;fx+=4)if(!(fx>-20&&fx<-12)&&!(fx>6&&fx<10)){box(.7,H-.2,.2,PANEL,fx,H/2,13.5,f,true)}
  box(40,.14,.1,gc,0,1.0,13.55,f,true);box(40,.14,.1,ga,0,H-.5,13.55,f,true);
  addWin(f,'x',13,-5,3.6,6.4,2.8,1);addWin(f,'x',13,14.6,3.6,8.4,3.2,1);addWin(f,'x',13,2.6,3.6,3.2,2.8,1);
  /* hangar airlock frame */
  box(.9,H-.4,1.2,HULL2,-20.0,H/2,13,f);box(.9,H-.4,1.2,HULL2,-12.0,H/2,13,f);
  for(var hz=0;hz<6;hz++){box(.96,.5,1.26,hz%2?0x1a1f2c:0xe7c24a,-20.0,.4+hz*.9,13,f,true);box(.96,.5,1.26,hz%2?0x1a1f2c:0xe7c24a,-12.0,.4+hz*.9,13,f,true)}
  box(8.4,.16,.3,GLOW(AMB,.9),-16,5.2,13.2,f,true);
  /* front door */
  var fd=new T.Group();box(3.2,.4,.9,HULL2,0,3.85,0,fd,true);box(.4,3.8,.9,HULL2,-1.55,1.9,0,fd,true);box(.4,3.8,.9,HULL2,1.55,1.9,0,fd,true);
  box(2.4,3.3,.2,0x7d8ba3,0,1.65,0,fd);box(.9,1.5,.25,winMat,-.4,2.3,.02,fd,true);box(.15,.5,.3,CYAN,.8,1.6,.14,fd,true);box(2.9,.1,.3,gc,0,3.6,.3,fd,true);fd.position.set(8.2,0,13);f.add(fd);
  /* ---- right wall (x=22) with sliding glass door ---- */
  var r=extWall('right',1,0);run(r,'z',22,-10.3,11,[[3.4,9.6,4.9]],H,TW,WL);cap(r,21.3,'z',22,0,.35);
  for(var rz=-8;rz<=9;rz+=4)if(rz<2.5||rz>10)box(.2,H-.2,.7,PANEL,22.5,H/2,rz,r,true);
  box(.1,.14,21,gc,22.55,1.0,.35,r,true);box(.1,.14,21,ga,22.55,H-.5,.35,r,true);
  addWin(r,'z',22,-5.4,3.6,5.6,2.8,1);
  box(.2,4.8,3.0,winMat,22,2.4,4.9,r,true);box(.2,4.8,3.0,winMat,22.12,2.4,8.1,r,true);
  box(.4,.25,6.4,TRIM,22,0.12,6.5,r,true);box(.4,.3,6.4,TRIM,22,4.9,6.5,r,true);box(.4,4.8,.2,TRIM,22,2.4,6.5,r,true);
  /* ---- 45 degree corner walls ---- */
  function corner(name,nx,nz,x1,z1,x2,z2){var c=extWall(name,nx,nz);wallSeg(c,x1,z1,x2,z2,H,TW,WL);
    var m=wallSeg(c,x1,z1,x2,z2,.35,TW+.5,CAP);m.position.y=H+.1;wallSeg(c,x1,z1,x2,z2,1.3,TW+.04,PANEL).position.y=.65;return c}
  corner('cTL',-1,-1,-19.2,-13,-22,-10.2);corner('cTR',1,-1,19.2,-13,22,-10.2);corner('cBR',1,1,20,13,22,11);corner('cBL',-1,1,-22,11,-20,13);
  Object.keys(extWalls).forEach(function(k){var g=extWalls[k];mergeStatic(g);g.position.y=.5});
}

/* bulkhead frames around the doorways (glowing trim) */
function spDoorFrames(){
  var g=new T.Group();scene.add(g);
  function frame(ax,fixed,a,b){var w=b-a,c=(a+b)/2,H=3.3;
    if(ax==='x'){box(.3,H,.55,HULL2,a-.05,H/2+.55,fixed,g);box(.3,H,.55,HULL2,b+.05,H/2+.55,fixed,g);box(w+.6,.3,.55,HULL2,c,H+.6,fixed,g);box(.05,H-.4,.6,GLOW(CYAN,.9),a+.1,H/2+.5,fixed,g,true);box(.05,H-.4,.6,GLOW(CYAN,.9),b-.1,H/2+.5,fixed,g,true);box(w,.07,.6,GLOW(AMB,.85),c,H+.4,fixed,g,true)}
    else{box(.55,H,.3,HULL2,fixed,H/2+.55,a-.05,g);box(.55,H,.3,HULL2,fixed,H/2+.55,b+.05,g);box(.55,.3,w+.6,HULL2,fixed,H+.6,c,g);box(.6,H-.4,.05,GLOW(CYAN,.9),fixed,H/2+.5,a+.1,g,true);box(.6,H-.4,.05,GLOW(CYAN,.9),fixed,H/2+.5,b-.1,g,true);box(.6,.07,w,GLOW(AMB,.85),fixed,H+.4,c,g,true)}}
  [[-17.5,-14.5],[-6.5,-3.5],[4,7],[15,18]].forEach(function(a){frame('x',0,a[0],a[1])});
  [[-8,-5],[5,8]].forEach(function(a){frame('z',-10,a[0],a[1])});
  frame('z',0,-8,-5);frame('z',0,3,9);frame('z',11,-8,-5);
  mergeStatic(g);
}

/* closed state: chamfered hull lid with ribs, hatches and solar strips */
function spRoof(){
  var lid=plate(chamf(-23.4,23.4,-14.4,14.4,[3.9,3.9,3.3,3.3]),-1.55,.8,RM(0x8d9bb2),roof);
  plate(chamf(-22,22,-13,13,[3,3,2.3,2.3]),-.78,.22,RM(0xb3bfd2),roof);
  for(var x=-16.5;x<=16.6;x+=5.5)box(.5,.18,25.4,RM(PANEL),x,-.55,0,roof,true);
  for(var i=0;i<5;i++)for(var j=0;j<2;j++)box(4.4,.1,5.6,RM(0x1a3a78),-14+i*7,-.6,-6.4+j*12.8,roof,true);
  box(3,.5,3,RM(HULL),-18,-.5,3,roof,true);box(3,.5,3,RM(HULL),17,-.5,2,roof,true);box(5,.14,2.4,RM(0x3a8bff),3,-.6,4,roof,true);
  cyl(.12,.12,3.6,RM(PANEL),-19,1.2,-8,roof,6);ball(.28,RM(0xff5a5a),-19,3.1,-8,roof);
  roof.position.set(0,.5+EXTH+1.55,0);scene.add(roof);
}

/* hull bases: thick bevelled rims under every module, keels, rim lights */
function spHull(){
  var g=new T.Group();scene.add(g);
  /* main station */
  plate(chamf(-23.1,23.1,-14.1,14.1,[3.6,3.6,3,3]),-.55,1.05,HULL2,g);
  plate(chamf(-22.6,22.6,-13.6,13.6,[3.3,3.3,2.7,2.7]),-2.4,1.85,0x55627c,g);
  plate(chamf(-19,19,-10.5,10.5,[3,3,3,3]),-4.4,2,0x2c3650,g);
  /* spa module */
  plate(chamf(22,45,-6.9,14.9,[0,3.4,3.4,0]),-.55,1.05,HULL2,g);
  plate(chamf(22,44.4,-6.4,14.4,[0,3.1,3.1,0]),-2.2,1.65,0x55627c,g);
  plate(chamf(25,41,-3,11,[2,2,2,2]),-4.0,1.8,0x2c3650,g);
  plate(chamf(22.2,44.2,-6.1,14.1,[0,3,3,0]),.5,.05,0x9fb2c4,g,true);
  /* hydroponic annex */
  plate(chamf(-.9,22.9,12.6,32.0,[0,0,3.6,3.6]),-.8,.78,HULL2,g);
  plate(chamf(-.4,22.4,12.8,31.5,[0,0,3.2,3.2]),-2.2,1.4,0x55627c,g);
  plate(chamf(4,18,16,28,[2,2,2,2]),-3.8,1.6,0x2c3650,g);
  plate(chamf(0,22,13,31,[0,0,3,3]),-.02,.06,0x6f809a,g,true);for(var qx=3;qx<22;qx+=3)box(.07,.02,17.6,0x3b4a63,qx,.05,22,g,true);for(var qz=16;qz<31;qz+=3)box(21.6,.02,.07,0x3b4a63,11,.05,qz,g,true);
  /* panel ribs + rim lights on the camera-facing sides */
  for(var x=-20;x<=21;x+=3.4)box(.5,1.1,.2,PANEL,x,-.02,14.15,g,true);
  for(var z=-11;z<=12;z+=3.4)box(.2,1.1,.5,PANEL,23.15,-.02,z,g,true);
  box(38,.14,.08,GLOW(CYAN,.9),0,-.5,14.2,g,true);box(.08,.14,22,GLOW(CYAN,.9),23.2,-.5,-.5,g,true);
  box(38,.1,.08,GLOW(AMB,.6),0,-2.2,13.7,g,true);box(.08,.1,22,GLOW(AMB,.6),22.7,-2.2,-.5,g,true);
  for(var sx=24;sx<=42;sx+=3)box(.5,1.1,.2,PANEL,sx,-.02,15.0,g,true);box(18,.14,.08,GLOW(CYAN,.9),33,-.5,15.05,g,true);
  box(.08,.14,17,GLOW(CYAN,.9),45.05,-.5,3.5,g,true);
  for(var ax=3;ax<=20;ax+=3.4)box(.5,.8,.2,PANEL,ax,-.4,32.0,g,true);box(14,.14,.08,GLOW(CYAN,.9),11,-.4,32.05,g,true);
  /* thrusters under the keels */
  [[-12,-6],[12,-6],[-12,6],[12,6]].forEach(function(p){cyl(1.5,2.1,2.0,0x2a3347,p[0],-5.5,p[1],g,12);cyl(1.2,1.2,.2,GLOW(CYAN,.95),p[0],-6.6,p[1],g,12)});
  [[30,2]].forEach(function(p){cyl(1.4,1.9,1.8,0x2a3347,p[0],-5.0,p[1],g,12);cyl(1.1,1.1,.2,GLOW(CYAN,.95),p[0],-6.0,p[1],g,12)});
  mergeStatic(g);
}

/* tube module along x with rings, lit bands and porthole windows */
function spTube(x0,x1,y,z,r,par,bandC){
  var L=Math.abs(x1-x0),xm=(x0+x1)/2,dir=x1>x0?1:-1;
  cyl(r,r,L,HULL,xm,y,z,par,28).rotation.z=PI/2;
  var n=Math.max(2,Math.floor(L/5));
  for(var i=0;i<=n;i++){var x=x0+dir*i*L/n;cyl(r+.28,r+.28,.7,PANEL,x,y,z,par,28).rotation.z=PI/2;cyl(r+.3,r+.3,.14,GLOW(bandC||CYAN,.85),x+.42*dir,y,z,par,28).rotation.z=PI/2}
  for(var w=0;w<n;w++){var wx=x0+dir*(w+.5)*L/n;for(var k=-1;k<=1;k+=2)box(.9,.5,.12,GLOW(BLU,.8),wx+k*1.1,y+.4,z+r-.04,par,true)}
  ball(r,HULL,x1,y,z,par);cyl(.12,.12,2.4,PANEL,x1+dir*r*.8,y+r*.7,z,par,6);ball(.24,GLOW(0xff5a5a,.95),x1+dir*r*.8,y+r*.7+1.3,z,par);
}

/* glass ring dome module behind the station */
function spDome(cx,cz){
  var g=new T.Group(),R=7.5;scene.add(g);
  cyl(8.5,8.5,1.05,HULL2,cx,0,cz,g,48);cyl(7.9,6.2,1.9,0x55627c,cx,-1.5,cz,g,40);cyl(4.4,2.6,2.2,0x2c3650,cx,-3.5,cz,g,24);
  cyl(7.6,7.6,.12,0x2d4660,cx,.56,cz,g,48);
  var ring=new T.Mesh(new T.TorusGeometry(7.6,.14,6,56),GLOW(CYAN,.9));ring.rotation.x=PI/2;ring.position.set(cx,.62,cz);g.add(ring);
  cyl(5.4,5.4,.05,GLOW(0x2a7fe0,.6),cx,.66,cz,g,40);cyl(3.2,3.2,.06,GLOW(0x8fd0ff,.5),cx+.8,.7,cz-.4,g,30);
  var rs=(function(){var s=5;return function(){s=(s*9301+49297)%233280;return s/233280}})();
  for(var i=0;i<22;i++){var a=i/22*PI*2,rr=6.7+rs()*.4,px=cx+Math.sin(a)*rr,pz=cz+Math.cos(a)*rr;ball(.45+rs()*.35,[0x3fd17f,0x2fbf7a,0x56e39f,0x86e6b0][i%4],px,1.05,pz,g);if(i%3===0)ball(.2,GLOW([0xff9ac6,0xffd23f,0xb08cff][i%3],.7),px,1.7,pz,g)}
  var cl=new T.CylinderGeometry(R,R,4.4,56,1,true);glassMesh(cl,cx,2.8,cz,g);
  [.62,5.0].forEach(function(y){var t=new T.Mesh(new T.TorusGeometry(R,.24,8,56),M(HULL));t.rotation.x=PI/2;t.position.set(cx,y,cz);g.add(t)});
  for(var m=0;m<14;m++){var am=m/14*PI*2;box(.22,4.4,.22,HULL2,cx+Math.sin(am)*R,2.8,cz+Math.cos(am)*R,g,true)}
  ball(1.2,GLOW(0x2a7fe0,.5),cx,1.8,cz,g);var r1=new T.Mesh(new T.TorusGeometry(1.6,.05,6,32),GLOW(CYAN,.9));r1.position.set(cx,1.8,cz);r1.rotation.x=PI/2.5;g.add(r1);
  box(2.8,2.2,1.8,HULL2,cx,1.2,cz+8.7,g);box(2.0,.12,.1,GLOW(AMB,.9),cx,2.2,cz+9.64,g,true); /* hatch toward the station */
  mergeStatic(g);
}

function spExterior(){
  var g=new T.Group();scene.add(g);
  /* dome module behind the crew quarters */
  spDome(3,-23.2);
  /* long tube modules left (gym side) and right (behind the spa) */
  spTube(-23.4,-47,3.8,-6.5,3.0,g,AMB);spTube(-23.4,-38,2.2,-12.3,1.7,g,CYAN);
  spTube(44.8,60,2.6,4.2,2.2,g,CYAN);
  [[-30,-6.5],[-40,-6.5]].forEach(function(p){box(.5,5.6,.5,PANEL,p[0],.9,p[1]+2.4,g,true)});
  /* mast towers + solar wings */
  function tower(x,z,hh){cyl(.8,1.1,hh,HULL,x,hh/2,z,g,10);for(var q=2;q<hh;q+=3.4)cyl(1.25,1.25,.4,PANEL,x,q,z,g,10);cyl(.16,.16,3,PANEL,x,hh+1.4,z,g,6);ball(.3,GLOW(0xff5a5a,.95),x,hh+3,z,g);
    var pn=box(7,.15,3.6,0x1a3a78,x+4.4,hh-2,z,g);pn.rotation.z=.18;for(var s=-3;s<=3;s++)box(.06,.18,3.6,0x6fb2ff,x+4.4+s*1.0,hh-2+s*-.18,z,g,true).rotation.z=.18}
  tower(24,-22,13);tower(-24,-20,8);
  function wing(x,z,ry){var w=new T.Group();cyl(.2,.28,7,PANEL,0,3.5,0,w,8);for(var k=0;k<2;k++){var pn=box(8,.15,3.6,0x1a3a78,k?-4.6:4.6,7,0,w);pn.rotation.z=k?-.28:.28;for(var s=-3;s<=3;s++)box(.06,.18,3.6,0x6fb2ff,(k?-4.6:4.6)+s*1.0,7+s*(k?.28:-.28),0,w,true).rotation.z=k?-.28:.28}
    ball(.3,GLOW(0xff5a5a,.95),0,7.8,0,w);w.position.set(x,0,z);w.rotation.y=ry||0;g.add(w)}
  wing(40,36,.3);wing(-9,37,.4);
  mergeStatic(g);
}

function spBuildStation(){
  spFloors();spWalls();buildPartitions();spDoorFrames();spRoof();spHull();spExterior();
}


/* ---------- hydroponic annex (garden) + spa greenhouse ---------- */
function spaceOutdoor(){
  var g=new T.Group();scene.add(g);
  var rs=(function(){var s=7;return function(){s=(s*9301+49297)%233280;return s/233280}})();
  function planterBox(x,z,s){box(2.2*s,.8,1.3*s,HULL2,x,.4,z,g);box(2.0*s,.06,1.1*s,sg(CYAN,.55),x,.82,z,g,true);ball(.55*s,sg(0x2fd9a0,.3),x,1.15,z,g);ball(.42*s,sg(0x56e39f,.3),x+.8*s,1.0,z+.2,g);ball(.38*s,sg(0x3fe6b8,.3),x-.7*s,.95,z+.1,g)}
  function flowers(x,z,w,d,c1,c2){box(w,.45,d,MET2,x,.25,z,g);box(w-.2,.06,d-.2,0x1c3b44,x,.5,z,g,true);for(var i=0;i<Math.floor(w*d*1.1);i++){var fx=x+(rs()-.5)*(w-.4),fz=z+(rs()-.5)*(d-.4);ball(.2,sg([c1,c2,0xffffff,0xf5b82e][i%4],.55),fx,.75+rs()*.2,fz,g)}}
  [2.6,13.6,17.4,20.4].forEach(function(x){planterBox(x,14.7,.9)});
  flowers(4.5,29.6,5,1.8,0xff5fa0,0xff9a3c);flowers(17.5,29.6,5,1.8,0xb08cff,0x3bd0ff);
  /* lit path from the front door */
  for(var s2=0;s2<7;s2++)box(2.6,.14,1.7,sg(CYAN,.3),8.2+(s2%2?.25:-.25),.07,15.5+s2*2.0,g,true);
  /* grow towers */
  [[1.2,29.8],[20.8,29.8],[1.2,15.4]].forEach(function(p){cyl(.7,.7,.4,HULL2,p[0],.2,p[1],g,12);var t=cyl(.5,.5,3.2,GLASS,p[0],2.0,p[1],g,14);t.castShadow=false;cyl(.14,.14,3.0,sg(0x2fe09a,.7),p[0],2.0,p[1],g,6);
    for(var k=0;k<4;k++)ball(.34,sg([0xff7ab8,0xffd23f,0x7cf0b0,0xb08cff][k],.6),p[0]+(k%2?.3:-.3),1.0+k*.7,p[1]+(k%2?-.2:.2),g);cyl(.6,.6,.2,sg(0xff5fd0,.8),p[0],3.7,p[1],g,12)});
  /* glass guard rail around the annex */
  var rp=[[-.3,13.8],[-.3,27.6],[3.3,31.3],[18.7,31.3],[22.3,27.6],[22.3,13.8]];
  for(var i=0;i<rp.length-1;i++){var a=rp[i],b=rp[i+1],L=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.max(1,Math.round(L/2)),ang=Math.atan2(-(b[1]-a[1]),b[0]-a[0]);
    for(var k=0;k<n;k++){var t=(k+.5)/n;var gp=new T.Mesh(G(L/n-.15,.95,.06),GLASS);gp.position.set(a[0]+(b[0]-a[0])*t,.95,a[1]+(b[1]-a[1])*t);gp.rotation.y=ang;g.add(gp)}
    for(var k2=0;k2<=n;k2++){var t2=k2/n;box(.2,1.5,.2,HULL2,a[0]+(b[0]-a[0])*t2,.75,a[1]+(b[1]-a[1])*t2,g,true)}
    var tr=box(L,.1,.12,sg(CYAN,.85),(a[0]+b[0])/2,1.5,(a[1]+b[1])/2,g,true);tr.rotation.y=ang}
  [[5.6,16],[10.8,16],[5.6,28.6],[10.8,28.6]].forEach(function(p){var lp=new T.Group();cyl(.14,.14,1.8,MET2,0,.9,0,lp,6);ball(.34,lanternMat,0,2.0,0,lp).castShadow=false;lp.position.set(p[0],0,p[1]);g.add(lp)});
  /* spa greenhouse behind the pool: planter bed + glass arch */
  var gx=33,gz=-4.4,gl=17;
  box(gl,1.0,3.0,HULL2,gx,1.0,gz,g);box(gl-.6,.08,2.4,0x1c3b44,gx,1.52,gz,g,true);box(gl,.08,.1,sg(CYAN,.9),gx,1.1,gz+1.55,g,true);
  for(var q=0;q<18;q++){var px2=gx-gl/2+.9+q*((gl-1.8)/17),pz2=gz+(rs()-.5)*1.6;ball(.34+rs()*.2,[0x3fd17f,0x2fbf7a,0x56e39f][q%3],px2,1.9+rs()*.3,pz2,g);if(q%3===0)ball(.16,sg([0xff9ac6,0xffd23f][q%2],.7),px2,2.4,pz2,g)}
  var arch=glassMesh(new T.CylinderGeometry(1.55,1.55,gl,22,1,true,0,PI),gx,1.55,gz,g);arch.rotation.z=PI/2;
  for(var r2=0;r2<=6;r2++){var rb=new T.Mesh(new T.TorusGeometry(1.55,.06,6,20,PI),M(HULL));rb.position.set(gx-gl/2+r2*gl/6,1.55,gz);rb.rotation.y=PI/2;g.add(rb)}
  [-1,1].forEach(function(sx){var cp=glassMesh(new T.CircleGeometry(1.55,20,0,PI),gx+sx*gl/2,1.55,gz,g);cp.rotation.y=PI/2});
  mergeStatic(g);
}

/* ---------- backdrop: stars + planets (css) ---------- */
(function(){
  var rs=(function(){var s=11;return function(){s=(s*9301+49297)%233280;return s/233280}})(),sh=[],i;
  for(i=0;i<150;i++){var c=i%9===0?'#bfe3ff':i%7===0?'#ffe7b8':'#fff';sh.push((rs()*100).toFixed(1)+'vw '+(rs()*100).toFixed(1)+'vh 0 '+(rs()<.15?'1px':'0')+' '+c)}
  var el=document.createElement('div');el.className='starfield';el.style.boxShadow=sh.join(',');var sk=$('#sky');if(sk)sk.insertBefore(el,sk.firstChild);
})();

spBuildStation();spaceLiving();buildTrophyShelf();spaceOther();spaceOutdoor();
}
