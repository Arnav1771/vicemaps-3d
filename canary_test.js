const page = await browser.getPage("terra_improver");

await page.goto("http://localhost:5055/", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);

// 1. Open Place Detail Card
console.log("1. Opening Place Detail Card...");
await page.evaluate(() => {
  document.getElementById('rail-saved').click();
});
await page.waitForTimeout(2000);

const buf1 = await page.screenshot({ fullPage: false });
await saveScreenshot(buf1, "terra_3d_place_card_live.png");
console.log("Saved terra_3d_place_card_live.png");

// 2. Open Multi-Modal Directions Drawer
console.log("2. Opening Directions Drawer...");
await page.evaluate(() => {
  document.getElementById('btn-place-directions').click();
});
await page.waitForTimeout(2500);

const buf2 = await page.screenshot({ fullPage: false });
await saveScreenshot(buf2, "terra_3d_directions_drawer_live.png");
console.log("Saved terra_3d_directions_drawer_live.png");

// 3. Start Active 3D Navigation
console.log("3. Starting 3D Navigation...");
await page.evaluate(() => {
  document.getElementById('btn-start-navigation').click();
});
await page.waitForTimeout(3000);

const buf3 = await page.screenshot({ fullPage: false });
await saveScreenshot(buf3, "terra_3d_active_nav_live.png");
console.log("Saved terra_3d_active_nav_live.png");
