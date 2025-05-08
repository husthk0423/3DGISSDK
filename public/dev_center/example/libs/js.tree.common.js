'use strict';

// Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 判断书叫是否为 null 或 undefined
 *
 * like lodash/isNil
 *
 * @param value - 未知数据
 */
function isNil(value) {
    return value === undefined || value === null;
}
/**
 * 如果值为 null 或 undefined，则使用默认值
 *
 * like lodash/defaultTo
 *
 * @param value - 未知数据
 * @param defaultValue - 默认值
 */
function defaultTo(value, defaultValue) {
    return isNil(value) ? defaultValue : value;
}
/**
 * 获取值
 *
 * like lodash/get
 *
 * @param object - 对象
 * @param value - 未知数据
 * @param defaultValue - 默认值
 */
function get(object, path, defaultValue) {
    return defaultTo(object[path], defaultValue);
}

/**
 * 根ID
 *
 * @public
 */
const ROOT_ID = '__root__';
/**
 * id 的属性名
 *
 * @public
 */
const ID_KEY = 'id';
/**
 * parentId 的属性名
 *
 * @public
 */
const PARENT_ID_KEY = 'parentId';
/**
 * 子级的属性名
 *
 * @public
 */
const CHILDREN_KEY = 'children';

/**
 * 类数组的 map 方法
 *
 * @public
 *
 * @param data         - 数结构数据
 * @param callback     - 处理回调，注意：如果返回的对象子级不存在将不进行递归操作
 * @param childrenKey  - 自定义子节点属性名称
 */
function map(data, callback, childrenKey = CHILDREN_KEY) {
    function iter(data, parents) {
        return data.map((node, index) => {
            const source = callback(Object.assign({}, node), index, parents);
            const children = iter(defaultTo(source[childrenKey], []), parents.concat(node));
            if (children.length > 0) {
                return Object.assign(Object.assign({}, source), { [childrenKey]: children });
            }
            // 递归并且浅拷贝
            return source;
        });
    }
    return iter(data, []);
}

/**
 * 遍历所有节点
 *
 * @public
 *
 * @param data         - 数结构数据
 * @param callback     - 处理回调，返回 true 将跳过子级的遍历操作
 * @param childrenKey  - 自定义子节点属性名称
 */
function each(data, callback, childrenKey = CHILDREN_KEY) {
    function iter(data, parents) {
        const items = [];
        data.forEach((node, index) => {
            if (callback(node, index, parents)) {
                return;
            }
            iter(defaultTo(node[childrenKey], []), parents.concat(node));
        });
        return items;
    }
    return iter(data, []);
}

/**
 * 类数组的 filter 方法
 *
 * @public
 *
 * @param data         - 数结构数据
 * @param callback     - 处理回调，注意：如果返回的对象子级不存在将不进行递归操作
 * @param childrenKey  - 自定义子节点属性名称
 */
function filter(data, callback, childrenKey = CHILDREN_KEY) {
    function iter(data, parents) {
        const items = [];
        data.forEach((node, index) => {
            if (callback(node, index, parents)) {
                items.push(Object.assign({}, node));
                return;
            }
            const children = iter(defaultTo(node[childrenKey], []), parents.concat(node));
            if (children.length > 0) {
                items.push(Object.assign(Object.assign({}, node), { [childrenKey]: children }));
            }
        });
        return items;
    }
    return iter(data, []);
}

/**
 * 排除某些数据
 *
 * @public
 *
 * @param data         - 数结构数据
 * @param callback     - 处理回调，返回 true 的数据将被过滤掉
 * @param childrenKey  - 自定义子节点属性名称
 */
function exclude(data, callback, childrenKey = CHILDREN_KEY) {
    function iter(data, parents) {
        const items = [];
        data.forEach((node, index) => {
            if (callback(node, index, parents)) {
                return;
            }
            // 判读是否存在子级
            const children = defaultTo(node[childrenKey], []);
            if (children.length === 0) {
                items.push(node);
                return;
            }
            const results = iter(children, parents.concat(node));
            if (results.length > 0) {
                items.push(Object.assign(Object.assign({}, node), { [childrenKey]: results }));
            }
        });
        return items;
    }
    return iter(data, []);
}

const resolveRepairWithOptions = ({ idKey = ID_KEY, parentKey = PARENT_ID_KEY, childrenKey = CHILDREN_KEY, resolve, insert = (list, node) => list.push(node), }) => ({
    idKey,
    parentKey,
    childrenKey,
    resolve,
    insert,
});
/**
 * 根据列表修复缺失的节点数据
 *
 * @param list - 不完整列表数据
 * @param  config - 配置参数
 * @returns 已修复好的数结构
 */
const repairWith = (list, config) => {
    const { idKey, parentKey, childrenKey, resolve, insert } = resolveRepairWithOptions(config);
    const rootNodes = [];
    const parents = {};
    const createNode = (data) => {
        const children = [];
        const current = Object.assign(Object.assign({}, data), { [childrenKey]: children });
        parents[data[idKey]] = current;
        return current;
    };
    const repairNodeLinks = (current) => {
        const parentId = current[parentKey];
        const parent = parents[parentId];
        // 查找本地是否存在上级
        if (parent) {
            insert(parent[childrenKey], current);
            return;
        }
        // 查找外部是存在上级
        const data = resolve(parentId);
        if (!data) {
            insert(rootNodes, current);
            return;
        }
        const target = createNode(data);
        // 插入当前节点
        insert(target[childrenKey], current);
        // 继续向上修复
        repairNodeLinks(target);
    };
    list.forEach((item) => {
        const data = resolve(item[idKey]);
        if (!data)
            return;
        repairNodeLinks(createNode(data));
    });
    return rootNodes;
};

/**
 * 和 isNil 结果相反
 *
 * @param value - 需要检查的值
 */
function isNotNil(value) {
    return isNil(value) === false;
}
/**
 * 断言，模拟 node api
 *
 * @param value    - 断言结果
 * @param message  - 断言失败提示
 */
/* istanbul ignore next */
function assert(value, message) {
    if (value)
        return;
    if (message instanceof Error) {
        throw message;
    }
    throw new Error(message);
}
/**
 * 删除对象的 key，并返回它的值
 *
 * @param source       - 普通对象
 * @param key          - 属性名
 * @param defaultValue - 默认值
 */
function popKey(object, key, defaultValue) {
    const value = object[key];
    delete object[key];
    return defaultTo(value, defaultValue);
}
/**
 * 数据导出，允许外部自定义根节点
 *
 * @public
 *
 * @param nodes - 包含所有层级的数据
 * @param root  - 根节点，支持自定义函数
 */
function exporter(result, root) {
    const nodes = result.childNodes;
    if (typeof root === 'function') {
        return root(nodes, result) || [];
    }
    return nodes[defaultTo(root, ROOT_ID)] || [];
}

/**
 * 方便外部二次封装
 *
 * 如：封装一个类 jQuery 的 API 工具，方便查找节点
 *
 * @public
 *
 * @param data    - 行数据
 * @param options - 配置项
 */
function parse(data, options = {}) {
    const idKey = defaultTo(options.idKey, ID_KEY);
    const parentKey = defaultTo(options.parentKey, PARENT_ID_KEY);
    const childrenKey = defaultTo(options.childrenKey, CHILDREN_KEY);
    const transform = defaultTo(options.transform, (x) => x);
    const insert = defaultTo(options.insert, (siblings, node) => siblings.push(node));
    const nodes = {};
    const childNodes = {};
    data.forEach((row, i) => {
        // 数据结构转换
        const node = transform(row, i);
        // 支持过滤掉某些数据
        if (isNil(node))
            return;
        // 获取节点ID
        const id = getId(node, row, idKey);
        // id 必须存在
        assert(isNotNil(id), `id is required, in ${i}.`);
        // 获取子级元素
        const children = childNodes[id];
        if (children) {
            // @ts-ignore
            node[childrenKey] = children;
        }
        else {
            childNodes[id] = node[childrenKey];
        }
        // 获取上级节点ID
        //  注意: 不能使用 _.get 的 `defaultValue` 参数， 那个只有不存在 `key` 才会返回默认值
        const parentId = defaultTo(getId(node, row, parentKey), ROOT_ID);
        // 获取同级元素
        const siblings = childNodes[parentId];
        if (siblings) {
            insert(siblings, node);
        }
        else {
            insert((childNodes[parentId] = []), node);
        }
        // 为了方便外部根据ID获取节点信息
        nodes[id] = node;
    });
    return {
        idKey,
        parentKey,
        childrenKey,
        nodes,
        childNodes,
    };
}
/**
 * 优先从 node 中获取 id
 * 如果没有再从原始对象中获取
 */
function getId(node, raw, key) {
    const id = get(node, key);
    return isNil(id) ? get(raw, key) : id;
}

/**
 * 行转树
 *
 * @public
 *
 * @param data    - 行数据
 * @param options - 配置项
 *
 * @example <caption>默认</caption>
 *
 * ```js
 * toTree([
 *   { id: 1, parentId: null },
 *   { id: 2, parentId: null },
 *   { id: 3, parentId: 1 },
 * ])
 * // ->
 * [
 *   {
 *     id: 1,
 *     parentId: null,
 *     children: [
 *       { id: 3, parentId: 1, children: [] }
 *     ]
 *   },
 *   { id: 2, parentId: null, children: [] },
 * ]
 * ```
 *
 * @example <caption>自定义 id/parentId 属性</caption>
 *
 * ```js
 * toTree(
 *   [
 *     { sub: 1, parent: null },
 *     { sub: 2, parent: null },
 *     { sub: 3, parent: 1 },
 *   ],
 *   { idKey: 'sub', parentKey: 'parent' }
 * )
 * // ->
 * [
 *   {
 *     sub: 1,
 *     parent: null,
 *     items: [
 *       { sub: 3, parent: 1, items: [] }
 *     ]
 *   },
 *   { sub: 2, parent: null, items: [] },
 * ]
 * ```
 *
 * @example <caption>自定义 children 属性</caption>
 *
 * ```js
 * toTree(
 *   [
 *     { id: 1, parentId: null },
 *     { id: 2, parentId: null },
 *     { id: 3, parentId: 1 },
 *   ],
 *   { children: 'items' }
 * )
 * // ->
 * [
 *   {
 *     id: 1,
 *     parentId: null,
 *     items: [
 *       { id: 3, parentId: 1, items: [] }
 *     ]
 *   },
 *   { id: 2, parentId: null, items: [] },
 * ]
 * ```
 *
 * @example <caption>自定义根节点</caption>
 *
 * ```js
 * toTree(
 *   [
 *     { id: 1, parentId: '__root__' },
 *     { id: 2, parentId: '__root__' },
 *     { id: 3, parentId: 1 },
 *   ],
 *   { root: '__root__' }
 * )
 * // ->
 * [
 *   {
 *     id: 1,
 *     parentId: '__root__',
 *     children: [
 *       { id: 3, parentId: 1, children: [] }
 *     ]
 *   },
 *   { id: 2, parentId: '__root__', children: [] },
 * ]
 * ```
 *
 * @example <caption>自定义函数导出</caption>
 *
 * ```js
 * toTree(
 *   [
 *     { id: 1, parentId: '__root__' },
 *     { id: 2, parentId: '__root__' },
 *     { id: 3, parentId: 1 },
 *   ],
 *   { root: nodes => nodes['__root__'] }
 * )
 * // ->
 * [
 *   {
 *     id: 1,
 *     parentId: '__root__',
 *     children: [
 *       { id: 3, parentId: 1, children: [] }
 *     ]
 *   },
 *   { id: 2, parentId: '__root__', children: [] },
 * ]
 * ```
 *
 * @example <caption>数据转换</caption>
 *
 * ```js
 * toTree(
 *   [
 *     { id: 1, parentId: null },
 *     { id: 2, parentId: null },
 *     { id: 3, parentId: 1 },
 *   ],
 *   {
 *     transform(row) {
 *       // 返回 null 或 undefined 的数据不回保留
 *       if (row.id === 3) return
 *       // 可以进行浅拷贝后修改，防止破坏原始对象
 *       return { ...row, test: true }
 *     }
 *   }
 * )
 * // ->
 * [
 *   { id: 1, parentId: null, test: true, children: [] },
 *   { id: 2, parentId: null, test: true, children: [] },
 * ]
 * ```
 *
 * @example <caption>自定义插入顺序</caption>
 *
 * ```js
 * toTree(
 *   [
 *     { id: 2, parentId: null, sort: 2 },
 *     { id: 5, parentId: 1, sort: 1 },
 *     { id: 4, parentId: 1, sort: 2 },
 *     { id: 3, parentId: null, sort: 3 },
 *     { id: 1, parentId: null, sort: 1 },
 *   ],
 *   {
 *     insert(siblings, node) {
 *       // ps: 任意层级的数据都是这样处理的
 *       const index = siblings.findIndex((n) => n.sort > node.sort)
 *
 *       // 根据位置选择插入到兄弟节点当中
 *       if (index === -1) {
 *         siblings.push(node)
 *       } else {
 *         siblings.splice(index, 0, node)
 *       }
 *     }
 *   }
 * )
 * // ->
 * [
 *   {
 *     id: 1,
 *     parentId: null,
 *     sort: 1
 *     children: [
 *       { id: 4, parentId: null, sort: 1, children: [] },
 *       { id: 5, parentId: null, sort: 2, children: [] },
 *     ]
 *   },
 *   { id: 2, parentId: null, sort: 2, children: [] },
 *   { id: 3, parentId: null, sort: 3, children: [] },
 * ]
 * ```
 */
function toTree(data, options = {}) {
    return exporter(parse(data, options), options.root);
}

/**
 * 树转行
 *
 * @public
 *
 * @param data        - 树结构数据
 * @param childrenKey - children 属性名
 */
function toRows(data, childrenKey = CHILDREN_KEY) {
    const result = [];
    function callback(source) {
        const target = Object.assign({}, source);
        const children = popKey(target, childrenKey, []);
        result.push(target);
        children.forEach(callback);
    }
    data.forEach(callback);
    return result;
}

/**
 * 发布版本
 *
 * @public
 */
const version = '0.5.0';

// exports.CHILDREN_KEY = CHILDREN_KEY;
// exports.ID_KEY = ID_KEY;
// exports.PARENT_ID_KEY = PARENT_ID_KEY;
// exports.ROOT_ID = ROOT_ID;
// exports.each = each;
// exports.exclude = exclude;
// exports.exporter = exporter;
// exports.filter = filter;
// exports.map = map;
// exports.parse = parse;
// exports.repairWith = repairWith;
// exports.toRows = toRows;
// exports.toTree = toTree;
// exports.version = version;
