"use client";
import React from "react";
import Marquee from "react-fast-marquee";
import { companies } from "@/app/data";
import Img from "../../Global/Img";
import style from "./Companies.module.css";
import Link from "next/link";
import SectionDevider from "../../Global/SectionDevider";
import { motion } from "framer-motion";
import { scaleOpacity } from "../../../animations/animation";

type Props = {};

const Companies = (props: Props) => {
  return (
    <>
      <motion.section
        variants={scaleOpacity}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        id="companies"
        className={`mt-20 mb-40 ${style.section}`}
      >
        <SectionDevider title="Companies" path="#companies" />
        <p className="text-center mx-auto mt-4 min-w-[300px] max-w-[60%] leading-8 tracking-wide text-text-dark">
          <span className="text-main-green p-0.5 ">MOVIE CITY</span> website
          contains thousands of movies and series that produced by most famous
          companies all around the world such as :
        </p>
        <Marquee
          pauseOnHover
          speed={40}
          pauseOnClick
          autoFill
          className="mt-10"
        >
          {companies.map((company) => {
            return (
              <Link
                key={company.id}
                href={company.homepage}
                className="mr-12 relative flex items-center justify-center text-center bg-header-color"
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
      </motion.section>
    </>
  );
};

export default Companies;
