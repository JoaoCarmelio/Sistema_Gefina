import { Router } from 'express';

import findDashboard from './dashboard.service.ts';
import type { InvoiceStatus } from './invoice.schema.ts';


const router = Router();

router.get('/', async (_request, response) => {
    const dashboard = await findDashboard();

    response.status(200).json(dashboard);
});

export default router;
