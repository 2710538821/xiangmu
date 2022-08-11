/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:49:44
 *
 * 题库有关的接口：自己写吧~~  已经被张老师删了 ^_^
 */

import { createAPI } from '@/utils/request'

// 目录列表
export const getTopicList = data => createAPI('/questions/randoms', 'get', data)

// 删除列表
export const delTopicList = id => createAPI(`/questions/randoms/${id}`, 'DELETE')
