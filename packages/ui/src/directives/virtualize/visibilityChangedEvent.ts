export class VisibilityChangedEvent extends Event {
  static eventName = 'visibilityChanged';

  first: number;
  last: number;

  constructor(range: Range) {
    super(VisibilityChangedEvent.eventName, { bubbles: false });
    this.first = range.first;
    this.last = range.last;
  }
}

interface Range {
  first: number;
  last: number;
}