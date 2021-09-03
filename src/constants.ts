import { SettingsForApps } from "App";

export const apps = {
  main: { name: "main" },
  godotassetstore: { name: "godot-asset-store" },
};

export const domainNameAppMapping: SettingsForApps = {
  "localhost.assets": apps.godotassetstore,
  "godot-asset-store": apps.godotassetstore,
  default: apps.main,
};
