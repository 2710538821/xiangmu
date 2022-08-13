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
