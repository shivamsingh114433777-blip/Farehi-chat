const express=require("express"),http=require("http"),WebSocket=require("ws"),path=require("path");
const app=express(),server=http.createServer(app),wss=new WebSocket.Server({server}),PORT=process.env.PORT||3000;
app.use(express.static(path.join(__dirname,"public")));
app.get("/health",(_,res)=>res.json({ok:true,app:"Farehi"}));
const clean=(v,n=1200)=>String(v||"").trim().slice(0,n);
function broadcast(o){const s=JSON.stringify(o);for(const c of wss.clients)if(c.readyState===WebSocket.OPEN)c.send(s)}
wss.on("connection",ws=>{ws.send(JSON.stringify({type:"hello"}));ws.on("message",raw=>{let m;try{m=JSON.parse(raw)}catch{return}
if(!m||!["chat","story","profile","call-ui"].includes(m.type))return;
const user=clean(m.user,32)||"Guest";
if(m.type==="chat"){const text=clean(m.text);if(!text)return;broadcast({type:"chat",id:Date.now().toString(36)+Math.random().toString(36).slice(2,7),user,text,group:clean(m.group,32)||"general",time:new Date().toISOString()})}
if(m.type==="story"){const text=clean(m.text,240);if(text)broadcast({type:"story",user,text,time:new Date().toISOString()})}
if(m.type==="profile")broadcast({type:"profile",user,status:clean(m.status,80)});
if(m.type==="call-ui")broadcast({type:"call-ui",user,mode:m.mode==="video"?"video":"voice"});
})});
server.listen(PORT,"0.0.0.0",()=>console.log("Farehi running on port "+PORT));
