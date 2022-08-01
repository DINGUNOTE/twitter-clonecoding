import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  *, *:before, *:after{box-sizing:border-box;}
  html, body, #root{height:100%;}
  html{font-size:16px;font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;color:#222;}

  body{display:flex;align-items:center;justify-content:center;}
  #root{position:relative;padding:1rem 0;width:100%;max-width:30rem;box-shadow:0 7px 29px 0 hsl(240deg 5% 41% / 20%);overflow:hidden;}
  main{padding:0 1rem;height:calc(100% - 4rem);overflow-y:auto;}


  input, textarea, button{padding:0 1rem;display:flex;align-items:center;justify-content:center;gap:0.5rem;width:100%;height:3rem;font-family:inherit;font-size:1rem;background:none;border:2px solid transparent;border-radius:8px;outline:none;}
  input, textarea{background-color:#f7f7f7;}
  input::placeholder, textarea::placeholder{font-size:1rem;color:#c1bec1}
  input:not([type="submit"]):focus, textarea:focus{background-color:#fff;border:2px solid #edeced;}
  input[type="submit"], button{color:#fff;background-color:#ee6723;cursor:pointer;}

  textarea{padding:0.5rem 1rem 2rem;height:9rem;resize:none;}

  a{all:unset;cursor:pointer;}

`;

export default GlobalStyle;
