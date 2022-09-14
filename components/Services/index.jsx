import React from "react";
import Split from "components/Split";
import Link from "next/link";
import { DiDrupal, DiNodejsSmall, DiWindows } from "react-icons/di";

const Services = () => {
  return (
    <section className="services pt-28">
      <div className="container mx-auto">
        <div className="sec-head custom-font text-center">
          <h6 className="wow fadeIn" data-wow-delay=".5s">
            Это интересно
          </h6>
          <Split>
            <h3 className="wow words chars splitting" data-splitting>
              посмотри.
            </h3>
          </Split>
          <span className="tbg">Смотри</span>
        </div>
        <div className="grid lg:grid-cols-4">
          <div
            className="item-box bg-img wow fadeInLeft"
            data-wow-delay=".3s"
            style={{ backgroundImage: "url(/img/1.jpg)" }}
          >
            <h4 className="uppercase font-bold">
            Лучшее из <br /> возможного
            </h4>
            <Link href="/articles">
              <a className="btn-curve btn-bord btn-lit mt-40">
                <span className="font-bold">Все записи</span>
              </a>
            </Link>
          </div>
          <div
            className="item-box wow fadeInLeft"
            data-wow-delay=".5s"
          >
            <span className="icon"><DiDrupal /></span>
            <h6 className="uppercase font-bold">Drupal разработка</h6>
            <p className="text-sm">
            Drupal является одной из самых популярных систем управления контентом с открытым исходным кодом.
            </p>
          </div>
          <div
            className="item-box wow fadeInLeft"
            data-wow-delay=".7s"
          >
            <span className="icon"><DiNodejsSmall /></span>
            <h6 className="uppercase font-bold">
              React и Drupal
            </h6>
            <p className="text-sm">Потенциал Drupal, объедененный с инновационными идеями позволяет создавать привлекательные сайты.</p>
          </div>
          <div
            className="item-box wow fadeInLeft"
            data-wow-delay=".9s"
          >
            <span className="icon"><DiWindows /></span>
            <h6 className="uppercase font-bold">
              Только про Windows
            </h6>
            <p className="text-sm">Советы по ремонту и настройки компьютерной техники на базе ОС Windows. Помощь и решение проблем.</p>
          </div>
        </div>
      </div>
      <div className="half-bg bottom"></div>
    </section>
  );
};

export default Services;
