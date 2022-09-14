import * as React from "react"
import { Meta, MetaProps } from "components/meta"
import Head from 'next/head'
import Footer from "components/Footer"
import Cursor from "components/Cursor"
import ScrollToTop from "components/Scroll-to-top"
import NavbarFullMenu from "components/Navbar-full-menu/navbar-full-menu"

export interface LayoutProps {
	meta?: MetaProps
  children?: React.ReactNode
}

export function Layout({ meta, children }: LayoutProps) {
		const fixedSlider = React.useRef(null);
  const MainContent = React.useRef(null);
  const navbarRef = React.useRef(null);
  React.useEffect(() => {
    setInterval(() => {
      if (fixedSlider.current) {
        var slidHeight = fixedSlider.current.offsetHeight;
      }
      if (MainContent.current) {
        MainContent.current.style.marginTop = slidHeight + "px";
      }
    }, 1000);
    var navbar = navbarRef.current;
    if (window.pageYOffset > 300) {
      navbar.classList.add("nav-scroll");
    } else {
      navbar.classList.remove("nav-scroll");
    }
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        navbar.classList.add("nav-scroll");
      } else {
        navbar.classList.remove("nav-scroll");
      }
    });
  }, [fixedSlider, MainContent, navbarRef]);
  
  return (
  <>
	  <Meta {...meta} />
	  <Cursor />
		<ScrollToTop />
		<NavbarFullMenu nr={navbarRef} />
    <div className="flex flex-col min-h-screen">
     {children}
     <Footer />
    </div>
   </>
  );
};
