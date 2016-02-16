#!/usr/bin/python
# -*- coding: utf-8 -*-
__author__ = 'gordiaknot'
import regex
from Memento.Logger import Logger
log 	= Logger('func_test')
info 	= log.info
debug 	= log.debug

def find_module_pos(s,level = 0,start = 0,end = -1,newline='',ptn = '@module',new_search = True):
	indent 			= level * '\t'
	searched_word 	= newline + indent + ptn
	pri_module 		= s.find(searched_word,start,end)
	info('[find_module_pos] {0:2} {1:5} {2:5} {3:5} {4} search for:{5}:',[level,start,end,'',pri_module,newline + indent + ptn])

	if newline: is_newline = True
	else: 		is_newline = False

	if pri_module >= 0:
		info('[find_module_pos] {0:2} {1:5} {2:5} {3:5} {4} founded!',[level,start,end,is_newline,pri_module])
		if newline: return pri_module
		if pri_module ==0:
			return pri_module
		else:
			level += 1
			start = (pri_module -1) - 1
			end = start + len(searched_word) +2
			info('[find_module_pos] {0:2} {1:5} {2:5} {3:5} add tab to search again',[level,start,end,is_newline])
			find_module_pos(s,level = level,start = start,end = end,new_search = False,ptn = ptn)
	else:
		info('[find_module_pos] {0:2} {1:5} {2:5} {3:5} {4} cannot found!',[level,start,end,is_newline,pri_module])
		if new_search: return -1
		if not newline:
			info('[find_module_pos] de-indent and added newline to search again',[])
			level -= 1
			newline = '\n'
			find_module_pos(s,level = level,start = start,end = end,newline = newline,new_search = False,ptn = ptn)
		else:
			info('[find_module_pos] cannot find, start new search',[])
			start = start +level
			level = 0
			find_module_pos(s,level = level,start = start,new_search = True,ptn = ptn)
def find_class_pos(s,level = 0,start = 0,newline='',ptn = 'class '):
	find_module_pos(s,ptn = ptn)

def is_module_prop_or_class_prop(s,level = 0,start = 0):
	pri_module 	= s.find('@module')
	pri_class 	= s.find('class ')
def crop_by_range(s,start,end,ptn = None,reverse=False):
	if not ptn: ptn = ''
	l = len(ptn)
	if not reverse:
		s0 = s[0:start]
		s1 = s[end+l:]
		#print 's- = ',s0
		#print 's1 = ',s1
		return s0+s1
	else:
		s0 = s[start:end+1]
		return s0
def findall(data,ptn,result =None,start=0):
	if result == None: result = []
	r = data.find(ptn,start)
	if r>=0:
		result.append(r)
		return findall(data,ptn,result, start= r+1)
	else: return result
def strip_comment(m):
	if not m: return ''

	ptn1 	= '"""'
	ptn2 	= "'''"
	pattern = r'#[\s]*[^\n]+'
	m 		= regex.sub(pattern,'',m)
	start = end = prev_end = deviance= ''
	ptn1_matched = findall(m,ptn1)
	#print ptn1_matched
	if ptn1_matched:
		for i in range(len(ptn1_matched)):
			if i % 2 == 0: start = ptn1_matched[i]
			if i % 2 == 1:
				end = ptn2_matched[i]
				if deviance:
					start -= deviance
					end -= deviance
				m = crop_by_range(m,start,end,ptn = ptn1)
				deviance = end - start + len(ptn1)

	ptn2_matched = findall(m,ptn2)
	#print ptn2_matched
	if ptn2_matched:
		for i in range(len(ptn2_matched)):
			if i % 2 == 0: start = ptn2_matched[i]
			if i % 2 == 1:
				end = ptn2_matched[i]
				if deviance:
					start -= deviance
					end -= deviance
				m = crop_by_range(m,start,end,ptn = ptn2)
				deviance = end - start+len(ptn2)


	return m
def dot_captureL(s,level = 1 , reverse=False,end = None):
	fnd = s.find('.',0,end)
	if level == 1:
		if reverse:	return s[fnd+1:]
		else:
			if fnd == -1: return s[:]
			return s[:fnd]
	else:
		level -= 1
		end = fnd
		return dot_captureL(s,level,reverse,end)
def dot_captureR(s,level = 1 , reverse=False,end = None):
	fnd = s.rfind('.',0,end)
	if level == 1:
		if reverse:
			if fnd == -1: return s[:]
			return s[:fnd]
		else: 		return s[fnd+1:]
	else:
		level -= 1
		end = fnd
		return dot_captureR(s,level,reverse,end)

def _dot_captureL(s,level = 1 , reverse=False,end = None):
	if level == 1:
		if reverse:	return s[s.find('.',0,end)+1:]
		else: 		return s[:s.find('.',0,end)]
	else:
		level -= 1
		end = s.find('.',0,end)
		return dot_captureL(s,level,reverse,end)
def _dot_captureR(s,level = 1 , reverse=False,end = None):
	if level == 1:
		if reverse:	return s[:s.rfind('.',0,end)]
		else: 		return s[s.rfind('.',0,end)+1:]
	else:
		level -= 1
		end = s.rfind('.',0,end)
		return dot_captureR(s,level,reverse,end)


ifmain_spliter_pattern		= r"""if __name__ == ['"]__main__['"]:[\w\W]+"""
source = '''class Rectangle(ViewComponent):
			def __classproperties__(self):
				self.__instance__ = { }
				self.__behavior__ = { }
			def __init__(self, instance):
				if type(instance) == 'object':
					# successor constructor
					if isEmpty(self.__instance__[instance.name]): self.__instance__[instance.name] = []
					self.__instance__[instance.name].append(instance)
				# constructor
				self.data = { }
				self.html_target = { }
				self.conditionData = { }

			def getInstance(self, ins_name):
				# todo implementation
				# get button instance from protype.__instance__
				return self.prototype.__instance__
		class Button(ViewComponent):
			def __classproperties__(self):
				self.__instance__ = { }
				self.__behavior__ = { }
				self.__test__ = 'abc'
			def __init__(self, instance):
				if type(instance) == 'object':
					# successor constructor
					if isEmpty(self.__instance__[instance.name]): self.__instance__[instance.name] = []
					self.__instance__[instance.name].append(instance)

				# constructor
				self.data = { }
				self.html_target = { }
				self.conditionData = { }
			# real constructor
			#vs = VisualElements(self,data)
			#self.VisualElements = VisualElements(self,data)
			#for i in data:
			#	self.setAsWatchObject(i,self.getAttributesValue(i),mode = 'visual_component')


			def getInstance(self, ins_name):
				# todo implementation
				# get button instance from protype.__instance__
				return self.prototype.__instance__

		if __name__ == '__main__':
			pass





		return {"VisualElements":VisualElements,"Button":Button,"States":States,"State":State,"Animation":Animation,"ViewComponent":ViewComponent,"Rectangle":Rectangle}
	return {"MVC":MVC,"UiKit":UiKit}'''
data = regex.sub(ifmain_spliter_pattern,'\n\n\n',source)

print source




if __name__ == '__main__':
	def test_for_findall_and_strip_comment():
		s = """''' or doc string '''
		# some comment class propperties():
HTML_APPEARANCE_FAMILY = CssStyle.prototype.HTML_APPEARANCE_FAMILY
HTML_BORDER_FAMILY = CssStyle.prototype.HTML_BORDER_FAMILY
HTML_BACKGROUND_FAMILY = CssStyle.prototype.HTML_BACKGROUND_FAMILY
HTML_POSITIONING_FAMILY = CssStyle.prototype.HTML_POSITIONING_FAMILY
HTML_TEXT_FAMILY = CssStyle.prototype.HTML_TEXT_FAMILY
__rapyd_comps__ = []
''' another string '''
sfsdfsdf
sdf
sdf
sf"""

		s2 = '''

#!/usr/bin/python
# -*- coding: utf-8 -*-
from Memento.Rapydscript_m.IDEfriendly import *
from Rapydscript_m.lib.rapydmvc.MVC.mvc import View
from Rapydscript_m.lib.rapydmvc.Util.unittest import unittest
from Rapydscript_m.lib.rapydmvc.Util import CssStyle
		'''

		print '==============='
		print strip_comment(s)
		print '==============='
		print strip_comment(s2)

	def test_for_find_module_and_class_pos():
		f_path = r'E:\SkyDrive\programming\Memento\Rapydscript_m\mvc_test\module_test_A.py'
		data = ''
		with open(f_path,'rb') as f:
			data = f.read()

		print find_module_pos(data)
		print find_class_pos(data)

	def test_for_dot_capture():
		s = 'unittest'
		print dot_captureL(s)
		print _dot_captureL(s)
		print dot_captureR(s)
		print _dot_captureR(s)
		s = 'rapydscript.unittest.abc'
		print dot_captureL(s,reverse = True)
		print _dot_captureL(s,reverse = True)
		print dot_captureL(s,reverse=False)
		print _dot_captureL(s,reverse=False)
		print dot_captureR(s,reverse = True)
		print _dot_captureR(s,reverse = True)
		print dot_captureR(s,reverse=False)
		print _dot_captureR(s,reverse=False)

	#test_for_find_module_and_class_pos()
	#test_for_dot_capture()


