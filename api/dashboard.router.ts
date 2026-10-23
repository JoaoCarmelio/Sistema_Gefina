import { response, Router } from "express";
import { request } from "node:http";
import findDashboard from "./dashboard.services.ts";

const router = Router();

router.get('/', async (__request, response) => {
    try {
        const dasboard = await findDashboard()
        response.status(200).json(dasboard)

    } catch (error) {
        console.error(error)
        response.status(500).json({error: {
            message: ' Não foi possivel carregar o painel inicial'
        }});




    }
});



export default router;