import { useEffect } from "react";
import { useViewportStore } from "../../services/viewportservices/viewportStore";


export const useViewport = (breakpoint = 768) => {
  const { isMobile, setIsMobile } = useViewportStore();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint, setIsMobile]);

  return isMobile;
};