import { HeroWhite } from "@repo/components/Hero"
import { ContentWhite } from "@repo/components/Content"
import { FeatureImage } from "@repo/components/Feature"
import { PricingSingle } from "@repo/components/Pricing"
import { FAQ } from "@repo/components/FAQ"

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

    return (
        <>
            <HeroWhite config={heroConfig} />
            <ContentWhite config={contentConfig} />
            <FeatureImage config={featureConfig} />
            <PricingSingle config={pricingConfig} />
            <FAQ config={faqConfig} />
        </>
    );
}
