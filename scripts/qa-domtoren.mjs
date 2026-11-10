// Run manually: node scripts/qa-domtoren.mjs. Does not require GitHub Actions.
import {readFileSync,statSync} from "node:fs";
const load=p=>JSON.parse(readFileSync(new URL("../"+p,import.meta.url),"utf8"));
const p=load("models/domtoren-utrecht/project.json"),c=load("models/library.json"),B=p.doc.bodies;
const cnt=s=>B.filter(x=>x.name.includes(s)).length;
function ok(v,msg){if(!v)throw Error("Domtoren: "+msg);}
ok(p.app==="jumpstart-3d"&&p.version===1,"schema");
ok(B.length>=715&&new Set(B.map(x=>x.id)).size===B.length,"body ids");
ok(B.every(x=>x.m.length===16&&x.m.every(Number.isFinite)),"matrices");
ok(cnt("Open lantern stone pier")===8&&cnt("main pointed arch")===96&&cnt("open tracery rosette")===8,"open lantern");
ok(cnt("hour mark")===48&&cnt("vertical baluster")===72,"detail features");
const base=B.find(x=>x.name==="Lower square with pointed full-depth passage");
ok(base?.node?.t==="group"&&base.node.children.filter(x=>x.hole).length===18,"physical apertures");
const f=B.find(x=>x.name==="Finial stem and vane height to 112.32m");
ok(Math.abs(f.m[14]+f.node.p.h-224.64)<1e-6,"1:500 total height");
const item=c.models.find(x=>x.id==="domtoren-utrecht");
ok(item?.project==="models/domtoren-utrecht/project.json"&&item?.preview==="models/domtoren-utrecht/preview.png"&&item?.illustration==="models/domtoren-utrecht/schematic.svg","catalog");
ok(statSync(new URL("../"+item.preview,import.meta.url)).size>50000,"genuine preview file");
ok(statSync(new URL("../"+item.project,import.meta.url)).size<8*1024*1024,"loader size");
console.log("PASS",B.length,"editable native CAD bodies");
