//const assert = require('assert');
const { getVars, setupUnitTestUsers } = require("./test.utils");
//const fetch = require('node-fetch');
//const { baseUrl, regularUser, ownerUser, adminUser } = getVars();

//const { UserModel } = require('../api/users/User.model');

describe("API test initialize", function () {
  before(function () {
    return setupUnitTestUsers();
  });
  describe("regular user for other tests", function () {
    it("setup users", function () {});
  });
});
