# Farehi Chat — Dark redesign
Features: responsive dark/neon-green UI, local display name/profile status, live WebSocket room chat, three demo group views, text stories/status, small image sharing (350 KB limit), voice/video call UI preview.

## Run locally
Install Node.js LTS. In this folder run `npm install` then `npm start`. Open http://localhost:3000.

## Render deployment
Connect this GitHub repo in Render as a Web Service. Language: Node. Build Command: `npm install`; Start Command: `npm start`; Root Directory: blank if package.json is at repository root. Deploy and open the Render URL when status is Live. To update: `git add .`, `git commit -m "Redesign Farehi"`, `git push`; Render redeploys automatically.

## Important limitations
Learning/demo project only. No authentication, private chats, persistent database, or secure server-side group membership. All connected clients can receive broadcasts; group selection is only a UI filter. Image data is sent through WebSocket. Call buttons are previews, not real voice/video calls. Do not share sensitive information. Before public use add authentication, true room isolation, database, secure uploads, rate limiting and WebRTC/STUN/TURN for calls.
