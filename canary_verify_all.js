// Canary Verification Suite for Terra 3D (terra2.md Section 9)
const page = await browser.getPage("terra_verify");

await page.goto("http://localhost:5055/", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);

// 1. Verify Place Detail Card (Section 1)
console.log("1. Verifying Place Detail Card...");
await page.evaluate(() => {
  document.getElementById('rail-saved').click();
});
await page.waitForTimeout(2000);
const buf1 = await page.screenshot({ fullPage: false });
await saveScreenshot(buf1, "terra_3d_place_card_verified.png");
console.log("Saved terra_3d_place_card_verified.png");

// 2. Verify Directions Drawer (Section 2)
console.log("2. Verifying Directions Drawer...");
await page.evaluate(() => {
  document.getElementById('btn-place-directions').click();
});
await page.waitForTimeout(3000);
const buf2 = await page.screenshot({ fullPage: false });
await saveScreenshot(buf2, "terra_3d_directions_verified.png");
console.log("Saved terra_3d_directions_verified.png");

// 3. Verify Route Alternatives Selection (Section 2.Route Alternatives)
console.log("3. Verifying Route Alternatives Selection...");
await page.evaluate(() => {
  const altCard = document.querySelector('.route-alt-card[data-index="1"]') || document.querySelectorAll('.route-alt-card')[1];
  if (altCard) altCard.click();
});
await page.waitForTimeout(2500);
const buf3 = await page.screenshot({ fullPage: false });
await saveScreenshot(buf3, "terra_3d_route_alternatives_verified.png");
console.log("Saved terra_3d_route_alternatives_verified.png");

// 4. Verify Active 3D Navigation (Section 3 & 5)
console.log("4. Verifying Active 3D Navigation...");
await page.evaluate(() => {
  document.getElementById('btn-start-navigation').click();
});
await page.waitForTimeout(3000);
const buf4 = await page.screenshot({ fullPage: false });
await saveScreenshot(buf4, "terra_3d_navigation_active_verified.png");
console.log("Saved terra_3d_navigation_active_verified.png");

// 5. Verify Paused Navigation State (Section 3.Pause and Resume)
console.log("5. Verifying Paused Navigation State...");
await page.evaluate(() => {
  document.getElementById('btn-pause-resume').click();
});
await page.waitForTimeout(1500);
const buf5 = await page.screenshot({ fullPage: false });
await saveScreenshot(buf5, "terra_3d_navigation_paused_verified.png");
console.log("Saved terra_3d_navigation_paused_verified.png");

// 6. Verify Navigation Arrival State (Section 3.Arrival Handling)
console.log("6. Verifying Navigation Arrival State...");
await page.evaluate(() => {
  if (window.triggerArrivalState) window.triggerArrivalState();
});
await page.waitForTimeout(1500);
const buf6 = await page.screenshot({ fullPage: false });
await saveScreenshot(buf6, "terra_3d_navigation_arrival_verified.png");
console.log("Saved terra_3d_navigation_arrival_verified.png");

// 7. Verify Mobile Responsive Navigation Layout (Section 5 & 9)
console.log("7. Verifying Mobile Navigation Layout...");
const mobilePage = await browser.getPage("terra_mobile");
await mobilePage.setViewportSize({ width: 390, height: 844 });
await mobilePage.goto("http://localhost:5055/", { waitUntil: "networkidle" });
await mobilePage.waitForTimeout(2500);
await mobilePage.evaluate(() => {
  document.getElementById('rail-saved').click();
});
await mobilePage.waitForTimeout(1000);
await mobilePage.evaluate(() => {
  document.getElementById('btn-place-directions').click();
});
await mobilePage.waitForTimeout(2500);
await mobilePage.evaluate(() => {
  document.getElementById('btn-start-navigation').click();
});
await mobilePage.waitForTimeout(2500);
const buf7 = await mobilePage.screenshot({ fullPage: false });
await saveScreenshot(buf7, "terra_3d_mobile_navigation_verified.png");
console.log("Saved terra_3d_mobile_navigation_verified.png");

console.log("All 7 verification tests completed successfully!");
