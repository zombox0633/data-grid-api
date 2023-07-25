import assert from "assert";
import sinon from "sinon";

import {
  validateAPIKey,
  validateAuthUser,
  validateRequiredFields,
} from "../../src/utils/ValidateUtils";

describe("ValidateUtils", function () {
  const mockReply: any = {
    status: sinon.stub().returnsThis(),
    send: sinon.stub().returnsThis(),
  };


  describe("validateAPIKey()", function () {
    const mockRequestAPIKey: any = {
      headers: {
        "x-api-key": "testKey",
      },
    };

    it("should return true when headerValue equals value", function () {
      const actual = validateAPIKey(
        mockRequestAPIKey,
        mockReply,
        "x-api-key",
        "testKey"
      );

      const expect = true

      assert.strictEqual(actual, expect);
      assert.strictEqual(mockReply.status.called, false);
      assert.strictEqual(mockReply.send.called, false);
    });

    it("should return false and send error message when headerValue does not equal value", function () {
      const actual = validateAPIKey(
        mockRequestAPIKey,
        mockReply,
        "x-api-key",
        "wrongKey"
      );

      const expect = false

      assert.strictEqual(actual, expect);
      assert.ok(mockReply.status.calledOnceWith(400));
      assert.ok(
        mockReply.send.calledOnceWith({ message: "Invalid custom header" })
      );
    });
  });


  describe("validateAuthUser()", function () {
    const mockReplyBasicAuth: any = {
      headers: { authorization: "" },
    };

    const mockReplyCode: any = {
      code: sinon.stub().returnsThis(),
      send: sinon.stub().returnsThis(),
    };

    const username = "test";
    const password = "password";

    const generateAuthHeader = (username: string, password: string) => {
      const credentials = Buffer.from(`${username}:${password}`).toString(
        "base64"
      );
      return `Basic ${credentials}`;
    };

    it("should return false and send error message when the auth header is missing", function () {
      const actual = validateAuthUser(
        mockReplyBasicAuth,
        mockReplyCode,
        username,
        password
      );

      const expect = false

      assert.strictEqual(actual, expect);
      assert.ok(mockReplyCode.code.calledWith(401));
      assert.ok(
        mockReplyCode.send.calledWith({
          message: "Unauthorized - Missing credentials",
        })
      );
    });

    it("should return false and send error message when the credentials are invalid", function () {
      mockReplyBasicAuth.headers.authorization = generateAuthHeader(
        "wrongUsername",
        "wrongPassword"
      );
      const actual = validateAuthUser(
        mockReplyBasicAuth,
        mockReplyCode,
        username,
        password
      );

      const expect = false

      assert.strictEqual(actual, expect);
      assert.ok(mockReplyCode.code.calledWith(401));
      assert.ok(
        mockReplyCode.send.calledWith({
          message: "Unauthorized - Invalid credentials",
        })
      );
    });

    it("should return true when the credentials are valid", function () {
      mockReplyBasicAuth.headers.authorization = generateAuthHeader(
        "test",
        "password"
      );
      const actual = validateAuthUser(
        mockReplyBasicAuth,
        mockReplyCode,
        username,
        password
      );

      const expect = true

      assert.strictEqual(actual, expect);
    });
  });

  
  describe("validateRequiredFields()", function () {
    it("should return false and send an error message when a field is missing", function () {
      const field = ["field1", "", "field3"];
      const actual = validateRequiredFields(mockReply,field)
      const expect = false

      assert.strictEqual(actual, expect)
      assert.ok(mockReply.status.calledWith(400))
      assert.ok(mockReply.send.calledWith({message:"Please provide a value for the required field"}))
    });

    it("should return true when all fields are provided", function(){
      const field = ["field1", "field2", "field3"];
      const actual = validateRequiredFields(mockReply,field)
      const expect = true

      assert.strictEqual(actual, expect)
    })
  });
});
