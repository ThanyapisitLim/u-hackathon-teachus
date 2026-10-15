# TastePrint — Product Experience Blueprint

> **Source of Truth ด้าน UX, Service Design, Physical Experience, เว็บพรีเซนต์, เว็บแอป และระบบต้นแบบสำหรับ U-Hackathon 2026**

**เวอร์ชัน:** 1.0  
**วันที่:** 16 ตุลาคม 2026  
**สถานะ:** ใช้กำหนด User Journey, User Flow, Usage Diagram, หน้าจอ, ของกายภาพ, backend และขอบเขตการสร้างต้นแบบ  
**เอกสารกลยุทธ์หลัก:** [TastePrint — Source of Truth สำหรับ U-Hackathon 2026](hackathon-source-of-truth-v2-th.md)

> หากคำกล่าวอ้างทางธุรกิจ ตลาด ความปลอดภัย หรือขอบเขตผลิตภัณฑ์ขัดกัน ให้ยึด Source of Truth ฉบับหลัก  
> หากรายละเอียดเรื่องประสบการณ์ผู้ใช้ เส้นทาง สถานะ หน้าจอ ของกายภาพ และการทำงานของต้นแบบขัดกัน ให้ยึดเอกสารฉบับนี้

---

## 0. คำตอบสั้นที่สุด: ขั้นถัดไปคืออะไร

ขั้นถัดไปคือ **Product Design Planning ที่ออกแบบบริการทั้งระบบก่อนออกแบบหน้าจอ** เพราะ TastePrint ไม่ใช่แอปอาหารสุนัข แต่เป็นบริการกายภาพที่มีเว็บ แอป AI และคนช่วยประสานกัน

ผลลัพธ์สุดท้ายของการแข่งขันประกอบด้วย:

1. **Presentation Web** — เว็บเล่าเรื่องสำหรับกรรมการ มีภาพ ของกายภาพ กระบวนการ หลักฐาน เดโม แผนภาพ backend และ animation
2. **Product Web App** — เว็บแอปที่หน้าที่หลักใช้งานได้จริง ทั้ง Safety Gate, การบันทึก trial, Bayesian update, การเลือกคู่ด้วย expected information gain, TastePrint, Signature Bowl Set, การควบคุม subscription และ Care Passport Lite
3. **Physical Taste Flight Kit** — กล่อง ซองจำลอง แผ่นวางซ้าย–ขวา QR บัตรสังเกต บัตรหยุด และ TastePrint card เพื่อพิสูจน์ว่านี่คือบริการที่ส่งมอบจริง ไม่ใช่ dashboard

ทั้งสองเว็บต้องใช้ **product logic, demo data, visual language และคำกล่าวอ้างชุดเดียวกัน** แต่ทำหน้าที่คนละอย่าง:

> **Presentation Web ทำให้คนเชื่อ — Product Web App ทำให้คนพิสูจน์ — Physical Kit ทำให้คนรู้สึกว่านี่เป็นบริการจริง**

---

## 1. Product Experience Contract

### 1.1 ประโยคกำกับการออกแบบ

> **แอปคือ remote control และ memory ของบริการกายภาพ ไม่ใช่ตัวบริการทั้งหมด**

สุนัขไม่ได้ใช้หน้าจอ ประสบการณ์ที่สำคัญที่สุดจึงเกิดที่กลิ่น เนื้อสัมผัส ชาม การจัดวาง การกิน การหยุด และการสังเกต เว็บมีหน้าที่:

- บอกว่า “ตอนนี้ควรทำอะไรต่อ”
- กันผู้ใช้จากขั้นตอนที่ไม่เข้าเกณฑ์
- ลดความสับสนระหว่างการทดลอง
- เก็บข้อมูลอย่างมีโครงสร้าง
- แสดงสิ่งที่เรียนรู้และสิ่งที่ยังไม่รู้
- ใช้ AI เลือกการทดลองถัดไปที่มีประโยชน์
- เชื่อมคนจริงเมื่อสถานการณ์กำกวม
- รักษาประวัติและสิทธิของเจ้าของ
- ควบคุมรอบส่งโดยไม่บังคับให้กลับมาเปิดแอปเพื่อ engagement

### 1.2 Success definition สำหรับการแข่งขัน

หลังดูเรื่องราวและเดโม ผู้ชมต้องอธิบายได้ว่า:

1. Taste Flight เปลี่ยนการซื้อแบบเดาเป็นการทดลองขนาดเล็กในโลกจริง
2. Safety Gate ทำงานก่อน AI เชิงกำเนิด
3. แบบจำลองเรียนรู้จาก valid repeated choices และเลือกคู่ถัดไป ไม่ได้สุ่มอาหาร
4. TastePrint แสดงทั้งหลักฐานและความไม่แน่นอน
5. ผลการเรียนรู้กลายเป็น Signature Bowl Set และรอบส่งที่ผู้ใช้ควบคุมได้
6. Care Passport Lite คือความทรงจำร่วม ส่วน HomeReady และ Emergency Ready เป็นอนาคตที่ยังต้องได้รับความไว้ใจก่อน

### 1.3 Prototype truth labels

ทุกส่วนในเดโมต้องติดสถานะหนึ่งในสามแบบ:

| ป้าย | ความหมาย | ตัวอย่าง |
|---|---|---|
| **Working now** | คำนวณ บันทึก หรือเปลี่ยนสถานะจริง | Safety Gate, trial validation, Bayesian update, EIG, TastePrint |
| **Simulated operation** | interaction ใช้ได้ แต่ยังไม่เชื่อมระบบธุรกิจจริง | payment, fulfilment, notification, shipment tracking |
| **Target production architecture** | โครงที่ตั้งใจผลิตหรือให้บริการจริง แต่ยังไม่ควรกล่าวว่าพร้อมจำหน่าย | registered complete base + controlled topper, reviewed safety-rule program |
| **Future hypothesis** | ใช้แสดงปลายทาง ไม่อ้างว่าเปิดบริการแล้ว | HomeReady, Emergency Ready, clinic integration |

ข้อมูลของโมจิต้องมีป้าย **Demo profile / seeded observations** และผลที่เกิดจากการกดใหม่ต้องแยกจากข้อมูลที่ seed ไว้

สำหรับ hackathon ต้องติดป้ายแยกให้ชัด:

- Bowl Set computation = Working prototype
- การผลิตอาหารและ fulfilment = Simulated operation
- registered complete base + modular topper = Target production architecture
- Safety rule set = Reviewed rules เมื่อมีผู้เชี่ยวชาญและแหล่งอ้างอิงยืนยันแล้ว หรือ Illustrative demo rules หากยังไม่ผ่าน review; ห้ามใช้สองสถานะปนกัน

### 1.4 5W1H ของประสบการณ์

| คำถาม | คำตอบที่ใช้ตัดสินใจออกแบบ |
|---|---|
| **Who** | เจ้าของสุนัขสุขภาพปกติที่เคยเจอการปฏิเสธอาหาร และสุนัขซึ่งเป็นผู้ให้ข้อมูลผ่านพฤติกรรมจริง |
| **What** | Taste Flight → Guided Trial → TastePrint → Signature Bowl Set พร้อม Care Passport Lite |
| **When** | เริ่มเมื่อกำลังเปลี่ยนอาหาร รับสุนัขใหม่ หรือมีประวัติซื้อแล้วไม่ยอมกิน; กลับมาเมื่อถึง trial, monitoring, feedback หรือรอบส่ง |
| **Where** | trial เกิดในพื้นที่สงบที่บ้าน; การคัดกรอง บันทึก อธิบาย และควบคุมบริการเกิดบน Product Web; การส่งต่อเกิดกับคนจริง |
| **Why** | ลดการซื้อปริมาณมากก่อนเห็นข้อมูลจากผู้กินจริง และเปลี่ยน feedback ที่กระจัดกระจายให้เป็นความรู้สะสม |
| **How** | ชุดกายภาพที่ควบคุมตัวแปร + deterministic rules + Bayesian preference model + EIG + LLM explanation + Bowl Guide |

---

## 2. ผู้ใช้และผู้มีส่วนร่วม

| Actor | เป้าหมาย | ความรับผิดชอบ | Interface หลัก |
|---|---|---|---|
| **เจ้าของหลัก** | ลดการเดาและเลือกสิ่งที่จะส่งต่อได้อย่างมั่นใจ | ให้ข้อมูล ยินยอม สังเกต ตัดสินใจซื้อ พัก ข้าม ยกเลิก และควบคุมข้อมูล | Product Web + Physical Kit |
| **สุนัข** | ได้ทดลองโดยไม่ถูกบังคับและหยุดได้ | ส่งข้อมูลผ่านพฤติกรรมจริง เช่น เลือก ปฏิเสธ หยุด หรือเดินหนี | กลิ่น อาหาร ชาม พื้นที่ และคน |
| **ผู้ดูแลร่วม** | ช่วยทำ trial แทนเจ้าของเมื่อได้รับสิทธิ | ทำตาม protocol และระบุตัวผู้สังเกต | Product Web + Physical Kit |
| **Bowl Guide** | คลี่คลายเคสที่ระบบไม่ควรตัดสินเอง | ตรวจ Hold, ข้อมูลขัดกัน, service recovery และส่งต่อ | Ops review ภายใน Product Web |
| **สัตวแพทย์หรือผู้เชี่ยวชาญ** | รับช่วงเมื่อเกิน consumer flow | ตัดสินใจเรื่อง clinical care | ช่องทางส่งต่อนอกแอป |
| **Fulfilment และ QA** | ส่ง kit ที่ถูกตัว ถูกล็อต และตรวจย้อนกลับได้ | ตรวจซีล ล็อต วันหมดอายุ และ replacement | Ops review + physical workflow |
| **กรรมการ** | เข้าใจความแตกต่าง ความเป็นไปได้ และคุณค่าธุรกิจ | สำรวจหลักฐานและลองเดโม | Presentation Web → Product Web |
| **Rules engine** | ป้องกัน known exclusions และข้อมูลวิกฤตที่ไม่ครบ | ให้สถานะ Eligible, Hold หรือ Escalate พร้อมเหตุผลและเวอร์ชัน | Backend |
| **Preference model** | เรียนรู้ pattern จาก valid comparison | อัปเดต posterior และจัดลำดับคู่ eligible | Backend |
| **LLM** | แปลง structured result เป็นภาษาคน | อธิบายโดยไม่เพิ่มข้อสรุป ไม่วินิจฉัย และไม่แก้กฎ | Backend → Product Web |

### 2.1 Persona ที่ใช้ทดสอบทุกการตัดสินใจ

**เมย์** เป็นเจ้าของสุนัขในเมือง เคยซื้ออาหารถุงใหญ่แล้วโมจิไม่ยอมกิน เธอไม่ต้องการอ่าน dashboard ซับซ้อนและไม่ต้องการ subscription ที่ยกเลิกยาก สิ่งที่เธอต้องการคือ:

- รู้ว่าวันนี้ควรทำอะไร
- รู้ว่าเมื่อใดไม่ควรทดลอง
- ไม่ถูกทำให้รู้สึกผิดเมื่อโมจิไม่เลือก
- เข้าใจว่าระบบเห็นอะไรและยังไม่รู้อะไร
- ซื้อปริมาณต่อเนื่องเมื่อมีเหตุผลเพียงพอ
- เปลี่ยน ข้าม พัก หรือยกเลิกได้ง่าย

**โมจิ** ไม่ใช่ persona ที่ “กดแอป” แต่เป็นผู้เข้าร่วมบริการที่ต้องมีสิทธิไม่กิน เดินหนี หรือหยุด การไม่เลือกคือข้อมูล ไม่ใช่ความล้มเหลว

---

## 3. Experience Principles

1. **Physical first where sensation matters**  
   กลิ่น เนื้อสัมผัส การจัดวาง ความสะอาด การเปิดซอง และการเลือกเกิดในโลกจริง

2. **One next action, not a dashboard**  
   หน้าแรกตอบคำถามเดียวว่า “ตอนนี้ควรทำอะไรต่อ”

3. **Safety before intelligence**  
   กฎคัดกรองและ quality gate ทำงานก่อน model และ LLM เสมอ

4. **Show the evidence and the gaps**  
   แสดงจำนวน valid trials, วันที่, ความสอดคล้อง สิ่งที่ยังไม่รู้ และเวอร์ชันที่เกี่ยวข้อง

5. **No choice is still a valid experience**  
   ปฏิเสธ เดินหนี หรือสังเกตไม่ทันต้องบันทึกได้โดยไม่ให้คะแนนศูนย์และไม่บังคับทดลองต่อ

6. **Human responsibility at ambiguity**  
   Hold, adverse sign, damaged kit, conflicting records และ service recovery ต้องมีคนรับผิดชอบ

7. **Useful return, not addictive return**  
   ผู้ใช้กลับมาเมื่อมีมื้อทดลอง ถึงรอบติดตาม ต้องปรับรอบส่ง หรือสุขภาพเปลี่ยน ไม่ใช้ streak, badge หรือ guilt

8. **Control is a trust feature**  
   Skip, pause, cancel และ reject substitute ต้องมองเห็นใน P0B; export และ revoke sharing ต้องมองเห็นเมื่อ permission model พร้อมใน P1

9. **Same truth in every touchpoint**  
   รหัส สี ล็อต ชื่อโมดูล สถานะ และคำอธิบายในกล่อง แอป เว็บพรีเซนต์ และระบบหลังบ้านต้องตรงกัน

10. **Accessible and international-ready by structure**  
    ภาษา หน่วย วันที่ เบอร์ติดต่อ กฎ และเนื้อหาฉุกเฉินต้องแยกเป็น locale pack ไม่ hard-code ไทยเป็นกฎสากล

---

## 4. สถาปัตยกรรมประสบการณ์: สองเว็บ หนึ่งบริการ

### 4.1 Deliverable map

~~~mermaid
flowchart LR
    Judge[กรรมการและผู้ชม] --> Pitch[Presentation Web]
    Pitch -->|เปิด Live Trial| App[Product Web App]

    Owner[เจ้าของ] --> App
    Owner --> Kit[Physical Taste Flight Kit]
    Dog[สุนัข] --> Kit

    Kit -->|QR หรือ Kit Code| App
    App --> Core[Shared Product Logic และ Backend]
    Core --> Result[TastePrint และ Signature Bowl Set]
    Result --> Owner

    Guide[Bowl Guide] --> Core
    Ops[Fulfilment และ QA] --> Core
~~~

### 4.2 หน้าที่ของแต่ละชั้น

| ชั้น | ต้องทำ | ไม่ควรทำ |
|---|---|---|
| **Physical product** | สร้าง trial จริง ปริมาณที่ควบคุมได้ การจัดวาง ล็อต และ stop instruction | ซ่อนข้อมูลสำคัญไว้หลัง QR เท่านั้น |
| **Product Web App** | แนะนำขั้นตอน บันทึก ตรวจคุณภาพ เรียนรู้ อธิบาย และควบคุมบริการ | เป็นหน้ารวมข้อมูลที่ผู้ใช้ไม่รู้ว่าต้องทำอะไร |
| **Human service** | รับผิดชอบข้อยกเว้น ตรวจเคส และแก้ปัญหา | ใช้ chatbot แทน accountability |
| **Core decision layer** | คัดกรอง อัปเดต posterior เลือกคู่ สร้างผลแบบตรวจย้อนกลับได้ | ให้ LLM เปลี่ยนกฎหรือสร้าง diagnosis |
| **Presentation Web** | พาคนเห็น problem → physical proof → live intelligence → business value | สร้าง logic อีกชุดที่เล่าไม่ตรงกับแอป |

### 4.3 สิ่งที่ตั้งใจไม่ย้ายเข้าแอป

- การดม กิน เลือก ปฏิเสธ และหยุดของสุนัข
- การตรวจซีล ล็อต วันหมดอายุ และสภาพซอง
- การตวง จัดชาม และสลับตำแหน่ง
- บัตร red flag ที่อ่านได้เมื่อโทรศัพท์หรืออินเทอร์เน็ตใช้ไม่ได้
- การคุยกับ Bowl Guide และผู้เชี่ยวชาญในเคสที่เกินขอบเขต
- บัตร TastePrint ฉบับกายภาพที่ส่งพร้อมรอบถัดไป

---

## 5. User Journey — Source of Truth

### 5.1 Journey overview

User Journey ตอบคำถามว่า **ผู้ใช้กำลังพยายามทำอะไร รู้สึกอย่างไร สัมผัสอะไร และอะไรทำให้เชื่อใจตลอดเวลา** ไม่ใช่ลำดับหน้าจอ

~~~mermaid
flowchart LR
    A[เห็นปัญหา<br/>ซื้อก่อนรู้] --> B[เตรียมข้อมูล<br/>และคัดกรอง]
    B --> C[รับและ Activate<br/>Taste Flight]
    C --> D[ทดลองจริง<br/>ในบ้าน]
    D --> E[บันทึกและ<br/>ตรวจคุณภาพ]
    E --> F[เรียนรู้และ<br/>เลือกคู่ถัดไป]
    F --> G[TastePrint]
    G --> H[Signature Bowl Set]
    H --> I[กินและให้<br/>feedback รอบใหม่]
    I --> J[Acceptance history<br/>และ Care Passport]
    J --> K{Review}
    K -->|Stable| H
    K -->|ต้องทดลอง preference ใหม่| D
    K -->|สุขภาพหรือยาเปลี่ยน| B
~~~

### 5.2 Journey map: เมย์และโมจิ

| ระยะ | เป้าหมายและความรู้สึกของเมย์ | ประสบการณ์ของโมจิ | Physical touchpoint | Product Web | คนและหลังบ้าน | จุดสร้างความไว้ใจ | Success signal |
|---|---|---|---|---|---|---|---|
| **1. Discover** | “อยากรู้ว่านี่ต่างจาก subscription ปกติอย่างไร” — สนใจแต่ระวัง | ยังไม่ถูกขอให้ทำอะไร | เห็นกล่องเล็กแทนถุงใหญ่ | เรื่องสั้นและตัวอย่าง TastePrint | catalog และ claim ชุดเดียวกัน | เห็นของจริงก่อน dashboard; เข้า demo ได้โดยไม่สมัคร | อธิบาย value proposition ได้ |
| **2. Prepare** | “โมจิเริ่มทดลองได้ไหม” — ต้องการความชัดเจน | ไม่ถูกนำเข้าสู่ trial หากไม่เข้าเกณฑ์ | เตรียมฉลากอาหาร ยา และข้อมูลอาการ | Dog Profile + Safety Gate | Rules engine บันทึกเหตุผลและเวอร์ชัน | Eligible ไม่ถูกเรียกว่า safe; Hold และ Escalate มีทางออก | screening จบด้วยสถานะที่อธิบายได้ |
| **3. Receive** | “นี่เป็นชุดของโมจิและยังใช้ได้หรือไม่” — อยากมั่นใจ | ยังไม่เปิดซองจนตรวจครบ | ซีล ล็อต วันหมดอายุ dog-ID และ QR | Activate kit | ผูก kit → dog → session → rule set | ตรวจย้อนกลับได้และมี short code สำรอง | kit activation สำเร็จ |
| **4. Introduce** | “จะเริ่มอย่างไรโดยไม่เปลี่ยนหลายอย่างพร้อมกัน” — กังวลเล็กน้อย | ได้สัมผัสโมดูลใหม่ทีละรายการและหยุดได้ | pre-portioned sachet + familiar control | ขั้นตอนเดียวและ monitoring window | บันทึก exposure event | red-flag card อ่านได้โดยไม่เข้าแอป | ไม่มี adverse sign และพร้อมทดลอง |
| **5. Compare** | “อยากทำให้ถูก แต่ไม่อยากกรอกเยอะ” — มีสมาธิ | เลือกหรือไม่เลือกโดยไม่ถูกบังคับ | A/B mat, ชามเหมือนกัน, timer | คู่ที่ต้องใช้ ตำแหน่ง และ observation form | ล็อก pair และ side assignment | มีตัวเลือก “ไม่ได้สังเกต” และ “หยุด” | trial ถูก submit |
| **6. Validate** | “ถ้ารอบนี้ไม่สมบูรณ์ ระบบจะเดาแทนไหม” — ต้องการความยุติธรรม | ผลไม่ถูกตีความเกินสิ่งที่เกิด | บัตรกระดาษเป็น fallback | Valid / Invalid พร้อมเหตุผล | Quality validator แยกข้อมูลที่เข้า model | invalid ถูกเก็บแต่ไม่เพิ่ม evidence | ผู้ใช้เข้าใจว่ารอบนี้นับหรือไม่ |
| **7. Learn** | “เราเรียนรู้อะไร และทำไมต้องลองคู่นี้ต่อ” — เริ่มเห็นคุณค่า | ไม่ต้องทดลองคู่ที่ไม่จำเป็น | เลือกซองตามรหัสที่ระบบระบุ | Before/after uncertainty, next pair, explanation | Bayesian update + EIG เฉพาะ eligible pairs | แสดงสิ่งที่ยังไม่รู้และเหตุผลที่เลือกคู่ | comprehension ของ next trial |
| **8. Decide** | “หลักฐานพอให้ซื้อปริมาณต่อเนื่องหรือยัง” — มั่นใจขึ้นแต่ยังต้องควบคุมได้ | ได้ชุดที่อิงข้อมูลจริง ไม่เปลี่ยนทุกอย่างพร้อมกัน | TastePrint card + base + topper | TastePrint และ Signature Bowl Set | catalog-constrained builder | หลักฐานต่ำใช้ baseline ไม่แสร้ง personalize | Bowl Set ถูกยืนยันอย่างเข้าใจ |
| **9. Continue** | “รอบต่อไปจะยังเหมาะกับการใช้จริงไหม” — ต้องการความยืดหยุ่น | feedback จากมื้อจริงนำไปปรับครั้งต่อไป | กล่องรอบใหม่และ check-in card | confirm, skip, pause, cancel, report | subscription state + passport update | ไม่มี silent substitution หรือ hidden renewal | stable accepted match และรอบส่งถัดไป |
| **10. Change / Exit / Share** | “สุขภาพเปลี่ยน ย้ายบ้าน หรือไม่อยากใช้ต่อ” — ต้องการสิทธิ | trial ถูกหยุดเมื่อบริบทเปลี่ยน | ช่องทางช่วยเหลือและบัตรข้อมูล | rerun Safety Gate และ cancel; export/revoke เป็น P1 | human review และ audit | ยกเลิกง่าย ไม่ล็อกข้อมูลเพื่อบังคับอยู่ต่อ | exit หรือ handoff สำเร็จ |

### 5.3 Emotional curve ที่ต้องรักษา

~~~mermaid
flowchart LR
    U1[กังวลจากของเหลือ] --> U2[ระวังเรื่องความปลอดภัย]
    U2 --> U3[รู้สึกว่าทำตามได้]
    U3 --> U4[สงสัยว่าข้อมูลพอไหม]
    U4 --> U5[เข้าใจหลักฐาน]
    U5 --> U6[มั่นใจแบบมีเงื่อนไข]
    U6 --> U7[ควบคุมบริการได้]
~~~

จุดสูงสุดไม่ควรเป็น “AI รู้จักสุนัขดีที่สุด” แต่เป็น:

> **“ฉันเห็นว่าระบบใช้ข้อมูลอะไร ยังไม่รู้อะไร และฉันตัดสินใจต่อได้อย่างไร”**

---

## 6. User Flow และ App State Flow — Source of Truth

User Flow ตอบคำถามว่า **ผู้ใช้และระบบเดินผ่านจุดตัดสินใจใดบ้าง** ส่วน State Flow ล็อกว่า **สถานะใดเปลี่ยนเป็นสถานะใดได้จริง**

### 6.1 End-to-end user flow

~~~mermaid
flowchart TD
    A[เข้า Product Web] --> B{เลือกวิธีเริ่ม}
    B -->|ลองเดโม| C[โหลด Demo Profile: โมจิ]
    B -->|ใช้กับสุนัขของฉัน| D[สร้าง Dog Profile]

    C --> E[Safety Gate]
    D --> E
    E --> F{ผลคัดกรอง}

    F -->|Eligible under current rules| G[ยืนยัน Order]
    F -->|Hold| H[เติมข้อมูลหรือส่ง Bowl Guide ตรวจ]
    F -->|Escalate| I[หยุด consumer flow และแสดง professional route]
    H --> E

    G --> G1[Awaiting Fulfilment]
    G1 --> G2[Kit Received]
    G2 --> J[Scan QR หรือกรอก Kit Code]
    J --> K{Seal, Lot, Expiry และ Dog ID ถูกต้อง?}
    K -->|ไม่| L[Freeze kit และเปิด replacement case]
    L --> L1[Replacement Requested]
    L1 --> G1
    K -->|ใช่| M[NextActionPlanner]

    M -->|มี module ที่ต้องแนะนำก่อน| M1[แนะนำ module ใหม่เพียงหนึ่งรายการ]
    M1 --> M2[Operational monitoring อย่างน้อย 48 ชั่วโมง]
    M2 --> N{พบ adverse sign?}
    N -->|ใช่| I
    N -->|ไม่| M3[Exposure Cleared และบันทึก eligible-after]
    M3 --> M

    M -->|มีคู่ที่ eligible| O[กำหนดคู่ A/B และตำแหน่ง]
    O --> P[เจ้าของทำ trial ทางกายภาพ]
    P --> Q[บันทึก approach, intake, choice, time และ signs]

    Q --> R{พบ adverse sign?}
    R -->|ใช่| I
    R -->|ไม่| S{ผ่าน Quality Gate?}

    S -->|ไม่ผ่าน| T[เก็บ Invalid พร้อมเหตุผล]
    T --> U[วางแผนทดลองใหม่]
    U --> M

    S -->|protocol valid แต่ไม่มี binary choice| V[เก็บ No-choice / Descriptive observation]
    V --> W[หลักฐานยังไม่เปลี่ยน]
    W --> M

    S -->|Valid binary choice| X[Bayesian Preference Update]
    X --> X1[Publish TastePrint in-progress รุ่นใหม่]
    X1 --> Y[ประเมิน EvidencePolicy รายแกน]
    Y --> Z[คืนสองผลลัพธ์อิสระ: Commerce Readiness + Learning Next Action]
    Z --> AA{Learning Next Action คือ Compare?}

    AA -->|ใช่| AB[คำนวณ EIG และแนะนำ Next Best Comparison]
    AB --> M
    AA -->|Introduce / New kit / Review / Close| AB1[แสดง next action ตามเหตุผล]

    Z --> AC0{Commerce Readiness}
    AC0 -->|Ready| AC[ใช้แกนระดับปานกลางขึ้นไปและ baseline สำหรับแกนหลักฐานต่ำ]
    AC0 -->|Baseline only| AC1[เสนอชุด baseline โดยติดป้ายว่าไม่ personalized]
    AC0 -->|Not ready| AB1
    X1 --> AD[ขอ LLM อธิบาย structured result แบบแยก call]
    AD --> AD1[แสดงคำอธิบายโดยไม่เปลี่ยนผล deterministic]
    AC --> AE[สร้าง Signature Bowl Set]
    AC1 --> AE
    AE --> AF[ยืนยันปริมาณ วันส่ง และ substitution rule]
    AF --> AF1{Safety, screening, catalog, lot และ dose ยัง valid?}
    AF1 -->|ไม่ผ่าน| E
    AF1 -->|ผ่าน| AG[Atomic: Subscription Active + First Pending Delivery Cycle]
    AG --> AH[Meal Check-in และ Review Due]
    AH --> AH1{สุขภาพ ยา น้ำหนัก หรือ acceptance เปลี่ยนอย่างมีนัยสำคัญ?}
    AH1 -->|สุขภาพ ยา น้ำหนัก อาหาร อาการ หรือความอยากอาหารเปลี่ยน| E
    AH1 -->|ยืนยันว่าเป็น preference drift ที่ไม่ใช่ health signal| M
    AH1 -->|คงที่| AH2[Stable Accepted Match evaluation]

    X1 --> AI[อัปเดต Care Passport Lite projection]
    AE --> AI
    AH --> AI
    AI --> AJ[แสดง Prepare Home และ Emergency Summary เป็น Future Cards]
~~~

### 6.2 App state machine

~~~mermaid
stateDiagram-v2
    [*] --> NoProfile
    NoProfile --> ProfileDraft: เริ่มสร้างโปรไฟล์
    ProfileDraft --> ScreeningPending: ข้อมูล required ครบ

    ScreeningPending --> Eligible: ผ่าน current rule set
    ScreeningPending --> Hold: ข้อมูลขาด ขัดกัน หรือต้อง human review
    ScreeningPending --> Escalated: พบ red flag

    Hold --> ScreeningPending: เติมข้อมูลและสร้าง screening run ใหม่
    Escalated --> ScreeningPending: อาการหาย + documented review + ไม่เข้า referral criterion + ไม่สงสัย food allergy
    Escalated --> [*]: ออกจาก consumer flow

    Eligible --> OrderConfirmed
    OrderConfirmed --> AwaitingFulfilment
    AwaitingFulfilment --> KitReceived
    KitReceived --> KitActive: kit และ lot ผ่าน validation
    KitReceived --> ReplacementRequested: damaged, wrong lot หรือ expired
    ReplacementRequested --> AwaitingFulfilment

    KitActive --> NextActionPlanning
    NextActionPlanning --> ModuleUnintroduced: introduction queue มาก่อน EIG
    ModuleUnintroduced --> ExposureMonitoring: เริ่มโมดูลใหม่เพียงหนึ่งรายการ
    ExposureMonitoring --> ExposureCleared: ครบอย่างน้อย 48h และไม่มี adverse sign
    ExposureMonitoring --> AdverseStopped: พบ adverse sign
    ExposureCleared --> NextActionPlanning
    NextActionPlanning --> PairEligible: มีคู่ผ่าน current rules
    PairEligible --> TrialPlanned

    TrialPlanned --> TrialInProgress: ล็อกคู่และ side assignment
    TrialInProgress --> TrialSubmitted: ยืนยัน observation

    TrialSubmitted --> AdverseStopped: พบ adverse sign
    TrialSubmitted --> InvalidStored: protocol quality gate ไม่ผ่าน
    TrialSubmitted --> DescriptiveStored: protocol valid แต่ no-choice
    TrialSubmitted --> ValidAccepted: valid binary comparison

    AdverseStopped --> Escalated
    InvalidStored --> NextActionPlanning: ทดลองใหม่
    DescriptiveStored --> NextActionPlanning: วางแผนใหม่โดยไม่เพิ่ม evidence

    ValidAccepted --> PosteriorUpdated
    state DecisionFork <<fork>>
    PosteriorUpdated --> TastePrintPublished: publish in-progress version ทุกครั้ง
    TastePrintPublished --> DecisionFork: บันทึกสองผลลัพธ์อิสระ
    DecisionFork --> LearningActionPlanned: learning_next_action
    DecisionFork --> CommerceReadinessProjected: commerce_readiness
    LearningActionPlanned --> NextActionPlanning: compare / introduce / new_kit
    LearningActionPlanned --> HumanReview: human_review
    LearningActionPlanned --> LearningCycleClosed: cycle_complete
    CommerceReadinessProjected --> BowlSetAvailable: ready / baseline_only
    CommerceReadinessProjected --> BowlSetLocked: not_ready
    BowlSetAvailable --> BowlSetDraft: เจ้าของเลือกสร้างชุด
    BowlSetDraft --> ServiceOngoing

    ServiceOngoing --> MealFeedback: delivery cycle delivered
    MealFeedback --> ReviewDue
    ReviewDue --> StableAcceptedMatch: ผ่านนิยามวันที่ 24–30
    ReviewDue --> NotStable: มี follow-up แต่ไม่ผ่านนิยาม
    ReviewDue --> MissingFollowup: ข้อมูลวัน 24–30 ไม่พอ
    ReviewDue --> NextActionPlanning: ต้องเรียนรู้ preference ใหม่
    ReviewDue --> ScreeningPending: สุขภาพ ยา หรือน้ำหนักเปลี่ยน
    StableAcceptedMatch --> ServiceOngoing: รอบถัดไป
    NotStable --> NextActionPlanning
    MissingFollowup --> ServiceOngoing: รายงานเป็น missing ไม่สรุป stable
~~~

`commerce_readiness` เป็น projection สำหรับการจัด Bowl Set ส่วน `learning_next_action` เป็น state ของวงจรเรียนรู้ ทั้งสองค่าไม่ใช่ทางเลือกที่ตัดกัน: สุนัขอาจ **พร้อมรับ Bowl Set แล้วและยังมีคู่ที่คุ้มจะเรียนรู้ต่อ** ได้พร้อมกัน ดังนั้น Stage Demo หลัง valid trial ครั้งที่สองต้องแสดงทั้ง EIG next pair และ Bowl Set ที่ใช้แกนระดับปานกลาง โดยไม่ปิด learning cycle อัตโนมัติ

### 6.3 Learning cycle state

~~~mermaid
stateDiagram-v2
    [*] --> Active: activate kit + start cycle
    Active --> Active: finalize attempt + persist decision/version
    Active --> AwaitingNewKit: learning_next_action = new_kit
    Active --> HumanReview: adverse / Hold / conflict
    HumanReview --> Active: new current screening + documented clearance
    HumanReview --> Closed: ออกจาก consumer flow
    Active --> Closed: BudgetReached / OwnerStops / NoEligiblePath
    AwaitingNewKit --> Closed: activate replacement kit
    Closed --> [*]
~~~

หนึ่ง kit มี active learning cycle ได้ไม่เกินหนึ่งรายการ เมื่อ replacement kit ถูก activate ระบบปิด cycle เดิมด้วย `SupersededByNewKit` และสร้าง cycle ใหม่ที่มี `predecessor_cycle_id` ใน transaction เดียว Counts ไม่ถูกย้ายข้าม kit โดยเงียบ แต่ TastePrint history ยังต่อเนื่องด้วย source snapshot IDs

### 6.4 Subscription และ delivery เป็น state แยกกัน

~~~mermaid
stateDiagram-v2
    state Subscription {
        [*] --> Active
        Active --> Paused
        Active --> Cancelled
        Paused --> Active
        Paused --> Cancelled
    }

    state DeliveryCycle {
        [*] --> Pending
        Pending --> Confirmed
        Pending --> Skipped
        Confirmed --> Shipped
        Shipped --> Delivered
        Skipped --> Closed
        Delivered --> Closed
        Closed --> Pending: สร้างรอบใหม่เมื่อ subscription ยัง Active
    }
~~~

การเปลี่ยน subscription_status ไม่ขึ้นกับ delivery_cycle_status: ผู้ใช้ยกเลิกได้ทั้งตอน Active และ Paused ส่วน Skip ปิดเพียงหนึ่ง delivery cycle และไม่เปลี่ยน subscription agreement

### 6.5 State invariants ที่ implementation ห้ามละเมิด

- Hold และ Escalate ไม่มี next-pair recommendation
- Screening run ที่จบแล้วเป็น immutable; การทบทวนสร้าง record ใหม่
- InvalidStored เก็บไว้เพื่อ audit แต่ไม่เปลี่ยน posterior, valid count หรือ evidence strength
- DescriptiveStored คือ no-choice ภายใต้ protocol ที่ valid ไม่ใช่ความผิดพลาด และไม่เปลี่ยน posterior
- มีเพียง valid binary choice เท่านั้นที่เข้า likelihood ของ Bayesian Bradley–Terry
- First approach, intake, eating time และ no-choice เป็น descriptive signals แยก
- คู่หนึ่งเข้า PairEligible ได้เมื่อ screening ยัง current, kit/lot ยัง valid, ทุก module ผ่าน exposure window, ไม่มี adverse freeze และไม่เกิน portion/energy rule
- NextActionPlanner ใช้กฎกำหนดแน่นอนจัด introduction queue ก่อน และให้ EIG จัดลำดับได้เฉพาะคู่ที่ PairEligible แล้ว
- Adverse sign มี priority สูงกว่าผล preference ทุกกรณี
- valid trial ทุกครั้งสร้าง TastePrint in-progress รุ่นใหม่โดยไม่เขียนทับรุ่นเก่า
- routine meal feedback อัปเดต acceptance/delivery history เท่านั้น ไม่เปลี่ยน preference posterior; ต้องมี controlled A/B trial ใหม่
- Subscription cancellation ไม่ลบ TastePrint หรือประวัติที่เจ้าของยังเลือกเก็บ
- Care Passport เป็น projection จากประวัติ ไม่ใช่แหล่ง truth แทน records ต้นทาง
- Escalated กลับเข้า screening ได้เมื่ออาการหาย มี documented human review ไม่เข้า referral criterion ต่อเนื่อง และไม่มี suspected food allergy เท่านั้น
- `commerce_readiness` และ `learning_next_action` ถูกคำนวณและบันทึกแยกกัน; ความพร้อมซื้อไม่หยุดการเรียนรู้อัตโนมัติ
- Hold, Escalate, adverse freeze หรือ unresolved human review มี priority เหนือการ confirm Bowl Set และการส่งของ

### 6.6 Stable Accepted Match definition

ใช้คำจำกัดความเดียวกับ Source of Truth:

> สุนัขเลือกตัวเลือกเดียวกันในการเปรียบเทียบ valid อย่างน้อย 2 ครั้งต่างวัน และยังกินผลิตภัณฑ์ที่ส่งจริงอย่างน้อย 5 จาก 7 มื้อที่บันทึกในวัน 24–30

คำนวณอัตราจากสุนัขที่ผ่านเกณฑ์และได้รับ Taste Flight ทุกตัว พร้อมรายงาน missing follow-up, dropout, safety escalation และ adverse signs แยก ห้ามคำนวณเฉพาะผู้ที่ทำจบ

### 6.7 Critical recovery flows

| เหตุการณ์ | ผลที่ระบบต้องทำ |
|---|---|
| ข้อมูลยา อาหารรักษาโรค หรือประวัติอาการสำคัญไม่ครบ | Hold และระบุช่องที่ต้องเติม |
| พบ red flag | หยุด flow ทันที แสดงทางติดต่อภายนอก และไม่รอ LLM |
| QR ใช้ไม่ได้ | ให้กรอก short code; บัตรกระดาษยังใช้ได้ |
| ซีลแตก ผิดล็อต หรือหมดอายุ | ห้ามใช้ สร้าง case ID และ replacement |
| ใช้ชุดกับสุนัขผิดตัว | invalidate session และ rerun safety |
| ไม่เลือกทั้งคู่ | บันทึก no choice; ไม่ให้คะแนนศูนย์และไม่บังคับ |
| มีสิ่งรบกวนหรือปริมาณไม่เท่ากัน | Invalid พร้อมเหตุผลที่ไม่กล่าวโทษ |
| ผลหลายวันขัดกัน | แสดง Uncertain และขอข้อมูลเพิ่ม |
| ผู้ดูแลสองคนบันทึกชนกัน | เก็บทั้งสอง source และส่งให้ resolve |
| LLM ใช้ไม่ได้ | core result ทำงานต่อและใช้ template ที่ติดป้ายตรงไปตรงมา |
| สินค้าหมด | ห้าม substitute อัตโนมัติ; ขอ consent |
| สุขภาพ ยา หรือน้ำหนักเปลี่ยน | freeze recommendation ที่เกี่ยวข้องและ rerun Safety Gate |
| ต้องการยกเลิก | ทำได้ใน flow เดียวกับ pause และ skip |

---

## 7. Usage Diagram — Source of Truth

Usage Diagram ตอบคำถามว่า **ใครใช้ส่วนใด อะไรเกิดในโลกจริง ข้อมูลไหลไปไหน ใครรับผิดชอบเมื่อมีข้อยกเว้น และผู้ใช้กลับมาเมื่อใด**

### 7.1 People–Physical–Web–Backend system map

~~~mermaid
flowchart LR
    subgraph People[People]
        Owner[Owner]
        Dog[Dog]
        Guide[Bowl Guide]
        Fulfill[Fulfilment and QA]
        Expert[Veterinarian or Expert]
        Judge[Judge]
    end

    subgraph Physical[Physical Frontstage]
        Kit[Taste Flight Kit]
        Bowls[A/B Bowl Test]
        Package[Signature Bowl Set]
        Card[TastePrint and Passport Card]
    end

    subgraph Web[Two Web Experiences]
        Pitch[Presentation Web]
        Product[Product Web App]
        Ops[Ops Review Route]
    end

    subgraph Core[Authoritative Product Backend]
        API[Typed API and Orchestrator]
        Rules[Versioned Safety Rules]
        Quality[Trial Quality Validator]
        Record[Invalid or Descriptive Storage]
        Bayes[Bayesian Bradley-Terry]
        Policy[EvidencePolicy per Axis]
        Taste[TastePrint Builder]
        EIG[Expected Information Gain]
        Builder[Constrained Bowl Set Builder]
        Explain[LLM Explanation Adapter]
        Passport[Care Passport Projection]
    end

    subgraph Data[Data and Audit]
        DB[(Structured Records)]
        Media[(Optional Media)]
        Audit[(Append-only Audit Events)]
    end

    LLM[Real LLM Provider]

    Judge --> Pitch
    Pitch -->|Open live demo| Product

    Owner --> Product
    Owner --> Kit
    Kit -->|QR or Kit Code| Product
    Dog --> Bowls
    Bowls -->|Observed by owner| Product

    Fulfill --> Ops
    Guide --> Ops
    Ops --> API
    Guide -->|Escalation| Expert

    Product --> API
    API --> Rules
    Rules -->|Eligible| Quality
    Rules -->|Hold| Ops
    Rules -->|Escalate| Expert
    Quality -->|Invalid or no-choice| Record
    Quality -->|Valid binary| Bayes
    Bayes --> Policy
    Policy --> Taste
    Policy -->|Learn more| EIG
    Policy -->|Decision-ready| Builder
    Record --> DB
    Taste --> Passport
    Builder --> Passport

    API <--> DB
    API --> Audit
    Product -. optional video .-> Media

    Taste --> Explain
    Builder --> Explain
    Explain -->|structured context only| LLM
    LLM -->|schema-validated response| Explain
    Explain --> Product

    Fulfill --> Kit
    Builder --> Package
    Package --> Owner
    Passport --> Card
~~~

### 7.2 Judge-view usage diagram

บนเวทีใช้เวอร์ชันย่อเพื่อให้เห็นความต่างภายในไม่กี่วินาที:

~~~mermaid
flowchart LR
    A[Dog behavior in a physical trial] --> B[Owner records a structured observation]
    B --> C[Safety rules + preference learning]
    C --> D[Next physical trial or Signature Bowl Set]
~~~

### 7.3 Usage cadence และเหตุผลที่กลับมา

| Moment | ความถี่ที่มีเหตุผล | Trigger | คุณค่าที่ผู้ใช้ได้รับ | สิ่งที่ห้ามใช้ |
|---|---|---|---|---|
| Discovery | ครั้งแรก | เห็นปัญหาอาหารเหลือหรือรับสุนัขใหม่ | เข้าใจแนวคิดและขอบเขต | pop-up สมัครทันที |
| Safety Gate | ก่อน trial และเมื่อบริบทสำคัญเปลี่ยน | เริ่มบริการ ยา น้ำหนัก สุขภาพ หรืออาหารเปลี่ยน | รู้ว่าจะไปต่อ Hold หรือส่งต่อ | claim ว่า “ผ่านแล้วปลอดภัย” |
| Kit activation | หนึ่งครั้งต่อ kit | กล่องมาถึง | ผูกล็อตและชุดกับสุนัขถูกตัว | QR-only dependency |
| Guided trial | หลายครั้งในช่วงสั้นตาม protocol | ถึงเวลาทดลองคู่ที่กำหนด | ลดการเดาและเพิ่มหลักฐาน | daily streak |
| Monitoring | หลัง exposure ใหม่ | ครบช่วงติดตามหรือเกิดอาการ | รู้ว่าควรไปต่อหรือหยุด | notification กดดัน |
| TastePrint review | หลัง valid update หรือ milestone | หลักฐานเปลี่ยน | เห็นสิ่งที่รู้และยังไม่รู้ | score ความรักปลอม |
| Delivery control | ก่อนรอบส่ง | ใกล้วันตัดรอบ | confirm, skip, pause, cancel | hidden renewal |
| Meal feedback | หลังใช้จริงเป็นช่วง | การยอมรับหรือบริบทเปลี่ยน | ปรับรอบต่อไป | บังคับเช็กอินทุกวัน |
| Help / recovery | ตามเหตุการณ์ | damaged kit, Hold, adverse sign, conflict | ได้คนรับผิดชอบ | chatbot-only |
| Passport | เมื่อทบทวน; sharing เริ่มใน P1 | เปลี่ยนผู้ดูแล เตรียมข้อมูล หรือดูย้อนหลัง | continuity และ control | default public sharing |

### 7.4 Usage principle

North Star ด้าน engagement ไม่ใช่ daily active users แต่คือ:

> **จำนวนคู่เจ้าของ–สุนัขที่ไปจาก eligible trial สู่ stable accepted match ด้วยข้อมูลที่ตรวจสอบได้ โดยไม่มี unresolved safety event**

---

## 8. Service Blueprint

| ระยะ | Physical frontstage | Owner Product Web | Human frontstage | Backstage และข้อมูล | Recovery |
|---|---|---|---|---|---|
| **Discover** | กล่องเล็กและตัวอย่างซอง | อธิบาย “ลองก่อนซื้อปริมาณมาก” | partner ใช้ scope เดียวกัน | content และ catalog เวอร์ชันเดียว | ไม่ใช้คำว่า allergy test หรือ best food |
| **Safety Gate** | บัตร Stop / Red Flag | รับข้อมูลและแสดง Eligible / Hold / Escalate | Bowl Guide รับ Hold; ผู้เชี่ยวชาญรับ Escalate | rule-set version, reasons, timestamp | required field ขาดต้อง Hold |
| **Order / Fulfil** | กล่องซีล รหัส ล็อต วันหมดอายุ | ที่อยู่ จุดรับ และสถานะ | support ช่วยกรณีจัดส่งผิด | eligibility snapshot, lot assignment, QA log | damaged or wrong lot → freeze + replace |
| **Activate** | scan QR หรือกรอกรหัส | ตรวจ dog, seal, lot, expiry และ health change | ติดต่อได้ทันที | bind kit → dog → session | wrong dog or invalid lot → stop |
| **First exposure** | pre-portioned module + familiar control | step เดียวและ monitoring | Guide ตรวจ adverse report | exposure event | adverse → freeze trial and recommendation |
| **Guided comparison** | A/B mat, equal amount, same bowls | pair, timer และ observation form | optional video review | quality check และ trial record | invalid ไม่เข้า model |
| **Next test** | เลือกซองจากรหัส | สิ่งที่ยังไม่ชัด คู่ถัดไป และเหตุผล | Guide ช่วยเมื่อผลขัดกัน | eligibility recheck → EIG → explanation | LLM fail → deterministic template |
| **TastePrint** | card ฉบับย่อ | preference: preferred / neutral / uncertain; behavior/adverse ใช้สถานะเฉพาะชนิด + evidence | Guide review เมื่อจำเป็น | immutable model snapshot | evidence ต่ำใช้ baseline |
| **Signature Bowl Set** | complete base + controlled topper | composition, quantity, reason, delivery controls | support หลังขาย | catalog, order, inventory, consent | no silent substitution |
| **Ongoing care** | กล่องใหม่และ feedback card | แสดงเฉพาะ action ที่ถึงเวลา | exception queue | feedback, health changes, renewal history | material change → rerun safety |
| **Exit / Share** | คืนหรือรีไซเคิลสิ่งที่รับคืนได้ | cancel ใน P0B; export/revoke/delete workflow ใน P1 | dispute support | retention and audit policy | cancellation ไม่ถูกซ่อน |

---

## 9. Physical Taste Flight Kit

### 9.1 ลำดับการเปิดกล่อง

1. **Start here** — วันนี้ต้องทำเพียงอะไร
2. **Before you start** — ชื่อสุนัข ซีล ล็อต วันหมดอายุ และ red flags
3. **Modules** — ซองรหัส M01–M06
4. **Set the table** — แผ่นซ้าย–ขวาและลูกศรเตือนให้สลับตำแหน่ง
5. **Observe, do not force** — บัตรสังเกตแบบสั้น
6. **When to stop** — บัตรสีเด่นและช่องทางช่วยเหลือนอกแอป
7. **Need help?** — case code และ Bowl Guide

### 9.2 องค์ประกอบที่ต้องมีในต้นแบบ

| ชิ้น | หน้าที่ UX | รายละเอียดสำคัญ |
|---|---|---|
| กล่อง Taste Flight | ทำให้ service model จับต้องได้ | tamper-evident visual, dog-ID area, kit code |
| ซองจำลอง 4–6 ซอง | เชื่อมโลกจริงกับ module catalog | module code, lot, expiry, QR, ingredients area, shape code |
| A/B mat | ลดความสับสนและ position bias | ซ้าย/ขวา ลูกศรสลับตำแหน่ง พื้นกันลื่น |
| Observation card | ใช้เมื่อออฟไลน์และลดการพึ่งโทรศัพท์ | approach, choice, intake, time, invalid reason, stop |
| Red-flag card | ทำให้ safety ไม่ขึ้นกับแอป | ข้อความตัวใหญ่ วิธีหยุด และช่องทางติดต่อ |
| Quick guide | บอกทีละขั้น ไม่สร้างคู่มือยาว | one action per panel พร้อมภาพ |
| TastePrint card | ทำให้ผลลัพธ์เป็นของที่เจ้าของเก็บได้ | axes, evidence strength, date, version, next step |
| Care Passport Lite card | แสดง shared memory | QR หรือ short link ที่เจ้าของควบคุม |

### 9.3 กฎการออกแบบกายภาพ

- ข้อมูล ingredients และคำเตือนต้องอ่านได้ ไม่ใช้ blind test เป็นข้ออ้างเพื่อซ่อนข้อมูล
- ใช้รหัสกลางบนด้านที่เห็นระหว่าง trial เพื่อลด owner bias แต่ข้อมูลครบอยู่บนฉลากที่เข้าถึงได้
- ไม่ใช้สีเพียงอย่างเดียว; เพิ่มรหัส ตัวเลข รูปทรง และข้อความ
- QR ทุกจุดต้องมี short code สำรอง
- dog-ID ชัดเจนสำหรับบ้านหลายตัว
- pull tab จับง่าย ตัวอักษรใหญ่ และคู่มือใช้ได้ด้วยมือเดียวเท่าที่ทำได้
- รหัส module, lot, สี และชื่อบน prop ต้องตรงกับ Product Web และ Presentation Web

### 9.4 Trial environment checklist

| ก่อนเริ่ม | ระหว่าง trial | หลัง trial |
|---|---|---|
| พื้นมั่นคงและไม่ลื่น, พื้นที่สงบ, ไม่มีสุนัขตัวอื่นรบกวน, ชามชนิดเดียวกัน, ปริมาณเท่ากัน, ตรวจซองและรหัส | วางตาม side assignment, ไม่ชี้นำหรือบังคับ, ใช้ timer เดียวกัน, ให้สุนัขเดินหนีได้, หยุดทันทีเมื่อมีสัญญาณผิดปกติ | บันทึกสิ่งที่เห็นและสิ่งที่ไม่ได้เห็น, ทำความสะอาด, เก็บ lot code, เริ่ม monitoring ตาม protocol |

Prototype protocol ต้องสะท้อนกฎจาก Source of Truth:

- เริ่มโมดูลที่ไม่คุ้นเคยครั้งละหนึ่งรายการ
- ใช้ familiar control เมื่อแนะนำโมดูลใหม่
- เว้น operational monitoring window อย่างน้อย 48 ชั่วโมงก่อนเริ่มโมดูลใหม่ถัดไป
- ต่อหนึ่งด้านใช้ไม่เกินค่าที่ต่ำกว่าระหว่างปริมาณตามฉลากกับ 2.5% ของพลังงานรายวัน ทำให้หนึ่งคู่ไม่เกิน 5%
- อาหารไม่ครบถ้วนทั้งหมด รวม topper และขนม อยู่ใต้เพดาน 10% ของพลังงานรายวันตามการคำนวณที่กำหนด
- Demo Mode ที่ข้ามเวลา 48 ชั่วโมงต้องติดป้ายว่าใช้ seeded historical observations

สำหรับ P0A ค่า `daily_kcal_allowance` ของ Mochi มาจาก reviewed seeded fixture ชื่อ `mochi-v1-energy-v1` ซึ่งต้องระบุค่าที่ใช้ แหล่งที่มา ผู้ทบทวน วันที่ทบทวน และ version ไว้ใน fixture/model card อย่างตรวจย้อนหลังได้ **Public prototype ห้ามคำนวณความต้องการพลังงานทางคลินิกจากน้ำหนักหรือ activity เอง** เว้นแต่มี reviewed calculator rule จริง; server ทำได้เพียงใช้ allowance ที่ได้รับอนุมัติแล้วมาคำนวณเพดาน 2.5% / 5% / 10% และบันทึก calculation snapshot

### 9.5 Physical sample สำหรับเวที

ชุดที่นำขึ้นเวทีควรมี:

- กล่องจริงหนึ่งชุด
- ซอง mock 6 ซอง
- A/B mat
- observation card
- red-flag card
- TastePrint card
- complete-base bag และ topper pack จำลอง
- Care Passport Lite card

ทุกชิ้นที่ไม่ได้ผลิตภายใต้มาตรฐานอาหารจริงต้องติด:

> **DEMO — ห้ามให้สัตว์กิน / NOT FOR ANIMAL CONSUMPTION**

เดโมไม่ต้องมีสุนัขจริงหรือเปิดอาหารจริงบนเวที

---

## 10. Product Web App

### 10.1 Product goal

Product Web ต้องรู้สึกเหมือน **ผู้ช่วยจัด trial และควบคุมบริการ** ไม่ใช่ร้านค้า ไม่ใช่ social app และไม่ใช่ medical dashboard

Primary navigation:

> **Today | TastePrint | Delivery | Passport | Help**

HomeReady และ Emergency Ready ไม่เป็น tab หลักใน MVP แต่ปรากฏเป็น future cards ที่ท้าย Care Passport เท่านั้น

ใน hackathon มีสอง entry mode:

- **Mochi Demo** — fixture ที่ reset ได้และติดป้ายว่าเป็นข้อมูลสาธิต
- **Prototype Owner Session** — session แยกที่หมดอายุได้และเตือนว่าไม่ให้กรอกข้อมูล clinical หรือข้อมูลส่วนบุคคลจริง

Production sign-in, authorization, retention และ deletion workflow เป็น requirement ก่อนเปิดใช้กับข้อมูลจริง ไม่จำเป็นต้องปลอมเป็นระบบ production ในเดโม

### 10.2 Information architecture

~~~mermaid
flowchart TD
    Entry[Entry] --> Demo[Try Mochi Demo]
    Entry --> Profile[Create Dog Profile]
    Profile --> Safety[Safety Gate]
    Demo --> Safety

    Safety --> Decision{Screening result}
    Decision -->|Eligible| Today[Today: Next Safe Action]
    Decision -->|Hold| Help[Help and Bowl Guide]
    Decision -->|Escalate| Stop[Stop consumer flow and professional route]
    Today --> Order[Order Taste Flight]
    Order --> Receive[Kit Status and Receive]
    Receive --> Activate[Activate Kit]
    Today --> Exposure[First Exposure]
    Today --> Trial[Guided Trial]
    Trial --> Result[Trial Result and AI Learning]
    Result --> Today
    Result --> Taste[TastePrint]

    Taste --> Bowl[Signature Bowl Set]
    Bowl --> Delivery[Delivery Controls]
    Delivery --> Today

    Taste --> Passport[Care Passport Lite]
    Delivery --> Passport
    Today --> Help
~~~

### 10.3 Screen contract

| Route หรือหน้าจอ | งานหลัก | Input สำคัญ | Output หรือการคำนวณ | Physical connection | Target fidelity |
|---|---|---|---|---|---|
| **/demo** | เริ่มเคสโมจิหรือ reset | เลือก demo path | isolated demo session | แสดง kit ที่ตรงกัน | P0A — real |
| **/app/demo/live-proof** | เดโมเวทีภายใน 24 วินาที | เลือก A หรือ B แล้ว Submit หนึ่งครั้ง | deterministic result ทันที; LLM ตามหลัง async | คู่ A/B ที่ preload | P0A — real, not scripted |
| **/start** | สร้าง Dog Profile | อายุ น้ำหนัก life stage อาหาร ยา อาการ | versioned profile | ฉลากและประวัติจริง | P0A — lightweight; P0B — full |
| **/dogs/:id/safety** | ทำ Safety Gate | required fields | Eligible / Hold / Escalate + reasons | red-flag card | P0A — real |
| **/safety/escalate** | หยุด consumer flow และออกไปยัง professional route | verified locale contact config | stop instruction + external call/link; ไม่มี fake booking | red-flag card | P0A — working external route |
| **/dogs/:id/order** | ยืนยัน Taste Flight | kit type และจุดรับ | order working state | กล่องที่กำลังจัดเตรียม | P0B — simulated operation |
| **/orders/:id** | ดูสถานะรับชุดหรือ replacement | order ID | fulfilment/replacement state | shipment | P0B — simulated operation |
| **/kits/activate** | ผูก kit กับ dog | QR หรือ short code | validate kit, item, lot, expiry | กล่องและซอง | P0A — real |
| **/dogs/:id/today** | รู้ว่าต้องทำอะไรต่อ | authoritative state | one next action + why + help | ซองที่ต้องใช้ | P0A — real |
| **/exposures/:id** | แนะนำ module ใหม่ | acknowledgement และ signs | exposure state, eligible-after | module + familiar control | P0A — real state; seeded time |
| **/trials/:id/setup** | จัด A/B | confirm bowls, amount, context | pair และ side lock | A/B mat | P0A — real |
| **/trials/:id/observe** | บันทึกพฤติกรรม | approach, intake, choice, time, signs, missing | draft observation | สุนัขเลือกจริง | P0A — real |
| **/trials/:id/result** | รู้ว่ารอบนี้นับหรือไม่ | submitted observation | invalid/no-choice/valid, posterior, EIG | เก็บหรืองดซองตามคู่มือ | P0A — real |
| **/dogs/:id/tasteprint** | ดูสิ่งที่รู้และยังไม่รู้ | accepted records | versioned TastePrint | printable card | P0A — real |
| **/dogs/:id/bowl** | ตรวจชุดอาหาร | catalog option และ quantity | constrained base + topper configuration | Signature Bowl Set | P0A — real computation |
| **/dogs/:id/delivery** | ควบคุมรอบส่ง | cycle date, quantity, skip; subscription pause/cancel | delivery/subscription working state | shipment | P0A — one adjustment; P0B — full simulated controls |
| **/dogs/:id/check-ins** | บันทึก accepted meal, leftover, signs หรือ missing follow-up | meal/day record | acceptance history, stable-match inputs, rescreen trigger | มื้อจริงและ check-in card | P0A — real record; delivery remains simulated |
| **/dogs/:id/passport** | ดูประวัติที่มาจาก records ต้นทาง | dog ID | read-only sourced timeline | passport card | P0A — seeded projection; P0B — expanded view |
| **/help** | ขอคนช่วยหรือรายงานเหตุ | issue type และ context | case ID / escalation | human channel | P0B — simulated handoff |
| **/ops/review** | ตรวจ Hold และ exception | role-gated review | audited resolution | support and fulfilment | P1 |

### 10.4 หน้า Today

หน้าแรกไม่ควรเป็น dashboard หลายการ์ด ต้องเรียงดังนี้:

1. **สถานะวันนี้** — เช่น “พร้อมทดลอง M01 กับ M03”
2. **Primary action** — ปุ่มเดียว เช่น “เริ่มจัดชาม”
3. **เหตุผลสั้น** — ทำไมขั้นตอนนี้มาถึงตอนนี้
4. **สิ่งที่ต้องเตรียม** — ซอง ชาม เวลา และสถานที่
5. **Stop / Help** — เห็นได้ตลอด
6. **Upcoming delivery** — แสดงเมื่อเกี่ยวข้องเท่านั้น

หลัก “primary action เดียว” ใช้กับหน้า Today และ step-by-step flow เท่านั้น หน้า Delivery ต้องทำให้ Confirm, Skip, Pause และ Cancel มองเห็นและเข้าถึงได้โดยไม่ซ่อน trust controls

### 10.5 หน้า Trial Result

ต้องมีลำดับ:

1. **รอบนี้นับหรือไม่**
2. **สิ่งที่สังเกต**
3. **สิ่งที่ model อัปเดต**
4. **สิ่งที่ยังไม่รู้**
5. **คู่ถัดไปและเหตุผล**
6. **Generated explanation status**
7. **Technical details drawer สำหรับกรรมการ**

Technical drawer แสดง:

- rule-set version
- model version
- source trial IDs
- prior และ posterior summary
- eligible/excluded pairs
- EIG candidate table
- tie-break
- explanation source: live LLM หรือ template fallback

### 10.6 Evidence display contract

TastePrint แสดงอย่างน้อย Attraction, Acceptance / Preference, Eating Mechanics และ Owner-reported Adverse Signs โดยใช้คำสถานะตามชนิดข้อมูล ไม่บังคับทุกแกนให้เป็น preference:

- แกน sensory / preference ใช้ **preferred / neutral / uncertain**
- Attraction และ Eating Mechanics ใช้ **observed / variable / not enough data** พร้อมจำนวน observation
- Owner-reported Adverse Signs ใช้ **not observed / none reported / reported** และไม่ใช้คำว่า preferred

Owner-facing evidence strength ใช้ลำดับชั้น ไม่ใช้เปอร์เซ็นต์ confidence ที่ยังไม่ผ่านการสอบเทียบ:

| ระดับ | เงื่อนไขแสดงผล |
|---|---|
| **ต่ำ** | valid comparison น้อยกว่า 2 ครั้ง หรือผลขัดกัน |
| **ปานกลาง** | valid comparison อย่างน้อย 2 ครั้งต่างวันและไปในทิศทางเดียวกัน |
| **สูง** | valid comparison อย่างน้อย 3 ครั้งในอย่างน้อย 2 วัน ไปในทิศทางเดียวกัน และไม่มี invalid round ถูกนำมาปนในการสรุป |

ข้อความกำกับต้องบอกว่า evidence strength สะท้อนความสม่ำเสมอภายใต้ protocol ไม่ใช่ clinical confidence ไม่ใช่ความปลอดภัยจากภูมิแพ้ และไม่รับประกันการยอมรับในอนาคต

กฎการใช้ผล:

- publish TastePrint in-progress หลัง valid trial ทุกครั้ง
- แกนที่หลักฐานระดับปานกลางขึ้นไปใช้กำหนด sensory topper ได้
- แกนที่หลักฐานต่ำหรือขัดกันใช้ค่า baseline และติดป้ายว่า “ยังเรียนรู้”
- evidence strength ประเมินรายแกน ไม่ใช้คะแนนรวมค่าเดียวเพื่อทำให้ทุกอย่างดูแน่นอน
- ordinary meal feedback ใช้ติดตาม acceptance และ Stable Accepted Match แต่ไม่อัปเดต preference posterior

### 10.7 EvidenceDecision v2 — สองผลลัพธ์ที่ไม่ตัดกัน

นี่คือ prototype policy เพื่อให้ flow มีจุดจบที่ตรวจสอบได้ ไม่ใช่มาตรฐานทางคลินิก ระบบคืนและ persist **สอง field แยกกัน** ใน decision/version เดียว:

#### A. `commerce_readiness`

| ค่า | เงื่อนไข | ผลต่อ Bowl Set |
|---|---|---|
| **ready** | อย่างน้อยหนึ่งแกน sensory / preference ถึงระดับปานกลาง และมีอย่างน้อย 2 valid comparisons ต่างวัน | personalize เฉพาะแกนที่พร้อม; แกนต่ำใช้ baseline และติดป้าย “ยังเรียนรู้” |
| **baseline_only** | วงจรจบเพราะ BudgetReached หรือ OwnerStops, screening ยัง current และไม่มี safety block แต่ยังไม่มีแกนถึงระดับปานกลาง | เสนอชุด baseline ที่ติดป้ายว่า **ไม่ personalized** หรือเลือกไม่ซื้อได้ |
| **not_ready** | วงจรยังไม่ถึง minimum evidence หรือมี Hold, Escalate, adverse freeze, unresolved review | ยังยืนยัน Bowl Set ไม่ได้ |

#### B. `learning_next_action`

| ค่า | เงื่อนไข | การทำงาน |
|---|---|---|
| **compare** | budget ยังเหลือและ eligible set ไม่ว่าง | คำนวณ EIG ทุกครั้ง แม้ `commerce_readiness=ready` แล้ว |
| **introduce** | ยังไม่มี eligible pair แต่มี module ใน kit ที่ผ่าน screening และยังไม่ผ่าน exposure | เริ่ม introduction หนึ่งรายการตาม deterministic queue |
| **new_kit** | ไม่มี eligible pair ใน kit ปัจจุบัน แต่ catalog มี safe screened module ที่จำเป็นต่อคำถามถัดไป | เสนอ kit รอบใหม่แบบ simulated; ไม่เลือก pair ที่ยังไม่ eligible |
| **human_review** | rule conflict, adverse freeze, unresolved Hold หรือข้อมูลขัดกันเกิน policy | หยุด recommendation และเปิด service route |
| **cycle_complete** | ถึง 6 valid comparisons, ถึง 8 total attempts, OwnerStops หรือไม่มี safe eligible/introduction/new-kit path | ปิด cycle พร้อม reason code: BudgetReached, OwnerStops หรือ NoEligiblePath |

ลำดับ priority คือ `human_review` → `cycle_complete` เมื่อชน budget/owner stop → `compare` → `introduce` → `new_kit` → `cycle_complete: NoEligiblePath` และ EIG ถูกเรียกเฉพาะเมื่อ `learning_next_action=compare` กับ eligible set ที่ไม่ว่าง

invalid และ no-choice ไม่เพิ่ม valid count แต่ total-attempt guardrail ยังนับเพื่อจำกัดภาระผู้ใช้ ค่าขีดจำกัด 6/8 เป็น prototype decision ที่ต้องทบทวนจาก usability และ pilot ทุก decision เก็บ `learning_cycle_id`, reason, input versions และ timestamp เพื่อ audit ได้

สำหรับ Stage Demo ให้ seed valid comparison หนึ่งครั้งจากวันก่อน แล้วรับ live valid comparison ครั้งที่สองในทิศทางเดียวกัน จึงได้ `commerce_readiness=ready` และยังได้ `learning_next_action=compare` เพื่อแสดง EIG อย่างซื่อสัตย์พร้อมกัน ส่วน Invalid และ No-choice เป็นคนละ reset branch

### 10.8 Microcopy มาตรฐาน

**Eligible**

> จากข้อมูลที่คุณให้ วันนี้ยังไม่พบเหตุที่เข้ากฎพักการทดลอง คุณทดลองได้เฉพาะชุดนี้ ผลนี้ไม่ใช่การรับรองว่าไม่แพ้

**Invalid**

> รอบนี้ไม่นับในการสรุป เพราะปริมาณสองด้านไม่เท่ากัน ไม่ได้แปลว่าโมจิไม่ชอบ

**Uncertain**

> โมจิเลือกต่างกันในสองวัน เรายังคงค่ามาตรฐานและไม่สรุปแทนน้อง

**No choice**

> การไม่เลือกก็เป็นข้อมูล คุณไม่จำเป็นต้องชวนหรือบังคับให้ลองต่อ

**LLM fallback**

> คำอธิบายอัตโนมัติชั่วคราวจากผลคำนวณหลัก กลไกการคัดกรองและการเลือกคู่ยังทำงานตามปกติ

---

## 11. Real AI และ Decision Experience

### 11.1 AI contract

คำว่า “AI analysis” ในต้นแบบต้องไม่เป็น animation ที่บันทึกไว้ล่วงหน้า ระบบต้องคำนวณจริงตาม pipeline นี้:

~~~mermaid
flowchart LR
    Input[Validated Input] --> Rules[Deterministic Safety Gate]
    Rules -->|Eligible| Eligible[Eligible Module Filter]
    Eligible --> Quality[Trial Quality Validator]
    Quality -->|Valid binary choice| Model[Bayesian Preference Update]
    Quality -->|Invalid or no-choice| Record[Audit or descriptive record; no posterior update]
    Model --> Policy[EvidencePolicy per axis]
    Policy --> Taste[TastePrint in-progress]
    Policy -->|Learn more| Select[Expected Information Gain]
    Policy -->|Configure| Build[Constrained Bowl Set Builder]
    Taste --> Explain[Server-side LLM Explanation]
    Explain --> UI[Owner-facing Result]

    Rules -->|Hold or Escalate| Human[Human or Professional Route]
~~~

### 11.2 สิ่งที่ต้องทำงานจริง

1. Deterministic Safety Gate ให้สามสถานะพร้อมเหตุผลและ rule-set version
2. Quality Gate แยก valid, invalid, no-choice และ adverse sign
3. Bayesian Bradley–Terry update ใช้ valid binary choice จริง
4. Expected information gain จัดลำดับเฉพาะคู่ที่ eligible
5. TastePrint builder สร้างผลจาก record และ evidence rule
6. LLM call เกิด server-side จาก structured context
7. Output ของ LLM ผ่าน schema validation และ claim guard
8. ผลและ audit information ถูกบันทึก

### 11.3 Bayesian prototype

ต้นแบบใช้ weighted-particle approximation:

- แต่ละ module มี feature vector เช่น aroma, texture, moisture และ coating intensity
- แต่ละ particle แทน preference weight ที่เป็นไปได้ของสุนัข
- valid A/B choice อัปเดต particle weights ด้วย logistic likelihood
- invalid, tie, no-choice, first approach และ intake ไม่เข้า likelihood
- random seed และ model version ต้องเก็บเพื่อ reproduce ผลได้

Prototype contract ที่ล็อกสำหรับ implementation:

| Parameter | Decision สำหรับ v1 |
|---|---|
| Feature schema | **sensory-feature-v1**; categorical ใช้ one-hot พร้อม reference level และ numeric feature scale ให้อยู่ในช่วง -1 ถึง 1 |
| Prior | independent Normal(0,1) ต่อ preference weight; ระบุว่าเป็น prototype prior |
| Particle count | 4,096 particles สำหรับ hosted และ offline demo |
| Choice noise | lapse 0.05 เพื่อไม่ให้ observation เดียวสร้าง certainty สุดขั้ว; ต้องทดสอบ sensitivity |
| Weight math | เก็บ log-weight แล้ว normalize ด้วย log-sum-exp |
| Degeneracy | เมื่อ effective sample size ต่ำกว่า 50% ให้ systematic resampling ด้วย seed ที่บันทึกและ jitter ที่ versioned |
| EIG unit | Bernoulli entropy ในหน่วย nats: entropy ของ mean prediction ลบ weighted mean entropy ราย particle |
| Reproducibility | model version, feature schema, seed, source trial IDs และ parameter set อยู่ใน snapshot |

Eligible-pair predicate ต้องเป็นจริงทุกข้อ:

1. screening run ยังเป็น current และสถานะ Eligible
2. kit item และ lot ถูกต้อง ยังไม่หมดอายุ และไม่ถูก quarantine
3. module ทั้งสองผ่าน exposure rule และถึง eligible-after แล้ว
4. ไม่มี adverse freeze หรือ unresolved human review
5. ปริมาณและ daily energy budget ยังอยู่ในกติกา
6. pair ไม่ซ้ำกับข้อห้ามของ protocol และอยู่ใน current catalog

แนวคิดการคำนวณ:

~~~text
delta = features(A) - features(B)
base = sigmoid(theta dot delta)
P(A wins | theta) = epsilon / 2 + (1 - epsilon) × base
logWeight(theta) += log(P(observed winner | theta))
normalize weights
~~~

Expected information gain ของแต่ละคู่ใช้ mutual information โดยประมาณ แล้วจัดลำดับตาม:

1. EIG สูงสุด
2. ผ่าน Safety Gate และ introduction-window rule
3. คู่ที่ถูกทดลองน้อยกว่า
4. deterministic module-ID tie-break

ระบบต้องบันทึก candidate pairs, EIG, filter reasons และ tie-break ทุกครั้ง

Axis attribution:

- valid binary A/B choice อัปเดต BT posterior และ preference evidence
- ให้เครดิต evidence แกน sensory ใดแกนหนึ่งได้เมื่อคู่นั้นต่างเฉพาะแกนนั้นตาม protocol
- หากคู่ต่างมากกว่าหนึ่ง feature ให้สรุปได้เพียงว่า module A ถูกเลือกเหนือ B ไม่ระบุว่า feature ใดเป็นเหตุ
- same direction หมายถึง feature level เดียวกันชนะซ้ำใน valid isolated-axis comparisons ตามจำนวนวันของ EvidencePolicy
- conflict หมายถึงมี valid isolated-axis result ในทิศทางตรงข้ามภายใน evidence window; แกนนั้นกลับเป็นระดับต่ำจน policy จัดการข้อมูลเพิ่ม
- first approach, intake และ eating mechanics aggregate แบบ descriptive แยกจาก BT
- adverse signs ใช้สถานะ **not observed / none reported / reported** และไม่มีสถานะ preferred

Golden test fixture ชื่อ **mochi-v1** ต้องมี input, accepted observations, fixed seed, expected posterior summary, expected candidate order, selected pair และ TastePrint tier ในไฟล์ที่ตรวจด้วย automated test หาก engine เปลี่ยน ต้อง version fixture และอธิบายเหตุผล ห้ามแก้ expected output เพียงเพื่อให้ test ผ่าน

### 11.4 Real LLM interaction

ไม่สร้าง chatbot กว้าง ๆ ใน MVP ใช้คำถามที่มี intent ชัด:

- “เราเรียนรู้อะไรจากรอบนี้?”
- “ทำไมรอบต่อไปจึงเป็นคู่นี้?”
- “TastePrint ยังไม่แน่ใจเรื่องอะไร?”

LLM รับเฉพาะ structured context และตอบ schema:

~~~json
{
  "summary": "...",
  "evidence_used": [],
  "uncertainties": [],
  "why_next_pair": "...",
  "next_action": "...",
  "safety_boundary": "..."
}
~~~

LLM ไม่มีสิทธิ:

- เปลี่ยน Eligible, Hold หรือ Escalate
- นำ module ที่ exclude แล้วกลับมา
- เปลี่ยน posterior, evidence tier หรือ EIG
- วินิจฉัย allergy หรือโรค
- สร้างสูตรโภชนาการจากศูนย์

API key อยู่ server-side เท่านั้น ห้ามปรากฏใน client bundle, HTML, log หรือ response

### 11.5 Failure design

| Failure | สิ่งที่ยังทำงาน | สิ่งที่ UI ต้องบอก |
|---|---|---|
| LLM timeout | rules, validator, Bayesian update, EIG, TastePrint | Template fallback ไม่ปลอมว่า generated live |
| Database write ช้า | draft อยู่ใน client queue และห้าม submit ซ้ำ | กำลังบันทึก + retry อย่างปลอดภัย |
| Internet ล่มบนเวที | offline demo ใช้ engine และ Mochi fixture เดียวกัน | Offline Demo; ไม่มี live LLM |
| model error | safety และ observation record ยังเก็บได้ | หยุด recommendation และเปิด technical fallback |
| QR camera ไม่ได้ | manual short code | ไม่มีการบังคับเปิดกล้อง |

Offline Demo ที่ใช้คำนี้ได้จริงต้อง bundle rule engine, preference engine, EIG, Mochi fixture และ application shell ไว้ฝั่ง client ผ่าน service worker ใช้ ephemeral local store หรือ IndexedDB ที่ไม่มี PII และไม่ sync กลับ production อัตโนมัติ หากยังไม่ได้สร้างกลไกนี้ ให้เรียกเพียง **Preloaded Fallback** ไม่ใช่ offline mode ส่วน live LLM, persistent cross-device data และ staff escalation ไม่ทำงานออฟไลน์

---

## 12. Presentation Web

### 12.1 แนวคิด

เว็บนี้ไม่ใช่ pitch deck ที่เลื่อนลงได้ แต่เป็น:

> **Product Theatre ที่พากรรมการเห็นหลักฐานจากโลกจริงไหลเข้าสู่ AI และกลับออกมาเป็นมื้อถัดไป**

เส้นเรื่องหลัก:

~~~text
ปัญหาที่มองเห็นได้
→ กล่องทดลองที่จับต้องได้
→ พฤติกรรมจริงของสุนัข
→ AI เลือกคำถามถัดไป
→ TastePrint
→ Signature Bowl Set
→ การใช้ซ้ำและความไว้ใจ
→ Care Passport และอนาคต
~~~

### 12.2 สามโหมดในเว็บเดียว

| โหมด | หน้าที่ | Interaction |
|---|---|---|
| **Stage Mode** | 6 ฉากเต็มจอสำหรับการพูด 90 วินาที | Arrow / Space, progress, presenter cue, preload |
| **Explore Mode** | เรื่องราวฉบับเต็มหลังนำเสนอ | scroll, diagrams, evidence, interactive prototype links |
| **Appendix / Q&A** | เปิดคำตอบเชิงลึกภายในสอง interaction | shortcuts ไป Market, AI, Safety, Ops, Sources |

### 12.3 Information architecture

| Section | หัวข้อแบบข้อสรุป | Visual หรือ interaction หลัก |
|---|---|---|
| 01 Cold open | ผู้กินจริงได้ออกเสียงหลังเจ้าของจ่ายเงินแล้ว | โมจิ ชามเต็ม และถุงเกือบเต็ม |
| 02 Evidence | Palatability สำคัญ แต่เจ้าของยังต้องเดาก่อนซื้อ | 60.1% จาก n=411 พร้อม caveat |
| 03 Physical product | Taste Flight เปลี่ยนการเดาเป็นการทดลองที่บ้าน | exploded kit พร้อม hotspot |
| 04 Live intelligence | AI เลือกการทดลองถัดไป ไม่ได้สุ่มอาหาร | Safety → observation → posterior → EIG |
| 05 Result | TastePrint บอกทั้งสิ่งที่เห็นและสิ่งที่ยังไม่รู้ | four-axis profile + evidence strength |
| 06 Commercial product | ความรู้จาก trial กลายเป็นมื้อถัดไป | complete base + controlled topper |
| 07 Repeat value | ผู้ใช้กลับมาเพราะระบบปรับรอบต่อไป ไม่ใช่ streak | Deliver → Eat → Observe → Learn → Adjust |
| 08 Market and impact | เริ่มจากฐานขนาดใหญ่โดยไม่แสร้งว่าทั้งหมดคือรายได้ | market ladder + impact metrics |
| 09 Shared memory | สิ่งที่สะสมคือความทรงจำที่เจ้าของควบคุม | Care Passport Lite timeline |
| 10 Earned future | Home และ Emergency เกิดหลังได้รับความไว้ใจ | subdued future cards |
| 11 How it works | Safety rules มาก่อน model และ LLM มีหน้าที่อธิบาย | backend usage diagram |
| 12 Pilot | พิสูจน์ feasibility ก่อนขยาย | pilot sequence และ stop/go |
| Appendix | ทุกคำกล่าวอ้างย้อนกลับได้ | sources, module matrix, simulation, Q&A |

### 12.4 Business Proof card

Explore Mode และ Appendix ต้องมีการ์ดธุรกิจหนึ่งใบที่ตอบครบโดยไม่ต้องเปิดหลายหน้า:

| คำถามกรรมการ | คำตอบที่แสดง |
|---|---|
| รายได้แรกมาจากไหน | Paid Taste Flight; price hypothesis 290–490 บาท |
| รายได้ซ้ำมาจากไหน | Signature Bowl Set; price hypothesis 790–2,990 บาทต่อเดือน |
| เริ่มกับใคร | ฐานกรุงเทพฯ และปริมณฑลประมาณ 805,000 ครัวเรือน; ระบุว่าเป็น geographic base ไม่ใช่ SAM |
| เข้าถึงอย่างไร | D2C content + pet-shop/clinic partner |
| ทำไมผลิตซ้ำได้ | registered complete base + modular controlled topper + lot traceability |
| ต่างจาก sampler อย่างไร | repeated controlled choice, uncertainty, next-best experiment และ longitudinal record |
| moat คืออะไร | protocol + longitudinal data + traceability + operations + partner trust; ไม่ใช่ LLM |
| ต้นทุนสำคัญ | formulation/nutrition review, co-manufacturing, QA, sachet/label, fulfilment และ Bowl Guide |

ราคาทั้งหมดต้องติดป้าย **Price hypothesis for validation — not announced price**

Appendix ต้องมี unit-economics equation แม้ยังไม่ใส่ตัวเลขที่ไม่มีหลักฐาน:

> contribution per order = price − food/base and topper − packaging − fulfilment − QA/support − expected refund/waste

### 12.5 Social Impact scorecard

| Metric | สิ่งที่วัด | สถานะ claim |
|---|---|---|
| Stable Accepted Match Rate | repeated valid choice + กินผลิตภัณฑ์จริงอย่างน้อย 5 ใน 7 มื้อวันที่ 24–30 | outcome หลักของ pilot |
| Food-leftover change | kg และมูลค่าเทียบ baseline | สมมติฐานที่จะวัด; ไม่อ้างลดแล้ว |
| Safety disposition | adverse cases, escalations และ unresolved events | guardrail |
| Repeat acceptance | second/third eligible shipment และ accepted-meal continuity | business + welfare signal |
| User control | skip/pause/cancel และ unwanted renewal | trust guardrail |
| Access | access-tier use, partner pickup และ shelter quota | equity design |

### 12.6 Stage Mode 90 วินาที

| เวลา | ฉาก | การกระทำ |
|---:|---|---|
| 0:00–0:13 | ปัญหา | ชามเต็ม ถุงเกือบเต็ม และ hook |
| 0:13–0:25 | Physical reveal | ยกกล่องจริงพร้อม exploded view |
| 0:25–0:49 | Live product demo | เปิดโมจิ บันทึกหนึ่ง trial เห็น posterior และ next pair |
| 0:49–1:03 | Product result | TastePrint เปลี่ยนเป็น Signature Bowl Set |
| 1:03–1:16 | Business and repeat | paid trial → delivery → feedback → update พร้อม 805,000 household geographic base หรือ price hypothesis หนึ่งค่าและ caveat |
| 1:16–1:30 | Next proof | Care Passport และ future cue ปรากฏสั้น ๆ แล้วจบด้วย feasibility pilot 30–50 คู่และ closing line |

บนเวทีใช้ชื่อเพียง Taste Flight, TastePrint และ Signature Bowl Set ส่วนชื่ออื่นอยู่ในฉากท้าย

อย่าพูดชื่อ HomeReady หรือ Emergency Ready ใน 14 วินาทีสุดท้ายและอย่าปล่อย future cards ค้างเต็มจอ ภาพสุดท้ายต้องกลับมาที่ **สิ่งที่ทำงานวันนี้ + การตัดสินใจเดินหน้า feasibility pilot 30–50 คู่เพื่อวัด Stable Accepted Match, leftover change, safety load และ repeat acceptance**

### 12.7 การเชื่อมไป Product Web

- ใช้สอง URL แยกกัน
- ปุ่ม **Open Live Trial** เปิดหน้าโมจิที่ถูกต้องในหนึ่ง action
- ไม่วางแอปไว้ใน iframe เล็ก
- Product Web มีปุ่ม **Return to Story** กลับฉาก TastePrint โดยไม่เสีย state
- Stage Mode เปิดตรง **/app/demo/live-proof** ซึ่ง preload โมจิและคู่ A/B ให้ผู้พูดเลือกหนึ่งผลแล้ว Submit เพียงครั้งเดียว
- core model result ต้องปรากฏก่อน LLM explanation
- cached explanation หรือ recording ต้องติดป้าย fallback
- Presentation Web ไม่อ่านข้อมูล owner records

Live-proof panel ต้องแสดง:

- trial ID และ timestamp ที่สร้างใหม่
- rule-set และ model version
- input A/B ที่ผู้พูดหรือกรรมการเพิ่งเลือก
- posterior ก่อนและหลัง
- excluded modules ที่ยังไม่กลับเข้ามา
- selected next pair และ EIG
- explanation status: Live LLM หรือ Template fallback

มีปุ่ม Reset แล้วเลือกผลตรงข้ามได้ ผล posterior และ next pair ต้องเปลี่ยนตามข้อมูลจริง เพื่อพิสูจน์ว่าไม่ใช่ animation ที่บันทึกไว้

### 12.8 Animation plan

Animation ทุกชิ้นต้องอธิบายเหตุผล:

- **P0:** ถุงเคลื่อนออก แต่ชามเต็มยังอยู่ เพื่อสร้าง tension
- **P0:** กล่องแตกเป็นชิ้นส่วนเมื่อเล่า physical protocol
- **P0:** observation ไหลเข้า posterior แล้วเปลี่ยน next pair และ next bowl
- **P1:** ตัวเลือกที่ Safety Gate exclude กลายเป็นสีเทาพร้อมเหตุผล
- **P1:** invalid round ถูกขีดออกและ evidence strength ไม่เพิ่ม
- **P1:** candidate pairs เรียงตาม EIG แล้วขยายคู่ที่ถูกเลือก
- **P1:** TastePrint เติมเฉพาะแกนที่มีหลักฐาน
- **P1:** TastePrint เปลี่ยนเป็น base + topper
- **P1:** Care Passport สะสม timeline ขณะที่ future cards ยัง subdued

ต้องรองรับ reduced motion และข้อมูลทุกอย่างยังอ่านได้เมื่อปิด animation

หลีกเลี่ยง paw-print trail, confetti, carousel และ stock animation แบบ pet e-commerce

### 12.9 Visual asset shot list

1. โมจิกับชามที่ไม่ถูกแตะและถุงเกือบเต็ม
2. กล่อง Taste Flight แบบปิด
3. top-down ของทุกชิ้นในกล่อง
4. close-up module code, lot, expiry และ QR
5. มือวางตัวเลือกบน A/B mat
6. มือสแกน QR เข้าหน้า trial
7. TastePrint บนจอคู่กับบัตรพิมพ์
8. complete base และ topper เป็น Signature Bowl Set
9. Care Passport Lite card
10. ภาพ backstage: rule trace, candidate EIG และ audit event

ใช้ prop จริงหรือภาพ mock-up ของระบบเดียวกัน หลีกเลี่ยงภาพ stock สุนัขที่ไม่ช่วยอธิบายบริการ

### 12.10 Presentation deliverable inventory

| สิ่งที่ผู้ใช้ขอ | สิ่งที่ต้องอยู่ใน Presentation Web |
|---|---|
| **Story** | Stage Mode 6 ฉาก และ Explore Mode ที่เล่า problem → proof → product → repeat value |
| **Detailed mock-up** | product screens ของ Safety, Trial, AI Result, TastePrint, Bowl Set และ Passport |
| **Pictures** | physical shot list และ service-in-use imagery |
| **Process** | User Journey, User Flow และ Service Blueprint |
| **Physical sample** | exploded kit, stage prop และ QR ที่เปิด record ตรงกัน |
| **Backend design** | Usage Diagram, AI pipeline และ sequence diagram |
| **Visualization** | before/after uncertainty, EIG ranking, market ladder และ impact tree |
| **Animation** | observation → update → next pair → TastePrint โดยมี reduced-motion alternative |
| **Working demo** | deep link เข้า Product Web ที่คำนวณจริงและกลับสู่ story ได้ |

### 12.11 Evidence placement

ตัวเลขและข้อจำกัดอยู่ใน viewport เดียวกัน ใช้ป้าย:

- **หลักฐานภายนอก**
- **ต้นแบบทำงานจริง**
- **สมมติฐานที่จะทดสอบ**

ตัวเลขหลักที่อนุญาตตาม Source of Truth:

- 60.1% จากกลุ่มตัวอย่างเจ้าของสุนัขไทย 411 คนเลือกความน่ากิน
- 6.656 ล้านครัวเรือนเลี้ยงสุนัขในไทย
- 9.124 ล้านสุนัข
- US$988.4 ล้าน ตลาดค้าปลีกอาหารสุนัขไทย
- ประมาณ 805,000 ครัวเรือนเลี้ยงสุนัขในกรุงเทพฯ และปริมณฑล

ห้ามเปลี่ยน 60.1% เป็นขนาดตลาด ห้ามเรียก 805,000 ว่า SAM และห้ามกล่าวว่า waste reduction หรือ trust transfer พิสูจน์แล้ว

Presentation Web ต้องอ่าน claim จาก **claim manifest** ไม่คัดลอกข้อความกระจายหลายไฟล์:

| Field | หน้าที่ |
|---|---|
| claim_id | รหัสถาวร |
| display_copy_th / en | ข้อความที่อนุมัติ |
| evidence_type | external evidence, seeded demo, synthetic benchmark, live computation, simulated operation หรือ future hypothesis |
| source_id / url | ที่มาที่ตรวจได้ |
| caveat | ข้อจำกัดที่ต้องอยู่ใกล้ claim |
| status | approved, demo-only หรือ future |
| last_checked | วันที่ตรวจล่าสุด |
| used_in | scene หรือ section ที่นำไปใช้ |

Badge **Working now** ใช้ได้เมื่อ acceptance test ของฟังก์ชันนั้นผ่านแล้วเท่านั้น ก่อนหน้านั้นในเอกสารและ mock-up ให้ใช้คำว่า **Target fidelity**

---

## 13. Shared Backend และ Technical Blueprint

### 13.1 Repo structure

~~~text
tasteprint/
├─ apps/
│  ├─ pitch/                 Presentation Web
│  └─ product/               Product Web + API
├─ packages/
│  ├─ domain/                entities, states, invariants
│  ├─ safety-rules/          versioned deterministic rules
│  ├─ preference-model/      Bayesian update and EIG
│  ├─ contracts/             API schemas and validation
│  ├─ ui/                    shared tokens and components
│  ├─ i18n/                  TH/EN, units, locale content
│  └─ demo-fixtures/         Mochi seed and reset state
├─ scripts/
│  ├─ simulate-policy/       EIG vs fixed vs tournament
│  └─ seed-demo/
└─ docs/
   ├─ rule-register/
   └─ model-card/
~~~

### 13.2 Two-web deployment decision

สิ่งที่ล็อกคือ **สอง web experiences และหนึ่ง authoritative backend** ไม่ได้บังคับว่าต้องมี infrastructure สองชุด

| Experience | Audience | Server behavior | Data |
|---|---|---|---|
| **Presentation Web** | public judge-facing | mostly static, interactive story | public evidence และ anonymized fixture เท่านั้น |
| **Product Web** | public hackathon demo; owner identity ในระยะถัดไป | API, model, AI secret, persistence | isolated demo sessions และ product records |

ค่าเริ่มต้นสำหรับ hackathon คือใช้ codebase และ backend เดียว พร้อมสอง entry point เช่น **/story** และ **/app** หรือ URL alias สองชื่อ เพื่อ preload ง่ายและลดความเสี่ยงระหว่างสลับเดโม หาก hosting ทำให้ต้องแยกเป็นสอง Site:

- Presentation Web เป็น presentation-led Site
- Product Web ใช้ dynamic server routes และ D1 สำหรับ structured records
- runtime secrets ตั้งใน hosting environment เท่านั้น
- ทั้งสอง experiences แชร์ packages และ fixtures จาก repository เดียวกัน; หากแยก deployment ให้ build จาก source เดียวกัน
- Presentation เปิด Product ด้วย fresh demo launch หรือ one-time opaque launch code; ห้ามส่ง owner ID หรือ session token ใน URL
- Return to Story ส่งได้เฉพาะ scene key ที่ไม่เป็นข้อมูลส่วนบุคคล

### 13.3 Data entities

| Entity | Grain | Critical fields |
|---|---|---|
| **demo_sessions** | หนึ่ง isolated sandbox ต่อผู้เข้าเดโม | opaque session hash, namespace, created/expiry, reset counter, rate-limit state |
| **dogs** | หนึ่ง record ต่อสุนัข | owner/session, locale, life stage, weight, activity, current food |
| **profile_revisions** | หนึ่ง revision ต่อการแก้ profile | changed fields, source, timestamp |
| **screening_runs** | หนึ่ง run ต่อ dog/ruleset | answer snapshot, status, reasons, rule-set version, reviewer |
| **modules** | หนึ่ง sensory module | feature vector, ingredients, exclusions, kcal/gram, label maximum, complete/complementary class, catalog status |
| **module_lots** | หนึ่งล็อตต่อ module | lot code, expiry, traceability |
| **kits** | หนึ่ง physical kit | dog/session, status, activation token |
| **kit_items** | หนึ่ง module/lot ใน kit | kit, module, lot, sealed grams, seal status |
| **exposures** | หนึ่ง first-exposure event ต่อ module | module, start time, eligible-after, monitoring state, reported signs |
| **energy_calculation_snapshots** | หนึ่ง dose decision ต่อ planned trial | supplied daily kcal allowance, allowance source/reviewer/version, module kcal/gram, label max, grams per side, energy per side/pair, incomplete-food energy used today, calculator/rule version; P0A ใช้ `mochi-v1-energy-v1` และไม่ derive allowance จาก weight/activity |
| **learning_cycles** | หนึ่งวงจรเรียนรู้ต่อ dog + kit | dog ID, kit ID, predecessor cycle ID, status Active/AwaitingNewKit/HumanReview/Closed, valid count, total attempts, commerce readiness, learning next action, reason code, decision/version, started/closed timestamps |
| **trials** | หนึ่ง A/B presentation | learning cycle ID, pair, side assignment, assigned grams per side, energy snapshot ID, context, status, validity |
| **observations** | หนึ่ง observation set | approach, intake, choice, time, missing flags, adverse signs |
| **model_snapshots** | posterior หลัง accepted observation | algorithm version, seed, weights, source trial IDs |
| **next_pair_recommendations** | ranking ต่อ snapshot | candidate table, exclusions, EIG, selected pair |
| **tasteprints** | TastePrint แต่ละ version | axes, evidence tier, counts, uncertainty, source snapshot |
| **bowl_sets** | Signature Bowl Set version | tasteprint ID, screening run ID, catalog version, approved base/topper/lot/dose, rationale |
| **subscriptions** | หนึ่ง service agreement | cadence, status, substitution consent |
| **delivery_cycles** | หนึ่งรอบส่งภายใต้ subscription | due date, confirm/skip state, quantity, bowl-set version |
| **shipments** | หนึ่ง fulfilment attempt | delivery-cycle ID, status, lot assignments, simulated/real flag |
| **meal_feedback** | หนึ่งมื้อหรือหนึ่ง missing follow-up slot | dog, bowl-set version, date/day index, offered/consumed amount, leftover weight/value, accepted, signs, missing reason, observer |
| **passport_projection** | timeline ที่ rebuild ได้ | source entity, source ID/version, timestamp, display payload; ไม่เป็น source of truth แยก |
| **service_cases** | หนึ่ง exception case | type, priority, owner, state, resolution |
| **explanations** | หนึ่ง LLM/template result | intent, context hash, provider/model, source, schema status; ไม่มี address, identity หรือ raw health notes |
| **audit_events** | หนึ่ง domain event | actor, action, entity, previous/new state, correlation ID |

### 13.4 API contract

ทุก mutation ใช้ Idempotency-Key และตอบ correlation ID รวมทั้ง rule-set หรือ model version ที่เกี่ยวข้อง

| Endpoint | หน้าที่ |
|---|---|
| **POST /api/v1/demo-sessions** | สร้าง isolated expiring demo session |
| **POST /api/v1/dogs** | สร้าง Dog Profile |
| **PATCH /api/v1/dogs/:dogId** | สร้าง profile revision |
| **POST /api/v1/dogs/:dogId/screenings** | สร้าง immutable screening run |
| **POST /api/v1/kits/activate** | ตรวจ kit token, lot, expiry และ dog binding |
| **POST /api/v1/kits/:kitId/learning-cycles** | เริ่ม active cycle ของ dog + kit; ป้องกัน active cycle ซ้ำ ตั้ง counters/version และเมื่อแทน kit เดิมให้ปิด cycle เดิม + link predecessor แบบ atomic |
| **POST /api/v1/exposures** | เริ่ม first exposure และ monitoring |
| **POST /api/v1/exposures/:exposureId/complete** | บันทึกอาการและคำนวณ eligible-after; server ห้าม complete ก่อนเวลาใน owner mode |
| **POST /api/v1/trials** | วางแผน trial, คำนวณ/validate energy snapshot และล็อก pair/side |
| **PATCH /api/v1/trials/:trialId/draft** | save observation draft |
| **POST /api/v1/trials/:trialId/finalize** | รับ expected snapshot/cycle version; revalidate, update cycle counters, posterior, TastePrint, commerce readiness และ learning next action แบบ atomic; คำนวณ EIG เมื่อ action=compare แล้วตอบ deterministic result เพียงครั้งเดียว |
| **POST /api/v1/learning-cycles/:id/stop** | เจ้าของหยุด cycle อย่างชัดเจน; ปิดด้วย reason OwnerStops, publish current TastePrint และคำนวณ readiness โดยไม่ปลอม certainty |
| **GET /api/v1/dogs/:dogId/next-action** | คืน IntroduceModule, RunComparison, NeedsNewKit, HumanReview หรือ CycleComplete ตาม deterministic planner |
| **GET /api/v1/dogs/:dogId/next-comparison** | คืน eligible pair, EIG และ rationale |
| **GET /api/v1/dogs/:dogId/tasteprints/latest** | อ่าน TastePrint ล่าสุด |
| **POST /api/v1/dogs/:dogId/explanations** | รับ snapshot ID + intent แล้วเรียก real LLM จาก minimal structured context |
| **POST /api/v1/bowl-sets/build** | server สร้าง catalog-constrained draft จาก TastePrint และ screening ที่ระบุ หลัง revalidate current screening, readiness, freeze, catalog, lot และ dose |
| **POST /api/v1/bowl-sets/:id/confirm** | revalidate safety/catalog/lot/dose แล้ว atomically ยืนยัน draft, สร้าง subscription และ first Pending delivery cycle; client ส่ง arbitrary composition ไม่ได้ |
| **PATCH /api/v1/subscriptions/:id** | pause, resume หรือ cancel agreement |
| **PATCH /api/v1/delivery-cycles/:id** | confirm หรือ skip รอบส่งหนึ่งรอบ; ก่อน confirm/ship ต้อง revalidate screening, adverse freeze, appetite/health change, bowl-set version, catalog/lot/dose |
| **POST /api/v1/dogs/:dogId/meal-feedback** | บันทึก accepted meal, leftover, signs หรือ explicit missing slot |
| **POST /api/v1/dogs/:dogId/stable-match-evaluations** | ประเมิน Stable / NotStable / Missing ด้วยตัวหารครบ |
| **GET /api/v1/dogs/:dogId/passport** | สร้าง Care Passport projection |
| **POST /api/v1/service-cases** | เปิด Bowl Guide หรือ professional route |
| **GET /api/v1/ops/review-queue** | อ่าน Hold, invalid และ escalation queue |

Concurrency contract:

- trial หนึ่งรายการมี accepted finalization ได้ครั้งเดียว
- create trial และ finalize ต้องรัน full eligible-pair predicate ใหม่ทั้งคู่
- finalize ใช้ per-dog + per-learning-cycle optimistic lock หรือ expected snapshot/cycle version และ conditional write
- หาก snapshot stale ให้โหลด state ล่าสุดและขอ retry ห้ามเขียน competing posterior
- Idempotency-Key เดิมคืน stored response เดิม ไม่คำนวณซ้ำ
- observation, cycle counters/decision, model snapshot, TastePrint, recommendation และ audit event commit ใน transaction เดียว
- build/confirm Bowl Set และ confirm/ship delivery ถูก block เมื่อ screening ไม่ current, status เป็น Hold/Escalated, มี adverse freeze หรือ health/appetite change ที่ยังไม่ผ่าน screening run ใหม่
- Bowl Set confirm สร้าง subscription และ first delivery cycle ใน transaction เดียว; retry ด้วย key เดิมห้ามสร้างซ้ำ

### 13.5 Critical backend sequence

~~~mermaid
sequenceDiagram
    actor O as Owner
    participant W as Product Web
    participant API as Core API
    participant R as Safety Rules
    participant Q as Quality Validator
    participant B as Bayesian Engine
    participant P as Evidence Policy
    participant E as EIG Selector
    participant DB as Database
    participant L as Real LLM

    O->>W: ส่งผล trial
    W->>API: Finalize trial + Idempotency-Key
    API->>R: ตรวจ profile และ current rule set

    alt พบ red flag
        R-->>API: Escalate
        API->>DB: เก็บ observation และ escalation event
        API-->>W: หยุด consumer flow
    else ไม่พบ red flag
        API->>Q: ตรวจ protocol และ observation quality

        alt Protocol invalid
            Q-->>API: Invalid + reasons
            API->>DB: เก็บ trial โดยไม่ update model
            API-->>W: อธิบายเหตุผลและเสนอทำใหม่
        else Protocol valid แต่ no-choice
            Q-->>API: Descriptive observation
            API->>DB: เก็บ NoChoiceStored โดยไม่ update model
            API-->>W: การไม่เลือกเป็นข้อมูลและไม่เพิ่ม evidence
        else Valid binary comparison
            Q-->>API: Accepted observation
            API->>B: Update posterior
            B->>P: Posterior + accepted trials + learning cycle
            P-->>API: TastePrint + commerce_readiness + learning_next_action

            alt learning_next_action = compare และ eligible set ไม่ว่าง
                API->>E: Posterior + strictly eligible pairs
                E-->>API: Ranked pairs + EIG + tie-break
            else introduce, new_kit, human_review หรือ cycle_complete
                P-->>API: deterministic next action + reason code
            end

            API->>DB: Atomic write observation, cycle decision/counters, snapshot, TastePrint, recommendation, audit
            API-->>W: Deterministic result เพียงหนึ่ง response
        end
    end

    opt ผู้ใช้ขอคำอธิบายหลังได้รับ deterministic result
        W->>API: Allowlisted intent + owned snapshot ID
        API->>DB: โหลด canonical snapshot และ evidence
        API->>API: สร้าง minimal context + context hash/cache key
        API->>L: Minimal structured context
        alt LLM สำเร็จและผ่าน schema/claim validation
            L-->>API: Summary, evidence, uncertainty, next action
            API->>DB: explanation source = live LLM
            API-->>W: Live explanation
        else timeout หรือ output ไม่ผ่าน
            API->>DB: explanation source = template
            API-->>W: Deterministic fallback
        end
    end
~~~

### 13.6 Domain events

- ScreeningEvaluated
- ModuleExcluded
- KitActivated
- ExposureStarted
- ExposureCleared
- TrialStarted
- TrialInvalidated
- NoChoiceStored
- AdverseSignReported
- TrialAccepted
- PosteriorUpdated
- NextPairSelected
- TastePrintPublished
- EvidenceDecisionMade
- LearningCycleClosed
- BowlSetConfirmed
- SubscriptionCreated
- DeliveryCycleCreated
- SubscriptionChanged
- DeliveryCycleChanged
- MealFeedbackRecorded
- StableAcceptedMatchEvaluated
- ServiceCaseRaised
- PassportProjectionRebuilt

### 13.7 Demo security and abuse boundary

- Public demo ทุก record อยู่ใต้ demo-session namespace
- Product server ออก opaque session cookie แบบ HttpOnly, Secure และ SameSite; client JavaScript ไม่เห็น token
- ทุก query และ mutation scope ด้วย server-side session หรือ authenticated owner ห้ามเชื่อ owner/session ID จาก request body
- demo session มี TTL, purge job และ reset ที่สร้าง namespace ใหม่
- หน้า Prototype Owner Session เตือนว่าไม่ให้กรอกชื่อ ที่อยู่ ข้อมูล clinical หรือข้อมูลส่วนบุคคลจริง
- rate-limit Kit Code activation, demo reset และ LLM endpoint
- client ส่งได้เฉพาะ allowlisted intent และ snapshot ID ที่ตนมีสิทธิ; server โหลด canonical data และคำนวณ context hash เอง
- cache explanation ตาม server-derived intent + context hash เพื่อลดค่าใช้จ่ายและ abuse โดยยังแสดงว่า response มาจาก cache หรือ live
- ส่งให้ LLM เฉพาะ module facts, observation summary, evidence, uncertainty และ next-pair rationale ไม่ส่ง address, owner identity หรือ raw health notes
- validate schema, output length, evidence references และ forbidden clinical claims; safety-boundary copy มาจาก deterministic template ไม่ให้ LLM แต่งเอง
- Ops route ปิดใน public P0 และเปิดเมื่อมี identity + role authorization เท่านั้น

หาก Presentation และ Product อยู่คนละ host:

1. Presentation ขอ one-time opaque launch code ที่อายุสั้นและไม่มี owner data
2. Product แลก code ฝั่ง server แล้วตั้ง session cookie ของตนเอง
3. code ใช้ซ้ำไม่ได้
4. Return to Story ส่งเพียง scene key

ทางเลือกที่ปลอดภัยและง่ายกว่าสำหรับเวทีคือให้ Product เปิด fresh Mochi fixture session ทุกครั้งโดยไม่ handoff state ส่วนบุคคล

### 13.8 Care Passport projection rule

Care Passport Lite ใน P0A เป็น seeded read-only projection และใน P0B เป็น expanded read-only projection ที่ rebuild ได้จาก screening, exposure, trial, TastePrint, Bowl Set และ delivery records ทุกแถวต้องมี source entity, source ID, source version และ timestamp ห้ามให้ UI เขียน timeline entry ที่ไม่มี record ต้นทาง

Export, share grant, revoke และ access log อยู่ P1 เมื่อเพิ่ม consent, membership และ per-record authorization ครบแล้ว

---

## 14. Design System และ Content System

### 14.1 Visual direction

โทนที่ต้องการคือ **warm kitchen × transparent laboratory**:

- อบอุ่นพอให้รู้สึกว่าเป็นการดูแล
- แม่นพอให้รู้สึกว่าตรวจย้อนกลับได้
- ไม่เหมือน medical emergency app
- ไม่เหมือน pet e-commerce ที่เน้นความน่ารักอย่างเดียว

Visual hierarchy:

- Cream / warm neutral เป็นพื้น
- Deep ink หรือ dark teal เป็นข้อความหลัก
- Sensory coral ใช้กับ action และ physical module
- Amber ใช้ Hold
- Red ใช้ Escalate และ stop เท่านั้น
- Green ใช้ Eligible แต่ต้องมีข้อความและไอคอนร่วม

สีสุดท้ายต้องผ่าน contrast test และห้ามใช้สีเป็นข้อมูลเพียงอย่างเดียว

### 14.2 Imagery

- ให้เห็นมือ ชาม ซอง พื้นผิว และขั้นตอนจริง
- macro texture ใช้เพื่อทำให้ sensory layer จับต้องได้
- dog image ใช้เมื่อช่วยเล่า behavior ไม่ใช้เป็น decoration
- diagram ใช้ภาพเดียวต่อหนึ่งข้อสรุป
- mock data, generated image และ prototype prop ต้องระบุชนิดเมื่ออาจถูกเข้าใจว่าเป็นของจริง

### 14.3 Motion tokens

- UI feedback: สั้นและตรง
- Story transition: ช้ากว่าแต่ต้องไม่ขวางการอ่าน
- model animation: แสดง before → observation → after
- reduced-motion: เปลี่ยนเป็น step หรือ dissolve โดยข้อมูลไม่หาย
- ไม่มีเสียงเล่นอัตโนมัติ

### 14.4 Accessibility baseline

- mobile-first สำหรับ Product Web
- stage-first desktop สำหรับ Presentation Web และ responsive บนมือถือ
- เป้าหมาย WCAG 2.2 AA
- keyboard ใช้งาน core flow ได้
- visible focus
- tap target อย่างน้อย 44 × 44 px
- error summary และ label สำหรับ screen reader
- contrast ข้อความทั่วไปอย่างน้อย 4.5:1
- ไม่ฝังข้อความสำคัญในภาพ
- caption หรือ transcript สำหรับวิดีโอ
- save and resume สำหรับแบบฟอร์ม
- camera และ video เป็น optional
- caregiver-assisted route สำหรับผู้ที่จัด trial เองไม่สะดวก

### 14.5 Thai / English และ international-ready

- ใช้ message catalog ตั้งแต่วันแรก
- ภาษา หน่วย น้ำหนัก วันที่ เวลา เบอร์ติดต่อ และข้อความฉุกเฉินแยกจาก component
- rules แยกตาม locale และ jurisdiction พร้อม version
- ฉลาก prototype ใช้ bilingual labels ในพื้นที่สำคัญ
- ไม่ใช้กฎไทยกับต่างประเทศโดยอัตโนมัติ
- assistance-dog accessibility และสิทธิการเข้าพื้นที่เป็น future locale research ไม่ทำ certification claim

---

## 15. Measurement, UX Research และ Product Analytics

### 15.1 Event map

- profile_started
- profile_completed
- screening_submitted
- screening_eligible
- screening_hold
- screening_escalated
- kit_activated
- exposure_started
- trial_started
- trial_saved
- trial_invalid
- trial_no_choice
- adverse_sign_reported
- trial_accepted
- posterior_updated
- next_pair_viewed
- explanation_requested
- explanation_live
- explanation_fallback
- tasteprint_viewed
- bowl_set_confirmed
- shipment_skipped
- subscription_paused
- subscription_cancelled
- passport_exported
- service_case_created

### 15.2 UX success metrics

| ช่วง | ตัวชี้วัด |
|---|---|
| Discover | เข้าใจความต่างจาก subscription ปกติในหนึ่งประโยค |
| Safety | completion, Hold reason comprehension, escalation success |
| Kit | activation success, wrong-kit prevention |
| Trial | valid completion, invalid reason distribution, time to submit |
| Learning | next-pair comprehension, evidence/uncertainty comprehension |
| Product | TastePrint-to-Bowl-Set completion |
| Control | skip/pause/cancel success โดยไม่ต้องขอคนช่วย |
| Trust | เข้าใจว่า preference ไม่เท่ากับ nutrition หรือ allergy |
| Service | unresolved adverse case, replacement resolution |
| Stage | ผู้ชมอธิบาย physical → data → model → next meal ได้ |

### 15.3 Pre-demo usability protocol

ให้ผู้ทดสอบทำภารกิจโดยไม่บอกปุ่ม:

1. เริ่มจากโมจิและบอกว่า trial วันนี้ทำได้หรือไม่
2. activate kit ด้วย QR หรือ short code
3. บันทึก valid trial
4. บันทึก invalid trial และอธิบายว่าทำไมไม่นับ
5. อธิบายว่าระบบเลือกคู่ถัดไปอย่างไร
6. บอกสิ่งที่ TastePrint ยังไม่รู้
7. skip รอบส่งและยกเลิก subscription
8. หาทางขอความช่วยเหลือเมื่อเกิด adverse sign

หลังจบถามสามคำถาม:

1. AI ทำหน้าที่อะไร
2. อะไรเกิดในโลกจริงและอะไรเกิดในแอป
3. Food, Care Passport และ Future Services ต่างสถานะกันอย่างไร

---

## 16. Prototype Scope

### 16.1 P0A — Stage-critical Functional Vertical Slice

เส้นสาธิตที่ต้องลื่นก่อนสร้างความกว้าง:

> Mochi → Safety → Physical trial → Submit → Posterior เปลี่ยน → EIG เลือกคู่ใหม่ → TastePrint → Signature Bowl Set

- Mochi fixture และ one-click reset
- lightweight Dog Profile creation และ preloaded Mochi profile
- Safety Gate ครบ Eligible / Hold / Escalate
- Escalate เปิด stop instruction และ verified external professional contact route ที่ทำงานจริง โดยไม่ปลอมว่าเชื่อมคิวคลินิก
- Physical kit mock-up พร้อม QR หรือ Kit Code ที่เปิด record ตรงกัน
- seeded exposure history และ valid comparison หนึ่งครั้งจากวันก่อน โดยติดป้ายตรงไปตรงมา
- live valid comparison ครั้งที่สองในทิศทางเดียวกันเพื่อให้ evidence ถึงระดับปานกลางอย่างซื่อสัตย์ พร้อมคืน `commerce_readiness=ready` และ `learning_next_action=compare` ใน response เดียว
- Invalid และ No-choice เป็นคนละ reset branch และทดสอบได้ทั้งคู่
- Bayesian posterior update และ before/after uncertainty
- EIG next-pair selection จาก eligible set
- TastePrint in-progress และ evidence policy
- constrained Signature Bowl Set
- meal feedback หนึ่งรายการที่เปลี่ยน acceptance/delivery state โดยไม่เปลี่ยน posterior
- delivery adjustment หนึ่งรายการแบบ simulated working state
- Care Passport Lite read-only projection หนึ่งหน้า
- real server-side LLM explanation + visible template fallback
- live-proof panel ที่มี trial ID, timestamp, versions และเลือกผลตรงข้ามหลัง reset ได้
- simulation/back-test engine ที่ให้ EIG, fixed schedule และ tournament เห็น synthetic dogs/outcomes ชุดเดียวกัน
- Presentation Stage Mode, deep link เข้า demo และ preloaded deterministic fallback

**Competition-ready = P0A ทุกข้อผ่าน acceptance test** ส่วน P0B เพิ่มความกว้างและความเป็นเจ้าของผลิตภัณฑ์ แต่ห้ามทำให้ P0A สะดุด

### 16.2 P0B — Expanded Usable Prototype

ทำทันทีหลัง P0A เสถียรเพื่อให้เว็บแอป “ใช้ได้” มากกว่าการเดินตามสคริปต์:

- Prototype Owner Session และ Dog Profile form ฉบับเต็ม
- Order → receive → activate → replacement state
- first exposure ราย module และ 48-hour monitoring state
- adverse path และ service-case simulation
- หน้า Today
- delivery-cycle controls: confirm / skip
- subscription controls: pause / resume / cancel
- Care Passport Lite แบบ read-only projection
- audit/version inspector
- full Explore Mode
- true offline demo เมื่อ bundle engine, fixture และ local store ครบ; ก่อนหน้านั้นเรียก Preloaded Fallback

### 16.3 P1 — ทำเมื่อ P0A และ P0B เสถียร

- Bowl Guide review queue
- passport export
- passport sharing, revoke, consent และ access log
- optional media upload
- interactive simulation chart สำหรับกรรมการ; ตัว benchmark engine อยู่ใน P0A แล้ว
- Thai / English toggle ครบทุกหน้า
- printable TastePrint และ Passport
- partner pickup flow
- richer Explore Mode และ interactive architecture

### 16.4 Future hypothesis — แสดงแต่ไม่สร้างเป็น product flow

- HomeReady workflow เต็ม
- Emergency Ready workflow เต็ม
- live clinic integration
- real fulfilment integration
- full international jurisdiction packs
- assistance-dog support program
- broad free-form AI chat

### 16.5 Kill order เมื่อเวลาไม่พอ

รักษาตามลำดับ:

1. deterministic safety/model engine และ tests
2. live-proof route + EIG benchmark
3. physical-to-digital continuity
4. TastePrint และ constrained Bowl Set
5. stage story และ claim integrity
6. minimal Care Passport, one delivery adjustment และ real LLM call พร้อม transparent fallback
7. expanded Passport, animation P1 และ visual polish เพิ่มเติม

ตัดความสวยและความกว้างก่อนตัดกลไกที่พิสูจน์ความต่าง

---

## 17. Build Plan และ Gate

### Gate 0 — Blueprint lock

Deliverables:

- User Journey
- User Flow
- State Flow
- Usage Diagram
- Service Blueprint
- screen contract
- physical kit contract
- prototype truth labels

ผ่านเมื่อสมาชิกทีมอธิบาย product flow เดียวกันและไม่มีคำว่า “AI วิเคราะห์” ที่ไม่บอก input, decision และ output

### Gate 1 — Domain and content contract

Deliverables:

- entities และ state invariants
- rule-set fixtures
- Mochi fixture
- mochi-v1 expected output และ model-card parameters
- module catalog
- EvidencePolicy v1 และ eligible-pair predicate
- TH/EN message catalog
- API schemas
- demo-session security contract
- claim manifest
- visual tokens

ผ่านเมื่อ Safety Gate, exposure rule, valid/invalid/no-choice, model reproducibility, evidence policy และ demo reset มี deterministic test

### Gate 2 — Functional vertical slice

สร้างเส้นเดียวก่อน:

> Load Mochi → Submit valid trial → Posterior changes → ระบบคืนทั้ง EIG next pair และ commerce-ready axes → Live explanation → TastePrint → Bowl Set

จากนั้นเพิ่ม Hold, Escalate, Invalid, No-choice และ fallback โดยให้ finalize กับ explanation เป็นคนละ request

รัน policy benchmark บน synthetic fixtures ชุดเดียวกันและบันทึกจำนวน trials ถึงเกณฑ์, อัตราที่ไม่ถึงเกณฑ์ใน trial budget และ ranking error ห้ามอ้างว่า EIG “เรียนรู้เร็วกว่า” ก่อนมีผลนี้

ผ่านเมื่อ flow หลักทำได้โดยไม่แก้ database หรือเปลี่ยน state ด้วยมือ

### Gate 3 — Physical continuity

Deliverables:

- print-ready labels
- six module sachets
- A/B mat
- observation and red-flag cards
- TastePrint card
- QR / short-code mapping
- photo shot list

ผ่านเมื่อสแกน prop ชิ้นใดแล้วเปิด record เดียวกันใน Product Web

### Gate 4 — Presentation Web

Deliverables:

- Stage Mode 6 ฉาก
- Explore Mode
- Appendix / Q&A
- diagrams และ evidence placement
- live-demo transition
- animation และ reduced-motion mode

ผ่านเมื่อพูด 90 วินาทีได้และสลับเข้า Product Web ในหนึ่ง action

### Gate 5 — Integration and rehearsal

ตรวจ:

- two-web state consistency
- launch/reset/return handoff และ health check
- real LLM status
- offline fallback
- citation and caveat
- stage readability
- keyboard and mobile
- demo reset
- physical code consistency
- failure paths
- timing

ผ่านเมื่อทีมสำรองสามารถเดโมแทนได้โดยใช้ runbook เดียวกัน

---

## 18. Acceptance Criteria

### 18.1 Product Web

- ผู้ใช้ใหม่รู้ next action ภายใน 10 วินาที
- หน้า Today และ guided step มี primary action เดียว; หน้า Delivery แสดง Confirm, Skip, Pause และ Cancel อย่างชัดเจน
- missing critical field ให้ Hold
- red flag ให้ Escalate โดยไม่ผ่าน LLM
- invalid trial ไม่เปลี่ยน posterior
- no-choice เก็บเป็น DescriptiveStored ไม่ใช่ Invalid และไม่ถูกตีความเป็นศูนย์
- module ใหม่เข้า pair ไม่ได้ก่อนครบ exposure rule และ eligible-after
- valid A/B result เปลี่ยน posterior จริง
- next pair มาจาก eligible set และมี EIG trace
- valid trial ทุกครั้ง publish TastePrint in-progress รุ่นใหม่พร้อม evidence และ uncertainty
- valid trial ครั้งที่สองของ Stage Demo คืนทั้ง `commerce_readiness=ready` และ `learning_next_action=compare`; EIG ยังทำงานแม้จัด Bowl Set ได้แล้ว
- Bowl Set มี complete base + controlled topper
- Bowl Set confirm revalidate safety/catalog/lot/dose แล้วสร้าง subscription + first delivery cycle แบบ atomic; confirm/skip เปลี่ยน delivery cycle ส่วน pause/resume/cancel เปลี่ยน subscription คนละ state
- Hold, Escalate, adverse freeze หรือ health/appetite change ที่ยังไม่ผ่าน screening ใหม่ block การ confirm/ship
- substitution เป็น opt-in
- Passport P0A/P0B เป็น read-only projection ที่แสดง source, timestamp และ version
- meal feedback เก็บ accepted/leftover/signs/missing โดยไม่เปลี่ยน posterior และ Stable Match แยก Stable / NotStable / Missing
- sudden appetite decline และการเปลี่ยนสุขภาพ ยา น้ำหนัก อาหารปัจจุบัน หรือ adverse signs สร้าง screening run ใหม่ก่อน learning
- Escalate มี stop instruction และ verified external professional contact route แม้ Bowl Guide case flow ยัง simulated
- live LLM และ fallback แสดงสถานะตามจริง
- demo reset ได้

### 18.2 Physical kit

- คนที่ไม่เคยเห็น kit จับคู่ซองกับ session ได้
- lot, expiry, ingredients และ stop instruction อ่านได้โดยไม่สแกน
- dog identity สับสนข้ามกันได้ยาก
- left/right และการสลับตำแหน่งเข้าใจได้จากภาพ
- QR มี short code สำรอง
- portion marker รองรับไม่เกิน min(ปริมาณฉลาก, 2.5% พลังงานรายวัน) ต่อด้าน, 5% ต่อคู่ และ 10% อาหารไม่ครบถ้วนต่อวัน
- P0A อ่าน daily allowance จาก reviewed/versioned `mochi-v1-energy-v1`; ไม่ derive clinical energy need จาก weight/activity ใน public prototype
- server สร้าง energy-calculation snapshot จาก kcal/gram, label max, assigned grams, supplied allowance + source/version และ incomplete-food energy ที่ใช้แล้ว; เกินกติกาต้องสร้าง trial ไม่ได้
- prop ที่ไม่ใช่อาหารจริงติดคำว่า Demo — ห้ามให้สัตว์กิน

### 18.3 Presentation Web

- ผู้ชมอธิบาย product ได้ในหนึ่งประโยค
- Stage Mode จบภายใน 90 วินาทีและไม่เกิน 6 ฉาก
- การสลับไป live app ใช้ไม่เกินหนึ่ง action
- ทุกสถิติมี source และ caveat ใกล้ claim
- future claims มีป้าย hypothesis
- physical action → data → model → next product เป็นเรื่องเดียวกัน
- live-proof panel เปลี่ยน posterior และ next pair เมื่อเลือกผลตรงข้ามหลัง reset
- Q&A สำคัญเปิดได้ภายในสอง interaction
- animation ไม่เป็นเงื่อนไขเดียวในการเข้าใจข้อมูล

### 18.4 Backend และ AI

- API mutation idempotent
- screening, learning cycle, trial และ TastePrint versioned
- cycle counters, EvidenceDecision และ close reason persist และตรวจย้อนหลังได้; OwnerStops มี explicit command
- excluded module ไม่เข้ารายการ EIG
- seed, observations และ model version เดิม reproduce ผลได้
- benchmark ใช้ synthetic dogs และ outcomes ชุดเดียวกันข้าม EIG, fixed schedule และ tournament; efficiency claim ต้องอ้างผลจริง
- LLM output ผ่าน schema และ claim validation
- LLM timeout ไม่ขวาง core flow
- secrets ไม่ออก client
- Pitch Web อ่าน owner records ไม่ได้
- demo data แยก namespace, scope ด้วย server-side session, มี TTL และ reset ได้
- finalize endpoint ตอบ deterministic result หนึ่งครั้ง; explanation เป็น request แยก
- routine meal feedback ไม่อัปเดต preference posterior
- audit trail ตรวจ actor, action, previous/new state ได้

### 18.5 Trust, safety และ accessibility

- ไม่อ้าง allergy test, diagnosis หรือ nutrition suitability จาก preference
- adverse report freeze trial และ recommendation
- cancel มองเห็นได้เท่ากับ confirm
- ไม่มี silent substitution หรือ hidden renewal
- keyboard และ screen reader ผ่าน core flow
- status ไม่สื่อด้วยสีอย่างเดียว
- Thai/English ไม่ทำให้ layout แตก
- reduced motion ไม่ทำให้ข้อมูลหาย
- camera และ video เป็น optional

---

## 19. Decision Log

| Decision | เหตุผล | สิ่งที่จะทำให้ทบทวน |
|---|---|---|
| สร้างสอง web experiences แต่ใช้ codebase/backend ชุดเดียว | จังหวะการเล่าเรื่องและจังหวะทำงานต่างกัน แต่ไม่ควรเพิ่ม infrastructure risk โดยไม่จำเป็น | hosting หรือ audience policy บังคับให้แยก deployment; ยังใช้ one-time launch หรือ fresh fixture |
| Product Web เป็นเจ้าของ backend | ป้องกัน logic และข้อมูลซ้ำ | สถาปัตยกรรม hosting บังคับให้แยก service |
| Presentation Web ไม่อ่าน owner data | ไม่จำเป็นต่อเรื่องและลดความเสี่ยง | ไม่มีเหตุผลให้ทบทวนใน MVP |
| Physical Kit เป็น deliverable P0 | ทำให้ service model และ trust จับต้องได้ | ไม่มีเวลาผลิต prop; ต้องใช้ render และ printable prototype แทน |
| หน้าแรกเป็น Today ไม่ใช่ dashboard | ผู้ใช้ต้องรู้ next action | usability test พบว่าผู้ใช้ต้องการ overview เพิ่ม |
| AI จริงอยู่ใน model + server-side explanation | พิสูจน์กลไก ไม่ใช่ animation | ไม่สามารถจัด credential ได้; ต้องติดป้าย deterministic-only demo |
| HomeReady และ Emergency เป็น future cards | รักษา focus ของ Food MVP | กติกาการแข่งขันเปลี่ยน scope |
| Physical trial มี paper fallback | บริการไม่ควรล้มเพราะโทรศัพท์ | pilot พิสูจน์ว่าช่องทางอื่นดีกว่า |
| Care Passport P0A/P0B เป็น read-only projection | รักษาความสอดคล้องของข้อมูลก่อนเพิ่ม sharing/permission | ทีมทำ consent, access log และ authorization ครบในเวลาที่เหลือ |

---

## 20. สิ่งที่ล็อกไว้เพื่อนำกลับมาใช้ในขั้นถัดไป

รายการนี้ไม่ใช่ “ส่วนที่ยังตอบไม่ได้” แต่เป็น requirement ที่ตั้งใจไม่แทรกในหน้าหลักของ MVP:

- ภาพ high-fidelity และภาพถ่าย physical kit จะผลิตหลัง visual system ล็อก
- animation เต็มและ interactive architecture จะทำหลัง functional vertical slice
- payment, logistics และ fulfilment จริงจะใช้ simulated operation ในการแข่งขัน
- production identity, consent lifecycle, retention และ PDPA workflow จะทำก่อนใช้ข้อมูลจริง
- สูตรอาหาร การผลิต การขึ้นทะเบียน และการให้สัตว์กินจริงต้องผ่านผู้ผลิตและผู้เชี่ยวชาญที่เกี่ยวข้อง
- HomeReady และ Emergency Ready จะกลับมาเมื่อ Food MVP พิสูจน์ trust และทีมมี protocol/partner
- international locale packs และ assistance-dog use cases จะกลับมาเมื่อมี legal, accessibility และ partner review ต่อประเทศ
- clinic scheduling, emergency dispatch และ professional data exchange ไม่อยู่ใน hackathon MVP
- full operator console ไม่ใช่เว็บที่สาม; ระยะแรกใช้ protected ops route ใน Product Web
- simulation เปรียบเทียบ EIG, fixed schedule และ tournament ควรอยู่ใน Appendix หรือ AI Lab ไม่อยู่บน owner home

---

## 21. คำสั่งสร้างงานชิ้นถัดไป

หลังล็อกเอกสารนี้ ให้ทำตามลำดับ:

1. สร้าง low-fidelity wireframe ของ P0 screens จาก screen contract
2. สร้าง content model และข้อความ TH/EN ของ Safety, Trial, Result และ Control
3. สร้าง clickable flow ของ golden path และสาม failure paths
4. ล็อก visual system และ physical labels พร้อมกัน
5. สร้าง Product Web vertical slice ที่คำนวณจริง
6. ประกอบ Physical Kit และถ่าย asset
7. สร้าง Presentation Web จาก story ที่มีของจริงและเดโมจริงรองรับ
8. ทำ usability test, model test, fallback test และ stage rehearsal

> **หลักตัดสินใจสุดท้าย:** หากสิ่งใดทำให้หน้าจอสวยขึ้นแต่ทำให้ความสัมพันธ์ระหว่างสุนัข ของกายภาพ คน ข้อมูล และการตัดสินใจไม่ชัด ให้ตัดสิ่งนั้นออก

