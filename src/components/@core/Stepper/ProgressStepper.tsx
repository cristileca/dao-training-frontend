'use client'

interface LoaderProps {
    step: number;
}

export default function Loader({ step }: LoaderProps) {
    return (
        <div className="flex flex-row mx-auto mt-7 px-[23px]">
            <StepCircle active={step >= 1} />
            <StepLine active={step >= 2} />

            <StepCircle active={step >= 2} />
            <StepLine active={step >= 3} />

            <StepCircle active={step >= 3} />
        </div>
    )
}

function StepCircle({ active }: { active: boolean }) {
    return (
        <div
            className={`flex items-center justify-center w-7 h-7 rounded-full
        transition-colors duration-500
        ${active ? "bg-[#1c91e9]" : "bg-gray-300"}`}
        >
            <div className="w-3 h-3 rounded-full bg-amber-50"></div>
        </div>
    )
}

function StepLine({ active }: { active: boolean }) {
    return (
        <div
            className={`w-8 h-[6px] m-auto
        transition-colors duration-500
        ${active ? "bg-[#1c91e9]" : "bg-gray-300"}`}
        />
    )
}
