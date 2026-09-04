import { newGallery, importPhoto, importVideo } from "../gallery.js";

let photos = [
	importPhoto("../assets/photos/nurse-strike/1.jpg", ""),
	importVideo("../assets/photos/nurse-strike/video.mp4", "", "../assets/photos/nurse-strike/video.jpg", 1080, 1620),
	importPhoto("../assets/photos/nurse-strike/2.jpg", ""),
	importPhoto("../assets/photos/nurse-strike/3.jpg", ""),
	importPhoto("../assets/photos/nurse-strike/4.jpg", ""),
	importPhoto("../assets/photos/nurse-strike/5.jpg", ""),
	importPhoto("../assets/photos/nurse-strike/6.jpg", ""),
	importPhoto("../assets/photos/nurse-strike/7.jpg", ""),
	importPhoto("../assets/photos/nurse-strike/8.jpg", ""),
	importPhoto("../assets/photos/nurse-strike/9.jpg", ""),
	importPhoto("../assets/photos/nurse-strike/10.jpg", ""),
	importPhoto("../assets/photos/nurse-strike/11.jpg", ""),
]

let gallery = newGallery(photos, document.getElementById("photos"))

