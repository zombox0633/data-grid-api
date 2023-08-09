bcrypt เป็นไลบรารีที่ใช้ในการเข้ารหัสรหัสผ่านด้วยวิธีการที่ปลอดภัยในการเก็บรักษารหัสผ่านในฐานข้อมูลโดยไม่ต้องเก็บรหัสผ่านดิบ (plaintext password) ซึ่งจะเป็นอันตรายถ้ามีการรั่วไหล

bcrypt.hash: เป็นฟังก์ชันใช้ในการเข้ารหัสรหัสผ่าน. การเข้ารหัสนี้เป็น one-way, หมายความว่าหลังจากที่รหัสผ่านถูกเข้ารหัสแล้ว จะไม่สามารถนำกลับมาเป็นรหัสผ่านต้นฉบับได้

middleware หมายถึงฟังก์ชันหรือชุดของฟังก์ชันที่จะถูกเรียกใช้ในระหว่างขั้นตอนของการประมวลผลคำขอ (request) และการตอบสนอง (response) ในเฟรมเวิร์ก

user
id ccf28f6f-404b-4f0c-bb2a-11f45b253442
zzzz@gmail.com
password abcdefg123
token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNjZjI4ZjZmLTQwNGItNGYwYy1iYjJhLTExZjQ1YjI1MzQ0MiIsImVtYWlsIjoienp6ekBnbWFpbC5jb20iLCJpYXQiOjE2OTE1OTA4NDYsImV4cCI6MTY5MTU5NDQ0Nn0.ekaARpVrUS1_pxwIDn2Cl1JDG4KrQ9bKgZvRZf80kuc