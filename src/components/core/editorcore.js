import G6 from '@antv/g6';

//添加元素
G6.registerBehavior('click-add-node', {
    getEvents() {
        return {
            'canvas:click': 'onClick',
        };
    },
    onClick(ev) {
        console.log(ev);
        const graph = this.graph;
        this.node = graph.addItem('node', {
            x: ev.x,
            y: ev.y,
            id: G6.Util.uniqueId()
        });
    },
});

//添加线条
G6.registerBehavior('click-add-edge', {
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
                target: point
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
    getEvents() {
        return {
            'node:click' : 'nodeClick'
        };
    },
    nodeClick(ev){
        console.log(ev);
        this.graph.removeItem(ev.item);
    }
});


export class Graph{
    constructor () {
        this.instance = null;
        this.width = null;
        this.height = null;
    }

    /**
     *
     * @param canvasOptions
     * @returns {null|{"node:click": string, mousemove: string, "edge:click": string}}
     */
    init (canvasOptions) {
        if (!this.instance) {
            this.instance = new G6.Graph(canvasOptions);
        }
        return this.instance;
    }

    /**
     *
     * @param data
     */
    draw(data){
        if (!data) {
            throw new Error('data not fount');
        }
        this.instance.data(data);
        this.instance.render();
    }
}



