"use client";

import { useEffect, useState } from "react";
import EventPdfModal from "../FlexibleContent/EventPdfModal";


const EventPDFButton = ({ buttontext }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if (isModalOpen !== undefined) {
            setSelected(isModalOpen);
        }
    }, [isModalOpen]);

    const handleModalToggle = (open) => {
        setSelected(open);
        if (setIsModalOpen) {
            setIsModalOpen(open);
        }
    };
    return (
        <>
            <button
                onClick={() => handleModalToggle(true)}
                className="bg-white inline-flex items-center justify-center duration-200 border border-[#335CFF] cursor-pointer group relative text-sm text-[#171717] rounded-[8px] py-3 px-4 font-medium hover:bg-[#2F55EB] hover:text-white transition-colors">
                {buttontext}
            </button>
            {selected && <EventPdfModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                handleModalToggle={handleModalToggle}
                selected={selected}
            />}
        </>
    )
};
export default EventPDFButton;