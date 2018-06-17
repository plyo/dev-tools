#!/usr/bin/env node

const path = require("path");
const { readAccess } = require("plyo-tools/lib/fs");
const { spawn, exec } = require("plyo-tools/lib/childProcess");

function fileInOriginRepo(fileName) {
  return readAccess(path.resolve(process.cwd(), fileName));
}

async function lint(staged) {
  const args = ["eslint"];

  let stagedFiles = [];
  if (staged) {
    // we need `|| true` at the end because grep return 1 exit status if no lines matched and the script throws an error
    const { stdout } = await exec(
      "git status -s -uno | grep -v D |  grep -v '^ ' | awk '{print $2}' | grep js$ || true"
    );
    stagedFiles = stdout.split("\n");
    stagedFiles.pop();
  }

  if (!stagedFiles.length) {
    return;
  }

  if (
    !await fileInOriginRepo(".eslintrc") &&
    !await fileInOriginRepo(".eslintrc.js")
  ) {
    args.push("--config", path.resolve(__dirname, "../.eslintrc.js"));
  }

  if (staged) {
    args.push("--fix", "--no-ignore", ...stagedFiles);
  } else {
    args.push("--ignore-path", ".gitignore", ".");
  }

  await spawn("npx", args, {
    env: process.env,
    cwd: process.cwd(),
    stdio: "inherit"
  });

  if (staged) {
    await spawn("git", ["add", "--force", ...stagedFiles], {
      env: process.env,
      cwd: process.cwd(),
      stdio: "inherit"
    });
  }
}

lint(process.argv.includes("--staged")).then(
  () => console.log("Lint completed"), // eslint-disable-line no-console
  e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  }
);
