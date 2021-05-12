export const apps = {
  main: { name: "main" },
  assets: { name: "assets" },
};

export const domainNameAppMapping = {
  "localhost.assets": apps.assets,
  default: apps.main,
};
