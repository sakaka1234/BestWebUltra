import { cva } from "class-variance-authority";

const overlayVariants = cva("fixed inset-0 z-50");

export type OverlayProps = {
    className?: string;
    onDismiss: () => void;
    children: React.ReactNode;
};

export const OverlayLayout = ({
    className = "flex items-center bg-gray-500/40 justify-center",
    onDismiss,
    children,
}: OverlayProps) => {
    return (
        <div
            className={overlayVariants({ className })}
            onClick={onDismiss}
        >
            <div
                className="w-full px-2"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {children}
            </div>
        </div>
    );
};
