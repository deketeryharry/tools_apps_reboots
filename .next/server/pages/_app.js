/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./components/Navigation.tsx":
/*!***********************************!*\
  !*** ./components/Navigation.tsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Navigation)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-jsx/style */ \"styled-jsx/style\");\n/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst navLinks = [\n    {\n        name: \"당첨자 추출기\",\n        href: \"/random-selector\"\n    },\n    {\n        name: \"글자수세기\",\n        href: \"/word-counter\"\n    },\n    {\n        name: \"로또 추첨기\",\n        href: \"/lotto-generator\"\n    },\n    {\n        name: \"키워드 분석기\",\n        href: \"/keyword-analyzer\"\n    },\n    {\n        name: \"연봉 계산기\",\n        href: \"/salary-calculator\"\n    },\n    {\n        name: \"뉴스 분석기\",\n        href: \"/news-analyzer\"\n    }\n];\nfunction Navigation() {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default()), {\n                id: \"ce793790f28e755\",\n                children: \".nav-container.jsx-ce793790f28e755{max-width:900px;margin:0 auto;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;height:56px;padding:0 16px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.nav-title.jsx-ce793790f28e755{font-weight:700;font-size:20px;margin-right:24px;color:#191f28}.nav-links.jsx-ce793790f28e755{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;gap:8px;overflow-x:auto;-webkit-flex-shrink:1;-ms-flex-negative:1;flex-shrink:1;min-width:0;-ms-overflow-style:none;scrollbar-width:none}.nav-links.jsx-ce793790f28e755::-webkit-scrollbar{display:none}@media(max-width:768px){.nav-title.jsx-ce793790f28e755{font-size:18px;margin-right:12px;white-space:nowrap}.nav-container.jsx-ce793790f28e755{gap:0}}@media(max-width:600px){.nav-title.jsx-ce793790f28e755{display:none}}\"\n            }, void 0, false, void 0, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                style: {\n                    width: \"100%\",\n                    background: \"#fff\",\n                    borderBottom: \"1px solid #e5e8eb\",\n                    marginBottom: 32,\n                    position: \"fixed\",\n                    top: 0,\n                    left: 0,\n                    zIndex: 100,\n                    height: 56,\n                    boxShadow: \"0 2px 8px rgba(0,0,0,0.04)\"\n                },\n                className: \"jsx-ce793790f28e755\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"jsx-ce793790f28e755\" + \" \" + \"nav-container\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                            href: \"/\",\n                            style: {\n                                textDecoration: \"none\"\n                            },\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: \"jsx-ce793790f28e755\" + \" \" + \"nav-title\",\n                                children: \"해리의 UtilityTools\"\n                            }, void 0, false, {\n                                fileName: \"/Users/harry/Desktop/dev/tools_app/components/Navigation.tsx\",\n                                lineNumber: 76,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/Users/harry/Desktop/dev/tools_app/components/Navigation.tsx\",\n                            lineNumber: 75,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"jsx-ce793790f28e755\" + \" \" + \"nav-links\",\n                            children: navLinks.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                    href: item.href,\n                                    style: {\n                                        padding: \"8px 16px\",\n                                        borderRadius: 8,\n                                        color: router.pathname === item.href ? \"#fff\" : \"#191f28\",\n                                        background: router.pathname === item.href ? \"#3182f6\" : \"transparent\",\n                                        fontWeight: 500,\n                                        textDecoration: \"none\",\n                                        transition: \"background 0.2s\",\n                                        whiteSpace: \"nowrap\"\n                                    },\n                                    children: item.name\n                                }, item.href, false, {\n                                    fileName: \"/Users/harry/Desktop/dev/tools_app/components/Navigation.tsx\",\n                                    lineNumber: 80,\n                                    columnNumber: 15\n                                }, this))\n                        }, void 0, false, {\n                            fileName: \"/Users/harry/Desktop/dev/tools_app/components/Navigation.tsx\",\n                            lineNumber: 78,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/harry/Desktop/dev/tools_app/components/Navigation.tsx\",\n                    lineNumber: 74,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/harry/Desktop/dev/tools_app/components/Navigation.tsx\",\n                lineNumber: 62,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL05hdmlnYXRpb24udHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQTZCO0FBQ1c7QUFFeEMsTUFBTUUsV0FBVztJQUNmO1FBQUVDLE1BQU07UUFBV0MsTUFBTTtJQUFtQjtJQUM1QztRQUFFRCxNQUFNO1FBQVNDLE1BQU07SUFBZ0I7SUFDdkM7UUFBRUQsTUFBTTtRQUFVQyxNQUFNO0lBQW1CO0lBQzNDO1FBQUVELE1BQU07UUFBV0MsTUFBTTtJQUFvQjtJQUM3QztRQUFFRCxNQUFNO1FBQVVDLE1BQU07SUFBcUI7SUFDN0M7UUFBRUQsTUFBTTtRQUFVQyxNQUFNO0lBQWlCO0NBQzFDO0FBRWMsU0FBU0M7SUFDdEIsTUFBTUMsU0FBU0wsc0RBQVNBO0lBQ3hCLHFCQUNFOzs7Ozs7MEJBOENFLDhEQUFDTTtnQkFBSUMsT0FBTztvQkFDVkMsT0FBTztvQkFDUEMsWUFBWTtvQkFDWkMsY0FBYztvQkFDZEMsY0FBYztvQkFDZEMsVUFBVTtvQkFDVkMsS0FBSztvQkFDTEMsTUFBTTtvQkFDTkMsUUFBUTtvQkFDUkMsUUFBUTtvQkFDUkMsV0FBVztnQkFDYjs7MEJBQ0UsNEVBQUNDOzZEQUFjOztzQ0FDYiw4REFBQ25CLGtEQUFJQTs0QkFBQ0ksTUFBSzs0QkFBSUksT0FBTztnQ0FBRVksZ0JBQWdCOzRCQUFPO3NDQUM3Qyw0RUFBQ0M7eUVBQWU7MENBQVk7Ozs7Ozs7Ozs7O3NDQUU5Qiw4REFBQ0Y7cUVBQWM7c0NBQ1pqQixTQUFTb0IsR0FBRyxDQUFDQyxDQUFBQSxxQkFDWiw4REFBQ3ZCLGtEQUFJQTtvQ0FFSEksTUFBTW1CLEtBQUtuQixJQUFJO29DQUNmSSxPQUFPO3dDQUNMZ0IsU0FBUzt3Q0FDVEMsY0FBYzt3Q0FDZEMsT0FBT3BCLE9BQU9xQixRQUFRLEtBQUtKLEtBQUtuQixJQUFJLEdBQUcsU0FBUzt3Q0FDaERNLFlBQVlKLE9BQU9xQixRQUFRLEtBQUtKLEtBQUtuQixJQUFJLEdBQUcsWUFBWTt3Q0FDeER3QixZQUFZO3dDQUNaUixnQkFBZ0I7d0NBQ2hCUyxZQUFZO3dDQUNaQyxZQUFZO29DQUNkOzhDQUVDUCxLQUFLcEIsSUFBSTttQ0FiTG9CLEtBQUtuQixJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCOUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b29scy1hcHBzLXJlYm9vdHMvLi9jb21wb25lbnRzL05hdmlnYXRpb24udHN4PzgzZWYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcblxuY29uc3QgbmF2TGlua3MgPSBbXG4gIHsgbmFtZTogJ+uLueyyqOyekCDstpTstpzquLAnLCBocmVmOiAnL3JhbmRvbS1zZWxlY3RvcicgfSxcbiAgeyBuYW1lOiAn6riA7J6Q7IiY7IS46riwJywgaHJlZjogJy93b3JkLWNvdW50ZXInIH0sXG4gIHsgbmFtZTogJ+uhnOuYkCDstpTssqjquLAnLCBocmVmOiAnL2xvdHRvLWdlbmVyYXRvcicgfSxcbiAgeyBuYW1lOiAn7YKk7JuM65OcIOu2hOyEneq4sCcsIGhyZWY6ICcva2V5d29yZC1hbmFseXplcicgfSxcbiAgeyBuYW1lOiAn7Jew67SJIOqzhOyCsOq4sCcsIGhyZWY6ICcvc2FsYXJ5LWNhbGN1bGF0b3InIH0sXG4gIHsgbmFtZTogJ+uJtOyKpCDrtoTshJ3quLAnLCBocmVmOiAnL25ld3MtYW5hbHl6ZXInIH0sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBOYXZpZ2F0aW9uKCkge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAubmF2LWNvbnRhaW5lciB7XG4gICAgICAgICAgbWF4LXdpZHRoOiA5MDBweDtcbiAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgaGVpZ2h0OiA1NnB4O1xuICAgICAgICAgIHBhZGRpbmc6IDAgMTZweDtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB9XG4gICAgICAgIC5uYXYtdGl0bGUge1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgICAgIG1hcmdpbi1yaWdodDogMjRweDtcbiAgICAgICAgICBjb2xvcjogIzE5MWYyODtcbiAgICAgICAgfVxuICAgICAgICAubmF2LWxpbmtzIHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgZ2FwOiA4cHg7XG4gICAgICAgICAgb3ZlcmZsb3cteDogYXV0bztcbiAgICAgICAgICBmbGV4LXNocmluazogMTtcbiAgICAgICAgICBtaW4td2lkdGg6IDA7XG4gICAgICAgICAgLW1zLW92ZXJmbG93LXN0eWxlOiBub25lOyAvKiBJRSBhbmQgRWRnZSAqL1xuICAgICAgICAgIHNjcm9sbGJhci13aWR0aDogbm9uZTsgLyogRmlyZWZveCAqL1xuICAgICAgICB9XG4gICAgICAgIC5uYXYtbGlua3M6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgICAgICAgICBkaXNwbGF5OiBub25lOyAvKiBDaHJvbWUsIFNhZmFyaSBhbmQgT3BlcmEgKi9cbiAgICAgICAgfVxuICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgICAgICAgICAubmF2LXRpdGxlIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMTJweDtcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgICAgfVxuICAgICAgICAgIC5uYXYtY29udGFpbmVyIHtcbiAgICAgICAgICAgIGdhcDogMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gICAgICAgICAgLm5hdi10aXRsZSB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuICAgICAgPG5hdiBzdHlsZT17e1xuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnI2ZmZicsXG4gICAgICAgIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCAjZTVlOGViJyxcbiAgICAgICAgbWFyZ2luQm90dG9tOiAzMixcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgekluZGV4OiAxMDAsXG4gICAgICAgIGhlaWdodDogNTYsXG4gICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDhweCByZ2JhKDAsMCwwLDAuMDQpJyxcbiAgICAgIH19PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdi1jb250YWluZXJcIj5cbiAgICAgICAgICA8TGluayBocmVmPVwiL1wiIHN0eWxlPXt7IHRleHREZWNvcmF0aW9uOiAnbm9uZScgfX0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtdGl0bGVcIj7tlbTrpqzsnZggVXRpbGl0eVRvb2xzPC9zcGFuPlxuICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdi1saW5rc1wiPlxuICAgICAgICAgICAge25hdkxpbmtzLm1hcChpdGVtID0+IChcbiAgICAgICAgICAgICAgPExpbmtcbiAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaHJlZn1cbiAgICAgICAgICAgICAgICBocmVmPXtpdGVtLmhyZWZ9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc4cHggMTZweCcsXG4gICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDgsXG4gICAgICAgICAgICAgICAgICBjb2xvcjogcm91dGVyLnBhdGhuYW1lID09PSBpdGVtLmhyZWYgPyAnI2ZmZicgOiAnIzE5MWYyOCcsXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiByb3V0ZXIucGF0aG5hbWUgPT09IGl0ZW0uaHJlZiA/ICcjMzE4MmY2JyA6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA1MDAsXG4gICAgICAgICAgICAgICAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2JhY2tncm91bmQgMC4ycycsXG4gICAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2l0ZW0ubmFtZX1cbiAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uYXY+XG4gICAgPC8+XG4gICk7XG59ICJdLCJuYW1lcyI6WyJMaW5rIiwidXNlUm91dGVyIiwibmF2TGlua3MiLCJuYW1lIiwiaHJlZiIsIk5hdmlnYXRpb24iLCJyb3V0ZXIiLCJuYXYiLCJzdHlsZSIsIndpZHRoIiwiYmFja2dyb3VuZCIsImJvcmRlckJvdHRvbSIsIm1hcmdpbkJvdHRvbSIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsInpJbmRleCIsImhlaWdodCIsImJveFNoYWRvdyIsImRpdiIsInRleHREZWNvcmF0aW9uIiwic3BhbiIsIm1hcCIsIml0ZW0iLCJwYWRkaW5nIiwiYm9yZGVyUmFkaXVzIiwiY29sb3IiLCJwYXRobmFtZSIsImZvbnRXZWlnaHQiLCJ0cmFuc2l0aW9uIiwid2hpdGVTcGFjZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/Navigation.tsx\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Navigation */ \"./components/Navigation.tsx\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nfunction App({ Component, pageProps }) {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    const navItems = [\n        {\n            href: \"/\",\n            label: \"홈\"\n        },\n        {\n            href: \"/random-selector\",\n            label: \"당첨자 추출기\"\n        },\n        {\n            href: \"/word-counter\",\n            label: \"글자수세기\"\n        },\n        {\n            href: \"/lotto\",\n            label: \"로또 추첨기\"\n        },\n        {\n            href: \"/keyword-analyzer\",\n            label: \"키워드 분석기\"\n        },\n        {\n            href: \"/salary-calculator\",\n            label: \"연봉 계산기\"\n        },\n        {\n            href: \"/news-analyzer\",\n            label: \"뉴스 분석기\"\n        }\n    ];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Navigation__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/harry/Desktop/dev/tools_app/pages/_app.tsx\",\n                lineNumber: 21,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                style: {\n                    paddingTop: \"88px\",\n                    paddingBottom: \"40px\"\n                },\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"/Users/harry/Desktop/dev/tools_app/pages/_app.tsx\",\n                    lineNumber: 23,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/harry/Desktop/dev/tools_app/pages/_app.tsx\",\n                lineNumber: 22,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBK0I7QUFFbUI7QUFFVjtBQUV6QixTQUFTRSxJQUFJLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFZO0lBQzVELE1BQU1DLFNBQVNKLHNEQUFTQTtJQUN4QixNQUFNSyxXQUFXO1FBQ2Y7WUFBRUMsTUFBTTtZQUFLQyxPQUFPO1FBQUk7UUFDeEI7WUFBRUQsTUFBTTtZQUFvQkMsT0FBTztRQUFVO1FBQzdDO1lBQUVELE1BQU07WUFBaUJDLE9BQU87UUFBUTtRQUN4QztZQUFFRCxNQUFNO1lBQVVDLE9BQU87UUFBUztRQUNsQztZQUFFRCxNQUFNO1lBQXFCQyxPQUFPO1FBQVU7UUFDOUM7WUFBRUQsTUFBTTtZQUFzQkMsT0FBTztRQUFTO1FBQzlDO1lBQUVELE1BQU07WUFBa0JDLE9BQU87UUFBUztLQUMzQztJQUVELHFCQUNFOzswQkFDRSw4REFBQ1IsOERBQVVBOzs7OzswQkFDWCw4REFBQ1M7Z0JBQUtDLE9BQU87b0JBQUVDLFlBQVk7b0JBQVFDLGVBQWU7Z0JBQU87MEJBQ3ZELDRFQUFDVDtvQkFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7Ozs7O0FBSWhDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9vbHMtYXBwcy1yZWJvb3RzLy4vcGFnZXMvX2FwcC50c3g/MmZiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcyc7XG5pbXBvcnQgdHlwZSB7IEFwcFByb3BzIH0gZnJvbSBcIm5leHQvYXBwXCI7XG5pbXBvcnQgTmF2aWdhdGlvbiBmcm9tICcuLi9jb21wb25lbnRzL05hdmlnYXRpb24nO1xuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogQXBwUHJvcHMpIHtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gIGNvbnN0IG5hdkl0ZW1zID0gW1xuICAgIHsgaHJlZjogJy8nLCBsYWJlbDogJ+2ZiCcgfSxcbiAgICB7IGhyZWY6ICcvcmFuZG9tLXNlbGVjdG9yJywgbGFiZWw6ICfri7nssqjsnpAg7LaU7Lac6riwJyB9LFxuICAgIHsgaHJlZjogJy93b3JkLWNvdW50ZXInLCBsYWJlbDogJ+q4gOyekOyImOyEuOq4sCcgfSxcbiAgICB7IGhyZWY6ICcvbG90dG8nLCBsYWJlbDogJ+uhnOuYkCDstpTssqjquLAnIH0sXG4gICAgeyBocmVmOiAnL2tleXdvcmQtYW5hbHl6ZXInLCBsYWJlbDogJ+2CpOybjOuTnCDrtoTshJ3quLAnIH0sXG4gICAgeyBocmVmOiAnL3NhbGFyeS1jYWxjdWxhdG9yJywgbGFiZWw6ICfsl7DrtIkg6rOE7IKw6riwJyB9LFxuICAgIHsgaHJlZjogJy9uZXdzLWFuYWx5emVyJywgbGFiZWw6ICfribTsiqQg67aE7ISd6riwJyB9LFxuICBdO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxOYXZpZ2F0aW9uIC8+XG4gICAgICA8bWFpbiBzdHlsZT17eyBwYWRkaW5nVG9wOiAnODhweCcsIHBhZGRpbmdCb3R0b206ICc0MHB4JyB9fT5cbiAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgPC9tYWluPlxuICAgIDwvPlxuICApO1xufVxuIl0sIm5hbWVzIjpbIk5hdmlnYXRpb24iLCJ1c2VSb3V0ZXIiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJyb3V0ZXIiLCJuYXZJdGVtcyIsImhyZWYiLCJsYWJlbCIsIm1haW4iLCJzdHlsZSIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "styled-jsx/style":
/*!***********************************!*\
  !*** external "styled-jsx/style" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("styled-jsx/style");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_app.tsx")));
module.exports = __webpack_exports__;

})();