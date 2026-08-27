import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicesClient from "../ServicesClient";

const SERVICE_META = {
    architecture: {
        title: "Architectural Design Services in Nigeria",
        description: "Vartex Architects develops residential and commercial architecture in Nigeria from site analysis and concept design through technical documentation and construction coordination.",
        label: "Architectural Design",
    },
    interior: {
        title: "Interior Design Services in Nigeria",
        description: "Vartex Architects creates considered interior spaces in Nigeria through spatial planning, visualization, material specification, and project delivery support.",
        label: "Interior Design",
    },
} as const;

type ServiceSlug = keyof typeof SERVICE_META;

function isServiceSlug(value: string): value is ServiceSlug {
    return value === "architecture" || value === "interior";
}

export function generateStaticParams() {
    return [{ slug: "architecture" }, { slug: "interior" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    if (!isServiceSlug(slug)) return {};
    const data = SERVICE_META[slug];
    const url = `https://vartexarchitects.com/services/${slug}`;
    return {
        title: data.title,
        description: data.description,
        keywords: [data.label, `${data.label} Lagos`, `${data.label} Nigeria`, "Vartex Architects"],
        alternates: { canonical: url },
        openGraph: {
            title: `${data.title} | Vartex Architects`,
            description: data.description,
            url,
            type: "website",
            images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `${data.label} by Vartex Architects` }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${data.title} | Vartex Architects`,
            description: data.description,
            images: ["/og-image.jpg"],
        },
    };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    if (!isServiceSlug(slug)) notFound();
    return <ServicesClient initialPage={slug} />;
}
