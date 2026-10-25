const page = await browser.getPage("pholram_tester");

await page.goto("http://localhost:5055/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3000);

console.log("Navigating to Indian location: Pholram Park (Pitampura, Delhi) via City Selector");
await page.selectOption("#city-select", "delhi-pholram");

// Wait 6 seconds for MapLibre to stream vector tiles and 3D buildings for Delhi, India
console.log("Streaming Delhi 3D vector tiles...");
await page.waitForTimeout(6000);

// Check telemetry over Pholram Park, Delhi
const coords = await page.locator("#telemetry-coords").textContent();
const heading = await page.locator("#telemetry-heading").textContent();
const alt = await page.locator("#telemetry-altitude").textContent();
const scale = await page.locator("#telemetry-zoom").textContent();
const perf = await page.locator("#telemetry-fps").textContent();

console.log("Telemetry over Pholram Park, Delhi:", {
  coords,
  heading,
  alt,
  scale,
  perf
});

// Take detailed screenshot of Delhi / Pholram Park
const buf = await page.screenshot({ fullPage: false });
const path = await saveScreenshot(buf, "pholram_park_delhi_verified.png");
console.log("Pholram Park screenshot saved successfully to:", path);
