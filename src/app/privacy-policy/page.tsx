import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { AnimatedText } from "@/components/ui/AnimatedText";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Visby Labs handles personal information. Draft, to be reviewed by a legal professional.",
  path: "/privacy-policy",
});

const sections = [
  {
    title: "Information we collect",
    text: "When you contact us we collect the details you choose to share, such as your name, email address, business name, phone number and message.",
  },
  {
    title: "How we use it",
    text: "We use your details to reply to your enquiry and to discuss our services. We do not sell your personal information.",
  },
  {
    title: "Sharing",
    text: "We share information only with service providers that help us run the website and respond to you, and where the law requires it.",
  },
  {
    title: "Retention and your choices",
    text: "We keep enquiry details only as long as needed for the purpose above. You can ask us to access, correct or delete your information by contacting us.",
  },
  {
    title: "Demonstrations",
    text: "The demonstrations on this website use fictional data. They do not send messages, update records or make bookings.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="relative overflow-hidden">
      <HeroBackground />
      <Container className="relative max-w-3xl py-16 sm:py-24">
      <p className="mb-4 inline-block rounded-full border border-amber/50 bg-amber/10 px-3 py-1 text-xs font-semibold text-amber">
        Draft, to be reviewed by a legal professional
      </p>
      <AnimatedText as="h1" text="Privacy Policy" className="text-4xl font-semibold" />
      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="text-xl font-semibold">{s.title}</h2>
            <p className="mt-2 text-muted">{s.text}</p>
          </section>
        ))}
      </div>
      </Container>
    </div>
  );
}
