'use client';

import './Project.scss';
import React, { ReactNode, forwardRef } from 'react';
import Link from 'next/link';

interface ProjectProps {
    backgroundUrl: string;
    href: string;
    title: string;
    description: string;
    color?: string;
    style?: React.CSSProperties;
}

const Project = forwardRef<HTMLButtonElement, ProjectProps>(({
    backgroundUrl,
    href,
    title,
    description,
    color,
    style,
    ...props
}, ref) => {
    const labelSize = 'font-l';
    const iconSize = 'l';

    const content = (
        <>
            <div 
                className="project-title"
                style={{
                    textAlign: 'center',
                    padding: '16px',
                }}
            >
                <h3 style={{color: color}}>{title}</h3>
                <h5 style={{color: color, paddingTop: '10px'}}>{description}</h5>
            </div>
        </>
    );

    const commonProps = {
        className: 'project-container',
        style: { ...style,
            borderRadius: '10px',
            textDecoration: 'none', 
            backgroundImage: `url(${backgroundUrl || ''})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'},
    };

    return (
        <Link
            href={href}
            ref={ref as React.Ref<HTMLAnchorElement>}
            target="_blank"
            rel="noopener noreferrer"
            {...commonProps}
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
            {content}
        </Link>
    );
});

Project.displayName = 'Project';

export { Project };