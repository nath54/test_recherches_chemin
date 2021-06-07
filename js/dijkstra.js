/*
Dijkstra (départ, arrivée) :

   départ.distance = 0
   Enfiler le nœud de départ

   Tant que la file à priorité n'est pas vide
      Défiler le nœud au début de la file

      Si c'est le nœud d'arrivée
         Retourner nœud.distance

      Marquer le nœud comme visité
      Pour chaque voisin du nœud
         Si le voisin n'est pas visité
            voisin.distance = nœud.distance + arc
            Enfiler le voisin
*/

//
var dvisites = {};
var dchemin_trouve_val = null;

//
function dijkstra() {
    //
    clear_table();
    //
    dvisites = {};
    //
    var queue = new PriorityQueue();
    //
    var depart = txt_to_case(begin);
    //
    queue.enqueue({ "sommet": depart, "distance": 0, "chemin": [] }, 0);
    //
    while (!queue.isEmpty()) {
        var el = queue.dequeue();
        var data = el.element;
        var s = data.sommet;
        data.chemin.push(s);
        var d = el.priority;
        var t = case_to_txt(s[0], s[1]);
        // Si c'est l'arrivée
        if (t == end) {
            dchemin_trouve(data.chemin);
            break;
        }
        //
        document.getElementById(t).classList.add("case_parcouru");
        dvisites[t] = true;
        //
        for (d of[[0, 1], [0, -1], [-1, 0], [1, 0]]) {
            var x = s[0] + d[0];
            var y = s[1] + d[1];
            var t = case_to_txt(x, y);
            // On vérifie que l'on est bien dans le quadrillage
            if (!document.getElementById(t)) {
                continue;
            }
            // On vérifie que ce n'est pas un mur
            if (!walls.includes(t)) {
                if (!Object.keys(dvisites).includes(t)) {
                    var dist = d + 1;
                    queue.enqueue({ "sommet": [x, y], "distance": dist, "chemin": JSON.parse(JSON.stringify(data.chemin)) }, 0);
                }
            }
        }
    }
}

function dchemin_trouve(chemin) {
    //
    dchemin_trouve_val = chemin;
    //
    for (c of dchemin_trouve_val) {
        var t = case_to_txt(c[0], c[1]);
        var el = document.getElementById(t);
        el.classList.remove("case_parcouru");
        el.classList.add("case_chemin");
    }
    // Les stats
    document.getElementById("dijkstra_taille").innerHTML = dchemin_trouve_val.length;
    document.getElementById("dijkstra_parcourus").innerHTML = Object.keys(dvisites).length;
    document.getElementById("res_dijkstra").style.display = "initial";
}