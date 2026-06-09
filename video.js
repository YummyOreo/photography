import { newGallery, importVideo, importPhoto } from "./gallery.js";

let photos = [
	importPhoto("../assets/photos/portfolio/event/2.jpg", "Oak Park residents cast their vote on if referendum in opposition to Illinois' anti-BDS law should appear on November ballot at Township meeting on Apirl 28, 2026."),
	importPhoto("../assets/photos/portfolio/protest/4.jpg", "Protester gets arrested after fight with counter protester before May Day march in Union Park, Chicago on May 1, 2026."),
	importPhoto("../assets/photos/portfolio/sports/1.jpg", "Declan Miller (Carleton College CUT), Gavin Abrahamsson (Massachusetts Zoodisc) and Wyatt Kellman (Massachusetts Zoodisc) fend for disc in championship game during the open Ultimate Frisbee D1 Championship in Rockford, Ill. On May 25, 2026."),
	importPhoto("../assets/photos/portfolio/protest/6.jpg", "Protesters gather in Scoville Park, Oak Park, Ill., to protest against ICE. Jan. 30, 2026."),
	importVideo("./assets/video/example.mp4", "example", "./assets/video/example.png", 1080, 1620),
	importPhoto("../assets/photos/portfolio/protest/1.jpg", "People march during May Day protest in Chicago on May 1, 2026."),
	importPhoto("../assets/photos/portfolio/event/2.jpg", "Oak Park residents cast their vote on if referendum in opposition to Illinois' anti-BDS law should appear on November ballot at Township meeting on Apirl 28, 2026."),
	importPhoto("../assets/photos/portfolio/sports/5.jpg", "Carleton College's Syzygy wins the womens' Ultimate Frisbee D1 Championship against the University of British Columbia in Rockford, Ill. on May 25, 2026."),
]

let gallery = newGallery(photos, document.getElementById("photos"))

