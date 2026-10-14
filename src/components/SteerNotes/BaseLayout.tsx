import React from "react";
import Header from "@/components/SteerNotes/header";
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
            <Header />
            {children}
           
        </>
    );
};