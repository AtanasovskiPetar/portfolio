import { forwardRef } from "react";
import { Flex } from "./Flex";

interface StackIconProps {
    path: string;
    tooltip?: string;
    tooltipPosition?: string;
    variant?: string;
    size?: string;
    className?: string;
    style?: React.CSSProperties;
    href?: string;
    icon?: string;
    name: string;
    scale?: string;
}

const StackIcon = forwardRef<HTMLDivElement, StackIconProps>(({ path, name, scale, tooltip, tooltipPosition, variant, size, className, style, href, icon, ...props }, ref) => {

    const content = (
        <>
            <svg width={"48"} height={"48"} viewBox="0 0 16 16">
                <path d={path} fill="#ffffff" transform={scale}/>
            </svg>
        </>
    );

    const commonProps = {
        style: { ...style },
        'aria-label': tooltip || icon,
    };

    return (
        <Flex
            style={{padding: '16px'}}
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
        {content}
        <span>{name}</span>
        </Flex>
    );
});

StackIcon.displayName = 'StackIcon';

export { StackIcon };