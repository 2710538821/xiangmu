import { createAPI } from '@/utils/request'

// 获取数据
export const usersList = (data) => createAPI('/users', 'get', data)
