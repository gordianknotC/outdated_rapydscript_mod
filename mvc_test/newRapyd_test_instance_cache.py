#!/usr/bin/python
# -*- coding: utf-8 -*-
from Rapydscript_m.IDEfriendly import *

# __$statement$__
try:
	baselib = require('gordianknot/baselib.js')
	baselib.importALL(baselib,global)
	console_mode('node-codein', 'forever')
except:
	pass



class SuSuper:
	ttt = { }
	wefe = []
	def __init__(self, instance):
		#console.log(type(instance),type(self))
		if type(instance) == type(self):
			# successor constructor
			self.abacwef[instance.__name__] = instance
			self.wefe.append(instance)
		# real constructor
	def susuper_method(self):
		pass
class Super(SuSuper):
	__instance__ = { }
	ins = []
	def __init__(self, instance):
		if type(instance) == type(self):
			# successor constructor
			#console.log('''insert instance into __instance__ ,  instance = ''',instance.__dict__)
			#console.log('''insert instance into __instance__ ,  self = ''',self.__instance__.__dict__)
			if isEmpty(self.ttt[instance.__name__]): self.ttt[instance.__name__] = []
			self.ttt[instance.__name__].append(instance)

			if isEmpty(self.__instance__[instance.__name__]): self.__instance__[instance.__name__] = []
			self.__instance__[instance.__name__].append(instance)
		# real constructor

	def cacheInstance(self, instance):
		#console.log('cacheInstance',instance)
		self.__instance__[instance.__name__] = instance

	def super_method_pico(self):
		#console.log(self)
		pass

	def echo(self, mode, ref):
		if mode:
			#console.log(self,ref)
			#console.log('Super')
			pass
class CssStyle(Super):
	HTML_BORDER_FAMILY = ['border', 'border-top', 'border-bottom', 'border-left',
								   'border-right', 'border-width', 'border-style']
	HTML_BACKGROUND_FAMILY = ['background', 'background-color', 'background-image']
	HTML_POSITIONING_FAMILY = ['position', 'left', 'right', 'top', 'bottom', 'z-index',
									'pos', 'pos_hint', 'float', 'overflow', 'x', 'y', 'z']
	HTML_APPEARANCE_FAMILY = ['width', 'height', 'size', 'size_hint']
	HTML_TEXT_FAMILY = ['font-family', 'font-size', 'color', 'font-weight', 'font-style',
							 'text-decoration', 'text-align', 'line-height', 'letter-spacing',
							 'text-indent', 'text-transform', 'vertical-align']

	def __init__(self, init):
		# constructor
		#console.log('CssStyle"s self = ', self.properties())
		#console.log('CssStyle"s super name = ',CssStyle.prototype.__proto__.__name__)
		#console.log('CssStyle"s properties = ',CssStyle.prototype.properties())
		#console.log('Super"s properties = ',Super.prototype.properties())

		self.data = [1, 2, 3, 4, 5]
		#console.log('CssStyle"s Super class name = ',super_(CssStyle, self).__name__)
		super_(CssStyle, self).__init__(self)

	def echo(self, mode):
		if mode == 'super':
			# call super method
			#console.log('from CssStyle echo call super method: echo')
			super_(CssStyle, self).echo(mode, self)
		else:
			#console.log('call CssStyle echo')
			#console.log('CssStyle')
			pass
	def setInstanceInit(self):
		super_(CssStyle, self).cacheInstance(self)

	@property
	def __length__(self):
		return len(self.data)

class unittest(object):
	__instance__ = { }
	__inheritance__ = []
	def __init__(self):
		self.description = { }
		self.mode = None
		self.unittest_args = 'unittest'
	def __recordinheritance__(self, inheriter):
		pass
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
		self.info('------------------------------------------------------------------------------')
class TestCase(unittest):
	def setUp(self):
		self.set_some_args = 1
		self.css = CssStyle()
	def tearDown(self):
		console.log('TestCase tearDown')
	def test_for_test(self):
		self('testing for property decorator and class property assignment')
		self.assertEqual(self.css.__length__, 5, 'decorator property testing1')
		self.assertEqual(self.css.__length__, 3, 'decorator property testing1',
						 'css.__length__ should be 3, provided:'+self.css.__length__)
		self.ok(self.css.HTML_BORDER_FAMILY, 'setting class property', 'setting class property')

unittest.run()








