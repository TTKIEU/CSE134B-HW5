document.addEventListener("DOMContentLoaded", async () => {
    const projectList = document.getElementById("project-list");
    const searchInput = document.getElementById("Psrch");
    const filterDropdown = document.getElementById("language-filter");
    const loadLocalButton = document.getElementById("load-local");
    const loadRemoteButton = document.getElementById("load-remote");


    function renderProjects(filteredProjects) {
        projectList.innerHTML = ""; 
        filteredProjects.forEach(project => {
            const card = document.createElement("project-card");
            card.setAttribute("title", project.title);
            card.setAttribute("image", project.image);
            card.setAttribute("alt", project.alt);
            card.setAttribute("description", project.description);
            card.setAttribute("link", project.link);
            card.setAttribute("languages", project.languages.join(", "));
            projectList.appendChild(card);
        });
    }

    function filterProjects(projects) {
        const searchText = searchInput.value.toLowerCase();
        const selectedLanguage = filterDropdown.value;

        const filtered = projects.filter(project => {
            const matchesSearch = project.title.toLowerCase().includes(searchText);
            const matchesLanguage = selectedLanguage === "all" || project.languages.includes(selectedLanguage);
            return matchesSearch && matchesLanguage;
        });

        renderProjects(filtered);
    }

    function loadLocalData() {
        const localData = localStorage.getItem("projects");
        if (localData) {
            const projects = JSON.parse(localData);
            filterProjects(projects);
        } else {
            alert("No local data found!");
        }
    }


async function loadRemoteData() {
    try {
        const response = await fetch("https://api.jsonbin.io/v3/b/67d787648a456b796677366e", {
            method: "GET",
            headers: {
                "X-Master-Key": "$2a$10$xQEr9OmfEnvkEG3rYG5wVu5N7pcelxNDkfiPdXVt6zPo2OcgVGzUy"
            }
        });
        const data = await response.json();

        console.log(data); 

      
        if (data && data.record) {
            const projects = data.record;  
            localStorage.setItem("projects", JSON.stringify(projects));
            filterProjects(projects);
        } else {
            alert("Remote data is not in the expected format.");
        }
    } catch (error) {
        alert("Failed to load remote data: " + error.message);
    }
}


    loadLocalButton.addEventListener("click", loadLocalData);
    loadRemoteButton.addEventListener("click", loadRemoteData);

    if (!localStorage.getItem("projects")) {
        const projects = [
            {
                title: "OpenCL Image Convolution",
                image: "images/convolution.png",
                alt: "A visualization of image convolution",
                description: "Optimized OpenCL convolutional layer implementation for machine learning.",
                link: "proj1.html",
                languages: ["OpenCL", "C++"]
            },
            {
                title: "Successorator",
                image: "images/todo.png",
                alt: "Screenshot of Successorator app",
                description: "To-do list app that allows users to organize tasks efficiently, supporting categorization, priority settings, and deadlines.",
                link: "proj2.html",
                languages: ["AndroidStudio", "Java"]
            },
            {
                title: "Bezier Curve Tool",
                image: "images/bezier-tool.png",
                alt: "Bezier curve visualization",
                description: "A custom tool for rendering and editing Bézier curves.",
                link: "proj3.html",
                languages: ["OpenGL"]
            }
        ];
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    loadLocalData();

    searchInput.addEventListener("input", () => {
        const projects = JSON.parse(localStorage.getItem("projects") || "[]");
        filterProjects(projects);
    });
    filterDropdown.addEventListener("change", () => {
        const projects = JSON.parse(localStorage.getItem("projects") || "[]");
        filterProjects(projects);
    });
});
