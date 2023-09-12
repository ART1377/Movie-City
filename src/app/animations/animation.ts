// Hero
export const heroContainer = {
  hidden: { opacity: 0, y: "-100vh" },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};
export const heroInfo = {
  hidden: { opacity: 0, x: "-100vw" },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};
export const heroSmallImages = {
  hidden: { opacity: 0, x: "100vw" },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      mass: 0.5,
    },
  },
};

// scale and opacity sections
export const scaleOpacity = {
  hidden: { opacity: 0, scale: 0.7 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

// scale and opacity
export const navbarItem = {
    scale: 1.1,x:4,
    transition: { duration: .3 },
  
};

// Episode
export const episodeScale = {
  hidden: { scale: 1 },
  show: {
    scale: [1, 1.05, 1, 1.05, 1],
    transition: { duration: 0.5 },
  },
};
