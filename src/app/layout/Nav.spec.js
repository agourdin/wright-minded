import { doToggleNavburger } from './Nav';

describe('Nav.spec.js // Nav Component Local State', () => {
  it('should toggle isNavburgerActive true -> false', () => {
    const state = { isNavburgerActive: true };
    const newState = doToggleNavburger(state);

    expect(newState.isNavburgerActive).to.equal(false);
  });

  it('should toggle isNavburgerActive false -> true', () => {
    const state = { isNavburgerActive: false };
    const newState = doToggleNavburger(state);

    expect(newState.isNavburgerActive).to.equal(true);
  });
});
