import {alien} from "./alien.js";
document.addEventListener("keydown", function(e) {
    if(e.key === "ArrowLeft"){
        alien.walk(-1);
    }
    else if(e.key === "ArrowRight"){
        alien.walk(1);
    }
});
