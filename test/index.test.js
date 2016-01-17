var opt = require('../lib/index.js');

describe('When defining a prototype function', () => {
	var MyObject = function() { 
		this.testValue = 'abc';
	};
	
	MyObject.prototype.func = opt(0, function(a) { 
		return this.testValue 
	});
	
	var inst = new MyObject();
	
	it('Should correctly bind _this_', () =>
		expect(inst.func()).to.equal(inst.testValue)
	);
});

describe('When more arguments passed than priorities defined for', () => {
	var func = opt(0, function(a) { return arguments[1] });
	
	it('Should pass all of them through to function body', () =>
		expect(func(0, 'extra')).to.equal('extra')
	);
});

describe('When passing 2 arguments to a 3 argument function', () => {
	describe('And the first argument is of lowest priority', () => {
		var func = opt(1,0,0, (a, b, c) => ({ a, b, c }));
		var args = func(1, 2);
		it('Should drop the first argument', () => {
			expect(args.a).to.equal(undefined);
			expect(args.b).to.equal(1);
			expect(args.c).to.equal(2);
		});
	});
	describe('And the second argument is of lowest priority', () => {
		var func = opt(0,1,0, (a, b, c) => ({ a, b, c }));
		var args = func(1, 2);
		it('Should drop the second argument', () => {
			expect(args.a).to.equal(1);
			expect(args.b).to.equal(undefined);
			expect(args.c).to.equal(2);
		});
	});
	describe('And the third argument is of lowest priority', () => {
		var func = opt(0,0,1, (a, b, c) => ({ a, b, c }));
		var args = func(1, 2);
		console.log(args);
		it('Should drop the third argument', () => {
			expect(args.a).to.equal(1);
			expect(args.b).to.equal(2);
			expect(args.c).to.equal(undefined);
		});
	});
	describe('And the first argument is of highest priority', () => {
		var func = opt(0,1,1, (a, b, c) => ({ a, b, c }));
		var args = func(1, 2);
		console.log(args);
		it('Should drop the third argument', () => {
			expect(args.a).to.equal(1);
			expect(args.b).to.equal(2);
			expect(args.c).to.equal(undefined);
		});
	});
	describe('And the second argument is of highest priority', () => {
		var func = opt(1,0,1, (a, b, c) => ({ a, b, c }));
		var args = func(1, 2);
		console.log(args);
		it('Should drop the third argument', () => {
			expect(args.a).to.equal(1);
			expect(args.b).to.equal(2);
			expect(args.c).to.equal(undefined);
		});
	});
	describe('And the third argument is of highest priority', () => {
		var func = opt(1,1,0, (a, b, c) => ({ a, b, c }));
		var args = func(1, 2);
		console.log(args);
		it('Should drop the second argument', () => {
			expect(args.a).to.equal(1);
			expect(args.b).to.equal(undefined);
			expect(args.c).to.equal(2);
		});
	});
});