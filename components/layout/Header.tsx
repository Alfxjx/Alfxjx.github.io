import Image from "next/image";
import { Button } from "../buttons/default-button";
import { BsSun, BsMoon } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useCycle } from "framer-motion";

export function Header() {
  const [isLight, setLight] = useState(true);

  useEffect(() => {
    const light = window.localStorage.getItem("theme") === "light" ? true : false;
    doSetTheme(light);
  }, []);

  const doSetTheme = (light: boolean) => {
    if (light) {
      document.querySelector("html")?.setAttribute("class", "dark");
      setLight(!light);
      window.localStorage.setItem("theme", "dark");
    } else {
      document.querySelector("html")?.removeAttribute("class");
      window.localStorage.setItem("theme", "light");
      setLight(!light);
    }
  };

  const handleTheme = () => {
    doSetTheme(isLight);
  };
  return (
    <div className="h-16 w-full fixed top-0 left-0 z-30 bg-[rgba(255, 255, 255, 0.12)] backdrop-blur-sm shadow-[rgb(0 0 0 / 10%) 0px 4px 30px] flex items-center justify-end">
      <div className="mr-2 flex justify-start items-center text-2xl">
        <Image src="/favicon.ico" width={36} height={36} alt="" />
        <span className="text-primary-500 mr-8">Alfr3d</span>
        <Button onClick={handleTheme} round>
          <ThemeButton light={isLight}></ThemeButton>
        </Button>
      </div>
    </div>
  );
}

function ThemeButton({ light }: { light: boolean }) {
  return light ? <BsMoon /> : <BsSun />;
}
