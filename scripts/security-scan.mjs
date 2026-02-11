import { execSync } from "node:child_process";

try {
  execSync("npm audit --audit-level=high", { stdio: "inherit" });
} catch {
  process.exit(1);
}
