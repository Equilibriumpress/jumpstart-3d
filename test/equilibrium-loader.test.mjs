import test from "node:test";
import assert from "node:assert/strict";
import { validModelId, modelProjectPath, openPublishedModel } from "../src/equilibrium-loader.js";

test("Published model IDs reject path traversal and malformed slugs", () => {
  for (const bad of ["..", "../secrets", "%2f", "foo/bar", "UPPER", "", "a ".repeat(50), "a--b"])
    assert.equal(validModelId(bad), false, bad);
  assert.equal(modelProjectPath("starter-box"), "models/starter-box/project.json");
});
test("Catalog allowlist loads only native, same-origin JSON", async () => {
  let loaded;
  const fetched = [];
  const native = {app:"jumpstart-3d",version:1,doc:{bodies:[{id:"b1"}]}};
  const fetchFile = async url => {
    fetched.push(String(url));
    if (String(url).endsWith("library.json")) return {ok:true,json:async()=>({models:[{id:"starter-box",project:"models/starter-box/project.json",title:"Starter box"}]})};
    return {ok:true,headers:{get:()=>null},text:async()=>JSON.stringify(native)};
  };
  const entry = await openPublishedModel({load:async d=>{loaded=d;},fit:()=>{}}, "starter-box", {base:"https://equilibriumpress.github.io/jumpstart-3d/",fetchFile});
  assert.equal(entry.id, "starter-box");
  assert.deepEqual(loaded,native);
  assert.deepEqual(fetched,["https://equilibriumpress.github.io/jumpstart-3d/models/library.json","https://equilibriumpress.github.io/jumpstart-3d/models/starter-box/project.json"]);
  await assert.rejects(()=>openPublishedModel({load:()=>{}}, "private", {base:"https://equilibriumpress.github.io/jumpstart-3d/",fetchFile}),/Unknown/);
});
