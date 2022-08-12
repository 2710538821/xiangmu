/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:32:40
 *
 * 企业管理
 */

import { createAPI } from '@/utils/request'

// export const list = data => createAPI('/comapnys', 'post')
// export const add = data => createAPI('/comapnys', 'post', data)
// export const update = data =>
//   createAPI(`/comapnys/${data.userId}`, 'get', data)
// export const remove = data => createAPI(`/comapnys/${data.id}`, 'get')
// export const detail = data =>
//   createAPI(`/comapnys/${data.userId}`, 'post', data)
// export const disabled = data => createAPI('/comapnys/state', 'post', data)

export const getCompanysList = data => createAPI('/companys', 'get', data)

export const delCompanysList = id => createAPI(`/companys/${id}`, 'delete')

export const addCompanysList = data => createAPI('/companys', 'post', data)

export const editState = data => createAPI(`/companys/${data.id}/${data.state}`, 'post')
