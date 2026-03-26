(function(global) {
    global.RhalzaTweaks = global.RhalzaTweaks || {};
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
})(window);