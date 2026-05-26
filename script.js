const gallery = document.getElementById("gallery");

let images = [];
let currentIndex = 0;


// ===== LOAD IMAGES =====
fetch("gallery/")
    .then(res => res.text())
    .then(html => {

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const links = doc.querySelectorAll("a");

        links.forEach(link => {

            const href = link.getAttribute("href");

            if (href && href.match(/\.(jpg|jpeg|png|gif)$/i)) {

                const fullPath = "gallery/" + href;

                images.push(fullPath);
                const index = images.length - 1;

                const a = document.createElement("a");
                a.href = "#";

                const img = document.createElement("img");
                img.src = fullPath;

                a.addEventListener("click", (e) => {
                    e.preventDefault();
                    openViewer(index);
                });

                a.appendChild(img);
                gallery.appendChild(a);
            }
        });
    });


// ===== VIEWER =====
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewer-img");

// ✅ on vérifie que les éléments existent AVANT
if (viewer && viewerImg) {

    function openViewer(index) {
        currentIndex = index;
        viewerImg.src = images[currentIndex];
        viewer.classList.remove("hidden");
    }

    const closeBtn = document.querySelector(".close");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    if (closeBtn) {
        closeBtn.onclick = () => {
            viewer.classList.add("hidden");
        };
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            currentIndex = (currentIndex + 1) % images.length;
            viewerImg.src = images[currentIndex];
        };
    }

    if (prevBtn) {
        prevBtn.onclick = () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            viewerImg.src = images[currentIndex];
        };
    }

    // clavier
    document.addEventListener("keydown", (e) => {

        if (viewer.classList.contains("hidden")) return;

        if (e.key === "ArrowRight") {
            currentIndex = (currentIndex + 1) % images.length;
        }

        if (e.key === "ArrowLeft") {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        }

        if (e.key === "Escape") {
            viewer.classList.add("hidden");
        }

        viewerImg.src = images[currentIndex];
    });

}