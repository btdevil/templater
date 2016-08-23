BC = window.BC || {};

BC.cleanTemplate = function (template) {
    var unmatchedData = new RegExp('{{(.*?)}}', 'g'),
            found = template.match(unmatchedData),
            cleanTemplate = '';
    if (found !== null) {
        if (typeof console !== 'undefined') {
            console.warn('The following data was not matched: ' + found);
        }
        cleanTemplate = template.replace(unmatchedData, '');
    } else {
        cleanTemplate = template;
    }
    return cleanTemplate;
};