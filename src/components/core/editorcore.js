import G6 from '@antv/g6';


/**
 *
 * @param {HTMLElement} containerDom
 * @returns {*}
 */

export class Graph{
    constructor(){
    }
    static graph;
    static width;
    static height;
    //初始化
    init(containerDom){
        if (this.graph) {
            return this.graph;
        }
        this.width = document.querySelector('#mountNode').offsetWidth;
        this.height = document.querySelector('#mountNode').offsetHeight;


        this.graph = new G6.Graph({
            container: containerDom,
            width: this.width,
            height: 500,
            modes: {
                default: ['drag-node','click-select','click-add-edge',{
                    // type: 'tooltip',
                    // formatText(model) {
                    //      console.log(model);
                    //      return model.lable;
                    // }
                }]
            },
        });

        G6.registerBehavior('click-add-edge', {
            getEvents() {
                return {
                    'node:click': 'onClick' ,
                    mousemove: 'onMousemove',
                    'edge:click': 'onEdgeClick' // 点击空白处，取消边
                };
            },
            onClick(ev) {
                console.log(ev);
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
            onMousemove(ev) {
                const point = {x: ev.x, y: ev.y};
                if (this.addingEdge && this.edge) {
                    this.graph.updateItem(this.edge, {
                        target: point
                    });
                }
            },
            onEdgeClick(ev) {
                const currentEdge = ev.item;
                // 拖拽过程中，点击会点击到新增的边上
                if (this.addingEdge && this.edge == currentEdge) {
                    this.graph.removeItem(this.edge);
                    this.edge = null;
                    this.addingEdge = false;
                }
            }
        });


        return this.graph;
    }
    //渲染
    draw(data){
        if (!data) {
            throw new Error('data not fount');
        }
        this.graph.data(data);
        this.graph.render();
    }
}



