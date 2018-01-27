export class Log {
  id: number;
  created_at: string;
  updated_at: string;
  remote_addr: string;
  client_ip: string;
  ip_location: string;
  request_time_float: number;
  request_time: number;
  request_id: string;
  method: string;
  request_content_type: string;
  request_content_length: number;
  url: string;
  path: string;
  query_string: string;
  referer: string;
  status_code: number;
  content_length: number;
  content_length_format: string;
  response_time_float: number;
  response_time: number;
  duration: number;
  duration_format: string;
  group: string;
  user_agent: string;
  client_os: string;
  client_browser: string;

  public constructor(fields?: {
    id: number,
    created_at: string,
    updated_at: string,
    remote_addr: string,
    client_ip: string,
    ip_location: string,
    request_time_float: number,
    request_time: number,
    request_id: string,
    method: string,
    request_content_type: string,
    request_content_length: number,
    url: string,
    path: string,
    query_string: string,
    referer: string,
    status_code: number,
    content_length: number,
    content_length_format: string,
    response_time_float: number,
    response_time: number,
    duration: number,
    duration_format: string,
    group: string,
    user_agent: string,
    client_os: string,
    client_browser: string,
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
