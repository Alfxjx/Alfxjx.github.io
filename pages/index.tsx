import Header from "../components/buttons/layout/header";
import Footer from "../components/buttons/layout/footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-white dark:bg-gray-900 text-black dark:text-gray-300">
      <Header></Header>
      <main className="mt-12 flex-1 w-full">
        this is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is contentthis is
        content
      </main>
      <Footer></Footer>
    </main>
  );
}
