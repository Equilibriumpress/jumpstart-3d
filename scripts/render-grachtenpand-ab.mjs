// A/B photo renderer: use JumpStart's ORIGINAL Advanced > Simulate > Render UI.
// No custom renderer, no synthetic imagery. Both sessions share camera, light and resolution settings.
import { Session } from "../mcp/session.mjs";
import { readFileSync, writeFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright";

const base = "models/";
const models = [
  ["A", "test-grachtenpand", "Origineel · vlakke gevel"],
  ["B", "test-grachtenpand-realistisch", "Verbeterd · verdiepte gevel"],
];

async function renderVariant(letter, id) {
  const session = new Session({ mode: "headless", app: resolve("docs"), viewport: "1400x900", log: m => console.error("Render " + letter + ": " + m) });
  try {
    const saved = readFileSync(base + id + "/project.json", "utf8");
    await session.call("load", [saved], { timeoutMs: 600000 });
    await session.call("setMode", ["advanced"]);
    await session.call("fit", []);
    const page = session.hl.page;
    await page.locator("#ws-simulate").click({ timeout: 30000 });
    await page.locator("#sim-render").click({ timeout: 30000 });
    await page.locator("#rd-quality button", { hasText: "Low" }).click({ timeout: 30000 });
    await page.locator("#rd-shape button", { hasText: "4:3" }).click({ timeout: 30000 });
    await page.locator("#rd-light").selectOption("sun");
    await page.locator("#rd-color button", { hasText: "Daylight" }).click({ timeout: 30000 });
    await page.locator("#cmd-ok").click();
    await page.locator("#rd-save").waitFor({ state: "visible", timeout: 330000 });
    const downloadPromise = page.waitForEvent("download", { timeout: 40000 });
    await page.locator("#rd-save").click();
    const downloaded = await downloadPromise;
    const target = base + "grachtenpand-ab-render-" + letter + ".png";
    await downloaded.saveAs(target);
    if (statSync(target).size < 30000) throw Error("Photoreal renderer produced empty image: " + target);
    console.log("Advanced photo render " + letter + ": " + target + " (" + statSync(target).size + " bytes)");
    return target;
  } finally {
    await session.close();
  }
}

const photos=[];
for(const [letter,id] of models) photos.push(await renderVariant(letter,id));

// One composite proof: same settings, separate native CAD models, and actual rendered PNGs.
const browser=await chromium.launch({args:["--use-gl=swiftshader","--enable-unsafe-swiftshader"]});
try {
 const context=await browser.newContext({ viewport:{width:2600,height:1100}, deviceScaleFactor:1 });
 const page=await context.newPage();
 const img=photos.map(p=>"data:image/png;base64,"+readFileSync(p).toString("base64"));
 const safe=s=>s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll('"',"&quot;");
 await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>
 *{box-sizing:border-box}body{margin:0;background:#f5f5f2;color:#222;font:18px/1.4 system-ui,Arial}
 .hero{padding:20px 28px 12px;font-size:28px;font-weight:700}.sub{font-size:15px;color:#555;font-weight:400}
 .pair{display:grid;grid-template-columns:1fr 1fr;gap:22px;padding:8px 22px 22px}
 .item{background:white;border:1px solid #ddd;border-radius:9px;overflow:hidden}
 h2{font-size:20px;font-weight:650;padding:16px 18px;margin:0}
 img{width:100%;height:auto;display:block;background:#e5e9ec}
 </style></head><body><div class="hero">Amsterdams grachtenpand · A/B-renderproef
 <div class="sub">JumpStart 3D · originele Render-engine · identieke licht- en camera-instellingen</div>
 </div><div class="pair">${models.map(([letter,,name],i)=>`<section class="item"><h2>Versie ${letter} · ${safe(name)}</h2><img src="${img[i]}"></section>`).join("")}</div></body></html>`);
 await page.locator(".pair img").first().waitFor({state:"visible"});
 const out=base+"grachtenpand-ab-vergelijking.png";
 await page.locator("body").screenshot({path:out});
 console.log("Combined A/B render: "+out+" ("+statSync(out).size+" bytes)");
 await context.close();
} finally {await browser.close();}
