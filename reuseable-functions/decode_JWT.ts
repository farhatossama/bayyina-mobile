function decodeJwt(token: string) {
    const [header, payload, signature] = token.split('.');
    const decodedHeader = JSON.parse(base64UrlDecode(header));
    const decodedPayload = JSON.parse(base64UrlDecode(payload));

    return {
        header: decodedHeader,
        payload: decodedPayload,
        signature: signature
    };
}
function base64UrlDecode(base64Url: string) {
    // Replace '-' with '+', '_' with '/', and add padding if necessary
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    switch (base64.length % 4) {
        case 0: break;
        case 2: base64 += '=='; break;
        case 3: base64 += '='; break;
        default: throw 'Illegal base64url string!';
    }
    return atob(base64); // atob() decodes a base64 encoded string
}
export { decodeJwt }