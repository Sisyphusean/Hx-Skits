
//Import SVG as React component
import {ReactComponent as LinkSVG} from "/public/assets/link.svg"
import { ReactComponent as ArrowRightSVG } from "/public/assets/arrowRight.svg"

export function SVG(props: { className: string, type: string }) {
    const { className, type } = props
    let svg = <ArrowRightSVG className={className} />;

    if (type === "link") {
        svg = <LinkSVG className={className} />
    }


    return svg
}