"use client";
import React from "react";
import Marquee from "react-fast-marquee";
import { companies } from "@/app/data";
import Img from "../../Global/Img";
import style from "./Companies.module.css";
import Link from "next/link";

type Props = {};

const Companies = (props: Props) => {
  return (
    <>
      <section className={`my-24 ${style.section}`}>
        <Marquee pauseOnHover speed={40} pauseOnClick autoFill>
          {companies.map((company) => {
            return (
              <Link
                key={company.id}
                href={company.homepage}
                className="mr-12 relative flex items-center justify-center text-center"
              >
                <Img
                  alternative={`${company.name} image`}
                  url={company.logo_path}
                  size="w92"
                />
              </Link>
            );
          })}
        </Marquee>
      </section>
    </>
  );
};

export default Companies;
