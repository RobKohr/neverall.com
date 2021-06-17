const assert = require("assert");
const {
  startServer,
  getVars,
  test200ReturnJson,
  now,
  loginUser,
  baseLoginUser,
} = require("../../utils/test.utils");
const fetch = require("node-fetch");

const { baseUrl, regularUser } = getVars();

describe("User", function () {
  beforeEach(async function () {
    await startServer();
  });
  const testUser = {
    ...regularUser,
    username: `unit_test_user_${now()}`,
  };
  describe("test register", function () {
    it("create a user", function () {
      return createUser({
        user: testUser,
      });
    });
    it("try to create a user with too short of a username and fail", function () {
      return createUser({
        user: {
          ...testUser,
          username: "ab",
        },
        expectedStatus: 400,
        validateJson: (res) => {
          assert.strictEqual(res.errorCode, "VALIDATION_ERROR");
        },
      });
    });

    it("create a user duplicate user and fail", function () {
      return fetch(baseUrl + "/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(testUser),
      })
        .then((res) => res.json())
        .then((res) => {
          assert.strictEqual(res.errorCode, `ALREADY_EXISTS`);
        });
    });
  });

  describe("test login", function () {
    const loginTestUser = {
      ...testUser,
      username: testUser.username + "_login",
    };
    before(async function () {
      return await createUser({
        user: loginTestUser,
      });
    });
    it("with the correct credentials, user should be able to login", function () {
      return loginUser({ user: loginTestUser });
    });

    it("with incorrect correct credentials, user should not be able to login", async () => {
      const user = { ...loginTestUser, password: "asdf" };
      return await baseLoginUser({ user })
        .then((res) => {
          assert.strictEqual(res.status, 401);
          return res.json();
        })
        .then((res) => {});
    });
  });

  describe("view and manipulate users", function () {
    let headers;
    let targetUser = null;

    before(async function () {
      await startServer();
      await baseLoginUser({ user: regularUser })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          headers = {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${res.token}`,
          };
        });
    });
    it("get a list of users - no filters or sorting, then find that individual user", function () {
      return createUser({
        user: { ...testUser, username: "unit_test_list_of_users" + now() },
      })
        .then(() => {
          return createUser({
            user: {
              ...testUser,
              username: "unit_test_list_of_users_2" + now(),
            },
          });
        })
        .then(() => {
          return fetch(baseUrl + "/api/users", {
            method: "GET",
            headers,
          })
            .then((res) => {
              //assert.strictEqual(res.status, expectedStatus);
              return res.json();
            })
            .then((res) => {
              targetUser = res.items[0];
              assert.strictEqual(typeof res.items[0].username, "string");
              return getIndividualUserById({ _id: targetUser._id }).then(
                (res) => {
                  assert.strictEqual(typeof res.item.username, "string");
                }
              );
            });
        });
    });
  });
});

function getIndividualUserById({ _id, expectedStatus = 200 }) {
  return fetch(baseUrl + `/api/users/${_id}`, {
    method: "GET",
  }).then((res) => {
    assert.strictEqual(res.status, expectedStatus);
    return res.json();
  });
}

function createUser({
  user,
  expectedStatus = 200,
  validateJson = (res) => {
    assert.strictEqual(
      res.successMessage,
      `User ${user.username} created, please log in.`
    );
  },
}) {
  return fetch(baseUrl + "/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      assert.strictEqual(res.status, expectedStatus);
      return res.json();
    })
    .then((res) => {
      validateJson(res);
      return res;
    });
}
