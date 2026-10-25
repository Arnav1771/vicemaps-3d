const page = await browser.getPage("vicemaps");

// Navigate to ViceMaps 3D local dev server
await page.goto("http://localhost:5055/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4000);

const title = await page.title();
const url = page.url();

// Check critical UI containers
const hasMap = (await page.locator("#map").count()) > 0;
const hasTopHud = (await page.locator(".top-hud").count()) > 0;
const hasFilters = (await page.locator("#category-filters").count()) > 0;
const hasDock = (await page.locator(".controls-dock").count()) > 0;
const hasTelemetry = (await page.locator(".bottom-telemetry-bar").count()) > 0;
const markerCount = await page.locator(".gta-marker").count();

console.log(JSON.stringify({
  stage: "init",
  title,
  url,
  hasMap,
  hasTopHud,
  hasFilters,
  hasDock,
  hasTelemetry,
  markerCount
}, null, 2));

// 1. Initial Map Screenshot
const buf1 = await page.screenshot({ fullPage: false });
const path1 = await saveScreenshot(buf1, "vicemaps_3d_home.png");
console.log("Screenshot 1 saved:", path1);

// 2. Test Search & GPS Route Calculation
await page.fill("#search-input", "Ocean");
await page.waitForTimeout(600);
const suggestionCount = await page.locator(".search-item").count();
console.log("Suggestions found:", suggestionCount);

if (suggestionCount > 0) {
  await page.locator(".search-item:not(.empty)").first().click();
  await page.waitForTimeout(2500);
  
  const routeHudVisible = await page.locator("#route-hud").isVisible();
  const routeDist = await page.locator("#route-distance").textContent();
  const routeDuration = await page.locator("#route-duration").textContent();
  
  console.log(JSON.stringify({
    stage: "routing",
    routeHudVisible,
    routeDist,
    routeDuration
  }, null, 2));

  const buf2 = await page.screenshot({ fullPage: false });
  const path2 = await saveScreenshot(buf2, "vicemaps_3d_route.png");
  console.log("Screenshot 2 (Route HUD) saved:", path2);
}

// 3. Test Cinematic Tour Mode
await page.click("#btn-cinematic");
await page.waitForTimeout(1500);
const buf3 = await page.screenshot({ fullPage: false });
const path3 = await saveScreenshot(buf3, "vicemaps_3d_cinematic.png");
console.log("Screenshot 3 (Cinematic Tour) saved:", path3);

// Exit cinematic
await page.click("#btn-cinematic");
await page.waitForTimeout(500);

// 4. Test Street Roam Mode
await page.click("#btn-street-roam");
await page.waitForTimeout(1000);
const streetHudVisible = await page.locator("#street-hud").isVisible();
console.log("Street Roam HUD visible:", streetHudVisible);

const buf4 = await page.screenshot({ fullPage: false });
const path4 = await saveScreenshot(buf4, "vicemaps_3d_roam.png");
console.log("Screenshot 4 (Street Roam) saved:", path4);

// Exit street roam
await page.click("#btn-street-roam");

console.log("ALL_CANARY_TESTS_COMPLETED_SUCCESSFULLY");
