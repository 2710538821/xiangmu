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
