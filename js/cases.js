var tool = 0; // 0 = floor 1 = wall 2 = begin 3 = end

var walls = [];
var floors = [];
var begin = null;
var end = null;

function case_press(x, y) {
    switch (tool) {
        case 0:
            // floor
            var t = case_to_txt(x, y);
            // Si dans walls
            if (walls.includes(t)) {
                document.getElementById(t).classList.remove("case_wall");
                walls = walls.filter(function(value, index, arr) {
                    return value != t;
                });
            }
            //
            floors.push(t);
            document.getElementById(t).classList.add("case_floor");
            break;

        case 1:
            // wall
            var t = case_to_txt(x, y);
            // Si dans floor
            if (floors.includes(t)) {
                document.getElementById(t).classList.remove("case_floor");
                floors = floors.filter(function(value, index, arr) {
                    return value != t;
                });
            }
            //
            walls.push(t);
            document.getElementById(t).classList.add("case_wall");
            if (begin == t) { // pas de cases de départ ni d'arrivée sur un mur
                document.getElementById(t).classList.remove("case_begining");
                begin = null;
            }
            if (end == t) { // pas de cases de départ ni d'arrivée sur un mur
                document.getElementById(t).classList.remove("case_end");
                end = null;
            }
            break;

        case 2:
            // begining
            var t = case_to_txt(x, y);
            if (walls.includes(t)) {
                //
                alert("No begining case on walls !");
                return
            }
            //
            if (begin != null) {
                document.getElementById(begin).classList.remove("case_begining")
            }
            //
            document.getElementById(t).classList.add("case_begining");
            begin = t;
            //
            break;

        case 3:
            // end
            var t = case_to_txt(x, y);
            if (walls.includes(t)) {
                //
                alert("No end case on walls !");
                return
            }
            //
            if (end != null) {
                document.getElementById(end).classList.remove("case_end")
            }
            //
            document.getElementById(t).classList.add("case_end");
            end = t;
            //
            break;

        default:
            console.error("erreur !");
    }
}