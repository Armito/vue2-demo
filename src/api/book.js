/**
 * @module api/book
 */

/**
 * 获取图书列表
 * @function
 * @param  {object} params
 * @param  {number} params.pageSize
 * @param  {number} params.pageNum
 */
export const getBookList = (params) => {}

/**
 * @typedef {object} Book
 * @property {string} Book.title
 * @property {string} [Book.author]
 * @property {number} Book.prize
 * @property {string | number} [Book.id]
 */

/**
 * 添加图书
 * @function
 * @param {Book} params
 */
export const addBook = (params) => {}

/**
 * 删除图书
 * @function
 * @param {string | number} id
 */
export const delBook = (id) => {}
