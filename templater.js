BC = window.BC || {}, BC.cleanTemplate = function(template) {
    var unmatchedData = new RegExp("{{(.*?)}}", "g"), found = template.match(unmatchedData), cleanTemplate = "";
    return null !== found ? ("undefined" != typeof console && console.warn("The following data was not matched: " + found), 
    cleanTemplate = template.replace(unmatchedData, "")) : cleanTemplate = template, 
    cleanTemplate;
}, BC = window.BC || {}, BC.templater = function(template, data, parent, partials) {
    function writePartial(objectName, thePartial, objectPartial) {
        partialCache = [];
        var prop = new RegExp("{{i}}", "g"), altProp = new RegExp("{{#applyAlt}}", "g"), parthtml = "", altClass = "";
        for (x = 0, xLen = objectPartial.length; x < xLen; x++) "string" == typeof objectPartial[x] ? (parthtml = thePartial.template, 
        parthtml.match(prop) && (parthtml = parthtml.replace(prop, objectPartial[x]), parthtml.match(altProp) && (altClass = x % 2 === 0 ? "" : "alt", 
        parthtml = parthtml.replace(altProp, altClass)), partialCache.push(parthtml))) : (parthtml = thePartial.template, 
        parthtml.match(altProp) && (altClass = x % 2 === 0 ? "alt" : "", parthtml = parthtml.replace(altProp, altClass)), 
        partialCache.push(BC.templater(parthtml, objectPartial[x]))), x !== xLen - 1 && "undefined" != typeof thePartial.delimeter && partialCache.push(thePartial.delimeter);
        partialReplace = new RegExp("{{<" + objectName + "}}", "g"), html = html.replace(partialReplace, partialCache.join("")), 
        partialCache = null, partialReplace = null;
    }
    var html = template, partialCache = [], a = parent ? parent + "." : "", b = parent ? parent + "\\." : "", hasPartial = !1, partialItem = "", x = 0, xLen = 0, partialReplace = "", property = "";
    for (var name in data) if ("string" == typeof name) {
        if (property = new RegExp("{{" + b + name + "}}", "g"), "object" == typeof data[name]) if ("[object Array]" === Object.prototype.toString.call(data[name])) {
            if (hasPartial = !1, partialItem = "", "undefined" != typeof partials) {
                for (x = 0, xLen = partials.length; x < xLen; x++) if (partials[x].partialName === b + name) {
                    hasPartial = !0, partialItem = partials[x];
                    break;
                }
                hasPartial && writePartial(b + name, partialItem, data[name]);
            }
        } else html = BC.templater(html, data[name], a + name, partials); else html.match(property) && (html = html.replace(property, data[name]));
        property = null;
    }
    return html;
};
//# sourceMappingURL=templater.js.map