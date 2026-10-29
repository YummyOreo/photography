import { newGallery, importPhoto } from "../gallery.js";

let photos = [
	importPhoto("../assets/tearsheets/dailynu-2026-10-07.png", ""),
	importPhoto("../assets/tearsheets/dailynu-2026-10-28.png", ""),
]

let gallery = newGallery(photos, document.getElementById("photos"))

