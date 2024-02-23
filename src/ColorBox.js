import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import getColorBoxStyles from "./ColorBoxStyles";
import chroma from "chroma-js";
import styled from "@emotion/styled";

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
    DefDarkTextSC,
    DefLightTextSC,
    ColorBoxSC,
    CopyButtonSC,
    CopyOverlaySC,
    CopyMessageSC,
  } = getColorBoxStyles(background);
  /* END OF STYLES */

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <ColorBoxSC>
        <CopyOverlaySC
          className={`${copied && " show"}`}
          // style={{ background }}
        ></CopyOverlaySC>
        <CopyMessageSC className={`${copied && " show"}`}>
          <h1>copied!</h1>
          <p>
            <DefLightTextSC>{background}</DefLightTextSC>
          </p>
        </CopyMessageSC>
        <div className="copy-container">
          <div className="box-content">
            <span>
              <DefDarkTextSC>{name}</DefDarkTextSC>
            </span>
          </div>
          <CopyButtonSC>
            <DefLightTextSC>Copy</DefLightTextSC>
          </CopyButtonSC>
        </div>
        {id && (
          <Link
            to={`${location.pathname}/${id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="see-more">
              <DefLightTextSC>More</DefLightTextSC>
            </span>
          </Link>
        )}
      </ColorBoxSC>
    </CopyToClipboard>
  );
};

export default ColorBox;
