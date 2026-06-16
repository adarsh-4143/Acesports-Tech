import type { Metadata } from "next";
import Hero from "@/components/Hero";
import AnimatedBackgroundLight from "@/components/AnimatedBackgroundLight";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | ACE Sports Tech",
  description: "Cancellation and refund terms for sports infrastructure projects, product orders, and service agreements with ACE Sports Tech Pvt. Ltd.",
};

export default function RefundPolicyPage() {
  return (
    <>
      <Hero
        variant="page"
        eyebrow="Refunds"
        headline="Cancellation & Refund Policy"
        subheadline="Understand our guidelines on project cancellations, refunds of booking amounts, and material delivery agreements."
      />

      <section className="relative section-pad overflow-hidden bg-white">
        <AnimatedBackgroundLight />

        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-10">
          <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed text-sm">
            
            <div className="glass-light p-8 border-l-4 border-[#007AFF] mb-8">
              <p className="font-medium text-slate-800 text-base">
                At ACE Sports Tech Pvt. Ltd., we pride ourselves on transparency and standard contract management. Below are the terms concerning cancellation of services, material procurement, and corresponding refund processes.
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Last updated: June 16, 2026
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-black uppercase text-slate-900 tracking-wide mb-3">
                1. Infrastructure Project Cancellations
              </h2>
              <p>
                Our sports infrastructure projects (e.g., track laying, turf installation, court design, stadium lights setting) are executed in structured milestones defined in our project contracts.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li><strong>Advance/Booking Payment:</strong> Once a project booking amount or mobilization advance is paid and material procurement or site mobilization has initiated, this amount is non-refundable.</li>
                <li><strong>Cancellation Prior to Mobilization:</strong> If a client requests cancellation before materials are ordered or shipped, and before field engineering teams are deployed, a partial refund may be issued after deducting design, consulting, and administrative costs.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-display font-black uppercase text-slate-900 tracking-wide mb-3">
                2. Material Procurement & Custom Orders
              </h2>
              <p>
                Due to the highly customized nature of sports infrastructure components (such as IAAF certified track polyurethane, FIFA standard artificial turf, and customized arena lighting poles):
              </p>
              <p className="mt-2">
                Orders placed for imported materials or custom manufactured components cannot be cancelled or refunded once production has commenced or the import logistics cycle is active.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-black uppercase text-slate-900 tracking-wide mb-3">
                3. Milestone-Based Refunds
              </h2>
              <p>
                For contracts involving multiple milestone billing:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Payments made for completed milestones (e.g., base civil layout completion) are final and non-refundable.</li>
                <li>In case of mutual project termination, audit of completed work against payments made will be conducted. Any surplus funds held for unexecuted work segments (excluding already procured materials) will be refunded.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-display font-black uppercase text-slate-900 tracking-wide mb-3">
                4. Refund Processing Timeline
              </h2>
              <p>
                Approved refunds will be processed via bank transfer to the client&apos;s registered corporate or personal bank account.
              </p>
              <p className="mt-2">
                The processing timeline for approved refunds is typically <strong>14 working days</strong> from the date of mutual signing of the project closure or cancellation agreement.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-black uppercase text-slate-900 tracking-wide mb-3">
                5. Resolution of Disagreements
              </h2>
              <p>
                In cases of disputes regarding cancellation charges or refund calculations, the client and ACE Sports Tech Pvt. Ltd. agree to first attempt resolving the issue through amicable direct mediation. If unresolved, arbitration and legal dispute resolution terms as per the primary project agreement will apply under Delhi Jurisdiction.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-black uppercase text-slate-900 tracking-wide mb-3">
                6. Contact for Policy Concerns
              </h2>
              <p>
                If you wish to request cancellation of a service order, track a refund, or discuss terms, please email our billing department:
              </p>
              <div className="mt-4 p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <p className="font-semibold text-slate-800">Accounts & Billing — ACE Sports Tech Pvt. Ltd.</p>
                <p>Email: enquire.acesports@gmail.com / info@acesportstech.com</p>
                <p>Phone: +91 73680 40888 / +91 98189 33156</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
