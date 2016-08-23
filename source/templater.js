BC = window.BC || {};

//usage
/*
use {{dataname}}, also accepts dot notation so {{dataname.nextleveldown}}. There is no limitation to the depth of the object.

Use partials if you need to loop through an array of objects.

For partials in template, put the following where the partial is be rendered {{<changesTooltip\.changes}} (dot notation must be ascaped). The partial must refer to an array of either objects or other arrays in your data. Partials are passed to the templater function in the fourth parameter as an array of objects:

[{template: 'your html string', partialName: "changesTooltip\\.changes"}, {template: 'your html string', partialName: "changesTooltip\\.changes"}]

Note that the dot notation must be double escaped.

If you are using a partial to loop through an array of arrays, the partial template can use {{i}} to write in the content of that array index.

{{#applyAlt}} can be used in partials, will write in the word 'alt' on alternating rows, used for alternating row colours

There are some additional helpers for performing some basic formatting, useful for converting data to css class names:

{{dataname#tolower}} - will convert string to lower case
{{dataname#tolowerstrip}} - will convert string to lower case and remove spaces
{{dataname#tolowerunder}} - will convert string to lower case, remove spaces and punctuation
*/
BC.templater = function (template, data, parent, partials) {
    var html = template, partialCache = [];
    var a = (parent) ? parent + '.' : '';
    var b = (parent) ? parent + '\\.' : '';
    var hasPartial = false;
    var partialItem = '';
    var x = 0;
    var xLen = 0;
    var partialReplace = '';
    var property = '';
    //var strippedString = '';
    function writePartial(objectName, thePartial, objectPartial) {
        partialCache = [];
        var prop = new RegExp('{{i}}', 'g');
        var altProp = new RegExp('{{#applyAlt}}', 'g');
        var parthtml = '';
        var altClass = '';
       
        for (x = 0, xLen = objectPartial.length; x < xLen; x++) {
            if (typeof objectPartial[x] === 'string') {
                parthtml = thePartial.template;
                if (parthtml.match(prop)) {
                    parthtml = parthtml.replace(prop, objectPartial[x]);
                    if (parthtml.match(altProp)) {
                        altClass = x % 2 === 0 ? '' : 'alt';
                        parthtml = parthtml.replace(altProp, altClass);
                    }
                    partialCache.push(parthtml);
                }
            } else {
                parthtml = thePartial.template;
                if (parthtml.match(altProp)) {
                    altClass = x % 2 === 0 ? 'alt' : '';
                    parthtml = parthtml.replace(altProp, altClass);
                }
                partialCache.push(BC.templater(parthtml, objectPartial[x]));
            }
            if (x !== xLen-1 && typeof thePartial.delimeter !== 'undefined') {
                partialCache.push(thePartial.delimeter);
            }
        }
        partialReplace = new RegExp('{{<' + objectName + '}}', 'g');
        html = html.replace(partialReplace, partialCache.join(''));
        partialCache = null;
        partialReplace = null;
    }

    for (var name in data) {
        if (typeof name === 'string') {
            property = new RegExp('{{' + b + name + '}}', 'g');
            //strippedString = '';
            if (typeof data[name] === 'object') {
                if (Object.prototype.toString.call(data[name]) === '[object Array]') {
                    //console.log(name + 'I found an array: ' + data[name]);
                    hasPartial = false;
                    partialItem = '';
                    if (typeof partials !== 'undefined') {
                        for (x = 0, xLen = partials.length; x < xLen; x++) {
                            if (partials[x].partialName === b + name) {
                                hasPartial = true;
                                partialItem = partials[x];
                                break;
                            }
                        }
                        if (hasPartial) {
                            writePartial(b + name, partialItem, data[name]);
                        }
                    }
                }
                else {
                    html = BC.templater(html, data[name], a + name, partials);
                }
            } else {
                if (html.match(property)) {
                    html = html.replace(property, data[name]);
                }
                //does it have a tolower modifier
                //var modifierProp = new RegExp('{{' + b + name + '#tolower}}', 'g');
                //if (html.match(modifierProp)) {
                //    html = html.replace(modifierProp, data[name].toLowerCase());
                //}
                //modifierProp = new RegExp('{{' + b + name + '#tolowerstrip}}', 'g');
                //if (html.match(modifierProp)) {
                //    strippedString = data[name].toLowerCase().replace(/[^\w]/g, '');
                //    html = html.replace(modifierProp, strippedString);
                //}
                //modifierProp = new RegExp('{{' + b + name + '#tolowerstripunder}}', 'g');
                //if (html.match(modifierProp)) {
                //    strippedString = data[name].toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
                //    html = html.replace(modifierProp, strippedString);
                //}
                //modifierProp = new RegExp('{{' + b + name + '#cleanstrict}}', 'g');
                //if (html.match(modifierProp)) {
                //    strippedString = NRE.utilities.cleanStringStrict(data[name]);
                //    html = html.replace(modifierProp, strippedString);
                //}
                //modifierProp = new RegExp('{{' + b + name + '#cleanfloat}}', 'g');
                //if (html.match(modifierProp)) {
                //    strippedString = NRE.utilities.cleanFloat(data[name]);
                //    html = html.replace(modifierProp, strippedString);
                //}
                //modifierProp = new RegExp('{{' + b + name + '#cleannumber}}', 'g');
                //if (html.match(modifierProp)) {
                //    strippedString = NRE.utilities.cleanNumber(data[name]);
                //    html = html.replace(modifierProp, strippedString);
                //}
                //modifierProp = null;
            }
            property = null;
        }
    }
    return html;

};
