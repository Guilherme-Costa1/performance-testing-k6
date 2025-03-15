import { recordMetrics, metrics } from '../config/metricas.js';
import { httpRequest } from '../utils/httpRequest.js';
import { verifyResponse } from '../config/verifyResponse.js';
import { getThresholds } from '../config/thresholds.js';

export const options = {
    thresholds: getThresholds()
};

export default function () {
    let response = httpRequest('GET', '/store/inventory');

    const { failed } = verifyResponse(response, 2000);

    recordMetrics(response, metrics, failed);

    if (failed) {
        console.error(`❌ ERRO DETECTADO: Status ${response.status}`);
    }
}