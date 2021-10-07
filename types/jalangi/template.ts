import { Jalangi } from "jalangi";
// import * as jl from "jalangi";

class MyAnalysis implements Jalangi.Analysis {

    /**
        * These callbacks are called before and after a function, method, or constructor invocation.
        **/
    invokeFunPre(iid: iid, f: Function, base: object, args: any[],
        isConstructor: boolean, isMethod: boolean, functionIid: iid,
        functionSid: iid): { f: Function, base: object, args: any[], skip: boolean } {
        return { f: f, base: base, args: args, skip: false };
    };

    invokeFun(iid: iid, f: Function, base: any, args: any[], result: any,
        isConstructor: boolean, isMethod: boolean, functionIid: iid,
        functionSid: iid): { result: any } {
        return {result : result};
    }

    /**
        * This callback is called after the creation of a literal. A literal can be a function
        * literal, an object literal, an array literal, a number, a string, a boolean, a regular
        * expression, null, NaN, Infinity, or undefined.
        *
        * @param fakeHasGetterSetter is a placeholder to be consistent with Jalangi's API.
        * The value provided in the callback is always undefined while
        * the actual value should be computed lazily via J$.adapter.hasGetterSetter(code)
        *
        * @param literalType is a new argument provided by NodeProf showing the type of literal
        *
        **/
    literal(iid: iid, val: any, hasGetterSetter: boolean) {
        return {result: val};
    }

    /**
    * These callbacks are called before and after a property of an object is accessed.
    **/
    getFieldPre(iid: iid, base: any, offset: string | symbol, isComputed: boolean,
                isOpAssign: boolean, isMethodCall: boolean) {
        return {base : base, offset : offset, skip : false};
    };

    getField(iid: iid, base: any, offset: string, val: any, isComputed: boolean,
            isOpAssign: boolean, isMethodCall: boolean) {
        return {result : val};
    };

    /**
    * These callbacks are called before a property of an object is written
    **/
    putFieldPre(iid: iid, base: any, offset: string, val: any,
                isComputed: boolean, isOpAssign: boolean) {
        return {base : base, offset : offset, val : val, skip : false};
    };

    putField(iid: iid, base: any, offset: string, val: any, isComputed: boolean,
            isOpAssign: boolean) {
        return {result : val};
    };

    /**
    * These callbacks are called after a variable is read or written.
    **/
    read(iid: iid, name: string, val: any, isGlobal: boolean,
        isScriptLocal: boolean) {
        return {result : val};
    };

    write(iid: iid, name: string, val: any, lhs: any, isGlobal: boolean,
            isScriptLocal: boolean) {
        return {result : val};
    };

    /**
    * These callbacks are called before the execution of a function body starts
    *and after it completes.
    **/
    functionEnter(iid: iid, f: Function, dis: any, args: any[]) {
    };

    functionExit(iid: iid, returnVal: any,
                wrappedExceptionVal: {exception: any}|undefined) {
        return {
            returnVal : returnVal,
            wrappedExceptionVal : wrappedExceptionVal,
            isBacktrack : false
        };
    };

    /**
    * These callbacks are called before the execution of a builtin function body
    *starts and after it completes.
    * !!! Careful the builtin hook is called in addition to the invokeFun hook,
    *not instead !!!
    **/
    builtinEnter(name: string, f: Function, dis: any, args: any[]) {
    };

    builtinExit(name: string, f: Function, dis: any, args: any[], returnVal: any,
                exceptionVal: any) {
        return {returnVal : returnVal};
    };

    /**
    * These callbacks are called before and after a binary operation.
    **/
    binaryPre(iid: iid, op: any, left: any, right: boolean, isOpAssign: boolean,
                isSwitchCaseComparison: boolean, isComputed: boolean) {
        return {op : op, left : left, right : right, skip : false};
    };

    binary(iid: iid, op: any, left: any, right: any, result: any,
            isOpAssign: boolean, isSwitchCaseComparison: boolean,
            isComputed: boolean) {
        return {result : result};
    };

    /**
    * These callbacks are called before and after a unary operation.
    **/
    unaryPre(iid: iid, op: any, left: any) {
        return {op : op, left : left, skip : false};
    };

    unary(iid: iid, op: any, left: any, result: any) {
        return {result : result};
    };

    /**
    * This callback is called after a conditional expression has been evaluated
    **/
    conditional(iid: iid, result: any) {
        return {result : result};
    };

    /**
        * The callbacks are called before and after an expression
        * @param iid {integer} source code location id
        * @param type {string} type of the expression, TODO: use some standard type names, e.g., ESTree
        * @param result {} the execution result of the expression
        **/
    startExpression(iid: iid, type: string) {
    };

    endExpression(iid: iid, type: string, result: any) {
    };

    /**
    * This callback is called when an execution terminates in node.js.
    **/
    endExecution() {
    };
}

J$.analysis = new MyAnalysis();
