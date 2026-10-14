"use client";

import React, { useState } from "react";
import LunaModal from "@/components/Luna/LunaModal";

const LunaButton = ({ children, className }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                aria-label="Request a demo" className={className}>
                {children}
            </button>
            <LunaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}

export default LunaButton;