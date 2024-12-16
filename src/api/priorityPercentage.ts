import { fetchData,
    calculateCounts,
    calculatePercentages
} from './tasks';

import { Request, Response } from 'express';

export const GET = async (_req: Request, res: Response) => {
  try {
    const data = await fetchData();

    const typeCounts = calculateCounts(data, 'priority');
    const typePercentages = calculatePercentages(typeCounts, data.length);

    res.json(typePercentages);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
