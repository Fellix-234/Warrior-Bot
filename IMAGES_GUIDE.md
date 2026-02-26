# 🎨 Image Assets Guide

This guide explains the image assets used by Warrior Bot and how to customize them.

## 📂 Required Images

The bot uses rotating images for various commands. Place all images in the `./assets/` folder.

### 🟢 Alive Command Images
- `alive.png` *(required - default image)*
- `alive2.png` *(optional)*
- `alive3.png` *(optional)*
- `alive4.png` *(optional)*
- `alive5.png` *(optional)*

**Used by:** `.alive` command  
**Recommended Size:** 512x512px or 1024x1024px  
**Format:** PNG, JPG, or WebP

---

### 📋 Menu Command Images
- `menu.png` *(required - default image)*
- `menu2.png` *(optional)*
- `menu3.png` *(optional)*
- `menu4.png` *(optional)*
- `menu5.png` *(optional)*

**Used by:** `.menu` command  
**Recommended Size:** 1080x1080px  
**Format:** PNG, JPG, or WebP

---

### 📚 Repo Command Images
- `repo.png` *(required - default image)*
- `repo2.png` *(optional)*
- `repo3.png` *(optional)*
- `repo4.png` *(optional)*
- `repo5.png` *(optional)*

**Used by:** `.repo` command  
**Recommended Size:** 512x512px or 1024x1024px  
**Format:** PNG, JPG, or WebP

---

### ℹ️ About Command Images
- `about.png` *(required - default image)*
- `about2.png` *(optional)*
- `about3.png` *(optional)*

**Used by:** `.about` command  
**Recommended Size:** 1080x1080px  
**Format:** PNG, JPG, or WebP

---

### 🎬 Video Note (Optional)
- `alive_note.mp4` *(optional)*

**Used by:** `.alive` command when `ENABLE_VIDEO_NOTE=true`  
**Recommended:** Short video (3-10 seconds), ideally square format  
**Format:** MP4

---

### 🌐 Dashboard/Web UI
- `dashboard.png` *(used in web interface)*

**Used by:** Web pairing UI at `http://localhost:3000`  
**Recommended Size:** Any reasonable size  
**Format:** PNG, JPG

---

## 🔧 How to Add More Images

1. **Create/Download Images:** Design or download images you want to use
2. **Name Sequentially:** Follow the naming pattern (`alive6.png`, `menu6.png`, etc.)
3. **Add to Assets Folder:** Place images in `./assets/` directory
4. **Update Plugin File:** Edit the plugin file to include new images in the array

### Example: Adding a 6th alive image

1. Save your image as `./assets/alive6.png`
2. Open `./plugins/alive.js`
3. Find the `aliveImages` array:
   ```javascript
   const aliveImages = [
       './assets/alive.png',
       './assets/alive2.png',
       './assets/alive3.png',
       './assets/alive4.png',
       './assets/alive5.png'
   ];
   ```
4. Add your new image:
   ```javascript
   const aliveImages = [
       './assets/alive.png',
       './assets/alive2.png',
       './assets/alive3.png',
       './assets/alive4.png',
       './assets/alive5.png',
       './assets/alive6.png'  // New image added!
   ];
   ```

---

## 🎨 Design Tips

### Best Practices
- **Consistent Style:** Keep images visually consistent across commands
- **High Quality:** Use high-resolution images (at least 512x512px)
- **Optimized Size:** Compress images to reduce file size (use TinyPNG, etc.)
- **Aspect Ratio:** Square images (1:1 ratio) work best
- **Brand Colors:** Use your bot's theme colors for consistency

### Recommended Tools
- **Canva:** Easy online design tool
- **Photopea:** Free Photoshop alternative
- **GIMP:** Free open-source image editor
- **TinyPNG:** Image compression
- **Remove.bg:** Background removal

### Theme Ideas
- Animated characters or mascots
- Abstract art/patterns
- Tech/cyberpunk aesthetics
- Nature/landscape themes
- Minimal/modern designs

---

## 📦 Current Assets Structure

```
assets/
├── alive.png          # Default alive image
├── dashboard.png      # Web UI image
├── menu.png           # Default menu image
├── alive_note.mp4     # (Optional) Video note
├── alive2.png         # (Optional) Additional images
├── alive3.png
├── menu2.png
├── menu3.png
└── ...
```

---

## 🚀 Quick Setup

If you're deploying for the first time:

1. At minimum, ensure you have these files in `./assets/`:
   - `alive.png`
   - `menu.png`
   - `dashboard.png`

2. Optional: Add additional numbered variants (`alive2.png`, `menu2.png`, etc.)

3. The bot will automatically:
   - Fall back to the default image if variants don't exist
   - Randomly select from available images each time a command is used

---

## 💡 Pro Tips

- **Use Fallbacks:** The first image in each array (e.g., `alive.png`) should always exist
- **Test Locally:** Use `.alive`, `.menu`, etc. to test image rotation before deploying
- **Optimize for WhatsApp:** WhatsApp compresses images, so test how they look in-app
- **Update Regularly:** Keep your image collection fresh with seasonal or themed updates

---

**Need help?** Contact the developers:
- Warrior Felix: [wa.me/2547391914](https://wa.me/2547391914)
- GitHub: [Fellix-234/Warrior-Bot](https://github.com/Fellix-234/Warrior-Bot)
