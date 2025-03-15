export function getThresholds() {
    return {
        http_req_duration: [
            { threshold: 'p(95)<2000', abortOnFail: false, delayAbortEval: 10 }],
        http_req_failed: [
            { threshold: 'rate<0.01', abortOnFail: false, delayAbortEval: 5 }],
        checks: [
            { threshold: 'rate>0.5', abortOnFail: false, delayAbortEval: 5 }]
    };
}