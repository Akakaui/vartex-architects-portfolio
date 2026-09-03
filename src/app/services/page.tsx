import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
    title: "Architecture & Interior Design Services in Nigeria",
    description: "Explore Vartex Architects' architectural design and interior design services in Nigeria, including project scoping, visualization, technical documentation, and construction coordination.",
    keywords: [
        "Architectural Design Services",
        "Interior Design Services",
        "Spatial Consultation",
        "High-end Residential Architecture",
        "Commercial Interior Design",
        "Construction Documentation",
        "Vartex Architects Services",
        "Architecture Timelines",
        "Bespoke Design Scopes",
        "Architectural Design Lagos",
        "Interior Design Nigeria"
    ],
    alternates: {
        canonical: "https://vartexarchitects.com/services"
    },
    openGraph: {
        title: "Architecture & Interior Design Services in Nigeria | Vartex Architects",
        description: "Explore Vartex Architects' architectural design and interior design services in Nigeria, including project scoping, visualization, technical documentation, and construction coordination.",
        url: "https://vartexarchitects.com/services",
        type: "website",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Vartex Architects Capabilities Portal"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Architecture & Interior Design Services in Nigeria | Vartex Architects",
        description: "Explore Vartex Architects' architectural design and interior design services in Nigeria, including project scoping, visualization, technical documentation, and construction coordination.",
        images: ["/og-image.jpg"]
    }
};

export default function ServicesPage() {
    return <ServicesClient />;
}
