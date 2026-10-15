/* Soft sculpted figures, with independent clothing materials and accessory groups. */
var OUTFITS={astronaut:'นักบินอวกาศ',barista:'บาริสต้า',gamer:'เกมเมอร์',wizard:'นักเวท',casual:'วันสบาย ๆ'};
var DOGOUTFITS={bandana:'ผ้าพันคอ',harness:'สายรัด',spacesuit:'ชุดอวกาศ',cape:'ผ้าคลุมนักเวท',sweater:'เสื้อไหมพรม',none:'ไม่ใส่ชุด'};
function outfitDefault(theme){
  var type={space:'astronaut',cafe:'barista',arcade:'gamer',wizard:'wizard'}[theme];
  return {human:{outfit:type,top:theme==='wizard'?'#7460a8':theme==='cafe'?'#426b55':theme==='arcade'?'#b45192':'#e2e8ef',bottom:'#344355',skin:'#e6b58f',hair:'#3d2a25',accessory:theme==='wizard'?'hat':'none'},dog:{outfit:{space:'spacesuit',cafe:'bandana',arcade:'harness',wizard:'cape'}[theme],color:theme==='wizard'?'#8a6aba':theme==='cafe'?'#d18b45':'#53cbe3',fur:'#303342',accessory:'none'}};
}
function validWardrobe(raw){
  var d=outfitDefault(THEME),hex=/^#[0-9a-f]{6}$/i;
  ['human','dog'].forEach(function(k){var s=raw&&raw[k];if(!s)return;Object.keys(d[k]).forEach(function(f){
    if(f==='outfit'){if((k==='human'?OUTFITS:DOGOUTFITS)[s[f]])d[k][f]=s[f]}
    else if(f==='accessory'){if((k==='human'?['none','glasses','hat','headphones']:['none','hat','bow']).indexOf(s[f])>=0)d[k][f]=s[f]}
    else if(hex.test(s[f]||''))d[k][f]=s[f];
  })});return d;
}
var wardrobe=outfitDefault(THEME);
try{var savedLook=JSON.parse(localStorage.getItem('lifehouse.wardrobe'));if(savedLook)wardrobe=validWardrobe(savedLook)}catch(e){}
function sculpt(p,x,y,z,sx,sy,sz,c){var m=ball(1,c,x,y,z,p);m.scale.set(sx,sy,sz);return m}
function softLimb(p,x,y,len,r,c){var g=wGroup(x,y,0);cyl(r,r*.88,len,c,0,-len/2,0,g,12);ball(r,c,0,0,0,g);ball(r*.88,c,0,-len,0,g);p.add(g);return g}
function mergeRig(body,joints){
  joints.forEach(function(j){mergeStatic(j);j.traverse(function(o){if(o.isMesh)o.userData.keep=true})});
  mergeStatic(body);
}
function charHat(p,outfit,c,y){
  y=y||.52;
  if(outfit==='wizard'){cyl(.69,.72,.09,c,0,y,0,p,20);var tip=cyl(0,.48,1.05,c,.08,y+.55,0,p,14);tip.rotation.z=-.15;ball(.07,GLOW(0xf0ce76,.5),.16,y+1.04,0,p)}
  else if(outfit==='barista'){sculpt(p,0,y+.12,-.02,.55,.22,.47,c);box(.6,.06,.35,c,0,y,.4,p,true)}
  else{sculpt(p,0,y+.12,0,.51,.28,.48,c);box(.65,.06,.4,c,0,y,.4,p,true)}
}
function buildHuman(look,attach){
  var g=new T.Group(),body=new T.Group();g.add(body);var top=look.top,skin=look.skin,hair=look.hair;
  var lg=[softLimb(body,-.23,1.05,.79,.19,look.bottom),softLimb(body,.23,1.05,.79,.19,look.bottom)];
  lg.forEach(function(l){sculpt(l,0,-.82,.13,.24,.16,.4,0x252b38);box(.43,.06,.65,0xd9dcda,0,-.94,.1,l,true)});
  sculpt(body,0,1.59,0,.55,.65,.34,top);cyl(.14,.15,.26,skin,0,2.16,0,body,12);
  var ar=[softLimb(body,-.62,1.95,.72,.17,top),softLimb(body,.62,1.95,.72,.17,top)];ar.forEach(function(a){sculpt(a,0,-.84,.01,.16,.2,.15,skin)});
  var hd=wGroup(0,2.65,0);body.add(hd);sculpt(hd,0,0,0,.51,.56,.46,skin);sculpt(hd,-.5,-.04,0,.09,.16,.1,skin);sculpt(hd,.5,-.04,0,.09,.16,.1,skin);
  sculpt(hd,0,.3,-.06,.53,.34,.45,hair);for(var i=0;i<5;i++){sculpt(hd,-.34+i*.16,.31-(i%2)*.05,.3,.18,.18,.15,hair)}
  [-1,1].forEach(function(s){sculpt(hd,s*.19,-.01,.421,.08,.105,.04,0xfffaf0);sculpt(hd,s*.19,-.005,.455,.044,.065,.018,0x27313d);ball(.015,0xffffff,s*.18,.023,.475,hd);sculpt(hd,s*.29,-.16,.395,.08,.035,.018,0xd69082)});
  sculpt(hd,0,-.1,.45,.07,.09,.09,skin);var smile=ring3(.11,.014,0x985d52,0,-.2,.438,hd,0,0);smile.scale.y=.45;
  if(look.outfit==='astronaut'){
    box(.62,.42,.12,0x354f68,0,1.65,.34,body);box(.23,.12,.04,GLOW(0x6ed9ef,.7),-.12,1.72,.42,body,true);box(.12,.12,.04,0xe59457,.2,1.6,.42,body,true);
    box(.7,.9,.35,0xc5d0dc,0,1.6,-.43,body);[-1,1].forEach(function(s){cyl(.13,.13,.75,0x8497aa,s*.34,1.6,-.48,body,10)});
    var collar=ring3(.39,.07,0x62798a,0,2.12,0,body,PI/2);collar.scale.z=.8;
  }else if(look.outfit==='barista'){
    box(.75,.94,.08,0xb8895c,0,1.44,.33,body);box(.36,.28,.04,0x99714f,0,1.25,.39,body,true);box(.08,.4,.07,0xb8895c,-.27,2,.27,body,true);box(.08,.4,.07,0xb8895c,.27,2,.27,body,true);
  }else if(look.outfit==='wizard'){
    cyl(.46,.69,.96,top,0,1.08,0,body,18);box(.7,.1,.08,0xd8b36c,0,1.55,.37,body,true);
    var cape=cyl(.42,.8,1.65,top,0,1.25,-.24,body,18,1);cape.scale.z=.45;ball(.09,0xe1bd76,0,2,.32,body);
  }else if(look.outfit==='gamer'){
    box(.25,.38,.035,0x84e1e7,0,1.65,.34,body,true);box(.1,.1,.04,0xffd267,0,1.65,.37,body,true);[-1,1].forEach(function(s){box(.04,.36,.03,0xe2dbe9,s*.16,1.93,.31,body,true)});
  }else{box(.18,.18,.03,0xf5dfb3,.23,1.75,.33,body,true)}
  if(look.accessory==='hat')charHat(hd,look.outfit,top,.48);
  if(look.accessory==='glasses'){[-1,1].forEach(function(s){ring3(.14,.025,0x2f3546,s*.19,0,.49,hd);});box(.11,.025,.03,0x2f3546,0,0,.49,hd,true)}
  if(look.accessory==='headphones'){
    var band=ring3(.56,.045,0x31384a,0,.1,0,hd);band.scale.y=1.05;[-1,1].forEach(function(s){sculpt(hd,s*.55,.01,0,.12,.22,.17,0x39465b);sculpt(hd,s*.63,.01,0,.04,.12,.1,top)})
  }
  mergeRig(body,lg.concat(ar,[hd]));
  g.userData.sel='__amorn';g.rotation.order='YXZ';g.scale.setScalar(1.1);if(attach)scene.add(g);
  return {g:g,body:body,lg:lg,ar:ar,hd:hd};
}
function buildDog(look,attach){
  var g=new T.Group(),body=new T.Group();g.add(body);var fur=look.fur,white=0xfff5df,col=look.color;
  sculpt(body,-.05,.86,0,.82,.43,.4,fur);sculpt(body,.56,.83,0,.38,.46,.41,white);sculpt(body,.63,1.13,0,.36,.28,.38,white);
  var hd=wGroup(.92,1.34,0);body.add(hd);sculpt(hd,0,0,0,.4,.41,.36,fur);sculpt(hd,.32,-.16,0,.34,.22,.25,white);sculpt(hd,.61,-.11,0,.09,.075,.12,0x26272c);sculpt(hd,.21,.04,0,.19,.34,.09,white);
  [-1,1].forEach(function(s){sculpt(hd,.2,.06,s*.29,.085,.1,.045,0xeccf7c);sculpt(hd,.23,.07,s*.32,.045,.065,.025,0x202e39);ball(.018,0xffffff,.25,.09,s*.34,hd);var ear=cyl(0,.2,.58,fur,-.12,.46,s*.26,hd,3);ear.rotation.x=s*.25;var inner=cyl(0,.11,.32,0xc68c86,-.08,.48,s*.29,hd,3);inner.rotation.x=s*.25});
  sculpt(hd,.38,-.31,0,.13,.09,.09,0xdd8e97);
  var tail=wGroup(-.82,1.05,0);body.add(tail);sculpt(tail,-.38,.13,0,.5,.21,.2,fur).rotation.z=-.35;sculpt(tail,-.8,.26,0,.25,.19,.18,white);
  var legs=[];[[.5,.25],[.5,-.25],[-.53,.25],[-.53,-.25]].forEach(function(p){var l=wGroup(p[0],.65,p[1]);sculpt(l,0,-.22,0,.12,.33,.12,fur);sculpt(l,.06,-.5,0,.19,.12,.15,white);body.add(l);legs.push(l)});
  if(look.outfit==='spacesuit'||look.outfit==='sweater'){
    sculpt(body,-.18,.89,0,.67,.445,.425,look.outfit==='spacesuit'?0xd9e3ec:col);
    if(look.outfit==='spacesuit'){box(.5,.28,.5,col,-.2,1.31,0,body);[-1,1].forEach(function(s){box(.3,.2,.04,0x485f79,-.1,1.03,s*.43,body,true)})}
    else for(var i=0;i<5;i++)ring3(.43,.025,white,-.65+i*.22,.88,0,body,0,PI/2).scale.y=.9;
  }
  if(look.outfit==='harness'){[.4,-.4].forEach(function(x){var strap=ring3(.41,.065,col,x,.86,0,body,0,PI/2);strap.scale.y=.95});box(.8,.08,.12,col,0,1.26,0,body,true)}
  if(look.outfit==='cape'){var cape=sculpt(body,-.2,1.19,0,.8,.13,.6,col);cape.rotation.z=.12;ball(.09,0xf0cc72,.6,1.15,.32,body)}
  if(look.outfit==='bandana'){var b=cyl(0,.34,.65,col,.63,.68,.12,body,3);b.rotation.z=PI;ring3(.36,.07,col,.66,1.0,0,body,0,PI/2)}
  if(look.outfit!=='none')cyl(.1,.1,.04,0xf3c977,.75,.82,.4,body,12).rotation.x=PI/2;
  if(look.accessory==='hat'){var hat=wGroup(0,.43,0);hat.scale.setScalar(.55);charHat(hat,look.outfit==='cape'?'wizard':'casual',col,0);hd.add(hat)}
  if(look.accessory==='bow'){[-1,1].forEach(function(s){sculpt(body,.67,1.01,s*.16,.07,.12,.18,col)});ball(.08,0xf3d991,.72,1.01,0,body)}
  mergeRig(body,legs.concat([hd,tail]));
  g.scale.setScalar(1.2);g.userData.sel='__dog';if(attach)scene.add(g);return {g:g,body:body,hd:hd,tail:tail,legs:legs};
}
function disposeFigure(g){
  var cached=new Set(Object.keys(geos).map(function(k){return geos[k]})),done=new Set();
  g.traverse(function(o){if(o.isMesh&&!cached.has(o.geometry)&&!done.has(o.geometry)){o.geometry.dispose();done.add(o.geometry)}});
  if(g.parent)g.parent.remove(g);
}
function refreshCharacters(){
  [[amorn,buildHuman(wardrobe.human,false)],[dog,buildDog(wardrobe.dog,false)]].forEach(function(pair){var a=pair[0],b=pair[1],old=a.g;Object.keys(b).forEach(function(k){a[k]=b[k]});scene.add(a.g);var n=pickables.indexOf(old);if(n>=0)pickables[n]=a.g;disposeFigure(old)});
}
