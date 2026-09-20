import { defineConfig } from "@trigger.dev/sdk";

const project = process.env.TRIGGER_PROJECT_REF;

if (!project) {
  throw new Error("Missing TRIGGER_PROJECT_REF for Trigger.dev.");
}

export default defineConfig({
  project,
  dirs: ["./trigger"],
  runtime: "node",
  maxDuration: 1800,
  processKeepAlive: true,
});
