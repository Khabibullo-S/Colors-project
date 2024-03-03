import styled from "@emotion/styled";

const getMiniPaletteStyles = () => {
  const RootDiv = styled.div`
    background-color: white;
    border-radius: 5px;
    padding: 0.5rem;
    position: relative;
    &:hover {
      cursor: pointer;
    }
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

  return { RootDiv, ColorsDiv, TitleH5, EmojiSpan, MiniColorDiv };
};

export default getMiniPaletteStyles;
