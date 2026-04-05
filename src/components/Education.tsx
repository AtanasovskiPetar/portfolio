import { Grid } from "@/once-ui/components";
import { forwardRef } from "react";

interface EducationProps {
    position: string;
    institution: string;
    degree: string;
    direction: string;
    timeframe: string;
    description: string;
    className?: string;
    style?: React.CSSProperties;
}

const Education = forwardRef<HTMLDivElement, EducationProps>(({position, institution, degree, direction, timeframe, description, className, style, ...props}, ref) => {

    const metaContent = (
        <div style={{textAlign: position === 'left' ? 'right' : 'left'}}>
            <h3>{institution}</h3>
            <h5 style={{paddingBottom: '4px'}}>{degree}</h5>
            <h5 style={{paddingBottom: '4px'}}>{direction}</h5>
            <h5>{timeframe}</h5>
        </div>
    );

    const descriptionContent = (
        <div style={{textAlign: position === 'left' ? 'left' : 'right'}}>
            <h5 style={{margin: 0}}>{description}</h5>
        </div>
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
                {position === 'left' ? metaContent : descriptionContent}
            </div>
            <div style={{
                padding: '16px',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center'
                }}>
                {position === 'left' ? descriptionContent : metaContent}
            </div>
        </Grid>
    );
});

export default Education;
