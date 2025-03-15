import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from '../config/settings.js';

/**
 * @param {string} method - Método HTTP (GET, POST, etc.).
 * @param {string} endpoint - Caminho relativo do recurso, ex: '/login'.
 * @param {Object} [payload={}] - Corpo da requisição (opcional para POST/PUT).
 * @param {Object} [customHeaders={}] - Headers customizados adicionais (opcional).
 * @returns {Object} - Resposta da requisição ou um objeto de fallback em caso de erro.
 */
export function httpRequest(method, endpoint, payload = {}, customHeaders = {}) {
    const url = `${config.baseUrl}${endpoint}`; 
    const defaultHeaders = {
        'Content-Type': 'application/json',
        ...config.headers,
        ...customHeaders
    };
    let params = { headers: defaultHeaders };
    let response;

    try {
        switch (method.toUpperCase()) {
            case 'GET':
                response = http.get(url, params);
                break;
            case 'POST':
                response = http.post(url, JSON.stringify(payload), params);
                break;
            case 'PUT':
                response = http.put(url, JSON.stringify(payload), params);
                break;
            case 'DELETE':
                response = http.del(url, params);
                break;
            case 'PATCH':
                response = http.patch(url, JSON.stringify(payload), params);
                break;
            default:
                throw new Error(`⚠️ Método HTTP inválido: ${method}`);
        }
        
     
        check(response, {
            [`✅ ${method} ${endpoint} - Deve retornar 2xx`]: (r) => r.status >= 200 && r.status <= 299
        });

        sleep(1);
        
        return response; 
    } catch (error) {
        console.error(`🚨 Erro na requisição ${method} ${endpoint}:`, error);

        
        return {
            status: 0, 
            body: "",
            timings: { duration: 0 } 
        };
    }
}