
export const textVariant = (delay) => {
  return {
    hidden: {
      transform: "translateY(-50%)",
      opacity: 0,
    },
    show: {
      transform: "translateY(0)",
      opacity: 1,
      transition: {
        // type: "spring",
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  }
}

export const fadeIn = (direction, type, delay, duration) => {
  return {
    hidden: {
      transform: `translateX(${direction === "left" ? 101 : direction === "right" ? -101 : 0}%) translateY(${direction === "up" ? 101 : direction === "down" ? -101 : 0}%)`,
      opacity: 0,
    },
    show: {
      transform: "translateX(0%) translateY(0%)",
      opacity: 1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeInOut",
      },
    },
  }
}

export const zoomIn = (delay, duration) => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  }
}

export const slideIn = (direction, type, delay, duration) => {
  return {
    hidden: {
      transform: `translateX(${direction === "left" ? -100 : direction === "right" ? 100 : 0}%) translateY(${direction === "up" ? 101 : direction === "down" ? -101 : 0}%)`,
      opacity: 0,
    },
    show: {
      opacity: 1,
      transform: "translateX(0%) translateY(0%)",
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeInOut",
      },
    },
  }
}

export const staggerContainer = (staggerChildren, delayChildren) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayChildren || 0,
      },
    },
  }
}
