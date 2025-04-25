import { FaCss3, FaFile, FaHtml5, FaJs, FaMarkdown } from "react-icons/fa"
import { GrReactjs } from "react-icons/gr"
import { PiFileSvgFill } from "react-icons/pi"
import { SiGitignoredotio } from "react-icons/si"
import { VscJson } from "react-icons/vsc"

export const FileIcon = ({ extension }) => {

    const iconStyle = {
        height: "20px",
        width: "20px"
    }

    const IconMapper = {
        "js": <FaJs color="yellow" style={iconStyle} />,
        "jsx": <GrReactjs color="#61dbfa" style={iconStyle} />,
        "css": <FaCss3 color="#3c99dc" style={iconStyle} />,
        "": <FaFile color="white" style={iconStyle} />,
        "svg": <PiFileSvgFill color="white" style={iconStyle} />,
        "json": <VscJson color="#81d627" style={iconStyle} />,
        "md": <FaMarkdown color="#242323" style={iconStyle} />,
        "html": <FaHtml5 color="#e34c26" style={iconStyle} />,
        "gitignore": <SiGitignoredotio color="#242323" style={iconStyle} />

    }
    return (
        <>
          {IconMapper[extension]}
        </>
    )

}