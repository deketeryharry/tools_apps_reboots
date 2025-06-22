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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Navigation)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-jsx/style */ \"styled-jsx/style\");\n/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst navLinks = [\n    {\n        name: \"홈\",\n        href: \"/\"\n    },\n    {\n        name: \"당첨자 추출기\",\n        href: \"/random-selector\"\n    },\n    {\n        name: \"글자수세기\",\n        href: \"/word-counter\"\n    },\n    {\n        name: \"로또 추첨기\",\n        href: \"/lotto\"\n    },\n    {\n        name: \"키워드 분석기\",\n        href: \"/keyword-analyzer\"\n    },\n    {\n        name: \"연봉 계산기\",\n        href: \"/salary-calculator\"\n    },\n    {\n        name: \"뉴스 분석기\",\n        href: \"/news-analyzer\"\n    }\n];\nfunction Navigation() {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default()), {\n                id: \"779652884ba65871\",\n                children: \".nav-container.jsx-779652884ba65871{max-width:900px;margin:0 auto;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;height:56px;padding:0 16px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.nav-title.jsx-779652884ba65871{font-weight:700;font-size:20px;margin-right:24px;color:#191f28}.nav-links.jsx-779652884ba65871{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;gap:8px;overflow-x:auto;-ms-overflow-style:none;scrollbar-width:none}.nav-links.jsx-779652884ba65871::-webkit-scrollbar{display:none}@media(max-width:768px){.nav-title.jsx-779652884ba65871{font-size:18px;margin-right:12px;white-space:nowrap}.nav-container.jsx-779652884ba65871{gap:0}}@media(max-width:600px){.nav-title.jsx-779652884ba65871{display:none}}\"\n            }, void 0, false, void 0, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                style: {\n                    width: \"100%\",\n                    background: \"#fff\",\n                    borderBottom: \"1px solid #e5e8eb\",\n                    marginBottom: 32,\n                    position: \"fixed\",\n                    top: 0,\n                    left: 0,\n                    zIndex: 100,\n                    height: 56,\n                    boxShadow: \"0 2px 8px rgba(0,0,0,0.04)\"\n                },\n                className: \"jsx-779652884ba65871\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"jsx-779652884ba65871\" + \" \" + \"nav-container\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                            className: \"jsx-779652884ba65871\" + \" \" + \"nav-title\",\n                            children: \"해리의 UtilityTools\"\n                        }, void 0, false, {\n                            fileName: \"/Users/harry/Desktop/dev/tools_app/components/Navigation.tsx\",\n                            lineNumber: 74,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"jsx-779652884ba65871\" + \" \" + \"nav-links\",\n                            children: navLinks.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                    href: item.href,\n                                    style: {\n                                        padding: \"8px 16px\",\n                                        borderRadius: 8,\n                                        color: router.pathname === item.href ? \"#fff\" : \"#191f28\",\n                                        background: router.pathname === item.href ? \"#3182f6\" : \"transparent\",\n                                        fontWeight: 500,\n                                        textDecoration: \"none\",\n                                        transition: \"background 0.2s\",\n                                        whiteSpace: \"nowrap\"\n                                    },\n                                    children: item.name\n                                }, item.href, false, {\n                                    fileName: \"/Users/harry/Desktop/dev/tools_app/components/Navigation.tsx\",\n                                    lineNumber: 77,\n                                    columnNumber: 15\n                                }, this))\n                        }, void 0, false, {\n                            fileName: \"/Users/harry/Desktop/dev/tools_app/components/Navigation.tsx\",\n                            lineNumber: 75,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/harry/Desktop/dev/tools_app/components/Navigation.tsx\",\n                    lineNumber: 73,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/harry/Desktop/dev/tools_app/components/Navigation.tsx\",\n                lineNumber: 61,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL05hdmlnYXRpb24udHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQTZCO0FBQ1c7QUFFeEMsTUFBTUUsV0FBVztJQUNmO1FBQUVDLE1BQU07UUFBS0MsTUFBTTtJQUFJO0lBQ3ZCO1FBQUVELE1BQU07UUFBV0MsTUFBTTtJQUFtQjtJQUM1QztRQUFFRCxNQUFNO1FBQVNDLE1BQU07SUFBZ0I7SUFDdkM7UUFBRUQsTUFBTTtRQUFVQyxNQUFNO0lBQVM7SUFDakM7UUFBRUQsTUFBTTtRQUFXQyxNQUFNO0lBQW9CO0lBQzdDO1FBQUVELE1BQU07UUFBVUMsTUFBTTtJQUFxQjtJQUM3QztRQUFFRCxNQUFNO1FBQVVDLE1BQU07SUFBaUI7Q0FDMUM7QUFFYyxTQUFTQztJQUN0QixNQUFNQyxTQUFTTCxzREFBU0E7SUFDeEIscUJBQ0U7Ozs7OzswQkE0Q0UsOERBQUNNO2dCQUFJQyxPQUFPO29CQUNWQyxPQUFPO29CQUNQQyxZQUFZO29CQUNaQyxjQUFjO29CQUNkQyxjQUFjO29CQUNkQyxVQUFVO29CQUNWQyxLQUFLO29CQUNMQyxNQUFNO29CQUNOQyxRQUFRO29CQUNSQyxRQUFRO29CQUNSQyxXQUFXO2dCQUNiOzswQkFDRSw0RUFBQ0M7OERBQWM7O3NDQUNiLDhEQUFDQztzRUFBZTtzQ0FBWTs7Ozs7O3NDQUM1Qiw4REFBQ0Q7c0VBQWM7c0NBQ1pqQixTQUFTbUIsR0FBRyxDQUFDQyxDQUFBQSxxQkFDWiw4REFBQ3RCLGtEQUFJQTtvQ0FFSEksTUFBTWtCLEtBQUtsQixJQUFJO29DQUNmSSxPQUFPO3dDQUNMZSxTQUFTO3dDQUNUQyxjQUFjO3dDQUNkQyxPQUFPbkIsT0FBT29CLFFBQVEsS0FBS0osS0FBS2xCLElBQUksR0FBRyxTQUFTO3dDQUNoRE0sWUFBWUosT0FBT29CLFFBQVEsS0FBS0osS0FBS2xCLElBQUksR0FBRyxZQUFZO3dDQUN4RHVCLFlBQVk7d0NBQ1pDLGdCQUFnQjt3Q0FDaEJDLFlBQVk7d0NBQ1pDLFlBQVk7b0NBQ2Q7OENBRUNSLEtBQUtuQixJQUFJO21DQWJMbUIsS0FBS2xCLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUI5QiIsInNvdXJjZXMiOlsid2VicGFjazovL3Rvb2xzLWFwcHMtcmVib290cy8uL2NvbXBvbmVudHMvTmF2aWdhdGlvbi50c3g/ODNlZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xuXG5jb25zdCBuYXZMaW5rcyA9IFtcbiAgeyBuYW1lOiAn7ZmIJywgaHJlZjogJy8nIH0sXG4gIHsgbmFtZTogJ+uLueyyqOyekCDstpTstpzquLAnLCBocmVmOiAnL3JhbmRvbS1zZWxlY3RvcicgfSxcbiAgeyBuYW1lOiAn6riA7J6Q7IiY7IS46riwJywgaHJlZjogJy93b3JkLWNvdW50ZXInIH0sXG4gIHsgbmFtZTogJ+uhnOuYkCDstpTssqjquLAnLCBocmVmOiAnL2xvdHRvJyB9LFxuICB7IG5hbWU6ICftgqTsm4zrk5wg67aE7ISd6riwJywgaHJlZjogJy9rZXl3b3JkLWFuYWx5emVyJyB9LFxuICB7IG5hbWU6ICfsl7DrtIkg6rOE7IKw6riwJywgaHJlZjogJy9zYWxhcnktY2FsY3VsYXRvcicgfSxcbiAgeyBuYW1lOiAn64m07IqkIOu2hOyEneq4sCcsIGhyZWY6ICcvbmV3cy1hbmFseXplcicgfSxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE5hdmlnYXRpb24oKSB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8c3R5bGUganN4PntgXG4gICAgICAgIC5uYXYtY29udGFpbmVyIHtcbiAgICAgICAgICBtYXgtd2lkdGg6IDkwMHB4O1xuICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBoZWlnaHQ6IDU2cHg7XG4gICAgICAgICAgcGFkZGluZzogMCAxNnB4O1xuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIH1cbiAgICAgICAgLm5hdi10aXRsZSB7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICAgICAgbWFyZ2luLXJpZ2h0OiAyNHB4O1xuICAgICAgICAgIGNvbG9yOiAjMTkxZjI4O1xuICAgICAgICB9XG4gICAgICAgIC5uYXYtbGlua3Mge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBnYXA6IDhweDtcbiAgICAgICAgICBvdmVyZmxvdy14OiBhdXRvO1xuICAgICAgICAgIC1tcy1vdmVyZmxvdy1zdHlsZTogbm9uZTsgLyogSUUgYW5kIEVkZ2UgKi9cbiAgICAgICAgICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7IC8qIEZpcmVmb3ggKi9cbiAgICAgICAgfVxuICAgICAgICAubmF2LWxpbmtzOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgICAgICAgZGlzcGxheTogbm9uZTsgLyogQ2hyb21lLCBTYWZhcmkgYW5kIE9wZXJhICovXG4gICAgICAgIH1cbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gICAgICAgICAgLm5hdi10aXRsZSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDEycHg7XG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICAgIH1cbiAgICAgICAgICAubmF2LWNvbnRhaW5lciB7XG4gICAgICAgICAgICBnYXA6IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xuICAgICAgICAgIC5uYXYtdGl0bGUge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIGB9PC9zdHlsZT5cbiAgICAgIDxuYXYgc3R5bGU9e3tcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgYmFja2dyb3VuZDogJyNmZmYnLFxuICAgICAgICBib3JkZXJCb3R0b206ICcxcHggc29saWQgI2U1ZThlYicsXG4gICAgICAgIG1hcmdpbkJvdHRvbTogMzIsXG4gICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHpJbmRleDogMTAwLFxuICAgICAgICBoZWlnaHQ6IDU2LFxuICAgICAgICBib3hTaGFkb3c6ICcwIDJweCA4cHggcmdiYSgwLDAsMCwwLjA0KScsXG4gICAgICB9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXYtY29udGFpbmVyXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2LXRpdGxlXCI+7ZW066as7J2YIFV0aWxpdHlUb29sczwvc3Bhbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdi1saW5rc1wiPlxuICAgICAgICAgICAge25hdkxpbmtzLm1hcChpdGVtID0+IChcbiAgICAgICAgICAgICAgPExpbmtcbiAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaHJlZn1cbiAgICAgICAgICAgICAgICBocmVmPXtpdGVtLmhyZWZ9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc4cHggMTZweCcsXG4gICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDgsXG4gICAgICAgICAgICAgICAgICBjb2xvcjogcm91dGVyLnBhdGhuYW1lID09PSBpdGVtLmhyZWYgPyAnI2ZmZicgOiAnIzE5MWYyOCcsXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiByb3V0ZXIucGF0aG5hbWUgPT09IGl0ZW0uaHJlZiA/ICcjMzE4MmY2JyA6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA1MDAsXG4gICAgICAgICAgICAgICAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2JhY2tncm91bmQgMC4ycycsXG4gICAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2l0ZW0ubmFtZX1cbiAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uYXY+XG4gICAgPC8+XG4gICk7XG59ICJdLCJuYW1lcyI6WyJMaW5rIiwidXNlUm91dGVyIiwibmF2TGlua3MiLCJuYW1lIiwiaHJlZiIsIk5hdmlnYXRpb24iLCJyb3V0ZXIiLCJuYXYiLCJzdHlsZSIsIndpZHRoIiwiYmFja2dyb3VuZCIsImJvcmRlckJvdHRvbSIsIm1hcmdpbkJvdHRvbSIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsInpJbmRleCIsImhlaWdodCIsImJveFNoYWRvdyIsImRpdiIsInNwYW4iLCJtYXAiLCJpdGVtIiwicGFkZGluZyIsImJvcmRlclJhZGl1cyIsImNvbG9yIiwicGF0aG5hbWUiLCJmb250V2VpZ2h0IiwidGV4dERlY29yYXRpb24iLCJ0cmFuc2l0aW9uIiwid2hpdGVTcGFjZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/Navigation.tsx\n");

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