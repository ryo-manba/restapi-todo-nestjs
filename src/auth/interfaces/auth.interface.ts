// serviceやcontrollerで使う型
export interface Msg {
  message: string;
}
export interface Csrf {
  csrfToken: string;
}
export interface Jwt {
  accessToken: string;
}
