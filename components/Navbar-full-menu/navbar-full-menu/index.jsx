/* eslint-disable @next/next/no-img-element */
import React from "react";
import Split from "components/Split";
import Link from "next/link";
import appData from "data/app.json";
import handleFullScreenNavbar from "common/handleFullScreenNavbar";

const NavbarFullMenu = ({ nr }) => {
  React.useEffect(() => {
    handleFullScreenNavbar();
  }, []);
  return (
    <>
      <div
      ref={nr}
        id="navi"
        className="topnav navbar change"
      >
        <div className="container-fluid">
          <div className="logo">
          <Link href="/">
                <a className="font-extrabold text-2xl leading-tight">
                MaltaKANO
                </a>
          </Link>
          </div>
          <div className="menu-icon items-center">
            <span className="icon">
              <i></i>
              <i></i>
            </span>
            <Split>
              <span className="text" data-splitting>
                <span className="menu-text">Меню</span>
              </span>
            </Split>
          </div>
        </div>
      </div>

      <div className="hamenu">
        <div className="container lg:mx-auto">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:basis-9/12 md:basis-8/12">
              <div className="menu-links">
                <ul className="main-menu">
                  <li>
                    <div className="o-hidden">
                      <Link href="/">
                        <a className="link">
                          <span className="nm">01.</span>Главная
                        </a>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="o-hidden">
                      <Link href="/">
                        <a className="link">
                          <span className="nm">02.</span>О себе
                        </a>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="o-hidden">
                      <span className="link dmenu">
                        <span className="nm">03.</span>Мой блог
                        <i className="fas fa-angle-right"></i>
                      </span>
                    </div>
                    <div className="sub-menu">
                      <ul>
                        <li>
                          <div className="o-hidden">
                            <span className="sub-link back">
                              <i className="pe-7s-angle-left"></i> Назад
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className="o-hidden">
                            <Link href="/tags/windows">
                              <a className="sub-link font-semibold">
                                <span className="nm">01.</span>Про WINDOWS
                              </a>
                            </Link>
                          </div>
                        </li>
                        <li>
                          <div className="o-hidden">
                            <Link href="/tags/drupal">
                              <a className="sub-link font-semibold">
                                <span className="nm">02.</span>Про DRUPAL
                              </a>
                            </Link>
                          </div>
                        </li>
                        <li>
                          <div className="o-hidden">
                            <Link href="/tags/react">
                              <a className="sub-link font-semibold">
                                <span className="nm">03.</span>Про REACT
                              </a>
                            </Link>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="o-hidden">
                      <Link href="#contact">
                        <a className="link">
                          <span className="nm">04.</span>Контакты
                        </a>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:basis-3/12 md:basis-4/12">
              <div className="cont-info">
                <div className="item">
                  <h6>Телефон :</h6>
                  <p>+7 (912) 345 67 89</p>
                </div>
                <div className="item">
                  <h6>Адрес :</h6>
                  <p>
                  город Кологрив, пр-т Оптимистов, 31
                  </p>
                </div>
                <div className="item">
                  <h6>E-mail :</h6>
                  <p>
                    <a href="#0">mail@prichuda.site</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarFullMenu;
