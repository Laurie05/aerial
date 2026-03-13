import Image from "next/image";
import aboutPhoto from "./8B5A9615-2.jpg";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-silk-500 to-aerial-500 bg-clip-text text-transparent mb-8">
        About
      </h1>

      {/* About Me */}
      <section className="mb-10">
        <div className="bg-white border border-purple-100 rounded-xl overflow-hidden shadow-sm p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Framed photo */}
            <div className="shrink-0 self-center">
              <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl shadow-md">
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src={aboutPhoto}
                    alt="Laurie Luo on lyra"
                    className="w-full sm:w-56 h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
            {/* Text */}
            <div>
              <p className="text-sm text-purple-500 font-medium uppercase tracking-wide mb-1">
                Created by
              </p>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Laurie Luo
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Aerialist, mathematician, and the person behind Aerial Atlas. I train
                silks, rope, hammock, and lyra. I love the feeling of being upside
                down, and the brain-teaser of wrapping and unwrapping myself in
                creative ways. Identifying the homogeneous knots is a joy for both
                brain and body.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                I built Aerial Atlas because I couldn&apos;t find a single place
                that mapped out how aerial techniques connect &mdash; what leads
                into what, what you need to learn first, and how to string moves
                together into sequences. So I made one. The progression maps,
                sequence builder, and technique dictionary are all tools I wish
                I&apos;d had when I first started training.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Whether you&apos;re just learning your first climb or choreographing
                competition routines, I hope Aerial Atlas helps you see the bigger
                picture of how it all fits together. Happy flying!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contribute */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Contribute
        </h2>
        <div className="bg-white border border-purple-100 rounded-xl p-6 shadow-sm">
          <p className="text-gray-700 leading-relaxed mb-4">
            Aerial Atlas is a work in progress, and contributions from the
            community make it better. If you have suggestions, corrections, or
            want to help expand the technique library, I&apos;d love to hear
            from you.
          </p>
          <ul className="text-sm text-gray-600 space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">&#8226;</span>
              <span>
                Spotted a technique with the wrong difficulty or missing
                details? Let me know.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">&#8226;</span>
              <span>
                Know a sequence or progression path that&apos;s missing?
                I&apos;d love to add it.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">&#8226;</span>
              <span>
                Have a studio that should be on the map? Send me the details.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">&#8226;</span>
              <span>
                Want to help with code, design, or content? All contributions
                welcome.
              </span>
            </li>
          </ul>
          <p className="text-sm text-gray-500 mb-2 pt-2">Find me on</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.instagram.com/laurie_aerial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-silk-500/10 to-aerial-500/10 border border-purple-200 rounded-lg text-sm font-medium text-gray-700 hover:shadow-md transition-shadow"
            >
              <span className="text-silk-500">Instagram</span>
              @laurie_aerial
            </a>
            <a
              href="https://www.xiaohongshu.com/user/profile/laurieluo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-silk-500/10 to-aerial-500/10 border border-purple-200 rounded-lg text-sm font-medium text-gray-700 hover:shadow-md transition-shadow"
            >
              <span className="text-silk-500">RedNote</span>
              laurieluo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
