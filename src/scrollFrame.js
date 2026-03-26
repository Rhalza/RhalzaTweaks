(function(global) {
    global.RhalzaTweaks = global.RhalzaTweaks || {};
    global.RhalzaTweaks.scrollFrame = {
        init: function(selector = 'video[data-rt-scrub]') {
            document.querySelectorAll(selector).forEach(video => {
                video.pause();
                const update = () => {
                    const rect = video.getBoundingClientRect();
                    const scrollPercent = Math.max(0, Math.min(1, -rect.top / (rect.height || 1)));
                    if (video.duration) video.currentTime = video.duration * scrollPercent;
                    requestAnimationFrame(update);
                };
                window.addEventListener('scroll', update);
            });
        }
    };
})(window);