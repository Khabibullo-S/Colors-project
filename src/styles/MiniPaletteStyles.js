import styled from "@emotion/styled";

const getMiniPaletteStyles = () => {
  const RootDiv = styled.div`
    background-color: white;
    border-radius: 5px;
    padding: 0.5rem;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    z-index: 10;
  `;
  const ColorsDiv = styled.div`
    height: 120px;
    width: 100%;
    background-color: #dae1e4;
    border-radius: 5px;
    overflow: hidden;
  `;
  const TitleH5 = styled.h5`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    color: black;
    padding-top: 0.5rem;
    position: relative;
  `;
  const EmojiSpan = styled.span`
    margin-left: 0.5rem;
    // font-size: 1.5rem;
  `;
  const MiniColorDiv = styled.div`
    height: 25%;
    width: 20%;
    display: inline-block;
    margin: 0 auto;
    position: relative;
    margin-bottom: -4px;
  `;
  const IconDiv = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    width: 30px;
    height: 30px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: white;
    background-color: #eb3d30;
    opacity: 0;
    transition: all 0.3s ease-in-out;
    ${RootDiv}:hover & {
      opacity: 0.9;
    }
    ${RootDiv}:hover &:hover {
      opacity: 1;
    }
  `;

  return { RootDiv, ColorsDiv, TitleH5, EmojiSpan, MiniColorDiv, IconDiv };
};

export default getMiniPaletteStyles;
