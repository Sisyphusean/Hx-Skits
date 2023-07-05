
//Import SVG as React component
import {ReactComponent as LinkSVG} from "../../assets/link.svg"
import { ReactComponent as ArrowRightSVG } from "../../assets/arrowRight.svg"

export function SVG(props: { className: string, type: string }) {
    const { className, type } = props
    let svg = <ArrowRightSVG className={className} />;

    if (type === "link") {
        svg = <LinkSVG className={className} />
    }


    return svg
}