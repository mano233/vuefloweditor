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
    //初始化
    init(containerDom){
        let graph = this.graph;
        if (graph) {
            return graph;
        }
        graph = new G6.Graph({
            container: containerDom,
            width: 500,
            height: 500,
            modes: {

                default: ['drag-canvas', {

                    type: 'zoom-canvas',

                    sensitivity: 5

                }],

                edit: ['click-select']

            }
        });
        return graph;
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



