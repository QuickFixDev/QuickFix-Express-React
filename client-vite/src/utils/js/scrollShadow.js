const handleScroll = () => {
    console.log("Adding scroll listener to container");
    const container = document.getElementById("scroll-container");

    if (container.scrollTop > 0) {
        // Apply shadow styles
        container.classList.add("inner-shadow")
    } else {
        // Remove shadow styles
        container.style.boxShadow = "none";
    }

    console.log("scrolled")
};

export default handleScroll;