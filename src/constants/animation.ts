
export const pageAnimations = {
    initial: { opacity: 0, x: 0, y: "25%" },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { type: "spring", duration: 0.6 },
    exit: { opacity: 0, x: 0, y: "25%" }
}

export const slidein = {
    initial: { opacity: 0, x: "25%" },
    animate: { opacity: 1, x: 0 },
    transition: { type: "spring", duration: 0.6 },
    exit: { opacity: 0, x: "25%" },
}

export const slideout = {
    initial: { opacity: 0, x: "-25%" },
    animate: { opacity: 1, x: "0%" },
    transition: { type: "spring", duration: 0.6 },
    exit: { opacity: 0, x: "-25%%" },
}


export const opacity = {
    initial: { opacity: 0, },
    animate: { opacity: 1 },
    transition: { type: "ease-in", duration: 1},
    exit: { opacity: 0 },
}