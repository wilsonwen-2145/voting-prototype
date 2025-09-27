// check-environment.js
const semver = require("semver")
const os = require("os")

// Get Node.js version
const nodeVersion = process.version
const minVersion = "18.19.0"

const isWindows11 = os.platform() === "win32" && os.release().startsWith("10.0.22")
const isVSCode = process.env.TERM_PROGRAM === "vscode"

if (!semver.satisfies(nodeVersion, `>=${minVersion}`)) {
  console.error(
    `Error: Node.js version must be at least ${minVersion}. Recommend: 22.13.0 Current version: ${nodeVersion}`
  )
  process.exit(1)
}

if (isVSCode && isWindows11) {
  console.error(
    "Error: Running the project in a VSCode terminal is not supported. Please use a regular terminal without a VSCode."
  )
  process.exit(1)
}

const isCodeSandbox = !!process.env.SANDBOX
const isGitpod = !!process.env.GITPOD_WORKSPACE_URL
const isCodespaces = !!process.env.CODESPACES

// Run the project in only Sandbox environment
if (isCodeSandbox) {
  console.log("Running the project in Sandbox environment.")
}

if (isGitpod || isCodespaces) {
  console.error(
    "Error: Running the project in this terminal is not supported. Please use a regular terminal."
  )
  process.exit(1)
}

console.log("Environment check passed.")
