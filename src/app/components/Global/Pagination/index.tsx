"use client";
import React, { useState } from "react";
import "./Pagination.css";
// Pagination dependencies
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/bootstrap.css";

type Props = {
  total: number;
  current: number;
  setCurrent: (value: number) => void;
};

const Pagination = ({ total, current,setCurrent }: Props) => {
  return (
    <ResponsivePagination
      current={current}
      total={total}
      onPageChange={setCurrent}
      extraClassName="pb-40 mx-auto"
      maxWidth={260}
    />
  );
};

export default Pagination;
