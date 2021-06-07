function case_to_txt(x, y) {
    return "" + x + "_" + y;
}

function txt_to_case(txt) {
    var l = txt.split("_");
    var x = parseInt(l[0]);
    var y = parseInt(l[1]);
    return [x, y];
}

function clear_table() {
    //
    var w = parseInt(document.getElementById("i_width").value);
    var h = parseInt(document.getElementById("i_height").value);
    //
    for (y = 0; y < h; y++) {
        for (x = 0; x < w; x++) {
            var t = case_to_txt(x, y);
            var el = document.getElementById(t);
            el.classList.remove("case_parcouru");
            el.classList.remove("case_chemin");
        }
    }
}