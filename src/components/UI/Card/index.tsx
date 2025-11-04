import { cn } from "@/lib/utils";
import React from "react";

interface ICardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<ICardProps> = (props) => {
  const { children, className } = props;
  return (
    <div
      className={cn("flex w-full bg-white  rounded-2xl shadow-2xl", className && className)}
    >
      {children}
    </div>
  );
};

export default Card;
