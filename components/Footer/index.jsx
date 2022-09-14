/* eslint-disable @next/next/no-img-element */
import React from "react";
import appData from "data/app.json";
import { FormContact } from "components/form--contact"

const Footer = () => {
  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }
  const sendEmail = (ms) => new Promise((r) => setTimeout(r, ms));
  return (
    <footer className="footer-half px-4 sub-bg section-padding pb-0">
      <div className="container lg:mx-auto ">
        <div className="flex flex-col lg:flex-row">
          <div className="basis-5/12">
            <div className="cont">
              <div className="logo">
                <a className="font-extrabold text-2xl leading-tight" href="#0">
                MaltaKANO
                </a>
              </div>
              <div className="con-info custom-font">
                <ul>
                  <li>
                    <span>E-mail : </span> mail@prichuda.site
                  </li>
                  <li>
                    <span>Адрес : </span> город Кологрив, пр-т Оптимистов, 31.
                  </li>
                  <li>
                    <span>Телефон : </span> +7 (912) 345 67 89
                  </li>
                </ul>
              </div>
              <div className="social-icon">
                <h6 className="custom-font stit simple-btn">Я не в соц.сетях</h6>
                <div className="social">
                  <a href="#0" className="icon">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#0" className="icon">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#0" className="icon">
                    <i className="fab fa-pinterest"></i>
                  </a>
                  <a href="#0" className="icon">
                    <i className="fab fa-behance"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-2/12"></div>
          <div className="basis-5/12" id="contact">
            <div className="subscribe">
              <h6 className="custom-font stit simple-btn">Связь со мной</h6>
              <p>Пишите что хотите мне сказать.</p>
              <FormContact />
            </div>
          </div>
        </div>
        <div className="copyrights text-center">
          <p>
            © 2022, Блог убежденной оптимистки
            <a className="pl-2.5" href="https://prichuda.one">MaltaKANO</a>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
