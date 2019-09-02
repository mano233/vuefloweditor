import {behaviorsCallBack} from './index';
import config from '@/config/defaultConfig'
import {Util} from '@antv/g6/src';


// behaviors中用的到具体回调函数
function clickAddNode (shape) {

    behaviorsCallBack.onClickAddNode = function (ev) {
        const graph = this.graph;
        this.node = graph.addItem('node', {
            x: ev.x,
            y: ev.y,
            label: config.defaultText,
            r : config.circleRadius,
            size : [config.polygonWidth,config.polygonHeight],
            color : config.defaultBckColor,
            id: Util.uniqueId(),
            style : {
                fill : config.defaultBckColor
            },
            shape,
        });
    };
}

// behaviors中用的到具体回调函数
function clickAddEdge (edge) {
    behaviorsCallBack.onClickAddEdge = function (ev) {
        const node = ev.item;
        const graph = this.graph;
        const point = {x: ev.x, y: ev.y};
        const model = node.getModel();
        if (this.addingEdge && this.edge) {
            graph.updateItem(this.edge, {
                target: model.id
            });

            this.edge = null;
            this.addingEdge = false;
        } else {
            this.edge = graph.addItem('edge', {
                source: model.id,
                target: point,
                shape : edge // 线条类型
            });
            this.addingEdge = true;
        }
    };
}

export {
    clickAddNode,
    clickAddEdge
};

