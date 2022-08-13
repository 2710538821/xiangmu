/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:49:44
 *
 * 题库有关的接口：自己写吧~~  已经被张老师删了 ^_^
 */

import { createAPI } from '@/utils/request'

// 获取数据
export const questionslist = (data) => createAPI('/questions', 'get', data)

// 删除数据
export const delQuestionslist = (id) => createAPI(`/questions/${id}`, 'delete')

// 获取详情
export const questionsDetails = (id) => createAPI(`/questions/${id}`, 'get')

// 精选题库列表
export const questionsChoice = () => createAPI('/questions/choice', 'get')

// 试题审核
export const questionsCheck = (id, data) => createAPI(`/questions/check/${id}`, 'POST', data)

// 精选题库上下架
export const questionsShangXia = (data) => createAPI(`/questions/choice/${data.id}/${data.publishState}`, 'post', data)

// 加入或移出精选
export const questionsAddRemove = (data) => createAPI(`/questions/choice/${data.id}/${data.choiceState}`, 'patch', data)

// 组题列表
export const getTopicList = (id) => createAPI('/questions/randoms', 'get')

// yege
// 获取题库详情
export const questionDetailsAPI = id => createAPI(`/questions/${id}`, 'GET')
// 获取学科的简单分类
export const questionSubjectAPI = () => createAPI('/subjects/simple', 'GET')
// 获取目录列表
export const catalogueListApi = (subjectID) => createAPI(`/tags/simple?subjectID=${subjectID}`, 'GET')

// 获取企业列表
export const getCompanyListAPI = () => createAPI('/companys', 'GET')

// 提交试题请求
export const portQuestionAPI = data => createAPI('/questions', 'POST', data)
// 题库详情
export const getQuestionDetailAPI = data => createAPI(`/questions/${data}`, 'GET')
// 获取提足列表的数据
export const getQuestionListAPI = data => createAPI(`/questions/randoms?page=${data.page}&pagesize=${data.pagesize}&keyword=${data.keywords}`, 'GET')
// 删除题组的数据
export const delQuestionDataAPI = id => createAPI(`/questions/randoms/${id},'DELETE`)
// 预览题组的数据
export const perviewQuestionAPI = id => createAPI(`/questions/${id}?id=${id}`, 'GET')
// 修改题库
export const exitQuestionAPI = data => createAPI(`/questions/${data.id}`, 'PUT', data)