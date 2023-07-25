import assert from "assert"; // assert คือ การยืนยัน
import sinon from "sinon";

import {
  getThaiTimestamp,
  isValueEmpty,
  isValueNotNull,
  toLowerCase,
  trimWhitespace,
} from "../../src/utils/CommonUtils";

//Unit test
describe("CommonUtils", function () {
  const value = "Hello";
  const nullValue = null;
  const undefinedValue = undefined;


  describe("getThaiTimestamp", function () {
    it("should return a string in the format of Thai timestamp", function () {
      const timestamp = getThaiTimestamp();
      //^ หมายถึงต้องเริ่มต้นข้อความ (string) ตรงกับรูปแบบที่กำหนด
      // \d หมายถึงตัวเลข (digit)
      // {4} หมายถึงต้องเป็นตัวเลข (digit) ที่เกิดขึ้นติดกัน 4 ตัว
      // \d{2}Z$: หมายถึงต้องมีตัวเลข 2 หลักตามด้วยตัวอักษร Z และจบท้ายด้วยเครื่องหมาย $ ซึ่งหมายถึงต้องเป็นตัว Z ที่อยู่ท้ายสุดของ string
      // .test(timestamp) เป็นการใช้คำสั่งของ JavaScript RegExp ในการตรวจสอบว่าค่าของ timestamp ตรงกับรูปแบบของ RegExp ที่กำหนดหรือไม่
      // /.test(timestamp) จะคืนค่า true ถ้า timestamp ตรงกับรูปแบบของ RegExp และคืนค่า false ถ้า timestamp ไม่ตรง
      //2023-07-23T22:07:15+07:00
      const pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+07:00$/;
      assert.ok(typeof timestamp === "string" && pattern.test(timestamp));
    });
  });


  describe("isValueNotNull()", function () {
    it("should return true when the value is not null or undefined", function () {
      assert.strictEqual(isValueNotNull(value), true);
    });
    it("should return false when the value is null or undefined", function () {
      assert.strictEqual(isValueNotNull(nullValue), false);
      assert.strictEqual(isValueNotNull(undefinedValue), false);
    });
  });


  describe("trimWhitespace()", function () {
    it("should trim whitespace from the value", function () {
      const valueWhitespace = "    Hello    ";
      const actual = trimWhitespace(valueWhitespace);
      const expect = "Hello";
      assert.strictEqual(actual, expect);
    });
  });


  describe("toLowerCase()", function () {
    it("should convert the value to lowercase", function () {
      const actual = toLowerCase(value);
      const expect = "hello";
      assert.strictEqual(actual, expect);
    });
  });

  
  describe("isValueEmpty()", function () {
    const mockReply: any = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub().returnsThis(),
    };

    it("should return true and send error message when the value is null or undefined", function () {
      const resultNull = isValueEmpty(mockReply, nullValue, "Test");
      const resultUndefined = isValueEmpty(mockReply, undefinedValue, "Test");

      assert.strictEqual(resultNull, true);
      assert.ok(mockReply.status.calledWith(404));
      assert.ok(mockReply.send.calledWith({ message: "Test not found" }));

      assert.strictEqual(resultUndefined, true);
      assert.ok(mockReply.status.calledWith(404));
      assert.ok(mockReply.send.calledWith({ message: "Test not found" }));
    });

    it("should return false when the value is not null or undefined", function () {
      const actual = isValueEmpty(mockReply, "test", "Test");
      const expect = false
      
      assert.strictEqual(actual, expect);
    });
  });
});

//assert.equal จะทำการเปรียบเทียบค่าแบบ loose equality (==), ซึ่งจะให้ผลลัพธ์เป็น true ถ้าค่าทั้งสองมีความเท่ากันเมื่อทำการแปลงชนิดข้อมูล
//assert.strictEqual จะทำการเปรียบเทียบค่าแบบ strict equality (===), ซึ่งจะให้ผลลัพธ์เป็น true เฉพาะเมื่อค่าทั้งสองมีความเท่ากันและเป็นชนิดข้อมูลเดียวกัน
