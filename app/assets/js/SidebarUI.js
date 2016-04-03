var SidebarUI = (function() {
    var hooks = {
        button: '.js-sidebar-control',
        sidebar: '.js-sidebar',
        content: '.js-note'
    };

    var states = {
        open: 'is-open',
        covered: 'is-covered'
    };

    function menuHandler() {
        var sidebarEl = document.querySelector(hooks.sidebar);
        if (sidebarEl.classList.contains(states.open)) {
            SidebarUI.closeSidebar();
        } else {
            SidebarUI.openSidebar();
        }
    }

    return {
        openSidebar: function() {
            var sidebarEl = document.querySelector(hooks.sidebar);
            var contentEl = document.querySelector(hooks.content);
            var buttonEl = document.querySelector(hooks.button);

            sidebarEl.classList.add(states.open);
            buttonEl.classList.add(states.open);
            contentEl.classList.add(states.covered);

            contentEl.addEventListener('click', SidebarUI.closeSidebar);
        },

        closeSidebar: function() {
            var sidebarEl = document.querySelector(hooks.sidebar);
            var contentEl = document.querySelector(hooks.content);
            var buttonEl = document.querySelector(hooks.button);

            sidebarEl.classList.remove(states.open);
            buttonEl.classList.remove(states.open);
            contentEl.classList.remove(states.covered);

            contentEl.removeEventListener('click', SidebarUI.closeSidebar);
        },

        init: function() {
            var trigger = document.querySelector(hooks.button);
            trigger.addEventListener('click', menuHandler);
        }
    }
}());

SidebarUI.init();