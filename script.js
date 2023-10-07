
let locomotiveAnimation = ()=>{
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll


// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotiveAnimation()

let videoconAnimation = () => {
    let videocon = document.querySelector("#video-container video");
    let playbtn = document.querySelector("#play");

    const scroll = new LocomotiveScroll({
        el: document.querySelector("#video-container"),
        smooth: true, // Enable smooth scrolling
    });

    const updatePlayButtonPosition = (mouseX, mouseY) => {
        const videoconRect = videocon.getBoundingClientRect();
        const scrollX = scroll.scroll.instance.scroll.x; // Horizontal scroll position
        const scrollY = scroll.scroll.instance.scroll.y; // Vertical scroll position

        // Calculate the position based on both mouse and scroll positions
        const leftPosition = mouseX - videoconRect.left - scrollX;
        const topPosition = mouseY - videoconRect.top - scrollY;

        gsap.to(playbtn, {
            left: leftPosition + "px",
            top: topPosition + "px",
            transform: `translate(-50%, -50%) scale(1)`,
        });
    };

    videocon.addEventListener("mouseenter", function () {
        gsap.to(playbtn, {
            opacity: 1,
            scale: 1,
        });
    });

    videocon.addEventListener("mouseleave", function () {
        gsap.to(playbtn, {
            opacity: 0,
            scale: 0,
        });
    });

    document.addEventListener("mousemove", function (e) {
        updatePlayButtonPosition(e.clientX, e.clientY);
    });

    // Update the position even when scrolling
    scroll.on("scroll", (e) => {
        const { clientX, clientY } = e.originalEvent;

        updatePlayButtonPosition(clientX, clientY);
    });
};

videoconAnimation();

let navbarAnimation = ()=>{
    gsap.to("#nav-part1 svg, #nav-part2 #links",{
        transform: "translateY(-110%)",
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            start: "top 0",
            end: "top -5%",
            scrub:1
        }
    })
}
navbarAnimation()

let loadingAnimation = () => {
    gsap.from("#page1 h1", {
        y: 100,
        duration: .6,
        delay: .4,
        stagger: .2,
        opacity: 0
    })
    gsap.from("#video-container", {
        y: 100,
        duration: 1.5,
        delay: .4,
        opacity: 0
    })
}
loadingAnimation()

let page1Animation = ()=>{
    pageh1.addEventListener("mousemove", function (dets) {
        gsap.to("#cursor", {
            left: dets.x,
            top: dets.y,
            transform: `translate(-50%, -50%) scale(1)`,
            opacity:1,
        })
    }),
    pageh1.addEventListener("mouseleave", function (dets) {
        gsap.to("#cursor", {
            left: dets.x,
            top: dets.y,
            transform: `translate(-50%, -50%) scale(0)`,
            opacity:0,
        })
    })
}
page1Animation()

let cursorAnimation = ()=>{
    document.querySelectorAll(".child").forEach(elem=>{
        elem.addEventListener("mousemove", function (dets) {
            gsap.to("#cursor", {
                left: dets.x,
                top: dets.y,
                transform: `translate(-50%, -50%) scale(1)`,
                opacity:1,
            })
        }),
        elem.addEventListener("mouseleave", function (dets) {
            gsap.to("#cursor", {
                left: dets.x,
                top: dets.y,
                transform: `translate(-50%, -50%) scale(0)`,
                opacity:0,
            })
        })
    })
}
cursorAnimation()


gsap.from(".child",{
    y:400,
    opacity:0,
    duration:.5,
    stagger:.3,
    scrollTrigger:{
        trigger:"#page3",
        scroller:"#main",
        start: "top 60%",
        end:"top 35%",
        scrub:2
    }
})
