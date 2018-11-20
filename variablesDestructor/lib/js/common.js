/**
 * HTML element creator
 * @param {*} tag   : Balise html
 * @param {*} cls   : classe css
 * @param {*} style : style in-line css
 * @param {*} html  : texte
 */
function createElement(tag, cls, style, html) {
    var el = document.createElement(tag);
    if (cls) {
        el.className = cls;
    }
    if (style) {
        el.style.cssText = style;
    }
    if (html !== undefined) {
        el.innerHTML = html;
    }
    return el;
}
