//Função debounce que será aplicada no input da busca
export function debounce(fn, delay) {
    let timer = null;

    return function debounced(...args) {
        const context = this;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}