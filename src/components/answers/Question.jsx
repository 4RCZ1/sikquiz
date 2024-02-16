import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Answer from "./Answer";
import {Card, CardContent} from "@mui/material";
import {useEffect} from "react";

export default function Question({checkedStates, question, validate, setPoint, updateChecked}) {
    const questionText = question.question;
    const answers = question.answers;
    const [points, setPoints] = React.useState(answers.map(a=>!a.isCorrect));

    useEffect(() => {
        const newPoints = answers.map(((a,i)=>(!a.isCorrect && checkedStates[i]) || (a.isCorrect && !checkedStates[i])));
        setPoints(newPoints);
    }, [answers, checkedStates]);

    const setQuestionPoint = (index, value) => {
        const newPoints = [...points];
        newPoints[index] = value;
        setPoints(newPoints);
        setPoint(newPoints.reduce((a, b) => a + b, 0) === points.length);
    }

    const setChecked = (index, value) => {
        const newChecked = [...checkedStates];
        newChecked[index] = value;
        updateChecked(newChecked);
    }

    return (
        <Card className="question">
            <CardContent>
                <FormControl component="fieldset" style={{width:"100%"}}>
                    <FormLabel component="legend" style={{width:"100%"}}>{questionText}</FormLabel>
                    <FormGroup aria-label="position" column>
                        {answers.map((answer, index) => {
                            const localSetQuestionPoint = (value) => setQuestionPoint(index, value);
                            const localUpdateChecked = (value) => setChecked(index, value);
                            return <Answer key={index} content={answer.content} isCorrect={answer.isCorrect}
                                    validate={validate} explanation={answer.explanation}
                                    onChange={localSetQuestionPoint}
                                    updateChecked={localUpdateChecked}
                                    checked={checkedStates[index]}
                            />
                        })}
                    </FormGroup>
                </FormControl>
            </CardContent>
        </Card>
    );
}