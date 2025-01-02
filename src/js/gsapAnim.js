function gsapAni() {

  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".para-Left", {
    scrollTrigger: {
      scrub: .5
    },
    y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
    rotation: -30,
    ease: "bounce.out"
  });

  gsap.to(".para-Right", {
    scrollTrigger: {
      scrub: .5
    },
    y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
    rotation: 10,
    ease: "bounce.out"
  });
  // 游池物件動畫
  gsap.to(".para-pool-Left", {
    scrollTrigger: {
      trigger: "#section-faq",
      scrub: .5
    },
    y: (i, target) => -window.innerHeight * target.dataset.speed,
    ease: "bounce.out"
  });

  gsap.to(".para-pool-Right", {
    scrollTrigger: {
      trigger: "#section-faq",
      scrub: .5
    },
    y: (i, target) => -window.innerHeight * target.dataset.speed,
    ease: "bounce.out"
  });

  // KV
  var tlKv = gsap.timeline({
    delay: 0.5,
    // onComplete: aniLoop,
    onComplete: function(){
      aniLoop();
      // aniLoop2();
    },
    onStart: function () {
      window.scrollTo(0, 0);
    },
    // repeat: -1,
    repeatDelay: 0.8,
  });
  tlKv

	.from(
		".wrap__inner-kv_master-text, .wrap__inner-kv_master-price",
		{
        scale: 0,
        ease: "elastic.out(1, 0.35)",
        duration: 1,
        clearProps: "all",
		},
    "<1"
	  )
  .from(
    ".wrap__inner-kv_master-cash",
    {
      scale: 0,
      ease: "elastic.out(1, 0.35)",
      duration: 1,
      clearProps: "all",
    },
    "<1"
  )
  .from(
    ".wrap__inner-kv_master-time",
    {
      scale: 0,
      ease: "elastic.out(1, 0.35)",
      duration: 1,
      clearProps: "all",
    },
    "<0.2"
  )
  .from(
    ".wrap__inner-kv_master-phone",
    {
      scale: 0,
      ease: "elastic.out(1, 0.35)",
      duration: 1,
      clearProps: "all",
    },
    "<0.3"
  )

  // ScrollTrigger.matchMedia({



  // });

  function aniLoop() {
    gsap
      .timeline({
        delay: 0.2,
        repeat: 0,
        repeatDelay: 2,
      })
      .from(
        ".wrap__inner-kv_master-cash",
        {
          scale: 0,
          ease: "elastic.out(1, 0.35)",
          duration: 1,
          clearProps: "all",
        },
        "<"
      )
      .from(
        ".wrap__inner-kv_master-time",
        {
          scale: 0,
          ease: "elastic.out(1, 0.35)",
          duration: 1,
          clearProps: "all",
        },
        "<0.2"
      )
      .from(
        ".wrap__inner-kv_master-phone",
        {
          scale: 0,
          ease: "elastic.out(1, 0.35)",
          duration: 1,
          clearProps: "all",
        },
        "<0.3"
      )


  }
}
