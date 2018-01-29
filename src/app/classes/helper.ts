import * as $ from 'jquery';

export class Helper {
  public static mainScrollTop(n?: number) {
    $('#main').scrollTop(n ? n : 0);
  }
}
