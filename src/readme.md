https://dev.to/somprasongd/typescript-node-js-jb7

npm i -D typescript ts-node nodemon

npm install fastify 

npm i dotenv

npm i fastify

npm install fastify-guard เพื่อให้การปกป้องและการรักษาความปลอดภัยในแอปพลิเคชัน Fastify ที่ง่ายและมีประสิทธิภาพขึ้น


server.register(cors, {
  origin: "http://localhost:5173",
  credentials: true
});

การตั้งค่า CORS (Cross-Origin Resource Sharing) ให้เซิร์ฟเวอร์ API (Back-end) อนุญาตให้หน้าเว็บที่รันที่หรือใช้ API ได้

credentials: true ในการตั้งค่า CORS มีผลต่อวิธีการส่งข้อมูลพิเศษ (เช่น คุกกี้, ส่วนหัวการตรวจสอบ) ระหว่างการร้องขอข้ามต้นกำเนิด (cross-origin request) มาดูแตกต่างระหว่างมีและไม่มีการตั้งค่านี้:

1. มีการตั้งค่า credentials: true
สำหรับข้อความตอบกลับจากเซิร์ฟเวอร์, ส่วนหัว Access-Control-Allow-Credentials จะถูกตั้งเป็น true
เบราว์ร์จะส่งข้อมูลพิเศษ (เช่น คุกกี้) ในการร้องขอข้ามต้นกำเนิด ถ้าไคลเอ็นต์กำหนด credentials: 'include'
โค้ด JavaScript บนไคลเอ็นต์สามารถเข้าถึงข้อมูลตอบกลับได้

ไม่มีการตั้งค่า credentials หรือตั้งค่าเป็น false
ส่วนหัว Access-Control-Allow-Credentials ในข้อความตอบกลับจากเซิร์ฟเวอร์จะไม่ถูกตั้งหรือถูกตั้งเป็น false
เบราว์ร์จะไม่ส่งข้อมูลพิเศษ (เช่น คุกกี้) ในการร้องขอข้ามต้นกำเนิด แม้ว่าไคลเอ็นต์จะกำหนด credentials: 'include' ก็ตาม
หากต้องการเข้าถึงข้อมูลตอบกลับ, ข้อจำกัดของนโยบาย same-origin อาจจะป้องกันไม่ให้โค้ด JavaScript บนไคลเอ็นต์ทำได้