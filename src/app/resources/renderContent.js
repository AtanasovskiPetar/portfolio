import { person, newsletter, social, home, about, blog, work, gallery, stack, experiences, education, certifications, projects, achievements } from './content';

const renderContent = (t) => {
    return {
        person,
        social,
        newsletter,
        home,
        about,
        blog,
        work,
        gallery,
        stack,
        experiences,
        education,
        certifications,
        projects,
        achievements
    }
};

export { renderContent };
