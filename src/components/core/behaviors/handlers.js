import {behaviorsCallBack} from './index';
import G6 from '@antv/g6';

// behaviors中用的到具体回调函数
function clickAddNode (shape) {
    behaviorsCallBack.onClickAddNode = function (ev) {
        const graph = this.graph;
        this.node = graph.addItem('node', {
            x: ev.x,
            y: ev.y,
            id: G6.Util.uniqueId(),
            shape,
        });
    };
}

export {clickAddNode};

