import { ModeToggle } from "@/components/ThemeToggle";
import { UrlShortnerArea } from "@/components/UrlShortnerArea";

export default function Home() {
  return (
    <div className="space-y-5 mx-auto max-w-xl py-12 md:py-20">
      <span className="absolute left-4 top-4">
        <ModeToggle />
      </span>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Encurtador de Url</h1>
        <p>Encurte urls e compartilhe-as com facilidade</p>
      </div>
      <UrlShortnerArea />

    </div>
  );
}
