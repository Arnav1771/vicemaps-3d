const page = await browser.getPage("terra_master");

await page.goto("http://localhost:5055/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3500);

const title = await page.title();
console.log("Page title:", title);

// Verify Left Tool Rail
const railButtons = await page.locator(".rail-btn").count();
console.log("Left tool rail buttons count:", railButtons);

// Verify Lighting Presets
const lightingPills = await page.locator(".lighting-pill-btn").count();
console.log("Lighting preset pills count:", lightingPills);

// Click Daylight preset
await page.locator('.lighting-pill-btn[data-light="daylight"]').click();
await page.waitForTimeout(1000);
const lightLabel = await page.locator("#lighting-mode-label").textContent();
console.log("Active lighting mode:", lightLabel);

// Check Telemetry Strip (Measured FPS and Altitude)
const fpsText = await page.locator("#telemetry-fps").textContent();
const altText = await page.locator("#telemetry-altitude").textContent();
console.log("Measured Telemetry:", { fpsText, altText });

const buf = await page.screenshot({ fullPage: false });
const path = await saveScreenshot(buf, "terra_3d_master_live.png");
console.log("Master screenshot saved:", path);
