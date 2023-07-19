npx prisma generate ใช้สำหรับเชื่อมต่อและไม่ได้สร้างทับข้อมูลที่สร้างไว้แล้ว

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Products {
  id                     String       @id @default(uuid())
  name                   String
  category_id            String?
  price                  Decimal
  quantity               Int
  last_op_id             String?      @map("LAST_OP_ID")
  created_timestamp      DateTime     @default(now()) @map("CREATED")
  lastupdate_timestamp   DateTime     @updatedAt @map("LASTUPDATE")
  category               Category?    @relation(fields: [category_id], references: [id])
  last_op_user           User?        @relation("LastOpUser", fields: [last_op_id], references: [id])
}

model Category {
  id                     String       @id @default(uuid())
  name                   String
  last_op_id             String?      @map("LAST_OP_ID")
  created_timestamp      DateTime     @default(now()) @map("CREATED_TIMESTAMP")
  lastupdate_timestamp   DateTime     @updatedAt @map("LASTUPDATE_TIMESTAMP")
  products               Products[]
  last_op_user           User?        @relation("LastOpUser", fields: [last_op_id], references: [id])
}

model User {
  id                     String       @id @default(uuid())
  email                  String
  password               String
  name                   String
  role                   String
  created_timestamp      DateTime     @default(now()) @map("CREATED_TIMESTAMP")
  lastupdate_timestamp   DateTime     @updatedAt @map("LASTUPDATE_TIMESTAMP")
  products_created       Products[]    @relation("LastOpUser")
  categories_created     Category[]   @relation("LastOpUser")
}