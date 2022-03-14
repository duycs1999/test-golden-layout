// import { createChart } from 'lightweight-charts';
// import React, {
//     createContext,
//     forwardRef,
//     useCallback,
//     useContext,
//     useEffect,
//     useImperativeHandle,
//     useLayoutEffect,
//     useRef,
//     useState,
// } from 'react';
// import {volumeData} from "./test/volumeData";
// import {areaData} from "./test/areaData";
//
// const Context = createContext();
//
// const initialData = areaData;
// const currentDate = new Date(initialData[initialData.length - 1].time);
//
// const LeftComponent = () => {
//     // The following variables illustrate how a series could be updated.
//     const series1 = useRef(null);
//     const [started, setStarted] = useState(false);
//
//     // The purpose of this effect is purely to show how a series could
//     // be updated using the `reference` passed to the `Series` component.
//     useEffect(() => {
//         if (series1.current === null) {
//             return;
//         }
//
//         if (started) {
//             const interval = setInterval(() => {
//                 currentDate.setDate(currentDate.getDate() + 1);
//                 const next = {
//                     time: currentDate.toISOString().slice(0, 10),
//                     value: 53 - 2 * Math.random(),
//                 };
//                 series1.current.update(next);
//             }, 1000);
//             return () => clearInterval(interval);
//         }
//     }, [started]);
//
//     return (
//         <>
//             <button type="button" onClick={() => setStarted(current => !current)}>
//                 {started ? 'Stop updating' : 'Start updating series'}
//             </button>
//             <Chart>
//                 <Series
//                     ref={series1}
//                     type={'line'}
//                     data={initialData}
//                 />
//             </Chart>
//         </>
//     );
// };
//
// export function Chart(props) {
//     const [container, setContainer] = useState(false);
//     const handleRef = useCallback(ref => setContainer(ref), []);
//     return (
//         <div ref={handleRef}>
//             {container && <ChartContainer {...props} container={container} />}
//         </div>
//     );
// }
//
// export const ChartContainer = forwardRef((props, ref) => {
//     const context = useRef({
//         api() {
//             if (!this._api) {
//                 const { children, container, ...rest } = props;
//                 this._api = createChart(container, {
//                     ...rest,
//                     width: container.clientWidth,
//                     height: 300,
//                 });
//                 this._api.timeScale().fitContent();
//             }
//             return this._api;
//         },
//         free() {
//             if (this._api) {
//                 this._api.remove();
//             }
//         },
//     });
//
//     useLayoutEffect(() => {
//         const { children, container, ...rest } = props;
//
//         const currentRef = context.current;
//         const chart = currentRef.api();
//
//         const handleResize = () => {
//             chart.applyOptions({
//                 ...rest,
//                 width: container.clientWidth,
//             });
//         };
//
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//             chart.remove();
//         };
//     }, []);
//
//     useLayoutEffect(() => {
//         const currentRef = context.current;
//         currentRef.api();
//     }, []);
//
//     useLayoutEffect(() => {
//         const currentRef = context.current;
//         const { children, container, ...rest } = props;
//         currentRef.api().applyOptions(rest);
//     }, []);
//
//     useImperativeHandle(ref, () => context.current.api(), []);
//
//     return (
//         <Context.Provider value={context.current}>
//             {props.children}
//         </Context.Provider>
//     );
// });
// ChartContainer.displayName = 'ChartContainer';
//
// export const Series = forwardRef((props, ref) => {
//     const parent = useContext(Context);
//     const context = useRef({
//         api() {
//             if (!this._api) {
//                 const { children, data, type, ...rest } = props;
//                 this._api = type === 'line' ? parent.api().addLineSeries(rest) : parent.api().addAreaSeries(rest);
//                 this._api.setData(data);
//             }
//             return this._api;
//         },
//         free() {
//             if (this._api) {
//                 parent.free();
//             }
//         },
//     });
//
//     useLayoutEffect(() => {
//         const currentRef = context.current;
//         currentRef.api();
//
//         return () => currentRef.free();
//     }, []);
//
//     useLayoutEffect(() => {
//         const currentRef = context.current;
//         const { children, data, ...rest } = props;
//         currentRef.api().applyOptions(rest);
//     });
//
//     useImperativeHandle(ref, () => context.current.api(), []);
//
//     return (
//         <Context.Provider value={context.current}>
//             {props.children}
//         </Context.Provider>
//     );
// });
// Series.displayName = 'Series';
//
// export default App