import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
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

  const isDarkColor = chroma(background).luminance() <= 0.08;
  const isLightColor = chroma(background).luminance() >= 0.7;

  /* EMOTION STYLES */
  const DefLightText = styled.span`
    color: ${isLightColor ? "rgba(0,0,0,0.6)" : "white"};
  `;
  const DefDarkText = styled.span`
    color: ${isDarkColor ? "white" : "rgba(0,0,0,0.6)"};
    ${DefLightText} & {
      color: red;
    }
  `;
  /* END OF STYLES */

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div className="ColorBox" style={{ background }}>
        <div
          className={`copy-overlay ${copied && " show"}`}
          style={{ background }}
        ></div>
        <div className={`copy-msg ${copied && " show"}`}>
          <h1>copied!</h1>
          <p>
            <DefLightText>{background}</DefLightText>
          </p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span>
              <DefDarkText>{name}</DefDarkText>
            </span>
          </div>
          <button className="copy-button">
            <DefLightText>Copy</DefLightText>
          </button>
        </div>
        {id && (
          <Link
            to={`${location.pathname}/${id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="see-more">
              <DefLightText>More</DefLightText>
            </span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;
