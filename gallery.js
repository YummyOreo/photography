const uid = function() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

let gap = 9;

function render(gallery) {
    let images = gallery.images;
    let container = gallery.container;

    let initialX = container.getBoundingClientRect().left;
    let initialY = container.getBoundingClientRect().top + window.scrollY;
    let width = container.getBoundingClientRect().width;
    let colNumber = 3
    if (width < 768) {
        colNumber = 2
    }
    if (width < 650) {
        colNumber = 1
    }
    let maxImageWidth = (width - (3 * colNumber)) / colNumber;

    let currentCol = 0;
    let offsetY = [0, 0, 0];
    for (const image of images) {
        let id = image.uid;
        let el = document.getElementById(id);

        let width = el.getBoundingClientRect().width;
        if (image.type == "video") {
            el.querySelector("video").getAttribute("height");
        }
        width = maxImageWidth
        el.style.width = width + "px";

        let height = el.getBoundingClientRect().height;
        if (image.type == "video") {
            el.querySelector("video").getAttribute("height");
        }

        el.style.left = (initialX + currentCol * (width + gap)) + "px";
        el.style.top = (initialY + offsetY[currentCol]) + "px";

        offsetY[currentCol] += height + gap;

        if (colNumber == 1) {
            continue
        }

        let lastCol = currentCol - 1;
        if (lastCol < 0) {
            lastCol = colNumber - 1;
        }
        if (offsetY[currentCol] > offsetY[lastCol]) {
            currentCol += 1;
            if (currentCol > colNumber - 1) {
                currentCol = 0
            }
        }
    }

    let max = 0;
    for (const y of offsetY) {
        if (y > max) {
            max = y;
        }
    }
    container.style.height = max + "px"
}

function getIndex(gallery, uid) {
    let images = gallery.images;
    let indx = 0;
    for (const image of images) {
        if (image.uid == uid) {
            return indx
        }
        indx += 1
    }
}

function imageClick(image, gallery) {
    let popup = document.querySelector(".popup")
    popup.classList.add("active");
    document.getElementById("body").classList.add("no-scroll")

    const prev = document.createElement("button");
    prev.innerHTML = `<img src="./assets/prev.svg" alt="previous photo">`;
    const next = document.createElement("button");
    next.innerHTML = `<img src="./assets/next.svg" alt="next photo">`;

    let width = document.body.getBoundingClientRect().width;
    if (width > 992) {
        popup.appendChild(prev)
    }

    const el = document.createElement("img");
    el.setAttribute("src", image.src);

    let caption = document.createElement("p");
    let cont = document.createElement("div");
    cont.setAttribute("id-popup", image.uid);
    caption.textContent = image.caption;
    caption.classList.add("caption");
    caption.setAttribute("uid", image.uid)
    cont.appendChild(el);
    cont.appendChild(caption);
    popup.appendChild(cont);
    if (width > 992) {
        popup.appendChild(next)
    } else {
        let controlContainer = document.createElement("div");
        controlContainer.appendChild(prev)
        controlContainer.appendChild(next)
        controlContainer.id = "controls"
        popup.appendChild(controlContainer)
    }

    prev.addEventListener("click", (e) => {
        console.log(gallery)
        let indx = getIndex(gallery, image.uid)
        indx -= 1;
        if (indx < 0) {
            indx = gallery.images.length - 2;
        }
        popup.innerHTML = ""
        imageClick(gallery.images[indx], gallery)
    })
    next.addEventListener("click", (e) => {
        let indx = getIndex(gallery, image.uid)
        indx += 1;
        if (indx == gallery.images.length) {
            indx = 0;
        }
        popup.innerHTML = ""
        imageClick(gallery.images[indx], gallery)
    })

    popup.addEventListener("click", (e) => {
        if (e.target.nodeName == "IMG" || e.target.nodeName == "P" || e.target.nodeName == "BUTTON") {
            return
        }
        popup.classList.remove("active");
        popup.innerHTML = ""
        document.getElementById("body").classList.remove("no-scroll")
    })
}

let loaded = 0;

function imageLoaded(gallery) {
    loaded += 1;
    if (gallery.images.length == loaded) {
        render(gallery)
        gallery.container.classList.add("loaded")
    }
}

function addImage(image, gallery) {
    const el = document.createElement("img");
    el.setAttribute("src", image.src);
    el.addEventListener("click", (e) => {
        imageClick(image, gallery);
    })
    let cont = document.createElement("div");
    cont.setAttribute("id", image.uid);
    cont.appendChild(el);
    el.addEventListener("load", () => {
        imageLoaded(gallery);
    })
    return cont
}

function addVideo(video, gallery) {
    const el = document.createElement("video");

    el.setAttribute("width", video.width);
    el.setAttribute("height", video.height);
    el.muted = true
    el.loop = true
    // el.setAttribute("controls", "")
    el.setAttribute("autoplay", "")

    const source = document.createElement("source")

    source.setAttribute("src", video.src);

    el.appendChild(source)

    el.addEventListener("loadeddata", () => {
        console.log("loaded el")
    })

    let cont = document.createElement("div");
    let controls = document.createElement("div")
    controls.classList.add("video-controls")
    controls.innerHTML = `
            <div class="timeline">
                <div class="bar">
                    <div class="inner"></div>
                </div>
            </div>
    `

    el.addEventListener("timeupdate", () => {
        let curr = (el.currentTime / el.duration) * 100
        document.querySelector('.video-controls .inner').style.width = `${curr}%`
    })

    el.addEventListener("click", () => {
        if(el.paused){
            el.play()
            el.classList.remove("paused")
        }
        else{
            el.pause()
            el.classList.add("paused")
        }
    })

    cont.setAttribute("id", video.uid);
    cont.appendChild(el);
    cont.appendChild(controls)
    return cont
}

export function renderGallery(gallery) {
    let container = gallery.container;
    if (container.children.length == 0) {
        let images = gallery.images;
        for (const image of images) {
            if (image.type == "img") {
                container.appendChild(addImage(image, gallery));
            } else if (image.type == "video") {
                container.appendChild(addVideo(image, gallery));
                imageLoaded(gallery);
            }
        }
    } else {
        render(gallery)
    }

}

export function newGallery(images, container) {
    let gallery = {
        "images": images,
        "container": container,
        state: {
            active: undefined
        }
    };
    renderGallery(gallery);
    window.addEventListener('resize', () => {
            render(gallery)
    });
    return gallery;
}

export function importVideo(path, caption, thumbnail, width, height) {
    return {
        uid: uid(),
        src: path,
        caption: caption,
        thumbnail: thumbnail,
        type: "video",
        width: width,
        height: height
    }
}

export function importPhoto(path, caption) {
    return {
        uid: uid(),
        src: path,
        caption: caption,
        type: "img"
    }
}
