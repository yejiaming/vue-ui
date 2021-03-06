/**
 * Created by yejiaming on 2017/9/28.
 */
import {Scroll} from '../utils/scroll-top';
export var scroll = {
    // 当绑定元素插入到 DOM 中。
    bind: function (el, binding, vnode) {
        // console.log('首次加载挂载到DOM节点中——一次挂载之运行一次');
    },
    inserted: function (el, binding) {
        new Scroll(el);
    },
    update: function (el, binding) {
        // console.log('更新DOM节点或者绑定数据——一次挂载之运行多次');
    },
    componentUpdated: function (el, binding) {
        // console.log('完成更新DOM节点或者绑定数据——一次挂载之运行多次');
    },
    unbind: function (el, binding) {
        // console.log('取消该节点的挂载——一次挂载之运行一次');
    }
};
