const REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const ColorConst = {
    DEEP_GREEN: "#23887c",
    LIGHT_GREEN: "rgb(150,232,220)",
    NEUTRAL_LIGHT: "#EBF0FF",
    NEUTRAL_GREY: "#9098B1",
    NEUTRAL_DARK: "#223263",
    PRIMARY_YELLOW: "#FFC833",
    PRIMARY_RED: "#FB7181"
}

const METHOD = {
    GET: "GET",
    PUT: "PUT",
    DELETE: "DELETE",
    POST: "POST"
}

export { REGEX, ColorConst, METHOD }