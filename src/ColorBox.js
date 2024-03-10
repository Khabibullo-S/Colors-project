import React, { useState, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import getColorBoxStyles from "./styles/ColorBoxStyles";

const ColorBox = ({ name, background, id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  const changeCopyState = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  /* EMOTION STYLES */
  let {
    DefDarkTextSpan,
    DefLightTextSpan,
    ColorBoxDiv,
    CopyButton,
    CopyOverlayDiv,
    CopyMessageDiv,
    BoxContentDiv,
    SeeMoreSpan,
  } = useMemo(() => getColorBoxStyles(background), [background]);
  /* END OF STYLES */

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <ColorBoxDiv>
        <CopyOverlayDiv
          className={`${copied && " show"}`}
          // style={{ background }}
        ></CopyOverlayDiv>

        <CopyMessageDiv className={`${copied && " show"}`}>
          <h1>copied!</h1>
          <p>
            <DefLightTextSpan>{background}</DefLightTextSpan>
          </p>
        </CopyMessageDiv>

        <BoxContentDiv>
          <span>
            <DefDarkTextSpan>{name}</DefDarkTextSpan>
          </span>
        </BoxContentDiv>

        <CopyButton>
          <DefLightTextSpan>Copy</DefLightTextSpan>
        </CopyButton>

        {id && (
          <Link
            to={`${location.pathname}/${id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <SeeMoreSpan>
              <DefLightTextSpan>More</DefLightTextSpan>
            </SeeMoreSpan>
          </Link>
        )}
      </ColorBoxDiv>
    </CopyToClipboard>
  );
};

export default ColorBox;
