import {check} from 'k6';

export function verifyResponse(res, maxDuration) {
    const checksPassed = check(res, {
        'Deve conter status code HTTP 2xx sucesso': (r) => r.status >= 200 && r.status <= 299,
        // 'Não deve gerar erros genericos': (r) => r.error_code < 1000 || r.error_code > 1099,
        'Não deve gerar erro de status code HTTP 4xx erro de cliente': (r) => r.error_code < 1400 || r.error_code > 1499,
        'Não deve gerar erro de status code HTTP 5xx erro de servidor': (r) => r.error_code < 1500 || r.error_code > 1599,
        'Não deve gerar erro de timeout': (r) => r.error_code !== 1050,
        [`Duração máxima deve ser ${maxDuration / 1000} segundos`]: (r) => r.timings.duration < maxDuration,
    });

    return {checksPassed, failed: !checksPassed};
}