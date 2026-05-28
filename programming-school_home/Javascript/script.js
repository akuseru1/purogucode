// ランク文字に応じて右下の写真を切り替える
const rankPhotoMap = {
    A: "../A.jpg",
    B: "../B.jpg",
};

function setupSidebar() {
    const seiseki = document.querySelector(".seiseki");
    const toggleButton = document.querySelector("#sidebar-toggle");
    const sideMenu = document.querySelector("#side-menu");
    const autoLinkArea = document.querySelector(".sidebar-auto-links");

    if (!seiseki || !toggleButton || !sideMenu || !autoLinkArea) {
        return;
    }

    const applySidebarButtonStyle = () => {
        const links = autoLinkArea.querySelectorAll("a");
        links.forEach((link) => {
            link.classList.add("sidebar-pill-button");
        });
    };

    applySidebarButtonStyle();

    const observer = new MutationObserver(() => {
        applySidebarButtonStyle();
    });
    observer.observe(autoLinkArea, { childList: true, subtree: true });

    toggleButton.addEventListener("click", () => {
        const isOpen = seiseki.classList.toggle("sidebar-open");
        toggleButton.setAttribute("aria-expanded", String(isOpen));
    });
}

function showPhotoWithAnimation(chatPhoto, photoPath, rank) {
    chatPhoto.classList.remove("photo-show");
    chatPhoto.classList.add("photo-pre");

    const applyShowState = () => {
        requestAnimationFrame(() => {
            chatPhoto.classList.remove("photo-pre");
            chatPhoto.classList.add("photo-show");
        });
    };

    chatPhoto.onload = applyShowState;
    chatPhoto.src = photoPath;
    chatPhoto.alt = `ランク${rank}の画像`;

    if (chatPhoto.complete) {
        applyShowState();
    }
}

function updateRankPhoto() {
    const rankElement = document.querySelector(".rank-letter");
    const chatPhoto = document.querySelector(".chat-photo");

    if (!rankElement || !chatPhoto) {
        return;
    }

    const rank = rankElement.textContent.trim().toUpperCase();
    const targetPhoto = rankPhotoMap[rank];

    if (targetPhoto) {
        showPhotoWithAnimation(chatPhoto, targetPhoto, rank);
    }
}

setupSidebar();
updateRankPhoto();
