import Link from "next/link";
import { Cake, Heart, Award, Leaf, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
      <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-pink-400/80">
        Hakkımızda
      </p>
      <h1 className="mt-3 font-heading text-4xl font-semibold text-white md:text-5xl">
        Trey&apos;s Bakery hikayesi
      </h1>

      {/* Ana metin */}
      <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-10 shadow-xl shadow-black/20 md:p-14">
        <div className="flex justify-center">
          <div className="rounded-full border border-pink-400/30 bg-gradient-to-b from-pink-500/10 to-transparent p-10">
            <Cake className="size-24 text-pink-400/90" />
          </div>
        </div>
        <p className="mt-10 text-center font-heading text-lg leading-relaxed text-zinc-300 md:text-xl">
          Trey&apos;s Bakery, Los Santos&apos;ta butik bir pastane ve fırın olarak kuruldu.
          Amacımız, her ısırıkta kalite ve estetiği bir arada sunmak; doğum günü pastalarından
          düğün kurabiyelerine, günlük atıştırmalıklardan özel günlere kadar tatlı krizinize
          en şık çözümü getirmek.
        </p>
        <p className="mt-6 text-center font-heading text-base leading-relaxed text-zinc-400">
          <Heart className="inline size-5 text-pink-400" /> Her tatlı, sizin için özenle hazırlanıyor.
        </p>
      </div>

      {/* Değerler */}
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-xl shadow-black/20">
          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-xl border border-pink-400/30 bg-pink-500/10 p-3">
              <Leaf className="size-6 text-pink-400" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold text-white">Taze & Kaliteli</h3>
              <p className="mt-2 text-zinc-400 leading-relaxed">
                Sadece taze malzemeler kullanıyoruz. Mevsimine uygun, mümkün olduğunca doğal
                içeriklerle tatlılarımızı hazırlıyoruz.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-xl shadow-black/20">
          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-xl border border-pink-400/30 bg-pink-500/10 p-3">
              <Award className="size-6 text-pink-400" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold text-white">El işçiliği</h3>
              <p className="mt-2 text-zinc-400 leading-relaxed">
                Her pasta ve kurabiye el yapımı. Seri üretim yok; her sipariş özel ve
                kişiye özel tasarıma açık.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Çalışma saati vurgusu */}
      <div className="mt-12 rounded-2xl border border-pink-400/20 bg-pink-500/10 p-8 text-center md:p-10">
        <Clock className="mx-auto size-10 text-pink-400" />
        <h3 className="mt-4 font-heading text-xl font-semibold text-white">Bizi ziyaret edin</h3>
        <p className="mt-2 text-zinc-300">
          Hawick&apos;te, Trey&apos;s Bakery&apos;de sıcak bir karşılama ve taze tatlılar sizi bekliyor.
        </p>
        <Button asChild variant="outline" className="mt-6 rounded-xl border-pink-400/50 text-pink-300 hover:bg-pink-500/15">
          <Link href="/contact">İletişim & Adres</Link>
        </Button>
      </div>
    </div>
  );
}
