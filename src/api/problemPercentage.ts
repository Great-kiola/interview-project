import axios from 'axios';
import { Request, Response } from 'express';
import { SampleData } from './types';

const DATA_URL = 'https://sampleapi.squaredup.com/integrations/v1/service-desk?datapoints=500';

interface IssueTypeCount {
    problems: number;
    questions: number;
    tasks: number;
}

const calculatePercentages = (counts: IssueTypeCount, total: number) => {
    return {
        problems: (counts.problems / total) * 100,
        questions: (counts.questions / total) * 100,
        tasks: (counts.tasks / total) * 100,
    };
};

export const GET = async (_req: Request, res: Response) => {
    try {
        const { data } = await axios.get<SampleData[]>(DATA_URL);
        const counts: IssueTypeCount = { problems: 0, questions: 0, tasks: 0 };

        data.forEach((item) => {
            if (item.type === 'problem') counts.problems++;
            else if (item.type === 'question') counts.questions++;
            else if (item.type === 'task') counts.tasks++;
        });

        const total = counts.problems + counts.questions + counts.tasks;
        const percentages = calculatePercentages(counts, total);

        res.send(percentages);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch data' });
    }
};
