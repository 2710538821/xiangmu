/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:57:26
 *
 * 标签有关的接口：自己写吧~~  已经被张老师删了 ^_^
 */

import { createAPI } from '@/utils/request'

export const tagsList = (data) => createAPI('/tags', 'get', data)

// 标签列表
export const getTagsList = data => createAPI('/tags', 'get', data)

// 标签状态
export const getTagsState = data => createAPI(`/tags/${data.id}/${data.state}`, 'post')

// 添加标签
export const addTags = data => createAPI('/tags', 'post', data)

// 标签详情
export const tagsDetail = id => createAPI(`/tags/${id}`, 'get')

// 修改标签
export const updateTags = data => createAPI(`/tags/${data.id}`, 'put', data)

// 删除标签
export const removeTag = id => createAPI(`/tags/${id}`, 'delete')
