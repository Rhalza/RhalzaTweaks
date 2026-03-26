(function(global) {
    global.RhalzaTweaks = global.RhalzaTweaks || {};

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
})(window);