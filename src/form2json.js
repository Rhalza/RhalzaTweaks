(function(global) {
    global.RhalzaTweaks = global.RhalzaTweaks || {};
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
})(window);