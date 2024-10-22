export async function customFetch<T>(
    endpoint: string,
    method: string = 'GET',
    params: {[key: string]: any} = {}
): Promise<T> {

    const options: {[key: string]: any} = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        method,
    };

    if(['POST', 'PUT', 'PATCH'].includes(method)) {
        options.body = JSON.stringify(params);
    }

    if(method === 'GET') {
        const baseUrl = endpoint.split('?')[0];
        const baseParams = endpoint.split('?')[1] ?? '';
        let urlParams = [baseParams];
        for(const [key, value] of Object.entries(params)) {
            urlParams.push(key + '=' + value);
        }
        endpoint = baseUrl + '?' + urlParams.join('&');
    }

    const response = await fetch(endpoint, options);
    const data = response.json();

    if(response.ok) {
        return data;
    }
    throw new ApiError('error server');
}

class ApiError {
    error: string;

    constructor(message: string) {
        this.error = message;
    }
}
