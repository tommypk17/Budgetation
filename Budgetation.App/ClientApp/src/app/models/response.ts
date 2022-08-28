export interface iResponse<T>{
  data: T | null;
  message: string | null;
  success: boolean | null;
}
export class Response<T> implements iResponse<T>{
  data: T | null = null;
  message: string | null = null;
  success: boolean | null = null;
}
