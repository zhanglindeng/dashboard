export class ResponseData {
  code: number;
  message: string;
  data: any;
  token: string;

  public constructor(fields?: {
    code: number,
    message: string,
    data: any,
    token: string
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
