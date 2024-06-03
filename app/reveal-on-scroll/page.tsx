import { RevealOnScroll } from "../../components/RevealOnScroll";

export default function RevealOnScrollPage() {
  return (
    <section className="bg-neutral-950 min-h-screen font-custom w-full flex justify-center items-center">
      <div>
        <RevealOnScroll>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 bg-clip-text text-transparent max-w-xl">
            Engineer. Writer. Conversationalist.
          </h1>
        </RevealOnScroll>
        <RevealOnScroll>
          <p className="text-gray-100 text-lg mt-8">
            I&apos;m Aditya - a frontend engineer by profession, a writer by
            heart <br />
            and a conversationalist by nature.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
