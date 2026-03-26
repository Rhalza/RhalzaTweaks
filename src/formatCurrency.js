(function(global) {
    global.RhalzaTweaks = global.RhalzaTweaks || {};
    
    global.RhalzaTweaks.formatCurrency = function(amount, currency = 'USD', locale = 'en-US') {
        return new Intl.NumberFormat(locale, { 
            style: 'currency', 
            currency: currency 
        }).format(amount);
    };
})(window);