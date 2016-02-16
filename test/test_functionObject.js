baselib = require('gordianknot/baselib.js')
baselib.importALL(baselib, global)
console_mode('node-codein', 'onc')





Callable = function (__init__) {
	function Class(behavior,successor_class) {
		function instance() {
			//console.log('inside obj.... obj = ', instance)
			if (Class.prototype.__call__ != undefined) {
				var caller = instance.caller
				// arguments is immutable as python's set object
				//arguments = [caller].concat(arguments)
				args = arguments.tolist()
				args.push(caller)
				instance.__call__.apply(instance,args)
			}else {
				throw '[not callable] __call__ method is not found in '
				instance.name + ' ' + instance.__name__
			}
		};
		instance.__proto__ = Class.prototype;
		instance.__name__ = __init__.name.split('_')[0]
		instance.__init__ = __init__
		instance.__class__ = Class

		if (behavior == "__inheritance__") {
			//successor_class = arguments[1]
			if (successor_class == undefined) return instance
			inheritee = instance
			//console.log('inheritance defualts')
			function inheriter() {
				//console.log('inside obj.... obj = ', inheriter)
				if (successor_class.prototype.hasOwnProperty('__call__')) {
					var caller = inheriter.caller
					args = arguments.tolist()
					args.push(caller)
					inheriter.__call__.apply(inheriter, args);
				} else {
					r = inheriter.name + ' ' + inheriter.__name__ + ' is not callable'
					console.trace(r);throw r
				}
			};
			//console.log('inheritee = ', inheritee.properties())
			//console.log('inheritee.prototype = ', inheritee.prototype.properties())
			inheriter.__proto__ = inheritee;
			inheriter.__name__ = successor_class.prototype.__name__;
			inheriter.__init__ = successor_class.prototype.__init__;

			if (inheritee.__proto__.hasOwnProperty('__recordinheritance__')){
				if (isEmpty(inheritee.__proto__.__inheritance__)) inheritee.__proto__.__inheritance__= []
				function get_succeccor(){return successor_class}
				get_succeccor.__name__ = successor_class.__name__
				inheritee.__proto__.__inheritance__.append(get_succeccor)
				console.log('record inheritance')
			}
			return inheriter;
		} else {
			// run user constructor
			__init__.apply(instance, arguments);
			return instance;
		}
	};
	//console.log('class default settings')
	Class.__name__ = Class.prototype.__name__ = __init__.name.split('_')[0]
	Class.__init__ = Class.prototype.__init__ = __init__
	Class.prototype.__class__ = Class
	Class.__dict__ = Class.prototype.__dict__ = function __dict__(){
		var self = this;
		return this.properties()
	};
	Class.__dict__ = property(Class.__dict__, Class);
	Class.prototype.__dict__ = property(Class.prototype.__dict__, Class.prototype);
	return Class;
};


var API = Callable(function API() {
	if (arguments[0] == "__inheritance__") return;
	console.log('API __init__()')
	this.prop = 'and a property value .prop';
	this.data = []
	this.tags = ['HTML', 'HTML5', 'CSS']
});
API.prototype.__call__ = function (arg) {
	var self = this
	arg = arguments[0]
	caller = arguments[arguments.length-1]
	console.log(arg,self.prop);
	console.log('self =- ',self)
	console.log('caller = ',caller,'caller.anme = ',caller.name)
	console.log('arguments = ',arguments)

};
API.prototype.__recordinheritance__ = function (){};

API.prototype.boss = function (arg) {
	var self = this
	console.log(arg, this.prop);
	console.log('self = ',self.__dict__)
};
var Sub = Callable(function Sub() {
	if (arguments[0] == "__inheritance__") return;
	console.log('Sub __init__()')
	this.xml = ['HTML', 'HTML5', 'CSS']
});
Sub.prototype = new API('__inheritance__', Sub)


Sub.prototype.bz = function (arg) {
	console.log(arg, this.prop);
};
Sub.prototype.loz = function (arg) {
	console.log(arg, this.prop);
};
console.log('new API()')
var a = new API();
var b = new Sub();
a('.call() invocation');
a.boss('.boss() invocation');
console.log('======== props in API ============')
console.log(API.properties())
console.log('======== props in API.prototype ============')
console.log(API.prototype.properties())
console.log('======== props in a ============')
console.log(a.properties())
console.log(a.__proto__.properties())
console.log(a.__proto__.__proto__.properties())
console.log('======== props in Sub ============')
console.log(Sub.properties())
console.log('======== props in Sub.prototype ============')
console.log(Sub.prototype.properties())
console.log('======== props in b ============')
console.log(b.properties())
console.log(b.__proto__.properties())
console.log(b.__proto__.__proto__.properties())


function test(){a('call again','another arg')}
function test2(){b('call b to see whether __call__ could be inherited')}
test()
test2()





var unittest = Callable(function unittest_() {
	var self = this;
	if (arguments[0] == "__inheritance__") return;
	self.description = {};
});
unittest.prototype.__classproperties__ = function __classproperties__() {
	var self = this;
	self.__instance__ = {};
	self.__inheritance__ = [];
};
unittest = _$rapyd$_defineClassProp(unittest);


var TestCase = Callable(function TestCase_() {
	var self = this;
	if (arguments[0] == "__inheritance__") return;
	super_(TestCase, self).__init__.apply(self, arguments);
});
TestCase.prototype = new unittest("__inheritance__", TestCase);
TestCase.prototype.setUp = function setUp() {
	var self = this;
	self.set_some_args = 1;
	console.log("TestCase SetUp");
	console.log('self = ',self.__dict__)
};
TestCase.prototype.__call__ = function __call__() {
	var self = this;	// complex body AST_Defun
	var args = [].slice.call(arguments, 0);
	var caller, name;	//complex body AST_Scope declare var as local
	caller = args[args.length - 1];	//DEFPRINT(AST_SimpleStatement 179
	name = caller.name;	//DEFPRINT(AST_SimpleStatement 180
	console.log('self = ',self.__dict__)
	console.log('description = ',self.description)
	console.log("inside __call__");	//DEFPRINT(AST_SimpleStatement 183
	console.log("caller = ", name);	//DEFPRINT(AST_SimpleStatement 184
};
TestCase = _$rapyd$_defineClassProp(TestCase);






