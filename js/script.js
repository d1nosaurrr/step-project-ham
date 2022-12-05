"use strict"

// SERVICE-BLOCK
const serviceList = [...document.querySelectorAll(".service-item")];
const serviceDescription = [...document.querySelectorAll(".service-description")];

const serviceListHandler = (e) => {
	const activeTab = document.querySelector(".service-list .active");
	activeTab.classList.remove("active");
	e.target.classList.add('active');
	serviceDescription.forEach(el => {
		el.classList.add("hidden");
		el.classList.remove("active")
		if (
			el.getAttribute("data-name") ===
			e.target.getAttribute("data-name")
		) {
			el.classList.remove("hidden");
			el.classList.add("active");
		}
	});
};
serviceList.forEach((e) => e.addEventListener("click", serviceListHandler));

//WORK-BLOCK
const exampleWorkList = document.querySelector(".example-list");
const loadMoreExample = document.querySelector(".load-more-btn");

const loadMoreExampleHandler = () => {
	const loader = document.querySelector(".work-example > .loader");
	const newExampleList = [];
	const dataAtr = [
		"graphic",
		"web",
		"landing",
		"wordpress"
	];
	loader.classList.remove("hidden");
	loadMoreExample.remove();
	document.querySelector(".work-list .active").classList.remove("active");
	document.querySelector(".work-list [data-filter='all']").click()

	setTimeout(() => {
		loader.classList.remove("hidden");
		for (let i = 0; i <= 12; i++) {
			const li = document.createElement("li");
			li.classList.add("example-item");
			const random = Math.floor(Math.random() * dataAtr.length);
			li.setAttribute(`data-filter`, dataAtr[random]);
			li.innerHTML = `
                            <img class="example-img" src="./images/our-works/Layer_${i}.png"
                                 alt="image of our work"
                                 width="283" height="206">
                            <div class="example-img-backside">
                              <span class="example-description-icon flex-row">
                                    <i class="fas fa-link"></i>
                                    <i class="fas fa-stop-circle"></i>
                                </span>
                                <h3 class="example-title">Creative design</h3>
                                <span class="example-description">Graphic Design</span>
                            </div>
			                `;
			newExampleList.push(li);
		}
		for (let i = 1; i < newExampleList.length; i++) {
			exampleWorkList.append(newExampleList[i])
		}
		loader.remove();
	}, 2000);
	loadMoreExample.removeEventListener("click", loadMoreExampleHandler);
};

loadMoreExample.addEventListener("click", loadMoreExampleHandler);

const workList = [...document.querySelectorAll(".work-item")];

const workFilterHandler = (e) => {
	if (document.querySelector(".work-list .active")) {
		document.querySelector(".work-list .active").classList.remove("active")
	}
	e.target.classList.add("active");
	const exampleList = [...document.querySelectorAll(".example-item")];
	exampleList.forEach((el) => {
		if (e.target.getAttribute("data-filter") === el.getAttribute("data-filter")) {
			el.classList.remove("hidden");
		} else if (e.target.getAttribute("data-filter") === "all") {
			el.classList.remove("hidden")
		} else {
			el.classList.add("hidden");
		}
	});
};

workList.forEach((e) => {
	e.addEventListener("click", workFilterHandler);
});

//FEEDBACK-BLOCK
const portraitList = [...document.querySelectorAll(".img-block")];
const totalPortrait = [...document.querySelectorAll(".people-img-mini")];
const feedbackText = [...document.querySelectorAll(".feedback-item")];
let position = 0;

const feedbackHandler = (e) => {
	const activePortrait = document.querySelector(".img-block > .active");
	const activeText = document.querySelector(".feedback-list > .active");

	if (e.target.closest(".fas") || e.target.closest(".people-img-mini")) {

		activePortrait.classList.remove("active");
		activeText.classList.remove("active");

		if (e.target.closest(".fa-chevron-right")) {
			position = position === totalPortrait.length - 1 ? 0 : position += 1;
		} else if (e.target.closest(".fa-chevron-left")) {
			position = position === 0 ? totalPortrait.length - 1 : position -= 1;
		}
		if (e.target.closest(".people-img-mini")) {
			position = totalPortrait.indexOf(e.target);
		}
		totalPortrait[position].classList.add("active");

		feedbackText.forEach((el) => {
			if (totalPortrait[position].getAttribute("data-author") ===
				el.getAttribute("data-author")) {
				el.classList.add("active");
			}
		});
	}
};
portraitList.forEach((e) => e.addEventListener("click", feedbackHandler));

//AMAZING WORKS
let gallery = document.querySelector('.gallery-list');
let nested = document.querySelector('.nested-grid');
const msnry = new Masonry(gallery, {
	itemSelector: '.gallery-item',
	columnWidth: '.gallery-sizer',
	gutter: 20,
	resize: false,
});
new Masonry(nested, {
	itemSelector: '.nested-item',
	columnWidth: 120,
	gutter: 3,
	percentPosition: true,
});

const loadMoreAmazing = document.querySelector(".amazing-btn");
const galleryList = document.querySelector(".gallery-list");

const loadMoreAmazingHandler = () => {
	const fragment = document.createDocumentFragment();
	const loader = document.querySelector(".galley-content > .loader");
	const newAmazingList = [];

	loader.classList.remove("hidden");
	loadMoreAmazing.remove();
	const randNum = Math.floor(Math.random() * (13 - 1) + 1);
	setTimeout(() => {
		loader.classList.remove("hidden");
		for (let i = 1; i <= randNum; i++) {
			const div = document.createElement("div");
			div.classList.add("gallery-item");
			div.innerHTML = `
                            <img class="gallery-img" src="./images/gallery/amazing-works-${i}.jpg"
                                     alt="image of our work"
                                     width="370" height="270">
                                <div class="gallery-img-backside">
                                    <i class="fas fa-search popup-handler"></i>
                                    <a class="gallery-backside-expand" href="./images/gallery/amazing-works-${i}.jpg"
                                     target="_blank">
                                        <i class="fas fa-expand-arrows-alt"></i>
                                    </a>
                                </div>
			                `;
			fragment.appendChild(div);
			newAmazingList.push(div);
		}
		galleryList.appendChild(fragment);

		msnry.appended(newAmazingList);
		loader.remove();
	}, 2000);
	loadMoreAmazing.removeEventListener("click", loadMoreAmazingHandler);
};

loadMoreAmazing.addEventListener("click", loadMoreAmazingHandler);

galleryList.addEventListener("click", (e) => {
	if (e.target.className.includes("popup-handler")) {
		const imgClone = e.target.parentElement.previousElementSibling.cloneNode(true)
		showModalWindow(imgClone);
	}
})
const modalWindow = document.querySelector("#img-modal");
const fader = document.querySelector(".modal-fader");

document.querySelector(".modal-fader").addEventListener("click", function () {
	hideModalWindow();
});

const showModalWindow = (img) => {
	modalWindow.append(img)
	fader.classList.add("active");
	modalWindow.classList.add("active");
}

function hideModalWindow() {
	fader.classList.remove("active");
	modalWindow.classList.remove("active");
	modalWindow.innerHTML = "";

}
