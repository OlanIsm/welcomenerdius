import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { EndingAndFooter } from "../components/EndingAndFooter";

export function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p className="mt-2 font-body text-sm font-bold text-[#7D6145]">
            Last updated: November 21, 2026
          </p>

          <div className="mt-8 space-y-6 font-body text-[0.98rem] font-semibold leading-relaxed text-[#4A3321]">
            <section>
              <h2 className="font-display text-xl font-black text-[#2B1C10]">1. Acceptance of Terms</h2>
              <p className="mt-2">
                By accessing this website or playing Nerdius at https://nerdius.vercel.app, you agree to these Terms of Service. If you do not agree, please discontinue use of the service.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-black text-[#2B1C10]">2. Educational Purpose</h2>
              <p className="mt-2">
                Nerdius is an interactive educational fantasy RPG designed to make studying more engaging. Generated quizzes and explanations are study aids and should be verified against your official course materials for exams or graded assignments.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-black text-[#2B1C10]">3. User-Uploaded Study Materials</h2>
              <p className="mt-2">
                You retain ownership of any lecture notes or documents you upload. You confirm that you have the right to upload those files for personal study use and agree not to upload unlawful, harmful, or malicious content.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-black text-[#2B1C10]">4. Accounts &amp; Fair Play</h2>
              <p className="mt-2">
                You are responsible for keeping your account credentials secure. Attempting to exploit, reverse-engineer, overload, or disrupt Nerdius servers or other players is prohibited and may result in account suspension.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-black text-[#2B1C10]">5. Intellectual Property</h2>
              <p className="mt-2">
                All Nerdius artwork, hand-drawn characters, animations, audio, UI assets, and source code belong to Nerdius and its creators. You may not copy, resell, or redistribute game assets without prior written permission.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-black text-[#2B1C10]">6. Service Availability &amp; Changes</h2>
              <p className="mt-2">
                Nerdius is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; We may update features, game balance, or these Terms from time to time. Continued use after updates constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-black text-[#2B1C10]">7. Contact Us</h2>
              <p className="mt-2">
                For support or questions regarding these Terms, contact{" "}
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
