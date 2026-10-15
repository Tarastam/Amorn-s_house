// Portable equivalent of build.sh. Sources remain in parts/.
const fs = require('fs');
const path = require('path');
const root = __dirname;
const files = ['a_head.html','b1_core.js','b2_props.js','b2s_space.js','b2t_themes.js','b2c_characters.js','b3_world.js','b4w_wardrobe.js','b4_ui.js'];
const html = files.map(f => fs.readFileSync(path.join(root,'parts',f),'utf8')).join('\n');
for (const d of ['site','artifacts']) fs.mkdirSync(path.join(root,d),{recursive:true});
fs.writeFileSync(path.join(root,'index.html'),html);
fs.writeFileSync(path.join(root,'artifacts/amorn-home.artifact.html'),html);
fs.writeFileSync(path.join(root,'site/index.html'),'<!doctype html>\n<html lang="th">\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n'+html+'\n</html>\n');
console.log('Built all three HTML outputs.');
