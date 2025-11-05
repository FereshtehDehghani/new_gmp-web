import React, { ReactNode } from "react";
import Typography from "../Typography";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

interface SectionTitleProps {
  title?: string;
  className?: string;
  icon?:ReactNode
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, className,icon }) => {
  return (
    <div className={cn("flex items-center justify-start gap-1 rtl", className)}>
     {icon ??  <Icon icon='majesticons:atom-2' width='24' height='24' />}
      <Typography type='h3' color='primary'>
        {title}
      </Typography>
    </div>
  );
};

export default SectionTitle;
