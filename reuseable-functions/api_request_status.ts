
function analyze_api_error_response(error: any, refreshTask?: any) {
    if (error?.response?.status === 400) {
        return error?.response?.data
    }
    else if (error?.response?.status === 401) {
        return ('غير مصرح، الرجاء إعادة تسجيل الدخول')
    }
    else if (error?.response?.status === 403) {
        return (error?.response?.data || 'لا تملك الإذن لهذا الإجراء!')
    }
    else if (error?.response?.status === 500) {
        return ('حصل خطئ في الخادم')
    }
    else {
        return (error?.message)
    }
}

export { analyze_api_error_response }