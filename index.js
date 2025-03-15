import teste from "./src/tests/test.js";
import { group, sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { verifyResponse } from "./src/config/verifyResponse.js";
import { recordMetrics, metrics } from "./src/config/metricas.js"; 
import { getThresholds } from "./src/config/thresholds.js";


export function handleSummary(data) {
    return {
        "report.html": htmlReport(data),
    };
}


export const options = {
    stages: [
        { duration: "2m", target: 100 },  
        { duration: "6m", target: 600 },  
        { duration: "20m", target: 600 },  
        { duration: "10m", target: 900 },  
        { duration: "6m", target: 0 },  
    ],
    thresholds: getThresholds(),
};


export default function () {
    group("Teste API", () => {  
        let response = teste();
        if (!response) {
            return;
        }
        const { failed } = verifyResponse(response, 2000);
        recordMetrics(response, metrics, failed); 
        
        sleep(1);
    });
}