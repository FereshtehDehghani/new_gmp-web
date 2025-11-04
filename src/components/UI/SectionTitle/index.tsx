import React from "react";
import Typography from "../Typography";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

interface SectionTitleProps {
  title?: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, className }) => {
  return (
    <div className={cn("flex items-center justify-start gap-1 rtl", className)}>
      <Icon icon='majesticons:atom-2' width='24' height='24' />
      <Typography type='h1' color='primary'>
        {title}
      </Typography>
    </div>
  );
};

export default SectionTitle;
