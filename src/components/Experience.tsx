import { Grid } from "@/once-ui/components";
import { forwardRef } from "react";

interface ExperienceProps {
    position: string;
    company: string;
    title: string;
    description: string;
    timeframe: string;
    className?: string;
    style?: React.CSSProperties;
}

const Experience = forwardRef<HTMLDivElement, ExperienceProps>(({position, company, title, description, timeframe, className, style, ...props}, ref) => {

    const timeContent = (
        <>
            <h5>{timeframe}</h5>
        </>
    );

    const experienceContent = (
        <>
        <div style={{textAlign: position === 'left' ? 'right' : 'left'}}>
            <h3>{company}</h3>
            <h5 style={{paddingBottom: '10px'}}>{title}</h5>
            <h5>{description}</h5>
        </div>
        </>
    );

    return (
        <Grid
            columns="repeat(2, 1fr)"
            minHeight={8}
            style={{padding: '16px'}}
        >
            <div
                style={{
                    borderRight: '1px solid #fff',
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}
            >
                {position === 'left' ? experienceContent : timeContent}
            </div>
            <div style={{
                padding: '16px',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center'
                }}>
                {position === 'left' ? timeContent : experienceContent}
            </div>
        </Grid>
    );
});

export default Experience;