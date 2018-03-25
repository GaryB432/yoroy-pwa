import { Worder } from './worder';

describe('Worder', () => {
  let greeter: Worder;
  beforeEach(() => {
    greeter = new Worder('testing!');
  });
  it('should greet', () => {
    expect(greeter.create().length).toBe(6);
  });
});
