import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#111827] px-6 text-white">

      <div className="relative text-center">

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[290px] w-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#bc965d]/20" />

        <div className="relative">

          <Image
            src="/images/branding/afd-white.png"
            alt="AFD"
            width={120}
            height={120}
            className="mx-auto h-20 w-auto object-contain"
          />

          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#bc965d]">
            Erreur 404
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Vous semblez vous être
            <br />
            perdu dans les données.
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-sm font-light leading-7 text-white/50">
            Cette page n&apos;existe pas, mais les données principales sont toujours intactes.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:bg-white hover:text-[#111827]"
          >
            Retour au portfolio
          </Link>

        </div>

      </div>

    </main>
  );
}