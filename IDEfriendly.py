# coding=utf-8

document = ''
def insert(lst, index, value):
	value = [value]
	l = lst[0:index]
	r = lst[index:]
	l = l.concat(value)
	return l.concat(r)
def isEmpty(n):
	if type(n) == 'object':
		if len(n) == 0: return True
		for key in dict.keys(n):
			return False
		return True

	if type(n) == 'string':
		if n.strip():
			return False
		else:
			return True

	if n:
		return False
	else:
		return True
def cls(cls, *args):
	tmp = ''
	for i in range(1, len(arguments)):
		tmp += 'arguments['+i+'],'
	fn = arguments[0]
	ins = eval('new fn('+tmp[0:-1]+')')
	return ins
def set_scope(module_path):
	scope = { }
	scope.__module__ = module_path
	return scope
def module(fn_module):
	def getAllExcept(lst, _module):
		def wrapper():
			name = _module.name
			_filter = lst
			tmp = { }
			m = eval(name).prototype
			for k, v in dict.items(m):
				is_k_in_filter = k in _filter
				if not is_k_in_filter:
					tmp[k] = v
			return tmp
		return wrapper

	if isEmpty(fn_module.prototype):
		module_member_data = fn_module()
		module_member_data.ALL = getAllExcept(['ALL', 'scope'], fn_module)
		scope_attrs = []
		scope = module_member_data.scope
		_filter = ['arguments', 'caller', 'length', 'name', 'prototype', '__proto__', '__module__']
		for key, value in dict.items(module_member_data):
			if key == 'scope':
				for k, v in dict.items(value):
					is_k_in_filter = k in _filter
					if not is_k_in_filter:
						console.log('scope var..', k, v)
						if isEmpty(module_member_data[k]):
							module_member_data[k] = v
						else:
							raise '[Error][Naming Confliction]module-scope variable: ['+k+'] interfere with module '\
																						  'member: ['+k+']'
						scope['_'+k] = v
						scope_attrs.append(k)
		module_member_data['scope'] = scope
		fn_module.prototype = module_member_data        # expose module members to module prototype

		def setter_callback(scope_obj, _attr):
			def wrapper(_value):
				eval(scope_obj.__module__).prototype.scope['_'+_attr] = _value
			return wrapper
		def getter_callback(scope_obj, _attr):
			def wrapper():
				return eval(scope_obj.__module__).prototype.scope['_'+_attr]
			return wrapper

		for attr in scope_attrs:
			console.log('set getter and setter for ', attr)
			scope.__defineSetter__(attr, setter_callback(scope, attr))
			scope.__defineGetter__(attr, getter_callback(scope, attr))

		fn_module.prototype.__defineSetter__(attr, getter_callback(scope, attr))
		fn_module.prototype.__defineGetter__(attr, getter_callback(scope, attr))

		fn_module.prototype.prototype = fn_module.prototype
		return fn_module.prototype
	else:
		return fn_module.prototype
def super_(cls, instance):
	level = ''
	def find_class_name(ref, name, level):
		level += ".__proto__"
		if ref.__proto__.__name__ == name:
			return ref.__proto__, level
		else:
			return find_class_name(ref.__proto__, name, level)
	super_name = cls.prototype.__proto__.__name__
	instance.name = cls.name
	super_class, level = find_class_name(instance, super_name, level)
	instance.__superlevel__ = level
	return super_class
def uuid():
	def s4():
		return Math.floor((1+Math.random())*0x10000).\
			toString(16).substring(1);
	return s4()+s4()+'_'+s4()+'_'+s4()+'_'\
		   +s4()+'_'+s4()+s4()+s4();
def property(fn, scope):
	def setter(_cls, k):
		def wrapper(value):
			if isEmpty(_cls.prototype.__property_methods__[k].__property_init__):
				_cls.prototype.__property_methods__[k].__property_init__ = True
				return
			if type(value) == 'function':
				_cls.prototype.__property_methods__[k] = value
			else:
				raise 'decorated property only allowed for assigning to function'
		return wrapper

	def getter():
		return scope.prototype.__property_methods__[fn.name].call(this)

	if isEmpty(scope.prototype.__property_methods__):
		scope.prototype.__property_methods__ = { }
	scope.prototype.__property_methods__[fn.name] = fn
	scope.prototype.__defineGetter__(fn.name, getter)
	scope.prototype.__defineSetter__(fn.name, setter(scope, fn.name))
	return
class console(object):
	@staticmethod
	def log(self):
		pass
	@staticmethod
	def group(self):
		pass
	@staticmethod
	def info(self):
		pass
	@staticmethod
	def groupEnd(self):
		pass
	@staticmethod
	def debug(self):
		pass
def arguments():
	pass
def RegExp():
	pass
def jQuery():
	pass
def re():
	pass
def Math():
	pass
def RegExp():
	pass
def require(a):
	pass
def condole():
	pass
def console_mode():
	pass
def deepEqual(a, b):
	pass
def getter():
	pass
def setter():
	pass
this = {}
class unittest(object):
	def __init__(self):
		self.description = { }
		self.mode = None
	def __recordinheritance__(self, inheriter):
		pass
	def __classproperties__(self):
		self.__instance__ = { }
		self.__inheritance__ = []

	def __call__(self, *args):
		caller = args[-1]
		name = caller.name
		self.info(args[0])
		self.info('______________________________________________________________________________')
	def info(self, msg):
		name = '%c'+msg
		color = 'background: #fff; color: #222'
		console.info(name, color)
	def test_ok(self, msg):
		name = '%c'+msg+'\t %cOK'
		color = 'background: #fff; color: #0092D6'
		console.info(name, color, 'color:Blue')
	def failed(self, msg, failed):
		name = '%c'+msg+'\t %cFailed!'
		color = 'background: #fff; color: #000000'
		console.info(name, color, 'color:Red')
		console.error('\t\t'+failed)
	def run(self):
		for successor in self.__inheritance__:
			s = successor()
			s = eval('new s')
			s.setUp()
			for key, value in s.__proto__.items():
				if 'test' == key[0:4].lower():
					if self.mode == None:
						self.print_title(key, s)
						s[key]()
						console.log('\n')
						console.groupEnd('[END]')
						console.log('\n')
			s.tearDown()
	def pyassert(self, a, okmsg, failed):
		if isEmpty(a):
			if not failed: failed = okmsg
			self.failed(okmsg, failed)
		else:
			self.test_ok(okmsg)
	def assertEqual(self, a, b, ok, failed):
		self.pyassert(deepEqual(a, b), ok, failed)
	def ok(self, a, ok, failed):
		self.assertTrue(a, ok, failed)
	def assertTrue(self, a, ok, failed):
		self.pyassert(a, ok, failed)

	def assertFalse(self, a, ok, failed):
		self.pyassert(not a, ok, failed)

	def createTable(self, data):
		console.group()
		console.table(data)
		console.groupEnd()

	def addrow(self, d):
		obj = dict(a = 1, b = 2, c = 3)
		data = { }
		title = d.title
		del d.title
		data[title] = d
		return data

	def print_title(self, n, s):
		class_name = s.__name__
		fn_name = n
		self.info('\n')
		console.group('[{0}] {1}            \n'.format(class_name, fn_name))
		self.info('______________________________________________________________________________')





