import { Log } from './log';

export class LogResponse {
  code: number;
  message: string;
  logs: Log[];
  count: number;
  current_page: number;
  total_page: number;
}
