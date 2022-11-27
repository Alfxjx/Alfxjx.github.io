import Image from "next/image";
import DefaultButton from "../default-button";
import { BsSun, BsMoon } from "react-icons/bs";
import { useEffect, useState } from "react";

export default function Header() {
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
    <div className="h-12 w-full fixed top-0 left-0 z-50 bg-[rgba(255, 255, 255, 0.12)] backdrop-blur-md shadow-[rgb(0 0 0 / 10%) 0px 4px 30px] flex items-center justify-between border-b border-gray-100 dark:border-gray-900">
      <div className="ml-2 flex justify-start items-center">
        <Image src="/favicon.ico" width={24} height={24} alt="" />
        <span>Alfr3d</span>
      </div>
      <div className="mr-2 flex justify-start items-center">
        <DefaultButton onClick={handleTheme}>
          <ThemeButton light={isLight}></ThemeButton>
        </DefaultButton>
      </div>
    </div>
  );
}

function ThemeButton({ light }: { light: boolean }) {
  return light ? <BsMoon /> : <BsSun />;
}
