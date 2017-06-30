var globalValue;
exports.setGlobal  = function(val) {
    globalValue = val;
};
exports.returnGlobal = function() {
    return  globalValue
};