import Link from "next/link";
import { Cake, Sparkles, Heart, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroCtas } from "@/components/HeroCtas";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5 px-4 py-28 md:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(236,72,153,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(251,207,232,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Ccircle fill=%22%23ffffff%22 fill-opacity=%220.025%22 cx=%221%22 cy=%221%22 r=%221%22/%3E%3C/g%3E%3C/svg%3E')] opacity-90" />
        <div className="container relative mx-auto max-w-4xl text-center">
          <p className="font-heading text-sm font-medium uppercase tracking-[0.3em] text-pink-400/90 md:text-base">
            Butik Pastane & Fırın
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-pink-300 via-pink-400 to-rose-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(236,72,153,0.4)]">
              Trey&apos;s Bakery
            </span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 md:text-xl">
            Tatlı krizinin en şık hali
          </p>
          <HeroCtas />
        </div>
      </section>

      {/* Intro */}
      <section className="relative border-b border-white/5 px-4 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent" />
        <div className="container relative mx-auto max-w-4xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-pink-400/80">
              Biz kimiz
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-white md:text-4xl">
              Her dilim bir hikaye
            </h2>
            <p className="mt-6 font-heading text-lg leading-relaxed text-zinc-400 md:text-xl">
              Trey&apos;s Bakery olarak her tatlıyı özenle, taze malzemelerle ve sizin için özel tasarlıyoruz.
              Doğum günü pastalarından düğün kurabiyelerine, günlük atıştırmalıklardan özel günlere kadar
              tatlı krizinize en şık çözümü sunuyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Değerler / Neden biz */}
      <section className="border-b border-white/5 px-4 py-20 md:py-28">
        <div className="container mx-auto max-w-5xl">
          <p className="text-center font-heading text-sm font-medium uppercase tracking-[0.2em] text-pink-400/80">
            Neden Trey&apos;s Bakery
          </p>
          <h2 className="mt-3 text-center font-heading text-3xl font-semibold text-white md:text-4xl">
            Farkımız
          </h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-xl shadow-black/20 transition-all duration-300 hover:border-pink-400/20 hover:bg-white/[0.05] hover:shadow-pink-500/10">
              <div className="mb-5 inline-flex rounded-xl border border-pink-400/30 bg-pink-500/10 p-4">
                <Sparkles className="size-8 text-pink-400" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white">Özenle hazırlanan menü</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Pastalar, kurabiyeler ve cupcake&apos;lerimiz her gün taze, kaliteli malzemelerle ve
                el işçiliğiyle hazırlanıyor.
              </p>
            </div>
            <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-xl shadow-black/20 transition-all duration-300 hover:border-pink-400/20 hover:bg-white/[0.05] hover:shadow-pink-500/10">
              <div className="mb-5 inline-flex rounded-xl border border-pink-400/30 bg-pink-500/10 p-4">
                <Heart className="size-8 text-pink-400" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white">Özel günler için özel tatlılar</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Doğum günü, yıldönümü veya kurumsal etkinlikler için kişiye özel tasarım ve lezzet.
                İstediğiniz aroma ve süslemeyi birlikte belirliyoruz.
              </p>
            </div>
            <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-xl shadow-black/20 transition-all duration-300 hover:border-pink-400/20 hover:bg-white/[0.05] hover:shadow-pink-500/10">
              <div className="mb-5 inline-flex rounded-xl border border-pink-400/30 bg-pink-500/10 p-4">
                <Coffee className="size-8 text-pink-400" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white">Sıcak karşılama</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Los Santos&apos;ta butik bir mekanda sizi bekliyoruz. Kahvenizi yudumlarken
                tatlılarımızı keşfedin.
              </p>
            </div>
          </div>
          <div className="mt-14 flex justify-center">
            <Button
              asChild
              variant="outline"
              className="rounded-xl border-pink-400/40 bg-transparent px-8 py-6 text-pink-300 hover:bg-pink-500/10 hover:border-pink-400/60 hover:text-pink-200"
            >
              <Link href="/about">Hakkımızda</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-4 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(236,72,153,0.12),transparent)]" />
        <div className="container relative mx-auto max-w-3xl text-center">
          <Cake className="mx-auto size-14 text-pink-400/80" />
          <h2 className="mt-6 font-heading text-3xl font-semibold text-white md:text-4xl">
            Menümüzü keşfedin
          </h2>
          <p className="mt-4 text-zinc-400">
            Tatlılarımızı inceleyin, özel siparişinizi oluşturun.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="rounded-xl bg-pink-500 px-8 py-6 text-base font-medium text-white shadow-lg shadow-pink-500/25 hover:bg-pink-600"
            >
              <Link href="/menu">Menüyü Gör</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
