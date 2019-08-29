import {behaviorsCallBack} from './index';
import {Util} from '@antv/g6/src';

// behaviors中用的到具体回调函数
function clickAddNode (shape) {
    behaviorsCallBack.onClickAddNode = function (ev) {
        const graph = this.graph;
        this.node = graph.addItem('node', {
            x: ev.x,
            y: ev.y,
            id: Util.uniqueId(),
            shape,
        });
    };
}

export {clickAddNode};

