// Step 7: Mobile Navigation Verification
const page = await browser.getPage("terra_mobile");
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://localhost:5055/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);

await page.evaluate(() => {
  document.getElementById('rail-saved').click();
});
await page.waitForTimeout(1000);

await page.evaluate(() => {
  document.getElementById('btn-place-directions').click();
});
await page.waitForTimeout(2500);

await page.evaluate(() => {
  document.getElementById('btn-start-navigation').click();
});
await page.waitForTimeout(2000);

const buf = await page.screenshot({ fullPage: false });
await saveScreenshot(buf, "terra_3d_mobile_navigation_verified.png");
console.log("Saved terra_3d_mobile_navigation_verified.png");
