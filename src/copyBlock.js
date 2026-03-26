(function(global) {
    global.RhalzaTweaks = global.RhalzaTweaks || {};
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
                    position: 'absolute', top: '5px', right: '5px',
                    padding: '4px 8px', cursor: 'pointer', fontSize: '12px', zIndex: 10
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
})(window);