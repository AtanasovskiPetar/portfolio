import React from 'react';

import { Heading, Flex, Text, Avatar, RevealFx, IconButton, StackIcon, Grid } from '@/once-ui/components';

import { baseURL, renderContent } from '@/app/resources';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Experience from '@/components/Experience';
import { education, projects } from '../resources/content';
import Education from '@/components/Education';
import { Project } from '@/components/Project';

export async function generateMetadata(
	{ params: { locale } }: { params: { locale: string } }
) {
	const t = await getTranslations();
	const { home } = renderContent(t);
	const title = home.title;
	const description = home.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}`,
			images: [
				{
					url: ogImage,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	};
}

export default function Home(
	{ params: { locale } }: { params: { locale: string } }
) {
	unstable_setRequestLocale(locale);
	const t = useTranslations();
	const { home, person, social, stack, experiences, certifications, achievements } = renderContent(t);
	return (
		<Flex
			maxWidth="m" fillWidth gap="xl"
			direction="column" alignItems="center">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebPage',
						name: home.title,
						description: home.description,
						url: `https://${baseURL}`,
						image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
						publisher: {
							'@type': 'Person',
							name: person.name,
							image: {
								'@type': 'ImageObject',
								url: `${baseURL}${person.avatar}`,
							},
						},
					}),
				}}
			/>
			<Flex
				fillWidth
				direction="column"
				paddingY="l" gap="m"
				id="home-id">
				<Flex
					direction="row"
					fillWidth gap="m">
					<Flex flex={9}>
						<Flex
							direction="column"
							fillWidth maxWidth="s" gap="m">
							<RevealFx
								translateY="4"
								style={{justifyContent: 'left'}}>
								<Heading
									wrap="balance"
									variant="display-strong-l">
									{home.headline}
								</Heading>
							</RevealFx>
							<RevealFx
								translateY="8" delay={0.2}>
								<Flex fillWidth>
									<Text
										wrap="balance"
										onBackground="neutral-weak"
										variant="heading-default-xl">
										{home.subline}
									</Text>
								</Flex>
							</RevealFx>
							<RevealFx translateY="12" delay={0.4}>
								<Flex fillWidth>
									<Flex
										gap="16"
										justifyContent="center"
										alignItems="center"
										style={{ paddingRight: '16px' }}>
										{social.map((item) => (
											item.link && (
												<IconButton
													key={item.name}
													href={item.link}
													icon={item.icon}
													size="s"
													variant="ghost" />
											)
										))}
									</Flex>
								</Flex>
							</RevealFx>
						</Flex>
					</Flex>
					<Flex flex={3}>
						<RevealFx>
							<Avatar
								src={person.avatar}
								size="xl"
							/>
						</RevealFx>
					</Flex>
				</Flex>
			</Flex>
			<div id="stack" style={{width: '100%'}}>
				<RevealFx translateY="16" delay={0.6} style={{justifyContent: 'left'}}>
					<Heading
						as="h2"
						variant="display-strong-xs"
						wrap="balance">
						Technology stack
					</Heading>
				</RevealFx>
				<RevealFx translateY="16" delay={0.6}>
					<Grid
						columns="repeat(5, 1fr)"
						mobileColumns='3col'
						style={{
							padding: '16px',
							width: '100%',
						}}>
						{stack.map((item) => (
							(<StackIcon key={item.name} path={item.path} name={item.name} scale={item.scale}></StackIcon>)
						))}
					</Grid>
				</RevealFx>
			</div>
			<div id="experience" style={{ width: '100%' }}>
				<RevealFx translateY="16" delay={0.6} style={{ justifyContent: 'left' }}>
					<Heading
						as="h2"
						variant="display-strong-xs"
						wrap="balance">
						Experience
					</Heading>
				</RevealFx>
				{experiences.map((item) => (
					<RevealFx translateY="16" delay={0.6}>
						<Experience
							key={item.title}
							title={item.title}
							company={item.company}
							position={item.position}
							description={item.description}
							timeframe={item.timeframe}
						></Experience>
					</RevealFx>
				))}
			</div>
			<Flex id="education" 
				maxWidth="m" fillWidth gap="xl"
				direction="column" alignItems="center">
				<div style={{ width: '100%' }}>
					<RevealFx translateY="16" delay={0.6} style={{ justifyContent: 'left' }}>
						<Heading
							as="h2"
							variant="display-strong-xs"
							wrap="balance">
							Certificates
						</Heading>
					</RevealFx>
					<RevealFx translateY="16" delay={0.6}>
						<Grid
							columns="repeat(3, 1fr)"
							mobileColumns='1col'
							style={{ padding: '16px' }}
						>
							{certifications.map((item) => (
								<div
									key={item.title}
									style={{
										border: '1px solid #fff',
										borderRadius: '8px',
										margin: '10px',
										padding: '16px',
									}}
								>
									<h3>{item.institution}</h3>
									<h4>{item.title}</h4>
									<h5>{item.timeframe}</h5>
								</div>
							))}
						</Grid>
					</RevealFx>
				</div>
				<div style={{ width: '100%' }}>
					<RevealFx translateY="16" delay={0.6} style={{ justifyContent: 'left' }}>
						<Heading
							as="h2"
							variant="display-strong-xs"
							wrap="balance">
							Education
						</Heading>
					</RevealFx>
					{education.map((item) => (
						<RevealFx translateY="16" delay={0.6}>
							<Education
								key={item.institution}
								institution={item.institution}
								degree={item.degree}
								direction={item.direction}
								gpa={item.gpa}
								timeframe={item.timeframe}
								position={item.position}
							></Education>
						</RevealFx>
					))}
				</div>
				<div style={{ width: '100%' }}>
					<RevealFx translateY="16" delay={0.6} style={{ justifyContent: 'left' }}>
						<Heading
							as="h2"
							variant="display-strong-xs"
							wrap="balance">
							Achievements
						</Heading>
					</RevealFx>
					<RevealFx translateY="16" delay={0.6}>
						<Grid
							columns="repeat(4, 1fr)"
							mobileColumns='2col'
							style={{ padding: '16px' }}
						>
							{achievements.map((item) => (
								<div
									key={item.title}
									style={{
										border: '1px solid #fff',
										borderRadius: '8px',
										margin: '10px',
										padding: '16px',
										paddingTop: '20px',
										paddingBottom: '20px',
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-between',
									}}
								>
									<h3>{item.place}</h3>
									<h4>{item.title}</h4>
									<h5>{item.timeframe}</h5>
								</div>
							))}
						</Grid>
					</RevealFx>
				</div>
			</Flex>
			<div id="projects" style={{ width: '100%' }}>
				<RevealFx translateY="16" delay={0.6} style={{ justifyContent: 'left' }}>
					<Heading
						as="h2"
						variant="display-strong-xs"
						wrap="balance">
						Projects
					</Heading>
				</RevealFx>
				<RevealFx translateY="16" delay={0.6}>
					<Grid
						columns="repeat(3, 1fr)"
						mobileColumns='1col'
						style={{ padding: '16px', width: '100%' }}
					>
						{projects.map((item) => (
							<div key={item.title} style={{ padding: '10px' }}>
								<Project
									href={item.link}
									backgroundUrl={item.src}
									title={item.title}
									description={item.description}
									color={item.color}
									style={{ height: '150px', padding: '16px' }}
								/>
							</div>
						))}
					</Grid>
				</RevealFx>
			</div>
		</Flex>
	);
}
