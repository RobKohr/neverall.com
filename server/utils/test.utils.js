require("dotenv").config();

const fetch = require("node-fetch");
const assert = require("assert");
const mongoose = require("mongoose");
const { get } = require("lodash");
const { UserModel } = require("../api/users/User.model");
mongoose.connect("mongodb://localhost/" + process.env.dbName, {
  useNewUrlParser: true,
});

const startServer = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("http://localhost:4001")
        .then(() => {
          resolve("Server is running");
        })
        .catch(() => {
          console.error("Server is not running");
        });
    }, 1000);
  });
};
const getVars = () => {
  return {
    baseUrl: "http://localhost:4001",
    regularUser: {
      username: `unit_test_regular_user`,
      password: "correct horse staple battery",
      email: "email@somewhere.com",
    },
    ownerUser: {
      username: `unit_test_owner_user`,
      password: "correct horse staple battery",
      email: "email@somewhere.com",
    },
    adminUser: {
      username: `unit_test_admin_user`,
      password: "correct horse staple battery",
      email: "email@somewhere.com",
    },
  };
};

const { baseUrl, regularUser, ownerUser, adminUser } = getVars();
const setupUnitTestUsers = async () => {
  await startServer();
  await fetch(baseUrl + "/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(regularUser),
  });
  await fetch(baseUrl + "/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(ownerUser),
  });
  return await fetch(baseUrl + "/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(adminUser),
  })
    .then((res) => res.json())
    .then((res) => {
      UserModel.findOneAndUpdate(
        { username: adminUser.username },
        { $set: { role: "admin" } }
      ).exec();
    });
};

const test200ReturnJson = (res) => {
  assert.strictEqual(res.status, 200);
  return res.json();
};

function loginUser({ user }) {
  return new Promise((resolve, reject) => {
    baseLoginUser({ user })
      .then((res) => {
        assert.strictEqual(res.status, 200);
        return res.json();
      })
      .then((res) => {
        headers = {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${res.token}`,
        };
        resolve({ headers, user: res.user });
      });
  });
}
function baseLoginUser({ user }) {
  return fetch(getVars().baseUrl + "/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      username: user.username,
      password: user.password,
    }),
  });
}

function now() {
  return new Date().getTime();
}

module.exports = {
  now,
  test200ReturnJson,
  getVars,
  startServer,
  loginUser,
  baseLoginUser,
  setupUnitTestUsers,
};
