export function isLoggedIn(): boolean{
    if(typeof window == 'undefined') return false;
    const token = localStorage.getItem('token') || '';
    return !!token;

  
}