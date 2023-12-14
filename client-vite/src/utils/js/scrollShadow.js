const handleScroll = () => {
    console.log("Adding scroll listener to container");
    const container = document.getElementById("scroll-container");

    if (container.scrollTop > 0) {
        container.classList.add("inner-shadow")
    } else {
        container.style.boxShadow = "none";
    }

    console.log("scrolled")
};

export default handleScroll;