import Calculator from "@/components/calculator/Calculator"

export default function Home() {
  return (
    <div className="min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <div className="w-[1000px] h-auto bg-amber-100 m-auto">
      <h1 className="text-center size-10 text-black w-max m-auto">Hi Welcome to the BiteBit!</h1>
      <Calculator/>
      </div>
    </div>
  );
}
