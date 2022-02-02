import { SettingsForApps } from "App";

interface Apps {
  [name: string]: { name: string; title?: string; baseUrl?: string };
}

export const apps: Apps = {
  main: {
    name: "main",
    baseUrl: "",
    title: "Neverall",
  },
  godotassetstore: {
    name: "godot-asset-store",
    baseUrl: "godot-asset-store",
    title: "Godot Asset Store",
  },
  islandwarfare: {
    name: "island-warfare",
    baseUrl: "island-warfare",
    title: "Island Warfare",
  },
  feedback: {
    name: "feedback",
    baseUrl: "feedback",
    title: "Feedback",
  },
};

export const domainNameAppMapping: SettingsForApps = {
  "localhost.assets": apps.godotassetstore,
  "godot-asset-store": apps.godotassetstore,
  "island-warfare": apps.islandwarfare,
  feedback: apps.feedback,
  //  "127.0.0.1": apps.islandwarfare, // <--- test out domain name mapped to an individual app
  default: apps.main,
};
