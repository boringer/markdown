import marked from 'marked';
import highlight from 'highlight.js';
import 'highlight.js/styles/github.css';
import './index.css';

(() => {
    function init() {
        listenKeydown();
        listenInput();
        listenToggle();
        listenScroll();
        highlight.registerLanguage('vue', () => highlight.getLanguage('html'));
        highlightDefault();
    }

    function listenKeydown() {
        editor.addEventListener('keydown', handleKeydown);
    }

    function listenInput() {
        editor.addEventListener('input', handleInput);
    }

    function listenToggle() {
        toggler.addEventListener('click', handleToggle);
    }

    function listenScroll() {
        editor.addEventListener('scroll', handleScroll);
        previewer.addEventListener('scroll', handleScroll);
    }

    function handleKeydown(e) {
        if (e.keyCode === 9) {
            e.preventDefault();
            document.execCommand('insertText', true, '\t');
        }
    }

    function handleInput(e) {
        clearTimeout(inputTimer);
        inputTimer = setTimeout(() => {
            preview(e.target.value);
        }, 500);
    }

    function handleToggle() {
        document.body.classList.toggle('editing');
    }

    function handleScroll(e) {
        const elements = [
            editor,
            previewer,
        ];
        const target = e.target;

        if (scrollingElement && target !== scrollingElement) {
            scrollingElement = null;
            return;
        }

        elements.splice(elements.indexOf(target), 1);
        elements.forEach((element) => {
            element.scrollTo(0, target.scrollTop / (target.scrollHeight - target.offsetHeight) * (element.scrollHeight - element.offsetHeight));
        });
        scrollingElement = target;
    }

    function preview(code) {
        previewer.innerHTML = marked(code, {
            highlight: (code) => highlight.highlightAuto(code).value
        });
    }

    function highlightDefault() {
        if (editor.value) {
            preview(editor.value);
        }
    }

    const editor = document.getElementById('editor');
    const previewer = document.getElementById('previewer');
    const toggler = document.getElementById('toggler');
    let scrollingElement = null;
    let inputTimer = null;
    init();
})();