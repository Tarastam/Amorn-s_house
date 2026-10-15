const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const root = path.join(__dirname,'..');
const html = fs.readFileSync(path.join(root,'site/index.html'),'utf8');
const three = fs.readFileSync(require.resolve('three/build/three.min.js'),'utf8');
const out = path.join(__dirname,'shots','themes');
fs.mkdirSync(out,{recursive:true});
(async()=>{
  const browser=await chromium.launch({executablePath:process.env.CHROME||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':'/opt/pw-browsers/chromium'),args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
  try {
    const context=await browser.newContext({viewport:{width:1440,height:960},reducedMotion:'reduce'});
    const page=await context.newPage(),errors=[];
    page.on('pageerror',e=>errors.push(e.stack));
    await page.route('**/*',r=>r.request().url().includes('three.min.js')?r.fulfill({body:three,contentType:'application/javascript'}):r.request().url().startsWith('https://test.local/')?r.fulfill({body:html,contentType:'text/html'}):r.abort());
    await page.goto('https://test.local/?theme=space');
    for(const theme of ['space','cafe','arcade','wizard']){
      if(theme!=='space'){await page.locator('#bTheme').click();await Promise.all([page.waitForURL('**theme='+theme),page.locator('[data-th='+theme+']').click()])}
      await page.waitForFunction(()=>!!window.__lh,{},{timeout:30000});
      await page.evaluate(()=>{__lh.setTime(13);__lh.setRoof(true)});
      await page.waitForTimeout(2000);
      assert.equal(await page.evaluate(()=>__lh.theme),theme);
      assert.equal(await page.evaluate(()=>__lh.items().length),21);
      const stats=await page.evaluate(()=>({calls:__lh.renderer.info.render.calls,triangles:__lh.renderer.info.render.triangles,upper:__lh.yAt(-5,-6.5),route:__lh.pathTo('kitchen','office')}));
      if(theme!=='space'){assert(stats.upper>.55);assert(stats.route.includes('bed'))}
      await page.evaluate(()=>document.querySelector('#hint').classList.remove('on'));
      await page.screenshot({path:path.join(out,theme+'.png')});
      if(theme==='wizard'){
        await page.locator('[data-f=apps]').click();await page.evaluate(()=>__lh.select('p7',true));await page.waitForTimeout(500);
        assert.equal(await page.evaluate(()=>__lh.amorn.y),14.55);
        await page.screenshot({path:path.join(out,'wizard-study.png')});
        await page.locator('#zHome').click();
      }
      await page.locator('#bTv').click();await page.waitForTimeout(300);
      for(const tab of ['projects','week','trophies','summary','quests']){await page.locator('[data-nav='+tab+']').click();assert(await page.locator('.tvMain').isVisible())}
      if(theme==='space'){
        await page.locator('.q:not(.done) .ck').first().click();
        const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('lifehouse.v2')));assert(saved.projects[0].tasks[0].done);
      }else assert(await page.evaluate(()=>__lh.S.projects[0].tasks[0].done));
      await page.locator('#tvX').click();await page.waitForTimeout(300);
      console.log(theme,stats);
    }
    // A live preview, cancel, save, reload and cross-map persistence for both figures.
    await page.locator('#bWardrobe').click();
    const before=await page.evaluate(()=>JSON.stringify(__lh.wardrobe()));
    await page.locator('[data-look-preset=cafe]').click();await page.locator('[data-look-field=accessory]').selectOption('glasses');
    await page.locator('#lookCancel').click();assert.equal(await page.evaluate(()=>JSON.stringify(__lh.wardrobe())),before);
    await page.locator('#bWardrobe').click();await page.locator('[data-look-preset=wizard]').click();
    for(const outfit of ['casual','astronaut','barista','gamer','wizard'])await page.locator('[data-look-field=outfit]').selectOption(outfit);
    await page.locator('[data-look-field=top]').evaluate(e=>{e.value='#7160a2';e.dispatchEvent(new Event('input',{bubbles:true}))});
    await page.screenshot({path:path.join(out,'wardrobe-human.png')});
    await page.locator('[data-look-tab=dog]').click();for(const outfit of ['none','harness','spacesuit','sweater','cape','bandana'])await page.locator('[data-look-field=outfit]').selectOption(outfit);
    await page.locator('[data-look-preset=cafe]').click();await page.locator('[data-look-field=accessory]').selectOption('bow');
    await page.screenshot({path:path.join(out,'wardrobe-dog.png')});
    await page.locator('#lookSave').click();
    assert.equal(await page.evaluate(()=>__lh.wardrobe().human.outfit),'wizard');assert.equal(await page.evaluate(()=>__lh.wardrobe().dog.accessory),'bow');
    await page.reload();await page.waitForFunction(()=>!!window.__lh);
    assert.equal(await page.evaluate(()=>__lh.wardrobe().dog.outfit),'bandana');
    assert.equal(await page.evaluate(()=>__lh.wardrobe().human.top),'#7160a2');
    await page.locator('#bTheme').click();await page.locator('[data-th=cafe]').click();await page.waitForFunction(()=>window.__lh&&__lh.theme==='cafe');
    assert.equal(await page.evaluate(()=>__lh.wardrobe().human.outfit),'wizard');
    await page.setViewportSize({width:400,height:820});
    for(const theme of ['cafe','space','arcade','wizard']){
      if(theme!=='cafe'){await page.locator('#bTheme').click();await page.locator('[data-th='+theme+']').click();await page.waitForFunction(t=>window.__lh&&__lh.theme===t,theme)}
      await page.evaluate(()=>__lh.setTime(13));await page.waitForTimeout(1200);await page.screenshot({path:path.join(out,theme+'-phone.png')});
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),400);
    }
    await page.locator('#bWardrobe').click();await page.screenshot({path:path.join(out,'wardrobe-phone.png')});
    await page.locator('[data-look-tab=dog]').click();await page.locator('[data-look-field=outfit]').selectOption('spacesuit');await page.locator('#lookSave').click();
    assert.equal(await page.evaluate(()=>__lh.wardrobe().dog.outfit),'spacesuit');
    await page.evaluate(()=>{__lh.setTime(23);__lh.setRoof(false)});await page.waitForTimeout(1000);
    await page.screenshot({path:path.join(out,'wizard-night-roof.png')});
    // Graceful fallback for bad persisted choices and browsers denying storage.
    await page.evaluate(()=>{localStorage.setItem('lifehouse.theme','unknown');localStorage.setItem('lifehouse.wardrobe','{broken')});
    await page.goto('https://test.local/');await page.waitForFunction(()=>!!window.__lh);assert.equal(await page.evaluate(()=>__lh.theme),'space');
    await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('Storage unavailable')}})});
    await page.goto('https://test.local/?theme=cafe');await page.waitForFunction(()=>!!window.__lh);
    await page.locator('#bWardrobe').click();await page.locator('[data-look-field=outfit]').selectOption('gamer');await page.locator('#lookSave').click();
    assert.equal(await page.evaluate(()=>__lh.wardrobe().human.outfit),'gamer');
    assert.deepEqual(errors,[]);console.log('PASS: all four maps, dashboard, tasks, stairs, wardrobe save/cancel/persistence and mobile.');
  }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
