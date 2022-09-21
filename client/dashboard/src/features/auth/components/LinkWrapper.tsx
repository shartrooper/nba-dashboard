import React from "react"

export const LinkWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="mt-4 text-center">
            <div className="text-sm tracking-wide">
                {children}
            </div>
        </div>
    );
}