import { Sparkles, Upload, FileText, Languages, ShieldCheck, Volume2 } from "lucide-react"


import { HeroWhite } from "@repo/components/Hero"
import { ContentImage, ContentWhite } from "@repo/components/Content"
import { FeatureImage, FeatureText } from "@repo/components/Feature"
import { PricingSingle } from "@repo/components/Pricing"
import { FAQ } from "@repo/components/FAQ"
import { FeatureItem } from "@data/features"

export default function Home() {

    let heroConfig = {
        main_title: "Lorem Ipsum at once ad minim veniam null ad minim veniam",
        main_description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. "
    }

    let contentConfig = {
        main_title: "Lorem Ipsum at once ad minim veniam null ad minim veniam",
        main_description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. "
    }

    let featureConfig = {
        main_title: "Lorem Ipsum at once ad minim veniam null ad minim veniam",
        main_description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. "
    }


    let pricingConfig = {
        className: "bg-white",
        main_title: "Lorem Ipsum at once ad minim veniam null ad minim veniam",
        main_description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. "
    }

    let faqConfig = {
        main_title: "Lorem Ipsum at once ad minim veniam null ad minim veniam",
        main_description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. "
    }

 const featuresData: FeatureItem[] = [
  {
    category: "AI-Optimierung",
    title: "Passe deinen Lebenslauf automatisch an jede Stelle an.",
    description: "Unsere KI analysiert jede Jobbeschreibung und passt dein Profil in Sprache, Struktur und Keywords optimal an.",
    icon: <Sparkles />
  },
  {
    category: "Datei-Upload",
    title: "PDF oder Word – einfach hochladen.",
    description: "ResumeReactor liest deinen Lebenslauf direkt aus der Datei und macht ihn sofort bearbeitbar.",
    icon: <Upload />
  },
  {
    category: "Tonalitätsanpassung",
    title: "Sprich im richtigen Ton.",
    description: "Ob analytisch, kreativ oder zurückhaltend – wir passen dein Sprachstil an dein Zielpublikum an.",
    icon: <Volume2 />
  },
  {
    category: "Mehrsprachigkeit",
    title: "Bewirb dich weltweit.",
    description: "Lass deinen Lebenslauf automatisch in andere Sprachen übersetzen – professionell und stilsicher.",
    icon: <Languages />
  },
  {
    category: "Datenschutz",
    title: "Deine Daten gehören dir.",
    description: "Alle Inhalte bleiben privat. Exportiere finalisierte Versionen lokal als PDF oder DOCX.",
    icon: <ShieldCheck />
  }
]

    return (
        <>
            <HeroWhite animate props={heroConfig} />
            <ContentImage animate props={contentConfig} />
            <FeatureText animate features={featuresData} />
            <PricingSingle animate props={pricingConfig} />
            <FAQ config={faqConfig} />
        </>
    );
}
