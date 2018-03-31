import { Worder } from './worder';

describe('Worder', () => {
  let greeter: Worder;
  beforeEach(() => {
    greeter = new Worder();
  });
  it('should greet', () => {
    expect(greeter.create().length).toBe(5);
  });
});
