'use client';

import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './Arrow.module.scss';
import { Flex } from '.';

interface ArrowProps {
    trigger: string;
    scale?: number;
    color?: 'onBackground' | 'onSolid';
    style?: React.CSSProperties;
    className?: string;
    direction?: 'right' | 'up' | 'down' | 'left';
}

const Arrow: React.FC<ArrowProps> = ({
    trigger,
    scale = 0.8,
    color = 'onBackground',
    style,
    className,
    direction = "right"
}) => {
    const arrowContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const triggerElement = document.querySelector(trigger);

        if (triggerElement && arrowContainerRef.current) {
            const handleMouseOver = () => {
                arrowContainerRef.current?.classList.add(styles.active);
            };

            const handleMouseOut = () => {
                arrowContainerRef.current?.classList.remove(styles.active);
            };

            triggerElement.addEventListener('mouseenter', handleMouseOver);
            triggerElement.addEventListener('mouseleave', handleMouseOut);

            return () => {
                triggerElement.removeEventListener('mouseenter', handleMouseOver);
                triggerElement.removeEventListener('mouseleave', handleMouseOut);
            };
        }
    }, [trigger]);

    const rotation = {
        right: 'rotate(0deg)',
        up: 'rotate(-90deg)',
        down: 'rotate(90deg)',
        left: 'rotate(180deg)'
    }[direction];

    return (
        <Flex>
            <Flex ref={arrowContainerRef}
                position="relative" marginLeft="4"
                alignItems="center" justifyContent="flex-end"
                className={classNames(styles.arrowContainer, className)}
                style={{transform: `scale(${scale}) ${rotation}`, ...style}}>
                <Flex className={classNames(styles.arrow, styles[color])} height={0.1}/>
                <Flex className={classNames(styles.arrowHead, styles[color])} height={0.0875}/>
                <Flex className={classNames(styles.arrowHead, styles[color])} height={0.0875}/>
            </Flex>
        </Flex>
    );
};

Arrow.displayName = 'Arrow';
export { Arrow };