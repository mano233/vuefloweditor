import G6 from '@antv/g6';

// 暴露出去的回调函数
let behaviorsCallBack = {
    onClickAddNode: null,
};

// 点击添加元素
G6.registerBehavior('click-add-node', {
    getEvents () {
        return {
            'canvas:click': 'onClick',
        };
    },
    onClick (ev) {
        // 利用回调函数操作，提高扩展性
        behaviorsCallBack.onClickAddNode.call(this, ev);
    },
});

//添加直线线条
G6.registerBehavior('click-add-edge-line', {
    getEvents () {
        return {
            'node:click': 'onClick',
            mousemove: 'onMousemove',
            'edge:click': 'onEdgeClick' // 点击空白处，取消边
        };
    },
    onClick (ev) {
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
                shape : 'line'
            });
            this.addingEdge = true;
        }
    },
    onMousemove (ev) {
        const point = {x: ev.x, y: ev.y};
        if (this.addingEdge && this.edge) {
            this.graph.updateItem(this.edge, {
                target: point
            });
        }
    },
    onEdgeClick (ev) {
        const currentEdge = ev.item;
        // 拖拽过程中，点击会点击到新增的边上
        if (this.addingEdge && this.edge == currentEdge) {
            this.graph.removeItem(this.edge);
            this.edge = null;
            this.addingEdge = false;
        }
    }
});

//添加曲线线条
G6.registerBehavior('click-add-edge-curve', {
    getEvents () {
        return {
            'node:click': 'onClick',
            mousemove: 'onMousemove',
            'edge:click': 'onEdgeClick' // 点击空白处，取消边
        };
    },
    onClick (ev) {
        console.log(this);
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
                shape : 'cubic'
            });
            this.addingEdge = true;
        }
    },
    onMousemove (ev) {
        const point = {x: ev.x, y: ev.y};
        if (this.addingEdge && this.edge) {
            this.graph.updateItem(this.edge, {
                target: point
            });
        }
    },
    onEdgeClick (ev) {
        const currentEdge = ev.item;
        // 拖拽过程中，点击会点击到新增的边上
        if (this.addingEdge && this.edge == currentEdge) {
            this.graph.removeItem(this.edge);
            this.edge = null;
            this.addingEdge = false;
        }
    }
});

//删除元素
G6.registerBehavior('delete-add-node', {
    getEvents () {
        return {
            'node:click': 'nodeClick'
        };
    },
    nodeClick (ev) {
        console.log(ev);
        this.graph.removeItem(ev.item);
    }
});

export {behaviorsCallBack}
