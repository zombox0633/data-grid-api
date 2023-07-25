import assert from "assert";
import sinon from "sinon";

import { handleServerError } from "../../src/utils/ErrorUtils";

describe("ErrorUtils", function () {
  describe("handleServerError()", function () {
    it("should call reply.status and reply.send with correct parameters", function () {
      const mockReply: any = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub().returnsThis(),
      };

      const errorMessage = "This is a test error";

      handleServerError(mockReply, errorMessage);

      assert.ok(mockReply.status.calledWith(500));
      assert.ok(mockReply.send.calledWith({ message: "Internal server error" }));
    });
  });
});
