import { newGallery, importPhoto } from "./gallery.js";

let photos = [
	importPhoto("../assets/photos/portfolio/protest/1.jpg", "People march during May Day protest in Chicago on May 1, 2026."),
	importPhoto("../assets/photos/portfolio/sports/2.jpg", "Juex Urbains BMX event in Montreal, Canada. March 21, 2026."),
	importPhoto("../assets/photos/portfolio/sports/3.jpg", "Netherland fans stay up past 1am to watch the Netherlands vs. Tunisia World Cup game under the light from a parking meeter in Amsterdam on June 26, 2026."),
	importPhoto("../assets/photos/portfolio/event/1.jpg", "Large building fire in Maywood, Ill. on April 4, 2026."),
	importPhoto("../assets/photos/portfolio/event/2.jpg", "Oak Park residents cast their vote on if referendum in opposition to Illinois' anti-BDS law should appear on November ballot at Township meeting on Apirl 28, 2026."),
	importPhoto("../assets/photos/portfolio/protest/4.jpg", "Protester gets arrested after fight with counter protester before May Day march in Union Park, Chicago on May 1, 2026."),
	importPhoto("../assets/photos/portfolio/sports/5.jpg", "Carleton College's Syzygy wins the womens' Ultimate Frisbee D1 Championship against the University of British Columbia in Rockford, Ill. on May 25, 2026."),
	importPhoto("../assets/photos/portfolio/msc/4.jpg", "People look at the opened Ghent Altarpiece at Saint Bavo's Cathedral on June 22, 2026."),
	importPhoto("../assets/photos/portfolio/sports/1.jpg", "Declan Miller (Carleton College CUT), Gavin Abrahamsson (Massachusetts Zoodisc) and Wyatt Kellman (Massachusetts Zoodisc) fend for disc in championship game during the open Ultimate Frisbee D1 Championship in Rockford, Ill. On May 25, 2026."),
	importPhoto("../assets/photos/portfolio/protest/6.jpg", "Protesters gather in Scoville Park, Oak Park, Ill., to protest against ICE. Jan. 30, 2026."),
	importPhoto("../assets/photos/portfolio/msc/1.jpg", "Winter Pearson, TBFighter attending Tuberculosis Hill Day on March 3, 2026."),
	importPhoto("./assets/photos/frosty-fridays/1.jpg", "Participant jumps into Lake Michigan for Frosty Fridays near the Lincoln Park Chess Pavilion on June 24, 2026."),
	importPhoto("../assets/photos/portfolio/msc/3.jpg", "Parking lot in Montreal, Canada, on March 20, 2026."),
	importPhoto("../assets/photos/portfolio/sports/4.jpg", "Kyliah Mcroy (Carleton College Syzygy) celebrates after scoring a point in the womens' championship match against the University of British Columbia during the Ultimate Frisbee D1 Championship in Rockford, Ill. on May 25, 2026."),
	importPhoto("../assets/photos/frosty-fridays/4.jpg", "Jacob White poses for a portrait. He started to post on social media about his Friday morning jumps into the lake shortly after moving to Chicago, attracting around a hundred people to join him. One reason he started was as a way to meet people. 'Moving to a big city is challenging to go out and meet new friends. So I was like, [Frosty Fridays] is a good way to, you know, connect with people.' June 24, 2026"),
]

let gallery = newGallery(photos, document.getElementById("photos"))

