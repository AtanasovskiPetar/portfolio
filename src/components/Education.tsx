import { Grid } from "@/once-ui/components";
import { forwardRef } from "react";

interface EducationProps {
    position: string;
    institution: string;
    degree: string;
    direction: string;
    gpa: string;
    timeframe: string;
    className?: string;
    style?: React.CSSProperties;
}

const Education = forwardRef<HTMLDivElement, EducationProps>(({position, institution, degree, direction, gpa, timeframe, className, style, ...props}, ref) => {

    const timeContent = (
        <>
            <h5>{timeframe}</h5>
        </>
    );

    const educationContent = (
        <>
        <div style={{textAlign: position === 'left' ? 'right' : 'left'}}>
            <h3>{institution}</h3>
            <h4 style={{paddingBottom: '10px'}}>{degree}</h4>
            <h5>{direction}</h5>
            <h5>GPA: {gpa}</h5>
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
                {position === 'left' ? educationContent : timeContent}
            </div>
            <div style={{
                padding: '16px',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center'
                }}>
                {position === 'left' ? timeContent : educationContent}
            </div>
        </Grid>
    );
});

export default Education;