export class BaseResponse {
  code: number;
  message: string;

  public constructor(fields?: {
    code: number,
    message: string
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
