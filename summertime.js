import { newGallery, importPhoto } from "./gallery.js";

let photos = [
	importPhoto("../assets/photos/summertime/1.jpg", "Teenagers jump into Lake Michigan at Oak Street Beach, Chicago, Ill. on June 4, 2026."),
	importPhoto("../assets/photos/summertime/2.jpg", "Parkgoer sits in hammock under tree to escape sun in Chicago, Ill. on June 4, 2026."),
	importPhoto("../assets/photos/summertime/3.jpg", "Chicagoians use tree to find shade on lake front in Chicago, Ill. on June 4, 2026."),
	importPhoto("../assets/photos/summertime/4.jpg", "Chess match at the Lincoln Park Chess Pavilion in Chicago, Ill. on June 4, 2026."),
	importPhoto("../assets/photos/summertime/5.jpg", "Children play at Crown Fountain, Chicago, Ill. on June 4, 2026."),
	importPhoto("../assets/photos/summertime/7.jpg", "Teenagers play Spikeball on Oak Street Beach, Chicago, Ill. on June 4, 2026."),
	importPhoto("../assets/photos/summertime/8.jpg", "Jet-skis pass by Oak Street Beach, Chicago, Ill. on June 4, 2026."),
	importPhoto("../assets/photos/summertime/10.jpg", "Biker uses bike trail that lines Chicago's beach front on June 4, 2026."),
]

let gallery = newGallery(photos, document.getElementById("photos"))

