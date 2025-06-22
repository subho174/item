"use client";

import dynamic from "next/dynamic";
const ItemCard = dynamic(() => import("./ItemCard"), { ssr: false });

const ClientWrapper = ({ item }) => {
  return <ItemCard item={item} />;
};

export default ClientWrapper;
