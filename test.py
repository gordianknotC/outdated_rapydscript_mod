#!/usr/bin/python
# -*- coding: utf-8 -*-
__author__ = 'gordiaknot'
def dot_captureL(s,level = 1):
	s = s[s.lfind('.'):]
	if level == 1:	return s
	else:
		level -= 1
		dot_captureR(s,level)
def dot_captureR(s,level = 1):
	s = s[:-1*s.rfind('.')]
	if level == 1:	return s
	else:
		level -= 1
		dot_captureR(s,level)
pyj_source_code = {}

def generate_module_pyj():
		keys 		= pyj_source_code.keys()
		keys.sort()
		keys.reverse()
		collection 	= None
		m_tmp 		= ''
		init_tmp	= ''
		final		= ''
		def gen(_keys,collection):
			remained_keys = _keys[:]
			for key in _keys:
				remained_keys.remove(key)
				# main module
				__init__ 	= True if '__init__' in key else False
				_parent  	= dot_captureR(key) if '.' in key else ''
				data	 	= pyj_source_code[key]
					if not collection: collection = _parent
					if collection == _parent:
						# same module
						if __init__:
							# generate module members of previous'
							if init_tmp:
								module_member_tobe_generated = m_tmp
								members = simple_parser.gen_module_members(module_member_tobe_generated['code'],
																			   data['indent'])
								module_code = init_tmp + module_member_tobe_generated + members
								final 		=   module_code + final
								init_tmp 	= ''

							if not init_tmp:
								init_tmp = pyj_source_code['code']

						else:
							m_tmp  = m_tmp + pyj_source_code[key]['code']

					else:
						# found another module
						collection = _parent
						gen(remained_keys,collection)


