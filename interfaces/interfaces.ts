export class AuthResult {
    errors?: any;
    success?: boolean;
    token?: string;
    isLoading?: boolean;
    isLogged?: boolean;
    refreshToken?: string;
    refreshTokenExpiration?: any;
    user?: any
    tokenExpiration?: any
    isRefreshingToken?: any
}