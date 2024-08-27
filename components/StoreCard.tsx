import React from "react";
import Link from "next/link";
import { Store } from "../types/Store";

interface StoreCardProps extends Store {}

const StoreCard: React.FC<StoreCardProps> = ({ id, name, description }) => {
  return (
    <Link
      href={`/stores/${id}`}
      className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 transition-colors"
    >
      <h3 className="mb-2 text-xl font-bold text-gray-900">{name}</h3>
      <p className="text-gray-700 line-clamp-2">{description}</p>
    </Link>
  );
};

export default StoreCard;
