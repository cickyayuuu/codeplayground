export const fadeInOut = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },  // ✅ Fade in properly
    exit: { opacity: 0, transition: { duration: 0.5 } }, // ✅ Smooth fade-out
  };
  
  export const slideUpOut = {
    initial: { opacity: 0 , y: 50},
    animate: { opacity: 1, y: 0},  // ✅ Fade in properly
    exit: { opacity: 0, y: 50, transition: { duration: 0.5 } }, // ✅ Smooth fade-out
  };
