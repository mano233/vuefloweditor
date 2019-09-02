import G6 from '@antv/g6/src';
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
     * @private
     * @param canvasOptions
     * @returns {null}
     */
     _init (canvasOptions) {
        if (!this.instance) {
            register(G6);
            this.instance = new G6.Graph(canvasOptions);
        }

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

    /**
     * 清空画板
     * @private
     */
     _clearCanvas(item){
        item.clear();
        item.refresh();
    }
}



