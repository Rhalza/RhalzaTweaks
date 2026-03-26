(function(global) {
    global.RhalzaTweaks = global.RhalzaTweaks || {};

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
})(window);