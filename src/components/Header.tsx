"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { Flex, ToggleButton } from "@/once-ui/components"
import styles from '@/components/Header.module.scss'

import { routes, display } from '@/app/resources'

import { routing } from '@/i18n/routing';
import { Locale, usePathname, useRouter } from '@/i18n/routing';
import { renderContent } from "@/app/resources";
import { useTranslations } from "next-intl";
import { i18n } from "@/app/resources/config";

type TimeDisplayProps = {
    timeZone: string;
    locale?: string;  // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = 'en-GB' }) => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            };
            const timeString = new Intl.DateTimeFormat(locale, options).format(now);
            setCurrentTime(timeString);
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, [timeZone, locale]);

    return (
        <>
            {currentTime}
        </>
    );
};

export default TimeDisplay;

export const Header = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname() ?? '';
    const params = useParams();
    const [visibleSections, setVisibleSections] = useState<string[]>([]);

    function handleLanguageChange(locale: string) {
        const nextLocale = locale as Locale;
        startTransition(() => {
            router.replace(
                pathname,
                {locale: nextLocale}
            )
        })
    }

    const t = useTranslations();
    const { person, home, about, blog, work, gallery } = renderContent(t);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const sections = ['home-id', 'stack', 'experience', 'certificates', 'projects', 'education'];
            const visibleSet = new Set();
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setVisibleSections((prev) => Array.from(new Set([...prev, entry.target.id])));
                            visibleSet.add(entry.target.id);
                        } else {
                            setVisibleSections((prev) => prev.filter((id) => id !== entry.target.id));
                            visibleSet.delete(entry.target.id);
                        }
                    });
                    const firstVisible = sections.find((id) => visibleSet.has(id)) || 'home-id';
                    setVisibleSections([firstVisible]);
                },
                { threshold: 0.7 }
            );
    
            sections.forEach((id) => {
                const section = document.getElementById(id);
                if (section) {
                    observer.observe(section);
                }
            });
    
            return () => {
                sections.forEach((id) => {
                    const section = document.getElementById(id);
                    if (section) {
                        observer.unobserve(section);
                    }
                });
                observer.disconnect();
            };
        }, 1000);
    
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            <Flex
                className={styles.mask}
                position="fixed" zIndex={9}
                fillWidth minHeight="80" justifyContent="center">
            </Flex>
            <Flex style={{height: 'fit-content'}}
                className={styles.position}
                as="header"
                zIndex={9}
                fillWidth padding="8"
                justifyContent="center">
                <Flex
                    paddingLeft="12" fillWidth
                    alignItems="center"
                    textVariant="body-default-s">
                </Flex>
                <Flex fillWidth justifyContent="center">
                    <Flex
                        background="surface" border="neutral-medium" borderStyle="solid-1" radius="m-4" shadow="l"
                        padding="4"
                        justifyContent="center">
                        <Flex
                            gap="4"
                            textVariant="body-default-s">
                            {(
                                <ToggleButton
                                    prefixIcon="home"
                                    href={`#home`}
                                    selected={visibleSections.includes('home-id') || visibleSections.length == 0}>
                                    <Flex paddingX="2" hide="s">{home.label}</Flex>
                                </ToggleButton>
                            )}
                            {(
                                <ToggleButton
                                    prefixIcon="person"
                                    href={`#stack`}
                                    selected={visibleSections.includes('stack')}>
                                    <Flex paddingX="2" hide="s">{'Stack'}</Flex>
                                </ToggleButton>
                            )}
                            {(
                                <ToggleButton
                                    prefixIcon="grid"
                                    href={`#experience`}
                                    selected={visibleSections.includes('experience')}>
                                    <Flex paddingX="2" hide="s">Experience</Flex>
                                </ToggleButton>
                            )}
                            {(
                                <ToggleButton
                                    prefixIcon="book"
                                    href={`#education`}
                                    selected={visibleSections.includes('certificates')}>
                                    <Flex paddingX="2" hide="s">Certificates</Flex>
                                </ToggleButton>
                            )}
                            {(
                                <ToggleButton
                                    prefixIcon="school"
                                    href={`#education`}
                                    selected={visibleSections.includes('education')}>
                                    <Flex paddingX="2" hide="s">Education</Flex>
                                </ToggleButton>
                            )}
                            {(
                                <ToggleButton
                                    prefixIcon="project"
                                    href={`#projects`}
                                    selected={visibleSections.includes('projects')}>
                                    <Flex paddingX="2" hide="s">Projects</Flex>
                                </ToggleButton>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
                <Flex fillWidth justifyContent="flex-end" alignItems="center">
                    <Flex
                        paddingRight="12"
                        justifyContent="flex-end" alignItems="center"
                        textVariant="body-default-s"
                        gap="20">
                        <Flex hide="s">
                            { display.time && (
                                <TimeDisplay timeZone={person.location}/>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}