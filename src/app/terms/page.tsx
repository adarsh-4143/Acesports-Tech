import type { Metadata } from "next";
import Hero from "@/components/Hero";
import AnimatedBackgroundLight from "@/components/AnimatedBackgroundLight";

export const metadata: Metadata = {
  title: "Terms & Conditions | ACE Sports Tech",
  description: "Terms and conditions governing the use of services and project delivery by ACE Sports Tech Pvt. Ltd.",
};

export default function TermsPage() {
  return (
    <>
      <Hero
        variant="page"
        eyebrow="Legal"
        headline="Terms & Conditions"
        subheadline="Please read these terms and conditions carefully before using our services or collaborating on sports infrastructure projects."
      />

      <section className="relative section-pad overflow-hidden bg-white">
        <AnimatedBackgroundLight />

        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-10">
          <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed text-sm">
            
            <div className="glass-light p-8 border-l-4 border-[#007AFF] mb-8">
              <p className="font-medium text-slate-800 text-base">
                Welcome to ACE Sports Tech Pvt. Ltd. These Terms & Conditions govern your relationship with us regarding our sports infrastructure services, website, consultations, and project contracts.
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Last updated: June 16, 2026
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-black uppercase text-slate-900 tracking-wide mb-3">
                1. Agreement to Terms
              </h2>
              <p>
                By accessing our website, requesting a project quotation, or entering into a contractual agreement with ACE Sports Tech Pvt. Ltd., you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you must not access our website or utilize our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-black uppercase text-slate-900 tracking-wide mb-3">
                2. Scope of Services & Project Estimation
              </h2>
              <p>
                ACE Sports Tech Pvt. Ltd. provides comprehensive sports infrastructure solutions, including design, surface installation, lighting, and general sports arena construction.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>All project estimations, layout plans, and drawings shared before formal agreement are proprietary and tentative.</li>
                <li>Final costs, deliverables, timelines, and technical specifications are subject to the signed contract and finalized work orders.</li>
                <li>Site preparation and basic civil work guidelines will be provided by us, but execution is the responsibility of the client unless explicitly stated in the contract.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-display font-black uppercase text-slate-900 tracking-wide mb-3">
                3. Intellectual Property
              </h2>
              <p>
                The content, design, layouts, customized engineering specifications, graphics, logos, and digital representations featured on our website and in project proposals are the exclusive property of ACE Sports Tech Pvt. Ltd. and are protected by applicable intellectual property laws.
              </p>
              <p className="mt-2">
                Unauthorized use, reproduction, or distribution of our proprietary design guidelines, pricing sheets, or technical documents without written consent is strictly prohibited.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-black uppercase text-slate-900 tracking-wide mb-3">
                4. Client Obligations
              </h2>
              <p>
                To ensure high-performance execution of sports flooring and track installations, clients must:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Provide clean, unobstructed, and level sub-bases meeting the specified slope and drainage standards.</li>
                <li>Ensure access to necessary utilities, including power and water, during the installation phase.</li>
                <li>Secure required local authority clearances, permits, and NOCs prior to construction commencement.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-display font-black uppercase text-slate-900 tracking-wide mb-3">
                5. Limitation of Liability
              </h2>
              <p>
                ACE Sports Tech Pvt. Ltd. will not be liable for any delays or failures in performance resulting from Acts of God, adverse weather conditions, site-readiness delays by the client, labor strikes, material supply chain disruptions, or external regulatory changes.
              </p>
              <p className="mt-2">
                Our total liability under any claim arising from project execution shall not exceed the total amount paid by the client under the specific service agreement or work order.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-black uppercase text-slate-900 tracking-wide mb-3">
                6. Governing Law
              </h2>
              <p>
                These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-black uppercase text-slate-900 tracking-wide mb-3">
                7. Contact Information
              </h2>
              <p>
                For questions or clarifications regarding our Terms & Conditions, please contact us at:
              </p>
              <div className="mt-4 p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <p className="font-semibold text-slate-800">ACE Sports Tech Pvt. Ltd.</p>
                <p>Address: J39 Centre Portion, West Patel Nagar, New Delhi – 110008</p>
                <p>Email: inquire.acesports@gmail.com / info@acesportstech.com</p>
                <p>Phone: +91 73680 40888 / +91 98189 33156</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
