import { createGlobalStyle } from "styled-components"

// export const Colors = {
//   bodyBackground: "#F2F2F2",
//   backgroundDark: "#EDEFEF",
//   bodyColor: "#1e1e1e",
//   colorPrimary: "#273770",
//   colorSecondary: "#187918",
//   colorTertiary: "#FF7300",
//   superLightGrey: "#d6d6d6",
//   lightGrey: "#B3B3B3",
//   grey: "#666666",
//   grey500: "#9A9A9A",
//   navItemColor: "#6E6C66",
//   black: "#000000",
//   white: "#ffffff",
// }
// --body-background: ${Colors.bodyBackground};
// --background-dark: ${Colors.backgroundDark};
// --body-color: ${Colors.bodyColor};
// --color-primary: ${Colors.colorPrimary};
// --color-primary-700: ${Colors.colorPrimary700};
// --color-secondary: ${Colors.colorSecondary};
// --color-tertiary: ${Colors.colorTertiary};
// --color-secondary200: ${Colors.colorSecondary200};
// --super-light-grey: ${Colors.superLightGrey}; /*USED BY FAQs*/
// --light-grey: ${Colors.lightGrey};
// --grey: ${Colors.grey};
// --grey500: ${Colors.grey500};
// --nav-item-color: ${Colors.navItemColor};
// --black: ${Colors.black};
// --white: ${Colors.white};
// --title-font: "co-headline", sans-serif;
// --body-font: "Ubuntu", sans-serif;

export default createGlobalStyle`
  :root {
      // COLORS
    --gutter: 2rem;
    --small-gutter: 1rem;
    --big-gutter: 4rem;
    --section-gutter: 6rem;
    --mobile-section-gutter: 3rem;
    
    //FONT FAMILY
    
    --bold: 700;

    // FONT-SIZES
    --basic-font-size: 2rem;
    --mobile-font-size: 1.5rem;

    --big-title: 4.8rem;
    --supertitle-font-size: 2rem;
    --title-font-size: 5rem;
    --mobile-title-font-size: 3rem;
    --small-title: 2.5rem;
    --big-text: 2rem;
  }
`
