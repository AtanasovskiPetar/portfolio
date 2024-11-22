import React from 'react';

import { Heading, Flex, Text, Button,  Avatar, RevealFx, Arrow, IconButton } from '@/once-ui/components';
import { Projects } from '@/components/work/Projects';

import { baseURL, routes, renderContent } from '@/app/resources'; 
import { Mailchimp } from '@/components';
import { Posts } from '@/components/blog/Posts';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata(
	{params: {locale}}: { params: { locale: string }}
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
	{ params: {locale}}: { params: { locale: string }}
) {
	unstable_setRequestLocale(locale);
	const t = useTranslations();
	const { home, about, person, newsletter, social } = renderContent(t);
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
										translateY="4">
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
															tooltip={item.name}
															size="s"
															variant="ghost"/>
													)
												))}
											</Flex>
											<Button
												id="about"
												data-border="rounded"
												href={`#contact`}
												variant="tertiary"
												size="m">
												<Flex
													gap="8"
													alignItems="center">
													{about.avatar.display}
													{t("about.title")}
													<Arrow trigger="#about"/>
												</Flex>
											</Button>
										</Flex>
									</RevealFx>
								</Flex>
								</Flex>
								<Flex flex={3}>
									<RevealFx>
									<Avatar
										src={person.avatar}
										size="xl"
										// alt={person.name}
									/>
									</RevealFx>
								</Flex>
						</Flex>
					
				
			</Flex>
			<RevealFx translateY="16" delay={0.6} id="stack">
				<Projects range={[1,1]} locale={locale}/>
			</RevealFx>
			{routes['/blog'] && (
				<Flex
					fillWidth gap="24"
					mobileDirection="column">
					<Flex flex={1} paddingLeft="l">
						<Heading
							as="h2"
							variant="display-strong-xs"
							wrap="balance">
							Latest from the blog
						</Heading>
					</Flex>
					<Flex
						flex={3} paddingX="20">
						<Posts range={[1,2]} columns="2" locale={locale}/>
					</Flex>
				</Flex>
			)}
			<Projects range={[2]} locale={locale}/>
			{ newsletter.display &&
				<Mailchimp newsletter={newsletter} />
			}
		</Flex>
	);
}
