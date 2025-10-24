"use client";

import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { navigtaionConfig } from "@/lib/configs/navigationConfig";
import { motion } from "framer-motion";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className='absolute flex flex-row bottom-0 md:right-0 bg-primary w-full md:w-auto h-auto md:h-full'>
      <div className='flex flex-row md:flex-col items-center justify-between w-full md:justify-start px-4 md:gap-8 md:py-24 py-4 md:px-8 relative'>
        <p className='text-white font-bold hidden md:block'>APP LOGO</p>

        {navigtaionConfig.map((nav) => (
          <Link href={nav.link} key={nav.title} className='w-auto relative'>
            <button
              type='button'
              className={cn(
                "flex justify-start md:justify-start items-center flex-col md:flex-row gap-1 md:gap-4 px-4 md:px-6 md:py-2 md:w-[160] relative",
                pathname === nav.link && "md:bg-secondary md:rounded-2xl"
              )}
            >
              {/* Simple background fade
              {pathname === nav.link && (
                <motion.div
                  className="absolute inset-0 bg-secondary md:rounded-2xl -z-10"
                  initial={{ opacity:  0}}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )} */}

              <div
                className={cn(
                  pathname === nav.link &&
                    "bg-secondary-light md:bg-transparent px-3 py-1 md:py-0 md:px-0 rounded-lg md:rounded-none"
                )}
              >
                <div
                  key={pathname === nav.link ? "active" : "inactive"}
               
                >
                  <Icon
                    icon={
                      pathname === nav.link
                        ? nav.activeIconName
                        : nav.inactiveIconName
                    }
                    width='24'
                    height='24'
                    className={cn(
                      pathname === nav.link
                        ? "text-secondary md:text-white"
                        : "text-white w-6 h-6"
                    )}
                  />
                </div>
              </div>

              <p
                className={cn(
                  pathname === nav.link ? "text-secondary md:text-white" : "text-white",
                  "text-sm relative z-10"
                )}
                
              >
                {nav.title}
              </p>
            </button>

            {/* Mobile Indicator */}
            {pathname === nav.link && (
              <motion.div
                className="absolute -bottom-4 left-1/2 w-12 h-1 bg-secondary rounded-sm md:hidden"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ x: "-50%" }}
              />
            )}

            {/* Desktop Indicator */}
            {pathname === nav.link && (
              <motion.div
                className="absolute -right-8 top-1/2 w-1 h-8 bg-secondary rounded-sm hidden md:block"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.3 }}
                style={{ y: "-50%" }}
              />
            )}
          </Link>
        ))}
      </div>
      
      <div className='hidden md:inline-block h-full w-8 absolute left-0 bg-white rounded-tr-2xl rounded-br-2xl -translate-x-1/2' />
    </nav>
  );
};

export default Navigation;