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
    let offsetY = [initialY, initialY, initialY];
    for (const image of images) {
        let id = image.uid;
        let el = document.getElementById(id);

        let width = maxImageWidth
        el.style.width = width + "px";

        let height = el.getBoundingClientRect().height;

        el.style.left = (initialX + currentCol * (width + gap)) + "px";
        el.style.top = (offsetY[currentCol]) + "px";

        offsetY[currentCol] += height + gap;

        if (colNumber == 1) {
            continue
        }

        let lastCol = currentCol - 1;
        if (lastCol < 0) {
            lastCol = colNumber - 1;
        }
        if (Math.ceil(offsetY[currentCol]) >= Math.ceil(offsetY[lastCol])) {
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
    max = max - initialY
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

function addImage(image, gallery, popup) {
    const el = document.createElement("img");
    el.setAttribute("src", image.src);
    let cont = document.createElement("div");
    cont.setAttribute("id", image.uid);
    cont.appendChild(el);
    if (!popup) {
        el.addEventListener("click", (e) => {
            imageClick(image, gallery);
        })
        el.addEventListener("load", () => {
            imageLoaded(gallery);
            if (image.caption == "" && EXIF != undefined) {
                console.log("a")
                EXIF.getData(el, function() {
                    image.caption = EXIF.getTag(this, "ImageDescription");
                });
            }
        })
    }

    return cont
}

function addVideo(video, gallery, popup) {
    const el = document.createElement("video");

    el.setAttribute("width", video.width);
    el.setAttribute("height", video.height);
    el.muted = true
    el.loop = true
    el.playsInline = true
    el.controls = false
    el.preload = true
    el.setAttribute("autoplay", "")

    const source = document.createElement("source")

    source.setAttribute("src", video.src);

    el.appendChild(source)
    el.classList.add("loading")

    el.addEventListener("loadeddata", () => {
        el.classList.add("loaded")
        el.classList.remove("loading")
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

    if (!popup) {
        el.addEventListener("timeupdate", () => {
            let curr = (el.currentTime / el.duration) * 100
            document.querySelector('.video-controls .inner').style.width = `${curr}%`
        })
    }

    el.addEventListener("click", (e) => {
        if(el.paused){
            el.play()
            el.classList.remove("paused")
        }
        else{
            el.pause()
            el.classList.add("paused")
        }
        e.preventDefault()
    })

    cont.setAttribute("id", video.uid);
    cont.appendChild(el);
    if (!popup) {
        cont.appendChild(controls)
    }
    return cont
}

function imageClick(image, gallery) {
    let popup = document.querySelector(".popup")
    popup.classList.add("active");
    document.getElementById("body").classList.add("no-scroll")

    const prev = document.createElement("button");
    prev.innerHTML = `<img src="/assets/prev.svg" alt="previous photo">`;
    const next = document.createElement("button");
    next.innerHTML = `<img src="/assets/next.svg" alt="next photo">`;

    let width = document.body.getBoundingClientRect().width;
    if (width > 992) {
        popup.appendChild(prev)
    }

    let cont = undefined
    if (image.type == "img") {
        cont = addImage(image, gallery, true)
    } else if (image.type == "video") {
        cont = addVideo(image, gallery, true)
    }
    cont.setAttribute("id-popup", image.uid);
    cont.id = ""

    let caption = document.createElement("p");
    caption.textContent = image.caption;
            console.log(image.caption)
    caption.classList.add("caption");
    caption.setAttribute("uid", image.uid)

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

    const keylistener = document.body.addEventListener("keyup", function keyUp(e) {
        if (e.key == "ArrowRight") {
            document.body.removeEventListener("keyup", keyUp)
            let indx = getIndex(gallery, image.uid)
            indx += 1;
            if (indx == gallery.images.length) {
                indx = 0;
            }
            popup.innerHTML = `<button class="back"><img src="/assets/gallery.svg" class="back" alt="back to gallery"></button>`
            imageClick(gallery.images[indx], gallery)
        } else if (e.key == "ArrowLeft") {
            document.body.removeEventListener("keyup", keyUp)
            let indx = getIndex(gallery, image.uid)
            indx -= 1;
            if (indx < 0) {
                indx = gallery.images.length - 1;
            }
            popup.innerHTML = `<button class="back"><img src="/assets/gallery.svg" class="back" alt="back to gallery"></button>`
            imageClick(gallery.images[indx], gallery)
        } else if (e.key == "Escape") {
            popup.classList.remove("active");
            popup.innerHTML = `<button class="back"><img src="/assets/gallery.svg" alt="back to gallery"></button>`
            document.getElementById("body").classList.remove("no-scroll")
        }
    })

    prev.addEventListener("click", (e) => {
        let indx = getIndex(gallery, image.uid)
        indx -= 1;
        if (indx < 0) {
            indx = gallery.images.length - 1;
        }
        popup.innerHTML = `<button class="back"><img src="/assets/gallery.svg" class="back" alt="back to gallery"></button>`
        imageClick(gallery.images[indx], gallery)
    })
    next.addEventListener("click", (e) => {
        let indx = getIndex(gallery, image.uid)
        indx += 1;
        if (indx == gallery.images.length) {
            indx = 0;
        }
        popup.innerHTML = `<button class="back"><img src="/assets/gallery.svg" class="back" alt="back to gallery"></button>`
        imageClick(gallery.images[indx], gallery)
    })

    popup.addEventListener("click", (e) => {
        console.log(e.target)
        if ((e.target.nodeName == "IMG" || e.target.nodeName == "P" || e.target.nodeName == "BUTTON" || e.target.nodeName == "VIDEO") && !e.target.classList.contains("back")) {
            return
        }
        popup.classList.remove("active");
        popup.innerHTML = `<button class="back"><img src="/assets/gallery.svg" class="back" alt="back to gallery"></button>`
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
