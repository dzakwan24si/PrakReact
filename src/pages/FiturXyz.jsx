import { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function FiturXyz() {
    return (
        <div className="p-4 animate-fade-in">
            <PageHeader title="Fitur XYZ" breadcrumb={["Fitur XYZ", "List"]}>
                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="bg-hijau text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-[#009e68] transition transform hover:-translate-y-0.5"
                >
                    + Add Fitur XYZ
                </button>
            </PageHeader>
        </div>
    );
}