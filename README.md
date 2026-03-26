# 🚀 RhalzaTweaks

A lightweight bundle of JavaScript features. Designed to be dropped into any website via CDN with zero dependencies.

Use the **Full Bundle** to supercharge your website, or import **Standalone Modules** to keep things ultra-lightweight. Mobile-friendly and completely customizable.

## 📦 Installation (via jsDelivr CDN)

**Option 1: The Full Bundle** (Recommended)
```html
<script src="https://cdn.jsdelivr.net/gh/Rhalza/RhalzaTweaks@main/src/rhalzatweaks.bundle.min.js"></script>
```

**Option 2: Standalone Modules** (A La Carte)
```html
<script src="https://cdn.jsdelivr.net/gh/Rhalza/RhalzaTweaks@main/src/cyberpunkText.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Rhalza/RhalzaTweaks@main/src/formatCurrency.min.js"></script>
```

## 🛠️ Quick Start

If you are using the **Bundle**, initialize the library in your script tag. You can toggle features on or off to save resources!

```html
<script>
  RhalzaTweaks.init({
    cyberpunkText: true,   // Default: true
    magneticBtn: true,     // Default: true
    konamiConfetti: false  // Turned off
  });
</script>
```

---

## ✨ Features & API

### 1. Cyberpunk Text (UI)
Scrambles text in a Matrix-style hacker effect when scrolled into view.
* **Usage:** Add `data-rt-cyber` to any text element (e.g., `h1`, `p`).

### 2. Magnetic Buttons (UI)
Buttons physically gravitate towards the user's cursor. (Automatically disabled on touch screens to prevent bugs).
* **Usage:** Add `data-rt-magnetic` to any `<button>`.

### 3. ScrollFrame Video Scrubber (UI)
Ties video playback directly to the user's scrollbar, creating an Apple-style 3D scrub effect.
* **Usage:** Add `data-rt-scrub` to a `<video>` tag.

### 4. Konami Confetti (Easter Egg)
Triggers a canvas-based confetti explosion.
* **Desktop:** Type `Up Up Down Down Left Right Left Right B A`
* **Mobile:** Tap the screen rapidly 5 times.

### 5. Auto TOC (Utility)
Automatically generates a clickable Table of Contents based on `<h2>` and `<h3>` tags on your page.
* **Usage:** Place an empty `<div data-rt-toc></div>` where you want the list to appear.

### 6. Copy Code Block (Utility)
Automatically injects a sleek "Copy" button into every `<pre><code>` block on your website. No setup required!

### 7. Telepathy (Cross-Tab Syncing)
Sync data across multiple open browser tabs instantly without a server/backend using the BroadcastChannel API.
```javascript
// Tab A:
RhalzaTweaks.telepathy.send('cart-update', { items: 3 });

// Tab B:
RhalzaTweaks.telepathy.on('cart-update', (data) => console.log(data.items));
```

### 8. Format Currency (Utility)
Easily format raw numbers into localized currency.
```javascript
let price = RhalzaTweaks.formatCurrency(1499.99, 'USD'); // "$1,499.99"
```

### 9. Form2JSON (Utility)
Extract all data from an HTML `<form>` directly into a beautifully formatted JSON object.
```javascript
const myForm = document.getElementById('my-form');
const data = RhalzaTweaks.form2json(myForm);
console.log(data); // { username: "Rhalza", hobbies: ["coding", "gaming"] }
```

---

## 🤝 Collision-Free Guarantee
RhalzaTweaks uses careful object-merging (`window.RhalzaTweaks`) and namespaced data-attributes (`data-rt-*`). It will **never** conflict with jQuery, React, Bootstrap, Tailwind, or your own custom code.

## 📄 License
This project is licensed under the [MIT License](LICENSE).