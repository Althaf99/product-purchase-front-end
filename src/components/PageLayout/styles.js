import { css } from "@emotion/react";
import { colorPallet } from "../../constents";
const styles = (theme) => {
  const gridContainer = css`
    flex-direction: column;
    flex-wrap: nowrap;
    background-color: #ffffff;
    padding: 90px;
    min-height: 100vh;
    padding-top: 20px;
  `;
  const headingTitle = css`
    font-family: Satoshi, sans-serif;
    letter-spacing: 0.15em;
    font-weight: 600 !important;
    font-style: normal !important;
    font-weight: 900;
    font-size: 36px !important;
    line-height: 38px;
    color: ${colorPallet.black};
    text-transform: uppercase;
  `;
  const helperTextSection = css`
    padding-top: 15px;
  `;
  const section = css`
    padding-top: 30px;
  `;
  const pageActions = css`
    padding-bottom: 20px;
  `;

  const roleName = css`
    padding-top: 24px;
    text-transform: uppercase;
  `;

  const icon = css`
    width: 58px;
    height: 58px;
  `;

  return {
    gridContainer,
    headingTitle,
    helperTextSection,
    section,
    pageActions,
    icon,
    roleName,
  };
};

export default styles;
