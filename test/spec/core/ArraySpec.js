'use strict';
/* jshint unused: false */
describe('Test for core/Array.js', function () {

    var G = Global.core;

    it('core/Array has public methods', function () {
        expect(G.Array.args2Array).to.be.a('function');
        expect(G.Array.each).to.be.a('function');
    });

    it('core/Array is registed alias name space', function () {
        expect(Global.Array).to.eql(G.Array);
    });

    describe('#args2Array', function () {
        it('convert arguments to array instance', function () {
            var func = function (args1, args2){ return arguments;},
                args = func(1,2);

            expect(args.length).to.eql(2);
            expect(args instanceof Array).not.to.be.ok();

            expect(G.Array.args2Array(args) instanceof Array).to.be.ok();
        });
    });

    describe('#map2Array', function () {
        it('convert map to list', function () {
            var map = {
                    aaa: 'aaa',
                    bbb: 'bbb',
                    ccc: 'ccc'
                },
                list = G.Array.map2Array(map);
            expect(list).to.eql(['aaa', 'bbb', 'ccc']);
        });
    });

    describe('#each', function () {
        it('pass each content to callback', function () {
            var list = ['test0','test1', 'test2'],
                res  = [];

            G.Array.each(list, function(index, content){
                res.push(content);
            });
            expect(res).to.eql(list);
        });
        it('pass each index to callback', function () {
            var list = ['test0','test1', 'test2'],
                res  = [];

            G.Array.each(list, function(index, content){
                res.push(index);
            });
            expect(res).to.eql([0,1,2]);
        });
    });

    describe('#contains', function () {
        it('return true if list has target object', function () {
            var list = [1,2,3];
            expect(G.Array.contains(list, 1)).to.ok();
            expect(G.Array.contains(list, 2)).to.ok();
            expect(G.Array.contains(list, 3)).to.ok();
        });
        it('return false if list does not have target object', function () {
            var list = [1,2,3];
            expect(G.Array.contains(list, 4)).to.not.ok();
            expect(G.Array.contains(list, 5)).to.not.ok();
            expect(G.Array.contains(list, 6)).to.not.ok();
        });
    });

    describe('#getRandomNumList', function(){
        it('return array object which length is smae as length you passed', function(){
            var list = Global.Array.getRandomNumList(3);
            expect(list).to.have.length(3);
        });
        it('return array which contain uniq numbers', function(){
            var list = Global.Array.getRandomNumList(3);

            expect(list[0]).to.not.equal(list[1]);
            expect(list[0]).to.not.equal(list[2]);

            expect(list[1]).to.not.equal(list[0]);
            expect(list[1]).to.not.equal(list[2]);

            expect(list[2]).to.not.equal(list[0]);
            expect(list[2]).to.not.equal(list[1]);
        });
    });

    describe('#makeRandomList', function() {
        it('return list which made random',function() {
            var list = ['1', '2', '3'],
                random = Global.Array.makeRandomList(list);
            expect(random).to.have.length(3);
            //console.log(random);
        });
        it('return list which made random',function() {
            var list = ['1', '2', '3'],
                random = Global.Array.makeRandomList(list, 2);
            expect(random).to.have.length(2);
            //console.log(random);
        });
    });
});
