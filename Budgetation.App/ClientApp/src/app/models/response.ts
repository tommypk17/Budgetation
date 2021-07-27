export interface iResponse<T>{
  data: T | null;
  message: string | null;
  success: string | null;
}
export class Response<T> implements iResponse<T>{
  data: T | null = null;
  message: string | null = null;
  success: string | null = null;
}
