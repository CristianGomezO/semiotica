$(document).ready(() => {
    const theme = localStorage.getItem('theme'),
        colorSwitch = document.querySelector('#switch input[type="checkbox"]');
    
    if (theme === "dark") {
        colorSwitch.checked = false;
    } else {
        colorSwitch.checked = true;
    }

    function changeTheme(ev){
        let theme = "dark";
        if (ev.target.checked){
            theme = "light";
        }
        let logoSrc = "logo.png";
        if (theme === "dark") {
            logoSrc = "logo-inverted.png";
        }
        $(".logo-container img").attr("src", 'assets/images/' + logoSrc);
        document.documentElement.setAttribute('theme', theme);
        localStorage.setItem('theme', theme);
    }
    colorSwitch.addEventListener('change', changeTheme);

    $("#changeFontSize").click(function () {
        let currentSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--font-size"));
        let newSize = (currentSize + 2) + "px";
        document.documentElement.style.setProperty("--font-size", newSize);
        localStorage.setItem("fontSize", newSize);
    });
});