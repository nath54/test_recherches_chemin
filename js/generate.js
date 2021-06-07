function generate_map() {
    // on nettoie
    for (child of document.getElementById("table").children) {
        document.getElementById("table").removeChild(child);
    }
    document.getElementById("table").innerHTML = null;
    //
    var w = parseInt(document.getElementById("i_width").value);
    var h = parseInt(document.getElementById("i_height").value);
    //
    for (y = 0; y < h; y++) {
        var r = document.createElement("tr");
        r.setAttribute("id", "r" + y);
        document.getElementById("table").appendChild(r);
        for (x = 0; x < w; x++) {
            var c = document.createElement("td");
            c.setAttribute("id", case_to_txt(x, y));
            c.setAttribute("onclick", "case_press(" + x + "," + y + ");");
            r.appendChild(c);
        }
    }
}