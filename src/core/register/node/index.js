import editorStyle from "@/config/defaultStyle";
const Item = require('@antv/g6/src/item/item');
const SingleShapeMixin = require('@antv/g6/src/shape/single-shape-mixin');
const Util = require('@antv/g6/src/util');

const dashArray = [
    [0,1],
    [0,2],
    [1,2],
    [0,1,1,2],
    [0,2,1,2],
    [1,2,1,2],
    [2,2,1,2],
    [3,2,1,2],
    [4,2,1,2]
];
const interval = 9;
const lineDash = [4, 2, 1, 2];

export function registerNode(G6){
    G6.Shape.registerFactory('anchor', {
        defaultShapeType: 'marker'
    });
    G6.Shape.registerAnchor('single-anchor', Util.mix({}, SingleShapeMixin, {
        itemType: 'anchor',

        drawShape(cfg, group) {
            const shapeType = this.shapeType;
            const style = this.getShapeStyle(cfg);
            const shape = group.addShape(shapeType, {
                attrs: style
            });
            return shape;
        },

        setState(name, value, item) {
            if(name === 'active-anchor') {
                if(value) {
                    this.update({style: {...editorStyle.anchorPointHoverStyle}}, item);
                }else{
                    this.update({style: {...editorStyle.anchorPointStyle}}, item);
                }
            }
        }
    }));
    G6.Shape.registerAnchor('marker',{ shapeType:'marker' },'single-anchor');
    G6.registerNode('base-node', {
        icon: null,
        iconWidth: 14,
        selectedColor: '#eee',
        unSelectedColor: '#f9f9f9',
        borderColor: '#bbb',
        drawAnchor(group) {
            const bbox = group.get('children')[0].getBBox();
            this.getAnchorPoints().forEach((p, i) => {
                const anchorContainer = group.addGroup();
                const anchor = new Item({
                    type: 'anchor',
                    group: anchorContainer,
                    capture: false,
                    index: i,
                    isActived: false,
                    model: {
                        style: {
                            x: bbox.minX + bbox.width * p[0],
                            y: bbox.minY + bbox.height * p[1],
                            ...editorStyle.anchorPointStyle,
                            cursor: editorStyle.cursor.hoverEffectiveAnchor,
                        }
                    },
                });
                anchor.isAnchor = true;
                anchor.toFront();
                let hotpot;
                anchor.showHotpot = function () {
                    hotpot = anchorContainer.addShape('marker', {
                        attrs: {
                            x: bbox.minX + bbox.width * p[0],
                            y: bbox.minY + bbox.height * p[1],
                            ...editorStyle.anchorHotsoptStyle
                        }
                    });
                    hotpot.toFront();
                    anchor.getKeyShape().toFront();
                };
                anchor.setActived = function () {
                    anchor.update({style: {...editorStyle.anchorPointHoverStyle}});
                };
                anchor.clearActived = function () {
                    anchor.update({style: {...editorStyle.anchorPointStyle}});
                };
                anchor.setHotspotActived = function (act) {
                    hotpot &&
                    (act ?
                     hotpot.attr(editorStyle.anchorHotsoptActivedStyle)
                         : hotpot.attr(editorStyle.anchorHotsoptStyle))
                };
                group.anchorShapes.push(anchorContainer);
                group.getAllAnchors = () => {
                    return group.anchorShapes.map(c => {
                        c.filter(a => a.isAnchor)
                    })
                };
                group.getAnchor = (i) => {
                    return group.anchorShapes.filter(a => a.get('index') === i)
                }
            });
        },
        drawShape(cfg, group) {
            const shapeType = this.shapeType;
            let style = this.getShapeStyle(cfg);
            const shape = group.addShape(shapeType, {
                attrs: {
                    ...style,
                }
            });
            if(cfg.icon){
                let attrs = {
                    x: style.x + cfg.iconPaddingLeft,
                    y: style.y + cfg.iconPaddingTop,
                    width: cfg.iconWidth,
                    height: cfg.iconHeight,
                };
                if(shapeType === 'circle'){
                    attrs = {
                        x: style.x- style.r + cfg.iconPaddingLeft,
                        y: style.y - style.r + cfg.iconPaddingTop,
                        width: cfg.iconWidth,
                        height: cfg.iconHeight,
                    }
                }else if(shapeType === 'path'){
                    attrs = {
                        x: cfg.iconPaddingLeft,
                        y: cfg.iconPaddingTop,
                        width: cfg.iconWidth,
                        height: cfg.iconHeight,
                    }
                }
                group.icon = group.addShape('image', {
                    attrs: {
                        img:cfg.icon,
                        ...attrs,
                    }
                });
                if(cfg.hideIcon){
                    group.icon.hide();
                }
            }
            group.anchorShapes = [];
            group.showAnchor = (group) => {
                this.drawAnchor(group);
            };
            group.clearAnchor = (group) => {
                group.anchorShapes && group.anchorShapes.forEach(a => a.remove());
                group.anchorShapes = [];
            };
            group.clearHotpotActived = (group) => {
                group.anchorShapes && group.anchorShapes.forEach(a => {
                    if (a.isAnchor)
                        a.setHotspotActived(false);
                });
            };
            return shape;
        },
        setState(name, value, item) {
            const group = item.getContainer();
            if (name === 'show-anchor') {
                if (value) {
                    group.showAnchor(group);
                } else {
                    group.clearAnchor(group);
                }
            } else if (name === 'selected') {
                const rect = group.getChildByIndex(0);
                if (value) {
                    rect.attr('fill', item.getModel().selectedColor);
                } else {
                    rect.attr('fill', item.getModel().unSelectedColor);
                }
            } else if (name === 'hover') {
                const rect = group.getChildByIndex(0);
                const text = group.getChildByIndex(1);
                if (value) {
                    rect.attr('cursor', editorStyle.cursor.hoverNode);
                    if(text)
                        text.attr('cursor', editorStyle.cursor.hoverNode);
                } else {
                    rect.attr('cursor', 'default');
                    if(text)
                        text.attr('cursor', 'default');
                }
            }
        },
        runAnimate(cfg, group){
            if(cfg.active){
                let totalArray = [];
                let index = 0;
                const shape = group.getFirst();
                shape.animate({
                    onFrame() {
                        for (let i = 0; i < 9; i += interval) {
                            totalArray = totalArray.concat(lineDash);
                        }
                        const cfg = {
                            lineDash: dashArray[index].concat(totalArray)
                        };
                        index = (index + 1) % interval;
                        return cfg;
                    },
                    repeat: true
                }, 5000);
            }
        },
        afterDraw(cfg, group) {
            this.runAnimate(cfg,group);
        },
        afterUpdate(cfg, group) {
            const icon = group.get('group').icon;
            if(cfg.hideIcon && icon && icon.get('visible')){
                icon.hide();
            }else if(!cfg.hideIcon && icon && !icon.get('visible')){
                icon.show();
            }
        },
        getAnchorPoints() {
            return [
                [0.5, 0], // top
                [1, 0.5], // right
                [0.5, 1], // bottom
                [0, 0.5], // left
            ]
        },
        initStyle(cfg){
            cfg.selectedColor = this.selectedColor;
            cfg.unSelectedColor = this.unSelectedColor;
            cfg.icon = this.icon;
            cfg.iconWidth = this.iconWidth;
            cfg.iconHeight = this.iconHeight;
            cfg.iconPaddingTop = this.iconPaddingTop;
            cfg.iconPaddingLeft = this.iconPaddingLeft;
            return cfg;
        },
    }, 'single-shape');
    G6.registerNode('task-node', {
        shapeType: 'rect',
        selectedColor: '#95D6FB',
        unSelectedColor: '#E7F7FE',
        borderColor: '#1890FF',
        iconWidth: 12,
        iconHeight: 12,
        iconPaddingLeft: 2,
        iconPaddingTop: 2,
        getShapeStyle(cfg) {
            cfg.size = [80, 44];
            cfg = this.initStyle(cfg);
            const width = cfg.size[0];
            const height = cfg.size[1];
            const style = {
                x: 0 - width / 2,
                y: 0 - height / 2,
                width,
                height,
                ...editorStyle.nodeStyle,
                fill: cfg.unSelectedColor,
                stroke: this.borderColor,
            };
            return style;
        }
    }, 'base-node');
}
