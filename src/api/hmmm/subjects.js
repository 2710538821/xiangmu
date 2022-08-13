/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:53:23
 *
 * 学科有关的接口：自己写吧~~  已经被张老师删了 ^_^
 */

import { createAPI } from '@/utils/request'

export const subjectsList = () => createAPI('/subjects', 'get')

export const subjectsSimpleList = () => createAPI('/subjects/simple', 'get')

// 学科列表
export const getSubjectsList = params => createAPI('/subjects', 'get', params)

// 新增学科
export const addSubject = data => createAPI('/subjects', 'post', data)

// 根据id获得学科详情
export const getSubjectById = id => createAPI(`/subjects/${id}`, 'get')

// 学科修改
export const editSubjectById = data => createAPI(`/subjects/${data.id}`, 'put', data)

// 学科删除
export const removeSubjectById = id => createAPI(`/subjects/${id}`, 'delete')

// 获取学科简单列表
export const getSimpleList = data => createAPI('/subjects/simple', 'get', data)
