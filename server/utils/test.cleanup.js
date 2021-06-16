const assert = require("assert");
const { startServer, getVars } = require("./test.utils");
const fetch = require("node-fetch");
const { baseUrl, regularUser, ownerUser, adminUser } = getVars();

const { UserModel } = require("../api/users/User.model");

describe("API test cleanup", function () {
  beforeEach(async function () {
    await startServer();
  });
  describe("regular user for other tests", function () {
    it("removes all unit_test* users and restaurants", () => {
      UserModel.deleteMany({ username: /unit_test/ }).exec();
    });
  });
});
