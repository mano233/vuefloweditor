import G6 from '@antv/g6';

let list = ['#000'];

//自定义图形
G6.registerNode('diamond', {
    draw(cfg, group) {
        //如果数组长度大于1位，删除以为
        if(list.length > 1){
            list.shift();
        }
        // 如果 cfg 中定义了 style 需要同这里的属性进行融合
        const shape = group.addShape('path', {
            attrs: {
                path: this.getPath(cfg), // 因为增加了 update 所以要把共用方法提取出来
                stroke: 'black', // 颜色应用到边上，如果应用到填充，则使用 fill: cfg.color
                fill : list[0]
            }
        });
        if(cfg.label) { // 如果有文本
            // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
            // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
            // style.text = cfg.label;
            group.addShape('text', {
                // attrs: style
                attrs: {
                    x: 0, // 居中
                    y: 0,
                    textAlign: 'center',
                    textBaseline: 'middle',
                    text: cfg.label,
                    fill: 'red'
                }
            });
        }
        return shape;
    },
    getPath() {
        const path = [
            ['M', -50, -50], // 右侧点
            ['L', -50,50], // 下部
            ['L', 50, 50], // 左侧
            ['Z'] // 封闭
        ];
        return path;
    },
    update(cfg, node) {
        const group = node.getContainer(); // 获取容器
        const shape = group.get('children')[0]; // 按照添加的顺序
        const style = {
            path: this.getPath(),
            stroke: cfg.color
        };
        shape.attr(style); // 更新属性
        // 更新文本的逻辑类似，但是需要考虑 cfg.label 是否存在的问题
        // 通过 label.attr() 更新文本属性即可
    }
});

//添加圆形元素
G6.registerBehavior('click-add-node-circle', {
    getEvents () {
        return {
            'canvas:click': 'onClick',
        };
    },
    onClick (ev) {
        // 如果数组长度大于1位，删除以为
        if(list.length > 1){
            list.shift();
        }

        console.log(list);

        const graph = this.graph;
        this.node = graph.addItem('node', {
            x: ev.x,
            y: ev.y,
            id: G6.Util.uniqueId(),
            shape : 'circle',
            color : 'black',
            style : {
                fill:  list[0]
            }
        });

    },
});

//添加方形元素
G6.registerBehavior('click-add-node-rect', {
    getEvents () {
        return {
            'canvas:click': 'onClick',
        };
    },
    onClick (ev) {
        //如果数组长度大于1位，删除以为
        if(list.length > 1){
            list.shift();
        }
        console.log(list);
        const graph = this.graph;
        this.node = graph.addItem('node', {
            x: ev.x,
            y: ev.y,
            id: G6.Util.uniqueId(),
            shape : 'rect',
            size : [70,50],
            color : 'black',
            style : {
                fill:  list[0]
            }
        });

    },
});

//添加自定义图形三角形元素
G6.registerBehavior('click-add-node-triangle', {
    getEvents () {
        return {
            'canvas:click': 'onClick',
        };
    },
    onClick (ev) {
        const graph = this.graph;
        this.node = graph.addItem('node', {
            x: ev.x,
            y: ev.y,
            id: G6.Util.uniqueId(),
            shape : 'diamond',
        });
    },
});

//自定义箭头
G6.registerEdge('line-arrow', {
    draw(cfg, group) {
        const { startPoint, endPoint } = cfg
        const keyShape = group.addShape('path', {
            attrs: {
                path: [
                    [ 'M', startPoint.x, startPoint.y ],
                    [ 'L', endPoint.x, endPoint.y ]
                ],
                stroke: '#00F',
                lineWidth: 1,
                startArrow: {
                    path: 'M 10,0 L -10,-10 L -10,10 Z',
                    d: 10
                },
                endArrow: {
                    path: 'M 10,0 L -10,-10 L -10,10 Z',
                    d: 10
                }
            }
        });
        return keyShape
    }
}, 'line')

//添加箭头的直线
G6.registerBehavior('click-add-edge-arrow', {
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
                shape : 'line-arrow',
                color : 'red',
                style : {
                    fill : 'red'
                }
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




export default list;





