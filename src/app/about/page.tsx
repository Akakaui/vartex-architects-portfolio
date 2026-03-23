import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
    title: "About Vartex Architects | Architecture Studio Nigeria",
    description: "Learn about Vartex Architects, a leading architectural firm in Lagos and Enugu, Nigeria. Guided by the vision of Michael Mbah, we create sustainable and timeless designs.",
    keywords: ["Michael Mbah", "Vartex Architects Team", "Architecture Philosophy", "Lagos Architects", "Enugu Design Studio", "Vertex Architects", "Vortex Architects"],
};

export default function AboutPage() {
    return <AboutClient />;
}
