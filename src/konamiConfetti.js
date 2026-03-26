(function(global) {
    global.RhalzaTweaks = global.RhalzaTweaks || {};
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
})(window);