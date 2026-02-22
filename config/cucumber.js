module.exports = {
  default: {
    tags: process.env.npm_config_TAGS || "",
    paths: ["src/test/features/"],
    require: [
      "src/test/steps/*.ts",
      "src/hooks/hooks.ts"
    ],
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      "html:test-results/cucumber-report.html",
      "json:test-results/cucumber-report.json"
    ],
    publishQuiet: true,
    dryRun: false
  }
};