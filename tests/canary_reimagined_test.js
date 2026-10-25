const page = await browser.getPage("terra_reimagined");

await page.goto("http://localhost:5055/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3000);

const title = await page.title();
console.log("Page title:", title);

const brandText = await page.locator(".brand-text").textContent();
console.log("Brand text:", brandText.replace(/\s+/g, ' ').trim());

const categories = await page.locator(".cat-pill").allTextContents();
console.log("Categories active:", JSON.stringify(categories));

const buf = await page.screenshot({ fullPage: false });
const path = await saveScreenshot(buf, "terra_3d_reimagined_live.png");
console.log("Reimagined screenshot saved:", path);
