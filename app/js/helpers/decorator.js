System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function logarTempoDeExecucao(emSegundos = false) {
        return function (target, propriedade, descriptor) {
            const metodoOriginal = descriptor.value;
            descriptor.value = function (...args) {
                let divisor = 1;
                let unidade = 'ms';
                if (emSegundos) {
                    divisor = 1000;
                    unidade = 's';
                }
                console.log('-----------------');
                console.log(`Parâmetros do método ${propriedade}: ${JSON.stringify(args)}`);
                const t1 = performance.now();
                const resultado = metodoOriginal.apply(this, args);
                console.log(`Resultado do método: ${JSON.stringify(resultado)}`);
                const t2 = performance.now();
                console.log(`${propriedade} demorou ${(t2 - t1) / divisor} ${unidade}`);
                console.log('-----------------');
                return resultado;
            };
            return descriptor;
        };
    }
    exports_1("logarTempoDeExecucao", logarTempoDeExecucao);
    return {
        setters: [],
        execute: function () {
        }
    };
});
