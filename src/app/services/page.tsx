import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
    title: "Services & Capabilities | Vartex Architects",
    description: "Explore our specialized services: Architectural Design, Interior Design, and construction consulting services. Download our service guides or schedule a spatial consultation.",
    keywords: [
        "Architectural Design Services",
        "Interior Design Services",
        "Spatial Consultation",
        "High-end Residential Architecture",
        "Commercial Interior Design",
        "Construction Documentation",
        "Vartex Architects Services",
        "Architecture Timelines",
        "Bespoke Design Scopes"
    ],
    alternates: {
        canonical: "https://vartexarchitects.com/services"
    },
    openGraph: {
        title: "Services & Capabilities | Vartex Architects",
        description: "Explore our specialized services: Architectural Design, Interior Design, and construction consulting services. Download our service guides or schedule a spatial consultation.",
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
        title: "Services & Capabilities | Vartex Architects",
        description: "Explore our specialized services: Architectural Design, Interior Design, and construction consulting services. Download our service guides or schedule a spatial consultation.",
        images: ["/og-image.jpg"]
    }
};

export default function ServicesPage() {
    return <ServicesClient />;
}
