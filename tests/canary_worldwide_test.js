const page = await browser.getPage("vicemaps_worldwide");

await page.goto("http://localhost:5055/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3000);

// Search for a real worldwide location outside Miami
console.log("Typing worldwide search query: Times Square");
await page.fill("#search-input", "Times Square");
await page.waitForTimeout(1500);

const suggestions = await page.locator(".search-item").count();
console.log("Worldwide suggestions count:", suggestions);

const itemText = await page.locator(".search-item").first().textContent();
console.log("First suggestion text:", itemText);

// Click first suggestion (Times Square)
await page.locator(".search-item").first().click();
await page.waitForTimeout(4000);

const telemetryCoords = await page.locator("#telemetry-coords").textContent();
console.log("New coordinates after flyTo:", telemetryCoords);

const buf = await page.screenshot({ fullPage: false });
const path = await saveScreenshot(buf, "vicemaps_3d_worldwide.png");
console.log("Worldwide screenshot saved:", path);
