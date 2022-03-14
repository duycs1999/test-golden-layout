import {GoldenLayoutComponent} from "./goldenLayoutComponent";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/table/lib/css/table.css";
import TreeMapComponent from "./treemap/TreeMapComponent";
import React, {
    useEffect,

    useRef,
    useState,
} from 'react';
import './test/styles.css'
import LeftComponent from "./components/LeftComponent";
import {useWindowSize} from "./utils";

export const COMPONENT_RESIZE = 'COMPONENT_RESIZE';

const App = () => {

    const golden_ref = useRef()

    const size = useWindowSize();

    useEffect(() => {
        golden_ref.current.updateSize()
    }, [size])


    const dispatchEvent = (eventName, componentKey = null) => {
        const event = new CustomEvent(eventName, {
            detail: componentKey,
        });
        window.dispatchEvent(event);
    };


    return (
        <div>
            <GoldenLayoutComponent
                htmlAttrs={{
                    style: {height: "520px", width: "auto", overflow: "auto"}
                }}
                config={{
                    settings: {
                        hasHeaders: true,
                        constrainDragToContainer: true,
                        reorderEnabled: true,
                        selectionEnabled: false,
                        popoutWholeStack: false,
                        blockedPopoutsThrowError: true,
                        closePopoutsOnUnload: true,
                        showPopoutIcon: true,
                        showMaximiseIcon: true,
                        showCloseIcon: true
                    },
                    dimensions: {
                        borderWidth: 5,
                        minItemHeight: 10,
                        minItemWidth: 10,
                        headerHeight: 20,
                        dragProxyWidth: 300,
                        dragProxyHeight: 200
                    },
                    content: [
                        {
                            type: "column",
                            content: [
                                {
                                    type: "row",
                                    content: [
                                        {
                                            title: "left component",
                                            type: "react-component",
                                            component: "testItem",
                                            props: {value: "I'm on the left"}
                                        },
                                        {
                                            title: "right component",
                                            type: "react-component",
                                            component: "testItem1",
                                            props: {value: "I'm on the center"}
                                        },
                                        {
                                            title: "right component",
                                            type: "react-component",
                                            component: "testItem2",
                                            props: {value: "I'm on the right"}
                                        },
                                    ]
                                },
                            ]
                        }
                    ]
                }}
                registerComponents={myLayout => {
                    golden_ref.current = myLayout
                    myLayout.registerComponent("testItem", LeftComponent);
                    myLayout.registerComponent("testItem1", TreeMapComponent);
                    myLayout.registerComponent("testItem2", TreeMapComponent);
                    myLayout.on('componentCreated', function (component) {
                        component.container.on('resize', function () {
                            const componentName = component.config.component;
                            dispatchEvent(COMPONENT_RESIZE, componentName);
                        });
                        component.container.on('show', function () {
                            const componentName = component.config.component;
                            dispatchEvent(COMPONENT_RESIZE, componentName);
                        });
                    });
                }
                }
            />
        </div>
    );

}

export default App;
