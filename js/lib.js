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
    for (c of document.getElementsByClassName("case_parcouru")) {
        c.classList.remove("case_parcouru");
    }

    for (c of document.getElementsByClassName("case_chemin")) {
        c.classList.remove("case_chemin");
    }
}