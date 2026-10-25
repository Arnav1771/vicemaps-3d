const page = await browser.getPage("vicemaps_landing");

await page.goto("http://localhost:5055/landing.html", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3000);

const title = await page.title();
console.log("Landing page title:", title);

const heroTitle = await page.locator(".hero h1").textContent();
console.log("Hero headline:", heroTitle.replace(/\s+/g, ' ').trim());

const platformCardsCount = await page.locator(".platform-card").count();
console.log("Platform cards count:", platformCardsCount);

const buf = await page.screenshot({ fullPage: false });
const path = await saveScreenshot(buf, "vicemaps_landing_live.png");
console.log("Landing page screenshot saved:", path);
