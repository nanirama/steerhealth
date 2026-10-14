import React from "react";
import Header from "@/components/Elevate/header";
import Footer from "@/components/Elevate/footer";

export default async function BaseLayout({
    children,
    page,
    category
}: {
    children: React.ReactNode;
    page?:string;
    category?:string
}) {
    return (
        <>
            <Header page={page} category={category} />
            {children}
            <Footer />
        </>
    );
};