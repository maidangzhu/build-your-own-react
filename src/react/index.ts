import {
  createElement,
  isValidElement,
  cloneElement,
} from "./jsx/createElement";
import { useState, useEffect, useReducer } from "./hooks";
import { Fragment, isFragment } from "./jsx/Fragment";

const React = {
  createElement,
  Fragment,
  isValidElement,
  cloneElement,
  useState,
  useEffect,
  useReducer,
};

export default React;
export {
  createElement,
  Fragment,
  isValidElement,
  cloneElement,
  isFragment,
  useState,
  useEffect,
  useReducer,
};
