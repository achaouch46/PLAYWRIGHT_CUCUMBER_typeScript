import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";
const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;

/* =======================
   BEFORE ALL
======================= */
BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});

/* =======================
   BEFORE EACH SCENARIO
======================= */
Before(async function ({ pickle }) {
    const scenarioName = `${pickle.name}_${pickle.id}`;

    context = await browser.newContext({
        recordVideo: {
            dir: "test-results/videos"
        }
    });

    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        screenshots: true,
        snapshots: true,
        sources: true
    });

    const page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
});

/* =======================
   AFTER EACH SCENARIO
   SOLUTION 2 (PRO)
======================= */
After(async function ({ pickle, result }) {
    const scenarioName = `${pickle.name}_${pickle.id}`;
    const tracePath = `./test-results/trace/${pickle.id}.zip`;

    let screenshot: Buffer;
    let videoPath: string | undefined;

    try {
        // 📸 Screenshot TOUJOURS (PASSED + FAILED)
        screenshot = await fixture.page.screenshot({
            path: `./test-results/screenshots/${scenarioName}.png`,
            type: "png"
        });

        // 🎥 Vidéo uniquement si FAILED
        if (result?.status === Status.FAILED) {
            videoPath = await fixture.page.video()?.path();
        }

        // 🧵 Trace uniquement si FAILED
        if (result?.status === Status.FAILED) {
            await context.tracing.stop({ path: tracePath });
        } else {
            await context.tracing.stop();
        }

    } finally {
        // 🧹 Cleanup garanti
        await fixture.page.close();
        await context.close();
    }

    // 📎 Screenshot → PASSED + FAILED
    await this.attach(screenshot, "image/png");

    // 📎 Vidéo → FAILED seulement
    if (videoPath) {
        await this.attach(
            fs.readFileSync(videoPath),
            "video/webm"
        );
    }

    // 📎 Trace → FAILED seulement
    if (result?.status === Status.FAILED) {
        const traceLink = `
            <a href="https://trace.playwright.dev/">
                Open trace: ${tracePath}
            </a>`;
        await this.attach(traceLink, "text/html");
    }
});

/* =======================
   AFTER ALL
======================= */
AfterAll(async function () {
    await browser.close();
});