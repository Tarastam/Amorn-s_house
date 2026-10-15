/* Preview edits are isolated until Save. Cancel never changes the scene or storage. */
var wardrobeOpen=false,wardrobeDraft=null,wardrobeTab='human',wardrobeReturn=null;
var lookRenderer=null,lookScene=null,lookCamera=null,lookFigure=null,lookAngle=.35,lookDirty=true;
function switchTheme(theme){
  if(!THEMES[theme]||theme===THEME)return;
  save();try{localStorage.setItem('lifehouse.theme',theme)}catch(e){}
  var url=new URL(location.href);url.searchParams.set('theme',theme);location.assign(url.href);
}
function initWardrobe(){
  var b=document.createElement('button');b.className='btn';b.id='bWardrobe';b.setAttribute('aria-label','แต่งตัวคนและหมา');b.innerHTML='<svg class="i" viewBox="0 0 24 24"><path d="m8 4-5 3 3 5 2-1v9h8v-9l2 1 3-5-5-3a4 4 0 0 1-8 0Z"/></svg><span class="t">แต่งตัว</span>';$('#bTv').before(b);b.onclick=function(){openWardrobe('human')};
  var modal=document.createElement('div');modal.id='wardrobe';modal.className='wardrobe';modal.hidden=true;
  modal.innerHTML='<section class="closet" role="dialog" aria-modal="true" aria-labelledby="closetTitle"><header class="closet-head"><div><span class="closet-eyebrow">THE DRESSING ROOM</span><h2 id="closetTitle">วันนี้อยากเป็นใคร?</h2><p>แต่งตัวให้ Amorn และเพื่อนสี่ขา</p></div><button class="closet-close" id="lookClose" aria-label="ปิดห้องแต่งตัว">×</button></header><div class="closet-body"><div class="look-stage"><div class="look-tag" id="lookName">AMORN</div><canvas id="lookCanvas" aria-label="ตัวอย่างตัวละครสามมิติ"></canvas><div class="look-rotate"><button id="lookLeft" aria-label="หมุนตัวอย่างซ้าย">↶</button><span>หมุนดูได้ทุกมุม</span><button id="lookRight" aria-label="หมุนตัวอย่างขวา">↷</button></div><span class="look-note">ลองชุดได้ก่อนบันทึก</span></div><div class="look-options"><div class="look-tabs" role="tablist" aria-label="ตัวละคร"><button role="tab" data-look-tab="human" aria-selected="true">Amorn</button><button role="tab" data-look-tab="dog" aria-selected="false">Border Collie</button></div><div id="lookFields" role="tabpanel"></div></div></div><footer class="closet-foot"><span id="lookStatus" role="status">ชุดที่บันทึกใช้ร่วมกันได้ทั้ง 4 แมพ</span><button class="btn" id="lookCancel">ยกเลิก</button><button class="btn pri" id="lookSave">บันทึกชุด</button></footer></section>';
  $('#app').appendChild(modal);
  $('#lookClose').onclick=$('#lookCancel').onclick=function(){closeWardrobe(false)};
  $('#lookSave').onclick=function(){closeWardrobe(true)};
  modal.addEventListener('click',function(e){
    if(e.target===modal)closeWardrobe(false);
    var tab=e.target.closest('[data-look-tab]');if(tab){wardrobeTab=tab.dataset.lookTab;drawLookFields();buildLookPreview()}
    var preset=e.target.closest('[data-look-preset]');if(preset){wardrobeDraft[wardrobeTab]=outfitDefault(preset.dataset.lookPreset)[wardrobeTab];drawLookFields();buildLookPreview()}
  });
  $('#lookFields').addEventListener('input',function(e){if(!e.target.dataset.lookField)return;wardrobeDraft[wardrobeTab][e.target.dataset.lookField]=e.target.value;buildLookPreview();$('#lookStatus').textContent='กำลังลองชุด · กดบันทึกเพื่อใช้ในแมพ'});
  $('#lookLeft').onclick=function(){lookAngle-=PI/4;lookDirty=true};$('#lookRight').onclick=function(){lookAngle+=PI/4;lookDirty=true};
  modal.addEventListener('keydown',function(e){
    if(e.key==='Escape'){e.stopPropagation();closeWardrobe(false)}
    if(e.key==='Tab'){var els=Array.from(modal.querySelectorAll('button,select,input')).filter(function(el){return !el.disabled&&el.getClientRects().length});var first=els[0],last=els[els.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
  });
  window.addEventListener('resize',function(){lookDirty=true});
}
function openWardrobe(tab){
  if(tv.open)closeTV();wardrobeReturn=document.activeElement;wardrobeDraft=JSON.parse(JSON.stringify(wardrobe));wardrobeTab=tab||'human';wardrobeOpen=true;lookAngle=.35;
  $('#wardrobe').hidden=false;$('#lookStatus').textContent='ชุดที่บันทึกใช้ร่วมกันได้ทั้ง 4 แมพ';
  Array.from($('#app').children).forEach(function(el){if(el.id!=='wardrobe')el.inert=true});
  drawLookFields();buildLookPreview();$('#lookClose').focus();
}
function closeWardrobe(commit){
  if(!wardrobeOpen)return;
  if(commit){wardrobe=validWardrobe(wardrobeDraft);var stored=true;try{localStorage.setItem('lifehouse.wardrobe',JSON.stringify(wardrobe))}catch(e){stored=false}refreshCharacters();toast(stored?'บันทึกชุดของ Amorn และน้องหมาแล้ว':'ใช้ชุดแล้วในหน้านี้ แต่เบราว์เซอร์ไม่อนุญาตให้บันทึกถาวร')}
  wardrobeOpen=false;$('#wardrobe').hidden=true;
  Array.from($('#app').children).forEach(function(el){el.inert=false});
  if(lookFigure){disposeFigure(lookFigure.g);lookFigure=null}
  if(wardrobeReturn&&wardrobeReturn.focus)wardrobeReturn.focus();
}
function drawLookFields(){
  var person=wardrobeTab==='human',o=wardrobeDraft[wardrobeTab];
  $('#lookName').textContent=person?'AMORN / EXPLORER':'BORDER COLLIE / BEST FRIEND';
  document.querySelectorAll('[data-look-tab]').forEach(function(b){b.setAttribute('aria-selected',b.dataset.lookTab===wardrobeTab)});
  function selectField(name,title,opts){return '<label class="look-field">'+title+'<select data-look-field="'+name+'" aria-label="'+title+'">'+Object.keys(opts).map(function(k){return '<option value="'+k+'"'+(o[name]===k?' selected':'')+'>'+opts[k]+'</option>'}).join('')+'</select></label>'}
  function colorField(name,title){return '<label class="look-color"><span>'+title+'</span><input type="color" value="'+o[name]+'" data-look-field="'+name+'" aria-label="'+title+'"></label>'}
  var h='<div class="look-label">01 / เลือกลุคตามธีม</div><div class="look-presets">'+Object.keys(THEMES).map(function(k){return '<button data-look-preset="'+k+'" style="--look-accent:'+THEMES[k].accent+'"><i></i>'+THEMES[k].name+'</button>'}).join('')+'</div><div class="look-label">02 / แต่งในแบบของคุณ</div>';
  h+=selectField('outfit','ชุด',person?OUTFITS:DOGOUTFITS);
  h+=selectField('accessory','เครื่องประดับ',person?{none:'ไม่ใส่',glasses:'แว่นตา',hat:'หมวกตามชุด',headphones:'หูฟัง'}:{none:'ไม่ใส่',hat:'หมวกตามชุด',bow:'โบ'});
  h+='<div class="look-colors">'+(person?colorField('top','สีเสื้อ')+colorField('bottom','สีกางเกง')+colorField('skin','สีผิว')+colorField('hair','สีผม'):colorField('color','สีชุด / เครื่องประดับ')+colorField('fur','สีขน'))+'</div>';
  $('#lookFields').innerHTML=h;
}
function buildLookPreview(){
  if(!lookRenderer){
    lookRenderer=new T.WebGLRenderer({canvas:$('#lookCanvas'),antialias:true,alpha:true});lookRenderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
    lookScene=new T.Scene();lookScene.add(new T.HemisphereLight(0xfff3e2,0x726b8c,1));var light=new T.DirectionalLight(0xffffff,1);light.position.set(3,6,5);lookScene.add(light);
    lookCamera=new T.PerspectiveCamera(32,1,.1,60);
    cyl(1.7,1.85,.12,0xc6b7a7,0,-.08,0,lookScene,48);ring3(1.72,.018,0xe8dbc9,0,0,0,lookScene,PI/2);
  }
  if(lookFigure)disposeFigure(lookFigure.g);
  lookFigure=wardrobeTab==='human'?buildHuman(wardrobeDraft.human,false):buildDog(wardrobeDraft.dog,false);lookScene.add(lookFigure.g);lookDirty=true;
}
function renderWardrobe(){
  if(!wardrobeOpen||!lookRenderer||!lookDirty)return;
  var c=$('#lookCanvas'),w=c.clientWidth,h=c.clientHeight;if(!w||!h)return;
  lookRenderer.setSize(w,h,false);lookCamera.aspect=w/h;lookCamera.updateProjectionMatrix();var person=wardrobeTab==='human';
  lookCamera.position.set(0,person?3.1:2.1,person?11.3:7.5);lookCamera.lookAt(0,person?2.15:1.05,0);lookFigure.g.rotation.y=lookAngle+(person?0:-.7);
  lookRenderer.render(lookScene,lookCamera);lookDirty=false;
}
