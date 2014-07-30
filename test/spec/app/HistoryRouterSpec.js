(function() {
    'use strict';
    var _historyRouter = new Global.app.HistoryRouter();

    describe('Test for app/HistoryRouter.js', function() {

        it('class has those public method', function() {
            expect(_historyRouter.start).to.be.a('function');
            expect(_historyRouter.changePage).to.be.a('function');
        });
    });

})();
