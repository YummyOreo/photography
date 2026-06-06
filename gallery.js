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
        width = maxImageWidth
        el.style.width = width + "px";

        let height = el.getBoundingClientRect().height;

        el.style.left = (initialX + currentCol * (width + gap)) + "px";
        el.style.top = (initialY + offsetY[currentCol]) + "px";

        // if (image.caption != undefined) {
        //     let capt = document.querySelector("#" + id + " .caption");
        //     capt.style.width = width + "px";
        //     capt.style.left = (initialX + currentCol * (width + gap)) + "px";
        //     capt.style.top = (initialY + height + gap + offsetY[currentCol]) + "px";
        //     let captHeight = capt.getBoundingClientRect().height;
        // }

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

function imageClick(e, image) {
    let popup = document.querySelector(".popup")
    popup.classList.add("active");
    document.getElementById("body").classList.add("no-scroll")

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

    popup.addEventListener("click", (e) => {
        if (e.target.nodeName == "IMG" || e.target.nodeName == "P") {
            return
        }
        popup.classList.remove("active");
        cont.remove();
        document.getElementById("body").classList.remove("no-scroll")
    })
}

export function renderGallery(gallery) {
    let container = gallery.container;
    let last = undefined
    if (container.children.length == 0) {
        let images = gallery.images;
        for (const image of images) {
            const el = document.createElement("img");
            el.setAttribute("src", image.src);
	    last = el
            el.addEventListener("click", (e) => {
                imageClick(e, image);
            })
            // let caption = document.createElement("p");
            let cont = document.createElement("div");
            cont.setAttribute("id", image.uid);
            // caption.textContent = image.caption;
            // caption.classList.add("caption");
            // caption.setAttribute("uid", image.uid)
            cont.appendChild(el);
            // cont.appendChild(caption);
            container.appendChild(cont);
        }
        last.addEventListener("load", () => {
            render(gallery)
        })
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

export function importPhotos(path, limit, type) {
    if (path.endsWith("/")) {
        path = path.slice(0, path.length - 1);
    }
    let images = []
    for (let i = 1; i <= limit; i++) {
        let fullPath = path + "/" + i + "." + type;
        images.push({
            uid: uid(),
            src: fullPath,
            name: undefined,
            caption: undefined,
            type: type
        })
    }
    return images
}

export function importPhoto(path, caption) {
    return {
        uid: uid(),
        src: path,
        caption: caption,
    }
}
