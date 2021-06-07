//
var distances = {};
var scores = [];
var visites = {};

var chemin_trouve_val = null;

// Fonction heuristique : distance euclidienne
function heuristic(x, y) {
    var e = txt_to_case(end);
    return Math.sqrt((x - e[0]) ** 2 + (y - e[1]) ** 2);
}


function get_next() {
    if (scores.length == 0) {
        return null;
    }
    var sel_i = 0;
    var sel_score = Infinity;
    for (i = 0; i < scores.length; i++) {
        var s = scores[i].sommet;
        var t = case_to_txt(s[0], s[1]);
        // On vérifie qu'il n'a pas été visité
        if (!Object.keys(visites).includes(t)) {
            if (scores[i].score < sel_score) {
                sel_i = i;
                sel_score = scores[i].score;
            }
        }
    }
    //
    var res = scores[sel_i];
    // On va enlever le sommet
    scores = scores.filter(function(value, index, arr) {
        return index != sel_i;
    });
    //
    return res;
}


function chemin_trouve(chemin) {
    //
    chemin_trouve_val = chemin;
    //
    for (c of chemin_trouve_val) {
        var t = case_to_txt(c[0], c[1]);
        var el = document.getElementById(t);
        el.classList.remove("case_parcouru");
        el.classList.add("case_chemin");
    }
    // Les stats
    document.getElementById("astar_taille").innerHTML = chemin.length;
    document.getElementById("astar_parcourus").innerHTML = Object.keys(visites).length;
    document.getElementById("res_astar").style.display = "initial";
}

//
function parcours(s, chemin) {
    //
    chemin.push(s);
    // Pour chaque successeur de se sommet, on calcule son score
    for (d of[[0, 1], [0, -1], [1, 0], [-1, 0]]) {
        var x = s[0] + d[0];
        var y = s[1] + d[1];
        var t = case_to_txt(x, y);
        // On vérifie que l'on est bien dans le quadrillage
        if (!document.getElementById(t)) {
            continue;
        }
        // On vérifie que ce n'est pas un mur
        if (!walls.includes(t)) {
            // On vérifie qu'il n'a pas été visité
            if (!Object.keys(visites).includes(t)) {
                //Le score est égal à la somme :
                // - du poids de l’arc qui le sépare du départ
                // - et du coût heuristique attribué à ce sommet
                var score = chemin.length + heuristic(x, y);
                scores.push({ "sommet": [x, y], "chemin": JSON.parse(JSON.stringify(chemin)), "score": score });
            }
        }
    }
    // On note le sommet comme visité
    var t = case_to_txt(s[0], s[1]);
    visites[t] = true;
    document.getElementById(t).classList.add("case_parcouru");
    // On va ensuite regarder le sommet qui a le score le plus bas dans notre liste de sommets en attente.
    var prochain = get_next();
    //
    if (prochain == null) {
        alert("pas de chemins trouvé");
        chemin_trouve_val = false;
        return
    }
    var sommet = prochain.sommet;
    chemin = prochain.chemin;
    // On regarde ensuite si ce sommet est le sommet d'arrivée : 
    if (case_to_txt(sommet[0], sommet[1]) == end) {
        chemin.push(sommet);
        // Si oui, on a trouvé notre chemin en remontant les sommets précédents parcourus.
        chemin_trouve(chemin);
    } else {
        // Sinon, on répète le même processus, jusqu'à tomber sur l'arrivée.
        parcours(sommet, chemin);
    }
}



//
function astar() {
    //
    clear_table();
    //
    if (begin == null || end == null) {
        alert("Il faut un départ et une arrivée ! ");
        return;
    }

    //
    var b = txt_to_case(begin);

    distances = {};
    scores = [];
    visites = {};

    // On part de notre sommet actuel

    parcours(b, []);

    // On a fini notre parcours


}