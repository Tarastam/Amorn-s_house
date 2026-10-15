# Amorn's House

บ้านจำลอง isometric (dollhouse) สำหรับ portfolio / life dashboard / task management

อัปเดต 15 ต.ค. 2026: เปิดได้ครบ 4 แมพ — Space Station, Coffee Cafe, Retro Arcade และ Wizard Tower พร้อมตัวละครใหม่และห้องแต่งตัวสำหรับ Amorn / Border Collie

- เปิด `site/index.html` แล้วเลือกแมพจากปุ่มธีม หรือกด **แต่งตัว** เพื่อเลือกชุด สี และเครื่องประดับพร้อมพรีวิว 3D
- บันทึกชุดแล้วใช้ต่อได้ทุกแมพ ข้อมูลเควสและโปรเจกต์ยังใช้ชุดเดิม
- Build บน Windows หรือระบบอื่นด้วย `node build.js` และทดสอบด้วย `node tests/themes.js`
- ภาพทดสอบทั้งเดสก์ท็อป มือถือ และห้องแต่งตัวอยู่ใน `tests/shots/themes/`

- อ่าน [`CLAUDE.md`](CLAUDE.md) ก่อนเริ่มงาน และดูแผนงานแต่ละเฟสที่ [`docs/ROADMAP.md`](docs/ROADMAP.md)
- แก้ซอร์สที่ `parts/` แล้วรัน `./build.sh` (สร้าง `index.html`, `site/index.html`, `artifacts/`)
- GitHub Pages deploy จาก `site/` อัตโนมัติเมื่อ push เข้า `main`
- ภาพธีม 4 แบบ (Retro Arcade, Coffee Cafe, Wizard Tower, Space Station): `docs/reference/`
