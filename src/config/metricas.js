import { Counter, Rate, Trend } from 'k6/metrics';

export const metrics = {
    duration: new Trend('request_duration'),
    failRate: new Rate('request_fail_rate'),
    successRate: new Rate('request_success_rate'),
    totalReqs: new Counter('total_requests'),
    errorReqs: new Counter('request_errors'),
    errors: new Counter('errors'),
    apdex: new Trend('apdex_score'),
    totalExecutionTime: new Trend('total_execution_time'),
};

export let httpReqFailed = new Rate("http_req_failed");
export let httpReqFailed4xx = new Rate("http_req_failed_4xx");
export let httpReqFailed5xx = new Rate("http_req_failed_5xx");
export function calculateApdex(res, apdex) {
    if (!res || !res.timings || typeof res.timings.duration !== "number") {
        console.error("❌ ERRO: Resposta inválida recebida no Apdex!");
        return;
    }
    const apdexT = 500;
    const time = res.timings.duration;
    if (time <= apdexT) {
        apdex.add(1);
    } else if (time <= 4 * apdexT) {
        apdex.add(0.5);
    } else {
        apdex.add(0);
    }
}

let accumulatedTime = 0;
export function calculateTotalTime(res, totalExecutionTime) {
    if (!res || !res.timings || typeof res.timings.duration !== "number") {
        console.error("❌ ERRO: Resposta inválida recebida no cálculo do tempo total!");
        return;
    }
    accumulatedTime += res.timings.duration;
    totalExecutionTime.add(accumulatedTime);
}

export function recordMetrics(res, metrics, failed) {
    if (!res || !res.timings || typeof res.timings.duration !== 'number') {
        console.error("❌ ERRO: Resposta inválida recebida!");
        return;
    }

    metrics.duration.add(res.timings.duration);
    metrics.totalReqs.add(1);
    metrics.failRate.add(failed);
    metrics.successRate.add(!failed);

    if (failed) {
        metrics.errorReqs.add(1);
        metrics.errors.add(1);
    }


    if (res.status >= 400) {
        httpReqFailed.add(1, { status: res.status.toString() });  
        if (res.status >= 400 && res.status < 500) {
            httpReqFailed4xx.add(1);
            console.error(`❌ ERRO HTTP 4xx DETECTADO: Status ${res.status}`);
        }
        if (res.status >= 500) {
            httpReqFailed5xx.add(1);
            console.error(`❌ ERRO HTTP 5xx DETECTADO: Status ${res.status}`);
        }
    }

    calculateApdex(res, metrics.apdex);
    calculateTotalTime(res, metrics.totalExecutionTime);
}