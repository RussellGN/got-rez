(function () {
	("use strict");

	/* Easy selector helper function	 */
	const select = (el, all = false) => {
		el = el.trim();
		if (all) {
			return [...document.querySelectorAll(el)];
		} else {
			return document.querySelector(el);
		}
	};

	/* Easy event listener function */
	const on = (type, el, listener, all = false) => {
		let selectEl = select(el, all);
		if (selectEl) {
			if (all) {
				selectEl.forEach((e) => e.addEventListener(type, listener));
			} else {
				selectEl.addEventListener(type, listener);
			}
		}
	};

	/* Easy on scroll event listener */
	const onscroll = (el, listener) => {
		el.addEventListener("scroll", listener);
	};

	/* Scrolls to an element with header offset */
	const scrollto = (el) => {
		let header = select("#header");
		let offset = header.offsetHeight;

		if (!header.classList.contains("fixed-top")) {
			offset += 70;
		}

		let elementPos = select(el).offsetTop;
		window.scrollTo({
			top: elementPos - offset,
			behavior: "smooth",
		});
	};

	/* Header fixed top on scroll */
	let selectHeader = select("header");
	if (selectHeader) {
		const headerScrolled = () => {
			if (window.scrollY > 20) {
				selectHeader.classList.add("header-scrolled");
			} else {
				selectHeader.classList.remove("header-scrolled");
			}
		};
		window.addEventListener("load", headerScrolled);
		onscroll(document, headerScrolled);
	}

	/* Back to top button */
	let backtotop = select(".back-to-top");
	if (backtotop) {
		const toggleBacktotop = () => {
			if (window.scrollY > 100) {
				backtotop.classList.add("active");
			} else {
				backtotop.classList.remove("active");
			}
		};
		window.addEventListener("load", toggleBacktotop);
		onscroll(document, toggleBacktotop);
	}

	/* Scrool with ofset on links with a class name .scrollto */
	on(
		"click",
		".scrollto",
		function (e) {
			if (select(this.hash)) {
				e.preventDefault();

				let navbar = select("#navbar");
				if (navbar.classList.contains("navbar-mobile")) {
					navbar.classList.remove("navbar-mobile");
					let navbarToggle = select(".mobile-nav-toggle");
					navbarToggle.classList.toggle("bi-list");
					navbarToggle.classList.toggle("bi-x");
				}
				scrollto(this.hash);
			}
		},
		true
	);

	/* Scroll with ofset on page load with hash links in the url */
	window.addEventListener("load", () => {
		if (window.location.hash) {
			if (select(window.location.hash)) {
				scrollto(window.location.hash);
			}
		}
	});

	// nav backdrop
	document.querySelector("#close-nav").addEventListener("click", toggleNav);
	document.querySelector("#open-nav").addEventListener("click", toggleNav);

	function toggleNav(e) {
		const nav = document.querySelector("#mobile-nav");
		if (nav.classList.contains("open-nav")) {
			nav.classList.remove("open-nav");
		} else {
			nav.classList.add("open-nav");
		}
	}

	// let nav = document.querySelector("#mobile-nav");
	// nav.addEventListener("click", (e) => {
	// 	nav.classList.remove("open-nav");
	// });

	/* Preloader */
	let preloader = select("#preloader");
	if (preloader) {
		window.addEventListener("load", () => {
			preloader.remove();
		});
	}

	// sliders
	const walkingDistanceSliders = document.querySelectorAll(".walking-distance");
	const walkingDistanceLabel = document.querySelectorAll("#walking-distance-label");

	if (walkingDistanceSliders.length > 0 && walkingDistanceLabel.length > 0) {
		console.log(walkingDistanceLabel.length, walkingDistanceSliders.length);
		walkingDistanceSliders.forEach((slider) => {
			slider.addEventListener("change", (e) => {
				if (Number(slider.value) === 50) {
					slider.nextElementSibling.textContent = "50+ km";
				} else {
					slider.nextElementSibling.textContent = slider.value + " km";
				}
			});
		});
	}

	// mobile filters
	const mobileFilters = select("#mobile-filters");
	const openFilters = select("#open-filters");
	const closeFilters = select("#close-filters");

	if (mobileFilters && openFilters && closeFilters) {
		openFilters.addEventListener("click", (e) => {
			mobileFilters.classList.add("show");
		});
		closeFilters.addEventListener("click", (e) => {
			mobileFilters.classList.remove("show");
		});
	}
})();
