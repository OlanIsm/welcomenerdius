import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { EndingAndFooter } from "../components/EndingAndFooter";

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF4E6] text-[#2B1C10]">
      <header className="border-b-2 border-[#2B1C10]/15 bg-[#FFFDF7]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="inline-flex items-center gap-2 font-display text-sm font-black text-[#2B1C10] hover:text-[#C97810]">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <Link to="/">
            <img src="/assets/nerdius_title.png" alt="Nerdius" className="h-10 w-auto object-contain" />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
        <article className="rounded-2xl border-[2.5px] border-[#2B1C10] bg-[#FFFDF7] p-6 shadow-[0_12px_30px_rgba(43,28,16,0.08)] sm:p-10">
          <h1 className="font-display text-3xl font-black tracking-tight text-[#2B1C10] sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 font-body text-sm font-bold text-[#7D6145]">
            Last updated: November 21, 2026
          </p>

          <div className="mt-8 space-y-6 font-body text-[0.98rem] font-semibold leading-relaxed text-[#4A3321]">
            <section>
              <h2 className="font-display text-xl font-black text-[#2B1C10]">1. Information We Collect</h2>
              <p className="mt-2">
                When you play Nerdius (https://nerdius.vercel.app), we may collect basic account information (such as your email address and username), gameplay progress (badges, grades, study streaks), and study materials or lecture files (such as PDFs or notes) that you voluntarily upload to generate adventure quizzes.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-black text-[#2B1C10]">2. How We Use Uploaded Study Materials</h2>
              <p className="mt-2">
                Lecture notes and documents you upload are processed solely to generate your personal RPG quiz encounters and study feedback inside Nerdius. We do not sell your study files, publish them publicly, or share them with other players without your explicit consent.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-black text-[#2B1C10]">3. Cookies &amp; Local Storage</h2>
              <p className="mt-2">
                Nerdius uses essential cookies and browser local storage to keep you signed in, remember audio/display preferences, and save session progress smoothly across desktop and mobile browsers.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-black text-[#2B1C10]">4. Third-Party Services</h2>
              <p className="mt-2">
                We rely on trusted infrastructure providers (such as Vercel for web hosting and cloud services for authentication, storage, and quiz generation) that process data only as required to operate Nerdius securely.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-black text-[#2B1C10]">5. Data Retention &amp; Your Rights</h2>
              <p className="mt-2">
                You may request access to, correction of, or deletion of your account and uploaded study materials at any time by contacting us. Once deleted, your personal data and uploaded files are removed from our active systems within a reasonable timeframe.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-black text-[#2B1C10]">6. Contact Us</h2>
              <p className="mt-2">
                Questions about this Privacy Policy? Reach us at{" "}
                <a href="mailto:support@nerdius.app" className="font-extrabold text-[#2F72C4] underline">
                  support@nerdius.app
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </main>

      <EndingAndFooter />
    </div>
  );
}
