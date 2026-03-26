(function(global) {
    global.RhalzaTweaks = global.RhalzaTweaks || {};

    global.RhalzaTweaks.formatCurrency = function(amount, currency = 'USD', locale = 'en-US') {
        return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(amount);
    };

    global.RhalzaTweaks.cyberpunkText = {
        init: function(selector = '[data-rt-cyber]') {
            const elements = document.querySelectorAll(selector);
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animate(entry.target, chars);
                        observer.unobserve(entry.target);
                    }
                });
            });
            elements.forEach(el => observer.observe(el));
        },
        animate: function(el, chars) {
            const originalText = el.dataset.rtText || el.innerText;
            el.dataset.rtText = originalText;
            let iterations = 0;
            const interval = setInterval(() => {
                el.innerText = originalText.split('').map((letter, index) => {
                    if (index < iterations) return originalText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('');
                if (iterations >= originalText.length) clearInterval(interval);
                iterations += 1 / 3;
            }, 30);
        }
    };

    global.RhalzaTweaks.telepathy = {
        channel: null,
        init: function(channelName = 'rt-telepathy') {
            this.channel = new BroadcastChannel(channelName);
        },
        send: function(event, data) {
            if (!this.channel) this.init();
            this.channel.postMessage({ event, data });
        },
        on: function(event, callback) {
            if (!this.channel) this.init();
            this.channel.addEventListener('message', (e) => {
                if (e.data.event === event) callback(e.data.data);
            });
        }
    };

    global.RhalzaTweaks.magneticBtn = {
        init: function(selector = '[data-rt-magnetic]') {
            if (!window.matchMedia("(pointer: fine)").matches) return;
            document.querySelectorAll(selector).forEach(btn => {
                btn.addEventListener('mousemove', (e) => {
                    const rect = btn.getBoundingClientRect();
                    const x = (e.clientX - rect.left) - rect.width / 2;
                    const y = (e.clientY - rect.top) - rect.height / 2;
                    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
                });
                btn.addEventListener('mouseleave', () => {
                    btn.style.transform = 'translate(0px, 0px)';
                    btn.style.transition = 'transform 0.3s ease';
                });
                btn.addEventListener('mouseenter', () => btn.style.transition = 'none');
            });
        }
    };

    global.RhalzaTweaks.copyBlock = {
        init: function(selector = 'pre code') {
            document.querySelectorAll(selector).forEach(block => {
                const wrapper = document.createElement('div');
                wrapper.style.position = 'relative';
                block.parentNode.insertBefore(wrapper, block);
                wrapper.appendChild(block);
                const btn = document.createElement('button');
                btn.innerText = 'Copy';
                Object.assign(btn.style, {
                    position: 'absolute', top: '5px', right: '5px', padding: '4px 8px', 
                    cursor: 'pointer', fontSize: '12px', zIndex: 10
                });
                btn.onclick = () => {
                    navigator.clipboard.writeText(block.innerText);
                    btn.innerText = 'Copied!';
                    setTimeout(() => btn.innerText = 'Copy', 2000);
                };
                wrapper.appendChild(btn);
            });
        }
    };

    global.RhalzaTweaks.autoTOC = {
        init: function(targetSelector = '[data-rt-toc]', contentSelector = 'body') {
            const target = document.querySelector(targetSelector);
            if (!target) return;
            const headers = document.querySelector(contentSelector).querySelectorAll('h2, h3');
            const ul = document.createElement('ul');
            headers.forEach((h, i) => {
                if (!h.id) h.id = 'rt-toc-' + i;
                const li = document.createElement('li');
                li.style.marginLeft = h.tagName === 'H3' ? '15px' : '0px';
                const a = document.createElement('a');
                a.href = '#' + h.id;
                a.innerText = h.innerText;
                li.appendChild(a);
                ul.appendChild(li);
            });
            target.appendChild(ul);
        }
    };

    global.RhalzaTweaks.scrollFrame = {
        init: function(selector = 'video[data-rt-scrub]') {
            document.querySelectorAll(selector).forEach(video => {
                video.pause();
                window.addEventListener('scroll', () => {
                    const rect = video.getBoundingClientRect();
                    const scrollPercent = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
                    if (video.duration) video.currentTime = video.duration * scrollPercent;
                });
            });
        }
    };

    global.RhalzaTweaks.form2json = function(formElement) {
        const formData = new FormData(formElement);
        const obj = {};
        for (let [key, value] of formData.entries()) {
            if (obj[key]) {
                if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
                obj[key].push(value);
            } else obj[key] = value;
        }
        return obj;
    };

    global.RhalzaTweaks.konamiConfetti = {
        init: function() {
            let keys = [], taps = 0, lastTap = 0;
            const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
            window.addEventListener('keydown', (e) => {
                keys.push(e.key);
                keys.splice(-code.length - 1, keys.length - code.length);
                if (keys.join('').toLowerCase() === code.join('').toLowerCase()) this.fire();
            });
            window.addEventListener('touchstart', () => {
                const now = Date.now();
                if (now - lastTap < 400) taps++; else taps = 1;
                lastTap = now;
                if (taps === 5) { this.fire(); taps = 0; }
            });
        },
        fire: function() {
            const canvas = document.createElement('canvas');
            Object.assign(canvas.style, { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 });
            document.body.appendChild(canvas);
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth; canvas.height = window.innerHeight;
            const particles = Array.from({length: 100}, () => ({
                x: window.innerWidth / 2, y: window.innerHeight / 2,
                vx: (Math.random() - 0.5) * 20, vy: (Math.random() - 1) * 20,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`, size: Math.random() * 10 + 5
            }));
            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                let active = false;
                particles.forEach(p => {
                    p.x += p.vx; p.y += p.vy; p.vy += 0.5;
                    ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, p.size, p.size);
                    if (p.y < canvas.height) active = true;
                });
                if (active) requestAnimationFrame(animate); else canvas.remove();
            };
            animate();
        }
    };

    global.RhalzaTweaks.init = function(config = {}) {
        const defaults = {
            magneticBtn: true, copyBlock: true, autoTOC: true, 
            scrollFrame: true, konamiConfetti: true, cyberpunkText: true
        };
        const settings = { ...defaults, ...config };

        if (settings.magneticBtn && global.RhalzaTweaks.magneticBtn) global.RhalzaTweaks.magneticBtn.init();
        if (settings.copyBlock && global.RhalzaTweaks.copyBlock) global.RhalzaTweaks.copyBlock.init();
        if (settings.autoTOC && global.RhalzaTweaks.autoTOC) global.RhalzaTweaks.autoTOC.init();
        if (settings.scrollFrame && global.RhalzaTweaks.scrollFrame) global.RhalzaTweaks.scrollFrame.init();
        if (settings.konamiConfetti && global.RhalzaTweaks.konamiConfetti) global.RhalzaTweaks.konamiConfetti.init();
        if (settings.cyberpunkText && global.RhalzaTweaks.cyberpunkText) global.RhalzaTweaks.cyberpunkText.init();
    };

})(window);