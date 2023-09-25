const scrollBehavior = (to, from, savedPosition) => {

	// console.log(to.name, from.name, to.name === from.name);
	const options = to.matched[to.matched.length - 1]?.components?.default?.options;
	if (typeof options?.scrollToTop === "function") {
		return options.scrollToTop(to, from, savedPosition);
	}
	const isScrollToTop = options?.scrollToTop !== false;

	if (!isScrollToTop) {
		return {};
	}

	if (to.name === from.name) {
		return { x: 0, y: 0 /* behavior: "smooth" */ };
	}

	if (savedPosition) {
		//
		return savedPosition;
	}

	if (isScrollToTop) {
		//
		return { x: 0, y: 0 };
	} else {
		//
		return {};
	}
};

export default scrollBehavior;
