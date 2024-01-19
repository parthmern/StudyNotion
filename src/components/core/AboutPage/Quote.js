import React from "react";
import HighlightText from "../HomePage/HighlightText";

const Quote = () =>{

    return(
        <div>
            We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={"combines technology"} />, <span className="text-brown-200">expertise</span>, and community to create an <HighlightText text={"unparalleled educational experience"} />.
        </div>
    )
}

export default Quote ;
