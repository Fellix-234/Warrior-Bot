<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=WARRIOR%20BOT&fontSize=80&animation=fadeIn&fontAlignY=35&method=color&gradientColor=FF0000,000000" width="100%"/>

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=F70000&center=true&vCenter=true&width=435&lines=THE+ULTIMATE+WHATSAPP+BOT;MODULAR+%26+POWERFUL;EASY+DEPLOYMENT;MADE+WITH+LOVE+BY+USER" alt="Typing SVG" />

<img src="./assets/alive.png" width="200" height="200" style="border-radius: 50%; box-shadow: 0 0 20px rgba(255,0,0,0.5);"/>

**The Ultimate Multi-Device WhatsApp Bot**

[![Stars](https://img.shields.io/github/stars/Fellix-234/Warrior-Bot?style=for-the-badge&color=gold)](https://github.com/Fellix-234/Warrior-Bot/stargazers)
[![Forks](https://img.shields.io/github/forks/Fellix-234/Warrior-Bot?style=for-the-badge&color=blue)](https://github.com/Fellix-234/Warrior-Bot/network/members)
[![Followers](https://img.shields.io/github/followers/Fellix-234?style=for-the-badge&color=green)](https://github.com/Fellix-234)
[![Version](https://img.shields.io/badge/Version-1.2.0-red?style=for-the-badge)](https://github.com/Fellix-234/Warrior-Bot)

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=30&section=body&gradientColor=FF0000,000000" width="100%"/>

### 🎮 QUICK LINKS

<p align="center">
  <a href="https://github.com/Fellix-234/Warrior-Bot/fork">
    <img src="https://img.shields.io/badge/FORK-REPO-blue?style=for-the-badge&logo=github" alt="Fork Repo" />
  </a>
  <a href="https://warrior-bot-2.onrender.com/">
    <img src="https://img.shields.io/badge/GET-SESSION-red?style=for-the-badge&logo=whatsapp" alt="Get Session" />
  </a>
  <a href="https://wa.me/2547391914">
    <img src="https://img.shields.io/badge/GET-SUPPORT-green?style=for-the-badge&logo=whatsapp" alt="Get Support" />
  </a>
</p>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=30&section=body&gradientColor=FF0000,000000" width="100%"/>

### 📖 ABOUT
**Warrior Bot** is a high-performance, modular WhatsApp assistant built on the latest `@whiskeysockets/baileys` library. Designed for efficiency and visual excellence, it brings a suite of powerful commands directly to your fingertips.

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=30&section=body&gradientColor=FF0000,000000" width="100%"/>

### 📊 GITHUB STATS

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=Fellix-234&show_icons=true&theme=radical&hide_border=true" alt="GitHub Stats" />
  <br>
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Fellix-234&layout=compact&theme=radical&hide_border=true" alt="Top Languages" />
</p>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=30&section=body&gradientColor=FF0000,000000" width="100%"/>

### 🚀 DEPLOYMENT

#### ☁️ 1-Click Deploy
| Platform | Button |
| :--- | :--- |
| **Render** | [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Fellix-234/Warrior-Bot) |
| **Railway** | [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/deploy?repo=https://github.com/Fellix-234/Warrior-Bot) |

#### 🖥️ VPS / Panel Deployment
```bash
git clone https://github.com/Fellix-234/Warrior-Bot.git
cd WARRIOR-BOT
npm install
node index.js
```

#### 🌐 Accessing the Web UI
After starting the bot, open your browser:
- **Local:** `http://localhost:3000`
- **VPS/Server:** `http://YOUR_SERVER_IP:3000`
- **Cloud (Render/Railway):** Use the provided deployment URL

The web UI allows you to:
- Generate pairing codes
- Scan QR codes
- Check connection status
- Reset session

#### 🔗 Auto-Pairing Mode (For Cloud Deployment)
If deploying to cloud platforms where you can't scan QR codes:
1. Set `PAIRING_NUMBER` in your `.env` file (e.g., `PAIRING_NUMBER=254712345678`)
2. Start the bot - it will display a pairing code in the logs
3. Open WhatsApp → Linked Devices → Link a Device → Link with Phone Number
4. Enter the code from the logs

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=30&section=body&gradientColor=FF0000,000000" width="100%"/>

### ✨ FEATURES

- 🔴 **Modular Plugin System**: Add/Remove features instantly.
- 🟠 **Auto-Automation**: Status viewing, reactions, and more.
- 🟡 **Media Downloader**: High-quality YouTube audio and video.
- 🟢 **Interactive Games**: TTT, RPS, and fun group challenges.
- 🔵 **Owner Protection**: Secure evaluation and broadcast tools.
- 🟣 **Privacy Controls**: Command-level access restrictions for owners and groups.
- 🔴 **Video Note Support**: Professional video notes for alive command (optional).

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=30&section=body&gradientColor=FF0000,000000" width="100%"/>

### 🔐 PRIVACY & ACCESS CONTROL

Warrior Bot includes built-in privacy controls:

- **Owner Commands** 🔑: Restricted to the bot owner only (eval, broadcast)
- **Group Commands** 👥: Only work in group chats (kick, promote, tagall, etc.)
- **Smart Menu**: Automatically hides restricted commands from unauthorized users

Set your owner number in `.env`:
```env
OWNER_NUMBER=254712345678
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=30&section=body&gradientColor=FF0000,000000" width="100%"/>

### 🎬 VIDEO NOTE FEATURE

Enable professional video notes for the `.alive` command:

1. Add a video file to `./assets/alive_note.mp4` (or use a URL)
2. Configure in `.env`:
```env
ENABLE_VIDEO_NOTE=true
VIDEO_NOTE_URL=./assets/alive_note.mp4
```

When enabled, `.alive` sends a circular video note (like Instagram stories) instead of a static image.

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=30&section=body&gradientColor=FF0000,000000" width="100%"/>

### 👥 DEVELOPERS

<div align="center">
  <table style="width:100%; border:none; border-collapse:collapse;">
    <tr>
      <td align="center" style="border:none;">
        <img src="https://github.com/WarriorFelix.png" width="120" style="border-radius: 50%; border: 4px solid #ff0000; box-shadow: 0 0 15px rgba(255,0,0,0.5);"/>
        <br>
        <b>Warrior Felix</b>
        <br>
        <a href="https://wa.me/2547391914">
          <img src="https://img.shields.io/badge/WhatsApp-CHAT-green?style=for-the-badge&logo=whatsapp" alt="Contact Felix" />
        </a>
      </td>
      <td align="center" style="border:none;">
        <img src="https://github.com/WonderingJew.png" width="120" style="border-radius: 50%; border: 4px solid #ff0000; box-shadow: 0 0 15px rgba(255,0,0,0.5);"/>
        <br>
        <b>Wondering Jew</b>
        <br>
        <a href="https://wa.me/254701881604">
          <img src="https://img.shields.io/badge/WhatsApp-CHAT-green?style=for-the-badge&logo=whatsapp" alt="Contact Wondering Jew" />
        </a>
      </td>
    </tr>
  </table>
</div>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer&gradientColor=FF0000,000000" width="100%"/>

</div>
