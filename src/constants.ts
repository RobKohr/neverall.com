import { SettingsForApps } from "App";

interface Apps {
  [name: string]: { name: string; title?: string };
}

export const apps: Apps = {
  main: { name: "main" },
  godotassetstore: { name: "godot-asset-store", title: "Godot Asset Store" },
  islandwarfare: { name: "island-warfare", title: "Island Warfare" },
};

export const domainNameAppMapping: SettingsForApps = {
  "localhost.assets": apps.godotassetstore,
  "godot-asset-store": apps.godotassetstore,
  "island-warfare": apps.islandwarfare,

  default: apps.main,
};
