/* Reference-led worlds. Geometry is built once and merged by material. */
var worldDecor=new T.Group();scene.add(worldDecor);
var WP={wood:0x805036,edge:0x412d2d,stone:0x91847e,floor:0xd2a470,wall:0xeee0bf,leaf:0x426c36,gold:0xd8a653};
if(THEME==='arcade')WP={wood:0x36263e,edge:0x171a32,stone:0x3e354f,floor:0x78658f,wall:0x432e54,leaf:0x328478,gold:0xff5caf};
if(THEME==='wizard')WP={wood:0x60402f,edge:0x332b39,stone:0x7d7483,floor:0x9e826c,wall:0x8a7c88,leaf:0x465948,gold:0xe4b85e};
var surfaceMats={};
function worldSurface(kind,color){
  surfaceMats=surfaceMats||{};var key=kind+color;if(surfaceMats[key])return surfaceMats[key];
  var c=document.createElement('canvas');c.width=c.height=256;var ctx=c.getContext('2d'),seed=17;
  function rand(){seed=(seed*16807)%2147483647;return seed/2147483647}
  ctx.fillStyle='#'+new T.Color(color).getHexString();ctx.fillRect(0,0,256,256);
  for(var i=0;i<1300;i++){ctx.fillStyle=i%2?'rgba(255,255,255,.06)':'rgba(0,0,0,.07)';var x=rand()*256,y=rand()*256;ctx.fillRect(x,y,kind==='wood'?15+rand()*70:1+rand()*5,kind==='wood'?1:1+rand()*5)}
  if(kind==='wood'){for(var j=0;j<4;j++){ctx.fillStyle='rgba(32,18,14,.2)';ctx.fillRect(0,j*64,256,2);ctx.fillRect(j%2?80:170,j*64,2,64);ctx.fillStyle='rgba(255,245,213,.14)';ctx.fillRect(0,j*64+2,256,1)}}
  else{ctx.strokeStyle='rgba(35,25,33,.15)';ctx.lineWidth=3;ctx.strokeRect(1,1,254,254);ctx.strokeStyle='rgba(255,255,255,.12)';ctx.lineWidth=2;ctx.strokeRect(4,4,248,248)}
  var tex=new T.CanvasTexture(c);tex.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
  return surfaceMats[key]=new T.MeshLambertMaterial({map:tex,color:0xffffff});
}
function wAccentLight(x,y,z,c,intensity,distance){var l=new T.PointLight(c,intensity,distance,2);l.position.set(x,y,z);scene.add(l)}
function wGroup(x,y,z,ry){var g=new T.Group();g.position.set(x||0,y||0,z||0);g.rotation.y=ry||0;return g}
function wSign(p,txt,x,y,z,w,h,color,bg){
  var c=document.createElement('canvas');c.width=512;c.height=256;var ctx=c.getContext('2d');
  ctx.fillStyle=bg||'#18202b';ctx.fillRect(0,0,512,256);ctx.strokeStyle=color||'#f3ce8e';ctx.lineWidth=8;ctx.strokeRect(12,12,488,232);
  ctx.fillStyle=color||'#f3ce8e';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='600 '+(txt.length>12?35:60)+'px Georgia';ctx.fillText(txt,256,110,460);
  ctx.font='18px sans-serif';ctx.fillText('A M O R N  /  E S T .  2 0 2 6',256,188);
  var m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:new T.CanvasTexture(c)}));m.position.set(x,y,z);m.userData.keep=true;p.add(m);return m;
}
function wPlant(p,x,y,z,s,flower){
  var g=wGroup(x,y,z);cyl(.48,.33,.72,THEME==='wizard'?WP.stone:0xc78d60,0,.36,0,g,10);cyl(.44,.44,.06,0x352a28,0,.75,0,g,10);
  for(var i=0;i<7;i++){var a=i*2.4,l=ball(.37,WP.leaf,Math.sin(a)*.4,1.05+(i%3)*.24,Math.cos(a)*.4,g);l.scale.y=1.6;if(flower&&i%2===0)ball(.14,i%3?0xffce6c:0xdb7397,Math.sin(a)*.48,1.5+(i%3)*.24,Math.cos(a)*.48,g)}
  g.scale.setScalar(s||1);p.add(g);return g;
}
function wTree(p,x,y,z,s){
  var g=wGroup(x,y,z);cyl(.22,.4,4.5,WP.wood,0,2.2,0,g,8);
  for(var i=0;i<11;i++){var a=i*2.4;ball(1.25,[0x40683c,0x557e3c,0x6a9146][i%3],Math.sin(a)*1.35,3.8+(i%4)*.5,Math.cos(a)*1.3,g)}
  g.scale.setScalar(s||1);p.add(g);
}
function wTable(p,x,y,z,w,d){var g=wGroup(x,y,z);box(w,.18,d,worldSurface('wood',WP.wood),0,1.65,0,g);[-1,1].forEach(function(a){[-1,1].forEach(function(b){box(.16,1.6,.16,WP.edge,a*(w/2-.2),.8,b*(d/2-.2),g)})});p.add(g);return g}
function wChair(p,x,y,z,c,ry){var g=wGroup(x,y,z,ry);box(1.0,.2,.95,c||WP.wood,0,.95,0,g);box(1.0,1.05,.16,c||WP.wood,0,1.5,-.4,g);[-1,1].forEach(function(a){[-1,1].forEach(function(b){box(.12,.9,.12,WP.edge,a*.38,.45,b*.35,g)})});p.add(g)}
function wCup(p,x,y,z){cyl(.16,.12,.26,0xfff4d6,x,y+.13,z,p,10);cyl(.125,.125,.012,0x563424,x,y+.27,z,p,10);ring3(.12,.035,0xfff4d6,x+.18,y+.15,z,p,0,0)}
function wBooks(p,x,y,z,w,h,potions){
  var g=wGroup(x,y,z);box(w,h,.08,WP.edge,0,h/2,-.36,g);[-1,1].forEach(function(s){box(.12,h,.85,WP.wood,s*w/2,h/2,0,g)});for(var row=0;row<4;row++){var yy=.2+row*(h-.4)/4;box(w+.1,.12,.85,WP.wood,0,yy,0,g);
    for(var j=0;j<Math.floor(w/.35);j++){var xx=-w/2+.25+j*.35,c=[0x92554d,0x477c81,0xcbab68,0x777395,0x637b4c][(j+row)%5];if(potions){cyl(.12,.17,.4,GLOW(c,.35),xx,yy+.27,.1,g,8);cyl(.055,.055,.12,WP.gold,xx,yy+.53,.1,g,6)}else{var b=box(.24,.5+(j%3)*.12,.44,c,xx,yy+.35,.1,g);if(j%5===0)b.rotation.z=.13;box(.22,.03,.02,WP.gold,xx,yy+.28,.33,g,true)}}}
  p.add(g);return g;
}
function wLamp(p,x,y,z){cyl(.08,.1,3.2,WP.edge,x,y+1.6,z,p,8);cyl(.44,.2,.65,lampMat,x,y+3.25,z,p,10);cyl(.5,.5,.1,WP.gold,x,y+3.6,z,p,10);cyl(.32,.42,.12,WP.edge,x,y+.06,z,p,10)}
function wSofa(p,x,y,z,c){var g=wGroup(x,y,z,PI);box(5, .65,1.8,c,0,.65,0,g);box(5,1.3,.42,c,0,1.4,-.7,g);[-1,1].forEach(function(s){box(.5,1.1,2,c,s*2.5,1,0,g);box(2,.28,1.5,c, s*1.1,1.09,.12,g);var q=box(.9,.85,.25,0xd6a86e,s*1.65,1.65,-.36,g);q.rotation.z=s*.15});p.add(g)}
function wBed(p,x,y,z){var g=wGroup(x,y,z);box(4.2,.65,6,WP.wood,0,.4,0,g);box(4, .55,5.8,0xfff0d8,0,1,0,g);box(4.25,2.2,.35,WP.wood,0,1.3,-2.8,g);box(4.05,.25,3.5,THEME==='arcade'?0x9b4685:THEME==='wizard'?0x824569:0xd6b39d,0,1.32,.95,g);[-1,1].forEach(function(s){box(1.6,.36,1.0,0xfff8e7,s*1,1.4,-1.9,g);box(1.2,1.3,1.3,WP.wood,s*3, .65,-2,g);wLamp(g,s*3,1.3,-2)});p.add(g)}
function wRug(p,x,y,z,w,d,c){box(w,.035,d,c,x,y,z,p,true);[-1,1].forEach(function(s){box(w-.3,.012,.09,WP.gold,x,y+.03,z+s*(d/2-.18),p,true);box(.09,.012,d-.3,WP.gold,x+s*(w/2-.18),y+.03,z,p,true)})}
function wRail(p,x,y,z,w,ry){var g=wGroup(x,y,z,ry);box(w,.12,.12,WP.edge,0,1.8,0,g);box(w,.1,.12,WP.edge,0,.35,0,g);for(var i=0;i<=w;i+=.8)box(.07,1.7,.07,WP.edge,-w/2+i,.9,0,g);p.add(g)}
function wArcade(p,x,y,z,c,ry){
  var g=wGroup(x,y,z,ry);box(1.65,1.5,1.4,WP.edge,0,.75,0,g);box(1.65,1.8,.85,c,0,2.25,-.26,g);box(1.8,.38,1.1,WP.edge,0,3.3,-.18,g);
  box(1.36,1.2,.06,GLOW(0x205db6,.5),0,2.3,.2,g);box(1.8,.16,1.2,c,0,1.5,.26,g);box(1.5,.16,.07,GLOW(c,.9),0,3.3,.41,g);
  for(var i=0;i<12;i++)box(.13,.12,.03,GLOW(i%3?0xffd650:0xff6ec7,.8),-.5+(i%4)*.32,1.96+Math.floor(i/4)*.26,.24,g,true);
  cyl(.04,.04,.25,0xa9c3db,-.4,1.73,.48,g,8);ball(.1,0xff5275,-.4,1.87,.48,g);[.18,.42,.66].forEach(function(a){cyl(.09,.09,.06,0xffd250,a,1.62,.5,g,8)});
  box(.65,.16,.06,0xffd36a,0,.7,.73,g);wChair(g,0,0,1.7,c,PI);p.add(g);return g;
}
function wWindow(p,x,y,z,w,h,arch){
  var g=wGroup(x,y,z);box(w,h,.15,WP.edge,0,h/2,0,g);box(w-.3,h-.3,.08,GLOW(THEME==='wizard'?0x6886bd:0xa6c9c1,.22),0,h/2,.11,g);
  box(.12,h,.16,WP.edge,0,h/2,.17,g);box(w,.12,.16,WP.edge,0,h*.52,.17,g);
  if(arch){var a=new T.Mesh(new T.TorusGeometry(w/2,.18,6,24,PI),M(WP.gold));a.position.set(0,h,.12);g.add(a);var glass=new T.Mesh(new T.CircleGeometry(w/2-.16,24,0,PI),GLOW(0x7985ba,.3));glass.position.set(0,h,.1);g.add(glass)}
  p.add(g);return g;
}
function wFireplace(p,x,y,z){var g=wGroup(x,y,z);box(4.6,4.4,.9,WP.stone,0,2.2,-.35,g);box(2.8,2.2,1.1,0x30232c,0,1.25,.15,g);box(5,.3,1.7,WP.gold,0,3.3,.1,g);box(5,.25,2.0,WP.stone,0,.13,.3,g);
  for(var i=0;i<5;i++){var flame=new T.Mesh(new T.ConeGeometry(.25,.9+(i%3)*.25,7),GLOW(i%2?0xffca60:0xff7a39,.85));flame.position.set(-.9+i*.45,.65,.65);g.add(flame)}wSign(g,'THE SPELL ROOM',0,4.1,.12,3.8,1);p.add(g)}
function wPool(p){var x=33,z=3;box(17,.7,11,WP.stone,x,.35,z,p);box(15,.1,9,GLOW(THEME==='wizard'?0x886bef:0x4bc9da,.25),x,.78,z,p,true);
  for(var i=0;i<6;i++){var r=ring3(.7+i*.65,.025,GLOW(0xc0f7ff,.45),x,.86,z,p,PI/2,0);r.scale.z=.6}
  [-1,1].forEach(function(s){box(17,.3,.65,0xc9c0b5,x,.8,z+s*5.3,p);box(.65,.3,10,0xc9c0b5,x+s*8.2,.8,z,p)});
  wRail(p,33,.55,-5.4,21);wRail(p,43,.55,4,18,PI/2);wPlant(p,41,.6,11,1.5,true);wPlant(p,25,.6,-4,1.2,true);
}
function wArchitecture(){
  var g=worldDecor;
  box(46,1.3,28,WP.stone,0,-.2,0,g);box(24,1.2,19,WP.stone,11,-.65,22,g);box(22,1.3,21,WP.stone,33,-.3,4,g);
  ROOMS.forEach(function(r){var y=floorHeight(r),w=r.x1-r.x0,d=r.z1-r.z0;
    box(w,.5,d,WP.edge,r.cx,y-.3,r.cz,g);
    for(var ix=r.x0+.06;ix<r.x1-.1;ix+=2.0)for(var iz=r.z0+.06;iz<r.z1-.1;iz+=2.0){var tone=THEME==='arcade'?((Math.floor((ix-r.x0)/2)+Math.floor((iz-r.z0)/2))%2?0x77668b:0x4b425f):WP.floor;box(Math.min(1.94,r.x1-ix),.07,Math.min(1.94,r.z1-iz),worldSurface(THEME==='cafe'?'wood':'stone',tone),ix+Math.min(1.94,r.x1-ix)/2,y-.025,iz+Math.min(1.94,r.z1-iz)/2,g,true)}
    if(r.z1<=0){box(w,.4,.4,WP.gold,r.cx,y-.2,.1,g);if(r.k!=='growth')wRail(g,r.cx,y,0,w-.4)}
  });
  /* Rear wall, tall glazed bays and a visible timber/stone structure. */
  var rear=extWall('galleryBack',0,-1);rear.position.y=.55;
  box(44,GALLERY+6.5,.65,worldSurface('stone',WP.wall),0,(GALLERY+6.5)/2,-13,rear);
  for(var x=-21;x<22;x+=5.4){box(.3,GALLERY+7,.9,WP.wood,x,(GALLERY+7)/2,-12.7,rear);wWindow(rear,x+2.5,GALLERY+.8,-12.6,3.5,3.8,THEME==='wizard');if(GALLERY>7)wWindow(rear,x+2.5,7.8,-12.6,3.5,3.5,true)}
  box(44,.45,1,WP.wood,0,GALLERY+6.5,-12.8,rear);
  if(THEME!=='cafe')for(var course=0;course<GALLERY+6;course+=.9){box(43.9,.025,.04,WP.edge,0,course,-12.64,rear,true);for(var joint=-21+(Math.round(course/.9)%2);joint<22;joint+=2)box(.025,.88,.04,WP.edge,joint,course+.45,-12.64,rear,true)}

  for(var x2=-21;x2<=21;x2+=10.5){box(.6,GALLERY,.6,WP.wood,x2,GALLERY/2,-.15,g);wLamp(g,x2,0,.7)}
  if(THEME==='wizard'){
    /* The middle gallery projects forward so the cutaway reveals all three levels. */
    box(26,.5,13,worldSurface('stone',WP.floor),-9,7.3,-2.5,g);box(14.8,.5,13,worldSurface('stone',WP.floor),14.6,7.3,-2.5,g);
    wRail(g,-9,7.55,4,26);wRail(g,14.6,7.55,4,14.8);
    wFireplace(g,14,7.6,-3.4);wBooks(g,-16,7.6,-3.4,8,5,true);
    wRug(g,14,7.6,.8,8,5,0x713b5f);wSofa(g,14,7.6,2.5,0x6c4057);wLamp(g,-20,7.6,2);wLamp(g,21,7.6,2);
  }
  /* Stair tread heights and walk height share exactly the same z interval. */
  var count=GALLERY*2;
  for(var j=0;j<count;j++){var dz=7.5/count,yy=(j+1)*GALLERY/count;box(2.7,yy,dz+.02,WP.wood,5.5,.55+yy/2,1-(j+.5)*dz,g);box(2.74,.06,dz,WP.gold,5.5,.58+yy,1-(j+.5)*dz,g,true)}
  for(var j2=0;j2<=count;j2+=2){var zz=1-j2*7.5/count,yy2=.55+j2*GALLERY/count;box(.08,1.6,.08,WP.edge,7,yy2+.8,zz,g)}
  var hand=box(.13,Math.hypot(GALLERY,7.5),.13,WP.gold,7,.55+GALLERY/2+1.6,-2.75,g);hand.rotation.x=Math.atan2(-7.5,GALLERY);
  wBed(g,8.8,.55+GALLERY,-9.5);wBooks(g,1.8,.55+GALLERY,-12,2.4,4,false);
  /* Roof remains operable without hiding galleries in cutaway mode. */
  box(45,.7,15,RM(WP.edge),0,GALLERY,-6.5,roof);scene.add(roof);
  wPool(g);
}
function wCommonInteriors(){
  var g=worldDecor;
  wRug(g,11,.62,6.1,10,7,THEME==='arcade'?0x363354:THEME==='wizard'?0x703f65:0x8c7455);
  wSofa(g,11,.55,8.5,THEME==='cafe'?0xc2963d:THEME==='arcade'?0x7d426f:0x914c4a);
  var table=wTable(g,11,.55,5.4,4,1.7);wCup(table,-.9,1.75,0);box(.8,.12,.55,0xe1ceb1,.5,1.8,0,table,true);
  var tvg=wGroup(11,.55,1.2);box(5.7,1.1,1.5,WP.wood,0,.55,0,tvg);box(4.5,2.6,.22,WP.edge,0,2.5,0,tvg);
  var scr=new T.Mesh(new T.PlaneGeometry(4.2,2.3),tvMat);scr.position.set(0,2.5,.12);scr.userData.keep=true;tvg.add(scr);tvg.userData.sel='__tv';scene.add(tvg);tvPick=tvg;mergeStatic(tvg);
  var dogbed=cyl(1.35,1.5,.4,THEME==='cafe'?0xa1a06c:0x796599,3.4,.75,10.2,g,24);dogbed.scale.z=.8;
  wPlant(g,21,.55,11.5,1.6,true);wPlant(g,1,.55,1.2,1.2);wLamp(g,16,.55,10.5);
  wBooks(g,20.8,.55,1.2,2.1,4,THEME==='wizard');
  var bath=wGroup(17,.55+GALLERY,-11);cyl(1.5,1.3,.9,0xe9d8c7,0,.5,0,bath,24);cyl(1.3,1.3,.06,GLOW(0x7dcfda,.2),0,1,0,bath,24);wPlant(bath,3,0,0,1);g.add(bath);
  wRug(g,-18,.6+GALLERY,-10,3.5,5,0x577e78);wBooks(g,-12,.55+GALLERY,-12,2,3,false);
  wRail(g,11,0,31,22);wRail(g,0,0,25,12,PI/2);wRail(g,22,0,25,12,PI/2);
  for(var q=0;q<7;q++){wPlant(g,1+q*3.2,0,30,1,true)}
}
function wCafe(){var g=worldDecor;
  /* Pastry counter, espresso machine, stools and chalkboard menu. */
  var bar=wGroup(-6,.55,2);box(7,1.8,2,0xa87544,0,.9,0,bar);box(7.4,.2,2.3,0xf1ddbb,0,1.9,0,bar);
  for(var i=0;i<12;i++)box(.08,1.4,.07,0xe6b874,-3.2+i*.58,.9,1.04,bar,true);
  box(3.2,1.1,1.5,GLASS,-1.6,2.55,0,bar);[2.12,2.55].forEach(function(y){box(3.2,.06,1.4,WP.gold,-1.6,y,0,bar,true);for(var j=0;j<6;j++)cyl(.17,.22,.15,j%2?0xd2984f:0x80563b,-2.8+(j%3)*.9,y+.1,-.3+Math.floor(j/3)*.6,bar,8)});
  box(1.7,1.2,1.3,0x4a5b50,1.7,2.6,0,bar);box(1.5,.12,1.5,0xc4b6a1,1.7,2.06,0,bar);[1.2,1.9,2.5].forEach(function(x){cyl(.11,.11,.2,0xc9c6bc,x,2.4,.8,bar,10);wCup(bar,x,2.07,.8)});g.add(bar);
  wSign(g,'Coffee & little joys',-6,5.4,1,7,2.7,'#f4dfb2','#273d32');
  [-8,-5.5,-3].forEach(function(x){wChair(g,x,.55,4,0xc89553,PI)});
  wBooks(g,-1.1,.55,1.2,1.7,4,false);box(1.7,4,1.7,0xf0e3cd,-1.2,.55+2,4.3,g);
  var cafeTable=wTable(g,-19,.55,7,2.5,2);wCup(cafeTable,0,1.75,0);wChair(g,-19,.55,9,WP.wood);
  /* Glazed conservatory, pergola and leafy patio. */
  var side=wGroup(-22,.55,0,PI/2);for(var w=0;w<4;w++){wWindow(side,-9+w*6,0,0,5.6,5.5,false)}g.add(side);
  [-21,-10].forEach(function(x){[-12,12].forEach(function(z){box(.3,6.7,.3,WP.wood,x,3.7,z,g)})});
  for(var z=-12;z<=12;z+=3)box(12,.2,.2,WP.wood,-16,7,z,g);
  [[4,23],[15,24]].forEach(function(p){var t=wTable(g,p[0],0,p[1],3,2.5);wCup(t,0,1.75,0);wChair(g,p[0]-2,0,p[1],WP.wood,PI/2);wChair(g,p[0]+2,0,p[1],WP.wood,-PI/2);cyl(.07,.07,4.5,WP.wood,p[0],2.25,p[1],g,8);cyl(.1,3.1,1,0xf6e8ce,p[0],4.7,p[1],g,10)});
  [[-25,-10],[-25,10],[-20,18],[27,19],[45,-8]].forEach(function(p){wTree(g,p[0],-.5,p[1],1.5)});
  var sign=wGroup(9,0,29,-.12);box(3.2,4,.2,WP.wood,0,2,0,sign);wSign(sign,'GOOD COFFEE DAY',0,2.3,.12,2.9,3.5);g.add(sign);
  for(var v=0;v<18;v++){wPlant(g,-21+v*2.5,GALLERY+6.6,-12.4,.6,true)}
}
function wArcadeWorld(){var g=worldDecor;
  [[-18,6],[-14.8,6],[-8,2],[-4,2],[19,2]].forEach(function(p,i){wArcade(g,p[0],.55,p[1],[0xf23fa0,0x27cbe5,0xe8ae37][i%3],0)});
  wSign(g,'GAME ON',14,GALLERY+4,-12.05,12,3,'#ff79d4','#251933');wSign(g,'PLAYER ONE',-9,GALLERY+4,-12.05,8,2,'#72f7ff','#192b45');
  for(var i=0;i<4;i++){var x=-20+i*11;box(8,.12,.15,GLOW(i%2?0xff39c7:0x39e8ff,1),x,GALLERY+6.3,-12.2,g,true);box(.12,GALLERY+6,.15,GLOW(i%2?0x39e8ff:0xff39c7,1),x,3+GALLERY/2,-12.2,g,true)}
  var f=wTable(g,10,0,20,5,3);box(4.6,.13,2.6,0x225677,0,1.85,0,f);[-1.6,-.6,.6,1.6].forEach(function(x,i){box(.05,.05,3.5,0xd1d6df,x,2.12,0,f);[-.8,0,.8].forEach(function(z){box(.22,.32,.22,i%2?0xff4a94:0x4ae5f5,x,2.07,z,f)})});
  var pin=wGroup(18,.55,8);box(3.4,1.8,5.4,0x712671,0,.9,0,pin);var screen=box(3,.1,4.6,GLOW(0x37bdd6,.7),0,1.95,0,pin);screen.rotation.x=-.1;box(3.4,2.5,.4,0x292443,0,2.3,-2.5,pin);for(var p=0;p<7;p++)cyl(.2,.2,.18,GLOW(p%2?0xff5fae:0xffd45c,.8),Math.sin(p*2)*.9,2.1,-1.7+p*.55,pin,10);g.add(pin);
  for(var r=0;r<4;r++){wArcade(g,3+r*5,0,25,[0xff49c8,0x20cde2][r%2],0)}
  /* Distant skyline gives the reference's rooftop-city setting. */
  for(var i2=0;i2<15;i2++){var x2=-46+i2*7,h=5+(i2*7%13);box(5,h,4,0x20263f,x2,h/2-8,-27,g);for(var yy=0;yy<h-1;yy+=2)for(var xx=-1;xx<=1;xx++){box(.4,.6,.03,GLOW((i2+xx)%3?0x586da2:0xe9aa67,.4),x2+xx*1.4,yy-7,-24.97,g,true)}}
}
function wWizard(){var g=worldDecor;
  /* Round stone buttresses, slate spires, ivy, alchemy and observatory. */
  [[-22,-12],[22,-12]].forEach(function(p){cyl(2.1,2.5,22,WP.stone,p[0],10.5,p[1],g,12);for(var j=0;j<13;j++)cyl(2.15,2.15,.12,WP.edge,p[0],j*1.7,p[1],g,12);cyl(0,3.5,7,0x3c3a64,p[0],25,p[1],g,12);ball(.3,WP.gold,p[0],28.6,p[1],g)});
  wBooks(g,-19,.55,1,4.5,5.8,true);wBooks(g,-12,.55,1,2,5.8,false);
  var cauldron=wGroup(-18,.55,7);cyl(1.1,1.5,1.7,0x37303e,0,1,0,cauldron,16);cyl(1.03,1.03,.06,GLOW(0x9576ff,.9),0,1.87,0,cauldron,20);ring3(1.15,.1,WP.gold,0,1.9,0,cauldron,PI/2);for(var i=0;i<5;i++)ball(.12,GLOW(0xb7a2ff,.8),Math.sin(i)*.6,2.2+i*.25,Math.cos(i)*.6,cauldron);g.add(cauldron);
  wFireplace(g,-5,.55,1.5);var dining=wTable(g,-13,7.6,.3,5,3);[-1.7,0,1.7].forEach(function(x){wCup(dining,x,1.75,0);wChair(g,-13+x,7.6,2.8,0x8c474c)});
  wSign(g,'AMORN / ATELIER',10,5.9,.1,8,1.7,'#ffe2a0','#392c47');
  wBooks(g,-6,.55+GALLERY,-12,5,5.2,false);wPlant(g,-20,.55+GALLERY,-1,1.4);
  var orb=wGroup(16,.55+GALLERY,-7);cyl(1,1.3,.4,WP.wood,0,.2,0,orb,12);cyl(.16,.16,2,WP.gold,0,1.4,0,orb,10);ball(.65,GLOW(0x8f72e5,.6),0,2.5,0,orb);ring3(1.2,.045,WP.gold,0,2.5,0,orb,.8,.6);ring3(1.4,.045,WP.gold,0,2.5,0,orb,1.6,.4);g.add(orb);
  for(var j=0;j<13;j++){wPlant(g,21+Math.sin(j)*.6,j*1.65,-12.0,.75,j%3===0)}
  var terrace=cyl(11,11,1,WP.stone,11,-.45,23,g,32);terrace.scale.z=.8;
  var scope=wGroup(16,0,24);cyl(.1,.1,2.6,WP.gold,0,1.3,0,scope,8);var tube=cyl(.3,.4,2.5,WP.gold,0,2.8,0,scope,12);tube.rotation.z=1;g.add(scope);
  [[3,24],[5,28],[17,28]].forEach(function(p){wPlant(g,p[0],0,p[1],1.8,true)});
  for(var k=0;k<12;k++){var x=-55+k*10;var mountain=new T.Mesh(new T.ConeGeometry(8,14+(k%3)*8,5),M(k%2?0x4a526d:0x66728a));mountain.position.set(x,-10,-35-(k%3)*6);g.add(mountain)}
  for(var t=0;t<12;t++)wTree(g,-29+t*6,-8,-21-(t%3)*4,1.2);
}
function wInstallProps(){
  function desk(g,c,laptop){wTable(g,0,0,0,3,1.6);box(laptop?1.3:1.8,laptop?.85:1.15,.09,WP.edge,0,2.35,-.35,g);box(laptop?1.15:1.6,laptop?.7:1,.02,GLOW(THEME==='wizard'?0x9173cb:0x77b6b3,.4),0,2.35,-.29,g,true);box(1.2,.05,.45,0xb5b9b3,0,1.8,.3,g,true);wChair(g,0,0,1.5,c,PI);return 3.2}
  PROPS.deskMonitor=function(g,c){return desk(g,c,false)};
  PROPS.laptopDesk=PROPS.tableLaptop=PROPS.barLaptop=PROPS.tradingDesk=function(g,c){return desk(g,c,true)};
  PROPS.bookshelf=function(g){wBooks(g,0,0,0,2.5,3.7,THEME==='wizard');return 3.7};
  PROPS.cabinet=function(g,c){box(2.2,2.5,1,WP.wood,0,1.25,0,g);for(var i=0;i<3;i++){box(2,.65,.05,c,0,.45+i*.8,.53,g,true);box(.4,.06,.08,WP.gold,0,.45+i*.8,.6,g,true)}return 2.5};
  PROPS.whiteboard=PROPS.ideaBoard=function(g){box(2.4,2,.15,WP.wood,0,2.3,0,g);box(2.2,1.8,.05,THEME==='wizard'?0xbfa67c:0xe9dcc1,0,2.3,.1,g);for(var i=0;i<5;i++)box(.8,.05,.02,WP.edge,-.3,2.9-i*.27,.14,g,true);[-1,1].forEach(function(s){box(.1,2,.1,WP.wood,s,1,0,g)});return 3.4};
  PROPS.armchair=function(g,c){wChair(g,0,0,0,c);box(.25,.5,1,c,-.6,1.2,0,g);box(.25,.5,1,c,.6,1.2,0,g);return 2.1};
  PROPS.easel=function(g){PROPS.whiteboard(g);box(1.6,1.5,.05,0xdbc1a0,0,2.4,.15,g);ball(.4,THEME==='wizard'?GLOW(0x9473dd,.6):0xd79b5b,0,2.5,.2,g);return 3.4};
  PROPS.plant=PROPS.planter=function(g){wPlant(g,0,0,0,1.2,true);return 2.4};
  PROPS.gardenTree=function(g){wTree(g,0,0,0,.8);return 4.8};
  PROPS.bench=function(g){box(3,.2,1,WP.wood,0,1,0,g);box(3,1,.15,WP.wood,0,1.6,-.4,g);[-1,1].forEach(function(s){box(.2,1,.7,WP.edge,s*1.2,.5,0,g)});return 2.2};
  PROPS.birdbath=function(g){cyl(.25,.5,1.6,WP.stone,0,.8,0,g,12);cyl(1,.6,.25,WP.stone,0,1.7,0,g,20);cyl(.8,.8,.04,0x82bbce,0,1.85,0,g,20);return 2.1};
  PROPS.globe=function(g){cyl(.5,.6,.15,WP.wood,0,.1,0,g,12);cyl(.08,.08,1.5,WP.gold,0,.8,0,g,8);ball(.7,GLOW(0x7986bd,.25),0,1.9,0,g);ring3(.9,.04,WP.gold,0,1.9,0,g,.2,.3);return 2.8};
  PROPS.workbench=function(g,c){if(THEME==='arcade'){wArcade(g,0,0,0,c);return 3.7}var t=wTable(g,0,0,0,3,1.6);if(THEME==='wizard'){wBooks(g,0,1.8,-.5,2,1.5,true)}else{box(1.3,.8,1,0x647968,0,2.1,0,g);wCup(g,1,1.8,0)}return 3.4};
  PROPS.machine=PROPS.conveyor=PROPS.workbench;
  PROPS.gymHub=function(g,c){wRug(g,0,.05,0,3,3.5,c);box(2,.4,1,WP.wood,0,.7,0,g);cyl(.08,.08,3,0xa9a9b6,0,1.1,0,g,8).rotation.z=PI/2;[-1,1].forEach(function(s){cyl(.4,.4,.4,WP.edge,s*1.2,1.1,0,g,12).rotation.z=PI/2});return 2};
  PROPS.bathHub=function(g){cyl(1.3,1.4,.3,0xa18db2,0,.2,0,g,24);[-1,1].forEach(function(s){cyl(.15,.15,.5,0xffe2af,s*1.7,.25,0,g,10);ball(.1,GLOW(0xffb95b,.8),s*1.7,.6,0,g)});return 1};
  PROPS.poolHub=function(g){wChair(g,0,0,0,0x7cafa9);return 1.9};
}
if(!SP){
  wInstallProps();wArchitecture();wCommonInteriors();
  if(THEME==='cafe'){wCafe();wAccentLight(-6,5,2,0xffc982,.65,18);wAccentLight(9,11,-10,0xffbb6c,.6,16)}
  else if(THEME==='arcade'){wArcadeWorld();wAccentLight(-15,4,6,0xff3399,1.6,22);wAccentLight(18,4,7,0x23caff,1.6,22);wAccentLight(12,12,-11,0xff40bd,1.2,18)}
  else{wWizard();wAccentLight(14,10,-1,0xff9e45,1.2,20);wAccentLight(-18,3,7,0x9970ff,1.0,16);wAccentLight(8,18,-10,0xffb366,1,16)}

  buildTrophyShelf();mergeStatic(worldDecor);Object.keys(extWalls).forEach(function(k){mergeStatic(extWalls[k])});
  glowDecals.forEach(function(g,i){g.position.y=floorHeight(room(['work','apps','growth','income','life','gym','bath'][i]))+.08;g.material.color.set(THEME==='arcade'?0xff66ce:0xffb964)});
  var sky=THEME==='cafe'?['#d6c8ad','#f6e1ba']:THEME==='wizard'?['#393951','#c4a0a0']:['#080f2e','#332044'];
  KF.forEach(function(k){var night=k.h<6||k.h>=23;k.top.set(sky[0]);k.bot.set(sky[1]);if(night){k.top.multiplyScalar(.35);k.bot.multiplyScalar(.45)}k.sun.set(THEME==='arcade'?0xb9a5ff:0xffe9c8);k.hs.set(THEME==='arcade'?0xb3b9ed:0xffedda);k.hg.set(THEME==='arcade'?0x3c2853:0x69615a);k.si=night?.35:.65;k.hi=night?.62:.78;});
}
