import { newGallery, importPhoto } from "./gallery.js";

let photos = [
	importPhoto("./assets/photos/amf-2026/13.jpg", ""),
	importPhoto("./assets/photos/amf-2026/6.jpg", ""),
	importPhoto("./assets/photos/amf-2026/1.jpg", ""),
	importPhoto("./assets/photos/amf-2026/2.jpg", ""),
	importPhoto("./assets/photos/amf-2026/3.jpg", ""),
	importPhoto("./assets/photos/amf-2026/4.jpg", ""),
	importPhoto("./assets/photos/amf-2026/5.jpg", ""),
	importPhoto("./assets/photos/amf-2026/7.jpg", ""),
	importPhoto("./assets/photos/amf-2026/9.jpg", ""),
	importPhoto("./assets/photos/amf-2026/10.jpg", ""),
	importPhoto("./assets/photos/amf-2026/8.jpg", ""),
	importPhoto("./assets/photos/amf-2026/11.jpg", ""),
	importPhoto("./assets/photos/amf-2026/12.jpg", ""),
]

let gallery = newGallery(photos, document.getElementById("photos"))

