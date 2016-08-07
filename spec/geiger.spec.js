'use babel';

import AtomBetaNotifier from '../lib/geiger';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('AtomBetaNotifier', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('geiger');
  });

  describe('when the geiger:check event is triggered', () => {

    // it('hides and shows the view', () => {
    //   // This test shows you an integration test testing at the view level.
    //
    //   // Attaching the workspaceElement to the DOM is required to allow the
    //   // `toBeVisible()` matchers to work. Anything testing visibility or focus
    //   // requires that the workspaceElement is on the DOM. Tests that attach the
    //   // workspaceElement to the DOM are generally slower than those off DOM.
    //   jasmine.attachToDOM(workspaceElement);
    //
    //   expect(workspaceElement.querySelector('.geiger')).not.toExist();
    //
    //   // This is an activation event, triggering it causes the package to be
    //   // activated.
    //   atom.commands.dispatch(workspaceElement, 'geiger:check');
    //
    //   waitsForPromise(() => {
    //     return activationPromise;
    //   });
    //
    //   runs(() => {
    //     // Now we can test for view visibility
    //     let atomBetaNotifierElement = workspaceElement.querySelector('.geiger');
    //     expect(atomBetaNotifierElement).toBeVisible();
    //     atom.commands.dispatch(workspaceElement, 'geiger:toggle');
    //     expect(atomBetaNotifierElement).not.toBeVisible();
    //   });
    // });
  });
});
