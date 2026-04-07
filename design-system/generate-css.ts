import * as fs from "fs"
import * as path from "path"
import { tokens } from "./tokens"
import { tokenKeyToCssVar, sidebarKeyToCssVar } from "./utils"

const GLOBALS_PATH = path.join(process.cwd(), "app", "globals.css")
const START_MARKER = "/* DESIGN-TOKENS-START */"
const END_MARKER = "/* DESIGN-TOKENS-END */"

function generateTokenBlock(): string {
  const lines: string[] = [START_MARKER, ":root {"]

  for (const [key, value] of Object.entries(tokens.colors)) {
    lines.push(`  ${tokenKeyToCssVar(key)}: ${value};`)
  }

  for (const [key, value] of Object.entries(tokens.radius)) {
    lines.push(`  --radius-${key}: ${value};`)
  }

  lines.push("}")
  lines.push("")
  lines.push(".dark {")
  for (const [key, value] of Object.entries(tokens.colors)) {
    lines.push(`  ${tokenKeyToCssVar(key)}: ${value};`)
  }
  lines.push("}")
  lines.push("")
  lines.push("[data-sidebar] {")
  for (const [key, value] of Object.entries(tokens.sidebar)) {
    lines.push(`  ${sidebarKeyToCssVar(key)}: ${value};`)
  }
  lines.push("}")
  lines.push(END_MARKER)

  return lines.join("\n")
}

function run() {
  const existing = fs.existsSync(GLOBALS_PATH) ? fs.readFileSync(GLOBALS_PATH, "utf-8") : ""
  const newBlock = generateTokenBlock()

  const startIdx = existing.indexOf(START_MARKER)
  const endIdx = existing.indexOf(END_MARKER)

  let updated: string
  if (startIdx !== -1 && endIdx !== -1) {
    updated = existing.slice(0, startIdx) + newBlock + existing.slice(endIdx + END_MARKER.length)
  } else {
    updated = existing + "\n" + newBlock + "\n"
  }

  if (process.argv.includes("--check")) {
    if (updated !== existing && startIdx !== -1) {
      console.error("Design tokens are out of sync. Run `npm run tokens` to update.")
      process.exit(1)
    }
    console.log("Design tokens are in sync.")
    return
  }

  fs.writeFileSync(GLOBALS_PATH, updated, "utf-8")
  console.log("Design tokens written to globals.css")
}

run()
