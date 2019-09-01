import G6 from '@antv/g6/src';
import {clickAddNode} from './register/behaviors/handlers';
import {register} from './register';



export class Graph {
    constructor () {
        this.instance = null;
    }

    _getInstance(){
        return this.instance;
    }

    /**
     * init-> register(node edge behaviors)
     * @param canvasOptions
     * @returns {null|{"node:click": string, mousemove: string, "edge:click": string}}
     */
     _init (canvasOptions) {
        if (!this.instance) {
            register(G6);
            this.instance = new G6.Graph(canvasOptions);
        }
        this.instance.clickAddNode = clickAddNode.bind(this.instance);
        return this.instance;
    }

    /**
     *
     * @param data
     */
     static draw (data) {
        if (!data) {
            throw new Error('data not fount');
        }
        this.instance.data(data);
        this.instance.render();
    }
}



