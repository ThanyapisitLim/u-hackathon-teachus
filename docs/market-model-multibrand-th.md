# PawProud — Market Model: Multi-brand Food Discovery & Managed Replenishment

> **สถานะ:** Market source of truth ฉบับปัจจุบันสำหรับ U-Hackathon 2026  
> **วันที่ทบทวน:** 16 ตุลาคม 2026  
> **กติกา:** เอกสารนี้แทนแนวคิดเดิมที่ให้ PawProud ผลิต “สูตรลับ” หรือผสมอาหารเฉพาะตัวเอง หากเอกสารเก่าขัดกับขอบเขตตลาดและการดำเนินงานในหน้านี้ ให้ยึดหน้านี้

## 1. คำตอบเชิงกลยุทธ์

PawProud **ไม่ใช่แบรนด์อาหารสุนัขใหม่** และไม่ควรประเมินตลาดเหมือนโรงงานอาหารสัตว์เลี้ยง

PawProud คือ:

> **บริการค้นหาอาหารที่เข้ากับสุนัขรายตัวจากหลายแบรนด์ ทดลองก่อนซื้อจริง เรียนรู้จากการกิน และจัดส่งซ้ำเฉพาะสิ่งที่ยังเหมาะ**

ชื่อหมวดธุรกิจที่ใช้สื่อสารได้:

- **Personalized multi-brand pet-nutrition commerce**
- **Food-discovery and managed-replenishment platform**
- ภาษาไทย: **แพลตฟอร์มคัดเลือก–ทดลอง–จัดส่งอาหารสุนัขหลายแบรนด์แบบเรียนรู้ต่อเนื่อง**

ประโยคสำหรับเวที:

> **ตลาดอาหารสุนัขเกือบหนึ่งพันล้านดอลลาร์คือ red ocean เราไม่ได้โยนอาหารอีกหนึ่งถุงลงไปแข่ง แต่สร้างชั้นตัดสินใจและการจัดส่งที่ไว้ใจได้อยู่เหนือทุกถุง**

## 2. ตลาดเดิมกับตลาดของ PawProud ต่างกันอย่างไร

| คำถาม | แบรนด์อาหารทั่วไป | PawProud |
|---|---|---|
| แข่งขันเพื่ออะไร | ให้เจ้าของเลือกแบรนด์หรือสูตรของตน | ให้เจ้าของตัดสินใจได้ดีขึ้นข้ามหลายแบรนด์ |
| สิ่งที่ผลิต | อาหารและสูตร | การทดลอง ข้อมูล TastePrint การจัดอันดับ และการจัดส่งต่อเนื่อง |
| สินค้าคงคลังหลัก | สูตรของแบรนด์ | SKU ที่ขึ้นทะเบียนและมาจากพาร์ตเนอร์ที่ตรวจสอบได้ |
| Personalization | เลือกภายในพอร์ตของแบรนด์หรือแบบสอบถาม | เรียนรู้จากพฤติกรรมกินจริง แล้วเลือกจากหลายแบรนด์ภายใต้ safety filter |
| Repeat use | ซื้อสูตรเดิมซ้ำ | เติมของที่ยังยอมรับ ปรับเมื่อ feedback หรือชีวิตเปลี่ยน และเก็บประวัติใน Care Passport |
| Moat | สูตร โรงงาน ช่องทาง และแบรนด์ | longitudinal acceptance data, SKU ontology, trial protocol, switching logic, trust และ partner network |

ดังนั้น **มูลค่าตลาดอาหารสุนัขคือ transaction pool ที่ระบบอาจมีอิทธิพล** ไม่ใช่รายได้ของ PawProud และไม่ใช่ตลาดใหม่ที่นำไปบวกเพิ่มอีกก้อน

## 3. Chain problem → chain service

### ปัญหาเดิม

```text
เลือกจากฉลาก/รีวิว
        ↓
ซื้อถุงใหญ่ก่อนมีหลักฐานจากผู้กินจริง
        ↓
สุนัขปฏิเสธ กินไม่สม่ำเสมอ หรือเจ้าของไม่แน่ใจ
        ↓
เปลี่ยนหลายตัวแปรพร้อมกัน
        ↓
เสียเงิน/เกิดอาหารเหลือ แต่ไม่ได้ความรู้ที่ใช้ครั้งต่อไป
        ↓
กลับไปเดาใหม่
```

### บริการของ PawProud

```text
Profile + safety gate
        ↓
ลองสินค้าหลายแบรนด์ในขนาดปิดผนึกที่ตรวจสอบย้อนกลับได้
        ↓
เจ้าของบันทึก approach · choice · intake · response
        ↓
TastePrint แสดงสิ่งที่พอรู้และสิ่งที่ยังไม่รู้
        ↓
คัด shortlist ที่ผ่าน nutrition/safety filter ก่อน แล้วจึงจัดอันดับด้วย preference + ราคา + availability
        ↓
First Bowl / first paid order แบบครั้งเดียว
        ↓
Meal check-in ยืนยันว่า early signal อยู่รอดในชีวิตจริงหรือไม่
        ↓
Flexible replenishment: ส่งซ้ำ ข้าม พัก เปลี่ยน หรือทดลองใหม่ได้
        ↓
Care Passport จำประวัติแทนการเริ่มเดาทุกครั้ง
```

คำว่า “เปลี่ยน” ไม่ได้หมายถึงสุ่มสูตรใหม่ทุกเดือน ระบบเปลี่ยนเมื่อมี trigger เช่น การยอมรับลดลง ช่วงวัยเปลี่ยน งบเปลี่ยน สินค้าขาด หรือเจ้าของขอทดลองใหม่

## 4. Market sizing ที่ไม่สับสนระหว่าง GMV กับรายได้

### 4.1 ชั้นที่ 1 — Category transaction pool

| ตัวเลขปี 2025 | ค่า | สถานะ |
|---|---:|---|
| ยอดค้าปลีกอาหารสุนัขในไทย | **US$988.4M** | External estimate จาก Euromonitor |
| แปลงเพื่อสื่อสารบนเวทีที่ ฿34/US$ | **≈฿33.61B** | Calculation; อัตราแลกเปลี่ยนเป็นสมมติฐานคงที่ ไม่ใช่ spot rate |
| ครัวเรือนเลี้ยงสุนัขในไทย | **6.656M** | External estimate |
| สุนัขเลี้ยงเป็นเพื่อนในไทย | **9.124M ตัว** | External estimate |
| e-commerce share ของตลาดอาหารสัตว์เลี้ยงรวม | **13.8%** | Published channel mix; ใช้เป็น proxy กับ dog food |

**ความหมาย:** ฿33.61B แสดงว่าหมวดนี้ใหญ่และเกิดการซื้อซ้ำ แต่ห้ามเรียกว่า “รายได้ PawProud” หรือ “ลูกค้าที่เข้าถึงได้ทั้งหมด”

### 4.2 ชั้นที่ 2 — National digital channel proxy

```text
US$988.4M dog-food GMV × 13.8% e-commerce proxy
= US$136.40M
≈ ฿4.64B ที่ ฿34/US$
```

นี่คือ **online dog-food GMV proxy** ไม่ใช่ demand ของ PawProud เพราะสัดส่วน 13.8% เป็นของตลาดอาหารสัตว์เลี้ยงรวม ไม่ได้รายงานเฉพาะอาหารสุนัข

### 4.3 ชั้นที่ 3 — Greater Bangkok channel/geography ceiling

แหล่ง Greater Bangkok ประมาณสุนัขมีเจ้าของ **1.290848M ตัว** เทียบกับฐานประเทศไทย **9.1239M ตัว**

```text
Greater Bangkok dog share proxy
= 1.290848M ÷ 9.1239M
= 14.15%

Greater Bangkok dog-food GMV proxy
= US$988.4M × 14.15%
= US$139.84M
≈ ฿4.75B

Greater Bangkok online dog-food GMV proxy
= ฿4.75B × 13.8%
≈ ฿656M ต่อปี
```

**คำเรียกที่ปลอดภัย:** “first serviceable channel-and-geography pool” หรือ “serviceable GMV ceiling”  
**คำที่ยังไม่ควรใช้:** “SAM ที่พิสูจน์แล้ว” เพราะยังไม่ได้กรอง need state, eligibility, willingness to try และ partner coverage

สมมติฐานที่ต้องติดอยู่กับเลข ฿656M:

1. ค่าใช้จ่ายอาหารต่อสุนัขใน Greater Bangkok เท่าค่าเฉลี่ยประเทศ
2. สัดส่วน e-commerce ของ dog food เท่ากับ pet food รวม
3. ประชากรสุนัขจากคนละแหล่งและปีสามารถใช้เป็น geographic proxy ได้
4. ตัวเลขไม่หักสินค้าที่ PawProud ไม่สามารถจัดหา ไม่ผ่านเกณฑ์ หรือไม่เหมาะกับกลุ่มเป้าหมาย

### 4.4 ชั้นที่ 4 — Need-state planning range

ยังไม่มีสถิติไทยที่พิสูจน์ตรง ๆ ว่าเจ้าของกี่เปอร์เซ็นต์จะซื้อบริการ trial-to-replenishment ดังนั้นใช้ scenario เท่านั้น:

| Scenario | สมมติว่า relevant/eligible | Serviceable GMV | รายได้แพลตฟอร์มถ้า take rate 15% |
|---|---:|---:|---:|
| Conservative | 15% ของ ฿656M | **≈฿98M/ปี** | **≈฿14.8M/ปี** |
| Working | 20% ของ ฿656M | **≈฿131M/ปี** | **≈฿19.7M/ปี** |
| Upper planning case | 30% ของ ฿656M | **≈฿197M/ปี** | **≈฿29.5M/ปี** |

ตัวคูณ 15–30% และ take rate 15% เป็น **สมมติฐานสำหรับ sensitivity analysis** ไม่ใช่ผลสำรวจหรือ forecast

### 4.5 Bottom-up operating scenario

ใช้ราคาต้นแบบ **฿790 ต่อ 28 วัน** หรือประมาณ 13 รอบต่อปี:

| Active subscribers | สัดส่วนจาก 805k ครัวเรือนเลี้ยงสุนัขใน Greater Bangkok | Annual GMV | รายได้แพลตฟอร์มที่ take rate 15% |
|---:|---:|---:|---:|
| 1,000 | 0.12% | **฿10.27M** | **฿1.54M** |
| 10,000 | 1.24% | **฿102.70M** | **฿15.41M** |
| 25,000 | 3.11% | **฿256.75M** | **฿38.51M** |

นี่เป็น operating sensitivity ไม่ใช่ยอดขายคาดการณ์ เป้าหมาย pilot 30–50 คู่มีไว้พิสูจน์ conversion, repeat acceptance, safety load และ willingness to pay ไม่ใช่ใช้เป็น SOM

## 5. PawProud สร้างรายได้จากส่วนไหน

```text
PawProud revenue
= fulfilled food GMV × disclosed margin/commission
+ Taste Trial fee
+ optional owner-paid service fee
+ optional qualified nutrition/vet review
```

ลำดับที่เหมาะกับความไว้ใจ:

1. margin หรือ commission จากสินค้าที่จัดส่งจริง
2. Taste Trial แบบชำระเงินและอาจเครดิตเข้าคำสั่งซื้อแรก
3. membership/service fee สำหรับการเรียนรู้ การจัดรอบ และ Care Passport
4. qualified professional review สำหรับเคสที่ต้องใช้ผู้เชี่ยวชาญ
5. aggregated, consented B2B insight ในอนาคต โดยไม่ขาย identifiable health data

**กฎห้ามเปลี่ยน:** commission, sponsorship หรือสินค้าคงเหลือห้ามเข้า fit score; sponsored discovery ต้องแยกและติดป้าย; ผู้ใช้บันทึกอาหารที่ซื้อจากที่อื่นได้

## 6. ทำไมเป็นตำแหน่งที่น่าสนใจกว่า “อาหารอีกแบรนด์”

### Scale logic: เริ่มจาก niche แล้วกลายเป็น infrastructure layer

```text
Niche แรก: สุนัขที่ food fit ยังไม่ชัด + เจ้าของที่ไม่อยากเดา
        ↓
คัด demand ที่มี intent สูงให้ 5–10 trusted SKUs
        ↓
รับ disclosed margin/commission เมื่อพาร์ตเนอร์ fulfil สำเร็จ
        ↓
ข้อมูล acceptance ทำให้ refill และ substitution แม่นขึ้น
        ↓
เพิ่มแบรนด์ SKU ช่วงวัย งบ และพื้นที่ โดยไม่สร้างโรงงาน
        ↓
PawProud กลายเป็น decision + demand-routing infrastructure ของหมวด
```

PawProud จึง **เริ่มแบบ vertical niche แต่ scale แบบ platform**: ขยายความลึกด้วยข้อมูลรายตัวและขยายความกว้างด้วย catalog/partner network ไม่ใช่ขยายด้วยการผลิตสูตรของตนเองทุกครั้ง

- ปี 2024 Mars และ CP รวมกันมีส่วนแบ่งอาหารสุนัขในไทยประมาณ **38.9%** ขณะที่ “Others” ยังมี 46.2% แสดงทั้ง incumbent power และความกระจัดกระจายของตัวเลือก
- มีการเปิดตัวผลิตภัณฑ์สำหรับสุนัข **288 รายการ** ระหว่างมกราคม 2021 ถึง 6 มีนาคม 2026 ในฐานข้อมูลที่รายงาน จึงไม่ขาด “สินค้าอีกชิ้น”
- e-commerce เป็นช่องทางอาหารสัตว์เลี้ยงที่โตเร็ว โดยมี CAGR **15.8%** ระหว่าง 2020–2025 และมีสัดส่วน 13.8% ในปี 2025
- PawProud สามารถเริ่มด้วย catalog 5–10 สินค้าที่ไว้ใจได้ แทนการลงทุนโรงงาน สูตร และ inventory จำนวนมาก
- ทุก trial ที่เก็บอย่างมีมาตรฐานสร้างข้อมูลข้ามแบรนด์ที่แบรนด์เดี่ยวเห็นไม่ครบ

ข้อแลกเปลี่ยน:

- margin และการควบคุม supply ต่ำกว่าเจ้าของแบรนด์เอง
- ต้องจัดการ availability, substitution, expiry, batch traceability และข้อมูลฉลากให้ดี
- หากไม่มี trial protocol + learning loop + governance จะกลายเป็นเพียงร้าน bundle หรือ affiliate

## 7. Competitive whitespace

| โมเดล | หลายแบรนด์ | Personalization | เรียนจากการกินจริงต่อเนื่อง | จัดส่งซ้ำ |
|---|---:|---:|---:|---:|
| Multi-brand autoship retailer | ✓ | จำกัด | — | ✓ |
| Brand-owned food finder | — | แบบสอบถาม | — | ภายในแบรนด์ |
| Proprietary personalized food | — | ✓ | บางส่วน | ✓ |
| Cross-brand recommendation tool | ✓ | ✓ | โดยทั่วไปไม่ใช่ repeated trial loop | — |
| **PawProud** | **✓** | **✓** | **✓** | **✓** |

Whitespace นี้เป็น **inference จากรูปแบบบริการที่ตรวจพบ** ไม่ใช่คำอ้างว่าไม่มีคู่แข่งรายใดในโลก

ตัวอย่าง validation ของ recurring multi-brand commerce: Chewy รายงานว่ายอดขายจากลูกค้า Autoship คิดเป็น **83.3% ของยอดขายสุทธิ FY2025** ตัวเลขนี้รวมการซื้อแบบอื่นของลูกค้า Autoship ด้วย จึงใช้ยืนยันความสำคัญของ recurring-customer system ในบริบทสหรัฐฯ เท่านั้น ไม่ใช่ retention forecast สำหรับไทย

## 8. ขอบเขตปฏิบัติการและกฎหมายไทย

อาหารสุนัข/แมวอยู่ในกลุ่มอาหารสัตว์ควบคุมเฉพาะ และคำว่า “ผลิต” ตาม พ.ร.บ. ควบคุมคุณภาพอาหารสัตว์ครอบคลุมการทำ ผสม แปรรูป เตรียม เปลี่ยนสภาพ และแบ่งบรรจุ

| รูปแบบ | บทบาท PawProud | ขอบเขตเริ่มต้น |
|---|---|---|
| แนะนำ SKU ที่ขึ้นทะเบียน; retailer/distributor ที่มีใบอนุญาตขายและจัดส่งแพ็กปิดผนึก | decision/learning layer | **Launch model ที่แนะนำ** |
| PawProud ซื้อและขายต่อแพ็กเดิม | ผู้ขาย | มีแนวโน้มต้องมีใบอนุญาตขายและสถานที่/การเก็บที่สอดคล้อง |
| เปิดถุง แบ่งซอง ติดฉลากใหม่ หรือผสมหลายแบรนด์ | ผู้ผลิต/แบ่งบรรจุ | ต้องพิจารณาใบอนุญาตผลิต การขึ้นทะเบียน ฉลาก โรงงาน QA และ traceability |
| licensed co-manufacturer ผลิต finite approved blends | ผู้เลือกจากสูตรที่อนุมัติ | ทางเลือกอนาคตหลัง regulatory validation |

MVP จึงใช้ภาษาว่า **“brand-independent selection + rotation/replenishment plan”** ไม่ใช้ “AI สร้างสูตรลับ”

หลักการเปิดตัวจริง:

- ใช้ manufacturer-sealed, registered products หรือ sample size จากพาร์ตเนอร์ที่มีใบอนุญาต
- เก็บเลขทะเบียน ผู้ผลิต/ผู้นำเข้า ส่วนประกอบ โภชนาการ วันผลิต/หมดอายุ และคำแนะนำการให้อาหารไว้ครบ
- therapeutic diet ต้องมีสัตวแพทย์เกี่ยวข้อง
- AI อธิบาย observed preference/tolerance signals ไม่วินิจฉัย allergy หรือโรค
- ตรวจสินค้าและพาร์ตเนอร์กับ DLD e-Feed ก่อนใช้งานจริง

## 9. สิ่งที่ AI ทำและไม่ทำ

### AI ทำ

- สรุป feedback ที่เจ้าของบันทึกเป็นภาษาที่เข้าใจง่าย
- อธิบายว่าทำไมสินค้าที่ผ่าน safety filter จึงอยู่ใน shortlist
- ชี้ uncertainty และเสนอ next comparison ที่ให้ข้อมูลเพิ่ม
- ช่วยปรับ cadence หรือเสนอ alternative เมื่อสินค้า unavailable

### AI ไม่ทำ

- สร้าง nutrient formula ใหม่ตามใจ
- วินิจฉัย allergy หรือโรค
- เลือก therapeutic diet โดยไม่มีผู้เชี่ยวชาญ
- ให้ค่าคอมมิชชันหรือ sponsorship เปลี่ยนอันดับ
- อ้างว่าการเลือกครั้งเดียวพิสูจน์ ingredient causality

## 10. Validation plan หลังการแข่งขัน

Pilot 30–50 owner–dog teams ควรตอบคำถามต่อไปนี้:

| สมมติฐาน | ตัวชี้วัด |
|---|---|
| เจ้าของยอมทดลองแบบมีโครงสร้าง | trial completion และ protocol error rate |
| ผลช่วยลดการเดา | owner confidence change และ explainability comprehension |
| early signal อยู่รอดในมื้อจริง | First Bowl acceptance และ stable accepted match |
| บริการสร้าง repeat ที่มีคุณค่า | eligible second/third replenishment, 30/60/90-day retention |
| ลดของเหลือได้ | unused-food mass/value เทียบ baseline |
| safety gate ใช้ได้ | exclusion/escalation rate, false reassurance incidents |
| รายได้ไม่ทำลายความไว้ใจ | sponsored-label comprehension และ perceived neutrality |

Stop/go rule: หาก standardized trial ไม่เพิ่มคุณภาพการตัดสินใจเหนือแบบสอบถามหรือการเลือกเอง หรือหาก safety/operations burden สูงเกินไป ให้ลด/หยุด active-learning claim ก่อนขยาย catalog

## 11. Slide-ready market story

### Hook

> **Thailand’s dog-food market is worth US$988.4M—but another bag enters a red ocean.**

### Reframe

> **PawProud does not manufacture another formula. We learn what each dog accepts, curate across trusted registered brands, and replenish only what continues to work.**

### Market visual

```text
฿33.61B  Thailand dog-food transaction pool
    ↓ 13.8% e-commerce proxy
฿4.64B   national online dog-food proxy
    ↓ 14.15% Greater Bangkok dog-population proxy
฿656M    first channel + geography ceiling
    ↓ 15–30% relevant/eligible planning assumption
฿98–197M serviceable GMV scenario
    ↓ 15% illustrative take rate
฿14.8–29.5M platform revenue pool scenario
```

### Close

> **เราไม่แข่งเพื่อเป็นอาหารสุนัขแบรนด์ที่ดีที่สุด เราแข่งเพื่อเป็นวิธีที่ไว้ใจได้ที่สุดในการเลือก ทดลอง และกินต่อให้เหมาะกับสุนัขตัวนี้**

## 12. Sources

- Agriculture and Agri-Food Canada / Euromonitor, [Sector Trend Analysis — Pet food in Thailand](https://agriculture.canada.ca/en/international-trade/reports-and-guides/sector-trend-analysis-pet-food-thailand)
- Hiby et al., [Population Demographics of Owned Dogs in Greater Bangkok](https://pmc.ncbi.nlm.nih.gov/articles/PMC12070910/)
- Kittitunyapong et al., [Feeding practices and purchasing behaviors among Thai dog owners](https://pmc.ncbi.nlm.nih.gov/articles/PMC12668747/)
- Chewy, [Fiscal Fourth Quarter and Full Year 2025 Results](https://investor.chewy.com/news-and-events/news/news-details/2026/Chewy-Announces-Fiscal-Fourth-Quarter-and-Full-Year-2025-Financial-Results/default.aspx)
- Purina, [Pet Food Finder](https://www.purina.com/pet-food-finder)
- tails.com, [How it works](https://tails.com/gb/how-it-works/)
- IntelliBowl, [Cross-brand nutrition recommendation](https://intellibowl.com/)
- กรมปศุสัตว์, [ศูนย์ส่งเสริมอาหารสัตว์เลี้ยง](https://afvc.dld.go.th/index.php/th/petfood-afvc)
- กรมปศุสัตว์, [แบบฟอร์มและเอกสารด้านอาหารสัตว์](https://afvc.dld.go.th/index.php/th/download-form-afvc)
- กรมปศุสัตว์, [ระบบค้นหาใบอนุญาตและทะเบียน e-Feed](https://efeed.dld.go.th/dld-afvc/search_lc/view.do)
- พระราชบัญญัติควบคุมคุณภาพอาหารสัตว์ พ.ศ. 2558, [ฉบับเผยแพร่โดยกรมปศุสัตว์](https://aqi.dld.go.th/webnew/images/stories/00Act/animal%20feed%20control%20act%202558%20th.pdf)

