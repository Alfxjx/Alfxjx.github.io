import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Drawer } from "../components/layout/Drawer/index";

export default function Home() {
  return (
    <main className="w-full min-h-screen relative flex flex-col items-center bg-white dark:bg-gray-800 text-black dark:text-gray-300">
      <Header></Header>
      <main className="mt-16 flex-1 w-full text-primary-500">
        this is content
      </main>
      <Footer></Footer>
      <Drawer></Drawer>
    </main>
  );
}
